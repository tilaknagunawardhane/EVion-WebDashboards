import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { COLORS, FONTS } from '../../../../constants';

const STATUS_COLORS = {
  Charging: COLORS.primary,
  Free: COLORS.free,
  Reserved: COLORS.star,
  Reported: COLORS.danger,
  Offline: COLORS.mainTextColor,
};

const data = [
  { name: 'Charging', value: 7 },
  { name: 'Free', value: 10 },
  { name: 'Reserved', value: 3},
  { name: 'Reported', value: 1 },
  { name: 'Offline', value: 2 },
];

const ConnectorStatusChart = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm w-full h-full">
        <div flex w-full justify-between items-center mb-4>
            <h2 className="text-base font-semibold" style={{color: COLORS.mainTextColor}}>Connector Status</h2>
        </div>
        <div className="w-full h-full">
            <ResponsiveContainer width="100%" height={260}>
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
                    // label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                    {data.map((entry, index) => (
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
