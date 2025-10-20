import React, { useState, useEffect, useCallback } from 'react';
import { COLORS, FONTS } from '../../../../constants';
import Button from '../../../../components/ui/Button';
import OverviewCard from '../OverviewCard';
import StationsIcon from '../../../../assets/stations.svg'
import ConnectorsIcon from '../../../../assets/connectors.svg'
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 🟢 The component no longer accepts props for stations or requests
export default function ChargingStationsRightPanel() {
    const navigate = useNavigate();

    // 🟢 FIX 1: State structure to hold the direct numeric summary counts from the API
    const [summary, setSummary] = useState({
        totalStations: 0,
        stationsUnderReview: 0,
        totalChargers: 0,
        totalNewChargerRequests: 0,
    });
    const [loading, setLoading] = useState(true);

    // 🟢 Fetch API Data
    const fetchSummaryCounts = useCallback(async () => {
        const token = localStorage.getItem('accessToken');
        const adminId = localStorage.getItem('userID');
        
        if (!token || !adminId) {
            setLoading(false);
            return;
        }
        setLoading(true);

        try {
            const response = await axios.get(
                `${API_BASE_URL}/api/admin/summary-counts`,
                { 
                    headers: { 'Authorization': `Bearer ${token}` }, 
                    params: { adminId: adminId } 
                }
            );
            
            // 🟢 FIX 2: Map numeric results directly from the backend data field
            setSummary(response.data.data);

        } catch (error) {
            console.error('Error fetching request counts:', error);
            toast.error(error.response?.data?.message || 'Failed to load request summaries.');
            setSummary({ totalStations: 0, stationsUnderReview: 0, totalChargers: 0, totalNewChargerRequests: 0 });
        } finally {
             setLoading(false);
        }
    }, []);

    // 🟢 Trigger fetch on mount
    useEffect(() => {
        fetchSummaryCounts();
    }, [fetchSummaryCounts]);
    
    // Destructure required values
    const { totalStations, stationsUnderReview, totalChargers, totalNewChargerRequests } = summary;

    const renderGreenIcon = (IconComponent) => (
        <img
            src={IconComponent}
            alt=""
            className="w-5 h-5"
            style={{
                filter: `
                brightness(0) 
                saturate(100%) 
                invert(67%) 
                sepia(48%) 
                saturate(718%) 
                hue-rotate(123deg) 
                brightness(95%) 
                contrast(101%)
                `, 
            }}
        />
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-140px)]">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }
    
    return (
        <div
            className="rounded-xl border bg-white p-3 flex flex-col gap-6 h-[calc(100vh-140px)] overflow-y-auto"
            style={{
                borderColor: COLORS.stroke,
                background: COLORS.background,
                fontFamily: FONTS.family.sans,
            }}
        >

            <div>

                <Button
                    variant="primary"
                    type="button"
                    size="base"
                    style={{
                        backgroundColor: COLORS.primary,
                        color: COLORS.mainTextColor,
                        borderColor: COLORS.stroke,
                        padding: '2px 8px',
                    }}
                    className='mt-4 w-full mb-4'
                    onClick={() => navigate('/admin/stations/requests')}
                >
                    View all requests
                </Button>

                <OverviewCard>
                    <div className="flex flex-col gap-6 mb-2">
                        {/* Stations Section */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 flex items-center justify-center rounded-lg" style={{ backgroundColor: COLORS.bgGreen }}>
                                        {renderGreenIcon(StationsIcon)}
                                    </div>
                                    <div style={{ color: COLORS.mainTextColor, fontSize: FONTS.sizes.base, fontWeight: FONTS.weights.semibold }}>Charging Stations</div>
                                </div>
                            </div>
                            <div className="grid grid-rows-2 mt-2">
                                <div className="flex justify-between items-center mb-2">
                                    <div style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>Total Stations</div>
                                    {/* 🟢 Use fetched totalStations */}
                                    <div style={{ fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium }}>{totalStations}</div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>Stations Under Review</div>
                                    {/* 🟢 Use fetched stationsUnderReview */}
                                    <div style={{ fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium }}>{stationsUnderReview}</div>
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div style={{ width: '100%', height: '1px', backgroundColor: COLORS.stroke, margin: '2px 0' }}></div>

                        {/* Chargers Section */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 flex items-center justify-center rounded-lg" style={{ backgroundColor: COLORS.bgGreen }}>
                                        {renderGreenIcon(ConnectorsIcon)}
                                    </div>
                                    <div style={{ color: COLORS.mainTextColor, fontSize: FONTS.sizes.base, fontWeight: FONTS.weights.semibold }}>Chargers</div>
                                </div>
                            </div>
                            <div className="grid grid-rows-2 mt-2">
                                <div className="flex justify-between items-center mb-2">
                                    <div style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>Total Chargers</div>
                                    {/* 🟢 Use fetched totalChargers */}
                                    <div style={{ fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium }}>{totalChargers}</div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>New/Review Requests</div>
                                    {/* 🟢 Use fetched totalNewChargerRequests */}
                                    <div style={{ fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium }}>{totalNewChargerRequests}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </OverviewCard>
            </div>
        </div>
    );
}