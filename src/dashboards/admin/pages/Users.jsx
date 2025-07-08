import React, { useState } from 'react';
import DataTableTopBar from '../components/DataTableTopBar';
import DataTable from '../components/DataTable';
import UsersRightPanel from '../components/UsersRightPanel';
import { COLORS, FONTS } from '../../../constants';
import NotificationsIcon from '../../../assets/notifications.svg';
import OverviewCard from '../components/OverviewCard';
import { useNavigate } from 'react-router-dom';

export default function UsersPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState('Date of Registration');
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([
    {
      id: 1,
      type: 'user',
      status: 'new',
      title: 'New user verification request',
      date: '5 Sat, 08:11 AM'
    },
    {
      id: 2,
      type: 'user',
      status: 'new',
      title: 'User account reactivation request',
      date: '5 Sat, 09:30 AM'
    },
    {
      id: 3,
      type: 'user',
      status: 'review',
      title: 'User complaint investigation',
      date: '4 Fri, 03:45 PM'
    }
  ]);

  const userFilterOptions = [
    { label: 'Status', value: 'status' },
    { label: 'Users with Vehicles', value: 'userswithvehicles' },
    { label: 'Users Who have Complained', value: 'complainedusers' },
    { label: 'Users Who have Posted on Community', value: 'userspostcommunity' },
  ];

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

  const userColumns = [
    'Name',
    'Email',
    'Contact Number',
    'Date of Registration',
    'No of Vehicles Registered',
    'Total Energy Charged',
    'Total Spend',
    'Total Trips Completed',
    'Overall Rating for trips',
    'Total Charging Sessions',
    'No of Bookings',
    'Overall Rating for Charging sessions',
    'No of complaints',
    'No of posts shared',
    'Account Status',
    'Quick Actions'
  ];

  // More comprehensive sample user data
  const userData = [
    {
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
      'Account Status': 'Active',
      'Quick Actions': ['View', 'Disable', 'Delete'],
      flagged: false
    },{
      id: '002',
      Name: 'Jane Smith',
      Email: 'jane@example.com',
      'Contact Number': '+1987654321',
      'Date of Registration': '2023-02-20',
      'No of Vehicles Registered': 1,
      'Total Energy Charged': '75 kWh',
      'Total Spend': '$225',
      'Total Trips Completed': 8,
      'Overall Rating for trips': 4.8,
      'Total Charging Sessions': 12,
      'No of Bookings': 'Enabled',
      'Overall Rating for Charging sessions': 4.5,
      'No of complaints': 0,
      'No of posts shared': 5,
      'Account Status': 'Active',
      'Quick Actions': ['View', 'Disable', 'Delete'],
      flagged: true
    },
    {
      id: '003',
      Name: 'Robert Johnson',
      Email: 'robert@example.com',
      'Contact Number': '+1122334455',
      'Date of Registration': '2023-03-10',
      'No of Vehicles Registered': 0,
      'Total Energy Charged': '0 kWh',
      'Total Spend': '$0',
      'Total Trips Completed': 0,
      'Overall Rating for trips': 0,
      'Total Charging Sessions': 0,
      'No of Bookings': 'Disabled',
      'Overall Rating for Charging sessions': 0,
      'No of complaints': 2,
      'No of posts shared': 0,
      'Account Status': 'Blocked',
      'Quick Actions': ['View', 'Enable', 'Delete'],
      flagged: false
    }
  ];

  return (
    <div style={{
      fontFamily: FONTS.family.sans,
      padding: '24px',
      backgroundColor: COLORS.background,
    }}>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold" style={{ color: COLORS.mainTextColor }}>
          EV Users Overview
        </h1>
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

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Side - 3/4 width */}
        <div className="lg:col-span-3">
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
              searchPlaceholder="Search users..."
              showExportButton={true}
              onExport={() => {
                // Export functionality would go here
                console.log('Exporting user data...');
              }}
            />
          </div>

          <OverviewCard padding='p-6'>
            {/* Users Table */}
            <div className="bg-white rounded-sm shadow-sm overflow-hidden"
              style={{
                border: `1px solid ${COLORS.border}`,
                boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.05)'
              }}>
              <DataTable
                columns={userColumns}
                data={users.length > 0 ? users : userData}
                filter={filter}
                sort={sort}
                search={search}
                onRowClick={(user) => {
                  // Navigate to user detail page with user ID or email
                  // This assumes you have a route like '/users/:id'
                  navigate(`/admin/users/${user.id}`);
                }}
              />
            </div>
          </OverviewCard>
        </div>

        {/* Right Side - 1/4 width */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-6">
            <UsersRightPanel
              users={users.length > 0 ? users : userData}
              requests={requests}
            />
          </div>
        </div>
      </div>
    </div>
  );
}