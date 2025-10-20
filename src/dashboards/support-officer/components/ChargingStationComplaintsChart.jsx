import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { COLORS } from '../../../constants/colors';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ChargingStationComplaintsChart({ data }) {
  // Use the data from backend or fallback to empty array
  const complaintsData = data || [];

  console.log('ChargingStationComplaintsChart received data:', complaintsData);

  // If no data, show a message
  if (complaintsData.length === 0) {
    return (
      <div
        style={{
          height: '300px',
          padding: '16px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <p style={{ color: COLORS.secondaryText, fontSize: '14px' }}>
          No report data available
        </p>
      </div>
    );
  }

  // Prepare chart data - use displayName which combines station and charger
  const chartData = {
    labels: complaintsData.map(item => {
      const name = item.displayName || item.stationName || 'Unknown';
      // Truncate long names for better display
      return name.length > 25 ? name.substring(0, 25) + '...' : name;
    }),
    datasets: [
      {
        label: 'Number of Reports',
        data: complaintsData.map(item => item.reportCount),
        backgroundColor: COLORS.primary,
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

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
        backgroundColor: 'white',
        titleColor: COLORS.mainTextColor,
        bodyColor: COLORS.secondaryText,
        borderColor: COLORS.border,
        borderWidth: 1,
        padding: 12,
        usePointStyle: true,
        callbacks: {
          title: (context) => {
            const index = context[0].dataIndex;
            const item = complaintsData[index];
            return item.displayName || item.stationName || 'Unknown';
          },
          label: (context) => {
            return `Reports: ${context.raw}`;
          },
          afterLabel: (context) => {
            const index = context.dataIndex;
            const item = complaintsData[index];
            const details = [];
            if (item.stationName) {
              details.push(`Station: ${item.stationName}`);
            }
            if (item.chargerName) {
              details.push(`Charger: ${item.chargerName}`);
            }
            return details;
          }
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
            size: 10
          },
          maxRotation: 45,
          minRotation: 45
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
          stepSize: 1,
          precision: 0
        },
        border: {
          display: false,
        },
        title: {
          display: true,
          text: 'Number of Reports',
          color: COLORS.mainTextColor,
          font: {
            size: 13,
            weight: '600'
          },
          padding: 8
        }
      },
    },
  };

  return (
    <div
      style={{
        height: '300px',
        padding: '16px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Bar data={chartData} options={options} />
    </div>
  );
}