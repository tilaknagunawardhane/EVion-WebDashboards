import React, { useState, useEffect } from 'react'
import { COLORS } from '../../../constants/colors'
import { FONTS } from '../../../constants/fonts'
import StatCard from '../components/StatCard'
import StationsIcon from '../../../assets/stations.svg'
import ConnectorsIcon from '../../../assets/connectors.svg'
import SessionsIcon from '../../../assets/sessions.svg'
import ElectricityIcon from '../../../assets/electricity.svg'
import IncomeIcon from '../../../assets/earnings2.svg'
import StationOwnerPageHeader from '../components/StationOwnerPageHeader'
import OverviewChart from '../components/dashboardComponents/OverviewChart'
import ConnectorStatusChart from '../components/dashboardComponents/ConnectorStatusChart'
import StackedSessionsChart from '../components/dashboardComponents/StackedSessionCard'
import MapCard from '../components/dashboardComponents/MapWithPopup'
import FaultReportsStatusCard from '../components/dashboardComponents/FaultReportsStatusChart'
import FourWeeksEarnings from '../components/dashboardComponents/FourWeeksEarnings'

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const STAT_TEMPLATES = [
    { title: 'Total Stations', key: 'totalStations', icon: StationsIcon, valueFormat: (v) => v?.padStart(2, '0'), showActive: true },
    { title: 'Total Chargers', key: 'totalChargers', icon: ConnectorsIcon, valueFormat: (v) => v?.padStart(2, '0'), showActive: false },
    { title: 'Sessions - Today', key: 'sessionsToday', icon: SessionsIcon, valueFormat: (v) => v?.padStart(2, '0'), showActive: true, activeKey: 'activeSessions' },
    { title: 'Electricity - Today', key: 'electricityToday', icon: ElectricityIcon, valueFormat: (v) => v, showActive: false },
    { title: 'Revenue - Today', key: 'revenueToday', icon: IncomeIcon, valueFormat: (v) => v, showActive: false, showTrend: true }
];

export default function DashboardPage() {

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {

    const ownerId = localStorage.getItem('userID');
    const token = localStorage.getItem('accessToken');

    if (!ownerId || !token) {
        setLoading(false);
        return;
    }

    try {
        const response = await axios.get(`${API_BASE_URL}/api/station-owner-dashboard/stats`, { 
            headers: { 'Authorization': `Bearer ${token}` },
            params: { stationOwnerId: ownerId} 
        });

        setStats(response.data.data);

    } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
      fetchStats();
  }, []);

  const renderedStats = STAT_TEMPLATES.map(template => {
      const rawValue = stats?.[template.key] || '00';
      const formattedValue = template.valueFormat ? template.valueFormat(rawValue) : rawValue;
      
      // This is where you recreate the necessary object structure for StatCard
      return {
          title: template.title,
          value: formattedValue,
          // Example of mapping properties:
          activeSessions: template.showActive ? (stats?.[template.activeKey] || '00') : undefined,
          icon: (
              <img 
                  src={template.icon} 
                  alt={template.title} 
                  style={{ width: template.title === 'Revenue - Today' ? 16 : 20, height: template.title === 'Revenue - Today' ? 16 : 20, color: COLORS.mainTextColor }} 
                  className={template.title === 'Revenue - Today' ? "mr-1" : ""}
              />
          ),
          // NOTE: You'll need separate logic to fetch and map the 'trend' data if available
          // trend: template.showTrend ? { value: 8.3, label: 'vs last week' } : undefined
      };
  });

  if (loading) {
      return (
          <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
      );
  }
  
  return (
    <div
      style={{
        fontFamily: FONTS.family.sans,
        padding: '24px',
        backgroundColor: COLORS.background,
      }}
    >
      <StationOwnerPageHeader title="Stations Overview" />

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 space-x-4 mb-4">
        {renderedStats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            activeSessions={stat.activeSessions}
            icon={stat.icon}
            // trend={stat.trend}
          />
        ))}
      </div>

      {/* Status Overview 1 */}
      <div className="flex flex-col lg:flex-row gap-4 w-full mb-4">
        <div className="w-full lg:w-2/5">
          <MapCard />
        </div>
        <div className="w-full lg:w-3/5">
          <OverviewChart />
        </div>

      </div>

      {/* Status Overview 2 */}
      <div className="flex flex-col lg:flex-row gap-4 w-full">

        <div className="w-full lg:w-2/5">
          <StackedSessionsChart />
        </div>

        <div className="w-full lg:w-1/5">
          <ConnectorStatusChart />
        </div>

        <div className="w-full lg:w-1/5">
          <FaultReportsStatusCard />
        </div>

        <div className="w-full lg:w-1/5">
          <FourWeeksEarnings />
        </div>

      </div>
    </div>
  )

}