import {  useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout'
import { COLORS, FONTS } from '../../constants'
import Button from '../ui/Button';
import InputField from '../ui/InputField';
import { FiEdit, FiMessageCircle } from 'react-icons/fi';
// import stationImage from '../../assets/cuate.svg'
import StationCard from '../ui/InitStationCard';
import AddChargingStationForm from '../ui/AddStationForm';

export default function InitStations() {


    const [showForm, setShowForm] = useState(false);
    const [stations, setStations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            const mockData = [
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
            {
                name: 'EVion Station – Kandy',
                status: 'Approved',
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
                name: 'EVion Station – Galle',
                status: 'To be Installed',
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
                status: 'Approved',
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
            ];

            setStations(mockData);
            setLoading(false);
            }, 1000); // simulate 1s fetch
    }, []);
    
  return (
    <Layout>
        <div className="p-0 w-full max-w-6xl mx-auto space-y-6 ">

            <div className="flex flex-start justify-between">
                <h2 className="mb-6" style={{ fontFamily: FONTS.family.sans, fontSize: FONTS.sizes['2xl'], fontWeight: FONTS.weights.normal, color: COLORS.mainTextColor }}>Charging Stations</h2>
                <div>
                <Button variant="primary" type="button" onClick={ () => setShowForm(true)}>
                    Add Charging Station
                </Button>
                </div>
            </div>
            
            {loading ? (
                <p className="text-center text-gray-500">Loading stations...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {stations.map((station, idx) => (
                        <StationCard 
                            key={idx}
                            station={station}
                            onEdit={(station) => console.log('Edit:', station)}
                            onPay={(station) => console.log('Pay:', station)}
                            onRemove={(station) => console.log('Remove:', station)}
                        />
                    ))}
                </div>
            )}
        </div>

        {/* Chat Icon */}
        <button className="fixed flex gap-1 bottom-6 right-6 bg-white shadow-lg p-4 rounded-full" style={{ backgroundColor: COLORS.primary}}>
            <FiMessageCircle size={24} color={COLORS.background} />
            <span style={{ color: COLORS.background }}>Chat</span>
        </button>

        {/* Modal Form */}
        {showForm && (
        <AddChargingStationForm
            onClose={() => setShowForm(false)}
            onSubmit={(newStation) => {
            setStations((prev) => [...prev, newStation]);
            }}
        />
        )}
    </Layout>
  );
}