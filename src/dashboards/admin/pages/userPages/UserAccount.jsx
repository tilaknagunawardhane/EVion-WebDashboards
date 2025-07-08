import React, { useState } from 'react';
import DataTableTopBar from '../../components/DataTableTopBar';
import DataTable from '../../components/DataTable';
import UsersRightPanel from '../../components/UsersRightPanel';
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

  // Sample data for each tab
  const tabData = {
    sessions: {
      columns: ['Date', 'Station', 'Energy (kWh)', 'Duration', 'Cost', 'Status'],
      data: [
        { id: 1, Date: '2023-06-15 09:30', Station: 'EV Central', 'Energy (kWh)': 24.5, Duration: '45 min', Cost: '$7.35', Status: 'Completed' },
        { id: 2, Date: '2023-06-14 18:15', Station: 'Westside EV', 'Energy (kWh)': 18.2, Duration: '32 min', Cost: '$5.46', Status: 'Completed' },
        { id: 3, Date: '2023-06-12 07:45', Station: 'North Power Hub', 'Energy (kWh)': 32.8, Duration: '58 min', Cost: '$9.84', Status: 'Completed' }
      ]
    },
    bookings: {
      columns: ['Date', 'Station', 'Time Slot', 'Status', 'Actions'],
      data: [
        { id: 1, Date: '2023-06-18', Station: 'EV Central', 'Time Slot': '10:00 - 11:00', Status: 'Confirmed', Actions: ['Cancel', 'Reschedule'] },
        { id: 2, Date: '2023-06-17', Station: 'Mall Parking EV', 'Time Slot': '15:30 - 16:30', Status: 'Completed', Actions: ['Rate'] },
        { id: 3, Date: '2023-06-20', Station: 'Tech Park Chargers', 'Time Slot': '09:00 - 10:00', Status: 'Upcoming', Actions: ['Cancel', 'Reschedule'] }
      ]
    },
    payments: {
      columns: ['Date', 'Transaction ID', 'Amount', 'Method', 'Status'],
      data: [
        { id: 1, Date: '2023-06-15', 'Transaction ID': 'TXN789456', Amount: '$7.35', Method: 'Credit Card', Status: 'Completed' },
        { id: 2, Date: '2023-06-10', 'Transaction ID': 'TXN123456', Amount: '$12.50', Method: 'Wallet', Status: 'Completed' },
        { id: 3, Date: '2023-06-05', 'Transaction ID': 'TXN654321', Amount: '$5.46', Method: 'Credit Card', Status: 'Refunded' }
      ]
    },
    reports: {
      columns: ['Report ID', 'Type', 'Date', 'Status', 'Actions'],
      data: [
        { id: 1, 'Report ID': 'RPT001', Type: 'Charging Issue', Date: '2023-06-12', Status: 'Resolved', Actions: ['View'] },
        { id: 2, 'Report ID': 'RPT002', Type: 'Payment Dispute', Date: '2023-06-08', Status: 'In Progress', Actions: ['View'] },
        { id: 3, 'Report ID': 'RPT003', Type: 'Station Feedback', Date: '2023-06-01', Status: 'Closed', Actions: ['View'] }
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
    'Account Status': 'Active',
    flagged: false
  };

  return (
    <div style={{
      fontFamily: FONTS.family.sans,
      padding: '24px',
      backgroundColor: COLORS.background,
    }}>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: COLORS.mainTextColor }}>
            {currentUser.Name}'s Account
          </h1>
          <p style={{ color: COLORS.secondaryText, fontSize: FONTS.sizes.sm }}>
            User ID: {id} | Registered: {currentUser['Date of Registration']}
          </p>
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
        <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
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
              searchPlaceholder={`Search ${activeTab}...`}
              showExportButton={true}
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
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-6">
            <UsersRightPanel
              users={[currentUser]}
              requests={requests}
            />
          </div>
        </div>
      </div>
    </div>
  );
}