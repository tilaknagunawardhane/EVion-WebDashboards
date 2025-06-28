export default function StationCard({ station }) {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    maintenance: 'bg-yellow-100 text-yellow-800',
    offline: 'bg-red-100 text-red-800'
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-gray-900">{station.name}</h3>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[station.status]}`}>
            {station.status}
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-500">{station.location}</p>
        <p className="mt-2 text-sm text-gray-700">Power: {station.power}</p>
        <div className="mt-4 flex space-x-3">
          <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
            Details
          </button>
          <button className="text-sm font-medium text-gray-600 hover:text-gray-500">
            Edit
          </button>
        </div>
      </div>
    </div>
  )
}