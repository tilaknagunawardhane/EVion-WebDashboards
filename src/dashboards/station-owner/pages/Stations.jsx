import { useEffect, useState } from 'react';
import { COLORS, FONTS } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import StationOwnerPageHeader from '../components/StationOwnerPageHeader';
import Button from '../../../components/ui/Button';
import StationCard from '../components/stationComponents/StationCard';
import AddChargingStationForm from '../../station-owner/components/stationComponents/RAddStationForm';
import { FiSearch } from 'react-icons/fi';

export default function StationsPage() {
    const [showForm, setShowForm] = useState(false);
    const [stations, setStations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const [stationToEdit, setStationToEdit] = useState(null);
    const [formMode, setFormMode] = useState('add-station');

    const navigate = useNavigate();

    useEffect(() => {
        
            const mockData = [
                {
                    id: 's1',
                    name: 'EviGO Charging Station Station',
                    status: 'Open',
                    address: '45 Peradeniya Road, Kandy',
                    addressLine: '45 Peradeniya Road', // Added for editing
                    city: 'Kandy', // Added for editing
                    district: 'Kandy',
                    location: { lat: 7.290, lng: 80.634 },
                    electricityProvider: 'LECO',
                    powerSource: 'Solar',
                    chargers: [
                        { name: 'HyperCharge Dual-Port DC', powerType: 'DC', maxPower: 150, connectors: ['CCS2', 'CHAdeMO'] },
                        { name: 'FastCharge DC - Bay 01', powerType: 'DC', maxPower: 60, connectors: ['CCS2'] },
                        { name: 'PowerFlow AC - Bay 02', powerType: 'AC', maxPower: 22, connectors: ['Type2'] },
                    ],
                    dateOfRequest: null, // Not applicable for 'Open'
                },
                {
                    id: 's2',
                    name: 'EVion Station – Galle',
                    status: 'Open',
                    address: '78 Lighthouse Street, Galle',
                    addressLine: '78 Lighthouse Street', // Added for editing
                    city: 'Galle', // Added for editing
                    district: 'Galle', // Added for editing
                    location: { lat: 6.033, lng: 80.217 },
                    electricityProvider: 'CEB',
                    powerSource: 'Hybrid',
                    chargers: [
                        { name: 'AC Port A', powerType: 'AC', maxPower: 11, connectors: ['Type 2'] },
                        { name: 'AC Port B', powerType: 'AC', maxPower: 22, connectors: ['Type 2', 'Tesla'] },
                        { name: 'AC Port C', powerType: 'AC', maxPower: 7, connectors: ['Type 1'] },
                    ],
                    dateOfRequest: null, // Not applicable for 'Open'
                },
                {
                    id: 's3',
                    name: 'EVion Station – Kandy',
                    status: 'Closed',
                    address: '45 Peradeniya Road, Kandy',
                    addressLine: '45 Peradeniya Road',
                    city: 'Kandy',
                    district: 'Kandy',
                    location: { lat: 7.291, lng: 80.635 },
                    electricityProvider: 'CEB',
                    powerSource: 'Grid',
                    chargers: [
                        { name: 'DC Fast Charger', powerType: 'DC', maxPower: 100, connectors: ['CCS2', 'CHAdeMO', 'Tesla'] },
                    ],
                    dateOfRequest: '15 Jun 10:30 AM', // Example date of request for a closed station
                },
                {
                    id: 's4',
                    name: 'EVion Station – Nugegoda',
                    status: 'Pending Approval',
                    address: '123 Highlevel Road, Nugegoda',
                    addressLine: '123 Highlevel Road',
                    city: 'Nugegoda',
                    district: 'Colombo',
                    location: { lat: 6.877, lng: 79.916 },
                    electricityProvider: 'LECO',
                    powerSource: 'Solar',
                    chargers: [
                        { name: 'Charger 1', powerType: 'AC', maxPower: 22, connectors: ['Type 2', 'Tesla'] },
                        { name: 'Charger 2', powerType: 'DC', maxPower: 50, connectors: ['CCS2', 'CHAdeMO'] },
                    ],
                    dateOfRequest: '18 Jul 09:00 AM', // Date of request
                },
                {
                    id: 's5',
                    name: 'Colombo City Station',
                    status: 'Approved - Waiting for Payment',
                    address: '100 Galle Road, Colombo 3',
                    addressLine: '100 Galle Road',
                    city: 'Colombo 3',
                    district: 'Colombo',
                    location: { lat: 6.908, lng: 79.859 },
                    electricityProvider: 'CEB',
                    powerSource: 'Grid',
                    chargers: [
                        { name: 'Ultra Fast DC', powerType: 'DC', maxPower: 350, connectors: ['CCS2'] },
                    ],
                    dateOfRequest: '19 Jul 02:45 PM', // Date of request
                },
                {
                    id: 's6',
                    name: 'Airport Road Station',
                    status: 'Pending Approval',
                    address: '20 Airport Rd, Katunayake',
                    addressLine: '20 Airport Rd',
                    city: 'Katunayake',
                    district: 'Gampaha',
                    location: { lat: 7.185, lng: 79.870 },
                    electricityProvider: 'LECO',
                    powerSource: 'Grid',
                    chargers: [
                        { name: 'AC Charger A', powerType: 'AC', maxPower: 22, connectors: ['Type 2'] },
                        { name: 'AC Charger B', powerType: 'AC', maxPower: 11, connectors: ['Type 2'] },
                    ],
                    dateOfRequest: '20 Jul 11:15 AM', // Date of request
                },
                {
                    id: 's7',
                    name: 'Kottawa Install Site',
                    status: 'To be installed',
                    address: 'Kottawa Industrial Zone, Kottawa',
                    addressLine: 'Kottawa Industrial Zone',
                    city: 'Kottawa',
                    district: 'Colombo',
                    location: { lat: 6.820, lng: 79.957 },
                    electricityProvider: 'LECO',
                    powerSource: 'Grid',
                    chargers: [
                        { name: 'Future DC Charger', powerType: 'DC', maxPower: 75, connectors: ['CCS2'] },
                    ],
                    dateOfRequest: '05 Jul 04:00 PM', // Date of request
                },
                {
                    id: 's8',
                    name: 'Jaffna New Location',
                    status: 'To be installed',
                    address: '15 Main Street, Jaffna',
                    addressLine: '15 Main Street',
                    city: 'Jaffna',
                    district: 'Jaffna',
                    location: { lat: 9.661, lng: 80.025 },
                    electricityProvider: 'CEB',
                    powerSource: 'Solar',
                    chargers: [
                        { name: 'Jaffna AC', powerType: 'AC', maxPower: 22, connectors: ['Type 2'] },
                        { name: 'Jaffna DC', powerType: 'DC', maxPower: 50, connectors: ['CHAdeMO'] },
                    ],
                    dateOfRequest: '10 Jul 01:00 PM', // Date of request
                },
            ];

            // Assign unique IDs if missing in mock data (good practice)
            const stationsWithIds = mockData.map((s, index) => ({
                ...s,
                id: s.id || `mock-${index + 1}`
            }));

            setStations(stationsWithIds);
            
    }, []);

    const handleAddStationClick = () => {
        setStationToEdit(null); // Clear any station being edited
        setFormMode('add-station'); // Set mode for adding
        setShowForm(true);
    };

    const handleEditStation = (station) => {
        setStationToEdit(station); // Set the station data to pre-fill the form
        setFormMode('edit-station'); // Set mode for editing
        setShowForm(true);
    };

    const handleCardClick = (station) => {
        // Only navigate if the status doesn't use the card's click for expansion
        if (!['Pending Approval', 'To be installed', 'Approved - Waiting for Payment'].includes(station.status)) {
            navigate(`/station-owner/stations/stationprofile/${station.id}`);
        }
    };

    const handlePayNow = (station) => {
        console.log('Initiating payment for station:', station.name, station.id);
        alert(`Payment for ${station.name} initiated! (This is a mock action)`);
        // In a real app, after successful payment, you'd update the station's status
        // For mock, let's change status to 'To be installed'
        setStations(prevStations =>
            prevStations.map(s =>
                s.id === station.id ? { ...s, status: 'To be installed' } : s
            )
        );
    };

    const filteredStations = stations.filter(station => 
        station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        station.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        station.status.toLowerCase().includes(searchTerm.toLowerCase())
        // You can add more fields to search, e.g., station.electricityProvider, charger names etc.
    );

    const categorizeStations = (stationsList) => {
        const categories = {
            'Open': [],
            'Approved - Waiting for Payment': [],
            'To be installed': [],
            'Pending Approval': [],
            'Closed': [],
            'Other': [],
        };

        stationsList.forEach(station => {
            if (categories[station.status]) {
                categories[station.status].push(station);
            } else {
                categories['Other'].push(station);
            }
        });
        return categories;
    };

    const categorizedStations = categorizeStations(filteredStations);

    const renderStationSection = (title, stationsInSection) => {
        if (stationsInSection.length === 0) {
            return null;
        }
        return (
            <div className="mb-8">
                <h2 className="font-medium text-xl mb-4" style={{ color: COLORS.mainTextColor, fontFamily: FONTS.family.sans }}>
                    {title} ({stationsInSection.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stationsInSection.map(station => (
                        <StationCard
                            key={station.id} // Use station.id for key
                            station={station}
                            onClick={() => handleCardClick(station)}
                            onPay={handlePayNow}
                            onEditStation={handleEditStation}
                        />
                    ))}
                </div>
            </div>
        );
    };

    const handleFormSubmit = (submissionData) => {
        if (submissionData.type === 'add-station') {
            const newStation = submissionData.station;
            const newId = `s${stations.length + 1}-${Date.now()}`;
            const now = new Date();
            const dateOptions = { year: 'numeric', month: 'short', day: '2-digit' };
            const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
            const dateString = now.toLocaleDateString('en-US', dateOptions);
            const timeString = now.toLocaleTimeString('en-US', timeOptions);

            setStations((prev) => [
                ...prev,
                {
                    id: newId,
                    status: 'Pending Approval', // New stations start here
                    dateOfRequest: `${dateString} ${timeString}`,
                    name: newStation.name || 'Unnamed Station', // Access `name` from newStation
                    address: newStation.address || 'No Address Provided', // Access `address` from newStation
                    electricityProvider: newStation.electricityProvider || 'N/A',
                    powerSource: newStation.powerSource || 'N/A',
                    chargers: newStation.chargers || [],
                    location: newStation.location || null,
                    // Pass individual address components for potential future editing
                    addressLine: newStation.addressLine,
                    city: newStation.city,
                    district: newStation.district,
                }
            ]);
        } else if (submissionData.type === 'edit-station') {
            const updatedStationData = submissionData.station;
            setStations(prevStations =>
                prevStations.map(station =>
                    station.id === updatedStationData.id
                        ? {
                              ...station, // Keep existing properties not explicitly updated
                              name: updatedStationData.stationName, // Use stationName from formData
                              addressLine: updatedStationData.addressLine,
                              city: updatedStationData.city,
                              district: updatedStationData.district,
                              electricityProvider: updatedStationData.electricityProvider,
                              powerSource: updatedStationData.powerSource,
                              location: updatedStationData.location,
                              // Reconstruct the combined address for display on the card
                              address: `${updatedStationData.addressLine}, ${updatedStationData.city}`
                          }
                        : station
                )
            );
        }
        // Handle 'add-charger-to-existing-station' and 'edit-charger' here if needed for this page
        // For now, let's assume those are handled in StationProfile.jsx or similar.
        setShowForm(false);
        setStationToEdit(null); // Clear editing state
    };

    return (
        <div
            style={{
                fontFamily: FONTS.family.sans,
                padding: '24px',
                backgroundColor: COLORS.background,
            }}
        >
            <StationOwnerPageHeader title="Charging Stations" />

            <div className="p-0 w-full max-w-6xl mx-auto space-y-6 ">
                <div className="flex flex-start items-center justify-between">
                    <div className="relative flex items-center w-full max-w-sm mr-4"> {/* Added mr-4 for spacing */}
                        <FiSearch size={16} color={COLORS.secondaryText} className="absolute left-3" />
                        <input
                            type="text"
                            placeholder="Search stations..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg placeholder:text-gray-400 bg-white shadow-sm"
                            style={{
                                color: COLORS.mainTextColor,
                                fontSize: FONTS.sizes.sm,
                            }}
                        />
                    </div>
                    <div className="flex w-full justify-end">
                        <Button variant="primary" type="button" onClick={handleAddStationClick}>
                            Add Charging Station
                        </Button>
                    </div>
                </div>

                
                <>
                    {renderStationSection('Open Stations', categorizedStations['Open'])}
                    {renderStationSection('Approved - Waiting for Payment', categorizedStations['Approved - Waiting for Payment'])}
                    {renderStationSection('To be installed', categorizedStations['To be installed'])}
                    {renderStationSection('Pending Approval', categorizedStations['Pending Approval'])}
                    {renderStationSection('Closed Stations', categorizedStations['Closed'])}
                    {categorizedStations['Other'].length > 0 && renderStationSection('Other Stations', categorizedStations['Other'])}

                    {stations.length === 0 && (
                        <div className="text-center py-8" style={{ color: COLORS.secondaryText }}>
                            No charging stations found. Click "Add Charging Station" to get started!
                        </div>
                    )}
                </>
            </div>

            {/* {showForm && (
                <AddChargingStationForm
                    onClose={() => setShowForm(false)}
                    onSubmit={(newStation) => {
                        const newId = `s${stations.length + 1}-${Date.now()}`; // More robust temp ID
                        const now = new Date();
                        const dateString = now.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
                        const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

                        setStations((prev) => [
                            ...prev,
                            {
                                ...newStation,
                                id: newId,
                                status: 'Pending Approval', // New stations start here
                                dateOfRequest: `${dateString} ${timeString}`,
                                name: newStation.name || 'Unnamed Station', // Provide a default if name is missing
                                address: newStation.address || 'No Address Provided', // Provide a default
                                
                                electricityProvider: newStation.electricityProvider || 'N/A', // Add defaults for other expected fields
                                powerSource: newStation.powerSource || 'N/A',
                                chargers: newStation.chargers || [], // Ensure it's an array
                                
                                ...newStation,
                                
                            
                            }
                        ]);
                        setShowForm(false);
                    }}
                    mode="add-station"
                    initialFormData={null}
                />
            )} */}
            {showForm && (
                <AddChargingStationForm
                    onClose={() => {
                         setShowForm(false)
                         setStationToEdit(null);
                    }}
                    onSubmit={handleFormSubmit}
                    mode={formMode}
                    initialFormData={stationToEdit} // Ensure this is null for adding a new station
                    initialChargerData={null}
                />
            )}
        </div>
    );
}