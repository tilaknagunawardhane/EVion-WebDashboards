import React, { useState } from 'react';
import { COLORS, FONTS } from '../../../../constants';
import Button from '../../../../components/ui/Button';

// Example breakdown data structure
const MOCK_BREAKDOWN = [
  {
    stationName: 'EviGO Charging Station',
    chargers: [
      { name: 'HyperCharge Dual-Port DC', units: 120, revenue: 3000 },
      { name: 'FastCharge DC - Bay 01', units: 100, revenue: 2500 },
    ],
  },
  {
    stationName: 'EVion Station-Kandy',
    chargers: [
      { name: 'PowerFlow AC - Bay 02', units: 80, revenue: 2000 },
    ],
  },
  {
    stationName: 'EviGO Charging Station-Devundara',
    chargers: [
      { name: 'AC Charger 1', units: 120, revenue: 3000 },
      { name: 'FastCharge DC', units: 100, revenue: 2500 },
    ],
  },
  {
    stationName: 'EVion Station-Polgasowita',
    chargers: [
      { name: 'PowerFlow AC - Bay 03', units: 80, revenue: 2000 },
    ],
  },
];

const week = 'July 15-21, 2025';
const subscriptionFee = 1000;

const WeeklyPayoutSummary = ({ data }) => {
  const [showBreakdown, setShowBreakdown] = useState(false);

  const totalRevenue = MOCK_BREAKDOWN.reduce(
    (total, station) =>
      total +
      station.chargers.reduce((sum, c) => sum + c.revenue, 0),
    0
  );

  const netRevenue = totalRevenue - subscriptionFee;

  return (
    <>
      <div className="space-y-4 mb-8">
        <div
          className="flex justify-between items-end rounded-xl px-8 py-6"
          style={{
            backgroundColor: COLORS.bgGreen,
            color: COLORS.mainTextColor,
          }}
        >
            <div>
                <h3 className="text-sm font-semibold mb-1">
                    This Week’s Earnings
                </h3>
                <div className="text-2xl font-bold">{data.thisWeek.amount} LKR</div>
                <div className="text-sm mt-1 font-normal">
                    You’ll receive your payment by{' '}
                    <span className="font-medium">{data.thisWeek.payoutDate}</span>
                </div>
            </div>

            <div>
                <Button 
                    variant="primary" 
                    type="button"
                    onClick={() => setShowBreakdown(true)}
                >
                    View Revenue Breakdown
                </Button>
            </div>
        </div>
      </div>

      {/* Revenue Breakdown Modal */}
      {showBreakdown && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/10 bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white w-full h-[600px] max-w-xl p-6 rounded-xl shadow-xl overflow-hidden">
                <div className="h-full overflow-y-auto">
                    <div className="flex justify-between items-center  mb-6">
                        <div>
                            <h2 className="text-2xl font-normal" style={{color: COLORS.mainTextColor}}>Revenue Breakdown</h2>
                            <p style={{fontSize:FONTS.sizes.sm, color:COLORS.secondaryText}}>Week: {week}</p>
                        </div>
                        <button
                            onClick={() => setShowBreakdown(false)}
                            className="text-gray-500 hover:text-black text-3xl"
                        >
                            &times;
                        </button>
                    </div>

                    {MOCK_BREAKDOWN.map((station, idx) => (
                    <div key={idx} className="mb-4">
                    <h3 className="font-medium text-base mb-2" style={{ color: COLORS.mainTextColor }}>
                        {station.stationName}
                    </h3>
                    <table className="w-full text-sm mb-2 table-fixed" style={{ color: COLORS.mainTextColor }}>
                        <thead>
                        <tr>
                            <th className="py-1 w-1/2 text-left">Charger</th>
                            <th className="py-1 w-1/4 text-right">Units</th>
                            <th className="py-1 w-1/4 text-right">Revenue (LKR)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {station.chargers.map((c, i) => (
                            <tr key={i}>
                            <td className="py-1 w-1/2 text-left">{c.name}</td>
                            <td className="py-1 w-1/4 text-right">{c.units}</td>
                            <td className="py-1 w-1/4 text-right">{c.revenue}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <hr className="my-3" style={{ color: COLORS.stroke }} />
                    </div>
                    ))}

                    {/* <hr className="my-3" /> */}
                    <div className="text-sm mb-6" style={{color: COLORS.mainTextColor}}>
                        <div className="flex justify-between mb-1">
                            <span>Total Revenue</span>

                            <div>
                                <span style={{fontSize: FONTS.sizes.base}}>{totalRevenue}</span>
                                <span style={{fontSize: FONTS.sizes.xs}}>LKR</span>
                            </div>
                            
                        </div>
                        <div className="flex justify-between mb-1" style={{color: COLORS.danger}}>
                            <span>Subscription Fee</span>
                            <div>
                                <span style={{fontSize: FONTS.sizes.base}}>-{subscriptionFee}</span>
                                <span style={{fontSize: FONTS.sizes.xs}}>LKR</span>
                            </div>
                        </div>
                        <div className="flex justify-between font-medium" style={{color:COLORS.primary}}>
                            <span>Net Payout</span>
                            <div>
                                <span style={{fontSize: FONTS.sizes['2xl']}}>{netRevenue}</span>
                                <span style={{fontSize: FONTS.sizes.xs}}>LKR</span>
                            </div>
                        </div>
                    </div>

                    <Button className="w-full" variant="primary">Download Report</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WeeklyPayoutSummary;
