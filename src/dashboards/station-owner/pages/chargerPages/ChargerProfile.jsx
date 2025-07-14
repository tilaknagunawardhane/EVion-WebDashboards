import React, { useState } from 'react';
import { COLORS, FONTS } from '../../../../constants';
// import { useNavigate } from 'react-router-dom';
import TabBar from '../../../../components/ui/TabBar';
import DataTableTopBar from '../../../../components/ui/DataTableTopBar';
import DataTable from '../../../../components/ui/DataTable';
import StarIcon from '../../../../assets/star-filled.svg';
import StarOutlineIcon from '../../../../assets/star-outline.svg';
import StationOwnerPageHeader from '../../components/StationOwnerPageHeader';
import ConnectorView from '../../components/chargerComponents/ConnectorCard'

const OwnerViewStation = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState(null);
    const [sort, setSort] = useState(null);
    // const navigate = useNavigate();

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
        electricityProvider: "LECO",
        powerTypes: [ 'AC', 'DC' ],
        powerSource: "Solar", 
    };

    // Sample charger data
    const charger = { 
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
        'Quick Actions': ['View', 'Disable', 'Delete']  
    };

    // Sample connector data
    const connectorsData = [
        {
            connectorName:"CCS1",
            session:null,
            bookings: [
            { dateOffset: 0, startTime: "00:00", endTime: "01:30" },
            { dateOffset: 0, startTime: "04:30", endTime: "05:00" },
            { dateOffset: 0, startTime: "09:00", endTime: "11:30" },
            { dateOffset: 0, startTime: "13:00", endTime: "13:30" },
            { dateOffset: 0, startTime: "14:00", endTime: "14:30" },
            { dateOffset: 0, startTime: "15:30", endTime: "17:00" },

            { dateOffset: 1, startTime: "03:00", endTime: "04:30" },
            { dateOffset: 1, startTime: "08:00", endTime: "09:30" },
            { dateOffset: 1, startTime: "14:00", endTime: "14:30" },
            { dateOffset: 1, startTime: "19:30", endTime: "20:00" },

            { dateOffset: 2, startTime: "15:00", endTime: "15:30" },
            ],   
        },
        {
            connectorName: "CHAdeMO",
            session: {
                vehicle: "Nissan Leaf",
                startDate: "2025-07-14",
                startTime: "11:00",
                endTime: "11:30",
                energy: 12.3,
                cost: 450,
                progress: 62,
            },
            bookings: [
            { dateOffset: 0, startTime: "00:00", endTime: "01:30" },
            { dateOffset: 0, startTime: "04:30", endTime: "05:00" },
            { dateOffset: 0, startTime: "09:00", endTime: "11:30" },
            { dateOffset: 0, startTime: "13:00", endTime: "13:30" },
            { dateOffset: 0, startTime: "14:00", endTime: "14:30" },
            { dateOffset: 0, startTime: "15:30", endTime: "17:00" },

            { dateOffset: 1, startTime: "03:00", endTime: "04:30" },
            { dateOffset: 1, startTime: "08:00", endTime: "09:30" },
            { dateOffset: 1, startTime: "14:00", endTime: "14:30" },
            { dateOffset: 1, startTime: "19:30", endTime: "20:00" },

            { dateOffset: 2, startTime: "15:00", endTime: "15:30" },
            ],  
        }
    ];

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

    // Tab configuration
    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'sessions', label: 'Sessions' },
        { id: 'bookings', label: 'Bookings'},
        { id: 'transactions', label: 'Transactions'},
        { id: 'faults', label: 'Faults'},
        { id: 'stats', label: 'Stats'},
    ];

    // Mobile labels for tabs
    const mobileLabels = {
        overview: 'Overview',
        sessions: 'Sessions',
        bookings: 'Bookings',
        transactions: 'Transactions',
        faults: 'Faults',
        stats: 'Stats',
    };

    const sessionsData = [
    {
        SessionID: 'S001',
        Date: '2025-07-10',
        'Connector Used': 'Type 2',
        Vehicle: 'Tesla Model 3',
        'Started At': '09:00 AM',
        'Ended At': '10:30 AM',
        Duration: '1h 30m',
        'Total Energy Delivered(kWh)': 15.5,
        'BookingID/Walk-in': 'BKG12345',
        'Charging Cost(LKR)': 775.00,
        'Penalties Received': 'None',
        'Total Payment': 775.00,
        'Payment Status': 'Paid',
        'Ratings Given': 5,
        'Issue Reported?': 'No',
        'Any actions taken to resolve': 'N/A',
        'Quick Actions': ['View Receipt']
    },
    {
        SessionID: 'S002',
        Date: '2025-07-10',
        'Connector Used': 'CCS2',
        Vehicle: 'Nissan Leaf',
        'Started At': '11:15 AM',
        'Ended At': '11:45 AM',
        Duration: '30m',
        'Total Energy Delivered(kWh)': 22.0,
        'BookingID/Walk-in': 'Walk-in',
        'Charging Cost(LKR)': 1100.00,
        'Penalties Received': 'None',
        'Total Payment': 1100.00,
        'Payment Status': 'Paid',
        'Ratings Given': 4,
        'Issue Reported?': 'No',
        'Any actions taken to resolve': 'N/A',
        'Quick Actions': ['View Receipt']
    },
    {
        SessionID: 'S003',
        Date: '2025-07-11',
        'Connector Used': 'CHAdeMO',
        Vehicle: 'Hyundai Kona EV',
        'Started At': '02:00 PM',
        'Ended At': '02:50 PM',
        Duration: '50m',
        'Total Energy Delivered(kWh)': 35.0,
        'BookingID/Walk-in': 'BKG12346',
        'Charging Cost(LKR)': 1750.00,
        'Penalties Received': 200.00,
        'Total Payment': 1950.00,
        'Payment Status': 'Pending',
        'Ratings Given': 'N/A',
        'Issue Reported?': 'Yes - Connector Malfunction',
        'Any actions taken to resolve': 'Technician dispatched',
        'Quick Actions': ['View Receipt']
    },
    {
        SessionID: 'S004',
        Date: '2025-07-12',
        'Connector Used': 'Type 2',
        Vehicle: 'MG ZS EV',
        'Started At': '08:30 AM',
        'Ended At': '12:00 PM',
        Duration: '3h 30m',
        'Total Energy Delivered(kWh)': 28.0,
        'BookingID/Walk-in': 'BKG12347',
        'Charging Cost(LKR)': 1400.00,
        'Penalties Received': 'None',
        'Total Payment': 1400.00,
        'Payment Status': 'Paid',
        'Ratings Given': 5,
        'Issue Reported?': 'No',
        'Any actions taken to resolve': 'N/A',
        'Quick Actions': ['View Receipt']
    },
    {
        SessionID: 'S005',
        Date: '2025-07-12',
        'Connector Used': 'CCS2 DC',
        Vehicle: 'Porsche Taycan',
        'Started At': '04:00 PM',
        'Ended At': '04:20 PM',
        Duration: '20m',
        'Total Energy Delivered(kWh)': 40.0,
        'BookingID/Walk-in': 'Walk-in',
        'Charging Cost(LKR)': 2000.00,
        'Penalties Received': 'None',
        'Total Payment': 2000.00,
        'Payment Status': 'Paid',
        'Ratings Given': 'N/A',
        'Issue Reported?': 'No',
        'Any actions taken to resolve': 'N/A',
        'Quick Actions': ['View Receipt']
    }
    ];

    const bookingsData = [
        {
            BookingID: 'BKG12345',
            SessionID: 'S001',
            'Booking Date': '2025-07-09',
            Connector: 'Type 2 AC',
            Vehicle: 'Tesla Model 3',
            'Slot Start Time': '09:00 AM',
            'Slot End Time': '10:30 AM',
            'Booking Status': 'Completed',
            'Cancellation Time': 'N/A',
            Reason: 'N/A',
            'Estimated Energy (kWh)': 15.0,
            'Estimated Charging Cost (LKR)': 750.00,
            'Penalties Charged': 'None',
            'Payment Status': 'Paid',
            'Reported Issue?': 'No',
            'Any actions taken to resolve': 'N/A'
        },
        {
            BookingID: 'BKG12346',
            SessionID: 'S003',
            'Booking Date': '2025-07-10',
            Connector: 'CHAdeMO DC',
            Vehicle: 'Hyundai Kona EV',
            'Slot Start Time': '02:00 PM',
            'Slot End Time': '02:45 PM',
            'Booking Status': 'Completed',
            'Cancellation Time': 'N/A',
            Reason: 'N/A',
            'Estimated Energy (kWh)': 30.0,
            'Estimated Charging Cost (LKR)': 1500.00,
            'Penalties Charged': 'Overstay Fee',
            'Payment Status': 'Pending',
            'Reported Issue?': 'Yes - Connector Malfunction',
            'Any actions taken to resolve': 'Technician dispatched, Customer contacted'
        },
        {
            BookingID: 'BKG12347',
            SessionID: 'S004',
            'Booking Date': '2025-07-11',
            Connector: 'Type 2 AC',
            Vehicle: 'MG ZS EV',
            'Slot Start Time': '08:30 AM',
            'Slot End Time': '12:00 PM',
            'Booking Status': 'Completed',
            'Cancellation Time': 'N/A',
            Reason: 'N/A',
            'Estimated Energy (kWh)': 25.0,
            'Estimated Charging Cost (LKR)': 1250.00,
            'Penalties Charged': 'None',
            'Payment Status': 'Paid',
            'Reported Issue?': 'No',
            'Any actions taken to resolve': 'N/A'
        },
        {
            BookingID: 'BKG12348',
            SessionID: 'N/A', // No associated session, likely cancelled
            'Booking Date': '2025-07-12',
            Connector: 'CCS2 DC',
            Vehicle: 'BMW iX',
            'Slot Start Time': '10:00 AM',
            'Slot End Time': '11:00 AM',
            'Booking Status': 'Cancelled',
            'Cancellation Time': '2025-07-12 09:30 AM',
            Reason: 'Change of plans',
            'Estimated Energy (kWh)': 40.0,
            'Estimated Charging Cost (LKR)': 2000.00,
            'Penalties Charged': 'Cancellation Fee',
            'Payment Status': 'Refunded',
            'Reported Issue?': 'No',
            'Any actions taken to resolve': 'N/A'
        },
        {
            BookingID: 'BKG12349',
            SessionID: 'N/A', // No associated session, future booking
            'Booking Date': '2025-07-14',
            Connector: 'Type 2 AC',
            Vehicle: 'Kia EV6',
            'Slot Start Time': '03:00 PM',
            'Slot End Time': '04:30 PM',
            'Booking Status': 'Confirmed',
            'Cancellation Time': 'N/A',
            Reason: 'N/A',
            'Estimated Energy (kWh)': 20.0,
            'Estimated Charging Cost (LKR)': 1000.00,
            'Penalties Charged': 'None',
            'Payment Status': 'Pending',
            'Reported Issue?': 'No',
            'Any actions taken to resolve': 'N/A'
        }
    ];

    const sessionsColumns = ['SessionID', 'Date', 'Connector Used', 'Vehicle', 'Started At', 'Ended At', 'Duration', 'Total Energy Delivered(kWh)', 'BookingID/Walk-in', 'Charging Cost(LKR)', 'Penalties Received', 'Total Payment', 'Payment Status', 'Ratings Given', 'Issue Reported?', 'Any actions taken to resolve', 'Quick Actions'];
    const bookingsColumns = ['BookingID', 'SessionID', 'Booking Date', 'Connector', 'Vehicle', 'Slot Start Time', 'Slot End Time', 'Booking Status', 'Cancellation Time', 'Reason', 'Estimated Energy (kWh)', 'Estimated Charging Cost (LKR)', 'Penalties Charged', 'Payment Status', 'Reported Issue?', 'Any actions taken to resolve' ];

    // Overview Tab Content
    const OverviewTab = () => {
        // const statusColors = {
        //     'Active': {
        //         bg: `${COLORS.primary}20`,
        //         text: COLORS.primary
        //     },
        //     'Closed': {
        //         bg: `${COLORS.danger}20`,
        //         text: COLORS.danger
        //     },
        //     'Under Maintenance': {
        //         bg: `${COLORS.HighlightText}20`,
        //         text: COLORS.HighlightText
        //     },
        //     'Disabled': {
        //         bg: `${COLORS.danger}20`,
        //         text: COLORS.danger
        //     },
        //     'Deleted': {
        //         bg: `${COLORS.mainTextColor}20`,
        //         text: COLORS.mainTextColor
        //     }
        // };

        // const currentStatus = charger.status || 'Active';
        // const statusStyle = statusColors[currentStatus] || statusColors['Active'];

        return (
            <div className="w-full bg-transparent rounded-xl">

                <div className="flex-col space-y-2 bg-white px-8 py-6 rounded-xl mb-4">  
                    <div className="flex flex-wrap gap-4 text-sm">
                        <div style={{ fontWeight: FONTS.weights.medium, color: COLORS.mainTextColor, fontSize: FONTS.sizes.xl }}>
                            {charger['Charger Name']}
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
                    {connectorsData.map((connector, idx) => (
                        <div key={idx} className="space-y-4 bg-white rounded-xl p-8">
                        <ConnectorView
                            connectorName={connector.connectorName}
                            session={connector.session}
                            bookings={connector.bookings}
                            timeSlots={timeSlots}
                            onEdit={() => console.log('Edit', connector.connectorName)}
                            onDisable={() => console.log('Disable', connector.connectorName)}
                            onRemove={() => console.log('Remove', connector.connectorName)}
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

            <StationOwnerPageHeader title={`${station.name}-${charger['Charger Name']}`} />


            {/* Tab Navigation */}
            <TabBar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabs={tabs}
                mobileLabels={mobileLabels}
            />

            {/* Tab Content */}
            <div className="mt-6">
                {activeTab === 'overview' && <OverviewTab />}

                {activeTab === 'sessions' && (
                    <TableTab
                        title="Sessions"
                        columns={sessionsColumns}
                        data={sessionsData}
                        onRowClick={(session) => console.log(session.id)}
                    />
                )}
                {activeTab === 'bookings' && (
                    <TableTab
                        title="Booking Sessions"
                        columns={bookingsColumns}
                        data={bookingsData}
                        onRowClick={(session) => console.log(session.id)}
                    />
                )}
                {/* {activeTab === 'transactions' && (
                    <TableTab
                        title="Transactions"
                        columns={['ID', 'Amount', 'Type', 'Date', 'Status']}
                        data={[]}
                    />
                )} */}
                {/* {activeTab === 'faults' && (
                    <TableTab
                        title="Faults & Complaints"
                        columns={['ID', 'Type', 'Reported', 'Status', 'Actions']}
                        data={[]}
                    />
                )} */}
            </div>
        </div>
    );
};

export default OwnerViewStation;