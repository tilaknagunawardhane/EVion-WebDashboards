import React, { useState } from 'react';
import TabBar from '../../components/TabBar';
import { COLORS, FONTS } from '../../../../constants';
import NotificationsIcon from '../../../../assets/notifications.svg';
import MainRequestCard from '../../components/requestComponents/MainRequestCard';
import DataTableTopBar from '../../components/DataTableTopBar';
import { useNavigate } from 'react-router-dom';

export default function RequestsPage() {
    const [activeTab, setActiveTab] = useState('stations');
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState(null);
    const [sort, setSort] = useState('Date requested');
    const navigate = useNavigate();

    const filterOptions = [
        { label: 'District/City', value: 'district' },
        { label: 'Colombo', value: 'colombo' },
        { label: 'Kandy', value: 'kandy' },
        { label: 'Galle', value: 'galle' },
        // Add more districts/cities as needed
    ];

    // Sort options
    const sortOptions = [
        { label: 'Date requested', value: 'date' },
        { label: 'No of chargers', value: 'chargers' },
    ];

    // Sample data for station requests
    const stationRequests = [
        // New Requests
        {
            id: 1,
            type: 'station',
            userName: "John Doe",
            userType: "New User",
            status: "NEW",
            stationName: "EV Charging Station",
            stationAddress: "No.24, Joshep Road, Wellpanna",
            district: "colombo",
            chargersRequested: "02",
            date: "6 Jul 09:20 AM"
        },
        {
            id: 2,
            type: 'station',
            userName: "Robert Johnson",
            userType: "New User",
            status: "NEW",
            stationName: "Mall Parking Chargers",
            stationAddress: "456 Shopping Ave, Mega Mall",
            district: "galle",
            chargersRequested: "01",
            date: "5 Jul 10:45 AM"
        },
        {
            id: 3,
            type: 'station',
            userName: "Sarah Wilson",
            userType: "Existing User",
            status: "NEW",
            stationName: "Office Park Charging",
            stationAddress: "100 Business Blvd",
            district: "kandy",
            chargersRequested: "05",
            date: "3 Jul 03:45 PM"
        },
        // In-Progress Requests
        {
            id: 4,
            type: 'station',
            userName: "Jane Smith",
            userType: "Existing User",
            status: "IN-PROGRESS",
            stationName: "City Center Charging",
            stationAddress: "123 Main Street, Downtown",
            district: "colombo",
            chargersRequested: "04",
            date: "5 Jul 02:15 PM"
        },
        {
            id: 5,
            type: 'station',
            userName: "Michael Brown",
            userType: "New User",
            status: "IN-PROGRESS",
            stationName: "Apartment Complex",
            stationAddress: "789 Residential Lane",
            district: "galle",
            chargersRequested: "02",
            date: "4 Jul 11:20 AM"
        },
        {
            id: 6,
            type: 'station',
            userName: "David Taylor",
            userType: "New User",
            status: "IN-PROGRESS",
            stationName: "University Campus",
            stationAddress: "College Avenue, Campus Town",
            district: "kandy",
            chargersRequested: "06",
            date: "2 Jul 09:10 AM"
        },
        // Rejected Requests
        {
            id: 7,
            type: 'station',
            userName: "Emily Davis",
            userType: "Existing User",
            status: "REJECTED",
            stationName: "Highway Rest Stop",
            stationAddress: "Mile Marker 42, Interstate 5",
            district: "galle",
            chargersRequested: "03",
            date: "4 Jul 04:30 PM"
        }
    ];

    // Sample data for connector requests
    const connectorRequests = [
        // New Requests
        {
            id: 1,
            type: 'connector',
            userName: "Alex Johnson",
            userType: "Existing User",
            status: "NEW",
            stationName: "Tech Park Charging",
            stationAddress: "200 Tech Park Drive",
            district: "galle",
            connectorType: "CCS2",
            chargersRequested: "01",
            date: "6 Jul 10:30 AM"
        },
        {
            id: 2,
            type: 'connector',
            userName: "Olivia Martinez",
            userType: "New User",
            status: "NEW",
            stationName: "Airport Parking",
            stationAddress: "Terminal 1, International Airport",
            district: "galle",
            connectorType: "CCS1",
            chargersRequested: "02",
            date: "4 Jul 05:15 PM"
        },
        {
            id: 3,
            type: 'connector',
            userName: "Sophia Garcia",
            userType: "New User",
            status: "NEW",
            stationName: "Community Center",
            stationAddress: "100 Community Center Road",
            district: "galle",
            connectorType: "CCS2",
            chargersRequested: "01",
            date: "3 Jul 04:20 PM"
        },
        // In-Progress Requests
        {
            id: 4,
            type: 'connector',
            userName: "Lisa Wong",
            userType: "New User",
            status: "IN-PROGRESS",
            stationName: "Supermarket Chargers",
            stationAddress: "123 Grocery Lane",
            district: "kandy",
            connectorType: "Type 2",
            chargersRequested: "03",
            date: "5 Jul 01:45 PM"
        },
        {
            id: 5,
            type: 'connector',
            userName: "James Wilson",
            userType: "Existing User",
            status: "IN-PROGRESS",
            stationName: "Gas Station Chargers",
            stationAddress: "456 Fuel Avenue",
            district: "Colombo",
            connectorType: "Type 2",
            chargersRequested: "02",
            date: "4 Jul 12:30 PM"
        },
        // Rejected Requests
        {
            id: 6,
            type: 'connector',
            userName: "Thomas Lee",
            userType: "Existing User",
            status: "REJECTED",
            stationName: "Hotel Parking",
            stationAddress: "789 Hospitality Street",
            district: "Colombo",
            connectorType: "CHAdeMO",
            chargersRequested: "01",
            date: "5 Jul 11:20 AM"
        },
        {
            id: 7,
            type: 'connector',
            userName: "Daniel Kim",
            userType: "Existing User",
            status: "REJECTED",
            stationName: "Sports Complex",
            stationAddress: "100 Athletic Drive",
            district: "kandy",
            connectorType: "CHAdeMO",
            chargersRequested: "04",
            date: "2 Jul 10:15 AM"
        }
    ];

    // Define your custom tabs
    const requestTabs = [
        { id: 'stations', label: 'Stations' },
        { id: 'connectors', label: 'Connectors' }
    ];

    // Group requests by status
    const groupRequestsByStatus = (requests) => {
        return {
            NEW: requests.filter(r => r.status === 'NEW'),
            'IN-PROGRESS': requests.filter(r => r.status === 'IN-PROGRESS'),
            REJECTED: requests.filter(r => r.status === 'REJECTED')
        };
    };

    // Get current requests based on active tab
    const currentRequests = activeTab === 'stations' ? stationRequests : connectorRequests;
    // Apply filtering
    const filteredRequests = currentRequests.filter(request => {
        if (!filter) return true;
        if (filter.value === 'district') return true; // Show all if "District/City" is selected
        return request.district === filter.value;
    });

    // Apply sorting
    const sortedRequests = [...filteredRequests].sort((a, b) => {
        if (sort === 'Date requested') {
            return new Date(b.date) - new Date(a.date); // Most recent first
        } else if (sort === 'No of chargers') {
            return parseInt(b.chargersRequested) - parseInt(a.chargersRequested); // Highest number first
        }
        return 0;
    });

    // Group the sorted and filtered requests
    const groupedRequests = groupRequestsByStatus(sortedRequests);


    return (
        <div style={{
            fontFamily: FONTS.family.sans,
            padding: '24px',
            backgroundColor: COLORS.background,
        }}>
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold" style={{ color: COLORS.mainTextColor }}>
                        Requests
                    </h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <img
                            src={NotificationsIcon}
                            alt="Notifications"
                            style={{
                                width: '24px',
                                height: '24px',
                                cursor: 'pointer'
                            }}
                        />
                        <span className="absolute top-0 right-0 w-2 h-2 rounded-full"
                            style={{ backgroundColor: COLORS.primary }}></span>
                    </div>
                </div>
            </div>



            {/* Tab Bar & Filter */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                {/* Tabs on the left */}
                <div className="w-full sm:w-auto">
                    <TabBar
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        tabs={requestTabs}
                    />
                </div>

                {/* Filter/Sort on the right */}
                <div className="w-full sm:w-auto">
                    <DataTableTopBar
                        search={search}
                        setSearch={setSearch}
                        filter={filter}
                        setFilter={setFilter}
                        sort={sort}
                        setSort={setSort}
                        filterOptions={filterOptions}
                        sortOptions={sortOptions}
                        showSearchBar={false}
                        showExportButton={false}
                    />
                </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
                {Object.entries(groupedRequests).map(([status, requests]) => (
                    requests.length > 0 && (
                        <div key={status} className="space-y-4">
                            <h2 className="text-lg font-semibold" style={{
                                color: COLORS.mainTextColor,
                                fontFamily: FONTS.family.sans
                            }}>
                                {status}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {requests.map(request => (
                                    <MainRequestCard
                                        key={request.id}
                                        request={{
                                            ...request,
                                            // For connectors, show connector type in the address field
                                            stationAddress: request.connectorType
                                                ? `Connector Type: ${request.connectorType}`
                                                : request.stationAddress
                                        }}
                                        onClick={() => navigate(`/admin/requests/${activeTab}/${request.id}`)}
                                    />
                                ))}
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}