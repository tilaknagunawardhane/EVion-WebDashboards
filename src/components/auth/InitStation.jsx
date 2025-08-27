import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../../components/Layout';
import { COLORS, FONTS } from '../../constants';
import Button from '../ui/Button';
import InputField from '../ui/InputField';
import { FiMessageCircle } from 'react-icons/fi';
import StationCard from '../ui/InitStationCard';
import AddChargingStationForm from '../ui/AddStationForm';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function InitStations() {
    const [showForm, setShowForm] = useState(false);
    const [editingStation, setEditingStation] = useState(null);
    const [stations, setStations] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchStations = async () => {
        try {
            const stationOwnerID = localStorage.getItem('userID')

            const response = await axios.post(`${API_BASE_URL}/api/stations/get-request-stations`, { stationOwnerID }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
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
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStations();
    }, [navigate]);


    const handleAddStation = () => {
        fetchStations(); // Refetch all stations
        setShowForm(false);
        toast.success('Station added successfully');
    }

    const handleRemoveStation = async (stationId) => {
        try {
            const stationOwnerID = localStorage.getItem('userID')
            console.log(stationOwnerID);
            const response = await axios.delete(`${API_BASE_URL}/api/stations/delete-station/${stationId}`, {
                data: { stationOwnerID },
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });

            if (response.data.success) {
                toast.success('Station removed successfully');
                setStations(stations.filter(station => station._id !== stationId));
            } else {
                toast.error(response.data.message || 'Failed to remove station');
            }
        } catch (error) {
            console.error('Error removing station:', error);
            toast.error(error.response?.data?.message || 'Error removing station');
        }
    };

    return (
        <Layout>
            <div className="p-0 w-full max-w-6xl mx-auto space-y-6">
                <div className="flex flex-start justify-between">
                    <h2 className="mb-6" style={{
                        fontFamily: FONTS.family.sans,
                        fontSize: FONTS.sizes['2xl'],
                        fontWeight: FONTS.weights.normal,
                        color: COLORS.mainTextColor
                    }}>
                        Charging Stations
                    </h2>
                    <div>
                        <Button variant="primary" type="button" onClick={() => setShowForm(true)}>
                            Add Charging Station
                        </Button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : stations.length === 0 ? (
                    <p className="text-center text-gray-500">No stations found</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {stations.map((station) => (
                            <StationCard
                                key={station._id}
                                station={station}
                                onEdit={setEditingStation}
                                onPay={() => navigate(`/payment/${station._id}`)}
                                onRemove={(station) => handleRemoveStation(station._id)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Chat Icon */}
            <button
                className="fixed flex gap-1 bottom-6 right-6 shadow-lg p-4 rounded-full"
                style={{ backgroundColor: COLORS.primary }}
                onClick={() => navigate('/support')}
            >
                <FiMessageCircle size={24} color={COLORS.background} />
                <span style={{ color: COLORS.background }}>Chat</span>
            </button>

            {/* Modal Form */}
            {showForm && (
                <AddChargingStationForm
                    onClose={() => setShowForm(false)}
                    onSubmit={handleAddStation}
                />
            )}

            {editingStation && (
                <AddChargingStationForm
                    isEdit={true}
                    stationToEdit={editingStation}
                    stationId={editingStation._id}
                    onClose={() => setEditingStation(null)}
                    onSubmit={(updatedStation) => {
                        setStations(stations.map(station =>
                            station._id === updatedStation._id ? updatedStation : station
                        ));
                        toast.success('Station updated successfully');
                    }}
                />
            )}
        </Layout>
    );
}