import React, {useState} from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { FONTS, COLORS } from "../../../constants";
import DataTable from "../../../components/ui/DataTable";
import DataTableTopBar from "../../../components/ui/DataTableTopBar";
import OverviewCard from "../../admin/components/OverviewCard";
import PageHeader from "../../admin/components/AdminPageHeader";
import TabBar from "../../../components/ui/TabBar";
import FaultReportRightPanel from "../components/FaultReportRightPanel";

export default function FaultReportsPage(){
        const { id } = useParams();
        const navigate = useNavigate();
        const [search, setSearch] = useState('');
        const [filter, setFilter] = useState({});
        const [sort, setSort] = useState('Date');
        const [activeTab, setActiveTab] = useState('chargingStations');

        const FaultReportsFilterOptions = [
        { label: 'Report Category', value: 'reportCategory' },
        { label: 'Title', value: 'title' },
        { label: 'Date Range', value: 'dateRange' },
        { label: 'District/City', value: 'districtCity' },
        ];

        const FaultReportsSortOptions = [
        { label: 'Date Reported', value: 'dateReported' },
        { label: 'Resolved Date', value: 'resolvedDate' },
        ];

        const faultReportsTabs = [
        { id: 'chargingStations', label: 'Charging Stations' },
        { id: 'connectors', label: 'Connectors' },
        { id: 'bookings', label: 'Bookings' },
        ];

        const mobileTabLabels = {
        chargingStations: 'Charging Stations',
        connectors: 'Connectors',
        bookings: 'Bookings',
        };

        const tabData = {
            chargingStations: {
                columns: [
                    'ReportID',
                    'Reported On',
                    'Reported By',
                    'Report Category',
                    'Title',
                    'Description',
                    'Attachments',
                    'Charging Station Address',
                    'Status',
                    'Resolved On',
                    'Specific Actions Took To Resolve',
                    'Quick Actions'
                ],
                data: [
                {
                    'ReportID': 'RPT-20250701-001',
                    'Reported On': '2025-07-01',
                    'Reported By': 'John Doe',
                    'Report Category': 'Hardware Issue',
                    'Title': 'DC Charger Not Working',
                    'Description': 'The DC fast charger is not delivering power. Screen shows error code E43.',
                    'Attachments': 'photo_error_e43.jpg',
                    'Charging Station Address': '123 Greenway Blvd, Metro City',
                    'Status': 'Resolved',
                    'Resolved On': '2025-07-03',
                    'Specific Actions Took To Resolve': 'Replaced faulty power module and updated firmware.',
                    'Quick Actions': ['View']
                }]
            },

            connectors: {
                columns: [
                    'Report ID',
                    'Reported On',
                    'Reported By',
                    'Report Category',
                    'Title',
                    'Description',
                    'Attachments',
                    'Charging Station Address',
                    'Charger',
                    'Connector Type',
                    'Status',
                    'Resolved On',
                    'Specific Actions Took To Resolve',
                    'Quick Actions'
                ],
                data: [
                {
                    'Report ID': 'RPT-20250713-009',
                    'Reported On': '2025-07-11',
                    'Reported By': 'Alice Smith',
                    'Report Category': 'Software Glitch',
                    'Title': 'Charging Session Failed',
                    'Description': 'User reported that charging session stops automatically after 5 minutes.',
                    'Attachments': 'session_log_511.jpg',
                    'Charging Station Address': '456 EcoDrive St, Greenville',
                    'Charger': 'DC Fast Charger #2',
                    'Connector Type': 'CCS2',
                    'Status': 'In Progress',
                    'Resolved On': '',
                    'Specific Actions Took To Resolve': '',
                    'Quick Actions': ['View']
                }
                ]
            },

            bookings: {
                columns: [
                    'Report ID',
                    'Reported On',
                    'Reported By',
                    'Report Category',
                    'Title',
                    'Description',
                    'Attachments',
                    'Charging Station Address',
                    'Charger',
                    'Connector Type',
                    'Booking ID',
                    'Booking Date',
                    'Booking Time',
                    'Status',
                    'Resolved On',
                    'Specific Actions Took To Resolve',
                    'Quick Actions'
                ],
                data: [
                {
                    'Report ID': 'RPT-20250712-014',
                    'Reported On': '2025-07-12',
                    'Reported By': 'David Kumar',
                    'Report Category': 'Connection Issue',
                    'Title': 'Connector not detected',
                    'Description': 'User reports that the charger is not detecting the vehicle connector.',
                    'Attachments': 'connector_issue.jpg',
                    'Charging Station Address': '789 ChargePoint Lane, VoltCity',
                    'Charger': 'AC Charger #3',
                    'Connector Type': 'Type2',
                    'Booking ID': 'BKNG-985102',
                    'Booking Date': '2025-07-12',
                    'Booking Time': '14:30',
                    'Status': 'Resolved',
                    'Resolved On': '2025-07-13',
                    'Specific Actions Took To Resolve': 'Reset the connector port and ran diagnostics. Issue cleared.',
                    'Quick Actions': ['View']
                }
                ]

            },
        }

        return (
            <div style={{
                fontFamily: FONTS.family.sans,
                padding: '24px',
                backgroundColor: COLORS.background,
            }}>
                {/* Header Section */}
                <PageHeader title={`Station Reports & User Complaints`} />

                {/* Tab Bar */}
                    <div className="mb-6">
                    <TabBar
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        tabs={faultReportsTabs}
                        mobileLabels={mobileTabLabels}
                    />
                </div>

                {/* Main Content */}
                <div className="grid grid-colos-1 md:grid-cols-4 gap-4 md:gap-6">
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
                                filterOptions={FaultReportsFilterOptions}
                                sortOptions={FaultReportsSortOptions}
                                searchPlaceholder={`Search a Fault`}
                                showExportButton={true}
                                onExport={() => {
                                    console.log(`Exporting Fault data...`);
                                }}
                            />

                            <OverviewCard padding='p-6'>
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
                    
                                    // onRowClick={(row) => {
                                    //     navigate(`/users/${id}/${activeTab}/${row.id}`);
                                    // }}
                                    />
                                </div>
                            </OverviewCard>

                        </div>
                    </div>

                    {/* Right Side - 1/4 width */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6 space-y-6">
                        <FaultReportRightPanel
                            // users={users.length > 0 ? users : userData}
                            // requests={requests}
                        />
                        </div>
                    </div>

                </div>  
            </div>
        )
}