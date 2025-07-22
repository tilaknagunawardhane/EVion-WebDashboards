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
            alt="User"
            className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" // More responsive icon sizing
            style={{
                filter: currentStatus.iconColorFilter,
                minWidth: '1rem' // Ensure icon doesn't shrink too much
            }}
        />
    );

    return (
        <div className="flex flex-col gap-2 xs:gap-2 sm:gap-2 w-full">
            {/* Main Profile Card */}
            <div className='p-2 xs:p-3 sm:p-4 rounded-md xs:rounded-lg sm:rounded-xl w-full' style={{
                backgroundColor: currentStatus.bgColor,
                border: `1px solid ${currentStatus.borderColor}`
            }}>
                <div className="flex flex-col gap-2 xs:gap-3 sm:gap-4 w-full">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2 xs:gap-3 sm:gap-4 w-full">
                            {/* Avatar Container */}
                            <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                                {renderStatusIcon(UserIcon)}
                            </div>
                            
                            {/* User Info */}
                            <div className="flex-1 min-w-0 overflow-hidden">
                                <h2 className="truncate text-sm xs:text-base sm:text-lg" style={{
                                    fontWeight: FONTS.weights.medium,
                                    color: COLORS.mainTextColor,
                                    marginBottom: '0.25rem'
                                }}>
                                    {user.Name}
                                </h2>
                                <span
                                    className="px-3 py-1 xs:px-3 xs:py-1 text-xxs xs:text-xs inline-flex items-center gap-1 rounded-full"
                                    style={{
                                        background: currentStatus.statusBgColor,
                                        color: currentStatus.statusTextColor,
                                        lineHeight: '1.2',
                                        fontSize: FONTS.sizes.xs,

                                    }}
                                >
                                    {user['Account Status']}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Date Joined */}
                    <div className='flex justify-between items-center w-full'>
                        <span className="text-xxs xs:text-xs" style={{
                            color: COLORS.secondaryText,
                            fontWeight: FONTS.weights.medium,
                                        fontSize: FONTS.sizes.xs,

                        }}>
                            Date Joined:
                        </span>
                        <span className="text-xs xs:text-sm text-right" style={{
                            color: COLORS.mainTextColor,
                            fontWeight: FONTS.weights.medium
                        }}>
                            {user['Date of Registration']}
                        </span>
                    </div>
                </div>
            </div>

            {/* Blocked User Additional Card */}
            {user['Account Status'] === 'Blocked' && (
                <div className='p-2 xs:p-3 sm:p-4 rounded-md xs:rounded-lg sm:rounded-xl w-full' style={{
                    backgroundColor: COLORS.bgRed,
                    border: `1px solid ${COLORS.danger}`
                }}>
                    <div className="flex flex-col gap-1 xs:gap-2 sm:gap-3 w-full">
                        {/* Balance */}
                        <div className='text-center'>
                            <div className="text-xs xs:text-sm" style={{
                                color: COLORS.danger,
                                fontWeight: FONTS.weights.medium
                            }}>
                                Balance
                            </div>
                            <div className="text-base xs:text-lg sm:text-xl" style={{
                                color: COLORS.danger,
                                fontWeight: FONTS.weights.semibold,
                                whiteSpace: 'nowrap'
                            }}>
                                <span className="text-xxs xs:text-xs" style={{ 
                                    fontWeight: FONTS.weights.medium,
                                        fontSize: FONTS.sizes.sm,

                                }}>
                                    -LKR 
                                </span>
                                <span> </span>
                                <span>{user['Account Balance'] || '0.00'}</span>
                            </div>
                        </div>
                        
                        {/* Blocked Date */}
                        <div className='flex justify-between items-center w-full'>
                            <span className="text-xxs xs:text-xs" style={{
                                color: COLORS.secondaryText,
                                fontWeight: FONTS.weights.medium,
                                        fontSize: FONTS.sizes.xs,

                            }}>
                                Blocked On:
                            </span>
                            <span className="text-xs xs:text-sm text-right" style={{
                                color: COLORS.mainTextColor,
                                fontWeight: FONTS.weights.medium
                            }}>
                                {user['Blocked Date'] || 'Not specified'}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}