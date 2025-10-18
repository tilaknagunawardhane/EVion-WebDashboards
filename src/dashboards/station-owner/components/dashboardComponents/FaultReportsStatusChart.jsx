import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { COLORS, FONTS } from '../../../../constants';

const STATUS_COLORS = {
  Open: COLORS.danger,
  Reviewing: COLORS.star,
  Resolved: COLORS.primary,
  Closed: COLORS.mainTextColor,
};

// Sample data
const data = [
  { name: 'Open', value: 1 },
  { name: 'Reviewing', value: 2 },
];

const FaultReportsChart = () => {
  const hasReports = data.some(entry => entry.value > 0);

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
          No fault reports found for Open or In Progress status.
        </div>
      )}
    </div>
  );
};

export default FaultReportsChart;
