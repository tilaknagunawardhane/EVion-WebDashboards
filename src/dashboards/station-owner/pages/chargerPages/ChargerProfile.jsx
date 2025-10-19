import React, { useState, useEffect, useRef, useCallback } from 'react';
import { COLORS, FONTS } from '../../../../constants';
import { useNavigate, useParams } from 'react-router-dom';
import TabBar from '../../../../components/ui/TabBar';
import DataTableTopBar from '../../../../components/ui/DataTableTopBar';
import DataTable from '../../../../components/ui/DataTable';
import StarIcon from '../../../../assets/star-filled.svg';
import StarOutlineIcon from '../../../../assets/star-outline.svg';
import StationOwnerPageHeader from '../../components/StationOwnerPageHeader';
import ConnectorView from '../../components/chargerComponents/ConnectorCard';
import { FiMoreVertical } from 'react-icons/fi';
import AddChargingStationForm from '../../components/stationComponents/RAddStationForm'; 
// import { FiMoreVertical } from 'react-icons/fi';

import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const OwnerViewCharger = () => {
    const { stationId, chargerId } = useParams(); 
    const navigate = useNavigate();

    const [chargerData, setChargerData] = useState(null);
    const [currentSession, setCurrentSession] = useState(null);
    const [connectorBookings, setConnectorBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const [sessionsTableData, setSessionsTableData] = useState([]);
    const [bookingsTableData, setBookingsTableData] = useState([]);

    const [activeTab, setActiveTab] = useState('overview');
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState(null);
    const [sort, setSort] = useState(null);

    const [showChargerForm, setShowChargerForm] = useState(false);
    const [formMode, setFormMode] = useState('edit-charger');
    const [initialChargerData, setInitialChargerData] = useState(null);

    const timeSlots = [
    "00:00 - 00:30", "00:30 - 01:00", "01:00 - 01:30", "01:30 - 02:00",
    "02:00 - 02:30", "02:30 - 03:00", "03:00 - 03:30", "03:30 - 04:00",
    "04:00 - 04:30", "04:30 - 05:00", "05:00 - 05:30", "05:30 - 06:00",
    "06:00 - 06:30", "06:30 - 07:00", "07:00 - 07:30", "07:30 - 08:00",
    "08:00 - 08:30", "08:30 - 09:00", "09:00 - 09:30", "09:30 - 10:00",
    "10:00 - 10:30", "10:30 - 11:00", "11:00 - 11:30", "11:30 - 12:00",
    "12:00 - 12:30", "12:30 - 13:00", "13:00 - 13:30", "13:30 - 14:00",
    "14:00 - 14:30", "14:30 - 15:00", "15:00 - 15:30", "15:30 - 16:00",
    "16:00 - 16:30", "16:30 - 17:00", "17:00 - 17:30", "17:30 - 18:00",
    "18:00 - 18:30", "18:30 - 19:00", "19:00 - 19:30", "19:30 - 20:00",
    "20:00 - 20:30", "20:30 - 21:00", "21:00 - 21:30", "21:30 - 22:00",
    "22:00 - 22:30", "22:30 - 23:00", "23:00 - 23:30", "23:30 - 24:00",
    ];

    const fetchChargerProfileData = useCallback(async () => {
        if (!stationId ) {
            console.error('Station ID is missing');
            setLoading(false);
            return;
        }

        if ( !chargerId ) {
            console.error('Charger ID is missing');
            setLoading(false);
            return;
        }

        const token = localStorage.getItem('accessToken');
        const ownerId = localStorage.getItem('userID');

        try {
            const response = await axios.get(
                `${API_BASE_URL}/api/charger/${stationId}/${chargerId}/profile`,
                { headers: { 'Authorization': `Bearer ${token}` }, params: { stationOwnerId: ownerId } }
            );

            const fetchedData = response.data.data;
            
            // Map fetched data to state
            setChargerData(fetchedData.chargerDetails);
            setCurrentSession(fetchedData.currentSession);
            setConnectorBookings(fetchedData.bookings);

        } catch (error) {
            console.error('Error fetching charger profile:', error);
            toast.error(error.response?.data?.message || 'Failed to load charger profile.');
            // On failure, navigate back to the station list or charger list
            navigate(`/station-owner/stations/stationprofile/${stationId}`);
        } finally {
            setLoading(false);
        }
    }, [stationId, chargerId, navigate]);

    // Trigger fetch on mount/ID change
    useEffect(() => {
        fetchChargerProfileData();
    }, [fetchChargerProfileData]);

    const fetchSessionsTableData = useCallback(async () => {
        if (!chargerId) return;

        const token = localStorage.getItem('accessToken');
        const ownerId = localStorage.getItem('userID');

        try {
            const response = await axios.get(
                `${API_BASE_URL}/api/charger/${chargerId}/sessions`,
                { headers: { 'Authorization': `Bearer ${token}` }, params: { stationOwnerId: ownerId } }
            );
            
            setSessionsTableData(response.data.data || []);
        } catch (error) {
            console.error('Error fetching sessions table data:', error);
            toast.error('Failed to load session table data.');
            setSessionsTableData([]);
        }
    }, [chargerId]);

    // Trigger fetch when tab switches to 'sessions'
    useEffect(() => {
        if (activeTab === 'sessions' && chargerId) {
            fetchSessionsTableData();
        }
    }, [activeTab, chargerId, fetchSessionsTableData]);

    const fetchBookingsTableData = useCallback(async () => {

        if (!chargerId) return;

        const token = localStorage.getItem('accessToken');
        const ownerId = localStorage.getItem('userID');

        try {
            const response = await axios.get(
                `${API_BASE_URL}/api/charger/${chargerId}/bookings`,
                { headers: { 'Authorization': `Bearer ${token}` }, params: { stationOwnerId: ownerId } }
            );
            
            setBookingsTableData(response.data.data || []);
        } catch (error) {
            console.error('Error fetching bookings table data:', error);
            toast.error('Failed to load bookings table data.');
            setBookingsTableData([]);
        }
    }, [chargerId]);


    // Trigger fetch when tab switches to 'bookings'
    useEffect(() => {
        if (activeTab === 'bookings' && chargerId) {
            fetchBookingsTableData();
        }
    }, [activeTab, chargerId, fetchSessionsTableData, fetchBookingsTableData]);

    if ( !chargerData) {
        return <div className="flex justify-center items-center h-screen">No Charger Profile...</div>;
    }

    if ( loading ) {
        return <div className="flex justify-center items-center h-screen">Loading Charger Profile...</div>;
    }

    // Assign fetched data to variables used in JSX
    const charger = chargerData;

    const connectorsList = charger.connectors || [];

    // Tab configuration
    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'sessions', label: 'Sessions' },
        { id: 'bookings', label: 'Bookings'},
        { id: 'transactions', label: 'Transactions Related to Charger'},
        // { id: 'stats', label: 'Stats'},
    ];

    // Mobile labels for tabs
    const mobileLabels = {
        overview: 'Overview',
        sessions: 'Sessions',
        bookings: 'Bookings',
        transactions: 'Transactions Related to Charger',
    };

    const transactionsData = [
        {
            TransactionID: 'TRN001',
            SessionID: 'S001',
            BookingID: 'BKG12345',
            'Date & Time': '2025-07-10 10:35 AM',
            Connector: 'Type 2',
            'Transaction Type': 'Charging Payment',
            'Total Earning (LKR)': 775.00,
            'Commission(LKR)': 75.00,
            'Owner Revenue(LKR)': 700.00,
            'Payment Status': 'Completed',
            'Quick Actions': ['View Receipt'],
        },
        {
            TransactionID: 'TRN002',
            SessionID: 'S002',
            BookingID: '', // No booking ID for walk-in
            'Date & Time': '2025-07-10 11:50 AM',
            Connector: 'CCS2',
            'Transaction Type': 'Charging Payment',
            'Total Earning (LKR)': 1100.00,
            'Commission(LKR)': 100.00,
            'Owner Revenue(LKR)': 1000.00,
            'Payment Status': 'Completed',
            'Quick Actions': ['View Receipt'],
        },
        {
            TransactionID: 'TRN003',
            SessionID: 'S003',
            BookingID: 'BKG12346',
            'Date & Time': '2025-07-11 02:55 PM',
            Connector: 'CHAdeMO',
            'Transaction Type': 'Charging Payment',
            'Total Earning (LKR)': 1750.00,
            'Commission(LKR)': 25.000,
            'Owner Revenue(LKR)': 1500.00,
            'Payment Status': 'Pending',
            'Quick Actions': ['View Receipt'],
        },
        {
            TransactionID: 'TRN004',
            SessionID: 'S003', // Related to the same session as TRN003
            BookingID: 'BKG12346',
            'Date & Time': '2025-07-11 03:00 PM',
            Connector: '', // Penalty doesn't directly use a connector
            'Transaction Type': 'Late Cancellation Fee',
            'Total Earning (LKR)': 200.00,
            'Commission(LKR)': null,
            'Owner Revenue(LKR)': null,
            'Payment Status': 'Pending',
            'Quick Actions': ['View Receipt'],
        },
        {
            TransactionID: 'TRN005',
            SessionID: '', // Cancellation doesn't have an active session
            BookingID: 'BKG12348',
            'Date & Time': '2025-07-12 09:35 AM',
            Connector: '',
            'Transaction Type': 'Charging Payment',
            'Total Earning (LKR)': 1900.00,
            'Commission(LKR)': 300.00,
            'Owner Revenue(LKR)': 1600.00,
            'Payment Status': 'Completed',
            'Quick Actions': ['View Receipt'],
        }
    ];

    const sessionsColumns = ['SessionID', 'Date', 'Connector Used', 'Vehicle', 'Started At', 'Ended At', 'Duration', 'Total Energy Delivered(kWh)', 'BookingID/Walk-in', 'Charging Cost(LKR)', 'Total Payment', 'Payment Status'];
    const bookingsColumns = ['BookingID', 'SessionID', 'Booking Date', 'Booked Slot', 'Charging Started', 'Charging Ended', 'Booking Status', 'Cancellation Time', 'Reason', 'Charging Cost (LKR)', 'Payment Status', 'Reported Issue?', 'Any actions taken to resolve' ];
    const transactionsColumns = ['TransactionID', 'SessionID', 'BookingID', 'Date & Time', 'Transaction Type', 'Total Earning (LKR)', 'Commission(LKR)', 'Owner Revenue(LKR)', 'Payment Status', 'Quick Actions']

    const handleEditCharger = () => {
        console.log('Edit Charger clicked');
        setFormMode('edit-charger');
        // Map the charger data to the expected format for RAddStationForm's initialChargerData
        setInitialChargerData({
            id: charger.id, // Pass the ID if your form needs it for update API calls
            name: charger['Charger Name'],
            maxPower: charger['Maximum Power Output(kW)'].replace(' kW', ''), // Remove ' kW' and parse if needed
            powerType: charger['Power Type'].split(' ')[0], // Extract 'DC' or 'AC'
            connectorTypes: charger['Connectors'], // Use connectorTypes for consistency with RAddStationForm
        });
        setShowChargerForm(true);
        // setShowChargerMenu(false); // Close the dropdown menu
    };

    const handleRemoveCharger = () => {
            const confirmRemove = window.confirm("Are you sure you want to remove this charger?");
            if (confirmRemove) {
                console.log('Remove Charger confirmed');
                navigate('/station-owner/stations/stationprofile/s1');
                // Logic to remove the charger
            }
            // setShowChargerMenu(false);
    };

    // Function to handle form submission from RAddStationForm
    const handleFormSubmit = (data) => {
        console.log("Form submitted with data:", data);
        // Implement your logic to update the charger data in your backend
        // For now, just close the form
        setShowChargerForm(false);
    };

    // Function to close the form
    const handleCloseForm = () => {
        setShowChargerForm(false);
        setInitialChargerData(null); // Clear initial data when closing
    };

    // Overview Tab Content
    const OverviewTab = ({ charger, currentSession, connectorBookings, handleEditCharger, handleRemoveCharger, timeSlots, connectorsList }) => {
       
        const [showChargerMenu, setShowChargerMenu] = useState(false);
        const chargerMenuRef = useRef();

        useEffect(() => {
            const handleClickOutside = (e) => {
                if (chargerMenuRef.current && !chargerMenuRef.current.contains(e.target)) {
                    setShowChargerMenu(false);
                }
            };
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }, []);

        return (
            <div className="w-full bg-transparent rounded-xl">

                <div className="flex-col space-y-2 bg-white px-8 py-6 rounded-xl mb-4">  
                    <div className="flex justify-between items-center w-full">
                        <div style={{ fontWeight: FONTS.weights.medium, color: COLORS.mainTextColor, fontSize: FONTS.sizes.xl }}>
                            {charger['Charger Name']}
                        </div>
                        <div className="relative" ref={chargerMenuRef}>
                            <button onClick={() => setShowChargerMenu(!showChargerMenu)}>
                                <FiMoreVertical size={20} color={COLORS.mainTextColor} />
                            </button>

                            {showChargerMenu && (
                                <div
                                    className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-50"
                                    style={{ border: '1px solid #e5e7eb' }}
                                >
                                    <button
                                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                        onClick={handleEditCharger}
                                    >
                                        Edit Charger
                                    </button>
                                    <button
                                        className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                                        onClick={handleRemoveCharger}
                                    >
                                        Remove Charger
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-between gap-4 text-sm">
                        <div>
                            <strong
                            style={{ fontWeight: FONTS.weights.normal, color: COLORS.secondaryText, fontSize: FONTS.sizes.sm }}
                            >
                            Power Type:
                            </strong>{' '}
                            {charger['Power Type']}
                        </div>
                        <div>
                            <strong
                            style={{ fontWeight: FONTS.weights.normal, color: COLORS.secondaryText, fontSize: FONTS.sizes.sm }}
                            >
                            Max Power Output:
                            </strong>{' '}
                            {charger['Maximum Power Output(kW)']}
                        </div>
                        <div>
                            <strong
                            style={{ fontWeight: FONTS.weights.normal, color: COLORS.secondaryText, fontSize: FONTS.sizes.sm }}
                            >
                            Unit Price( per kW ):
                            </strong>{' '}
                            {charger['Unit Price(per kW)']}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {connectorsList.map((connector, idx) => (
                        <div key={idx} className="space-y-4 bg-white rounded-xl p-8">
                        <ConnectorView
                            connectorName={connector.connectorName}
                            session={currentSession && currentSession.connectorId === connector.id ? currentSession : null}
                            bookings={connectorBookings.filter(b => b.connectorId === connector.id)}
                            timeSlots={timeSlots}
                            // onEdit={() => console.log('Edit', connector.connectorName)}
                            // onDisable={() => console.log('Disable', connector.connectorName)}
                            // onRemove={() => console.log('Remove', connector.connectorName)}
                        />
                        </div>
                    ))}
                </div>

            </div>
        );
    };

    // Table Tab Content
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

    return (
        <div 
            style={{
            fontFamily: FONTS.family.sans,
            padding: '24px',
            backgroundColor: COLORS.background,
        }}>

            <StationOwnerPageHeader title={`Station - ${charger['Charger Name']}`} />


            {/* Tab Navigation */}
            <TabBar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabs={tabs}
                mobileLabels={mobileLabels}
            />

            {/* Tab Content */}
            <div className="mt-6">
                {activeTab === 'overview' && <OverviewTab
                    charger={charger}
                    currentSession={currentSession}
                    connectorBookings={connectorBookings}
                    handleEditCharger={handleEditCharger}
                    handleRemoveCharger={handleRemoveCharger} // Need to define this handler
                    timeSlots={timeSlots}
                    connectorsList={connectorsList}
                />}

                {activeTab === 'sessions' && (
                    <TableTab
                        title="Sessions"
                        columns={sessionsColumns}
                        data={sessionsTableData}
                        onRowClick={(session) => console.log(session.id)}
                    />
                )}
                {activeTab === 'bookings' && (
                    <TableTab
                        title="Booking Sessions"
                        columns={bookingsColumns}
                        data={bookingsTableData}
                        onRowClick={(session) => console.log(session.id)}
                    />
                )}
                {activeTab === 'transactions' && (
                    <TableTab
                        title="Transactions"
                        columns={transactionsColumns}
                        data={transactionsData}
                    />
                )}
            </div>
            {showChargerForm && (
                <AddChargingStationForm
                    onClose={handleCloseForm}
                    onSubmit={handleFormSubmit}
                    mode={formMode}
                    initialChargerData={initialChargerData}
                />
            )}
        </div>
    );
};

export default OwnerViewCharger;