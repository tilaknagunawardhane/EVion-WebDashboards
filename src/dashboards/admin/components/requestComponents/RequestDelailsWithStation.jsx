import React from 'react';
import { COLORS, FONTS } from '../../../../constants';
import ChargerDetails from './ChargerDetailsCard';
import MapImage from '../../../../assets/map-placeholder.png';
import OverviewCard from '../OverviewCard';
import StarIcon from '../../../../assets/star-filled.svg';
import StarOutlineIcon from '../../../../assets/star-outline.svg';

export default function RequestDetailsWithStation({ request, type }) {
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

    const currentStatus = request.status;
    const statusStyle = statusColors[currentStatus] || statusColors['NEW'];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4" 
                 style={{ borderColor: COLORS.stroke }}>
                <div>
                    <h2 className="text-xl mb-1" style={{ 
                        color: COLORS.mainTextColor, 
                        fontWeight: FONTS.weights.semibold
                    }}>
                        {request.stationName}
                    </h2>
                    <p className="text-sm" style={{ color: COLORS.secondaryText }}>
                        {request.address}
                    </p>
                    
                    {type === 'connector' && (
                        <div className="flex items-center mt-2">
                            <div className="flex mr-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <img
                                        key={star}
                                        src={star <= Math.floor(request.rating || 0) ? StarIcon : StarOutlineIcon}
                                        alt={star <= (request.rating || 0) ? 'Filled star' : 'Empty star'}
                                        className="w-4 h-4 mr-1"
                                    />
                                ))}
                            </div>
                            <span className="text-xs" style={{ color: COLORS.secondaryText }}>
                                {request.rating?.toFixed(1) || '0.0'} ({request.reviewCount || 0} reviews)
                            </span>
                        </div>
                    )}
                </div>
                <div className="sm:self-start">
                    <span className="px-3 py-1 rounded-full text-sm inline-block" style={{
                        backgroundColor: statusStyle.bg,
                        color: statusStyle.text
                    }}>
                        {currentStatus}
                    </span>
                </div>
            </div>

            <div className="mb-6">
                <OverviewCard padding="p-4">
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                        <img
                            src={MapImage}
                            alt="Charging Stations Map"
                            className="absolute inset-0 w-full h-full object-cover rounded-lg"
                        />
                    </div>
                </OverviewCard>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
                <h3 className="text-sm font-medium" style={{ color: COLORS.mainTextColor }}>
                    No of Chargers Planned
                </h3>
                <p className="text-sm font-medium" style={{ color: COLORS.mainTextColor }}>
                    {request.chargersPlanned || '02'}
                </p>
            </div>

            <div>
                <h3 className="text-sm font-medium mb-3" style={{ color: COLORS.mainTextColor }}>
                    {type === 'connector' ? 'New Charger Details' : 'Charger Details'}
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {request.chargers?.map((charger, index) => (
                        <ChargerDetails key={`new-${index}`} charger={charger} />
                    ))}
                </div>
            </div>

            {type === 'connector' && request.existingChargers?.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-sm font-medium mb-3" style={{ color: COLORS.mainTextColor }}>
                        Existing Chargers
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {request.existingChargers.map((charger, index) => (
                            <ChargerDetails key={`existing-${index}`} charger={charger} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}