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
    maintainAspectRatio: true,
    aspectRatio: 1.5,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: COLORS.mainTextColor,
          font: {
            size: 12
          }
        }
      },
      title: {
        display: false,
      }
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
          }
        },
        border: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#f0f0f0',
          drawBorder: false,
        },
        ticks: {
          color: COLORS.secondaryText,
          font: {
            size: 12
          }
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
  }

  return (
    <div style={{ height: '300px' }}>
        <Bar data={data} options={options} />
    </div>
  )
}