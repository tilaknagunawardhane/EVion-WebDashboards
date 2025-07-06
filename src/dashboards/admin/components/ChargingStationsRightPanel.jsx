import React from 'react';
import { COLORS, FONTS } from '../../../constants';


export default function ChargingStationsRightPanel({ stations }) {
  // Placeholder summary logic
  const total = stations && stations.length ? stations.length : 2;
  const active = 1;
  const disabled = 1;
  const totalRevenue = '$20,500';

  return (
    <div
      className="rounded-xl border bg-white min-h-[300px] p-6 flex flex-col gap-6 shadow-sm"
      style={{
        borderColor: COLORS.stroke,
        background: COLORS.background,
        fontFamily: FONTS.family.sans,
      }}
    >
      <h2
        className="mb-2"
        style={{
          fontSize: FONTS.sizes.xl,
          fontWeight: FONTS.weights.bold,
          color: COLORS.mainTextColor,
        }}
      >
        Station Summary
      </h2>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span style={{ color: COLORS.secondaryText, fontSize: FONTS.sizes.sm }}>Total Stations</span>
          <span style={{ color: COLORS.primary, fontWeight: FONTS.weights.bold, fontSize: FONTS.sizes.lg }}>{total}</span>
        </div>
        <div className="flex justify-between items-center">
          <span style={{ color: COLORS.secondaryText, fontSize: FONTS.sizes.sm }}>Active</span>
          <span style={{ color: '#27ae60', fontWeight: FONTS.weights.bold, fontSize: FONTS.sizes.lg }}>{active}</span>
        </div>
        <div className="flex justify-between items-center">
          <span style={{ color: COLORS.secondaryText, fontSize: FONTS.sizes.sm }}>Disabled</span>
          <span style={{ color: COLORS.danger, fontWeight: FONTS.weights.bold, fontSize: FONTS.sizes.lg }}>{disabled}</span>
        </div>
        <div className="flex justify-between items-center">
          <span style={{ color: COLORS.secondaryText, fontSize: FONTS.sizes.sm }}>Total Revenue</span>
          <span style={{ color: COLORS.HighlightText, fontWeight: FONTS.weights.bold, fontSize: FONTS.sizes.lg }}>{totalRevenue}</span>
        </div>
      </div>
      <div className="mt-6 text-xs text-gray-400 text-center" style={{ fontFamily: FONTS.family.sans }}>
        (Dynamic data ready for DB integration)
      </div>
    </div>
  );
} 