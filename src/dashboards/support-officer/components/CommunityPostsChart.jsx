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

const postStatusData = [
  { 
    day: 'Mon', 
    approved: 45, 
    discarded: 8, 
    flagged: 3 
  },
  { 
    day: 'Tue', 
    approved: 52, 
    discarded: 12, 
    flagged: 5 
  },
  { 
    day: 'Wed', 
    approved: 38, 
    discarded: 6, 
    flagged: 2 
  },
  { 
    day: 'Thu', 
    approved: 41, 
    discarded: 9, 
    flagged: 4 
  },
  { 
    day: 'Fri', 
    approved: 35, 
    discarded: 7, 
    flagged: 6 
  },
  { 
    day: 'Sat', 
    approved: 28, 
    discarded: 5, 
    flagged: 2 
  },
  { 
    day: 'Sun', 
    approved: 31, 
    discarded: 4, 
    flagged: 1 
  },
]

export default function CommunityPostsChart() {
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
  { label: 'Discarded Posts', dataKey: 'discarded', color: COLORS.HighlightText },
  { label: 'Flagged Posts', dataKey: 'flagged', color: COLORS.danger },
];

const data = {
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
  }

  const totalPosts = postStatusData.reduce((sum, item) => 
    sum + item.approved + item.discarded + item.flagged, 0
  )
  const totalApproved = postStatusData.reduce((sum, item) => sum + item.approved, 0)
  const totalDiscarded = postStatusData.reduce((sum, item) => sum + item.discarded, 0)
  const totalFlagged = postStatusData.reduce((sum, item) => sum + item.flagged, 0)

  return (
    <div className="w-full">
      <div style={{ 
        height: '280px',
        // padding: '20px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
        marginBottom: '10px',
        border: `1px solid ${COLORS.border}`
      }}>
        <Bar data={data} options={options} />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
        <div className="text-center p-4 rounded-lg" style={{ backgroundColor: COLORS.background, border: `1px solid ${COLORS.border}` }}>
          <div className="text-2xl font-bold mb-1" style={{ color: COLORS.mainTextColor }}>{totalPosts}</div>
          <div className="font-medium" style={{ color: COLORS.secondaryText }}>Total Posts</div>
        </div>
        <div className="text-center p-4 rounded-lg" style={{ backgroundColor: COLORS.bgGreen, border: `1px solid ${COLORS.border}` }}>
          <div className="text-2xl font-bold mb-1" style={{ color: COLORS.primary }}>{totalApproved}</div>
          <div className="font-medium" style={{ color: COLORS.primary }}>Approved</div>
        </div>
        <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#FDF2E9', border: `1px solid ${COLORS.border}` }}>
          <div className="text-2xl font-bold mb-1" style={{ color: COLORS.HighlightText }}>{totalDiscarded}</div>
          <div className="font-medium" style={{ color: COLORS.HighlightText }}>Discarded</div>
        </div>
        <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#FEF1F1', border: `1px solid ${COLORS.border}` }}>
          <div className="text-2xl font-bold mb-1" style={{ color: COLORS.danger }}>{totalFlagged}</div>
          <div className="font-medium" style={{ color: COLORS.danger }}>Flagged</div>
        </div>
      </div>
    </div>
  )
}