import React from 'react';
import { useNavigate } from 'react-router-dom';
import { COLORS, FONTS } from '../../../../constants';
import UserIcon from '../../../../assets/user_icon.svg';

export default function MainRequestCard({ request }) {
    const navigate = useNavigate();

    // Status color configuration
    const statusColors = {
        'NEW': {
            bg: `${COLORS.primary}20`,
            text: COLORS.primary
        },
        'IN-PROGRESS': {
            bg: `${COLORS.HighlightText}20`,
            text: COLORS.HighlightText
        },
        'REJECTED': {
            bg: `${COLORS.danger}20`,
            text: COLORS.danger
        }
    };

    const currentStatus = request.status || 'NEW';
    const statusColor = statusColors[currentStatus] || statusColors['NEW'];


    const handleCardClick = () => {
        // Add type parameter to navigation
        navigate(`/admin/stations/requests/${request.type}/${request.id}`);
    };

    return (
        <div
            className="rounded-lg bg-white p-4 mb-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            style={{
                borderColor: COLORS.stroke
            }}
            onClick={handleCardClick}
        >
            {/* User Info with Icon and Right-aligned New User badge */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: COLORS.bgGreen }}>
                        <img
                            src={UserIcon}
                            alt="User"
                            className="w-5 h-5"
                            style={{
                                filter: `
                                    brightness(0) 
                                    saturate(100%) 
                                    invert(67%) 
                                    sepia(48%) 
                                    saturate(718%) 
                                    hue-rotate(123deg) 
                                    brightness(95%) 
                                    contrast(101%)
                                `,
                            }}
                        />
                    </div>
                    <h3 className="text-base font-medium" style={{
                        color: COLORS.mainTextColor,
                        fontFamily: FONTS.family.sans
                    }}>
                        {request.userName || 'John Doe'}
                    </h3>
                </div>
                {request.userType === 'New User' && (
                    <span className="text-xs px-2 py-1 rounded-full" style={{
                        color: COLORS.background,
                        fontFamily: FONTS.family.sans,
                        backgroundColor: COLORS.primary,
                    }}>
                        New User
                    </span>
                )}
            </div>

            {/* Station Info */}
            <div className="mb-4">
                <h4 className="text-sm font-medium" style={{
                    color: COLORS.mainTextColor,
                    fontFamily: FONTS.family.sans,
                    marginBottom: '4px'
                }}>
                    {request.stationName || 'EV Charging Station'}
                </h4>
                <p className="text-xs" style={{
                    color: COLORS.secondaryText,
                    fontFamily: FONTS.family.sans
                }}>
                    {request.stationAddress || 'No.24, Joshep Road, Wellpanna'}
                </p>
            </div>

            {/* Chargers Requested */}
            <div className="mb-4">
                <p className="text-xs" style={{
                    color: COLORS.mainTextColor,
                    fontFamily: FONTS.family.sans
                }}>
                    No. of Chargers Requested: <span style={{
                        color: COLORS.mainTextColor,
                        fontWeight: FONTS.weights.medium
                    }}>
                        {request.chargersRequested || '02'}
                    </span>
                </p>
            </div>

            {/* Status and Date */}
            <div className="flex justify-between items-center">
                <span className="px-2 py-1 text-xs rounded-full" style={{
                    backgroundColor: statusColor.bg,
                    color: statusColor.text,
                    fontFamily: FONTS.family.sans,
                    fontWeight: FONTS.weights.medium
                }}>
                    {currentStatus}
                </span>

                <div className="text-xs" style={{
                    color: COLORS.secondaryText,
                    fontFamily: FONTS.family.sans
                }}>
                    {request.date || '6 Jul 09:20 AM'}
                </div>
            </div>
        </div>
    );
}