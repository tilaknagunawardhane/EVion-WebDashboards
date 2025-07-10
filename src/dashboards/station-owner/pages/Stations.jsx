import StationCard from '../components/StationCard'
import { COLORS, FONTS } from '../../../constants'

const stations = [
  { 
    id: 1, 
    name: 'Downtown Station', 
    location: '123 Main St', 
    status: 'active', 
    power: '50 kW' 
  },
  { 
    id: 2, 
    name: 'Westside Station', 
    location: '456 Oak Ave', 
    status: 'maintenance', 
    power: '100 kW' 
  },
  { 
    id: 3, 
    name: 'Northside Station', 
    location: '789 Pine Rd', 
    status: 'active', 
    power: '75 kW' 
  }
]

export default function StationsPage() {
  return (
    <div style={{ fontFamily: FONTS.family.sans }}>
      <div className="flex justify-between items-center mb-6">
        <h1 
          className="text-2xl font-bold" 
          style={{ color: COLORS.mainTextColor }}
        >
          My Stations
        </h1>
        <button 
          className="px-4 py-2 rounded-md font-medium"
          style={{ 
            backgroundColor: COLORS.primary, 
            color: 'white' 
          }}
        >
          Add Station
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stations.map(station => (
          <StationCard key={station.id} station={station} />
        ))}
      </div>
    </div>
  )
}