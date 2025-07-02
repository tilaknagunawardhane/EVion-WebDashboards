export default function TaskList({ tasks }) {
  const priorityColors = {
    high: { backgroundColor: '#FFEAEA', color: '#ff3b30' },
    medium: { backgroundColor: '#FFF8E1', color: '#D68400' },
    low: { backgroundColor: '#E0F3EF', color: '#00b894' }
  }

  const statusColors = {
    open: { backgroundColor: '#E0F3EF', color: '#00b894' },
    in_progress: { backgroundColor: '#FFF8E1', color: '#D68400' },
    resolved: { backgroundColor: '#E0F3EF', color: '#00b894' },
    closed: { backgroundColor: '#f9f9f9', color: '#959595' }
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium mb-4" style={{ color: '#2d3436' }}>
          Support Tasks
        </h3>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="border rounded-lg p-4" style={{ borderColor: '#dedede' }}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="text-sm font-medium" style={{ color: '#2d3436' }}>{task.title}</h4>
                  <p className="text-sm mt-1" style={{ color: '#959595' }}>{task.description}</p>
                  <div className="mt-2 flex items-center space-x-4">
                    <span className="text-xs" style={{ color: '#959595' }}>
                      Station: {task.station}
                    </span>
                    <span className="text-xs" style={{ color: '#959595' }}>
                      Created: {task.createdAt}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full" style={priorityColors[task.priority]}>
                    {task.priority}
                  </span>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full" style={statusColors[task.status]}>
                    {task.status}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex space-x-3">
                <button className="text-sm font-medium" style={{ color: '#00b894' }}>
                  View Details
                </button>
                <button className="text-sm font-medium" style={{ color: '#2d3436' }}>
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
