import React, { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from 'recharts';
import { Card, CardHeader, CardContent } from '../settingsComponents/Card';
import Button from '../../../../components/ui/Button';
import { COLORS, FONTS } from '../../../../constants';

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const OverviewChart = () => {

  const [selectedDays, setSelectedDays] = useState(14);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchChartData = useCallback(async (days) => {

      setLoading(true);

      const token = localStorage.getItem('accessToken');
      const ownerId = localStorage.getItem('userID');

      if (!token || !ownerId) {
          setLoading(false);
          return;
      }

      try {
          const response = await axios.get(
              `${API_BASE_URL}/api/station-owner-dashboard/overview?range=${days}`, 
              { headers: { 'Authorization': `Bearer ${token}` },
                params: { stationOwnerId: ownerId }
      });
          
          setData(response.data.data || []);

      } catch (error) {
          console.error(`Error fetching overview data for ${days} days:`, error);
          setData([]);

      } finally {
          setLoading(false);
      }
  }, []);

  useEffect(() => {
      fetchChartData(selectedDays);
  }, [selectedDays, fetchChartData]); 


  if (loading && data.length === 0) {
      return (
          <div className="p-6 bg-white rounded-xl shadow-sm w-full h-[320px] flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
      );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <div className="flex w-full justify-between items-center mb-4">
        <h2 className="text-base font-semibold" style={{color: COLORS.mainTextColor}}>Electricity Usage Overview</h2>
        <div className="flex gap-2">
          {[7, 14, 30].map((days) => (
            <Button
              key={days}
              variant={selectedDays === days ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedDays(days)}
            >
              Past {days} Days
            </Button>
          ))}
        </div>
      </div>

    <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
            <linearGradient id="colorElec" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00b894" stopOpacity={0.6} />
            <stop offset="95%" stopColor="#00b894" stopOpacity={0} />
            </linearGradient>
        </defs>
        <XAxis dataKey="day" style={{fontSize: FONTS.sizes.xs}}/>
        <YAxis unit=" MWh" style={{fontSize: FONTS.sizes.xs}}/>
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip
            content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
                const point = payload[0].payload;
                return (
                  <div className="shadow-lg p-3 rounded text-sm" style={{backgroundColor: COLORS.mainTextColor, color: 'white'}}>
                      <p className="font-semibold">{label}</p>
                      <p style={{color: COLORS.primary}}>Electricity Consumed: {point.electricity} MWh</p>
                      <p>Sessions: {point.sessions}</p>
                      <p>Income: LKR {point.income.toLocaleString()}</p>
                  </div>
                );
            }
            return null;
            }}
        />
        <Area
            type="monotone"
            dataKey="electricity"
            stroke="#00b894"
            fillOpacity={1}
            fill="url(#colorElec)"
        />
        </AreaChart>
    </ResponsiveContainer>

    </div>
  );
};

export default OverviewChart;
