import React, { useState } from 'react';
import { COLORS, FONTS } from '../../../../constants';
import ConnectorCard from './ConnectorCard';
import Button from '../../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import AddChargingStationForm from './RAddStationForm';

export default function ViewStationRightPanel() {
    const navigate = useNavigate();

    const [showAddForm, setShowAddForm] = useState(false);
    const [formMode, setFormMode] = useState('add-station');
    const [chargerToEdit, setChargerToEdit] = useState(null);

    // Sample charger data - replace with your actual data structure
    const dcChargers = [
        {
            id: 'dc-charger-001',
            name: "HyperCharge Dual-Port DC",
            type: "DC Fast Charger (150 kW)",
            connectors: [
                { name: "CCS2", status: "in-use" },
                { name: "CHAdeMO", status: "in-use" }
            ],
            powerType: 'DC',
            maxPower: 150,
            connectorTypes: ['CCS2', 'CHAdeMO']
        },
        {
            id: 'dc-charger-002',
            name: "FastCharge DC - Bay 01",
            type: "DC Fast Charger (60 kW)",
            connectors:[
                { name: "CCS2", status: "reserved" }
            ],
            powerType: 'DC',
            maxPower: 60,
            connectorTypes: ['CCS2']
        }
    ];

    const acChargers = [
        {
            id: 'ac-charger-001', 
            name: "PowerFlow AC - Bay 02",
            type: "AC Charger (22 kW)",
            connectors: [
                { name: "Type 2", status: "free" }
            ],
            powerType: 'AC',
            maxPower: 22,
            connectorTypes: ['Type 2 (Mennekes)']
        },
    ];

    const connectorStateColors = {
        'in-use': COLORS.primary,
        'reserved': COLORS.star,
        'free': COLORS.chargerFree, 
        'disabled': COLORS.secondaryText
    };

    const handleChargerCardClick = (chargerId) => {
        navigate(`/station-owner/stations/chargerprofile/${chargerId}`);
    };

    const handleAddNewCharger = () => {
        setFormMode('add-new-charger');
        setChargerToEdit(null); // Ensure no old data is present when adding new
        setShowAddForm(true);
    };

    const handleFormSubmit = (data) => {
        console.log("Form Submitted:", data);
        // In a real app: send data to API, update state, etc.
        // For 'add-charger-to-existing-station' type, you'd add 'data.charger' to the current station's chargers
        // For 'edit-charger' type, you'd find 'data.chargerId' and update with 'data.updatedChargerData'
        setShowAddForm(false); // Close the form after submission
    };

    const handleCloseForm = () => {
        setShowAddForm(false);
        setChargerToEdit(null); // Clear edited charger data on close
        setFormMode('add-station'); // Reset form mode to default
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

                <Button
                    className="w-full"
                    onClick={handleAddNewCharger}
                >
                    Add New Charger
                </Button>

                {/* DC Chargers Section */}
                <div className="space-y-2">
                    <h3 className="font-semibold" style={{ fontSize: FONTS.sizes.sm, color: COLORS.mainTextColor }}>
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
                            onClick={() => handleChargerCardClick(charger.id)}
                        />
                    ))}
                </div>

                {/* AC Chargers Section */}
                <div className="space-y-2">
                    <h3 className="font-semibold" style={{ fontSize: FONTS.sizes.sm, color: COLORS.mainTextColor }}>
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
                            onClick={() => handleChargerCardClick(charger.id)}
                        />
                    ))}
                </div>
            </div>
            {/* Render the form modal conditionally */}
            {showAddForm && (
                <AddChargingStationForm
                    onClose={handleCloseForm}
                    onSubmit={handleFormSubmit}
                    mode={formMode}        // Pass the mode ('add-new-charger' in this case)
                    initialChargerData={chargerToEdit} // Will be null for 'add-new-charger'
                />
            )}
        </div>
    );
}