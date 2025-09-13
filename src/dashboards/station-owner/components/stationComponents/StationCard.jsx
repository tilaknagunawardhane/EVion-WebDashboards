import React from 'react';
import { COLORS, FONTS } from '../../../../constants';
import Button from '../../../../components/ui/Button';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'; // Import chevron icons
import StationIcon from '../../../../assets/stations_icon.svg'
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

export default function StationCard({ station, onClick }) {
    

    const statusTagBackgroundColors = {
        'open': COLORS.bgGreen,          
        'reviewing': COLORS.bgYellow,
        'closed': COLORS.background, 
        'deleted': COLORS.mainTextColor,
        'disabled_by_SO': COLORS.bgRed,
    };

    const statusTagFontColors = {
        'open': COLORS.primary,
        'reviewing': COLORS.HighlightText,
        'closed': COLORS.secondaryText, 
        'deleted': COLORS.background,
        'disabled_by_SO': COLORS.danger,
    };

    // Correctly determine number of chargers/requested chargers
    const numberOfChargers = station.chargers ? station.chargers.length : 0;
    const averageRating = station.averageRating ? station.averageRating : 0.0;
    const isRequestedChargers = ['reviewing'].includes(station.status);
    const chargerCountLabel = isRequestedChargers ? 'Requested Chargers:' : 'Number of Chargers:';


    // Determine if the card should be expandable
    // Now 'To be installed' should also be expandable
    const isExpandable = ['Pending Approval', 'To be installed', 'Approved - Waiting for Payment'].includes(station.status);
    const showRating = ['open', 'closed', 'deleted', 'disabled_by_SO'].includes(station.status);

    return (
        <div
            className="rounded-xl p-4 shadow-md"
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
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: COLORS.bgGreen }}>
                        <img
                            src={StationIcon}
                            alt="Station"
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

                </div>

                {/* Station Address */}
                <p
                    style={{
                        color: COLORS.secondaryText,
                        fontSize: FONTS.sizes.xs,
                    }}
                >
                    {station.address}
                </p>

                {showRating &&
                    <div className="flex items-center justify-start gap-0 mt-1">
                
                        {/* Star icons */}
                        <div style={{ display: 'flex', alignItems: 'left', margin: '0' }}>
                            {[1, 2, 3, 4, 5].map((star) => {
                                if (averageRating >= star) {
                                    return <FaStar key={star} color="#FFD700" size={14} />;
                                } else if (averageRating >= star - 0.5) {
                                    return <FaStarHalfAlt key={star} color="#FFD700" size={14} />;
                                } else {
                                    return <FaRegStar key={star} color="#FFD700" size={14} />;
                                }
                            })}
                        </div>
                        
                        <span style={{ color: COLORS.mainTextColor, fontSize: FONTS.sizes.xs, fontWeight: FONTS.weights.medium, marginLeft: '8px'}}>
                            {averageRating} / 5.0
                        </span>
                    </div>
                }
            </div>
            
            {/* Additional Details */}
            <div className="mt-4 flex justify-between gap-2">
                {/* Status Badge */}
                <div>
                    <span
                        className="px-4 py-1.5 rounded-full text-xs font-medium uppercase"
                        style={{
                            backgroundColor: statusTagBackgroundColors[station.status] || '#E5E7EB', // Fallback gray
                            color: statusTagFontColors[station.status] || COLORS.mainTextColor,
                        }}
                    >
                        {station.status}
                    </span>
                </div>
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

        </div>
    );
}