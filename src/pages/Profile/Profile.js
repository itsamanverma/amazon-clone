import React, { useState, useEffect } from 'react';
import './Profile.css';
import { useStateValue } from '../../StateProvider';
import { auth, db } from '../../firebase';
import { updateProfile, updateEmail, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [{ user }, dispatch] = useStateValue();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState({ street: '', city: '', pincode: '' });

    // UI State
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.displayName || '');
            setEmail(user.email || '');

            // Fetch additional details from Firestore
            const fetchUserData = async () => {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setMobile(data.mobile || '');
                    setAddress(data.address || { street: '', city: '', pincode: '' });
                }
            };
            fetchUserData();
        } else {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // Update Auth Profile (Name)
            if (user.displayName !== name) {
                await updateProfile(user, { displayName: name });
            }

            // Update Email (Requires recent logic, might fail)
            if (user.email !== email) {
                await updateEmail(user, email);
            }

            // Update Firestore (Mobile & Address)
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, {
                mobile: mobile,
                address: address
                // We don't store Name/Email here to avoid duplication, Auth is source of truth
            }, { merge: true });

            setSuccess('Profile updated successfully!');
            setEditMode(false);

            // Reload user state if needed, or Auth listener in App.js handles it?
            // Auth listener will pick up Name/Email changes eventually, but we might need to force refresh if not automatic.

        } catch (err) {
            console.error(err);
            if (err.code === 'auth/requires-recent-login') {
                setError('For security, please sign out and sign in again to update your email.');
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = () => {
        if (user) {
            signOut(auth);
            navigate('/');
        }
    }

    return (
        <div className="profile">
            <div className="profile__container">
                <h1 className="profile__title">Your Profile</h1>

                {error && <p className="profile__error">{error}</p>}
                {success && <p className="profile__success">{success}</p>}

                {editMode ? (
                    <form className="profile__form">
                        <label className="profile__label">Your Name</label>
                        <input
                            className="profile__input"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />

                        <label className="profile__label">Email</label>
                        <input
                            className="profile__input"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />

                        <label className="profile__label">Mobile Number</label>
                        <input
                            className="profile__input"
                            type="tel"
                            value={mobile}
                            onChange={e => setMobile(e.target.value)}
                            placeholder="Add mobile number"
                        />

                        <label className="profile__label">Address</label>
                        <input
                            className="profile__input"
                            type="text"
                            placeholder="Street Address"
                            value={address.street}
                            onChange={e => setAddress({ ...address, street: e.target.value })}
                        />
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <input
                                className="profile__input"
                                type="text"
                                placeholder="City"
                                value={address.city}
                                onChange={e => setAddress({ ...address, city: e.target.value })}
                            />
                            <input
                                className="profile__input"
                                type="text"
                                placeholder="Pincode"
                                value={address.pincode}
                                onChange={e => setAddress({ ...address, pincode: e.target.value })}
                            />
                        </div>

                        <div className="profile__buttons">
                            <button className="profile__saveButton" onClick={handleUpdate} disabled={loading}>
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button className="profile__signOutButton" onClick={() => setEditMode(false)}>
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="profile__details">
                        <div className="profile__section">
                            <span className="profile__label">Name:</span>
                            <span className="profile__value">{name}</span>
                        </div>
                        <div className="profile__section">
                            <span className="profile__label">Email:</span>
                            <span className="profile__value">{email}</span>
                        </div>
                        <div className="profile__section">
                            <span className="profile__label">Mobile:</span>
                            <span className="profile__value">{mobile || 'Not set'}</span>
                        </div>
                        <div className="profile__section">
                            <span className="profile__label">Address:</span>
                            <span className="profile__value">
                                {address.street ? `${address.street}, ${address.city} ${address.pincode}` : 'Not set'}
                            </span>
                        </div>

                        <div className="profile__buttons">
                            <button className="profile__editButton" onClick={() => setEditMode(true)}>
                                Edit Profile
                            </button>
                            <button className="profile__signOutButton" onClick={handleSignOut}>
                                Sign Out
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Profile;
