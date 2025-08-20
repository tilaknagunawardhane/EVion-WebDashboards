import React from 'react';
import { COLORS, FONTS } from '../../../../constants';
import UserIcon from '../../../../assets/connectors.svg';

export default function MainRequestCard({ request, onClick }) {

    // Status color configuration
    const statusColors = {
        'PROCESSING': {
            bg: `${COLORS.primary}20`,
            text: COLORS.primary
        },
        'TO_BE_INSTALLED': {
            bg: `${COLORS.HighlightText}20`,
            text: COLORS.HighlightText
        },
        'REJECTED': {
            bg: `${COLORS.danger}20`,
            text: COLORS.danger
        }
    };

    // const currentStatus = request.status || 'NEW';
    const currentStatus = request.status;
    const statusColor = statusColors[currentStatus] || statusColors['PROCESSING'];

    return (
        <div
            className="rounded-lg bg-white p-4 mb-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            style={{
                borderColor: COLORS.stroke
            }}
            onClick={onClick}
        >
            {/* User Info with Icon and Right-aligned New User badge */}
            <div className="flex justify-between items-center mb-4"> {/* Changed from items-start to items-center */}
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
                    <div className="flex items-center gap-2"> {/* Added flex container for name and badge */}
                        <h3 className="text-base font-medium" style={{
                            color: COLORS.mainTextColor,
                            fontFamily: FONTS.family.sans
                        }}>
                            {request.chargerData.charger_name || 'John Doe'}
                        </h3>
                        {request.stationType === 'New Station' && (
                            <span className="text-xs px-2 py-1 rounded-full whitespace-nowrap" style={{
                                color: COLORS.background,
                                fontFamily: FONTS.family.sans,
                                backgroundColor: COLORS.primary,
                            }}>
                                New Station
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Station Info */}
            <div className="mb-4">
                <h4 className="text-sm font-medium mb-4" style={{
                    color: COLORS.mainTextColor,
                    fontFamily: FONTS.family.sans,
                }}>
                    {request.stationName || 'EV Charging Station'}
                </h4>
                <div className="flex justify-between items-center mb-1">
                    <p className="text-xs" style={{
                        color: COLORS.secondaryText,
                        fontFamily: FONTS.family.sans
                    }}>
                        {request.powerType} Charger
                    </p>
                    <p className="text-xs" style={{
                        color: COLORS.secondaryText,
                        fontFamily: FONTS.family.sans
                    }}>
                        Power Output: {request.power} kWh
                    </p>
                </div>
                <p className="text-xs" style={{
                    color: COLORS.secondaryText,
                    fontFamily: FONTS.family.sans
                }}>
                    Unit Price: LKR {request.chargerData.price}
                </p>
            </div>

            {/* Connectors Requested */}
            <div className="mb-4">
                <p className="text-xs" style={{
                    color: COLORS.mainTextColor,
                    fontFamily: FONTS.family.sans
                }}>
                    Connectors Requested: <span style={{
                        color: COLORS.mainTextColor,
                        fontWeight: FONTS.weights.medium
                    }}>
                        {request.connectorType || '02'}
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
                    {currentStatus.replace('_', ' ').replace('_', '  ')}
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