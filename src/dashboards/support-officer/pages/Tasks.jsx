import TaskList from '../components/TaskList'

const tasks = [
  {
    id: 1,
    title: 'Station Offline - Downtown Station',
    description: 'Station reported as offline by user. Need to investigate power supply issues.',
    station: 'Downtown Station',
    priority: 'high',
    status: 'open',
    createdAt: '2024-01-15 10:30 AM'
  },
  {
    id: 2,
    title: 'Payment System Error',
    description: 'Users unable to complete payments. Error code 500 appearing.',
    station: 'Westside Station',
    priority: 'medium',
    status: 'in_progress',
    createdAt: '2024-01-15 09:15 AM'
  },
  {
    id: 3,
    title: 'Network Connectivity Issues',
    description: 'Intermittent network connectivity affecting station operations.',
    station: 'Airport Station',
    priority: 'low',
    status: 'resolved',
    createdAt: '2024-01-14 03:45 PM'
  }
]

export default function TasksPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Support Tasks</h1>
        <div className="flex space-x-3">
          <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
            <option value="">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
            <option value="">All Status</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>
      <TaskList tasks={tasks} />
    </div>
  )
}
