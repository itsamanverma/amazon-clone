// ===== FIREBASE AUTH ERROR MANAGEMENT =====

export const getAuthErrorMessage = (errorCode) => {
    const errorMessages = {
        // Authentication Errors
        'auth/wrong-password': {
            message: 'Oops! That password isn\'t quite right. Double-check and try again, or reset your password if you\'ve forgotten it.',
            type: 'error',
            icon: '🔑'
        },
        'auth/user-not-found': {
            message: 'Hmm, we can\'t find an account with that email. Would you like to create a new account instead?',
            type: 'info',
            icon: '🤔'
        },
        'auth/invalid-email': {
            message: 'That email doesn\'t look quite right. Please check the format and try again.',
            type: 'warning',
            icon: '📧'
        },
        'auth/user-disabled': {
            message: 'Your account has been temporarily suspended. Contact our support team for assistance.',
            type: 'error',
            icon: '🛡️'
        },
        'auth/too-many-requests': {
            message: 'Whoa there! Too many attempts. Take a quick break and try again in a few minutes.',
            type: 'warning',
            icon: '⏳'
        },
        'auth/weak-password': {
            message: 'Let\'s make your account more secure! Please choose a password with at least 6 characters.',
            type: 'info',
            icon: '💪'
        },
        'auth/email-already-in-use': {
            message: 'Good news! You already have an account with this email. Try signing in instead.',
            type: 'info',
            icon: '✨'
        },
        'auth/invalid-credential': {
            message: 'Invalid credentials. Please check your email and password.',
            type: 'error',
            icon: '⚠️'
        },
        'auth/network-request-failed': {
            message: 'Network error. Please check your internet connection.',
            type: 'error',
            icon: '🌐'
        },
        'auth/internal-error': {
            message: 'An internal error occurred. Please try again later.',
            type: 'error',
            icon: '🔧'
        },
        'auth/quota-exceeded': {
            message: 'Email quota exceeded. Please try again later.',
            type: 'warning',
            icon: '📮'
        },
        'auth/unauthorized-domain': {
            message: 'This domain is not authorized for password reset.',
            type: 'error',
            icon: '🚫'
        },
        'auth/user-token-expired': {
            message: 'Your session has expired. Please try again.',
            type: 'error',
            icon: '⏱️'
        },
        'auth/invalid-action-code': {
            message: 'The reset link is invalid or has expired.',
            type: 'error',
            icon: '🔗'
        },
        'auth/expired-action-code': {
            message: 'The reset link has expired. Please request a new one.',
            type: 'warning',
            icon: '⌛'
        },
        'auth/missing-email': {
            message: 'Email address is required.',
            type: 'error',
            icon: '✉️'
        },
        'auth/requires-recent-login': {
            message: 'Please sign out and sign back in before retrying this operation.',
            type: 'warning',
            icon: '🔄'
        },
        'auth/operation-not-allowed': {
            message: 'This operation is not allowed. Please contact support.',
            type: 'error',
            icon: '🚫'
        },
        'auth/timeout': {
            message: 'The operation timed out. Please check your connection and try again.',
            type: 'warning',
            icon: '⏱️'
        },
        'auth/app-deleted': {
            message: 'This app instance has been deleted. Please refresh the page.',
            type: 'error',
            icon: '🔄'
        },
        'auth/invalid-api-key': {
            message: 'Invalid API key. Please contact support.',
            type: 'error',
            icon: '🔑'
        },
        'auth/captcha-check-failed': {
            message: 'Captcha verification failed. Please try again.',
            type: 'error',
            icon: '🤖'
        },
        'auth/invalid-continue-uri': {
            message: 'The continue URL provided is invalid.',
            type: 'error',
            icon: '🔗'
        },
        'auth/unauthorized-continue-uri': {
            message: 'The continue URL domain is not authorized.',
            type: 'error',
            icon: '🚫'
        }
    };

    return errorMessages[errorCode] || {
        message: `Authentication error: ${errorCode.replace('auth/', '').replace(/-/g, ' ')}`,
        type: 'error',
        icon: '❌'
    };
};

export const getSuccessMessage = (action) => {
    const successMessages = {
        'signin': {
            message: 'Welcome back! You\'re now signed in and ready to start shopping.',
            type: 'success',
            icon: '🎉'
        },
        'signup': {
            message: 'Awesome! Your account has been created. Welcome to our shopping community!',
            type: 'success',
            icon: '🚀'
        },
        'password-reset': {
            message: 'Password reset email sent! Check your inbox and follow the link to create a new password.',
            type: 'success',
            icon: '📬'
        },
        'password-reset-detailed': {
            message: 'Reset email is on its way! It should arrive within the next few minutes.',
            type: 'success',
            icon: '✈️'
        }
    };

    return successMessages[action] || {
        message: 'Operation completed successfully!',
        type: 'success',
        icon: '✅'
    };
};

// Enhanced message functions for custom scenarios
export const getCustomMessage = (type, message, icon = '💬') => {
    return {
        text: message,
        type: type,
        icon: icon
    };
};

export const getPasswordResetMessage = (email) => {
    return {
        text: `Great! We've sent a password reset link to ${email}. Check your inbox and click the link to set up your new password.`,
        type: 'success',
        icon: '📧'
    };
};

// Client-side validation functions
export const validateEmail = (email) => {
    if (!email || email.trim() === '') {
        return getAuthErrorMessage('auth/missing-email');
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return getAuthErrorMessage('auth/invalid-email');
    }
    
    return null; // No error
};

export const validatePassword = (password) => {
    if (!password || password.trim() === '') {
        return {
            message: 'Password is required.',
            type: 'error',
            icon: '🔐'
        };
    }
    
    if (password.length < 6) {
        return getAuthErrorMessage('auth/weak-password');
    }
    
    return null; // No error
};

export const validateLoginForm = (email, password) => {
    const emailError = validateEmail(email);
    if (emailError) return emailError;
    
    const passwordError = validatePassword(password);
    if (passwordError) return passwordError;
    
    return null; // No error
};