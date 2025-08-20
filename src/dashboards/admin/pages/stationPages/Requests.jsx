// RequestsPage.js
import React, { useState, useEffect } from 'react';
import TabBar from '../../../../components/ui/TabBar';
import { COLORS, FONTS } from '../../../../constants';
import MainRequestCard from '../../components/requestComponents/MainRequestCard';
import DataTableTopBar from '../../../../components/ui/DataTableTopBar';
import { useNavigate } from 'react-router-dom';
import AdminPageHeader from '../../components/AdminPageHeader';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function RequestsPage() {
    // const [activeTab, setActiveTab] = useState('stations');
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState(null);
    const [sort, setSort] = useState('Date requested');
    // const [stationRequests, setStationRequests] = useState([]);
    const [chargerRequests, setChargerRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const filterOptions = [
        { label: 'All Districts', value: 'all' },
        { label: 'Colombo', value: 'colombo' },
        { label: 'Kandy', value: 'kandy' },
        { label: 'Galle', value: 'galle' },
    ];

    const sortOptions = [
        { label: 'Date requested', value: 'date' },
        { label: 'Station Type', value: 'stationType' },
        { label: 'Status', value: 'status' },
    ];

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_BASE_URL}/api/admin/get-requests`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });

                console.log('response is: ', response);

                if (response.data.success) {
                    // setStationRequests(response.data.data.stationRequests);
                    setChargerRequests(response.data.data);
                } else {
                    toast.error('Failed to fetch requests');
                }
            } catch (error) {
                console.error('Error fetching requests:', error);
                toast.error(error.response?.data?.message || 'Error fetching requests');
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    const groupRequestsByStatus = (requests) => {
        return {
            PROCESSING: requests.filter(r => r.status === 'PROCESSING'),
            'TO-BE-INSTALLED': requests.filter(r => r.status === 'TO_BE_INSTALLED'),
            REJECTED: requests.filter(r => r.status === 'REJECTED')
        };
    };

    // const currentRequests = activeTab === 'stations' ? stationRequests : connectorRequests;
    
    const filteredRequests = chargerRequests.filter(request => {
        if (filter && filter !== 'all') {
            return request.district.toLowerCase() === filter.toLowerCase();
        }
        return true;
    });

    const sortedRequests = [...filteredRequests].sort((a, b) => {
        if (sort === 'Date requested') {
            return new Date(b.date) - new Date(a.date);
        } else if (sort === 'User Type') {
            return a.userType.localeCompare(b.userType);
        } else if (sort === 'Status') {
            return a.status.localeCompare(b.status);
        }
        return 0;
    });

    const groupedRequests = groupRequestsByStatus(sortedRequests);

    // const requestTabs = [
    //     { id: 'stations', label: 'Stations' },
    //     { id: 'connectors', label: 'Connectors' }
    // ];

    if (loading) {
        return (
            <div style={{
                fontFamily: FONTS.family.sans,
                padding: '24px',
                backgroundColor: COLORS.background,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div style={{
            fontFamily: FONTS.family.sans,
            padding: '24px',
            backgroundColor: COLORS.background,
        }}>
            <AdminPageHeader title="New Charger Requests"/>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                {/* <div className="w-full sm:w-auto">
                    <TabBar
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        tabs={requestTabs}
                    />
                </div> */}

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
                        showSearchBar={true}
                        searchPlaceholder="Search requests..."
                        showExportButton={false}
                    />
                </div>
            </div>

            <div className="space-y-6">
                {Object.entries(groupedRequests).map(([status, requests]) => (
                    requests.length > 0 && (
                        <div key={status} className="space-y-4">
                            <h2 className="text-lg font-semibold" style={{
                                color: COLORS.mainTextColor,
                                fontFamily: FONTS.family.sans
                            }}>
                                {status} ({requests.length})
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {requests.map(request => (
                                    <MainRequestCard
                                        key={request.id}
                                        request={{
                                            ...request,
                                            stationAddress: `Type: ${request.powerType} Charger`
                                        }}
                                        // onClick={() => navigate(`/admin/requests/${request.type}/${request.id}`)}
                                        onClick={() => navigate(`/admin/stations/requests/${request.id}`)}
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