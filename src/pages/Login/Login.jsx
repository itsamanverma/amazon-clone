import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, updateProfile } from 'firebase/auth';
import {
    getAuthErrorMessage,
    getSuccessMessage,
    getPasswordResetMessage,
    validateEmail,
    validateLoginForm
} from '../../utils/authErrors';

const Login = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '', icon: '' });
    const [isResetMode, setIsResetMode] = useState(false);
    const [isRegisterMode, setIsRegisterMode] = useState(false);

    const clearMessage = () => {
        setMessage({ text: '', type: '', icon: '' });
    };

    const setErrorMessage = (errorCode) => {
        const errorInfo = getAuthErrorMessage(errorCode);
        setMessage({
            text: errorInfo.message,
            type: errorInfo.type,
            icon: errorInfo.icon
        });
    };

    const setSuccessMessage = (action) => {
        const successInfo = getSuccessMessage(action);
        setMessage({
            text: successInfo.message,
            type: successInfo.type,
            icon: successInfo.icon
        });
    };

    const resetPassword = e => {
        e.preventDefault();

        // Client-side validation
        const emailError = validateEmail(email);
        if (emailError) {
            setMessage({
                text: emailError.message,
                type: emailError.type,
                icon: emailError.icon
            });
            return;
        }

        setLoading(true);
        clearMessage();

        sendPasswordResetEmail(auth, email)
            .then(() => {
                const resetMessage = getPasswordResetMessage(email);
                setMessage({
                    text: resetMessage.text,
                    type: resetMessage.type,
                    icon: resetMessage.icon
                });
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                setErrorMessage(error.code);
            });
    };

    const signIn = e => {
        e.preventDefault();

        // Client-side validation
        const validationError = validateLoginForm(email, password);
        if (validationError) {
            setMessage({
                text: validationError.message,
                type: validationError.type,
                icon: validationError.icon
            });
            return;
        }

        setLoading(true);
        clearMessage();

        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                setSuccessMessage('signin');
                setTimeout(() => {
                    setLoading(false);
                    navigate('/');
                }, 1000);
            })
            .catch(error => {
                setLoading(false);
                setErrorMessage(error.code);
            });
    }

    const register = e => {
        e.preventDefault();

        // Client-side validation
        const validationError = validateLoginForm(email, password);
        if (validationError) {
            setMessage({
                text: validationError.message,
                type: validationError.type,
                icon: validationError.icon
            });
            return;
        }

        if (!name) {
            setMessage({
                text: "Please enter your name.",
                type: "error",
                icon: "PERSON_ERROR"
            });
            return;
        }

        setLoading(true);
        clearMessage();

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Update profile with name
                updateProfile(userCredential.user, {
                    displayName: name
                })
                    .then(() => {
                        setSuccessMessage('signup');
                        setTimeout(() => {
                            setLoading(false);
                            navigate('/');
                        }, 1000);
                    })
                    .catch((error) => {
                        // Even if profile update fails, user is created
                        console.error("Profile update error", error);
                        setSuccessMessage('signup');
                        setTimeout(() => {
                            setLoading(false);
                            navigate('/');
                        }, 1000);
                    });
            })
            .catch(error => {
                setLoading(false);
                setErrorMessage(error.code);
            });
    }

    const toggleMode = (mode) => {
        setIsRegisterMode(mode === 'register');
        setIsResetMode(false);
        clearMessage();
        // Optional: clear inputs or keep them? Keeping them is usually friendlier.
    }

    return (
        <div className='login'>
            <Link to='/' className='login__logoLink'>
                <img
                    className="login__logo"
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
                    alt="Amazon Logo"
                />
            </Link>

            <div className='login__container'>
                <div className='login__header'>
                    <h1>
                        {isResetMode ? 'Reset Password' : (isRegisterMode ? 'Create Account' : 'Sign-In')}
                    </h1>
                    <p className='login__subtitle'>
                        {isResetMode ? 'Enter your email to reset password' : (isRegisterMode ? 'Enter your name and email' : 'Access your account')}
                    </p>
                </div>

                {message.text && (
                    <div className={`login__message login__message--${message.type}`}>
                        <span className='login__message-icon'>{message.icon}</span>
                        <div className='login__message-content'>
                            <p>{message.text}</p>
                            {/* ... error actions logic reserved ... */}
                            <button
                                className='login__message-close'
                                onClick={clearMessage}
                                aria-label='Close message'
                            >
                                ×
                            </button>
                        </div>
                    </div>
                )}

                <div className='login__form-container'>
                    <form className='login__form'>
                        {isRegisterMode && !isResetMode && (
                            <div className='login__input-group'>
                                <h5>Your name</h5>
                                <input
                                    type='text'
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    placeholder='First and last name'
                                    required
                                    disabled={loading}
                                    className='login__input'
                                />
                            </div>
                        )}

                        <div className='login__input-group'>
                            <h5>E-mail</h5>
                            <input
                                type='email'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder='Enter your email'
                                required
                                disabled={loading}
                                className='login__input'
                            />
                        </div>

                        {!isResetMode && (
                            <div className='login__input-group'>
                                <h5>Password</h5>
                                <input
                                    type='password'
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder={isRegisterMode ? 'At least 6 characters' : 'Enter your password'}
                                    required
                                    disabled={loading}
                                    className='login__input'
                                />
                                {isRegisterMode && <p className="login__password-info"> Passwords must be at least 6 characters.</p>}
                            </div>
                        )}

                        {isResetMode ? (
                            <>
                                <button
                                    type='submit'
                                    onClick={resetPassword}
                                    className='login__resetButton'
                                    disabled={loading || !email}
                                >
                                    <span className='login__button-content'>
                                        {loading ? (
                                            <>
                                                <span className='login__spinner'></span>
                                                Sending Reset Email...
                                            </>
                                        ) : (
                                            'Send Reset Email'
                                        )}
                                    </span>
                                </button>

                                <button
                                    type='button'
                                    onClick={() => {
                                        setIsResetMode(false);
                                        clearMessage();
                                    }}
                                    className='login__backButton'
                                    disabled={loading}
                                >
                                    ← Back to Sign In
                                </button>
                            </>
                        ) : (
                            <>
                                {isRegisterMode ? (
                                    <button
                                        type='submit'
                                        onClick={register}
                                        className='login__signInButton' // Re-use main button style
                                        disabled={loading || !email || !password || !name}
                                    >
                                        <span className='login__button-content'>
                                            {loading ? (
                                                <>
                                                    <span className='login__spinner'></span>
                                                    Creating Account...
                                                </>
                                            ) : (
                                                'Create your Amazon Account'
                                            )}
                                        </span>
                                    </button>
                                ) : (
                                    <button
                                        type='submit'
                                        onClick={signIn}
                                        className='login__signInButton'
                                        disabled={loading || !email || !password}
                                    >
                                        <span className='login__button-content'>
                                            {loading ? (
                                                <>
                                                    <span className='login__spinner'></span>
                                                    Signing In...
                                                </>
                                            ) : (
                                                'Sign In'
                                            )}
                                        </span>
                                    </button>
                                )}

                                {!isRegisterMode && (
                                    <button
                                        type='button'
                                        onClick={() => {
                                            setIsResetMode(true);
                                            clearMessage();
                                        }}
                                        className='login__forgotPassword'
                                        disabled={loading}
                                    >
                                        Forgot password?
                                    </button>
                                )}
                            </>
                        )}
                    </form>

                    {!isResetMode && (
                        <div className='login__footer'>
                            <p>
                                By {isRegisterMode ? 'creating an account' : 'signing in'}, you agree to our Demo Application <br />
                                <button className='login__link' type="button" onClick={() => console.log('Terms clicked')}>Terms of Service</button> and <button className='login__link' type="button" onClick={() => console.log('Privacy clicked')}>Privacy Policy</button>.
                            </p>

                            {isRegisterMode ? (
                                <div className="login__switchMode">
                                    <p>Already have an account?</p>
                                    <button
                                        onClick={() => toggleMode('signin')}
                                        className='login__registerButton'
                                        disabled={loading}
                                    >
                                        Sign-In
                                    </button>
                                </div>
                            ) : (
                                <div className="login__switchMode">
                                    <div className="login__divider">
                                        <h5>New to Amazon?</h5>
                                    </div>
                                    <button
                                        onClick={() => toggleMode('register')}
                                        className='login__registerButton'
                                        disabled={loading}
                                    >
                                        Create your Amazon Account
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Login;
