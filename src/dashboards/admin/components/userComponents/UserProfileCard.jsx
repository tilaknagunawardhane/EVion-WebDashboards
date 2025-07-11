import React from 'react';
import { COLORS, FONTS } from '../../../../constants';
import UserIcon from '../../../../assets/user_icon.svg';

export default function UserProfileCard({ user }) {
    // Status configuration object
    const statusConfig = {
        'Active': {
            iconColorFilter: `
                brightness(0) 
                saturate(100%) 
                invert(67%) 
                sepia(48%) 
                saturate(718%) 
                hue-rotate(123deg) 
                brightness(95%) 
                contrast(101%)
            `,
            bgColor: COLORS.bgGreen,
            borderColor: COLORS.primary,
            statusBgColor: COLORS.primary,
            statusTextColor: COLORS.background
        },
        'Blocked': {
            iconColorFilter: `
                brightness(0) 
                saturate(100%) 
                invert(19%) 
                sepia(99%) 
                saturate(2213%) 
                hue-rotate(349deg) 
                brightness(93%) 
                contrast(96%)
            `,
            bgColor: COLORS.bgRed,
            borderColor: COLORS.danger,
            statusBgColor: COLORS.danger,
            statusTextColor: COLORS.background
        },
        'Pending': {
            iconColorFilter: `
                brightness(0) 
                saturate(100%) 
                invert(81%) 
                sepia(51%) 
                saturate(629%) 
                hue-rotate(358deg) 
                brightness(102%) 
                contrast(101%)
            `,
            bgColor: '#fff3cd',
            borderColor: '#ffc107',
            statusBgColor: '#ffc107',
            statusTextColor: COLORS.mainTextColor
        }
    };

    // Get current status configuration or default to Active
    const currentStatus = statusConfig[user['Account Status']] || statusConfig['Active'];

    const renderStatusIcon = (IconComponent) => (
        <img
            src={IconComponent}
            alt=""
            className="w-6 h-6"
            style={{
                filter: currentStatus.iconColorFilter
            }}
        />
    );

    return (
        <div className="flex flex-col gap-4">
            {/* Main Profile Card */}
            <div className='p-4 rounded-xl' style={{
                backgroundColor: currentStatus.bgColor,
                border: `2px solid ${currentStatus.borderColor}`
            }}>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                                {renderStatusIcon(UserIcon)}
                            </div>
                            <div>
                                <h2 style={{
                                    fontSize: FONTS.sizes.lg,
                                    fontWeight: FONTS.weights.medium,
                                    color: COLORS.mainTextColor,
                                    marginBottom: '4px'
                                }}>
                                    {user.Name}
                                </h2>
                                <span
                                    className="px-4.5 py-1 text-xs font-medium inline-flex items-center gap-1 rounded-full"
                                    style={{
                                        background: currentStatus.statusBgColor,
                                        color: currentStatus.statusTextColor
                                    }}
                                >
                                    {user['Account Status']}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <div style={{
                            color: COLORS.secondaryText,
                            fontSize: FONTS.sizes.xs,
                            fontWeight: FONTS.weights.medium
                        }}>
                            Date Joined:
                        </div>
                        <div style={{
                            color: COLORS.mainTextColor,
                            fontSize: FONTS.sizes.sm,
                            fontWeight: FONTS.weights.medium
                        }}>
                            {user['Date of Registration']}
                        </div>
                    </div>
                </div>
            </div>

            {/* Blocked User Additional Card - Only shown when status is Blocked */}
            {user['Account Status'] === 'Blocked' && (
                <div className='p-4 rounded-xl' style={{
                    backgroundColor: COLORS.bgRed,
                    border: `2px solid ${COLORS.danger}`
                }}>
                    <div className="flex flex-col gap-3">
                        <div className='text-center'>
                            <div style={{
                                color: COLORS.danger,
                                fontSize: FONTS.sizes.sm,
                                fontWeight: FONTS.weights.medium
                            }}>
                                Balance
                            </div>
                            <div style={{
                                color: COLORS.danger,
                                fontSize: FONTS.sizes.xl,
                                fontWeight: FONTS.weights.semibold
                            }}>
                                <span style={{ fontSize: FONTS.sizes.xs, fontWeight: FONTS.weights.medium }}>-LKR </span>
                                <span>{user['Account Balance'] || '0.00'}</span>
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <div style={{
                                color: COLORS.secondaryText,
                                fontSize: FONTS.sizes.xs,
                                fontWeight: FONTS.weights.medium
                            }}>
                                Blocked On:
                            </div>
                            <div style={{
                                color: COLORS.mainTextColor,
                                fontSize: FONTS.sizes.sm,
                                fontWeight: FONTS.weights.medium
                            }}>
                                {user['Blocked Date'] || 'Not specified'}
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}