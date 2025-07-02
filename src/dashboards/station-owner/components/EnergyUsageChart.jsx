import React from 'react';
import { Line } from 'react-chartjs-2';
import { COLORS } from '../../../constants/colors';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function EnergyUsageChart() {
  // Sample data for the chart
  const data = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
    datasets: [
      {
        label: 'Energy Usage (kW)',
        data: [120, 190, 300, 500, 200, 300, 450],
        borderColor: COLORS.primary,
        backgroundColor: `${COLORS.primary}40`, // Adds opacity
        tension: 0.4,
        fill: true,
        pointBackgroundColor: 'white',
        pointBorderColor: COLORS.primary,
        pointBorderWidth: 2,
        pointRadius: 4,
        borderWidth: 2
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
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
          label: (context) => `${context.dataset.label}: ${context.raw} kW`
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: COLORS.secondaryText
        }
      },
      y: {
        grid: {
          color: COLORS.border,
          drawBorder: false
        },
        ticks: {
          color: COLORS.secondaryText,
          callback: (value) => `${value} kW`
        }
      }
    }
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Line data={data} options={options} />
    </div>
  );
}