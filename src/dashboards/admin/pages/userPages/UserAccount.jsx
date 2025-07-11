import React, { useState } from 'react';
import DataTableTopBar from '../../components/DataTableTopBar';
import DataTable from '../../components/DataTable';
// import UsersRightPanel from '../../components/UsersRightPanel';
import UserAccountRightPanel from '../../components/userComponents/userAccountRightPanel';
import TabBar from '../../components/TabBar';
import { COLORS, FONTS } from '../../../../constants';
import NotificationsIcon from '../../../../assets/notifications.svg';
import OverviewCard from '../../components/OverviewCard';
import { useNavigate, useParams } from 'react-router-dom';

export default function UserAccountPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState('Date');
  const [activeTab, setActiveTab] = useState('sessions');
  

  const userFilterOptions = [
    { label: 'Status', value: 'status' },
    { label: 'Users with Vehicles', value: 'userswithvehicles' },
    { label: 'Users Who have Complained', value: 'complainedusers' },
    { label: 'Users Who have Posted on Community', value: 'userspostcommunity' },
  ];

const userAccountTabs = [
   { id: 'sessions', label: 'Charging Sessions' },
    { id: 'bookings', label: 'Bookings' },
    { id: 'payments', label: 'Payments' },
    { id: 'reports', label: 'Reports' }
  ];

  const mobileTabLabels = {
    sessions: 'Sessions',
    bookings: 'Bookings',
    payments: 'Payments',
    reports: 'Reports'
  };

  const stats = {
    chargingSessions: 25,
    kwhCharged: '3,240',
    totalFeesPaid: 63890,
    completedBookings: 5,
    cancelledBookings: 1,
    noShowIncidents: 1,
    lateArrivals: 1,
    penaltiesCharged: 300,
    totalBookingFees: 11800,
    totalSpent: 75990,
    approvedPosts: 12,
    rejectedPosts: 1,
    flagsReceived: 12,
    reportsFiled: 2,
    rejectedReports: 0
  };


  const userSortOptions = [
    { label: 'Date of Registration', value: 'dateRegistered' },
    { label: 'No of Vehicles', value: 'noofvehicles' },
    { label: 'Energy', value: 'energy' },
    { label: 'Spend', value: 'spend' },
    { label: 'Trips', value: 'trips' },
    { label: 'Bookings', value: 'bookings' },
    { label: 'Ratings', value: 'ratings' },
    { label: 'Complaints', value: 'complaints' },
    { label: 'Posts', value: 'posts' }
  ];

  // Sample data for each tab
  const tabData = {
    sessions: {
      columns: [
        'Session ID',
        'Date',
        'Start',
        'End',
        'Duration',
        'Station',
        'Location',
        'Connector Type',
        'Charger Type',
        'Vehicle',
        'Starting Bat. Level',
        'Ending Bat. Level',
        'Energy Delivered',
        'Energy Cost',
        'Status',
        'Booking Fee',
        'Charged Penalties',
        'Total Fee',
        'Payment Status',
        'Rating Given',
        'Complaints',
        'Resolve Status',
        'Refunds'
      ],
      data: [
        {
          'Session ID': 'SESS-001',
          'Date': '2023-06-15',
          'Start': '09:30',
          'End': '10:15',
          'Duration': '45 min',
          'Station': 'EV Central',
          'Location': '123 Main St, Metropolis',
          'Connector Type': 'CCS2',
          'Charger Type': 'DC',
          'Vehicle': 'Tesla Model 3',
          'Starting Bat. Level': '22%',
          'Ending Bat. Level': '85%',
          'Energy Delivered': '24.5 kWh',
          'Energy Cost': '$7.35',
          'Status': 'Booked',
          'Booking Fee': '$2.00',
          'Charged Penalties': '$0.00',
          'Total Fee': '$9.35',
          'Payment Status': 'Paid',
          'Rating Given': '4.5',
          'Complaints': 'None',
          'Resolve Status': '-',
          'Refunds': '$0.00'
        },
        // Add more session data as needed
      ]
    },
    bookings: {
      columns: [
        'Session ID',
        'Date',
        'Slot',
        'Start',
        'End',
        'Duration',
        'Station',
        'Location',
        'Connector Type',
        'Charger Type',
        'Vehicle',
        'Starting Bat. Level',
        'Ending Bat. Level',
        'Energy Delivered',
        'Energy Cost',
        'Booking Fee',
        'Status',
        'Reason to cancel',
        'Charged Penalties',
        'Total Fee',
        'Rating Given',
        'Complaints',
        'Resolve Status',
        'Refunds',
        'View Receipt'
      ],
      data: [
        {
          'Session ID': 'BOOK-001',
          'Date': '2023-06-18',
          'Slot': '10:00 - 11:00',
          'Start': '10:05',
          'End': '10:50',
          'Duration': '45 min',
          'Station': 'Mall Parking EV',
          'Location': '800 Shop Rd, Metropolis',
          'Connector Type': 'Type 2',
          'Charger Type': 'AC',
          'Vehicle': 'Nissan Leaf',
          'Starting Bat. Level': '30%',
          'Ending Bat. Level': '90%',
          'Energy Delivered': '18.2 kWh',
          'Energy Cost': '$5.46',
          'Booking Fee': '$1.50',
          'Status': 'Attended',
          'Reason to cancel': '-',
          'Charged Penalties': '$0.00',
          'Total Fee': '$6.96',
          'Rating Given': '5.0',
          'Complaints': 'None',
          'Resolve Status': '-',
          'Refunds': '$0.00',
          'View Receipt': <a href="#" style={{ color: COLORS.primary }}>View</a>
        },
        // Add more booking data as needed
      ]
    },
    payments: {
      columns: [
        'Session ID',
        'Date & Time',
        'Station',
        'Location',
        'Connector Type',
        'Charger Type',
        'Duration',
        'Vehicle',
        'Energy Delivered',
        'Energy Cost',
        'Booking Fee',
        'Penalties',
        'Total Fee',
        'Complaint ID',
        'Refunds',
        'View Receipt'
      ],
      data: [
        {
          'Session ID': 'PAY-001',
          'Date & Time': '2023-06-15 09:30',
          'Station': 'Tech Park Chargers',
          'Location': '200 Innovation Dr, Gotham',
          'Connector Type': 'CHAdeMO',
          'Charger Type': 'DC',
          'Duration': '32 min',
          'Vehicle': 'Toyota Prius',
          'Energy Delivered': '15.8 kWh',
          'Energy Cost': '$4.74',
          'Booking Fee': '$1.00',
          'Penalties': '$0.00',
          'Total Fee': '$5.74',
          'Complaint ID': '-',
          'Refunds': '$0.00',
          'View Receipt': <a href="#" style={{ color: COLORS.primary }}>View</a>
        },
        // Add more payment data as needed
      ]
    },
    reports: {
      columns: [
        'Report ID',
        'Reported On',
        'Report category',
        'Title',
        'Description',
        'Evidences',
        'Station',
        'Location',
        'Charger ID',
        'Connector Type',
        'Booking ID',
        'Status',
        'Resolved On',
        'Resolved By',
        'Specific Actions took to resolve'
      ],
      data: [
        {
          'Report ID': 'REP-001',
          'Reported On': '2023-06-12 14:30',
          'Report category': 'Charging Station Related',
          'Title': 'Station not charging',
          'Description': 'Plugged in but no power delivery',
          'Evidences': 'Photo attached',
          'Station': 'Westside EV',
          'Location': '456 Elm St, Gotham',
          'Charger ID': 'CHG-789',
          'Connector Type': 'CCS1',
          'Booking ID': 'BOOK-045',
          'Status': 'Resolved',
          'Resolved On': '2023-06-13 10:15',
          'Resolved By': 'Tech Team',
          'Specific Actions took to resolve': 'Replaced faulty power module'
        },
        // Add more report data as needed
      ]
    }
  };

  // Get current user data based on ID
  const currentUser = {
    id: '001',
    Name: 'John Doe',
    Email: 'john@example.com',
    'Contact Number': '+1234567890',
    'Date of Registration': '2023-01-15',
    'No of Vehicles Registered': 2,
    'Total Energy Charged': '150 kWh',
    'Total Spend': '$450',
    'Total Trips Completed': 15,
    'Overall Rating for trips': 4.5,
    'Total Charging Sessions': 20,
    'No of Bookings': 'Enabled',
    'Overall Rating for Charging sessions': 4.2,
    'No of complaints': 1,
    'No of posts shared': 3,
    'Account Status': 'Blocked',
    flagged: false,
    'Account Balance': '1100.00'
  };

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
            {currentUser.Name}'s Account
          </h1>
          {/* <p style={{ color: COLORS.secondaryText, fontSize: FONTS.sizes.sm }}>
            User ID: {id} | Registered: {currentUser['Date of Registration']}
          </p> */}
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

      {/* Tab Bar */}
      <div className="mb-6">
      <TabBar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          tabs={userAccountTabs}
          mobileLabels={mobileTabLabels}
        />
        {/* <TabBar activeTab={activeTab} setActiveTab={setActiveTab} /> */}
      </div>


      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
        {/* Left Side */}
        <div className="md:col-span-3">

          {/* Search and Filter Bar */}
          <div className="mb-6">
            <DataTableTopBar
              search={search}
              setSearch={setSearch}
              filter={filter}
              setFilter={setFilter}
              sort={sort}
              setSort={setSort}
              filterOptions={userFilterOptions}
              sortOptions={userSortOptions}
              searchPlaceholder={`Search ${activeTab}...`}
              showExportButton={false}
              onExport={() => {
                console.log(`Exporting ${activeTab} data...`);
              }}
            />
          </div>

          <OverviewCard padding='p-6'>
            {/* Tab Content */}
            <div className="bg-white rounded-sm shadow-sm overflow-hidden"
              style={{
                border: `1px solid ${COLORS.border}`,
                boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.05)'
              }}>
              <DataTable
                columns={tabData[activeTab].columns}
                data={tabData[activeTab].data}
                filter={filter}
                sort={sort}
                search={search}

                onRowClick={(row) => {
                  navigate(`/users/${id}/${activeTab}/${row.id}`);
                }}
              />
            </div>
          </OverviewCard>
        </div>

        {/* Right Side - 1/4 width */}
        {/* <div className="lg:col-span-1"> */}
          <div className="md:sticky md:top-6 space-y-4 md:space-y-6">
            <UserAccountRightPanel
              user={currentUser}
              stats={stats}
            />
          </div>
        {/* </div> */}
      </div>
    </div>
  );
}