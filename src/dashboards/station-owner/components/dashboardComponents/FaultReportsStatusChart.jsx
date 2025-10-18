import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { COLORS, FONTS } from '../../../../constants';

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const STATUS_COLORS = {
  Reviewing: COLORS.star,
  Resolved: COLORS.primary,
  Rejected: COLORS.mainTextColor,
};

const FaultReportsChart = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReportsData = async () => {

      const token = localStorage.getItem('accessToken');
      const ownerId = localStorage.getItem('userID');

      if (!token || !ownerId) {
          setLoading(false);
          return;
      }

      try {
          const response = await axios.get(
              `${API_BASE_URL}/api/station-owner-dashboard/fault-reports`, { 
                headers: { 'Authorization': `Bearer ${token}` },
                params: { stationOwnerId: ownerId } 
              });
          
          setData(response.data.data || []);

      } catch (error) {
          console.error("Error fetching fault report status:", error);
          setData([]);

      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
      fetchReportsData();
  }, []);

  const hasReports = data.some(entry => entry.value > 0);

  if (loading) {
      return (
          <div className="p-6 bg-white rounded-xl shadow-sm w-full h-[320px] flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
      );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm w-full h-full">
      <div className="flex w-full justify-between items-center mb-4">
        <h2 className="text-base font-semibold" style={{ color: COLORS.mainTextColor }}>Fault Reports</h2>
      </div>

      {hasReports ? (
        <div className="w-full h-full">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={65}
                paddingAngle={3}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value} reports`, name]} />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                wrapperStyle={{ fontSize: FONTS.sizes.xs }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-full flex items-center justify-center text-sm text-gray-500">
          No active fault reports found.
        </div>
      )}
    </div>
  );
};

export default FaultReportsChart;
