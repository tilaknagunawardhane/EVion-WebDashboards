import React, { useState } from 'react';
import { COLORS, FONTS } from '../../../../constants';
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


const stationImages = [
    '../../../../assets/map-placeholder.png',
    '../../../../assets/Logo 2.png',
    '../../../../assets/Evion logo.png',
    '../../../../assets/Logo4.png',
    '../../../../assets/station_img.png',
];

const OwnerViewStation = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState(null);
    const [sort, setSort] = useState(null);
    const [rating] = useState(4.5); // Sample rating
    const [showAll, setShowAll] = useState(false);

    const initialDisplayCount = 4;
    const imagesToDisplay = showAll ? stationImages : stationImages.slice(0, initialDisplayCount);


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
        // sessions: "147",
        // sessionsChange: "+3.87%",
        reports: "12",
        status: "Active",
        noOfConnectors: "7",
        noOfReports: "17",
        electricityProvider: "LECO",
        powerTypes: [ 'AC', 'DC' ],
        powerSource: "Solar", 
    };


    // Tab configuration
    const tabs = [
        { id: 'profile', label: 'Profile' },
        { id: 'chargers', label: 'Chargers' },
        { id: 'stats', label: 'Stats'}
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

    // Sample data for tables
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
            'Quick Actions': ['View', 'Disable', 'Delete']  
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
            'Charger Status': 'disabled', 
            'Quick Actions': ['View', 'Disable', 'Delete']   
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
            'Quick Actions': ['View', 'Disable', 'Delete']   
        }
    ];

    // const sessionsData = [
    //     { id: 1, user: 'John Doe', duration: '45 min', energy: '32 kWh', cost: 'LKR 1,250', date: '2023-05-15' },
    //     { id: 2, user: 'Jane Smith', duration: '1h 15min', energy: '48 kWh', cost: 'LKR 1,890', date: '2023-05-14' }
    // ];

    // Table columns configuration
    const chargersColumns = ['chargerID', 'Charger Name', 'Joined On', 'Power Type', 'Maximum Power Output(kW)', 'Connectors', 'Unit Price(per kW)', 'Total Sessions', 'Revenue', 'No of Active Reports', 'Charger Status', 'Quick Actions'];
    // const sessionsColumns = ['ID', 'User', 'Duration', 'Energy', 'Cost', 'Date'];

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

        const currentStatus = station.status || 'Active';
        const statusStyle = statusColors[currentStatus] || statusColors['Active'];

        return (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Left side - Profile info */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                        style={{ borderColor: COLORS.stroke }}>
                        <div>
                            <h1 className="text-xl font-medium" style={{ color: COLORS.mainTextColor }}>
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
                        <div className="flex flex-wrap gap-4 text-sm">
                            <div>
                                <strong
                                style={{ fontWeight: FONTS.weights.normal, color: COLORS.secondaryText, fontSize: FONTS.sizes.sm }}
                                >
                                Power Types:
                                </strong>{' '}
                                {station.powerTypes.join(', ')}
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-between gap-4 text-sm mt-2">
                            <div>
                                <strong
                                style={{ fontWeight: FONTS.weights.normal, color: COLORS.secondaryText, fontSize: FONTS.sizes.sm }}
                                >
                                Electricity Provider:
                                </strong>{' '}
                                {station.electricityProvider}
                            </div>
                            <div>
                                <strong
                                style={{ fontWeight: FONTS.weights.normal, color: COLORS.secondaryText, fontSize: FONTS.sizes.sm }}
                                >
                                Power Source:
                                </strong>{' '}
                                {station.powerSource}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <p className="underline" style={{ color: COLORS.secondaryText, fontSize: FONTS.sizes.sm }}>Update Station Details</p>
                    </div>

                    <div className="flex-col gap-4 mt-8 bg-transparent p-0 rounded-xl">
                            <h3 className="mb-4" style={{ fontSize: FONTS.sizes.base, fontWeight: FONTS.weights.normal, color: COLORS.mainTextColor }}>Station Gallery</h3>
      
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {imagesToDisplay.map((src, idx) => (
                                <img
                                    key={idx}
                                    src={src}
                                    alt={`station ${idx}`}
                                    className="w-full h-32 object-cover rounded-lg shadow"
                                />
                                ))}
                            </div>

                            {stationImages.length > initialDisplayCount && (
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

    // Table Tab Content
    const TableTab = ({ title, columns, data }) => (
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
                onRowClick={(row) => console.log('Row clicked:', row)}
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
                {activeTab === 'profile' && <ProfileTab />}
                {activeTab === 'chargers' && (
                    <TableTab
                        title="Chargers"
                        columns={chargersColumns}
                        data={chargersData}
                    />
                )}
                {/* {activeTab === 'sessions' && (
                    <TableTab
                        title="Charging Sessions"
                        columns={sessionsColumns}
                        data={sessionsData}
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