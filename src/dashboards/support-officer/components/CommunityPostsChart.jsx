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
  const data = {
    labels: postStatusData.map(item => item.day),
    datasets: [
      {
        label: 'Approved Posts',
        data: postStatusData.map(item => item.approved),
        backgroundColor: '#10b981',
        borderColor: '#059669',
        borderWidth: 1,
        borderRadius: 0,
        borderSkipped: false,
        maxBarThickness: 30,
      },
      {
        label: 'Discarded Posts',
        data: postStatusData.map(item => item.discarded),
        backgroundColor: '#f59e0b',
        borderColor: '#d97706',
        borderWidth: 1,
        borderRadius: 0,
        borderSkipped: false,
        maxBarThickness: 30,
      },
      {
        label: 'Flagged Posts',
        data: postStatusData.map(item => item.flagged),
        backgroundColor: '#ef4444',
        borderColor: '#dc2626',
        borderWidth: 1,
        borderRadius: 0,
        borderSkipped: false,
        maxBarThickness: 30,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    // aspectRatio: 1.5,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#374151',
          font: {
            size: 12
          },
          usePointStyle: true,
          padding: 20,
          boxWidth: 10
        }
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'white',
        titleColor: '#374151',
        bodyColor: '#374151',
        borderColor: '#e0e0e0',
        borderWidth: 1,
        cornerRadius: 6,
        mode: 'index',
        intersect: false,
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
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          color: '#666',
          font: {
            size: 12
          }
        },
        border: {
          display: false,
        },
        title: {
          display: true,
          text: 'Days of the Week',
          color: '#374151',
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
      y: {
        stacked: true,
        beginAtZero: true,
        grid: {
          color: '#f0f0f0',
          drawBorder: false,
        },
        ticks: {
          color: '#666',
          font: {
            size: 12
          }
        },
        border: {
          display: false,
        },
        title: {
          display: true,
          text: 'Number of Posts',
          color: '#374151',
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
    },
  }

  const totalPosts = postStatusData.reduce((sum, item) => 
    sum + item.approved + item.discarded + item.flagged, 0
  )
  const totalApproved = postStatusData.reduce((sum, item) => sum + item.approved, 0)
  const totalDiscarded = postStatusData.reduce((sum, item) => sum + item.discarded, 0)
  const totalFlagged = postStatusData.reduce((sum, item) => sum + item.flagged, 0)

  return (
    <div>
      {/* <h2 className="text-2xl font-semibold text-gray-800 mb-6">Post Status Tracking by Day</h2> */}
      
      <div style={{ 
      height: '250px',
      padding: '16px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)'
    }}>
        <Bar data={data} options={options} />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800">{totalPosts}</div>
          <div>Total Posts</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{totalApproved}</div>
          <div>Approved Posts</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-600">{totalDiscarded}</div>
          <div>Discarded Posts</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">{totalFlagged}</div>
          <div>Flagged Posts</div>
        </div>
      </div>
    </div>
  )
}