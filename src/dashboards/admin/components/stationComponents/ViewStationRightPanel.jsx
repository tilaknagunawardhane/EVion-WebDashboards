import React from 'react';
import { COLORS, FONTS } from '../../../../constants';
import UserProfileCard from '../userComponents/UserProfileCard';
import ChatIcon from '../../../../assets/chat.svg';
import ConnectorCard from './ConnectorCard';
import { useNavigate } from 'react-router-dom';

const primaryColorFilter = `
brightness(0)
invert(1)
`;

export default function ViewStationRightPanel({ station }) {
    const navigate = useNavigate();

    const user = {
        Name: station.operator,
        'Account Status': station.operatorStatus,
        'Date of Registration': station.operatorJoinedDate,
        Email: station.email,
    };

    // Sample charger data - replace with your actual data structure
    const dcChargers = [
        {
            name: "HyperCharge Dual-Port DC",
            type: "DC Fast Charger (150 kW)",
            connectors: ["CCS2", "CHAdeMO"]
        },
        {
            name: "FastCharge DC - Bay 01",
            type: "DC Fast Charger (60 kW)",
            connectors: ["CCS2"]
        }
    ];

    const acChargers = [
        {
            name: "PowerFlow AC - Bay 02",
            type: "AC Charger (22 kW)",
            connectors: ["Type 2"]
        }
    ];

    return (
        <div
            className="rounded-xl border bg-white p-3 flex flex-col gap-6 h-[calc(100vh-200px)] overflow-y-auto"
            style={{
                borderColor: COLORS.stroke,
                background: COLORS.background,
                fontFamily: FONTS.family.sans,
            }}
        >
            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto space-y-6 p-0">
                {/* User Profile Section */}
                <div className="w-full">
                    <UserProfileCard user={user} />
                </div>

                {/* Email with Chat Icon */}
                <div className="flex items-center justify-center gap-2">
                    <div className="underline">
                        <a
                            href={`mailto:${station.email}`}
                            className="flex items-center gap-1 text-primary underline"
                            style={{
                                color: COLORS.primary,
                                fontSize: FONTS.sizes.sm,
                                cursor: 'pointer',
                                textDecoration: 'none'
                            }}
                        >
                            {station.email}
                        </a>
                    </div>

                    <div  className="rounded-full p-3" style={{cursor: 'pointer', backgroundColor: COLORS.primary}} onClick={() => navigate(`/admin/chat/`)}>
                        <img
                            src={ChatIcon}
                            alt="Chat icon"
                            style={{ filter: primaryColorFilter }}
                            className="w-4 h-4"
                        />
                    </div>
                    
                </div>

                {/* DC Chargers Section */}
                <div className="space-y-4">
                    <h3 className="text-medium font-semibold" style={{ color: COLORS.mainTextColor }}>
                        DC Chargers
                    </h3>
                    {dcChargers.map((charger, index) => (
                        <ConnectorCard
                            key={index}
                            name={charger.name}
                            type={charger.type}
                            connectors={charger.connectors}
                            connectorColor={COLORS.secondaryText}
                            typeColor={COLORS.HighlightText}
                        />
                    ))}
                </div>

                {/* AC Chargers Section */}
                <div className="space-y-4">
                    <h3 className="text-medium font-semibold" style={{ color: COLORS.mainTextColor }}>
                        AC Chargers
                    </h3>
                    {acChargers.map((charger, index) => (
                        <ConnectorCard
                            key={index}
                            name={charger.name}
                            type={charger.type}
                            connectors={charger.connectors}
                            connectorColor={COLORS.secondaryText}
                            typeColor={COLORS.HighlightText}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}