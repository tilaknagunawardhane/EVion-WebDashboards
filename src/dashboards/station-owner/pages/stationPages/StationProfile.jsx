import React, { useState, useRef, useEffect, useCallback } from 'react';
import { COLORS, FONTS } from '../../../../constants';
import { useNavigate, useParams } from 'react-router-dom';
import TabBar from '../../../../components/ui/TabBar';
import DataTableTopBar from '../../../../components/ui/DataTableTopBar';
import DataTable from '../../../../components/ui/DataTable';
import StatCard from '../../components/StatCard';
import StarIcon from '../../../../assets/star-filled.svg';
import StarOutlineIcon from '../../../../assets/star-outline.svg';
import NotificationsIcon from '../../../../assets/notifications.svg';
import OverviewCard from '../../components/OverviewCard';
import MapImage from '../../../../assets/map-placeholder.png';
import Button from '../../../../components/ui/Button';
import ArrowRightIcon from '../../../../assets/arrow_right.svg';
import ApprovalCard from '../../components/ApprovalCard';
import ViewStationRightPanel from '../../components/stationComponents/ViewStationRightPanel';
import StationOwnerPageHeader from '../../components/StationOwnerPageHeader';
import StationSchedule from '../../components/stationComponents/StationSchedule';
import ReceiptModal from '../../components/stationComponents/ReceiptModal';
import { FiMoreVertical } from 'react-icons/fi';
import AddChargingStationForm from '../../components/stationComponents/RAddStationForm';
import axios from 'axios';
import { toast } from 'react-toastify';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api'; // Add these imports

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // Add this

const stationImages = [
    'https://images.unsplash.com/photo-1703860271509-b50f5679f2a0?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1616361715039-11dde2199a21?q=80&w=1746&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1729229078656-268bae113975?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1710025582119-e133fb11e10a?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1737312272830-f445719b7ed9?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

// Map configuration
const mapContainerStyle = {
    width: '100%',
    height: '300px'
};

const defaultCenter = {
    lat: 6.9271, // Colombo, Sri Lanka
    lng: 79.8612
};

// Station Map Component
const StationMap = ({ location, stationName }) => {
    const mapCenter = location && location.latitude && location.longitude
        ? {
            lat: location.latitude || location.lat,
            lng: location.longitude || location.lng
        }
        : defaultCenter;

    return (
        <div className="map-container rounded-xl overflow-hidden">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={mapCenter}
                zoom={15}
                options={{
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: true,
                }}
            >
                {location && (location.latitude || location.lat) && (location.longitude || location.lng) && (
                    <Marker
                        position={mapCenter}
                        title={stationName || "Charging Station"}
                    />
                )}
            </GoogleMap>
        </div>
    );
};

// Dropdown component for Station Actions (no changes needed)
const StationActionsDropdown = ({ onRemoveStation }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-full hover:bg-gray-100">
                <FiMoreVertical className="w-5 h-5" />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10" style={{ borderColor: COLORS.stroke }}>
                    <button
                        onClick={() => {
                            onRemoveStation();
                            setIsOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                    >
                        Remove Station
                    </button>
                </div>
            )}
        </div>
    );
};

// --- OwnerViewStation Component ---

