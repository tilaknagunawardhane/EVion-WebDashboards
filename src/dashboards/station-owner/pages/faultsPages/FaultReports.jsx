import React, { useState } from 'react';
import { COLORS, FONTS } from '../../../../constants';
// import { useNavigate } from 'react-router-dom';
import DataTableTopBar from '../../../../components/ui/DataTableTopBar';
import DataTable from '../../../../components/ui/DataTable';
import StationOwnerPageHeader from '../../components/StationOwnerPageHeader';

const OwnerViewStation = () => {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState(null);
    const [sort, setSort] = useState(null);
    // const navigate = useNavigate();

    const faultAlertsData = [
    {
        FaultID: 'FLT001',
        'Date & Time Reported': '2025-07-15 09:15 AM',
        'Fault Type': 'Charger',
        Category: 'Charger not working',
        Description: 'Charger 01 at Station A is completely unresponsive. No power light.',
        'Associated Station': 'Station A - Colombo Central',
        'Associated Charger': 'Charger01',
        Connector: 'All', // Or a specific connector if only one is affected
        Status: 'In Progress',
        'Last Update On': '2025-07-15 10:00 AM',
        'Any actions took to resolve': 'Remote diagnostics initiated. Technician scheduled for 2025-07-15 PM.',
        'Quick Actions': ['Contact Support Officer']
    },
    {
        FaultID: 'FLT002',
        'Date & Time Reported': '2025-07-14 03:00 PM',
        'Fault Type': 'Station',
        Category: 'Power Outage',
        Description: 'Entire Station B is offline due to a local power outage.',
        'Associated Station': 'Station B - Kandy Road',
        'Associated Charger': 'N/A', // Applies to the whole station
        Connector: 'N/A',
        Status: 'Resolved',
        'Last Update On': '2025-07-14 06:30 PM',
        'Any actions took to resolve': 'Ceylon Electricity Board contacted. Power restored at 6:15 PM.',
        'Quick Actions': ['Contact Support Officer']
    },
    {
        FaultID: 'FLT003',
        'Date & Time Reported': '2025-07-16 07:45 AM',
        'Fault Type': 'Charger',
        Category: 'Connector broken',
        Description: 'CCS2 connector on Charger 02 at Station C is physically damaged. Plastic housing cracked.',
        'Associated Station': 'Station C - Galle Road',
        'Associated Charger': 'Charger02',
        Connector: 'CCS2 DC',
        Status: 'New',
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
        'Associated Station': 'Station A - Colombo Central',
        'Associated Charger': 'Charger03',
        Connector: 'Type 2 AC',
        Status: 'Resolved',
        'Last Update On': '2025-07-13 01:30 PM',
        'Any actions took to resolve': 'Contacted customer, verified issue, issued full refund for the booking. Reminder sent to station staff regarding parking rules.',
        'Quick Actions': ['Contact Support Officer']
    },
    {
        FaultID: 'FLT005',
        'Date & Time Reported': '2025-07-16 01:00 PM',
        'Fault Type': 'Charger',
        Category: 'Charging speed inconsistent',
        Description: 'Customer reported fluctuating charging speed on Charger 04 at Station D.',
        'Associated Station': 'Station D - Jaffna',
        'Associated Charger': 'Charger04',
        Connector: 'Type 2 AC',
        Status: 'In Progress',
        'Last Update On': '2025-07-16 02:00 PM',
        'Any actions took to resolve': 'Monitoring charger performance remotely. Logs being reviewed for anomalies.',
        'Quick Actions': ['Contact Support Officer']
    }
    ];
    
    const faultAlertsColumns = ['FaultID', 'Date & Time Reported', 'Fault Type', 'Category', 'Description', 'Associated Station', 'Associated Charger', 'Connector', 'Status', 'Last Update On', 'Any actions took to resolve', 'Quick Actions']

    const filterOptions = [
        { 
            group: 'Status', 
            options: [
                { value: 'New', label: 'New' },
                { value: 'In Progress', label: 'In Progress' },
                { value: 'Resolved', label: 'Resolved' }
            ] 
        },
        { 
            group: 'Fault Type', 
            options: [
                { value: 'Charger', label: 'Charger' },
                { value: 'Station', label: 'Station' },
                { value: 'Booking', label: 'Booking' }
            ] 
        }
    ];

    // Function to apply filters to data
    const filterData = (data, filter) => {
        if (!filter) return data;
        
        return data.filter(item => {
            // Check if the item matches the selected filter
            if (filter.group === 'Status') {
                return item.Status === filter.value;
            } else if (filter.group === 'Fault Type') {
                return item['Fault Type'] === filter.value;
            }
            return true;
        });
    };

    // Function to apply search to data
    const searchData = (data, searchTerm) => {
        if (!searchTerm) return data;
        
        const lowerSearch = searchTerm.toLowerCase();
        return data.filter(item => 
            Object.values(item).some(
                val => val.toString().toLowerCase().includes(lowerSearch)
        ));
    };

    // Get filtered and searched data
    const processedData = searchData(filterData(faultAlertsData, filter), search);

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
                filterOptions={filterOptions.flatMap(group => group.options)}
                sortOptions={columns.map(col => ({ value: col, label: col }))}
                searchPlaceholder={`Search ${title.toLowerCase()}...`}
            />
            <DataTable
                columns={columns}
                data={data}
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

            <StationOwnerPageHeader title={"Fault Alerts"} />

            <TableTab
                title="Fault Alerts"
                columns={faultAlertsColumns}
                data={processedData}
            />

        </div>
    );
};

export default OwnerViewStation;