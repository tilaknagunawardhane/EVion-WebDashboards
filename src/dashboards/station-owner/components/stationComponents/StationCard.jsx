import React, { useState, useRef, useEffect } from 'react';
import { COLORS, FONTS } from '../../../../constants';
import Button from '../../../../components/ui/Button';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'; // Import chevron icons

export default function StationCard({ station, onClick, onPay }) {
    const [expanded, setExpanded] = useState(false); // Reintroduce expanded state

    const statusTagBackgroundColors = {
        'Open': COLORS.bgGreen,          
        'Approved - Waiting for Payment': COLORS.bgGreen,
        'To be installed': COLORS.mainTextColor, 
        'Pending Approval': COLORS.bgYellow,
        'Closed': COLORS.bgRed,
    };

    const statusTagFontColors = {
        'Open': COLORS.primary,
        'Approved - Waiting for Payment': COLORS.primary,
        'To be installed': COLORS.background, 
        'Pending Approval': COLORS.HighlightText,
        'Closed': COLORS.danger,
    };

    // Correctly determine number of chargers/requested chargers
    const numberOfChargers = station.chargers ? station.chargers.length : 0;
    const isRequestedChargers = ['Pending Approval', 'Approved - Waiting for Payment', 'To be installed'].includes(station.status);
    const chargerCountLabel = isRequestedChargers ? 'Number of Requested Chargers:' : 'Number of Chargers:';


    // Determine if the card should be expandable
    // Now 'To be installed' should also be expandable
    const isExpandable = ['Pending Approval', 'To be installed'].includes(station.status);

    return (
        <div
            className="rounded-xl p-6 shadow-md"
            style={{
                backgroundColor: 'white',
                overflow: 'hidden',
                // Make the whole card clickable only if it's not expandable
                // Otherwise, the expand button handles interaction
                cursor: !isExpandable ? 'pointer' : 'default'
            }}
            onClick={!isExpandable ? onClick : undefined} // Only trigger onClick if not expandable
        >
            <div className="flex flex-col gap-0 mb-2">
                {/* Station Name */}
                <h3
                    style={{
                        fontFamily: FONTS.family.sans,
                        fontWeight: FONTS.weights.normal,
                        fontSize: FONTS.sizes.base,
                        color: COLORS.mainTextColor
                    }}
                >
                    {station.name}
                </h3>

                {/* Station Address */}
                <p
                    style={{
                        color: COLORS.secondaryText,
                        fontSize: FONTS.sizes.xs,
                    }}
                >
                    {station.address}
                </p>
            </div>

            {/* Status Badge */}
            <span
                className="px-4 py-1.5 rounded-md text-xs font-bold"
                style={{
                    backgroundColor: statusTagBackgroundColors[station.status] || '#E5E7EB', // Fallback gray
                    color: statusTagFontColors[station.status] || COLORS.mainTextColor, // Fallback dark text
                    fontWeight: FONTS.weights.normal
                }}
            >
                {station.status}
            </span>

            {/* Additional Details */}
            <div className="mt-4 flex flex-col gap-2">
                <div>
                    <strong
                        style={{ fontWeight: FONTS.weights.normal, color: COLORS.mainTextColor, fontSize: FONTS.sizes.xs }}
                    >
                        {chargerCountLabel}{' '}
                    </strong>
                    <span style={{ color: COLORS.mainTextColor, fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium }}>
                        {numberOfChargers}
                    </span>
                </div>
            </div>

            {/* Expandable Section */}
            {isExpandable && (
                <>
                    <div className="flex w-full items-center justify-between mt-4">
                      {station.dateOfRequest && ['Pending Approval', 'Approved - Waiting for Payment', 'To be installed'].includes(station.status) && (
                          <p className="text-right text-xs" style={{ color: COLORS.secondaryText }}>
                              {station.dateOfRequest} {/* This will now correctly display the full string */}
                          </p>
                      )}
                      <button
                          className="flex items-center gap-1 underline"
                          style={{ color: COLORS.secondaryText, fontSize: FONTS.sizes.sm }}
                          onClick={(e) => {
                              e.stopPropagation(); // Prevent card onClick from firing
                              setExpanded(!expanded);
                          }}
                      >
                          {expanded ? 'Hide Details' : 'View Details'}
                          {expanded ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
                      </button>
                      
                    </div>

                    {expanded && (
                        <div className="mt-4 space-y-4">
                            {/* Individual Charger Details */}
                            {station.chargers && station.chargers.map((charger, idx) => ( // Added null check for chargers
                                <div key={idx} className="rounded-lg p-4" style={{ backgroundColor: COLORS.background }}>
                                    <h4 className="mb-2 rounded-xl" style={{ color: COLORS.mainTextColor, fontWeight: FONTS.weights.medium, fontSize: FONTS.sizes.sm }}>
                                        {charger.name}
                                    </h4>
                                    <p style={{ fontSize: FONTS.sizes.xs, fontWeight: FONTS.weights.medium, color: COLORS.mainTextColor }}>
                                        <strong style={{ fontWeight: FONTS.weights.normal, color: COLORS.secondaryText, fontSize: FONTS.sizes.xs }}>Power Type:</strong> {charger.powerType}
                                    </p>
                                    <p style={{ fontSize: FONTS.sizes.xs, fontWeight: FONTS.weights.medium, color: COLORS.mainTextColor }}>
                                        <strong style={{ fontWeight: FONTS.weights.normal, color: COLORS.secondaryText, fontSize: FONTS.sizes.xs }}>Max Power Output:</strong> {charger.maxPower} kW
                                    </p>
                                    <p style={{ fontSize: FONTS.sizes.xs, fontWeight: FONTS.weights.medium, color: COLORS.mainTextColor }}>
                                        <strong style={{ fontWeight: FONTS.weights.normal, color: COLORS.secondaryText, fontSize: FONTS.sizes.xs }}>Connectors:</strong> {charger.connectors.join(', ')}
                                    </p>
                                </div>
                            ))}

                            {/* Electricity Provider & Power Source */}
                            <div className="flex flex-col gap-2 text-sm">
                                <div>
                                    <strong style={{ fontWeight: FONTS.weights.normal, color: COLORS.secondaryText, fontSize: FONTS.sizes.xs }}>Electricity Provider:</strong>{' '}
                                    <span style={{ color: COLORS.mainTextColor, fontWeight: FONTS.weights.medium, fontSize: FONTS.sizes.xs }}>{station.electricityProvider}</span>
                                </div>
                                <div>
                                    <strong style={{ fontWeight: FONTS.weights.normal, color: COLORS.secondaryText, fontSize: FONTS.sizes.xs }}>Power Source:</strong>{' '}
                                    <span style={{ color: COLORS.mainTextColor, fontWeight: FONTS.weights.medium, fontSize: FONTS.sizes.xs }}>{station.powerSource}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* Bottom Section: Pay Now and Date of Request */}
            <div className="flex justify-between items-end mt-6">
                {/* Pay Now Button */}
                {station.status === 'Approved - Waiting for Payment' && (
                    <div className="flex w-full justify-between items-end">
                        {station.dateOfRequest && ['Pending Approval', 'Approved - Waiting for Payment', 'To be installed'].includes(station.status) && (
                            <p className="text-right text-xs" style={{ color: COLORS.secondaryText }}>
                                {station.dateOfRequest} {/* This will now correctly display the full string */}
                            </p>
                        )}
                        <Button 
                          variant="primary" 
                          onClick={(e) => { e.stopPropagation(); onPay?.(station); }}
                        >
                            Pay Now
                        </Button>
                        
                    </div>
                )}
               
            </div>
        </div>
    );
}