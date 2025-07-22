import React, { useState } from 'react';
import { COLORS, FONTS } from '../../../../constants';
import TabBar from '../../../../components/ui/TabBar';
import DataTableTopBar from '../../../../components/ui/DataTableTopBar';
import DataTable from '../../../../components/ui/DataTable';
import StatCard from '../../components/StatCard';
import StarIcon from '../../../../assets/star-filled.svg';
import StarOutlineIcon from '../../../../assets/star-outline.svg';
import OverviewCard from '../../components/OverviewCard';
import MapImage from '../../../../assets/map-placeholder.png';
import ApprovalCard from '../../components/ApprovalCard';
import ViewStationRightPanel from '../../components/stationComponents/ViewStationRightPanel';
import AdminPageHeader from '../../components/AdminPageHeader';
import { useNavigate } from 'react-router-dom';

const ViewStation = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState(null);
    const [sort, setSort] = useState(null);
    const [rating] = useState(3.0); // Sample rating

    const navigate = useNavigate();

    // Sample station data
    const station = {
        name: "EviGO Charging Station",
        address: "No. 24, Joshep Road, Weilpanna",
        operator: "A P Perera",
        email: "perera@gmail.com",
        operatorJoinedDate: "12 Dec 2024",
        operatorStatus: "Active",
        location: "Bloomfield Cricket and Athletic Club",
        totalEarnings: "LKR 6.45 M",
        earningsChange: "+6.37%",
        totalElectricity: "2560 nWh",
        electricityChange: "-8.3%",
        sessions: "147",
        sessionsChange: "+3.87%",
        reports: "12",
        status: "Active",
        noOfConnectors: "7",
        noOfReports: "17",
    };

    // Tab configuration
    const tabs = [
        { id: 'profile', label: 'Profile' },
        { id: 'chargers', label: 'Chargers' },
        { id: 'sessions', label: 'Charging Sessions' },
        { id: 'transactions', label: 'Transactions' },
        { id: 'faults', label: 'Faults & Complaints' }
    ];

    // Mobile labels for tabs
    const mobileLabels = {
        profile: 'Profile',
        chargers: 'Chargers',
        sessions: 'Sessions',
        transactions: 'Transactions',
        faults: 'Faults'
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

    // Chargers Data
    const chargersData = [
        {
            id: 'CHG-001',
            connectedOn: '2023-01-15',
            type: 'DC',
            power: '150 kW',
            connectors: 2,
            connectorTypes: ['CCS2', 'CHAdeMO'],
            bookings: 'Available',
            currentState: 'Active',
            lastUpdate: '2023-05-20 14:30'
        },
        {
            id: 'CHG-002',
            connectedOn: '2023-02-10',
            type: 'DC',
            power: '60 kW',
            connectors: 1,
            connectorTypes: ['CCS2'],
            bookings: 'Not Available',
            currentState: 'Active',
            lastUpdate: '2023-05-20 15:45'
        },
        {
            id: 'CHG-003',
            connectedOn: '2023-03-05',
            type: 'AC',
            power: '22 kW',
            connectors: 2,
            connectorTypes: ['Type 2'],
            bookings: 'Available',
            currentState: 'Under Maintenance',
            lastUpdate: '2023-05-19 09:15'
        },
        {
            id: 'CHG-004',
            connectedOn: '2022-12-20',
            type: 'DC',
            power: '120 kW',
            connectors: 2,
            connectorTypes: ['CCS2', 'GB/T'],
            bookings: 'Available',
            currentState: 'Faulty',
            lastUpdate: '2023-05-18 11:20'
        },
        {
            id: 'CHG-005',
            connectedOn: '2023-04-01',
            type: 'AC',
            power: '11 kW',
            connectors: 1,
            connectorTypes: ['Type 2'],
            bookings: 'Not Available',
            currentState: 'Removed',
            lastUpdate: '2023-05-15 16:10'
        }
    ];

    // Sessions Data
    const sessionsData = [
        {
            id: 'SES-001',
            userId: 'EVU-1001',
            date: '2023-05-20',
            start: '08:30',
            end: '09:15',
            duration: '45 min',
            chargerId: 'CHG-001',
            connectorType: 'CCS2',
            chargerType: 'DC',
            vehicle: 'Tesla Model 3',
            energyDelivered: '32 kWh',
            energyCost: 'LKR 1,250',
            category: 'Reservation',
            penalties: 'LKR 0',
            totalFee: 'LKR 1,250',
            paymentStatus: 'Paid',
            rating: 4,
            complaints: '',
            resolveStatus: '',
            refunds: 'LKR 0'
        },
        {
            id: 'SES-002',
            userId: 'EVU-1002',
            date: '2023-05-20',
            start: '10:15',
            end: '11:30',
            duration: '1h 15min',
            chargerId: 'CHG-002',
            connectorType: 'CCS2',
            chargerType: 'DC',
            vehicle: 'BYD Atto 3',
            energyDelivered: '48 kWh',
            energyCost: 'LKR 1,890',
            category: 'Walk-in',
            penalties: 'LKR 0',
            totalFee: 'LKR 1,890',
            paymentStatus: 'Paid',
            rating: 5,
            complaints: '',
            resolveStatus: '',
            refunds: 'LKR 0'
        },
        {
            id: 'SES-003',
            userId: 'EVU-1003',
            date: '2023-05-19',
            start: '14:00',
            end: '15:45',
            duration: '1h 45min',
            chargerId: 'CHG-003',
            connectorType: 'Type 2',
            chargerType: 'AC',
            vehicle: 'MG ZS EV',
            energyDelivered: '28 kWh',
            energyCost: 'LKR 1,100',
            category: 'Reservation - Late Arrival',
            penalties: 'LKR 200',
            totalFee: 'LKR 1,300',
            paymentStatus: 'Paid',
            rating: 3,
            complaints: 'Charger slow',
            resolveStatus: 'Pending',
            refunds: 'LKR 0'
        },
        {
            id: 'SES-004',
            userId: 'EVU-1004',
            date: '2023-05-18',
            start: '17:30',
            end: '18:15',
            duration: '45 min',
            chargerId: 'CHG-001',
            connectorType: 'CHAdeMO',
            chargerType: 'DC',
            vehicle: 'Nissan Leaf',
            energyDelivered: '25 kWh',
            energyCost: 'LKR 980',
            category: 'Reservation',
            penalties: 'LKR 0',
            totalFee: 'LKR 980',
            paymentStatus: 'Pending',
            rating: 0,
            complaints: '',
            resolveStatus: '',
            refunds: 'LKR 0'
        },
        {
            id: 'SES-005',
            userId: 'EVU-1005',
            date: '2023-05-17',
            start: '09:45',
            end: '11:00',
            duration: '1h 15min',
            chargerId: 'CHG-004',
            connectorType: 'GB/T',
            chargerType: 'DC',
            vehicle: 'BYD Han',
            energyDelivered: '42 kWh',
            energyCost: 'LKR 1,650',
            category: 'Walk-in',
            penalties: 'LKR 0',
            totalFee: 'LKR 1,650',
            paymentStatus: 'Refunded',
            rating: 2,
            complaints: 'Charger stopped working',
            resolveStatus: 'Resolved',
            refunds: 'LKR 1,650'
        }
    ];


    // Status color configuration
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
            bg: `${COLORS.danger}20`,
            text: COLORS.danger
        },
        'In Use': {
            bg: `${COLORS.primary}20`,
            text: COLORS.primary
        },
        'Free': {
            bg: `${COLORS.success}20`,
            text: COLORS.success
        },
        'Faulty': {
            bg: `${COLORS.danger}20`,
            text: COLORS.danger
        },
        'Removed': {
            bg: `${COLORS.secondaryText}20`,
            text: COLORS.danger
        },
        'Paid': {
            bg: `${COLORS.success}20`,
            text: COLORS.success
        },
        'Pending': {
            bg: `${COLORS.HighlightText}20`,
            text: COLORS.HighlightText
        },
        'Refunded': {
            bg: `${COLORS.info}20`,
            text: COLORS.info
        },
        'Resolved': {
            bg: `${COLORS.success}20`,
            text: COLORS.success
        }
    };

    // Profile Tab Content
    const ProfileTab = () => {
        const currentStatus = station.status || 'Active';
        const statusStyle = statusColors[currentStatus] || statusColors['Active'];

        return (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Left side - Profile info */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Station Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                        style={{ borderColor: COLORS.stroke }}>
                        <div>
                            <h1 className="text-xl font-bold" style={{ color: COLORS.mainTextColor }}>
                                {station.name}
                            </h1>
                            <p className="text-sm mt-1" style={{ color: COLORS.secondaryText }}>
                                {station.address}
                            </p>
                            {renderStars()}
                        </div>
                        <div className="sm:self-start">
                            <span className="px-3 py-1 rounded-full text-sm inline-block" style={{
                                backgroundColor: statusStyle.bg,
                                color: statusStyle.text
                            }}>
                                {currentStatus}
                            </span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <OverviewCard padding="p-4">
                            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                                <img
                                    src={MapImage}
                                    alt="Charging Stations Map"
                                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                                />
                            </div>
                        </OverviewCard>
                    </div>

                    {/* Operator Info */}
                    <div>
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            <StatCard
                                title="Total Earnings"
                                value={station.totalEarnings}
                                subValue={`${station.earningsChange} vs last month`}
                                icon="revenue"
                                status={station.earningsChange.startsWith('+') ? 'positive' : 'negative'}
                            />
                            <StatCard
                                title="Total Electricity"
                                value={station.totalElectricity}
                                subValue={`${station.electricityChange} vs last month`}
                                icon="electricity"
                                status={station.electricityChange.startsWith('+') ? 'positive' : 'negative'}
                            />
                            <StatCard
                                title="Sessions"
                                value={station.sessions}
                                subValue={`${station.sessionsChange} vs last month`}
                                icon="sessions"
                                status={station.sessionsChange.startsWith('+') ? 'positive' : 'negative'}
                            />

                            <StatCard
                                title="Connectors"
                                value={station.noOfConnectors}
                                subValue="All Active"
                                icon="connectors"
                            />

                            <StatCard
                                title="Reports"
                                value={station.noOfReports}
                                subValue="0 Active"
                                icon="reports"
                            />

                            <ApprovalCard
                                title="View Status Summary"
                                bgColor={COLORS.primary}
                                textColor={COLORS.background}
                            />
                        </div>
                    </div>
                </div>

                {/* Right side panel - Only for profile tab */}
                <div className="lg:col-span-1 space-y-4">
                    <ViewStationRightPanel
                        station={station}
                    />
                </div>
            </div>
        );
    };


    const ChargersTab = () => {
        const columns = [
            'Charger ID',
            'Connected On',
            'Charger Type',
            'Power Output',
            'No of Connectors',
            'Supported Connectors',
            'Bookings',
            'Current Status',
            'Last Status Update',
            'Actions'
        ];

        const processedChargersData = chargersData.map(charger => ({
            'Charger ID': charger.id,
            'Connected On': charger.connectedOn,
            'Charger Type': charger.type,
            'Power Output': charger.power,
            'No of Connectors': charger.connectors,
            'Supported Connectors': charger.connectorTypes.join(', '),
            'Bookings': charger.bookings,
            'Current Status': charger.currentState,
            'Last Status Update': charger.lastUpdate,
            'Actions': 'View History'
        }));

        return (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Left Side - 3/4 width */}
                <div className="lg:col-span-4">
                    <div className="mb-6">
                        <DataTableTopBar
                            search={search}
                            setSearch={setSearch}
                            filter={filter}
                            setFilter={setFilter}
                            sort={sort}
                            setSort={setSort}
                            filterOptions={[
                                { value: 'Charger Type', label: 'DC' },
                                { value: 'Charger Type', label: 'AC' },
                                { value: 'Current Status', label: 'Active' },
                                { value: 'Current Status', label: 'Faulty' }
                            ]}
                            sortOptions={columns.map(col => ({ value: col, label: col }))}
                            searchPlaceholder="Search chargers..."
                            
                        />
                    </div>
                    <OverviewCard padding='p-0 w-full'>
                        {/* Table container with constrained width */}
                        <div className="w-full overflow-hidden">
                            <div className="bg-white rounded-lg shadow-sm w-full"
                                style={{
                                    width: '100%',
                                    maxWidth: '100%',
                                    tableLayout: 'fixed'
                                }}>
                                <DataTable
                                    columns={columns}
                                    data={processedChargersData}
                                    filter={filter}
                                    sort={sort}
                                    search={search}
                                    onRowClick={(charger) => navigate(`/admin/stations/chargerprofile/${charger.id}`)}
                                    style={{ width: '100%' }}
                                />
                            </div>
                        </div>
                    </OverviewCard>
                </div>


            </div>
        );
    };
    const SessionsTab = () => {
        const columns = [
            'Session ID',
            'EV User ID',
            'Date',
            'Start',
            'End',
            'Duration',
            'Charger ID',
            'Connector Type',
            'Charger Type',
            'Vehicle',
            'Energy Delivered',
            'Energy Cost',
            'Category',
            'Penalties',
            'Total Fee',
            'Payment Status',
            'Rating',
            'Complaints',
            'Resolve Status',
            'Refunds',
            'Actions'
        ];

        const processedSessionsData = sessionsData.map(session => ({
            'Session ID': session.id,
            'EV User ID': session.userId,
            'Date': session.date,
            'Start': session.start,
            'End': session.end,
            'Duration': session.duration,
            'Charger ID': session.chargerId,
            'Connector Type': session.connectorType,
            'Charger Type': session.chargerType,
            'Vehicle': session.vehicle,
            'Energy Delivered': session.energyDelivered,
            'Energy Cost': session.energyCost,
            'Category': session.category,
            'Penalties': session.penalties,
            'Total Fee': session.totalFee,
            'Payment Status': session.paymentStatus,
            'Rating': session.rating,
            'Complaints': session.complaints,
            'Resolve Status': session.resolveStatus,
            'Refunds': session.refunds,
            'Actions': 'View Receipt'
        }));

        return (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Left Side - 3/4 width */}
                <div className="lg:col-span-4">
                    <div className="mb-6">
                        <DataTableTopBar
                            search={search}
                            setSearch={setSearch}
                            filter={filter}
                            setFilter={setFilter}
                            sort={sort}
                            setSort={setSort}
                            filterOptions={[
                                { value: 'Status', label: 'Reservation' },
                                { value: 'Status', label: 'Walk-in' },
                                { value: 'Payment Status', label: 'Paid' },
                                { value: 'Payment Status', label: 'Pending' },
                                { value: 'Charger Type', label: 'DC' },
                                { value: 'Charger Type', label: 'AC' }
                            ]}
                            sortOptions={columns.map(col => ({ value: col, label: col }))}
                            searchPlaceholder="Search sessions..."
                        />
                    </div>
                    <OverviewCard padding='p-0'>
                        {/* Sessions Table */}
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <DataTable
                                columns={columns}
                                data={processedSessionsData}
                                filter={filter}
                                sort={sort}
                                search={search}
                                onRowClick={(row) => console.log('Session clicked:', row)}
                            />
                        </div>
                    </OverviewCard>
                </div>


            </div>


        );
    };

    const TransactionsTab = () => {
        const columns = ['TransactionID', 'Date & Time', 'Charger', 'Connector', 'SessionID', 'BookingID', 'Transaction Type', 'Amount(LKR)', 'Commission(LKR)', 'Owner Revenue(LKR)', 'Payment Status', 'Quick Actions'];

        const transactionsData = [
            {
                TransactionID: 'TRN001',
                'Date & Time': '2025-07-15 10:35 AM',
                Charger: 'StationA-Charger01',
                Connector: 'Type 2 AC',
                SessionID: 'S001',
                BookingID: 'BKG12345',
                'Transaction Type': 'Charging Payment',
                'Amount(LKR)': 775.00,
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
                'Amount(LKR)': 1100.00,
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
                'Amount(LKR)': 1750.00,
                'Commission(LKR)': 175.00,
                'Owner Revenue(LKR)': 1575.00,
                'Payment Status': 'Pending',
                'Quick Actions': ['View Receipt']
            },
            {
                TransactionID: 'TRN004',
                'Date & Time': '2025-07-16 03:00 PM',
                Charger: 'StationB-Charger03',
                Connector: 'CHAdeMO DC',
                SessionID: 'S003',
                BookingID: 'BKG12346',
                'Transaction Type': 'Charging Payment',
                'Amount(LKR)': 2000.00,
                'Commission(LKR)': 200.00,
                'Owner Revenue(LKR)': 1800.00,
                'Payment Status': 'Completed',
                'Quick Actions': ['View Receipt']
            },
            {
                TransactionID: 'TRN005',
                'Date & Time': '2025-07-17 09:35 AM',
                Charger: 'StationB-Charger03',
                Connector: 'CHAdeMO DC',
                SessionID: '',
                BookingID: 'BKG12348',
                'Transaction Type': 'Late Cancellation',
                'Amount(LKR)': 1900.00,
                'Commission(LKR)': 200.00,
                'Owner Revenue(LKR)': 1700.00,
                'Payment Status': 'Completed',
                'Quick Actions': ['View Receipt']
            }
        ];

        return (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Left Side - 3/4 width */}
                <div className="lg:col-span-4">
                    <div className="mb-6">
                        <DataTableTopBar
                            search={search}
                            setSearch={setSearch}
                            filter={filter}
                            setFilter={setFilter}
                            sort={sort}
                            setSort={setSort}
                            filterOptions={[
                                { value: 'Status', label: 'Reservation' },
                                { value: 'Status', label: 'Walk-in' },
                                { value: 'Payment Status', label: 'Paid' },
                                { value: 'Payment Status', label: 'Pending' },
                                { value: 'Charger Type', label: 'DC' },
                                { value: 'Charger Type', label: 'AC' }
                            ]}
                            sortOptions={columns.map(col => ({ value: col, label: col }))}
                            searchPlaceholder="Search transactions..."
                        />
                    </div>
                    <OverviewCard padding='p-0'>
                        {/* Sessions Table */}
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <DataTable
                                columns={columns}
                                data={transactionsData}
                                filter={filter}
                                sort={sort}
                                search={search}
                                onRowClick={(row) => console.log('Session clicked:', row)}
                            />
                        </div>
                    </OverviewCard>
                </div>


            </div>


        );
    };

    const FaultsTab = () => {
        const columns = ['FaultID', 'Date & Time Reported', 'Fault Type', 'Category', 'Description', 'Associated Charger', 'Connector', 'Status', 'Last Update On', 'Any actions took to resolve']

        const faultsData = [
            {
                FaultID: 'FLT001',
                'Date & Time Reported': '2025-07-15 09:15 AM',
                'Fault Type': 'Charger',
                Category: 'Charger not working',
                Description: 'Charger 01 at Station A is completely unresponsive. No power light.',
                'Associated Charger': 'Charger01',
                Connector: 'All', // Or a specific connector if only one is affected
                Status: 'In Progress',
                'Last Update On': '2025-07-15 10:00 AM',
                'Any actions took to resolve': 'Remote diagnostics initiated. Technician scheduled for 2025-07-15 PM.',
            
            },
            {
                FaultID: 'FLT002',
                'Date & Time Reported': '2025-07-14 03:00 PM',
                'Fault Type': 'Station',
                Category: 'Power Outage',
                Description: 'Entire Station B is offline due to a local power outage.',
                'Associated Charger': 'N/A', // Applies to the whole station
                Connector: 'N/A',
                Status: 'Resolved',
                'Last Update On': '2025-07-14 06:30 PM',
                'Any actions took to resolve': 'Ceylon Electricity Board contacted. Power restored at 6:15 PM.',
              
            },
            {
                FaultID: 'FLT003',
                'Date & Time Reported': '2025-07-16 07:45 AM',
                'Fault Type': 'Charger',
                Category: 'Connector broken',
                Description: 'CCS2 connector on Charger 02 at Station C is physically damaged. Plastic housing cracked.',
                'Associated Charger': 'Charger02',
                Connector: 'CCS2 DC',
                Status: 'New',
                'Last Update On': '2025-07-16 08:00 AM',
                'Any actions took to resolve': 'Connector taken out of service. Replacement part ordered.',
               
            },
            {
                FaultID: 'FLT004',
                'Date & Time Reported': '2025-07-13 11:00 AM',
                'Fault Type': 'Booking',
                Category: 'Occupied by other vehicle',
                Description: 'Customer reported booked slot at Station A was occupied by another vehicle when arrived.',
                'Associated Charger': 'Charger03',
                Connector: 'Type 2 AC',
                Status: 'Resolved',
                'Last Update On': '2025-07-13 01:30 PM',
                'Any actions took to resolve': 'Contacted customer, verified issue, issued full refund for the booking. Reminder sent to station staff regarding parking rules.',
           
            },
            {
                FaultID: 'FLT005',
                'Date & Time Reported': '2025-07-16 01:00 PM',
                'Fault Type': 'Charger',
                Category: 'Charging speed inconsistent',
                Description: 'Customer reported fluctuating charging speed on Charger 04 at Station D.',
                'Associated Charger': 'Charger04',
                Connector: 'Type 2 AC',
                Status: 'In Progress',
                'Last Update On': '2025-07-16 02:00 PM',
                'Any actions took to resolve': 'Monitoring charger performance remotely. Logs being reviewed for anomalies.',
       
            }
        ];

        return (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Left Side - 3/4 width */}
                <div className="lg:col-span-4">
                    <div className="mb-6">
                        <DataTableTopBar
                            search={search}
                            setSearch={setSearch}
                            filter={filter}
                            setFilter={setFilter}
                            sort={sort}
                            setSort={setSort}
                            filterOptions={[
                                { value: 'Status', label: 'Reservation' },
                                { value: 'Status', label: 'Walk-in' },
                                { value: 'Payment Status', label: 'Paid' },
                                { value: 'Payment Status', label: 'Pending' },
                                { value: 'Charger Type', label: 'DC' },
                                { value: 'Charger Type', label: 'AC' }
                            ]}
                            sortOptions={columns.map(col => ({ value: col, label: col }))}
                            searchPlaceholder="Search transactions..."
                        />
                    </div>
                    <OverviewCard padding='p-0'>
                        {/* Sessions Table */}
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <DataTable
                                columns={columns}
                                data={faultsData}
                                filter={filter}
                                sort={sort}
                                search={search}
                                onRowClick={(row) => console.log('Session clicked:', row)}
                            />
                        </div>
                    </OverviewCard>
                </div>


            </div>


        );
    };

    return (
        <div style={{
            fontFamily: FONTS.family.sans,
            padding: '24px',
            backgroundColor: COLORS.background,
        }}>
            <AdminPageHeader title={`${station.name}`} />

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
                {activeTab === 'chargers' && <ChargersTab />}
                {activeTab === 'sessions' && <SessionsTab />}
                {activeTab === 'transactions' && <TransactionsTab /> }
                {activeTab === 'faults' && <FaultsTab /> }
            </div>
        </div>
    );
};

export default ViewStation;