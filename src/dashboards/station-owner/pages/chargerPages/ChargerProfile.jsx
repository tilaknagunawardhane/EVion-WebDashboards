import React, { useState } from 'react';
import { COLORS, FONTS } from '../../../../constants';
import { useNavigate } from 'react-router-dom';
import TabBar from '../../../../components/ui/TabBar';
import DataTableTopBar from '../../../../components/ui/DataTableTopBar';
import DataTable from '../../../../components/ui/DataTable';
import StarIcon from '../../../../assets/star-filled.svg';
import StarOutlineIcon from '../../../../assets/star-outline.svg';
import StationOwnerPageHeader from '../../components/StationOwnerPageHeader';
import ChargerBookingViews from '../../components/chargerComponents/ChargerBookingsViewCard'

const OwnerViewStation = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState(null);
    const [sort, setSort] = useState(null);
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
        electricityProvider: "LECO",
        powerTypes: [ 'AC', 'DC' ],
        powerSource: "Solar", 
    };

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
        { id: 1, user: 'John Doe', duration: '45 min', energy: '32 kWh', cost: 'LKR 1,250', date: '2023-05-15' },
        { id: 2, user: 'Jane Smith', duration: '1h 15min', energy: '48 kWh', cost: 'LKR 1,890', date: '2023-05-14' }
    ];

    const sessionsColumns = ['ID', 'User', 'Duration', 'Energy', 'Cost', 'Date'];

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
                    <div className="space-y-4 bg-white rounded-xl px-8 py-4 ">

                        <ChargerBookingViews
                            connectorName="CCS2"
                            session={null}
                            bookings={[
                                { startTime: "14:00", endTime: "14:30" },
                                { startTime: "15:30", endTime: "16:30" }
                            ]}
                            timeSlots={[
                                "00:00 AM - 00:30 AM", "00:30 AM - 01:00 AM",
                                "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00",
                                "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
                            ]}
                        />

                    </div>

                    <div className="space-y-4 bg-white rounded-xl p-8">
                        <ChargerBookingViews
                            connectorName="CCS2"
                            session={{
                                vehicle: "Nissan Leaf",
                                startDate: "2025-07-13", 
                                startTime: "11:00",
                                endTime: "13:30",
                                energy: 12.3,
                                cost: 450,
                                progress: 62,
                            }}
                            bookings={[
                                { startTime: "14:00", endTime: "14:30" },
                                { startTime: "15:30", endTime: "16:30" }
                            ]}
                            timeSlots={[
                                "00:00 AM - 00:30 AM", "00:30 AM - 01:00 AM",
                                "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00",
                                "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
                            ]}
                        />
                    </div>
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

            <StationOwnerPageHeader title={`${station.name}`} />


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
                {/* {activeTab === 'bookings' && (
                    <TableTab
                        title="Booking Sessions"
                        columns={bookingsColumns}
                        data={bookingsData}
                        onRowClick={(session) => console.log(session.id)}
                    />
                )} */}
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