import { useEffect, useState } from 'react';
import { COLORS, FONTS } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import StationOwnerPageHeader from '../components/StationOwnerPageHeader';
import Button from '../../../components/ui/Button';
import StationCard from '../components/stationComponents/StationCard';
import AddChargingStationForm from '../../station-owner/components/stationComponents/RAddStationForm';
import { FiSearch } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../../contexts/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function StationsPage() {
    const { isStationOwner, currentUser } = useAuth();
    const [showForm, setShowForm] = useState(false);
    const [stations, setStations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const [stationToEdit, setStationToEdit] = useState(null);
    const [formMode, setFormMode] = useState('add-station');

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isStationOwner) {
            toast.error('You must be a station owner to view this page');
            navigate('/auth?mode=login');
            return;
        }
        const fetchStations = async () => {
            try {
                setLoading(true);

                // console.log('Fetching stations for:', currentUser);
                const userID = localStorage.getItem('userID');
                const response = await axios.get(`${API_BASE_URL}/api/stations/owner-stations`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    },
                    params: {
                        stationOwnerId: userID, // Example query parameter
                    }
                });

                if (response.data.success) {
                setStations(response.data.data);
                } else {
                toast.error('Failed to fetch stations');
                }
            } catch (error) {
                console.error('Error fetching stations:', error);
                toast.error(error.response?.data?.message || 'Error fetching stations');
                if (error.response?.status === 401) {
                navigate('/auth?mode=login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchStations();
    }, [navigate, isStationOwner]);

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
        // if (!['To be installed'].includes(station.status)) {
        //   navigate(`/station-owner/stations/stationprofile/${station.id}`);
        // }
        navigate(`/station-owner/stations/stationprofile/${station.id}`);
    };

    const filteredStations = stations.filter(station => 
        station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        station.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        station.status.toLowerCase().includes(searchTerm.toLowerCase())
        // You can add more fields to search, e.g., station.electricityProvider, charger names etc.
    );

    const categorizeStations = (stationsList) => {
        const categories = {
            'open': [],
            'closed': [],
            'disabled_by_SO': [],
            'deleted': [],
            'reviewing': [],
            'Other': []
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
                            onEditStation={handleEditStation}
                        />
                    ))}
                </div>
            </div>
        );
    };

    if (loading) {
    return (
      <div className="flex justify-center items-center h-screen" style={{ fontFamily: FONTS.family.sans, backgroundColor: COLORS.background }}>
        <p>Loading stations...</p>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 ml-4"></div>
      </div>
    );
  }

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
                <div className="flex items-center justify-between">
                    <div className="relative flex items-center w-full max-w-sm mr-4">
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

                
                {stations.length === 0 ? (
                    <div className="text-center py-8" style={{ color: COLORS.secondaryText }}>
                        No charging stations found. Click "Add Charging Station" to get started!
                    </div>
                    ) : (
                    <>
                        {renderStationSection('Open Stations', categorizedStations['open'])}
                        {renderStationSection('Closed Stations', categorizedStations['closed'])}
                        {renderStationSection('Disabled by Support Officer', categorizedStations['disabled_by_SO'])}
                        {renderStationSection('Stations Waiting for Approval', categorizedStations['reviewing'])}
                        {renderStationSection('Deleted Stations', categorizedStations['deleted'])}
                        {categorizedStations['Other'].length > 0 && renderStationSection('Other Stations', categorizedStations['Other'])}
                    </>
                )}
            </div>

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