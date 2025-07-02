import StationCard from '../components/StationCard'

const stations = [
  { id: 1, name: 'Downtown Station', location: '123 Main St', status: 'active', power: '50 kW' },
  { id: 2, name: 'Westside Station', location: '456 Oak Ave', status: 'maintenance', power: '100 kW' }
]

export default function StationsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold" style={{ color: '#2d3436' }}>My Stations</h1>
        <button className="px-4 py-2 rounded-md" style={{ backgroundColor: '#00b894', color: 'white' }}>
          Add Station
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stations.map(station => (
          <StationCard key={station.id} station={station} />
        ))}
      </div>
    </div>
  )
}