export default function StationCard({ station }) {
  const statusColors = {
    active: { backgroundColor: '#E0F3EF', color: '#00b894' },
    maintenance: { backgroundColor: '#FFF8E1', color: '#D68400' },
    offline: { backgroundColor: '#FFEAEA', color: '#ff3b30' }
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium" style={{ color: '#2d3436' }}>{station.name}</h3>
          <span className="px-2 py-1 text-xs font-semibold rounded-full" style={statusColors[station.status]}>
            {station.status}
          </span>
        </div>
        <p className="mt-1 text-sm" style={{ color: '#959595' }}>{station.location}</p>
        <p className="mt-2 text-sm" style={{ color: '#2d3436' }}>Power: {station.power}</p>
        <div className="mt-4 flex space-x-3">
          <button className="text-sm font-medium" style={{ color: '#00b894' }}>
            Details
          </button>
          <button className="text-sm font-medium" style={{ color: '#959595' }}>
            Edit
          </button>
        </div>
      </div>
    </div>
  )
}