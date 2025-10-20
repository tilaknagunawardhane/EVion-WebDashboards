import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { COLORS } from '../../../constants/colors';
import { FONTS } from '../../../constants/fonts';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function FaultStatusChart({ underReview, resolved }) {
  const data = {
    labels: ['Resolved', 'Under Review'],
    datasets: [
      {
        data: [resolved, underReview],
        backgroundColor: [
          COLORS.primary,       // Resolved
          '#000000'             // Under Review
        ],
        borderColor: 'white',
        borderWidth: 2,
        cutout: '70%',
        borderRadius: 4,
        spacing: 2
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          color: COLORS.mainTextColor,
          font: {
            family: FONTS.family.sans,
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'white',
        titleColor: COLORS.mainTextColor,
        bodyColor: COLORS.secondaryText,
        borderColor: COLORS.border,
        borderWidth: 1,
        padding: 12,
        usePointStyle: true,
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  // Calculate totals for center display
  const total = resolved + underReview;

  return (
    <div style={{ height: '100%', width: '100%', padding: '16px', position: 'relative' }}>
      <Doughnut data={data} options={options} />
      <div style={{
        position: 'absolute',
        top: '35%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        pointerEvents: 'none'
      }}>
        <div style={{
          fontSize: '25px',
          fontWeight: 'bold',
          color: COLORS.mainTextColor,
          fontFamily: FONTS.family.sans
        }}>
          {total}
        </div>
        <div style={{
          fontSize: '12px',
          color: COLORS.secondaryText,
          fontFamily: FONTS.family.sans,
          marginTop: '0.1px'
        }}>
          Total Reports
        </div>
      </div>
    </div>
  );
}