import React from 'react';
import { COLORS, FONTS } from '../../../../constants';
import UserProfileCard from '../userComponents/UserProfileCard';
import ChatIcon from '../../../../assets/chat.svg';
import ConnectorCard from './ConnectorCard';

export default function ViewStationRightPanel() {

    // Sample charger data - replace with your actual data structure
    const dcChargers = [
        {
            name: "HyperCharge Dual-Port DC",
            type: "DC Fast Charger (150 kW)",
            connectors: [
                { name: "CCS2", status: "in-use" },
                { name: "CHAdeMO", status: "in-use" }
            ]
        },
        {
            name: "FastCharge DC - Bay 01",
            type: "DC Fast Charger (60 kW)",
            connectors:[
                { name: "CCS2", status: "reserved" }
            ]
        }
    ];

    const acChargers = [
        {
            name: "PowerFlow AC - Bay 02",
            type: "AC Charger (22 kW)",
            connectors: [
                { name: "Type 2", status: "free" }
            ]
        }
    ];

    const connectorStateColors = {
        'in-use': COLORS.primary,
        'reserved': COLORS.star,
        'free': COLORS.chargerFree, 
        'disabled': COLORS.secondaryText
    };

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

                {/* DC Chargers Section */}
                <div className="space-y-2">
                    <h3 className="font-medium" style={{ fontSize: FONTS.sizes.base, color: COLORS.mainTextColor }}>
                        DC Chargers
                    </h3>
                    {dcChargers.map((charger, index) => (
                        <ConnectorCard
                            key={index}
                            name={charger.name}
                            type={charger.type}
                            connectors={charger.connectors}
                            connectorStateColors={connectorStateColors}
                            typeColor={COLORS.secondaryText}
                        />
                    ))}
                </div>

                {/* AC Chargers Section */}
                <div className="space-y-2">
                    <h3 className="font-medium" style={{ fontSize: FONTS.sizes.base, color: COLORS.mainTextColor }}>
                        AC Chargers
                    </h3>
                    {acChargers.map((charger, index) => (
                        <ConnectorCard
                            key={index}
                            name={charger.name}
                            type={charger.type}
                            connectors={charger.connectors}
                            connectorStateColors={connectorStateColors}
                            typeColor={COLORS.secondaryText}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}