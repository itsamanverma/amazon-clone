import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { confirmPasswordReset } from 'firebase/auth';
import { auth } from '../../firebase';
import { getAuthErrorMessage } from '../../utils/authErrors';
import './PasswordReset.css';

const PasswordReset = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '', icon: '' });
    const [oobCode] = useState(searchParams.get('oobCode'));

    useEffect(() => {
        if (!oobCode) {
            setMessage({
                text: 'Invalid reset link. Please request a new password reset.',
                type: 'error',
                icon: '🔗'
            });
        }
    }, [oobCode]);

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        
        if (newPassword !== confirmPassword) {
            setMessage({
                text: 'Passwords do not match.',
                type: 'error',
                icon: '🔐'
            });
            return;
        }

        if (newPassword.length < 6) {
            setMessage({
                text: 'Password must be at least 6 characters long.',
                type: 'error',
                icon: '🔐'
            });
            return;
        }

        setLoading(true);
        setMessage({ text: '', type: '', icon: '' });

        try {
            await confirmPasswordReset(auth, oobCode, newPassword);
            setMessage({
                text: 'Password reset successfully! Redirecting to sign in...',
                type: 'success',
                icon: '✅'
            });
            
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            setLoading(false);
            const errorInfo = getAuthErrorMessage(error.code);
            setMessage({
                text: errorInfo.message,
                type: errorInfo.type,
                icon: errorInfo.icon
            });
        }
    };

    return (
        <div className="password-reset">
            <div className="password-reset__container">
                <h1>Reset Your Password</h1>
                
                {message.text && (
                    <div className={`password-reset__message password-reset__message--${message.type}`}>
                        <span className="password-reset__message-icon">{message.icon}</span>
                        <p>{message.text}</p>
                    </div>
                )}

                {oobCode ? (
                    <form onSubmit={handlePasswordReset} className="password-reset__form">
                        <div className="password-reset__input-group">
                            <label>New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="password-reset__input-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm new password"
                                required
                                disabled={loading}
                            />
                        </div>

                        <button
                            type="submit"
                            className="password-reset__button"
                            disabled={loading || !newPassword || !confirmPassword}
                        >
                            {loading ? 'Resetting Password...' : 'Reset Password'}
                        </button>
                    </form>
                ) : (
                    <div className="password-reset__invalid">
                        <button onClick={() => navigate('/login')} className="password-reset__back-button">
                            Back to Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PasswordReset;