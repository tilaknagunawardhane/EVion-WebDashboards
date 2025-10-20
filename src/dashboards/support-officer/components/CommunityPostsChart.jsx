import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { COLORS } from '../../../constants/colors'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default function CommunityPostsChart({ data }) {
  // Use the data from backend
  const total = data?.total || 0;
  const flagged = data?.flagged || 0;
  const pinned = data?.pinned || 0;
  const dailyData = data?.dailyData || [];
  
  // Calculate approved posts (total - flagged)
  const approved = total - flagged;

  // Use actual daily data from backend or fallback to empty array
  const postStatusData = dailyData.length > 0 ? dailyData : [
    { day: 'Mon', approved: 0, flagged: 0, pinned: 0 },
    { day: 'Tue', approved: 0, flagged: 0, pinned: 0 },
    { day: 'Wed', approved: 0, flagged: 0, pinned: 0 },
    { day: 'Thu', approved: 0, flagged: 0, pinned: 0 },
    { day: 'Fri', approved: 0, flagged: 0, pinned: 0 },
    { day: 'Sat', approved: 0, flagged: 0, pinned: 0 },
    { day: 'Sun', approved: 0, flagged: 0, pinned: 0 },
  ];

  const commonDatasetProps = {
    borderWidth: 1,
    borderRadius: {
      topLeft: 4,
      topRight: 4,
    },
    borderSkipped: false,
    maxBarThickness: 50,
    categoryPercentage: 0.8,
    barPercentage: 0.9,
  };

  const datasetConfigs = [
    { label: 'Approved Posts', dataKey: 'approved', color: COLORS.primary },
    { label: 'Pinned Posts', dataKey: 'pinned', color: COLORS.HighlightText },
    { label: 'Flagged Posts', dataKey: 'flagged', color: COLORS.danger },
  ];

  const chartData = {
    labels: postStatusData.map(item => item.day),
    datasets: datasetConfigs.map(config => ({
      ...commonDatasetProps,
      label: config.label,
      data: postStatusData.map(item => item[config.dataKey]),
      backgroundColor: `${config.color}CC`,
      borderColor: config.color,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 20,
        left: 10,
        right: 10,
        bottom: 10
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: COLORS.mainTextColor,
          font: {
            size: 12,
            weight: '500'
          },
          usePointStyle: true,
          padding: 20,
          boxWidth: 8,
          boxHeight: 8
        }
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'white',
        titleColor: COLORS.mainTextColor,
        bodyColor: COLORS.mainTextColor,
        borderColor: COLORS.border,
        borderWidth: 1,
        cornerRadius: 8,
        mode: 'index',
        intersect: false,
        padding: 12,
        titleFont: {
          size: 14,
          weight: '600'
        },
        bodyFont: {
          size: 13
        },
        callbacks: {
          footer: function(context) {
            let total = context.reduce((sum, item) => sum + item.parsed.y, 0);
            return `Total Posts: ${total}`;
          }
        }
      },
    },
    scales: {
      x: {
        stacked: false,
        grid: {
          display: false,
        },
        ticks: {
          color: COLORS.secondaryText,
          font: {
            size: 12,
            weight: '500'
          },
          padding: 8
        },
        border: {
          display: false,
        },
        title: {
          display: true,
          text: 'Days of the Week',
          color: COLORS.mainTextColor,
          font: {
            size: 13,
            weight: '600'
          },
          padding: 12
        }
      },
      y: {
        stacked: false,
        beginAtZero: true,
        grid: {
          color: COLORS.stroke,
          drawBorder: false,
          lineWidth: 1
        },
        ticks: {
          color: COLORS.secondaryText,
          font: {
            size: 12,
            weight: '500'
          },
          padding: 8,
          stepSize: 10
        },
        border: {
          display: false,
        },
        title: {
          display: true,
          text: 'Number of Posts',
          color: COLORS.mainTextColor,
          font: {
            size: 13,
            weight: '600'
          },
          padding: 12
        }
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
  };

  return (
    <div className="w-full">
      <div style={{ 
        height: '280px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
        marginBottom: '10px',
        border: `1px solid ${COLORS.border}`
      }}>
        <Bar data={chartData} options={options} />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
        <div className="text-center p-4 rounded-lg" style={{ backgroundColor: COLORS.background, border: `1px solid ${COLORS.border}` }}>
          <div className="text-2xl font-bold mb-1" style={{ color: COLORS.mainTextColor }}>{total}</div>
          <div className="font-medium" style={{ color: COLORS.secondaryText }}>Total Posts</div>
        </div>
        <div className="text-center p-4 rounded-lg" style={{ backgroundColor: COLORS.bgGreen, border: `1px solid ${COLORS.border}` }}>
          <div className="text-2xl font-bold mb-1" style={{ color: COLORS.primary }}>{approved}</div>
          <div className="font-medium" style={{ color: COLORS.primary }}>Approved</div>
        </div>
        <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#FDF2E9', border: `1px solid ${COLORS.border}` }}>
          <div className="text-2xl font-bold mb-1" style={{ color: COLORS.HighlightText }}>{pinned}</div>
          <div className="font-medium" style={{ color: COLORS.HighlightText }}>Pinned</div>
        </div>
        <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#FEF1F1', border: `1px solid ${COLORS.border}` }}>
          <div className="text-2xl font-bold mb-1" style={{ color: COLORS.danger }}>{flagged}</div>
          <div className="font-medium" style={{ color: COLORS.danger }}>Flagged</div>
        </div>
      </div>
    </div>
  )
}