const OwnerViewStation = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState(null);
    const [sort, setSort] = useState(null);
    const [rating, setRating] = useState(0.0);
    const [stationSchedule, setStationSchedule] = useState(null);
    const [stationTemporaryClosures, setStationTemporaryClosures] = useState([]);
    const [chargersTableData, setChargersTableData] = useState([]); // For chargers table
    const [showAll, setShowAll] = useState(false);
    const [localStationImages, setLocalStationImages] = useState(stationImages);
    const [loading, setLoading] = useState(true);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const stationId = id;

    // Add new state for transactions
    const [transactions, setTransactions] = useState([]);
    const [transactionsLoading, setTransactionsLoading] = useState(false);
    const [transactionsSummary, setTransactionsSummary] = useState(null);
    const [receiptModalOpen, setReceiptModalOpen] = useState(false);
    const [selectedReceipt, setSelectedReceipt] = useState(null);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalTransactions: 0,
        hasNext: false,
        hasPrev: false
    });

    // Consolidated Station Details State
    const [stationDetails, setStationDetails] = useState({
        id: '',
        name: '',
        address: '',
        addressLine: '',
        city: '',
        district: '',
        electricityProvider: '',
        powerSource: '',
        location: { lat: 0, lng: 0 },
        operator: "",
        email: "",
        operatorJoinedDate: "",
        operatorStatus: "",
        totalEarnings: "",
        earningsChange: "+0%",
        totalElectricity: "0 nWh",
        electricityChange: "+0%",
        reports: "0",
        status: "",
        noOfConnectors: "0",
        noOfReports: "0",
        averageRating: 0,
        totalRatings: 0,
        chargers: []
    });

    const [showEditStationForm, setShowEditStationForm] = useState(false);

    // Fetch chargers table data
    const fetchChargersTableData = useCallback(async () => {

        if (!stationId) return;
        
        try {
            // You might want a separate loading state for this tab if it's slow
            const stationOwnerID = localStorage.getItem('userID');
            const token = localStorage.getItem('accessToken');

            const response = await axios.get(
                `${API_BASE_URL}/api/charger/${stationId}/charger-table`,
                {
                    headers: { 'Authorization': `Bearer ${token}` },
                    params: { stationOwnerId: stationOwnerID }
                }
            );
            
            setChargersTableData(response.data.data || []);

        } catch (error) {
            console.error('Error fetching charger table data:', error);
            toast.error('Failed to load charger details table.');
            setChargersTableData([]); // Set to empty on failure
        }
    }, [stationId]);

    useEffect(() => {
        if (activeTab === 'chargers' && stationId) {
            fetchChargersTableData();
        }
    }, [activeTab, stationId, fetchChargersTableData]);

    // Fetch transactions data
    const fetchTransactions = async (page = 1, filters = {}) => {
        if (!stationId) return;

        try {
            setTransactionsLoading(true);
            const accessToken = localStorage.getItem('accessToken');

            const params = {
                page,
                limit: 10,
                ...filters
            };

            const userID = localStorage.getItem('userID');

            const response = await axios.get(
                `${API_BASE_URL}/api/station-owner/${userID}/${stationId}/transactions`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    },
                    params
                }
            );

            if (response.data.success) {
                setTransactions(response.data.transactions);
                setTransactionsSummary(response.data.summary);
                setPagination(response.data.pagination);
            } else {
                toast.error('Failed to fetch transactions');
            }
        } catch (error) {
            console.error('Error fetching transactions:', error);
            toast.error(error.response?.data?.message || 'Error loading transactions');
        } finally {
            setTransactionsLoading(false);
        }
    };

    // Fetch transactions when transactions tab is active
    useEffect(() => {
        if (activeTab === 'transactions' && stationId) {
            fetchTransactions();
        }
    }, [activeTab, stationId]);

    // Fetch station data from backend
    useEffect(() => {
        const fetchStationData = async () => {

            if (!stationId) return;

            try {
                setLoading(true);
                const stationOwnerID = localStorage.getItem('userID');
                const accessToken = localStorage.getItem('accessToken');

                console.log('Making API request to:', `${API_BASE_URL}/api/stations/station/${stationId}`);
                console.log('Station Owner ID:', stationOwnerID);
                console.log('Access Token exists:', !!accessToken)

                const headers = { 'Authorization': `Bearer ${accessToken}` };
                const params = { stationOwnerId: stationOwnerID };

                const [stationResponse, closuresResponse] = await Promise.all([
                    axios.get(`${API_BASE_URL}/api/stations/station/${stationId}`, { headers, params }),
                    axios.get(`${API_BASE_URL}/api/stations/${stationId}/temporary-closure`, { headers, params })
                ]
                );

                console.log('Main Station API Response:', stationResponse.data);
                console.log('Closures API Response:', closuresResponse.data);

                if (stationResponse.data.success) {
                    const stationData = stationResponse.data.data;

                    console.log('Station Data from API:', stationData);

                    // Update station details with API data
                    setStationDetails({
                        id: stationData._id || stationData.id,
                        name: stationData.station_name || '',
                        address: `${stationData.address || ''}${', '}${stationData.city}${', '}${stationData.district}`,
                        addressLine: stationData.address || '',
                        city: stationData.city || '',
                        district: stationData.district || '',
                        electricityProvider: stationData.electricity_provider || '',
                        powerSource: stationData.power_source || '',
                        location: stationData.location || { lat: 0, lng: 0 },
                        operator: stationData.operator || "",
                        email: stationData.email || "",
                        operatorJoinedDate: stationData.operatorJoinedDate || "",
                        operatorStatus: stationData.operatorStatus || "Active",
                        totalEarnings: stationData.totalEarnings || "LKR 0",
                        earningsChange: stationData.earningsChange || "+0%",
                        totalElectricity: stationData.totalElectricity || "0 nWh",
                        electricityChange: stationData.electricityChange || "+0%",
                        reports: stationData.reports || "0",
                        status: stationData.status || "Open",
                        noOfConnectors: stationData.chargers?.length || "0",
                        noOfReports: stationData.noOfReports || "0",
                        averageRating: stationData.averageRating || 0,
                        totalRatings: stationData.totalRatings || 0,
                        chargers: stationData.chargers || [],
                    });

                    // Set Schedule Data from API
                    setStationSchedule(stationData.station_schedule || null);

                    // Set rating from API data
                    setRating(stationData.averageRating || 0.0);
                } else {
                    toast.error('Failed to fetch station data');
                }


                if (closuresResponse.data.success) {
                    setStationTemporaryClosures(closuresResponse.data.data || []);
                } else {
                    toast.error('Failed to fetch temporary closures');
                }

            } catch (error) {
                console.error('Error in combined fetch:', error);

                if (error.response) {
                    console.error('Response data:', error.response.data);
                    console.error('Response status:', error.response.status);
                    console.error('Response headers:', error.response.headers);

                    if (error.response.status === 401) {
                        toast.error('Authentication failed. Please login again.');
                    } else if (error.response.status === 404) {
                        toast.error('Station not found');
                    } else {
                        toast.error(error.response.data.message || 'Error loading station data');
                    }
                } else if (error.request) {
                    console.error('Request:', error.request);
                    toast.error('No response received from server');
                } else {
                    console.error('Error message:', error.message);
                    toast.error('Error configuring request');
                }
            } finally {
                setLoading(false);
            }
        };

        if (stationId) {
            fetchStationData();
        }
    }, [stationId]);

    // Separate useEffect to call the function on mount/ID change
    // useEffect(() => {
    //     if (stationId) {
    //         fetchStationData();
    //     }
    // }, [stationId, fetchStationData]);

    const initialDisplayCount = 3;
    const imagesToDisplay = showAll ? localStationImages : localStationImages.slice(0, initialDisplayCount);

    const handleUpdateStationDetails = () => {
        setShowEditStationForm(true);
    };

    // Handler to update the schedule via API
    const handleScheduleSubmit = async (newScheduleData) => {
        try {
            const stationOwnerID = localStorage.getItem('userID');

            await axios.put(
                `${API_BASE_URL}/api/stations/update-station-schedule/${stationId}`,
                {
                    stationOwnerID,
                    station_schedule: newScheduleData // Send the entire updated schedule object
                },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            toast.success('Schedule updated successfully!');

            // Re-fetch the data to ensure the UI reflects the persisted state
            // await fetchStationData(); 

        } catch (error) {
            console.error('Error updating schedule:', error);
            toast.error(error.response?.data?.message || 'Failed to save schedule.');
        }
    };

    // API Handler for Temporary Closure Creation
    const handleTemporaryCloseCreate = async (closureData) => {
        try {
            const stationOwnerID = localStorage.getItem('userID');

            const payload = {
                owner_id: stationOwnerID,
                fromDateTime: closureData.fromDateTime,
                toDateTime: closureData.toDateTime,
                reason: closureData.reason
            };

            const response = await axios.post(
                `${API_BASE_URL}/api/stations/${stationId}/create-temporary-closure`,
                payload,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.success) {
                const { cancellation_summary } = response.data.data;

                let successMessage = 'Temporary closure applied successfully.';

                if (cancellation_summary.total_bookings > 0) {
                    successMessage += ` ${cancellation_summary.total_bookings} booking(s) cancelled.`;

                    if (cancellation_summary.successful_refunds > 0) {
                        successMessage += ` ${cancellation_summary.successful_refunds} refund(s) processed.`;
                    }

                    if (cancellation_summary.failed_refunds > 0) {
                        successMessage += ` ${cancellation_summary.failed_refunds} refund(s) failed.`;
                    }
                }

                toast.success(successMessage);

                // Show detailed refund information in console for debugging
                console.log('Refund details:', cancellation_summary.refund_details);
            }

        } catch (error) {
            console.error('Error creating temporary closure:', error);

            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Failed to apply temporary closure.');
            }
        }
    };

    // Temporary Closure Removal
    const handleTemporaryCloseRemove = async (closureId) => {
        try {
            const stationOwnerID = localStorage.getItem('userID');

            const requestBody = {
                stationOwnerID: stationOwnerID
            };

            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json' // Good practice to specify
                }
            };

            // Send DELETE request, passing owner ID and closure ID in the request body (Axios requirement)
            await axios.put(
                `${API_BASE_URL}/api/stations/${stationId}/remove-temporary-closure/${closureId}`,
                requestBody, // Correctly passes { stationOwnerID: '...' } as the body
                config
            );

            toast.success('Temporary closure successfully cancelled.');
            // await fetchStationData();

        } catch (error) {
            console.error('Error cancelling temporary closure:', error);
            toast.error(error.response?.data?.message || 'Failed to cancel temporary closure.');
        }
    };

    const handleFormSubmit = (data) => {
        console.log("Station Update Form Submitted:", data);
        if (data.type === 'edit-station' && data.station) { // The form returns 'add-station' mode data when editing station
            // Update stationDetails state with data from the form
            setStationDetails(prev => ({
                ...prev,
                ...data.station,
                // Reconstruct full address if needed for display, or assume form provides it
                address: `${data.station.addressLine}, ${data.station.city}`, // Example re-construction
            }));
            alert('Station details updated successfully!');
        }
        setShowEditStationForm(false);
    };

    const handleCloseForm = () => {
        setShowEditStationForm(false);
    };

    // Tab configuration
    const tabs = [
        { id: 'profile', label: 'Profile' },
        { id: 'schedule', label: 'Schedule' },
        { id: 'chargers', label: 'Chargers' },
        { id: 'transactions', label: 'Transactions Related to Station' },
        // { id: 'stats', label: 'Stats' }
    ];

    const GLOBAL_RESTRICTED_STATUSES = [
        'disabled_by_so', // Station Owner disabled
        'deleted'         // Station is marked for deletion
    ];

    const isStationGloballyDisabled = GLOBAL_RESTRICTED_STATUSES.includes(stationDetails.status.toLowerCase());


    const hasOperationalCharger = stationDetails.chargers?.some(charger =>
        // The opposite of the restricted list: is it 'open' OR is it 'unavailable'?
        charger.charger_status === 'open' || charger.charger_status === 'unavailable'
    ) || false;

    const canViewSchedule = !isStationGloballyDisabled && hasOperationalCharger;

    // Mobile labels for tabs
    const mobileLabels = {
        profile: 'Profile',
        schedule: 'Schedule',
        chargers: 'Chargers',
        transactions: 'Transactions Related to Station',
        // stats: 'Stats'
    };

    const visibleTabs = tabs.filter(tab => {
        if (tab.id === 'schedule') {
            // Only include the 'schedule' tab if the condition is met
            return canViewSchedule;
        }
        // Always include other tabs
        return true;
    });

    // Render stars based on rating
    const renderStars = () => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<img key={i} src={StarIcon} alt="Filled star" className="w-4 h-4" />);
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(<img key={i} src={StarOutlineIcon} alt="Half star" className="w-4 h-4" />);
            } else {
                stars.push(<img key={i} src={StarOutlineIcon} alt="Empty star" className="w-4 h-4" />);
            }
        }

        return (
            <div className="flex items-center mt-1">
                <div className="flex mr-2">{stars}</div>
                <span className="text-xs" style={{ color: COLORS.secondaryText }}>
                    {rating.toFixed(1)}
                </span>
            </div>
        );
    };

    // Handler for removing a station
    const handleRemoveStation = async () => {
        if (window.confirm("Are you sure you want to remove this station? This action cannot be undone.")) {
            try {
                const stationOwnerID = localStorage.getItem('userID');

                const response = await axios.delete(
                    `${API_BASE_URL}/api/stations/delete-station/${stationId}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        data: {
                            stationOwnerID: stationOwnerID
                        }
                    }
                );

                if (response.data.success) {
                    toast.success('Station removed successfully!');
                    navigate('/station-owner/stations');
                } else {
                    toast.error('Failed to remove station');
                }
            } catch (error) {
                console.error('Error removing station:', error);
                toast.error(error.response?.data?.message || 'Error removing station');
            }
        }
    };

    // Handler for removing an image
    const handleRemoveImage = (indexToRemove) => {
        setLocalStationImages(prevImages => prevImages.filter((_, index) => index !== indexToRemove));
    };

    // Handler for adding a new image
    const handleAddImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLocalStationImages(prevImages => [...prevImages, reader.result]);
            };
            reader.readAsDataURL(file);
        }
    };

    // Table columns configuration (no changes here)
    const chargersColumns = ['chargerID', 'Charger Name', 'Joined On', 'Power Type', 'Maximum Power Output(kW)', 'Connectors', 'Unit Price(per kW)', 'Total Sessions', 'Revenue', 'No of Active Reports', 'Charger Status'];

    // Profile Tab Content
    const ProfileTab = () => {
        const statusColors = {
            'open': {
                bg: `${COLORS.primary}20`,
                text: COLORS.primary
            },
            'closed': {
                bg: `${COLORS.secondaryText}20`,
                text: COLORS.secondaryText
            },
            'reviewing': {
                bg: `${COLORS.HighlightText}20`,
                text: COLORS.HighlightText
            },
            'disabled_by_so': {
                bg: `${COLORS.danger}20`,
                text: COLORS.danger
            },
            'deleted': {
                bg: `${COLORS.mainTextColor}20`,
                text: COLORS.mainTextColor
            }
        };

        // Use stationDetails.status
        const currentStatus = stationDetails.status || 'Active';
        const statusStyle = statusColors[currentStatus] || statusColors['Active'];

        if (loading) {
            return (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            );
        }

        return (
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Left side - Profile info */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                            style={{ borderColor: COLORS.stroke }}>
                            <div>
                                <h1 className="text-xl font-medium" style={{ color: COLORS.mainTextColor }}>
                                    {stationDetails.name}
                                </h1>
                                <p className="text-sm mt-1" style={{ color: COLORS.secondaryText }}>
                                    {stationDetails.address}
                                </p>
                                {renderStars()}
                            </div>
                            <div className="sm:self-start flex items-center gap-2">
                                <span className="px-3 py-1 rounded-full text-sm inline-block uppercase" style={{
                                    backgroundColor: statusStyle.bg,
                                    color: statusStyle.text
                                }}>
                                    {currentStatus}
                                </span>
                                <StationActionsDropdown onRemoveStation={handleRemoveStation} />
                            </div>
                        </div>

                        <div className="mb-4">
                            <OverviewCard padding="p-4">
                                <div className="relative w-full">
                                    <StationMap
                                        location={stationDetails.location}
                                        stationName={stationDetails.name}
                                    />
                                    {(!stationDetails.location || !stationDetails.location.latitude) && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-80">
                                            <p className="text-gray-500 text-sm">Location not set</p>
                                        </div>
                                    )}
                                </div>
                            </OverviewCard>
                            {stationDetails.location && (stationDetails.location.latitude || stationDetails.location.lat) && (
                                <div className="mt-2 text-center text-sm" style={{ color: COLORS.secondaryText }}>
                                    Coordinates: {stationDetails.location.latitude?.toFixed(6) || stationDetails.location.lat?.toFixed(6)}, {stationDetails.location.longitude?.toFixed(6) || stationDetails.location.lng?.toFixed(6)}
                                </div>
                            )}
                        </div>

                        <div className="flex-col gap-4 mt-4 bg-white p-8 rounded-xl">
                            <div className="flex flex-wrap justify-between gap-4 text-sm">
                                <div>
                                    <strong
                                        style={{ fontWeight: FONTS.weights.normal, color: COLORS.secondaryText, fontSize: FONTS.sizes.sm }}
                                    >
                                        Electricity Provider:
                                    </strong>{' '}
                                    {stationDetails.electricityProvider}
                                </div>
                                <div>
                                    <strong
                                        style={{ fontWeight: FONTS.weights.normal, color: COLORS.secondaryText, fontSize: FONTS.sizes.sm }}
                                    >
                                        Power Source:
                                    </strong>{' '}
                                    {stationDetails.powerSource}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <p
                                className="underline cursor-pointer"
                                style={{ color: COLORS.secondaryText, fontSize: FONTS.sizes.sm }}
                                onClick={handleUpdateStationDetails}
                            >
                                Update Station Details
                            </p>
                        </div>

                        <div className="flex-col gap-4 mt-8 bg-transparent p-0 rounded-xl">
                            <h3 className="mb-4" style={{ fontSize: FONTS.sizes.base, fontWeight: FONTS.weights.normal, color: COLORS.mainTextColor }}>Station Gallery</h3>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {imagesToDisplay.map((src, idx) => (
                                    <div key={idx} className="relative">
                                        <img
                                            src={src}
                                            alt={`station ${idx}`}
                                            className="w-full h-32 object-cover rounded-lg shadow"
                                        />
                                        <button
                                            onClick={() => handleRemoveImage(idx)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
                                            aria-label="Remove image"
                                        >
                                            X
                                        </button>
                                    </div>
                                ))}
                                <div
                                    className="w-full h-32 flex items-center justify-center rounded-lg border-2 border-dashed"
                                    style={{ borderColor: COLORS.stroke }}
                                >
                                    <button
                                        onClick={() => fileInputRef.current.click()}
                                        className="text-center"
                                        style={{ color: COLORS.secondaryText, fontSize: FONTS.sizes.sm }}
                                    >
                                        Add New Image
                                    </button>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleAddImage}
                                        className="hidden"
                                        accept="image/*"
                                    />
                                </div>
                            </div>

                            {localStationImages.length > initialDisplayCount && (
                                <div className="flex justify-center mt-4 text-right">
                                    <button
                                        onClick={() => setShowAll(!showAll)}
                                        className="underline"
                                        style={{ color: COLORS.secondaryText, fontWeight: FONTS.weights.normal, fontSize: FONTS.sizes.sm }}
                                    >
                                        {showAll ? 'Show Less' : 'View All'}
                                    </button>
                                </div>
                            )}
                        </div>

                        {showEditStationForm && (
                            <AddChargingStationForm
                                onClose={handleCloseForm}
                                onSubmit={handleFormSubmit}
                                mode="edit-station"
                                initialFormData={stationDetails}
                            />
                        )}
                    </div>

                    {/* Right side panel - Only for profile tab */}
                    <div className="lg:col-span-1 space-y-4">
                        <ViewStationRightPanel
                            station={stationDetails}
                        />
                    </div>
                </div>
            </LoadScript>
        );
    };

    // Transactions Tab Content
    const TransactionsTab = () => {
        const [search, setSearch] = useState('');
        const [filter, setFilter] = useState('all');
        const [sort, setSort] = useState('date');

        const transactionsColumns = [
            'TransactionID',
            'Date & Time',
            'Type',
            'SessionID',
            'BookingID',
            'Gross Amount(LKR)',
            'Commission(LKR)',
            'Net Amount(LKR)',
            'Payout Status',
            'Actions'
        ];

        const filterOptions = [
            { label: 'All Types', value: 'all' },
            { label: 'Booking Fees', value: 'booking_fee' },
            { label: 'Charging Fees', value: 'charging_fee' }
        ];

        const sortOptions = [
            { label: 'Date', value: 'date' },
            { label: 'Amount', value: 'amount' },
            { label: 'Type', value: 'type' }
        ];

        const handleFilterChange = (newFilter) => {
            setFilter(newFilter);
            fetchTransactions(1, { type: newFilter === 'all' ? '' : newFilter });
        };

        const handleSearch = (searchTerm) => {
            setSearch(searchTerm);
            // You can implement search if needed
        };

        const handlePageChange = (newPage) => {
            fetchTransactions(newPage, { type: filter === 'all' ? '' : filter });
        };

        const getStatusBadge = (status) => {
            const statusConfig = {
                'pending': { color: 'bg-yellow-100 text-yellow-800', text: 'Pending' },
                'processing': { color: 'bg-blue-100 text-blue-800', text: 'Processing' },
                'paid': { color: 'bg-green-100 text-green-800', text: 'Paid' },
                'on_hold': { color: 'bg-red-100 text-red-800', text: 'On Hold' }
            };

            const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800', text: status };

            return (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
                    {config.text}
                </span>
            );
        };

        const handleViewReceipt = async (transactionId) => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const userID = localStorage.getItem('userID');
                const response = await axios.get(
                    `${API_BASE_URL}/api/station-owner/transactions/${transactionId}/details/${userID}/receipt`,
                    {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    }
                );

                if (response.data.success) {
                    // Open receipt in new window or show modal
                    // console.log('Transaction details:', response.data.transaction);
                    // You can implement a receipt modal here
                    toast.info('Receipt details loaded');
                    setSelectedReceipt(response.data.receipt);
                    setReceiptModalOpen(true);
                } else {
                    toast.error('Failed to load receipt details');
                }
            } catch (error) {
                console.error('Error fetching receipt:', error);
                toast.error('Failed to load receipt');
            }
        };

        const tableData = transactions.map(transaction => ({
            id: transaction.transactionId,
            TransactionID: `TRX${transaction.transactionId}`,
            'Date & Time': new Date(transaction.date).toLocaleString(),
            Type: transaction.type,
            SessionID: transaction.sessionId || 'N/A',
            BookingID: transaction.bookingId || 'N/A',
            'Gross Amount(LKR)': transaction.grossAmount.toFixed(2),
            'Commission(LKR)': transaction.commission.toFixed(2),
            'Net Amount(LKR)': transaction.netAmount.toFixed(2),
            'Payout Status': getStatusBadge(transaction.payoutStatus),
            Actions: (
                <button
                    onClick={() => handleViewReceipt(transaction.Id)}
                    className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm transition-colors"
                >
                    View Receipt
                </button>
            )
        }));

        return (
            <div className="space-y-6">
                {/* Transactions Summary Cards */}
                {transactionsSummary && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="rounded-xl p-6 border" style={{ borderColor: COLORS.stroke, backgroundColor: 'white' }}>
                            <h3 className="text-sm font-medium mb-2" style={{ color: COLORS.secondaryText }}>
                                Total Revenue
                            </h3>
                            <div className="text-2xl font-bold mb-1" style={{ color: COLORS.success }}>
                                LKR {transactionsSummary.totalGross?.toFixed(2) || '0.00'}
                            </div>
                            <div className="text-sm" style={{ color: COLORS.secondaryText }}>
                                Gross earnings
                            </div>
                        </div>

                        <div className="rounded-xl p-6 border" style={{ borderColor: COLORS.stroke, backgroundColor: 'white' }}>
                            <h3 className="text-sm font-medium mb-2" style={{ color: COLORS.secondaryText }}>
                                Net Earnings
                            </h3>
                            <div className="text-2xl font-bold mb-1" style={{ color: COLORS.primary }}>
                                LKR {transactionsSummary.totalNet?.toFixed(2) || '0.00'}
                            </div>
                            <div className="text-sm" style={{ color: COLORS.secondaryText }}>
                                After commission
                            </div>
                        </div>

                        <div className="rounded-xl p-6 border" style={{ borderColor: COLORS.stroke, backgroundColor: 'white' }}>
                            <h3 className="text-sm font-medium mb-2" style={{ color: COLORS.secondaryText }}>
                                Platform Commission
                            </h3>
                            <div className="text-2xl font-bold mb-1" style={{ color: COLORS.danger }}>
                                LKR {transactionsSummary.totalCommission?.toFixed(2) || '0.00'}
                            </div>
                            <div className="text-sm" style={{ color: COLORS.secondaryText }}>
                                10% of revenue
                            </div>
                        </div>

                        <div className="rounded-xl p-6 border" style={{ borderColor: COLORS.stroke, backgroundColor: 'white' }}>
                            <h3 className="text-sm font-medium mb-2" style={{ color: COLORS.secondaryText }}>
                                Total Transactions
                            </h3>
                            <div className="text-2xl font-bold mb-1" style={{ color: COLORS.warning }}>
                                {transactionsSummary.totalTransactions || 0}
                            </div>
                            <div className="text-sm" style={{ color: COLORS.secondaryText }}>
                                All time
                            </div>
                        </div>
                    </div>
                )}

                {/* Transactions Table */}
                <div className="bg-white rounded-lg shadow-sm border" style={{ borderColor: COLORS.stroke }}>
                    <DataTableTopBar
                        search={search}
                        setSearch={handleSearch}
                        filter={filter}
                        setFilter={handleFilterChange}
                        sort={sort}
                        setSort={setSort}
                        filterOptions={filterOptions}
                        sortOptions={sortOptions}
                        searchPlaceholder="Search transactions..."
                    />

                    {transactionsLoading ? (
                        <div className="flex justify-center items-center h-32">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : transactions.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-gray-500 text-lg mb-2">No transactions found</div>
                            <div className="text-sm text-gray-400">
                                Transactions will appear here once you start receiving bookings and charging sessions.
                            </div>
                        </div>
                    ) : (
                        <>
                            <DataTable
                                columns={transactionsColumns}
                                data={tableData}
                                filter={filter}
                                sort={sort}
                                search={search}
                            />

                            {/* Pagination */}
                            {pagination.totalPages > 1 && (
                                <div className="flex justify-between items-center p-4 border-t" style={{ borderColor: COLORS.stroke }}>
                                    <div className="text-sm" style={{ color: COLORS.secondaryText }}>
                                        Showing page {pagination.currentPage} of {pagination.totalPages}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handlePageChange(pagination.currentPage - 1)}
                                            disabled={!pagination.hasPrev}
                                            className={`px-3 py-1 rounded-md text-sm ${pagination.hasPrev
                                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                                }`}
                                        >
                                            Previous
                                        </button>
                                        <button
                                            onClick={() => handlePageChange(pagination.currentPage + 1)}
                                            disabled={!pagination.hasNext}
                                            className={`px-3 py-1 rounded-md text-sm ${pagination.hasNext
                                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                                }`}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        );
    };

    // Table Tab Content (no changes needed)
    const TableTab = ({ title, columns, data, onRowClick }) => (
        <div className="grid grid-cols-1 gap-0 bg-transparent rounded-lg p-0">
            <DataTableTopBar
                search={search}
                setSearch={setSearch}
                filter={filter}
                setFilter={setFilter}
                sort={sort}
                setSort={setSort}
                filterOptions={[
                    { value: 'status', label: 'Active' },
                    { value: 'status', label: 'Inactive' }
                ]}
                sortOptions={columns.map(col => ({ value: col, label: col }))}
                searchPlaceholder={`Search ${title.toLowerCase()}...`}
            />
            <DataTable
                columns={columns}
                data={data}
                filter={filter}
                sort={sort}
                search={search}
                onRowClick={onRowClick}
            />
        </div>
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div
            style={{
                fontFamily: FONTS.family.sans,
                padding: '24px',
                backgroundColor: COLORS.background,
            }}>

            <StationOwnerPageHeader title={`${stationDetails.name}`} />

            {/* Tab Navigation */}
            <TabBar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabs={visibleTabs}
                mobileLabels={mobileLabels}
            />

            {/* Tab Content */}
            <div className="mt-6">
                {activeTab === 'profile' && <ProfileTab />}

                {activeTab === 'schedule' && canViewSchedule && <StationSchedule
                    initialSchedule={stationSchedule}
                    initialTemporaryClosure={stationTemporaryClosures}
                    onScheduleSave={handleScheduleSubmit}
                    onTemporaryCloseCreate={handleTemporaryCloseCreate}
                    onTemporaryCloseRemove={handleTemporaryCloseRemove}
                    stationId={stationId}
                />}

                {activeTab === 'chargers' && (
                    <TableTab
                        title="Chargers"
                        columns={chargersColumns}
                        data={chargersTableData}
                        onRowClick={(charger) => navigate(`/station-owner/stations/chargerprofile/${stationId}/${charger.chargerID}`)}
                    />
                )}

                {activeTab === 'transactions' && (
                    <TransactionsTab />
                )}

                <ReceiptModal
                    isOpen={receiptModalOpen}
                    onClose={() => {
                        setReceiptModalOpen(false);
                        setSelectedReceipt(null);
                    }}
                    receiptData={selectedReceipt}
                />
            </div>
        </div>
    );
};

export default OwnerViewStation;