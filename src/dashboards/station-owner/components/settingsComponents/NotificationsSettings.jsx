import React, { useState, useEffect } from 'react';
import { COLORS, FONTS } from '../../../../constants'; // Adjust path as needed

export default function NotificationsSettings() {
    // State to manage notification preferences (boolean for on/off)
    const [notificationPreferences, setNotificationPreferences] = useState({
        faultAlerts: true,
        // New topics
        earningsReceived: true,
        requestsApproval: true,
        chats: true,
        // Retained topic
        adminAnnouncements: true,
    });

    // useEffect to load existing preferences ONCE when the component mounts
    useEffect(() => {
        // --- THIS IS WHERE YOU'D FETCH ACTUAL USER PREFERENCES FROM YOUR BACKEND ---
        // Example:
        // const fetchPreferences = async () => {
        //     try {
        //         const response = await fetch('/api/user/notification-preferences');
        //         if (!response.ok) throw new Error('Failed to fetch preferences');
        //         const data = await response.json();
        //         setNotificationPreferences(data);
        //     } catch (error) {
        //         console.error('Error fetching notification preferences:', error);
        //         // Optionally set some default or error state
        //     }
        // };
        // fetchPreferences();

        // For now, using mock data as an initial state
        const mockPreferences = {
            faultAlerts: true,
            earningsReceived: true,
            requestsApproval: false, // Example: user had this off previously
            chats: true,
            adminAnnouncements: true,
        };
        setNotificationPreferences(mockPreferences);
    }, []); // Empty dependency array ensures it runs only once on mount

    // Function to "record" the preference change (i.e., make the API call)
    const recordPreferenceChange = async (preferenceType, newValue) => {
        // --- THIS IS WHERE YOU'D MAKE YOUR ACTUAL API CALL TO UPDATE THE BACKEND ---
        try {
            // Example of how you might send data to an API:
            // const response = await fetch('/api/user/update-notification-preference', {
            //     method: 'PUT',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ [preferenceType]: newValue }), // Send the specific change
            // });
            // if (!response.ok) {
            //     throw new Error(`Failed to update ${preferenceType}`);
            // }
            console.log(`Preference "${preferenceType}" updated to: ${newValue} (backend call simulated)`);
            // No need for success message here, as it's implicit
        } catch (error) {
            console.error(`Error updating preference "${preferenceType}":`, error);
            // In a real app, you might want to revert the UI state or show an error toast
            // For now, we'll just log the error.
        }
    };

    const handleChange = (e) => {
        const { name, checked } = e.target;

        // Optimistically update the UI first for responsiveness
        setNotificationPreferences(prev => ({
            ...prev,
            [name]: checked
        }));

        // Then, record the change by calling your backend update function
        recordPreferenceChange(name, checked);
    };

    // Helper component for a single toggle switch
    const NotificationToggle = ({ type, label, description }) => (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <h4 className="font-medium" style={{ color: COLORS.mainTextColor }}>
                        {label}
                    </h4>
                    <p className="text-sm" style={{color: COLORS.secondaryText}}>{description}</p>
                </div>
                {/* Toggle Switch */}
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        name={type}
                        checked={notificationPreferences[type]}
                        onChange={handleChange}
                        className="sr-only peer" // sr-only hides it visually but keeps it accessible
                    />
                    <div
                        className="w-11 h-6 rounded-full peer peer-focus:outline-none peer-focus:ring-2"
                        style={{
                            backgroundColor: notificationPreferences[type] ? COLORS.primary : COLORS.stroke,
                            transition: 'background-color 0.3s',
                            borderColor: COLORS.stroke,
                            boxShadow: 'inset 0 0 0 2px var(--tw-border-color)' // Simulate inner border
                        }}
                    >
                        {/* The 'dot' of the switch */}
                        <div
                            className={`absolute left-0.5 top-0.5 w-5 h-5 rounded-full bg-white transition-transform transform ${
                                notificationPreferences[type] ? 'translate-x-full' : 'translate-x-0'
                            }`}
                            style={{
                                boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)', // Subtle shadow for the dot
                            }}
                        ></div>
                    </div>
                </label>
            </div>
        </div>
    );

    return (
        <div
            className="rounded-xl bg-white py-6 px-8 flex flex-col gap-8"
            style={{
                fontFamily: FONTS.family.sans,
                color: COLORS.mainTextColor
            }}
        >
          <div className="mb-0">
              <h2 className="font-normal text-xl mb-0" style={{ color: COLORS.mainTextColor }}>
                Station Notifications
              </h2>
          </div>
            
            <div className="flex flex-col gap-8">
                <NotificationToggle
                    type="faultAlerts"
                    label="Receive Fault Alerts"
                    description="Get notified when faults are reported on your station or chargers."
                />

                <NotificationToggle
                    type="earningsReceived"
                    label="Earnings Received"
                    description="Get notified when earnings from charging sessions are processed and received."
                />

                <NotificationToggle
                    type="requestsApproval"
                    label="Requests Approval by Platform Manager"
                    description="Receive alerts for requests awaiting approval from the platform manager."
                />

                <NotificationToggle
                    type="chats"
                    label="Chats"
                    description="Get notified about new messages or activity in your chat conversations."
                />

                <NotificationToggle
                    type="adminAnnouncements"
                    label="Admin Announcements"
                    description="Platform-wide announcements or policy changes."
                />
            </div>
        </div>
    );
}