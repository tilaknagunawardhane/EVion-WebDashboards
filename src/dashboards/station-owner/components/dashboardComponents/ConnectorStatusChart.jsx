import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { COLORS, FONTS } from '../../../../constants';

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const STATUS_COLORS = {
  Charging: COLORS.primary,
  Free: COLORS.star,
  Reserved: COLORS.mainTextColor,
};

const ConnectorStatusChart = () => {

  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchChartData = async () => {

      const token = localStorage.getItem('accessToken');
      const ownerId = localStorage.getItem('userID');

      if (!token || !ownerId) {
          setLoading(false);
          return;
      }

      try {
          const response = await axios.get(
              `${API_BASE_URL}/api/station-owner-dashboard/connector-status`, { 
                headers: { 'Authorization': `Bearer ${token}` },
                params: { stationOwnerId: ownerId } 
              });
          
          // Ensure data defaults to 0 if the API returns an empty array or no data
          setChartData(response.data.data || []); 

      } catch (error) {
          console.error("Error fetching connector status:", error);
          
          setChartData([
              { name: 'Charging', value: 0 },
              { name: 'Free', value: 0 },
              { name: 'Reserved', value: 0},
          ]);
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {

      fetchChartData();
      
      // Set up polling for real-time data (e.g., every 30 seconds)
      const intervalId = setInterval(fetchChartData, 30000); 

      // Cleanup function to clear the interval when the component unmounts
      return () => clearInterval(intervalId);

  }, []); // Empty dependency array ensures it runs only on mount/unmount

  if (loading) {
      return (
          <div className="p-6 bg-white rounded-xl shadow-sm w-full h-[320px] flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
      );
  }

  const totalConnectors = chartData.reduce((sum, entry) => sum + entry.value, 0);
  
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm w-full h-full">
        <div flex w-full justify-between items-center mb-4>
            <h2 className="text-base font-semibold" style={{color: COLORS.mainTextColor}}>Connector Status({totalConnectors} Total)</h2>
        </div>
        <div className="w-full h-full">
            <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={65}
                    paddingAngle={3}
                    // label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                    {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name]} />
                    ))}
                </Pie>
                <Tooltip
                    formatter={(value, name) => [`${value} connectors`, name]}
                />
                <Legend layout="horizontal" verticalAlign="bottom" wrapperStyle={{ fontSize: FONTS.sizes.xs }} />
                </PieChart>
            </ResponsiveContainer>
        </div>        
    </div>
  );
};

export default ConnectorStatusChart;
