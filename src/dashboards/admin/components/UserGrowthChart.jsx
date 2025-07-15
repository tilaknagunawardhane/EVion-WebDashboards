import React from 'react';
import { Line } from 'react-chartjs-2';
import { COLORS } from '../../../constants'; // Changed from colors to constants
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

export default function UserGrowthChart({ data }) {
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'New Users',
        data: [1200, 1900, 3000, 5000, 2000, 3000, 4500],
        borderColor: COLORS.primary,
        backgroundColor: `${COLORS.primary}20`,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: 'white',
        pointBorderColor: COLORS.primary,
        pointBorderWidth: 2
      },
      {
        label: 'Active Users',
        data: [800, 1500, 2500, 4000, 1500, 2500, 3500],
        borderColor: COLORS.secondary,
        backgroundColor: `${COLORS.secondary}20`,
        tension: 0.4,
        fill: false,
        borderDash: [5, 5],
        pointBackgroundColor: 'white',
        pointBorderColor: COLORS.secondary,
        pointBorderWidth: 2
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
          usePointStyle: true
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw.toLocaleString()}`
        }
      },
      title: {
        display: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => value.toLocaleString()
        },
        grid: {
          color: COLORS.border,
          drawBorder: false
        }
      }
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 4,
        hoverRadius: 6
      }
    }
  };

  return (
    <div style={{ height: '300px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
}