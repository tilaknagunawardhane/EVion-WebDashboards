import React, { useState, useEffect } from 'react';
import InputField from '../../../../components/ui/InputField'; // Adjust path as needed
import { COLORS, FONTS } from '../../../../constants'; // Adjust path as needed
import Button from '../../../../components/ui/Button';

export default function SecuritySettings() {
    // State for password change form
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });
    const [passwordErrors, setPasswordErrors] = useState({});
    const [passwordChangeStatus, setPasswordChangeStatus] = useState(''); // For feedback

    // State for email change form
    const [emailForm, setEmailForm] = useState({
        currentEmail: 'john.doe@example.com', // Pre-fill with current email (fetched from API)
        newEmail: '',
        confirmEmail: '',
        userPasswordForEmailChange: '' // Added for re-authentication
    });
    const [emailErrors, setEmailErrors] = useState({});
    const [emailChangeStatus, setEmailChangeStatus] = useState(''); // For feedback

    // Simulate fetching current email on component mount
    useEffect(() => {
        // --- THIS IS WHERE YOU'D FETCH THE ACTUAL CURRENT EMAIL FROM YOUR BACKEND ---
        // Example:
        // const fetchCurrentEmail = async () => {
        //     try {
        //         const response = await fetch('/api/user/current-email'); // Or part of user profile fetch
        //         if (!response.ok) throw new Error('Failed to fetch current email');
        //         const data = await response.json();
        //         setEmailForm(prev => ({ ...prev, currentEmail: data.email }));
        //     } catch (error) {
        //         console.error('Error fetching current email:', error);
        //     }
        // };
        // fetchCurrentEmail();
    }, []);

    // --- Password Change Handlers (Unchanged from previous version) ---
    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordForm(prev => ({ ...prev, [name]: value }));
        if (passwordErrors[name]) {
            setPasswordErrors(prev => ({ ...prev, [name]: '' }));
        }
        setPasswordChangeStatus('');
    };

    const validatePasswordChange = () => {
        const errors = {};
        let isValid = true;

        if (!passwordForm.currentPassword.trim()) {
            errors.currentPassword = 'Current password is required.';
            isValid = false;
        }
        if (!passwordForm.newPassword.trim()) {
            errors.newPassword = 'New password is required.';
            isValid = false;
        } else if (passwordForm.newPassword.length < 8) {
            errors.newPassword = 'Password must be at least 8 characters long.';
            isValid = false;
        } else if (!/[A-Z]/.test(passwordForm.newPassword)) {
            errors.newPassword = 'Password must contain at least one uppercase letter.';
            isValid = false;
        } else if (!/[a-z]/.test(passwordForm.newPassword)) {
            errors.newPassword = 'Password must contain at least one lowercase letter.';
            isValid = false;
        } else if (!/\d/.test(passwordForm.newPassword)) {
            errors.newPassword = 'Password must contain at least one number.';
            isValid = false;
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordForm.newPassword)) {
            errors.newPassword = 'Password must contain at least one special character.';
            isValid = false;
        }

        if (!passwordForm.confirmNewPassword.trim()) {
            errors.confirmNewPassword = 'Confirm new password is required.';
            isValid = false;
        } else if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
            errors.confirmNewPassword = 'Passwords do not match.';
            isValid = false;
        }

        setPasswordErrors(errors);
        return isValid;
    };

    const handleSubmitPasswordChange = async (e) => {
        e.preventDefault();
        if (validatePasswordChange()) {
            setPasswordChangeStatus('Changing password...');
            try {
                // --- YOUR ACTUAL API CALL TO CHANGE PASSWORD GOES HERE ---
                // This would send currentPassword, newPassword to backend
                // Backend would verify currentPassword, hash newPassword, update database
                await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
                console.log('Password change data:', passwordForm);

                setPasswordChangeStatus('Password changed successfully!');
                setPasswordForm({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
                setTimeout(() => setPasswordChangeStatus(''), 3000);
            } catch (error) {
                console.error('Password change error:', error);
                setPasswordChangeStatus(`Change Failed! ${error.message || ''}`);
                setTimeout(() => setPasswordChangeStatus(''), 4000);
            }
        } else {
            setPasswordChangeStatus('Please fix the errors above.');
        }
    };

    // --- Email Change Handlers (MODIFIED for Verification) ---
    const handleEmailChange = (e) => {
        const { name, value } = e.target;
        setEmailForm(prev => ({ ...prev, [name]: value }));
        if (emailErrors[name]) {
            setEmailErrors(prev => ({ ...prev, [name]: '' }));
        }
        setEmailChangeStatus('');
    };

    const validateEmailChangeRequest = () => { // Validation for sending verification email
        const errors = {};
        let isValid = true;

        if (!emailForm.newEmail.trim()) {
            errors.newEmail = 'New email is required.';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailForm.newEmail)) {
            errors.newEmail = 'Invalid email format.';
            isValid = false;
        } else if (emailForm.newEmail === emailForm.currentEmail) {
            errors.newEmail = 'New email cannot be the same as current email.';
            isValid = false;
        }

        if (!emailForm.confirmEmail.trim()) {
            errors.confirmEmail = 'Confirm email is required.';
            isValid = false;
        } else if (emailForm.newEmail !== emailForm.confirmEmail) {
            errors.confirmEmail = 'Emails do not match.';
            isValid = false;
        }

        if (!emailForm.userPasswordForEmailChange.trim()) {
            errors.userPasswordForEmailChange = 'Your password is required to confirm this change.';
            isValid = false;
        }

        setEmailErrors(errors);
        return isValid;
    };

    const handleSubmitEmailChangeRequest = async (e) => {
        e.preventDefault();
        if (validateEmailChangeRequest()) {
            setEmailChangeStatus('Sending verification email...');
            try {
                // --- YOUR ACTUAL API CALL TO INITIATE EMAIL CHANGE GOES HERE ---
                // Send: newEmail, confirmEmail, userPasswordForEmailChange
                // Backend:
                // 1. Re-authenticate user with userPasswordForEmailChange. If fails, return error.
                // 2. Generate a unique, time-sensitive token.
                // 3. Store newEmail + token as pending change for this user.
                // 4. Send email to newEmail with verification link containing the token.
                // 5. Respond to frontend with success.
                // The actual email update in DB happens ONLY when user clicks link.

                await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call

                console.log('Email change request data:', {
                    newEmail: emailForm.newEmail,
                    password: emailForm.userPasswordForEmailChange
                });

                setEmailChangeStatus('Verification email sent! Check your new inbox.');
                // Clear the fields for new email and password, keep currentEmail for display
                setEmailForm(prev => ({
                    ...prev,
                    newEmail: '',
                    confirmEmail: '',
                    userPasswordForEmailChange: ''
                }));
                setTimeout(() => setEmailChangeStatus(''), 7000); // Keep message longer
            } catch (error) {
                console.error('Email change request error:', error);
                setEmailChangeStatus(`Request Failed! ${error.message || ''}`);
                setTimeout(() => setEmailChangeStatus(''), 5000);
            }
        } else {
            setEmailChangeStatus('Please fix the errors above to send verification.');
        }
    };


    return (
        <div
            className="rounded-xl bg-transparent p-0 flex flex-col gap-8"
            style={{
                fontFamily: FONTS.family.sans,
                color: COLORS.mainTextColor
            }}
        >
            {/* --- Change Password Section --- */}
            <div className="flex flex-col gap-4 px-8 py-6 rounded-xl bg-white">
                <h3 className="font-normal text-xl" style={{ color: COLORS.mainTextColor }}>
                    Change Password
                </h3>
                <form onSubmit={handleSubmitPasswordChange} className="flex flex-col gap-4">
                    <div className="flex-1/2">
                        <InputField
                            label="Current Password"
                            name="currentPassword"
                            type="password"
                            value={passwordForm.currentPassword}
                            onChange={handlePasswordChange}
                            required={true}
                            error={!!passwordErrors.currentPassword}
                            errorMessage={passwordErrors.currentPassword}
                        />
                    </div>
                    
                    <div className="flex justify-between space-x-4">
                            <InputField
                                label="New Password"
                                name="newPassword"
                                type="password"
                                value={passwordForm.newPassword}
                                onChange={handlePasswordChange}
                                required={true}
                                error={!!passwordErrors.newPassword}
                                errorMessage={passwordErrors.newPassword}
                                placeholder="At least 8 chars, 1 UPPcase, 1 lowcase, 1 num, 1 special char"
                            />
                            <InputField
                                label="Confirm New Password"
                                name="confirmNewPassword"
                                type="password"
                                value={passwordForm.confirmNewPassword}
                                onChange={handlePasswordChange}
                                required={true}
                                error={!!passwordErrors.confirmNewPassword}
                                errorMessage={passwordErrors.confirmNewPassword}
                            />
                    </div>
                    
                    <div className="flex justify-end mt-2">
                        <Button
                            type="submit"
                        >
                            Update Password
                        </Button>
                    </div>
                    {passwordChangeStatus && (
                        <p className="text-center text-sm font-medium mt-2" style={{ color: passwordChangeStatus.includes('Failed') ? COLORS.danger : COLORS.primary }}>
                            {passwordChangeStatus}
                        </p>
                    )}
                </form>
            </div>

            {/* --- Change Email Section (Modified for Verification Flow) --- */}
            <div className="flex flex-col gap-4 px-8 py-6 rounded-xl bg-white">
                <h3 className="font-normal text-xl" style={{ color: COLORS.mainTextColor }}>
                    Change Email Address
                </h3>
                <form onSubmit={handleSubmitEmailChangeRequest} className="flex flex-col gap-4">
                    <InputField
                        label="Current Email"
                        name="currentEmail"
                        type="email"
                        value={emailForm.currentEmail}
                        readOnly={true} // Display current email as read-only
                        disabled={true}
                        className="opacity-70 cursor-not-allowed"
                    />

                    <div className="flex justify-between space-x-4"> 
                        <InputField
                            label="New Email"
                            name="newEmail"
                            type="email"
                            value={emailForm.newEmail}
                            onChange={handleEmailChange}
                            required={true}
                            error={!!emailErrors.newEmail}
                            errorMessage={emailErrors.newEmail}
                        />
                        <InputField
                            label="Confirm New Email"
                            name="confirmEmail"
                            type="email"
                            value={emailForm.confirmEmail}
                            onChange={handleEmailChange}
                            required={true}
                            error={!!emailErrors.confirmEmail}
                            errorMessage={emailErrors.confirmEmail}
                        />
                    </div>
                     <InputField
                        label="Your Password"
                        name="userPasswordForEmailChange"
                        type="password"
                        value={emailForm.userPasswordForEmailChange}
                        onChange={handleEmailChange}
                        required={true}
                        error={!!emailErrors.userPasswordForEmailChange}
                        errorMessage={emailErrors.userPasswordForEmailChange}
                        placeholder="Required to confirm email change"
                    />
                    <div className="flex justify-end mt-2">
                        <Button
                            type="submit"
                        >
                            Send Verification Email
                        </Button>
                    </div>
                    {emailChangeStatus && (
                        <p className="text-center text-sm font-medium mt-2" style={{ color: emailChangeStatus.includes('Failed') ? COLORS.danger : (emailChangeStatus.includes('Verification email sent!') ? COLORS.primary : COLORS.mainTextColor) }}>
                            {emailChangeStatus}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}