import React, { useState } from 'react';
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

// Sample Data Generator
const generateData = (days) => {
  const data = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const label = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });

    data.push({
      date: label,
      bookings: Math.floor(Math.random() * 20),
      walkins: Math.floor(Math.random() * 10),
    });
  }

  return data;
};

const StackedSessionsChart = () => {
  const [range, setRange] = useState(14);
  const [chartData, setChartData] = useState(generateData(14));

  const updateRange = (days) => {
    setRange(days);
    setChartData(generateData(days));
  };

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
