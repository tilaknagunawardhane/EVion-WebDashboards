import React, { useState, useEffect, useCallback } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import Button from '../../../../components/ui/Button';
import { COLORS, FONTS } from '../../../../constants';

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const StackedSessionsChart = () => {
  const [range, setRange] = useState(14);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchChartData = useCallback(async (currentRange) => {

      setLoading(true);

      const token = localStorage.getItem('accessToken');
      const ownerId = localStorage.getItem('userID');

      if (!token || !ownerId) {
          setLoading(false);
          return;
      }

      try {
          const response = await axios.get(
              `${API_BASE_URL}/api/station-owner-dashboard/sessions?range=${currentRange}`, 
              { headers: { 'Authorization': `Bearer ${token}` },
                params: { stationOwnerId: ownerId }
      });
          
          setChartData(response.data.data || []);

      } catch (error) {
          console.error(`Error fetching stacked sessions for range ${currentRange}:`, error);
          setChartData([]);

      } finally {
          setLoading(false);
      }
  }, []); // fetchChartData is stable as it only depends on props/state passed as arguments or non-changing hooks

  useEffect(() => {
      fetchChartData(range);
  }, [range, fetchChartData]);

  const updateRange = (days) => {
    setRange(days);
  };

  if (loading && chartData.length === 0) {
      return (
          <div className="p-6 bg-white rounded-xl shadow-sm w-full h-[320px] flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
      );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <div className="flex w-full justify-between items-center mb-4">
        <h2 className="text-base font-semibold" style={{color: COLORS.mainTextColor}}>
          Sessions Overview
        </h2>
        <div className="flex gap-2">
          {[7, 14, 30].map((d) => (
            <Button
              key={d}
              variant={range === d ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateRange(d)}
            >
              Past {d} days
            </Button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={chartData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" style={{fontSize: FONTS.sizes.xs}}/>
          <YAxis allowDecimals={false} label={{ value: 'Sessions', fontSize: '12px', angle: -90, position: 'insideLeft', offset: 25 }} style={{fontSize: FONTS.sizes.xs}} />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: FONTS.sizes.xs }}/>
          <Bar dataKey="bookings" stackId="a" fill="#2d3436" name="Bookings" />
          <Bar dataKey="walkins" stackId="a" fill="#00b894" name="Walk-ins" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StackedSessionsChart;
