import {  useEffect, useState } from 'react';
import { COLORS, FONTS } from '../../../../constants'
import { useNavigate } from 'react-router-dom';
import StationOwnerPageHeader from '../../components/StationOwnerPageHeader'
import Button from '../../../../components/ui/Button';
import StationCard from '../../components/stationComponents/StationCard';
import AddChargingStationForm from '../../../../components/ui/AddStationForm';
import WeeklyPayoutSummary from '../../components/earningsComponents/WeeklyPayoutSummary';
import DataTableTopBar from '../../../../components/ui/DataTableTopBar';
import DataTable from '../../../../components/ui/DataTable';

const payoutData = {
  thisWeek: {
    amount: '45,000',
    payoutDate: 'July 27, 2025',
  },
  previousWeeks: [
    {
      period: 'July 1 - July 7',
      amount: '38,500',
      status: 'Sent',
    },
    {
      period: 'June 24 - June 30',
      amount: '41,200',
      status: 'Pending',
    },
  ],
};

const earningsColumns = ['revenueID', 'Week Range', 'Total Revenue(LKR)', 'Due Date', 'Date Received', 'Status', 'Revenue Breakdown', 'Quick Actions', ]
const earningsData = [
  {
    revenueID: 'REV00130',
    'Week Range': 'July 15–21, 2025',
    'Total Revenue(LKR)': 21000.75,
    'Due Date': '2025-07-22',
    'Date Received': null,
    Status: 'Unpaid',
    'Revenue Breakdown': ['View Revenue Breakdown'],
    'Quick Actions': ['View Receipt'],
  },
  {
    revenueID: 'REV00129',
    'Week Range': 'July 8–14, 2025',
    'Total Revenue(LKR)': 18250.75,
    'Due Date': '2025-07-15',
    'Date Received': '2025-07-15',
    Status: 'Success',
    'Revenue Breakdown': ['View Revenue Breakdown'],
    'Quick Actions': ['View Receipt']
  },
  {
    revenueID: 'REV00128',
    'Week Range': 'July 1–7, 2025',
    'Total Revenue(LKR)': 15500.75,
    'Due Date': '2025-07-08',
    'Date Received': '2025-07-08',
    Status: 'Success',
    'Revenue Breakdown': ['View Revenue Breakdown'],
    'Quick Actions': ['View Receipt']
  },
  {
    revenueID: 'REV00127',
    'Week Range': 'June 24–30, 2025',
    'Total Revenue(LKR)': 13000.75,
    'Due Date': '2025-07-01',
    'Date Received': '2025-07-01',
    Status: 'Success',
    'Revenue Breakdown': ['View Revenue Breakdown'],
    'Quick Actions': ['View Receipt']
  },
];

export default function StationsPage() {

    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState(null);
    const [sort, setSort] = useState(null);

//   const navigate = useNavigate();
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
                    { value: 'Status', label: 'Open' },
                    { value: 'Fault Type', label: 'Charger'},
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
      }}
    >
        <StationOwnerPageHeader title="Earnings" />
        <WeeklyPayoutSummary data={payoutData} />

        <TableTab
            title="Earnings"
            columns={earningsColumns}
            data={earningsData}
        />

        {/* {showBreakdown && (
            <RevenueBreakdownPopup
            onClose={() => setShowBreakdown(false)}
            revenueData={selectedRevenueData}
            />
        )} */}
    </div>
  )
}