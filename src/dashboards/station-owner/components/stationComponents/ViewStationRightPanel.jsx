import React, { useState, useEffect } from 'react';
import { COLORS, FONTS } from '../../../../constants';
import ConnectorCard from './ConnectorCard';
import Button from '../../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import AddChargingStationForm from './RAddStationForm';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ViewStationRightPanel({station}) {
    const navigate = useNavigate();

    const [showAddForm, setShowAddForm] = useState(false);
    const [formMode, setFormMode] = useState('add-new-charger');
    const [chargerToEdit, setChargerToEdit] = useState(null);
    const [chargers, setChargers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch chargers data from backend
    useEffect(() => {
        const fetchChargersData = async () => {
            if (!station?.id) {
                console.log('No station ID provided');
                setLoading(false);
                return;
            }
            
            try {
                setLoading(true);
                const stationOwnerID = localStorage.getItem('userID');
                const accessToken = localStorage.getItem('accessToken');

                console.log('Fetching chargers for station:', station.id);
                console.log('Station Owner ID:', stationOwnerID);
                
                const response = await axios.get(
                    `${API_BASE_URL}/api/stations/station/${station.id}/chargers`,
                    {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        },
                        params: {
                            stationOwnerId: stationOwnerID
                        }
                    }
                );

                console.log('Chargers API Response:', response.data);

                if (response.data.success) {
                    setChargers(response.data.data || []);
                } else {
                    toast.error('Failed to fetch charger data');
                }
            } catch (error) {
                console.error('Error fetching charger data:', error);
                toast.error(error.response?.data?.message || 'Error loading charger data');
            } finally {
                setLoading(false);
            }
        };

        fetchChargersData();
    }, [station?.id]);

    const connectorStateColors = {
        'in-use': COLORS.chargerFree,
        'reserved': COLORS.star,
        'available': COLORS.primary, 
        'unavailable': COLORS.secondaryText
    };

    const handleChargerCardClick = (chargerId) => {
        navigate(`/station-owner/stations/chargerprofile/${chargerId}`);
    };

    const handleAddNewCharger = () => {
        setFormMode('add-new-charger');
        setChargerToEdit(null);
        setShowAddForm(true);
    };

    const handleEditCharger = (charger) => {
        setFormMode('edit-charger');
        setChargerToEdit(charger);
        setShowAddForm(true);
    };

    const handleFormSubmit = (data) => {
        console.log("Form Submitted:", data);
        
        if (station?.id) {
            const fetchChargersData = async () => {
                try {
                    const stationOwnerID = localStorage.getItem('userID');
                    const accessToken = localStorage.getItem('accessToken');
                    
                    const response = await axios.get(
                        `${API_BASE_URL}/api/stations/station/${station.id}/chargers`,
                        {
                            headers: {
                                'Authorization': `Bearer ${accessToken}`
                            },
                            params: {
                                stationOwnerID: stationOwnerID
                            }
                        }
                    );

                    if (response.data.success) {
                        setChargers(response.data.data || []);
                        toast.success(data.type === 'edit-charger' ? 'Charger updated successfully!' : 'Charger added successfully!');
                    }
                } catch (error) {
                    console.error('Error refreshing charger data:', error);
                    toast.error('Error refreshing charger data');
                }
            };

            fetchChargersData();
        }
        setShowAddForm(false);
    };

    const handleCloseForm = () => {
        setShowAddForm(false);
        setChargerToEdit(null); // Clear edited charger data on close
    };

    // Group chargers by power type
    const dcChargers = chargers.filter(charger => charger.power_type === 'DC');
    const acChargers = chargers.filter(charger => charger.power_type === 'AC');

    if (loading) {
        return (
            <div className="rounded-xl border bg-white p-3 flex flex-col gap-6 h-[calc(100vh-200px)] overflow-y-auto"
                style={{
                    borderColor: COLORS.stroke,
                    background: COLORS.background,
                    fontFamily: FONTS.family.sans,
                }}
            >
                <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </div>
        );
    }

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
                {dcChargers.length > 0 && (
                    <div className="space-y-2">
                        <h3 className="font-semibold" style={{ fontSize: FONTS.sizes.sm, color: COLORS.mainTextColor }}>
                            DC Chargers
                        </h3>
                        {dcChargers.map((charger, index) => (
                            <ConnectorCard
                                key={charger._id || index}
                                name={charger.charger_name || 'Unnamed Charger'}
                                type={`DC Fast Charger - ${charger.max_power_output} kW`}
                                price={charger.price || 'N/A'}
                                connectors={charger.connector_types?.map(connector => ({
                                    name: connector.connector?.type_name || 'N/A',
                                    status: connector.status || 'unavailable',
                                })) || []}
                                connectorStateColors={connectorStateColors}
                                typeColor={COLORS.mainTextColor}
                                onClick={() => handleChargerCardClick(charger._id)}
                                onEdit={() => handleEditCharger(charger)}
                                status={charger.charger_status}
                            />
                        ))}
                    </div>
                )}

                {/* AC Chargers Section */}
                {acChargers.length > 0 && (
                    <div className="space-y-2">
                        <h3 className="font-semibold" style={{ fontSize: FONTS.sizes.sm, color: COLORS.mainTextColor }}>
                            AC Chargers
                        </h3>
                        {acChargers.map((charger, index) => (
                            <ConnectorCard
                                key={charger._id || index}
                                name={charger.charger_name || 'Unnamed Charger'}
                                type={`AC Charger - ${charger.max_power_output} kW`}
                                price={charger.price || 'N/A'}
                                connectors={charger.connector_types?.map(connector => ({
                                    name: connector.connector?.type_name || 'N/A',
                                    status: connector.status || 'unavailable',
                                })) || []}
                                connectorStateColors={connectorStateColors}
                                typeColor={COLORS.mainTextColor}
                                onClick={() => handleChargerCardClick(charger._id)}
                                onEdit={() => handleEditCharger(charger)}
                                status={charger.charger_status}
                            />
                        ))}
                    </div>
                )}

                {chargers.length === 0 && (
                    <div className="text-center py-8" style={{ color: COLORS.secondaryText }}>
                        No chargers found. Add your first charger to get started.
                    </div>
                )}

            </div>
            {/* Render the form modal conditionally */}
            {showAddForm && (
                <AddChargingStationForm
                    onClose={handleCloseForm}
                    onSubmit={handleFormSubmit}
                    mode={formMode}        // Pass the mode ('add-new-charger' in this case)
                    initialChargerData={chargerToEdit} // Will be null for 'add-new-charger'
                    stationId={station?.id}
                />
            )}
        </div>
    );
}