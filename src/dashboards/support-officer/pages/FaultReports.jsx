import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { FONTS, COLORS } from "../../../constants";
import DataTable from "../../../components/ui/DataTable";
import DataTableTopBar from "../../../components/ui/DataTableTopBar";
import OverviewCard from "../../admin/components/OverviewCard";
import PageHeader from "../../admin/components/AdminPageHeader";
import TabBar from "../../../components/ui/TabBar";
import FaultReportRightPanel from "../components/FaultReportRightPanel";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../../contexts/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function FaultReportsPage() {
    const { isSupportOfficer, currentUser } = useAuth();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState({});
    const [sort, setSort] = useState('dateReported');
    const [activeTab, setActiveTab] = useState('stations');
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10
    });

    const FaultReportsFilterOptions = [
        { label: 'Status', value: 'status' },
        { label: 'Report Category', value: 'category' },
        { label: 'Date Range', value: 'dateRange' },
    ];

    const FaultReportsSortOptions = [
        { label: 'Date Reported', value: 'dateReported' },
        { label: 'Resolved Date', value: 'resolvedDate' },
    ];

    const faultReportsTabs = [
        { id: 'stations', label: 'Charging Stations' },
        { id: 'chargers', label: 'Chargers' },
        { id: 'bookings', label: 'Bookings' },
    ];

    const mobileTabLabels = {
        stations: 'Charging Stations',
        chargers: 'Chargers',
        bookings: 'Bookings',
    };

    // Map report types to table columns
    const getTableColumns = (type) => {
        switch (type) {
            case 'stations':
                return [
                    'Report ID',
                    'Reported On',
                    'Reported By',
                    'Station Name',
                    'Report Category',
                    'Status',
                    'Quick Actions'
                ];
            case 'chargers':
                return [
                    'Report ID',
                    'Reported On',
                    'Reported By',
                    'Station Name',
                    'Charger Name',
                    'Report Category',
                    'Status',
                    'Quick Actions'
                ];
            case 'bookings':
                return [
                    'Report ID',
                    'Reported On',
                    'Reported By',
                    'Station Name',
                    'Booking ID',
                    'Report Category',
                    'Status',
                    'Quick Actions'
                ];
            default:
                return [];
        }
    };

    // Format reports for DataTable
    const formatReportsForTable = (reportsData, type) => {
        return reportsData.map(report => {
            const baseData = {
                'Report ID': report.id,
                'Reported On': new Date(report.reportedOn).toLocaleDateString(),
                'Reported By': report.reportedBy,
                'Report Category': report.reportCategory,
                'Status': report.status.charAt(0).toUpperCase() + report.status.slice(1).replace('-', ' '),
                'Quick Actions': ['View']
            };

            switch (type) {
                case 'stations':
                    return {
                        ...baseData,
                        'Station Name': report.stationName
                    };
                case 'chargers':
                    return {
                        ...baseData,
                        'Station Name': report.stationName,
                        'Charger Name': report.chargerName
                    };
                case 'bookings':
                    return {
                        ...baseData,
                        'Station Name': report.stationName,
                        'Booking ID': report.bookingId
                    };
                default:
                    return baseData;
            }
        });
    };

    // Fetch reports from backend
    const fetchReports = async (type, page = 1) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            
            const queryParams = new URLSearchParams({
                type: type,
                page: page,
                limit: pagination.itemsPerPage,
                ...(search && { search: search }),
                ...(filter.status && filter.status !== 'all' && { status: filter.status }),
                ...(filter.category && { category: filter.category })
            });

            const response = await fetch(`${API_BASE_URL}/api/reports/all-reports?${queryParams}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch reports');
            }

            const data = await response.json();
            console.log('Fetched reports data:', data);
            
            if (data.success) {
                setReports(data.data);
                setPagination(data.pagination);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Error fetching reports:', error);
            toast.error('Failed to load reports');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!isSupportOfficer) {
            toast.error('Access denied. Support Officer role required.', {
                position: "top-right",
                autoClose: 3000
            });
            navigate('/auth?mode=login');
            return;
        }

        fetchReports(activeTab);
    }, [activeTab, search, filter, isSupportOfficer, navigate]);

    useEffect(() => {
        // Refetch when search or filter changes
        const debounceTimer = setTimeout(() => {
            fetchReports(activeTab, 1);
        }, 500);

        return () => clearTimeout(debounceTimer);
    }, [search, filter]);

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        setSearch('');
        setFilter({});
        setReports([]);
    };

    const handlePageChange = (newPage) => {
        fetchReports(activeTab, newPage);
    };

    const handleRowClick = (row) => {
        navigate(`/support-officer/fault-reports/${activeTab}/${row['Report ID']}`, { 
            state: { 
                reportData: row,
                reportType: activeTab 
            } 
        });
    };

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
                    setActiveTab={handleTabChange}
                    tabs={faultReportsTabs}
                    mobileLabels={mobileTabLabels}
                />
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
                            filterOptions={FaultReportsFilterOptions}
                            sortOptions={FaultReportsSortOptions}
                            searchPlaceholder={`Search ${activeTab} reports...`}
                            showExportButton={true}
                            onExport={() => {
                                console.log(`Exporting ${activeTab} report data...`);
                            }}
                        />

                        <OverviewCard padding='p-6'>
                            <div className="bg-white rounded-sm shadow-sm overflow-hidden"
                                style={{
                                    border: `1px solid ${COLORS.border}`,
                                    boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.05)'
                                }}>
                                {loading ? (
                                    <div className="flex justify-center items-center h-64">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                                    </div>
                                ) : (
                                    <DataTable
                                        columns={getTableColumns(activeTab)}
                                        data={formatReportsForTable(reports, activeTab)}
                                        filter={filter}
                                        sort={sort}
                                        search={search}
                                        onRowClick={handleRowClick}
                                        pagination={pagination}
                                        onPageChange={handlePageChange}
                                    />
                                )}
                            </div>
                        </OverviewCard>
                    </div>
                </div>

                {/* Right Side - 1/4 width */}
                <div className="lg:col-span-1">
                    <div className="sticky top-6 space-y-6">
                        <FaultReportRightPanel 
                            activeTab={activeTab} 
                            totalReports={pagination.totalItems}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}