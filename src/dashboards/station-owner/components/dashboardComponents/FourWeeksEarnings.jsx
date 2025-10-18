import React from 'react';
import { COLORS, FONTS } from '../../../../constants';

const earnings = [
  {
    week: 'This Week Revenue',
    amount: 'LKR 12,500',
    paymentDate: '21st July',
    received: false,
  },
  {
    week: 'Last Week',
    amount: 'LKR 10,800',
    paymentDate: '14th July',
    received: true,
  },
  {
    week: '2 Weeks Ago',
    amount: 'LKR 9,450',
    paymentDate: '7th July',
    received: true,
  },
];

const LastThreeWeeklyEarnings = () => {
  return (
    <div className="space-y-2 w-full py-6 px-4 shadow-sm rounded-xl h-full" style={{backgroundColor: 'white'}}>
      {/* This week's earnings with green background */}
      <div className="p-4 rounded-xl" style={{ backgroundColor: COLORS.bgGreen }}>
        <h3 className="text-xs font-medium" style={{color: COLORS.mainTextColor}}>{earnings[0].week}</h3>
        <p className="text-xl font-semibold">{earnings[0].amount}</p>
        <p className="text-[10px] mt-2 opacity-90">
          You’ll receive your payment by {earnings[0].paymentDate}
        </p>
      </div>

      {/* Previous two weeks */}
      {earnings.slice(1).map((item, idx) => (
        <div key={idx} className="px-4 py-2 rounded-xl" style={{ backgroundColor: COLORS.background }}>
          <h3 className="text-xs font-medium" style={{ color: COLORS.mainTextColor }}>{item.week}</h3>
          <p className="text-sm font-semibold" style={{ color: COLORS.mainTextColor }}>{item.amount}</p>
          <p className="text-[10px] mt-1" style={{color: COLORS.secondaryText}}>
            Received On: {item.paymentDate}
          </p>
        </div>
      ))}
    </div>
  );
};

export default LastThreeWeeklyEarnings;
