import React, { useState, useRef, useEffect } from 'react'; // Added useEffect
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
import { FiMoreVertical } from 'react-icons/fi';
import AddChargingStationForm from '../../components/stationComponents/RAddStationForm';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const stationImages = [
    'https://images.unsplash.com/photo-1703860271509-b50f5679f2a0?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1616361715039-11dde2199a21?q=80&w=1746&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1729229078656-268bae113975?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1710025582119-e133fb11e10a?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1737312272830-f445719b7ed9?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

const sampleSchedule = {
    monday: { selected: true, open24Hours: false, closed: false, timeBlocks: [{ from: '08:00', to: '18:00' }] },
    tuesday: { selected: true, open24Hours: false, closed: false, timeBlocks: [{ from: '09:00', to: '17:00' }] },
    wednesday: { selected: true, open24Hours: true, closed: false, timeBlocks: [] },
    thursday: { selected: true, open24Hours: false, closed: false, timeBlocks: [{ from: '07:00', to: '12:00' }, { from: '14:00', to: '20:00' }] },
    friday: { selected: true, open24Hours: false, closed: false, timeBlocks: [{ from: '10:00', to: '22:00' }] },
    saturday: { selected: true, open24Hours: false, closed: true, timeBlocks: [] }, // Closed
    sunday: { selected: false, open24Hours: false, closed: false, timeBlocks: [] }, // Not set
};

const sampleTemporaryClosure = [
    {
        from: new Date('2025-07-20T10:00:00'),
        to: new Date('2025-07-20T14:00:00'),
        reason: 'Scheduled infrastructure upgrade.'
    },
    {
        from: new Date('2025-07-25T09:00:00'),
        to: new Date('2025-07-25T17:00:00'),
        reason: 'Annual safety inspection.'
    },
];

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
    const [stationSchedule, setStationSchedule] = useState(sampleSchedule);
    const [stationTemporaryClosures, setStationTemporaryClosures] = useState(sampleTemporaryClosure);
    const [showAll, setShowAll] = useState(false);
    const [localStationImages, setLocalStationImages] = useState(stationImages);
    const [loading, setLoading] = useState(true);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
     const { id } = useParams(); // Get station ID from URL params
     const stationId = id; // Use the id directly

     console.log('Station ID from URL:', id);

    // Consolidated Station Details State - THIS IS THE MAIN CHANGE
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
        totalRatings: 0
    });

    const [showEditStationForm, setShowEditStationForm] = useState(false);

    // Fetch station data from backend
    useEffect(() => {
        const fetchStationData = async () => {
            try {
                setLoading(true);
                const stationOwnerID = localStorage.getItem('userID');
                const accessToken = localStorage.getItem('accessToken');

                console.log('Making API request to:', `${API_BASE_URL}/api/stations/station/${stationId}`);
                console.log('Station Owner ID:', stationOwnerID);
                console.log('Access Token exists:', !!accessToken)
                
                const response = await axios.get(
                    `${API_BASE_URL}/api/stations/station/${stationId}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        params: {
                            stationOwnerId: stationOwnerID
                        }
                    }
                    
                );

                console.log('API Response:', response.data);

                if (response.data.success) {
                    const stationData = response.data.data;

                    console.log('Station Data from API:', stationData);
                    
                    // Update station details with API data
                    setStationDetails({
                        id: stationData._id || stationData.id,
                        name: stationData.station_name || '',
                        address: stationData.address || '',
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
                        totalRatings: stationData.totalRatings || 0
                    });

                    // Set rating from API data
                    setRating(stationData.averageRating || 0.0);
                } else {
                    toast.error('Failed to fetch station data');
                }
            } catch (error) {
                console.error('Error fetching station data:', error);
                
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

    const initialDisplayCount = 3;
    const imagesToDisplay = showAll ? localStationImages : localStationImages.slice(0, initialDisplayCount);

    const handleUpdateStationDetails = () => {
        setShowEditStationForm(true);
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

    // Mobile labels for tabs
    const mobileLabels = {
        profile: 'Profile',
        schedule: 'Schedule',
        chargers: 'Chargers',
        transactions: 'Transactions Related to Station',
        // stats: 'Stats'
    };

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

    // Sample data for tables (no changes here, as they are separate data sets)
    const chargersData = [
        {
            'chargerID': 'EVDC0001',
            'Charger Name': 'HyperCharge Dual-Port',
            'Joined On': '2023-01-15',
            'Power Type': 'DC Fast Charger',
            'Maximum Power Output(kW)': '150 kW',
            'Connectors': ['CCS1', 'CHAdeMO'],
            'Unit Price(per kW)': '55.00',
            'Total Sessions': '232',
            'Revenue': '3,300,500',
            'No of Active Reports': '0',
            'Charger Status': 'Active',
        },
        {
            'chargerID': 'EVDC0002',
            'Charger Name': 'FastCharge DC',
            'Joined On': '2022-11-10',
            'Power Type': 'DC Fast Charger',
            'Maximum Power Output(kW)': '60 kW',
            'Connectors': ['CCS2'],
            'Unit Price(per kW)': '55.00',
            'Total Sessions': '560',
            'Revenue': '5,000,000',
            'No of Active Reports': '0',
            'Charger Status': 'Disabled',
        },
        {
            'chargerID': 'EVAC0003',
            'Charger Name': 'AC Charger 1',
            'Joined On': '',
            'Power Type': 'AC Charger',
            'Maximum Power Output(kW)': '12 kW',
            'Connectors': ['Type1'],
            'Unit Price(per kW)': '42.00',
            'Total Sessions': '',
            'Revenue': '',
            'No of Active Reports': '',
            'Charger Status': 'Pending-Approval',
        }
    ];

    const transactionsData = [
        {
            TransactionID: 'TRN001',
            'Date & Time': '2025-07-15 10:35 AM',
            Charger: 'StationA-Charger01',
            Connector: 'Type 2 AC',
            SessionID: 'S001',
            BookingID: 'BKG12345',
            'Transaction Type': 'Charging Payment',
            'Total Earning(LKR)': 775.00,
            'Commission(LKR)': 77.50,
            'Owner Revenue(LKR)': 697.50,
            'Payment Status': 'Completed',
            'Quick Actions': ['View Receipt']
        },
        {
            TransactionID: 'TRN002',
            'Date & Time': '2025-07-15 11:50 AM',
            Charger: 'StationA-Charger02',
            Connector: 'CCS2 DC',
            SessionID: 'S002',
            BookingID: '-',
            'Transaction Type': 'Charging Payment',
            'Total Earning(LKR)': 1100.00,
            'Commission(LKR)': 110.00,
            'Owner Revenue(LKR)': 990.00,
            'Payment Status': 'Completed',
            'Quick Actions': ['View Receipt']
        },
        {
            TransactionID: 'TRN003',
            'Date & Time': '2025-07-16 02:55 PM',
            Charger: 'StationB-Charger03',
            Connector: 'CHAdeMO DC',
            SessionID: 'S003',
            BookingID: 'BKG12346',
            'Transaction Type': 'Charging Payment',
            'Total Earning(LKR)': 1750.00,
            'Commission(LKR)': 175.00,
            'Owner Revenue(LKR)': 1575.00,
            'Payment Status': 'Pending',
            'Quick Actions': ['View Receipt']
        },
        {
            TransactionID: 'TRN004',
            'Date & Time': '2025-07-16 03:00 PM',
            Charger: 'N/A',
            Connector: 'N/A',
            SessionID: 'S003',
            BookingID: 'BKG12346',
            'Transaction Type': 'Charging Payment',
            'Total Earning(LKR)': 2000.00,
            'Commission(LKR)': 200.00,
            'Owner Revenue(LKR)': 1800.00,
            'Payment Status': 'Pending',
            'Quick Actions': ['View Receipt']
        },
        {
            TransactionID: 'TRN005',
            'Date & Time': '2025-07-17 09:35 AM',
            Charger: '',
            Connector: '',
            SessionID: '',
            BookingID: 'BKG12348',
            'Transaction Type': 'Late Cancellation',
            'Total Earning(LKR)': 1900.00,
            'Commission(LKR)': 200.00,
            'Owner Revenue(LKR)': 1700.00,
            'Payment Status': 'Pending',
            'Quick Actions': ['View Receipt']
        }
    ];

    // Table columns configuration (no changes here)
    const chargersColumns = ['chargerID', 'Charger Name', 'Joined On', 'Power Type', 'Maximum Power Output(kW)', 'Connectors', 'Unit Price(per kW)', 'Total Sessions', 'Revenue', 'No of Active Reports', 'Charger Status'];
    const transactionsColumns = ['TransactionID', 'Date & Time', 'SessionID', 'BookingID', 'Transaction Type', 'Total Earning(LKR)', 'Commission(LKR)', 'Owner Revenue(LKR)', 'Payment Status', 'Quick Actions'];


    // Profile Tab Content
    const ProfileTab = () => {
        const statusColors = {
            'Active': {
                bg: `${COLORS.primary}20`,
                text: COLORS.primary
            },
            'Closed': {
                bg: `${COLORS.danger}20`,
                text: COLORS.danger
            },
            'Under Maintenance': {
                bg: `${COLORS.HighlightText}20`,
                text: COLORS.HighlightText
            },
            'Disabled': {
                bg: `${COLORS.danger}20`,
                text: COLORS.danger
            },
            'Deleted': {
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
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Left side - Profile info */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                        style={{ borderColor: COLORS.stroke }}>
                        <div>
                            <h1 className="text-xl font-medium" style={{ color: COLORS.mainTextColor }}>
                                {stationDetails.name} {/* Use stationDetails */}
                            </h1>
                            <p className="text-sm mt-1" style={{ color: COLORS.secondaryText }}>
                                {stationDetails.address} {/* Use stationDetails */}
                            </p>
                            {renderStars()}
                        </div>
                        <div className="sm:self-start flex items-center gap-2">
                            <span className="px-3 py-1 rounded-full text-sm inline-block" style={{
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
                            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                                <img
                                    src={MapImage}
                                    alt="Charging Stations Map"
                                    className="absolute inset-0 w-full h-full object-cover rounded-xl"
                                />
                            </div>
                        </OverviewCard>
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
                            mode="edit-station" // This form is designed for 'add-station', but we pass initial data
                            initialFormData={stationDetails} // Pass the consolidated stationDetails
                        />
                    )}
                </div>

                {/* Right side panel - Only for profile tab */}
                <div className="lg:col-span-1 space-y-4">
                    <ViewStationRightPanel
                        station={stationDetails} // Use stationDetails
                    />
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

            <StationOwnerPageHeader title={`${stationDetails.name}`} /> {/* Use stationDetails */}

            {/* Tab Navigation */}
            <TabBar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabs={tabs}
                mobileLabels={mobileLabels}
            />

            {/* Tab Content */}
            <div className="mt-6">
                {activeTab === 'profile' && <ProfileTab />}

                {activeTab === 'schedule' && <StationSchedule
                    initialSchedule={stationSchedule}
                    initialTemporaryClosure={stationTemporaryClosures}
                />}

                {activeTab === 'chargers' && (
                    <TableTab
                        title="Chargers"
                        columns={chargersColumns}
                        data={chargersData}
                        onRowClick={(charger) => navigate(`/station-owner/stations/chargerprofile/${charger.chargerID}`)}
                    />
                )}
                {activeTab === 'transactions' && (
                    <TableTab
                        title="Transactions"
                        columns={transactionsColumns}
                        data={transactionsData}
                        onRowClick={() => { /* Handle transaction row click if needed */ }}
                    />
                )}
            </div>
        </div>
    );
};

export default OwnerViewStation;