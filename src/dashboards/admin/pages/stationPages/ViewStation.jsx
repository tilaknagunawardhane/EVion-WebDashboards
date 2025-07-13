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
import AdminPageHeader from '../../components/AdminPageHeader';

const ViewStation = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState(null);
    const [sort, setSort] = useState(null);
    const [rating] = useState(3.0); // Sample rating

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

    // Sample data for tables
    const chargersData = [
        { id: 1, name: 'HyperCharge Dual-Port', type: 'DC Fast Charger', status: 'Active', power: '150 kW' },
        { id: 2, name: 'FastCharge DC', type: 'DC Fast Charger', status: 'Active', power: '60 kW' }
    ];

    const sessionsData = [
        { id: 1, user: 'John Doe', duration: '45 min', energy: '32 kWh', cost: 'LKR 1,250', date: '2023-05-15' },
        { id: 2, user: 'Jane Smith', duration: '1h 15min', energy: '48 kWh', cost: 'LKR 1,890', date: '2023-05-14' }
    ];

    // Table columns configuration
    const chargersColumns = ['ID', 'Name', 'Type', 'Status', 'Power'];
    const sessionsColumns = ['ID', 'User', 'Duration', 'Energy', 'Cost', 'Date'];

    // Profile Tab Content
    const ProfileTab = () => {
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
            }
        };

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
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

    // Table Tab Content
    const TableTab = ({ title, columns, data }) => (
        <div className="bg-white rounded-lg shadow-sm p-6">
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
                {activeTab === 'chargers' && (
                    <TableTab
                        title="Chargers"
                        columns={chargersColumns}
                        data={chargersData}
                    />
                )}
                {activeTab === 'sessions' && (
                    <TableTab
                        title="Charging Sessions"
                        columns={sessionsColumns}
                        data={sessionsData}
                    />
                )}
                {activeTab === 'transactions' && (
                    <TableTab
                        title="Transactions"
                        columns={['ID', 'Amount', 'Type', 'Date', 'Status']}
                        data={[]}
                    />
                )}
                {activeTab === 'faults' && (
                    <TableTab
                        title="Faults & Complaints"
                        columns={['ID', 'Type', 'Reported', 'Status', 'Actions']}
                        data={[]}
                    />
                )}
            </div>
        </div>
    );
};

export default ViewStation;