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

export default function ReportTrendChart() {
  // Data matching the image with September dates and simpler values
  const chartData = {
    labels: ['1 Sep', '8 Sep', '15 Sep', '22 Sep', '29 Sep'],
    datasets: [
      {
        label: 'Broken Chargers',
        data: [10, 20, 40, 30, 50],
        borderColor: COLORS.primary,
        backgroundColor: `${COLORS.primary}20`,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: COLORS.primary,
      },
      {
        label: 'Closed Stations',
        data: [8, 15, 30, 25, 40],
        borderColor: COLORS.star,
        backgroundColor: `${COLORS.star}20`,
        tension: 0.4,
        fill: false,
        pointBackgroundColor: COLORS.star,
      },
      {
        label: 'Power Outage',
        data: [2, 5, 10, 5, 10],
        borderColor: COLORS.danger,
        backgroundColor: `${COLORS.danger}20`,
        tension: 0.4,
        fill: false,
        pointBackgroundColor: COLORS.danger,
      },
      {
        label: 'Slots Occupied',
        data: [4, 12, 4, 10, 2],
        borderColor: COLORS.mainTextColor,
        backgroundColor: `${COLORS.mainTextColor}20`,
        tension: 0.4,
        fill: false,
        pointBackgroundColor: COLORS.mainTextColor
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          boxWidth: 6,
          boxHeight: 6,
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
          label: (context) => `${context.dataset.label}: ${context.raw}`
        }
      },
    },
    
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        min: 0,
        max: 60,
        ticks: {
          stepSize: 10,
          callback: (value) => value
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
    <div style={{ 
      height: '300px',
      padding: '16px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)'
    }}>
      <Line data={chartData} options={options} />
    </div>
  );
}