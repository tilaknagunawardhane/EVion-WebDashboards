import React, { useState } from 'react';
import { COLORS, FONTS } from '../../../../constants';
import TabBar from '../../../../components/ui/TabBar';
import DataTableTopBar from '../../../../components/ui/DataTableTopBar';
import DataTable from '../../../../components/ui/DataTable';
import AdminPageHeader from '../../components/AdminPageHeader';
import { FiMoreVertical } from 'react-icons/fi';

const AdminViewCharger = () => {
    const [activeTab, setActiveTab] = useState('sessions');
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState(null);
    const [sort, setSort] = useState(null);

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

    // Tab configuration
    const tabs = [
        { id: 'sessions', label: 'Sessions' },
        { id: 'bookings', label: 'Bookings'},
        { id: 'transactions', label: 'Transactions Related to Charger'},
        { id: 'faults', label: 'Faults'},
    ];

    // Mobile labels for tabs
    const mobileLabels = {
        sessions: 'Sessions',
        bookings: 'Bookings',
        transactions: 'Transactions Related to Charger',
        faults: 'Faults',
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

    const transactionsData = [
        {
            TransactionID: 'TRN001',
            SessionID: 'S001',
            BookingID: 'BKG12345',
            'Date & Time': '2025-07-10 10:35 AM',
            Connector: 'Type 2',
            'Transaction Type': 'Charging Payment',
            'Amount (LKR)': 775.00,
            'Commission(LKR)': 75.00,
            'Owner Revenue(LKR)': 700.00,
            'Payment Status': 'Completed',
            'Quick Actions': ['View Receipt'],
        },
        {
            TransactionID: 'TRN002',
            SessionID: 'S002',
            BookingID: 'Walk-in', // No booking ID for walk-in
            'Date & Time': '2025-07-10 11:50 AM',
            Connector: 'CCS2',
            'Transaction Type': 'Charging Payment',
            'Amount (LKR)': 1100.00,
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
            'Amount (LKR)': 1750.00,
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
            Connector: 'N/A', // Penalty doesn't directly use a connector
            'Transaction Type': 'Late Cancellation Fee',
            'Amount (LKR)': 200.00,
            'Commission(LKR)': null,
            'Owner Revenue(LKR)': null,
            'Payment Status': 'Pending',
            'Quick Actions': ['View Receipt'],
        },
        {
            TransactionID: 'TRN005',
            SessionID: 'N/A', // Cancellation doesn't have an active session
            BookingID: 'BKG12348',
            'Date & Time': '2025-07-12 09:35 AM',
            Connector: 'N/A',
            'Transaction Type': 'Charging Payment',
            'Amount (LKR)': 1900.00,
            'Commission(LKR)': 300.00,
            'Owner Revenue(LKR)': 1600.00,
            'Payment Status': 'Completed',
            'Quick Actions': ['View Receipt'],
        }
    ];

    const faultsData = [
        {
            FaultID: 'FLT001',
            'Date & Time Reported': '2025-07-15 09:15 AM',
            'Fault Type': 'Charger',
            Category: 'Charger not working',
            Description: 'Charger 01 at Station A is completely unresponsive. No power light.',
            Connector: 'All',
            Status: 'Investigating',
            'Last Update On': '2025-07-15 10:00 AM',
            'Any actions took to resolve': 'Remote diagnostics initiated. Technician scheduled for 2025-07-15 PM.',
            'Quick Actions': ['Contact Support Officer']
        },
        {
            FaultID: 'FLT003',
            'Date & Time Reported': '2025-07-16 07:45 AM',
            'Fault Type': 'Charger',
            Category: 'Connector broken',
            Description: 'CCS2 connector on Charger 02 at Station C is physically damaged. Plastic housing cracked.',
            Connector: 'CCS2 DC',
            Status: 'Open',
            'Last Update On': '2025-07-16 08:00 AM',
            'Any actions took to resolve': 'Connector taken out of service. Replacement part ordered.',
            'Quick Actions': ['Contact Support Officer']
        },
        {
            FaultID: 'FLT004',
            'Date & Time Reported': '2025-07-13 11:00 AM',
            'Fault Type': 'Booking',
            Category: 'Occupied by other vehicle',
            Description: 'Customer reported booked slot at Station A was occupied by another vehicle when arrived.',
            Connector: 'Type 2 AC',
            Status: 'Closed',
            'Last Update On': '2025-07-13 01:30 PM',
            'Any actions took to resolve': 'Contacted customer, verified issue, issued full refund for the booking. Reminder sent to station staff regarding parking rules.',
            'Quick Actions': ['Contact Support Officer']
        },
    ];

    const sessionsColumns = ['SessionID', 'Date', 'Connector Used', 'Vehicle', 'Started At', 'Ended At', 'Duration', 'Total Energy Delivered(kWh)', 'BookingID/Walk-in', 'Charging Cost(LKR)', 'Penalties Received', 'Total Payment', 'Payment Status', 'Ratings Given', 'Issue Reported?', 'Any actions taken to resolve', 'Quick Actions'];
    const bookingsColumns = ['BookingID', 'SessionID', 'Booking Date', 'Connector', 'Vehicle', 'Slot Start Time', 'Slot End Time', 'Booking Status', 'Cancellation Time', 'Reason', 'Estimated Energy (kWh)', 'Estimated Charging Cost (LKR)', 'Penalties Charged', 'Payment Status', 'Reported Issue?', 'Any actions taken to resolve' ];
    const transactionsColumns = ['TransactionID', 'SessionID', 'BookingID', 'Date & Time', 'Connector', 'Transaction Type', 'Amount (LKR)', 'Commission(LKR)', 'Owner Revenue(LKR)', 'Payment Status', 'Quick Actions']
    const faultsColumns = ['FaultID', 'Date & Time Reported', 'Fault Type', 'Category', 'Description', 'Connector', 'Status', 'Last Update On', 'Any actions took to resolve', 'Quick Actions']

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

            <AdminPageHeader title={`${station.name}-${charger['Charger Name']}`} />


            {/* Tab Navigation */}
            <TabBar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabs={tabs}
                mobileLabels={mobileLabels}
            />

            {/* Tab Content */}
            <div className="mt-6">

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
                {activeTab === 'transactions' && (
                    <TableTab
                        title="Transactions"
                        columns={transactionsColumns}
                        data={transactionsData}
                    />
                )}
                {activeTab === 'faults' && (
                    <TableTab
                        title="Faults & Complaints"
                        columns={faultsColumns}
                        data={faultsData}
                    />
                )}
            </div>
            
        </div>
    );
};

export default AdminViewCharger;