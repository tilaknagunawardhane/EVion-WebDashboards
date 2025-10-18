import React, { useEffect, useState } from 'react';
import { COLORS, FONTS } from '../../../../constants';
import { useAuth } from '../../../../contexts/AuthContext';
import StationOwnerPageHeader from '../../components/StationOwnerPageHeader';
import EarningsSummary from '../../components/earningsComponents/EarningsSummary';
import EarningsTable from '../../components/earningsComponents/EarningsTable';
import PayoutHistory from '../../components/earningsComponents/PayoutHistory';
import RevenueBreakdownModal from '../../components/earningsComponents/RevenueBreakdownModal';
import TabBar from '../../../../components/ui/TabBar';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({ baseURL: API_BASE_URL });
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'earnings', label: 'Earnings History' },
    { id: 'payouts', label: 'Payout History' },
];

export default function EarningsPage() {
    const { isStationOwner } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState(null);
    const [earningsHistory, setEarningsHistory] = useState([]);
    const [payoutHistory, setPayoutHistory] = useState([]);
    const [selectedPeriod, setSelectedPeriod] = useState(null);
    const [isBreakdownModalOpen, setIsBreakdownModalOpen] = useState(false);
    const [breakdownData, setBreakdownData] = useState(null);

     useEffect(() => {
        if (isStationOwner) {
            fetchDashboardData();
        } else {
            setLoading(false);
        }
    }, [isStationOwner, activeTab]);


    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            console.log('Fetching data for tab:', activeTab);
            const userID = localStorage.getItem('userID');
            if (activeTab === 'overview') {
                const [statsRes, currentEarningsRes] = await Promise.all([
                    api.get(`/api/station-owner/earnings/current/${userID}`),
                    api.get(`/api/station-owner/payouts/${userID}`)
                ]);

                if (statsRes.data.success && currentEarningsRes.data.success) {
                    setDashboardData({
                        currentEarnings: statsRes.data.summary,
                        payoutHistory: currentEarningsRes.data.payouts.slice(0, 3)
                    });
                }
            } else if (activeTab === 'earnings') {
                const response = await api.get(`/api/station-owner/earnings/${userID}`);
                if (response.data.success) {
                    setEarningsHistory(response.data.earnings);
                }
            } else if (activeTab === 'payouts') {
                const response = await api.get(`/api/station-owner/payouts/${userID}`);
                if (response.data.success) {
                    setPayoutHistory(response.data.payouts);
                }
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleViewBreakdown = async (month, year) => {
        try {
            const userID = localStorage.getItem('userID');

            const response = await api.get(
                `/api/station-owner/earnings/detailed/${userID}?month=${month}&year=${year}`
            );
            
            if (response.data.success) {
                setBreakdownData({
                    month,
                    year,
                    earnings: response.data.earnings
                });
                setIsBreakdownModalOpen(true);
            }
        } catch (error) {
            console.error('Error fetching breakdown:', error);
        }
    };

    const getMonthName = (month) => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months[month - 1] || 'Unknown';
    };

    if (loading && activeTab === 'overview') {
        return (
            <div style={{ fontFamily: FONTS.family.sans, padding: '24px', backgroundColor: COLORS.background }}>
                <StationOwnerPageHeader title="Earnings & Payouts" />
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg">Loading earnings data...</div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ fontFamily: FONTS.family.sans, padding: '24px', backgroundColor: COLORS.background }}>
            <StationOwnerPageHeader title="Earnings & Payouts" />
            
            {/* Tab Navigation */}
            <div className="mb-6">
                <TabBar 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                    tabs={tabs} 
                />
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && dashboardData && (
                <div className="space-y-6">
                    <EarningsSummary 
                        data={dashboardData.currentEarnings}
                        onViewBreakdown={() => handleViewBreakdown(
                            new Date().getMonth() + 1,
                            new Date().getFullYear()
                        )}
                    />
                    
                    <PayoutHistory 
                        payouts={dashboardData.payoutHistory}
                        onViewAll={() => setActiveTab('payouts')}
                    />
                </div>
            )}

            {activeTab === 'earnings' && (
                <EarningsTable 
                    earnings={earningsHistory}
                    onViewBreakdown={handleViewBreakdown}
                    getMonthName={getMonthName}
                    loading={loading}
                />
            )}

            {activeTab === 'payouts' && (
                <PayoutHistory 
                    payouts={payoutHistory}
                    showAll={true}
                    loading={loading}
                />
            )}

            {/* Revenue Breakdown Modal */}
            <RevenueBreakdownModal
                isOpen={isBreakdownModalOpen}
                onClose={() => {
                    setIsBreakdownModalOpen(false);
                    setBreakdownData(null);
                }}
                data={breakdownData}
                getMonthName={getMonthName}
            />
        </div>
    );
}