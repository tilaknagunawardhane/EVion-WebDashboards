import {  useEffect, useState } from 'react';
import { COLORS, FONTS } from '../../../constants'
import { useNavigate } from 'react-router-dom';
import StationOwnerPageHeader from '../components/StationOwnerPageHeader'
import Button from '../../../components/ui/Button';
import StationCard from '../../../components/ui/InitStationCard';
import AddChargingStationForm from '../../../components/ui/AddStationForm';

export default function StationsPage() {
  const [showForm, setShowForm] = useState(false);
  const [stations, setStations] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
        const mockData = [
        {
            name: 'EviGO Charging Station Station',
            status: 'Active',
            address: '45 Peradeniya Road, Kandy',
            powerTypes: ['AC','DC'],
            electricityProvider: 'LECO',
            powerSource: 'Solar',
            numChargers: 3,
            chargers: [
            {
                name: 'HyperCharge Dual-Port DC',
                powerType: 'DC',
                maxPower: 150,
                connectors: ['CCS2', 'CHAdeMO'],
            },
            {
                name: 'FastCharge DC - Bay 01',
                powerType: 'DC',
                maxPower: 60,
                connectors: ['CCS2'],
            },
            {
                name: 'PowerFlow AC - Bay 02',
                powerType: 'AC',
                maxPower: 22,
                connectors: ['Type2'],
            },
            ],
        },
        {
            name: 'EVion Station – Galle',
            status: 'Active',
            address: '78 Lighthouse Street, Galle',
            powerTypes: ['AC'],
            electricityProvider: '',
            powerSource: 'Hybrid',
            numChargers: 3,
            chargers: [
            {
                name: 'AC Port A',
                powerType: 'AC',
                maxPower: 11,
                connectors: ['Type 2'],
            },
            {
                name: 'AC Port B',
                powerType: 'AC',
                maxPower: 22,
                connectors: ['Type 2', 'Tesla'],
            },
            {
                name: 'AC Port C',
                powerType: 'AC',
                maxPower: 7,
                connectors: ['Type 1'],
            },
            ],
        },
        {
            name: 'EVion Station – Kandy',
            status: 'Closed',
            address: '45 Peradeniya Road, Kandy',
            powerTypes: ['DC'],
            electricityProvider: 'CEB',
            powerSource: 'Grid',
            numChargers: 1,
            chargers: [
            {
                name: 'DC Fast Charger',
                powerType: 'DC',
                maxPower: 100,
                connectors: ['CCS2', 'CHAdeMO', 'Tesla'],
            },
            ],
        },
        {
            name: 'EVion Station – Nugegoda',
            status: 'Processing',
            address: '123 Highlevel Road, Nugegoda',
            powerTypes: ['AC', 'DC'],
            electricityProvider: 'LECO',
            powerSource: 'Solar',
            numChargers: 2,
            chargers: [
            {
                name: 'Charger 1',
                powerType: 'AC',
                maxPower: 22,
                connectors: ['Type 2', 'Tesla'],
            },
            {
                name: 'Charger 2',
                powerType: 'DC',
                maxPower: 50,
                connectors: ['CCS2', 'CHAdeMO'],
            },
            ],
        },
        ];

        setStations(mockData);
        setLoading(false);
        }, 10); // simulate 1s fetch
  }, []);

  const handleCardClick = (station) => {
    navigate(`/station-owner/stations/stationprofile/${station.id}`);
  };

  return (
    <div
      style={{
        fontFamily: FONTS.family.sans,
        padding: '24px',
        backgroundColor: COLORS.background,
      }}
    >
      <StationOwnerPageHeader title="My Stations" />

      <div className="p-0 w-full max-w-6xl mx-auto space-y-6 ">

          <div className="flex flex-start justify-between">
              <div className="flex w-full justify-end">
                <Button variant="primary" type="button" onClick={ () => setShowForm(true)}>
                    Add Charging Station
                </Button>
              </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stations.map((station, idx) => (
                  <StationCard 
                      key={idx}
                      station={station}
                      onClick={() => handleCardClick(station)}
                      onEdit={(station) => console.log('Edit:', station)}
                      onPay={(station) => console.log('Pay:', station)}
                      onRemove={(station) => console.log('Remove:', station)}
                  />
              ))}
          </div>
      
      </div>

      {showForm && (
        <AddChargingStationForm
            onClose={() => setShowForm(false)}
            onSubmit={(newStation) => {
            setStations((prev) => [...prev, newStation]);
            }}
        />
      )}
    </div>
  )
}