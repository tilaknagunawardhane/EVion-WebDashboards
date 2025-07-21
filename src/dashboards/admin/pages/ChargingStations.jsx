import React from 'react';
import ChargingStationsTopBar from '../../../components/ui/DataTableTopBar';
import DataTable from '../../../components/ui/DataTable'; // Changed import
import ChargingStationsRightPanel from '../components/stationComponents/ChargingStationsRightPanel';
import { COLORS, FONTS } from '../../../constants';
import NotificationsIcon from '../../../assets/notifications.svg';
import OverviewCard from '../components/OverviewCard';
import { useNavigate } from 'react-router-dom';
import AdminPageHeader from '../components/AdminPageHeader'


export default function ChargingStations() {
    const navigate = useNavigate();

    const [search, setSearch] = React.useState('');
    const [filter, setFilter] = React.useState({});
    const [sort, setSort] = React.useState('Date Joined');
    const [stations, setStations] = React.useState([]);
    const [requests, setRequests] = React.useState([
        {
            id: 1,
            type: 'station',
            status: 'new',
            title: 'A request to add a new charging station',
            date: '5 Sat, 08:11 AM'
        },
        {
            id: 2,
            type: 'station',
            status: 'new',
            title: 'A request to update charging station info',
            date: '5 Sat, 08:11 AM'
        },
        {
            id: 3,
            type: 'connector',
            status: 'new',
            title: 'A request to add a new connector',
            date: '5 Sat, 08:11 AM'
        },
        {
            id: 4,
            type: 'station',
            status: 'review',
            title: 'Station upgrade request',
            date: '4 Fri, 03:45 PM'
        },
        {
            id: 5,
            type: 'connector',
            status: 'review',
            title: 'Connector replacement',
            date: '3 Thu, 11:20 AM'
        }
    ]);

    const stationFilterOptions = [
        { label: 'District', value: 'district' },
        { label: 'City', value: 'city' },
        { label: 'Status', value: 'status' },
        { label: 'Connector Types', value: 'connectorTypes' },
    ];

    const stationSortOptions = [
        { label: 'Date Joined', value: 'dateJoined' },
        { label: 'Station Name', value: 'stationName' },
        { label: 'Revenue', value: 'revenue' },
        { label: 'Number of Chargers', value: 'noOfChargers' },
    ];

    // Define columns for stations table
    const stationColumns = [
        'Station Name',
        'Owner Name',
        'Joined On',
        'District',
        'City',
        'Address Line',
        'Revenue',
        'Bookings',
        'No of Chargers',
        'Type1',
        'Type2',
        'CCS1',
        'CCS2',
        'CHAdeMO',
        'Tesla',
        'No of Active Reports',
        'Status',
        'Quick Actions'
    ];

    // Sample station data - replace with your actual data
    const stationData = [
        {
            'Station Name': 'EV Central',
            'Owner Name': 'John Doe',
            'Joined On': '2023-01-15',
            'District': 'Central',
            'City': 'Metropolis',
            'Address Line': '123 Main St',
            'Revenue': '$12,000',
            'Bookings': 'Enabled',
            'No of Chargers': 8,
            'Type1': 2,
            'Type2': 3,
            'CCS1': 1,
            'CCS2': 1,
            'CHAdeMO': 1,
            'Tesla': 0,
            'No of Active Reports': 4,
            'Status': 'Active',
            'Quick Actions': ['View', 'Disable', 'Delete'],
        },
        {
            'Station Name': 'Westside EV',
            'Owner Name': 'Jane Smith',
            'Joined On': '2022-11-10',
            'District': 'West',
            'City': 'Gotham',
            'Address Line': '456 Elm St',
            'Revenue': '$8,500',
            'Bookings': 'Disabled',
            'No of Chargers': 5,
            'Type1': 1,
            'Type2': 2,
            'CCS1': 0,
            'CCS2': 1,
            'CHAdeMO': 1,
            'Tesla': 0,
            'No of Active Reports': 7,
            'Status': 'Disabled',
            'Quick Actions': ['View', 'Enable', 'Delete'],
        },
        // Add more station data as needed
    ];

    return (
        <div style={{
            fontFamily: FONTS.family.sans,
            padding: '24px',
        }}>
            {/* Header Section */}
            <AdminPageHeader title="Stations Overview" />

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Left Side - 3/4 width */}
                <div className="lg:col-span-3">
                    {/* Search and Filter Bar */}
                    <div className="mb-6">
                        <ChargingStationsTopBar
                            search={search}
                            setSearch={setSearch}
                            filter={filter}
                            setFilter={setFilter}
                            sort={sort}
                            setSort={setSort}
                            filterOptions={stationFilterOptions}
                            sortOptions={stationSortOptions}
                            searchPlaceholder="Search stations..."
                        />
                    </div>

                    <OverviewCard padding='p-0'>
                        {/* Stations Table */}
                        <div className="bg-transparent overflow-hidden">
                            <DataTable
                                columns={stationColumns}
                                data={stations.length > 0 ? stations : stationData}
                                filter={filter}
                                sort={sort}
                                search={search}
                                onRowClick={(station) => {
                                    navigate(`/admin/stations/${station.id}`);
                                }}
                            />
                        </div>
                    </OverviewCard>
                </div>

                {/* Right Side - 1/4 width */}
                <div className="lg:col-span-1">
                    <div className="sticky top-6 space-y-6">
                        <ChargingStationsRightPanel stations={stations} requests={requests} />
                    </div>
                </div>
            </div>
        </div>
    );
}