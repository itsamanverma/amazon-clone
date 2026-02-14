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
                try {
                    const docRef = doc(db, "users", user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setMobile(data.mobile || '');
                        setAddress(data.address || { street: '', city: '', pincode: '' });
                    }
                } catch (error) {
                    console.log("Error fetching user data (likely offline):", error);
                }
            };
            fetchUserData();
        } else {
            navigate('/login');
        }
    }, [user, navigate]);

    const validateForm = () => {
        if (!name.trim()) {
            setError('Please enter your name.');
            return false;
        }
        if (!email.trim()) {
            setError('Please enter your email.');
            return false;
        }
        // Basic email regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return false;
        }
        if (mobile && !/^\d{10}$/.test(mobile)) { // Optional mobile validation (10 digits)
            setError('Please enter a valid 10-digit mobile number.');
            return false;
        }
        return true;
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

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
            setTimeout(() => {
                setEditMode(false);
                setSuccess('');
            }, 1000);

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
            {editMode ? (
                <div className="profile__editContainer">
                    <div className='profile__logoContainer'>
                        <img
                            className="profile__logo"
                            src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
                            alt="Amazon Logo"
                        />
                    </div>

                    <div className="profile__card">
                        <h1>Edit Profile</h1>

                        {error && <div className="profile__message profile__message--error">{error}</div>}
                        {success && <div className="profile__message profile__message--success">{success}</div>}

                        <form className="profile__form">
                            <div className="profile__inputGroup">
                                <h5>Your Name</h5>
                                <input
                                    className="profile__input"
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>

                            <div className="profile__inputGroup">
                                <h5>Email</h5>
                                <input
                                    className="profile__input"
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="profile__inputGroup">
                                <h5>Mobile Number</h5>
                                <input
                                    className="profile__input"
                                    type="tel"
                                    value={mobile}
                                    onChange={e => setMobile(e.target.value)}
                                    placeholder="10-digit mobile number"
                                />
                            </div>

                            <div className="profile__inputGroup">
                                <h5>Address</h5>
                                <input
                                    className="profile__input"
                                    type="text"
                                    placeholder="Street Address"
                                    value={address.street}
                                    onChange={e => setAddress({ ...address, street: e.target.value })}
                                />
                                <div className="profile__row">
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
                            </div>

                            <button className="profile__saveButton" onClick={handleUpdate} disabled={loading}>
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>

                            <button className="profile__cancelButton" onClick={() => setEditMode(false)}>
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="profile__container">
                    <div className="profile__headerMain">
                        <div className="profile__avatarSection">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" alt="Avatar" className="profile__avatarLarge" />
                            <div className="profile__nameContainer">
                                <h1>{name}</h1>
                                <span className="profile__editIcon" onClick={() => setEditMode(true)}>✎</span>
                            </div>
                            <div className="profile__location">
                                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png" alt="India" width="20" />
                                EN
                            </div>
                        </div>
                    </div>

                    <div className="profile__contentMain">
                        <h2>Your Profile</h2>
                        <p className="profile__subtitle">Your profile preferences help us personalise recommendations for you.</p>

                        <div className="profile__tabs">
                            <div className="profile__tab active">Clothing and Shoes</div>
                            <div className="profile__tab">Size, fit and price</div>
                        </div>

                        <div className="profile__sectionCard">
                            <h3>About you</h3>

                            <div className="profile__preferenceRow">
                                <span>Preferred department</span>
                                <span className="arrow-down">⌵</span>
                            </div>
                            <div className="profile__preferenceRow">
                                <span>Height and weight</span>
                                <span className="arrow-down">⌵</span>
                            </div>
                            <div className="profile__preferenceRow">
                                <span>Age group</span>
                                <span className="arrow-down">⌵</span>
                            </div>

                            <h3>Department preferences</h3>
                            <p className="profile__smallText">Share preferences for each department to get improved recommendations when you shop there.</p>

                            <div className="profile__subTabs">
                                <span className="active">Women's</span>
                                <span>Men's</span>
                            </div>

                            <div className="profile__preferenceRow">
                                <span>Fit attributes</span>
                                <span className="arrow-down">⌵</span>
                            </div>
                            <div className="profile__preferenceRow">
                                <span>Shoes</span>
                                <span className="arrow-down">⌵</span>
                            </div>
                        </div>

                        <div className="profile__sectionCard">
                            <div className="profile__tabHeader">
                                <h3 className="active">Interests</h3>
                                <h3>Activities and hobbies</h3>
                            </div>

                            <p className="profile__smallText">Suggested interests Based on your Amazon activity and popular interests. Select to get personalised recommendations</p>

                            <div className="profile__interests">
                                {["Skin Care", "Storage & Organization", "Interior Design", "Hair Care and Styling", "Babies and Toddlers", "Dorm Essentials", "Baking", "Makeup", "Women's Attire", "Party Planning"].map(tag => (
                                    <button key={tag} className="profile__interestChip">+ {tag}</button>
                                ))}
                            </div>

                            <button className="profile__saveInterestBtn">Save</button>
                        </div>

                        {/* Keep old details for reference or remove if strictly following UI? 
                            I will keep them below in a 'Account Details' section just in case user needs them.
                        */}
                        <div className="profile__sectionCard">
                            <h3>Account Details</h3>
                            <p><strong>Email:</strong> {email}</p>
                            <p><strong>Mobile:</strong> {mobile || 'Not set'}</p>
                            <p><strong>Address:</strong> {address.street ? `${address.street}, ${address.city} ${address.pincode}` : 'Not set'}</p>
                            <button className="profile__signOutButton" onClick={handleSignOut} style={{ marginTop: '10px' }}>Sign Out</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Profile;
