// RequestDetailsWithStation.jsx
import React from 'react';
import { COLORS, FONTS } from '../../../../constants';
import ChargerDetailsCard from './ChargerDetailsCard';
import MapImage from '../../../../assets/map-placeholder.png';
import OverviewCard from '../OverviewCard';
import StarIcon from '../../../../assets/star-filled.svg';
import StarOutlineIcon from '../../../../assets/star-outline.svg';

export default function RequestDetailsWithStation({ request, onStatusUpdate }) {
    const statusColors = {
        'NEW': { bg: `${COLORS.primary}20`, text: COLORS.primary },
        'PROCESSING': { bg: `${COLORS.primary}20`, text: COLORS.primary },
        'TO-BE-INSTALLED': { bg: `${COLORS.HighlightText}20`, text: COLORS.HighlightText },
        'REJECTED': { bg: `${COLORS.danger}20`, text: COLORS.danger }
    };

    // const currentStatus = request.status;
    // const statusStyle = statusColors[currentStatus] || statusColors['NEW'];

    return (
        <div className="space-y-6">
            {/* Header Section */}
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
                </div>
                <div>
                    <span className="px-3 py-1 rounded-full text-sm font-medium inline-block uppercase" style={{
                        backgroundColor: statusColors[request.stationStatus]?.bg || statusColors.NEW.bg,
                        color: statusColors[request.stationStatus]?.text || statusColors.NEW.text
                    }}>
                        {request.stationStatus}
                    </span>
                </div>
            </div>

            {/* New Chargers Section */}
            {request.newChargers && request.newChargers.length > 0 && (
                <div>
                    <h3 className="text-normal font-medium mb-3">New Chargers</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {request.newChargers.map((charger) => (
                            <ChargerDetailsCard 
                                key={charger._id}
                                charger={charger}
                                isNew={true}
                                onStatusUpdate={onStatusUpdate}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Existing Chargers Section */}
            {request.existingChargers && request.existingChargers.length > 0 && (
                <div>
                    <h3 className="text-normal font-medium mb-3">Existing Chargers</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {request.existingChargers.map((charger) => (
                            <ChargerDetailsCard 
                                key={charger._id}
                                charger={charger}
                                isNew={false}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Station Details Section */}
            
            <div className="mt-6">
                <h3 className="text-base font-medium mb-3" style={{ color: COLORS.mainTextColor }}>
                    Station Details
                </h3>
                <OverviewCard>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="flex space-x-1">
                            <span style={{ color: COLORS.secondaryText, fontSize: FONTS.sizes.sm }}>
                                Electricity Provider:
                            </span>
                            <p style={{ color: COLORS.mainTextColor, fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium }}>
                                {request.electricityProvider || 'N/A'}
                            </p>
                        </div>
                        <div className="flex space-x-1">
                            <span style={{ color: COLORS.secondaryText, fontSize: FONTS.sizes.sm }}>
                                Power Source:
                            </span>
                            <p style={{ color: COLORS.mainTextColor, fontWeight: FONTS.weights.medium, fontSize: FONTS.sizes.sm  }}>
                                {request.powerSource || 'N/A'}
                            </p>
                        </div>
                        <div className="flex space-x-1">
                            <span style={{ color: COLORS.secondaryText, fontSize: FONTS.sizes.sm }}>
                                City:
                            </span>
                            <p style={{ color: COLORS.mainTextColor, fontWeight: FONTS.weights.medium, fontSize: FONTS.sizes.sm  }}>
                                {request.city || 'N/A'}
                            </p>
                        </div>
                        <div className="flex space-x-1">
                            <span style={{ color: COLORS.secondaryText, fontSize: FONTS.sizes.sm }}>
                                District:
                            </span>
                            <p style={{ color: COLORS.mainTextColor, fontWeight: FONTS.weights.medium, fontSize: FONTS.sizes.sm  }}>
                                {request.district || 'N/A'}
                            </p>
                        </div>
                    </div>
                </OverviewCard>
            </div>
            

            {/* Map Section */}
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
        </div>
    );
}