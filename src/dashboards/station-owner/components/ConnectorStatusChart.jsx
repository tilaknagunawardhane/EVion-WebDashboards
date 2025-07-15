import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { COLORS, FONTS } from '../../../constants'; // Changed to match your other files
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

export default function ConnectorStatusChart() {
  const data = {
    labels: ['Free', 'In-use', 'Faulted', 'Offline/Unavailable'],
    datasets: [
      {
        data: [12, 8, 2, 3], // Sample data - replace with your actual counts
        backgroundColor: [
          COLORS.primary,       // Free
          COLORS.HighlightText, // In-use
          COLORS.danger,        // Faulted
          COLORS.secondaryText  // Offline
        ],
        borderColor: 'white',
        borderWidth: 2,
        cutout: '70%', // Makes it a donut chart
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
            family: FONTS.family?.sans || 'sans-serif',
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
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div style={{ height: '100%', width: '100%', padding: '16px' }}>
      <Doughnut data={data} options={options} />
    </div>
  );
}