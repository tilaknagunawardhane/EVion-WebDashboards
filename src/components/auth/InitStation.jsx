import {  useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate} from 'react-router-dom';
import Layout from '../../components/Layout'
import { COLORS, FONTS } from '../../constants'
import Button from '../ui/Button';
import InputField from '../ui/InputField';
import { FiEdit, FiMessageCircle } from 'react-icons/fi';
// import stationImage from '../../assets/cuate.svg'
import StationCard from '../ui/InitStationCard';


export default function InitStations() {

    const [stations, setStations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            const mockData = [
                {

                    name: 'EVion Station - Colombo 07',
                    status: 'Processing',
                    address: '21 Flower Road, Colombo 07',
                    powerTypes: ['AC', 'DC'],
                    numChargers: 2,
                    details: {
                    'Station Name': 'EVion Station - Colombo 07',
                    'Address Line': '21 Flower Road',
                    'District': 'Colombo',
                    'City': 'Colombo 07',
                    'Electricity Provider': 'CEB',
                    'Power Support': 'Both',
                    'Power Source Type': 'Grid',
                    'Number of Chargers': 2,
                    'Charger 1 Name': 'AC Charger 1',
                    'Charger 1 Power Type': 'AC',
                    'Charger 1 Max Power (kW)': '22',
                    'Charger 1 Connectors': 'Type 2, Tesla',
                    'Charger 2 Name': 'DC Charger 1',
                    'Charger 2 Power Type': 'DC',
                    'Charger 2 Max Power (kW)': '50',
                    'Charger 2 Connectors': 'CCS2, CHAdeMO',
                    }
                },

                {
                    name: 'EVion Supercharge – Kandy',
                    status: 'Approved - Waiting for Payment',
                    address: '45 Peradeniya Road, Kandy',
                    powerTypes: ['DC'],
                    numChargers: 3,
                    details: {
                    'Station Name': 'EVion Supercharge – Kandy',
                    'Address Line': '45 Peradeniya Road',
                    'District': 'Kandy',
                    'City': 'Kandy',
                    'Electricity Provider': 'LECO',
                    'Power Support': 'DC',
                    'Power Source Type': 'Hybrid',
                    'Number of Chargers': 3,
                    'Charger 1 Name': 'DC Fast 1',
                    'Charger 1 Power Type': 'DC',
                    'Charger 1 Max Power (kW)': '60',
                    'Charger 1 Connectors': 'CCS2, Tesla',
                    'Charger 2 Name': 'DC Fast 2',
                    'Charger 2 Power Type': 'DC',
                    'Charger 2 Max Power (kW)': '100',
                    'Charger 2 Connectors': 'CCS2, CHAdeMO',
                    'Charger 3 Name': 'DC Fast 3',
                    'Charger 3 Power Type': 'DC',
                    'Charger 3 Max Power (kW)': '150',
                    'Charger 3 Connectors': 'CCS2',
                    }
                },

                {
                    name: 'GreenVolt Station – Galle',
                    status: 'To be Installed',
                    address: '10 Light House Street, Galle Fort',
                    powerTypes: ['AC'],
                    numChargers: 1,
                    details: {
                    'Station Name': 'GreenVolt Station – Galle',
                    'Address Line': '10 Light House Street',
                    'District': 'Galle',
                    'City': 'Galle Fort',
                    'Electricity Provider': 'Private',
                    'Power Support': 'AC',
                    'Power Source Type': 'Solar',
                    'Number of Chargers': 1,
                    'Charger 1 Name': 'AC EcoPlug',
                    'Charger 1 Power Type': 'AC',
                    'Charger 1 Max Power (kW)': '11',
                    'Charger 1 Connectors': 'Type 2',
                    }
                }
            ];
            setStations(mockData);
            setLoading(false);
            }, 1000); // simulate 1s fetch
    }, []);
    
  return (
    <Layout>
        <div className="p-8 max-w-4xl mx-auto space-y-6 ">
            <h2 className="mb-6" style={{ fontFamily: FONTS.family.sans, fontSize: FONTS.sizes['2xl'], fontWeight: FONTS.weights.normal, color: COLORS.mainTextColor }}>Charging Stations</h2>
            {loading ? (
                <p className="text-center text-gray-500">Loading stations...</p>
            ) : (
                stations.map((station, idx) => (
                    <StationCard 
                        key={idx}
                        station={station}
                        onEdit={(station) => console.log('Edit:', station)}
                        onPay={(station) => console.log('Pay:', station)}
                        onRemove={(station) => console.log('Remove:', station)}
                    />
                ))
            )}
        </div>

        {/* Chat Icon */}
        <button className="fixed flex gap-1 bottom-6 right-6 bg-white shadow-lg p-4 rounded-full" style={{ backgroundColor: COLORS.primary}}>
            <FiMessageCircle size={24} color={COLORS.background} />
            <span style={{ color: COLORS.background }}>Chat</span>
        </button>
    </Layout>
  );
}