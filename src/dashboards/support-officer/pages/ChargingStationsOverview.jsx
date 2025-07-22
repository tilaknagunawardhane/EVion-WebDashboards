import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import { FONTS, COLORS } from "../../../constants";
import DataTable from "../../../components/ui/DataTable";
import DataTableTopBar from "../../../components/ui/DataTableTopBar";
import OverviewCard from "../../admin/components/OverviewCard";
import PageHeader from "../../admin/components/AdminPageHeader";

export default function ChargingStationsOverviewPage(){
    const navigate = useNavigate();

    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState({});
    const [sort, setSort] = useState('Date');

    const ChargingStationFilterOptions = [
    { label: 'District', value: 'district' },
    { label: 'Booking System Enabled / Disabled', value: 'bookingSystem' },
    { label: 'Connector Types', value: 'connectorTypes' },
    { label: 'Availability Status', value: 'availabilityStatus' },
    ];

    const ChargingStationSortOptions = [
    { label: 'No of Chargers', value: 'noOfChargers' },
    { label: 'No of Fault Reports', value: 'noOfFaultReports' },
    { label: 'Date of Last Report', value: 'dateOfLastReport' },
    ];

    const tabData = {
            columns: [
            'Station Name',
            'Owner Name',
            'District',
            'Address',
            'Bookinge',
            'No of active fault reports',
            'Last Fault Reported',
            'No of AC Chargers',
            'No of DC Chargers',
            'Typel',
            'Type2',
            'ccsl',
            'ccsl',
            'CCS2',
            'CHAdeMO',
            'Tesla',
            'Status',
            'Quick Actions'
        ],
        data: [ {
            'Station Name': 'Station 1',
            'Owner Name': 'GreenVolt Energy',
            'District': 'Downtown',
            'Address': '123 Greenway Blvd, Metro City',
            'Bookinge': 'Enabled',
            'No of active fault reports': 2,
            'Last Fault Reported': '2025-07-10',
            'No of AC Chargers': 4,
            'No of DC Chargers': 3,
            'Typel': 2,
            'Type2': 2,
            'ccsl': 1,
            'CCS2': 2,
            'CHAdeMO': 1,
            'Tesla': 1,
            'Status': 'Active',
        },]

    }


    return (
        <div style={{
            fontFamily: FONTS.family.sans,
            padding: '24px',
            backgroundColor: COLORS.background,
        }}>
            {/* Header Section */}
            <PageHeader title={`Charging Stations Overview`} />

            {/* Main Content */}
            <div className="grid grid-colos-1 md:grid-cols-4 gap-4 md:gap-6">
                {/* Left Side */}
                <div className="md:col-span-4">

                    {/* Search and Filter Bar */}
                    <div className="mb-6">
                        <DataTableTopBar
                            search={search}
                            setSearch={setSearch}
                            filter={filter}
                            setFilter={setFilter}
                            sort={sort}
                            setSort={setSort}
                            filterOptions={ChargingStationFilterOptions}
                            sortOptions={ChargingStationSortOptions}
                            searchPlaceholder={`Search a Station`}
                            showExportButton={true}
                            onExport={() => {
                                console.log(`Exporting Station data...`);
                            }}
                        />

                        <OverviewCard padding='p-6'>
                            <div className="bg-white rounded-sm shadow-sm overflow-hidden"
                                style={{
                                border: `1px solid ${COLORS.border}`,
                                boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.05)'
                                }}>
                                <DataTable
                                columns={tabData.columns}
                                data={tabData.data}
                                filter={filter}
                                sort={sort}
                                search={search}
                
                                // onRowClick={(row) => {
                                //     navigate(`/users/${id}/${activeTab}/${row.id}`);
                                // }}
                                />
                            </div>

                        </OverviewCard>

                    </div>

                </div>

            </div>

        </div>
    )
}