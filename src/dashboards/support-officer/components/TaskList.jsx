export default function TaskList({ tasks }) {
  const priorityColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  }

  const statusColors = {
    open: 'bg-blue-100 text-blue-800',
    in_progress: 'bg-yellow-100 text-yellow-800',
    resolved: 'bg-green-100 text-green-800',
    closed: 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
          Support Tasks
        </h3>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">{task.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                  <div className="mt-2 flex items-center space-x-4">
                    <span className="text-xs text-gray-500">
                      Station: {task.station}
                    </span>
                    <span className="text-xs text-gray-500">
                      Created: {task.createdAt}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${priorityColors[task.priority]}`}>
                    {task.priority}
                  </span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[task.status]}`}>
                    {task.status}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex space-x-3">
                <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                  View Details
                </button>
                <button className="text-sm font-medium text-green-600 hover:text-green-500">
                  Update Status
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
