import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors,
} from 'chart.js'

import { COLORS } from '../../../constants/colors';


// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const complaintsData = [
  { station: 'Station A', complaints: 12 },
  { station: 'Station B', complaints: 8 },
  { station: 'Station C', complaints: 15 },
  { station: 'Station D', complaints: 6 },
  { station: 'Station E', complaints: 9 },
  { station: 'Station F', complaints: 18 },
]

export default function ChargingStationComplaintsChart() {
  const data = {
    labels: complaintsData.map(item => item.station),
    datasets: [
      {
        label: 'Number of Complaints',
        data: complaintsData.map(item => item.complaints),
        backgroundColor: COLORS.primary,
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: COLORS.mainTextColor,
          font: {
            size: 12
          },
          usePointStyle: true,
          padding: 20,
          boxWidth: 10,
        },
      },
      tooltip: {
        backgroundColor: 'white', // Match RevenueTrendChart
        titleColor: COLORS.mainTextColor,
        bodyColor: COLORS.secondaryText,
        borderColor: COLORS.border,
        borderWidth: 1,
        padding: 12,
        usePointStyle: true,
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}`,
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: COLORS.secondaryText,
          font: {
            size: 12
          },
        },
        border: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: COLORS.border,
          drawBorder: false,
        },
        ticks: {
          color: COLORS.secondaryText,
          font: {
            size: 12
          },
          // callback: (value) => value,
        },
        border: {
          display: false,
        },
        title: {
          display: true,
          text: 'Number of Complaints',
          color: COLORS.mainTextColor,
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
    },
    elements: {
      bar: {
        // borderWidth: 2,
      },
    },
  }

  return (
    <div
      style={{
        height: '300px', // Match RevenueTrendChart
        padding: '16px', // Match RevenueTrendChart
        backgroundColor: 'white', // Match OverviewCard
        borderRadius: '8px', // Match OverviewCard
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)', // Match OverviewCard
      }}
    >
      <Bar data={data} options={options} />
    </div>
  )
}