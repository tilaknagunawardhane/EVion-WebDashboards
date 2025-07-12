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

const elecProviders = [
    'CEB', 'LECO', 'Private'
];

const supportedPowerTypes = [
    'AC', 'DC', 'Both'
];

const powerTypes = [
    'AC', 'DC'
];

const districts = [
    'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 'Gampaha', 'Hambanthota', 'Jaffna', 'Kalutara', 'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar', 'Matale', 'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya'
];

const sources = [
    'Solar', 'Grid', 'Hybrid'
];

const ACconnectors = [
    'Type 1 (SAE J1772)', 'Type 2 (Mennekes)', 'Tesla'
];

const DCconnectors = [
    'CCS1', 'CCS2', 'CHAdeMO', 'GB/T (Chinese Standard)', 'Tesla'
]

export default function InitStations() {


    const [showForm, setShowForm] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [numChargers, setNumChargers] = useState(1);
    const [chargers, setChargers] = useState([
        { name: '', powerType: '', maxPower: '', connectors: []}
    ]);
    

    const [stations, setStations] = useState([]);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        stationName: '',
        addressLine: '',
        district: '',
        city: '',
        electricityProvider: '',
        powerType: '',
        powerSource: '',
    });

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

    const handleChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const nextStep = () => {
        setCurrentStep((prev) => prev + 1);
    };

    const handleChargerChange = (index, field, value) => {
        const updated = [...chargers];
        updated[index][field] = value;
        setChargers(updated);
    };

    const handleConnectorChange = (index, selected) => {
        const updated = [...chargers];
        updated[index].connectors = selected;
        setChargers(updated);
    };

    const updateNumChargers = (e) => {
        const count = parseInt(e.target.value, 10);
        setNumChargers(count);
        const newArray = Array.from({ length: count }, (_, i) => chargers[i] || {
            name: '', powerType: '', maxPower: '', connectors: []
        });
        setChargers(newArray);
    };

    const handleAddStation = () => {
        navigate('/initstation');
    };

    const closeForm = () => {
        setShowForm(false);
        setCurrentStep(1);
        setFormData({
        stationName: '',
        addressLine: '',
        district: '',
        city: '',
        electricityProvider: '',
        powerType: '',
        powerSource: '',
        });
    };
    
  return (
    <Layout>
        <div className="p-0 w-full max-w-6xl mx-auto space-y-6 ">

            <div className="flex flex-start justify-between">
                <h2 className="mb-6" style={{ fontFamily: FONTS.family.sans, fontSize: FONTS.sizes['2xl'], fontWeight: FONTS.weights.normal, color: COLORS.mainTextColor }}>Charging Stations</h2>
                <Button variant="primary" type="button" onClick={ () => setShowForm(true)}>
                    Add Charging Station
                </Button>
            </div>
            
            {loading ? (
                <p className="text-center text-gray-500">Loading stations...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <div className="fixed inset-0 z-50 backdrop-blur-xs bg-black/1 flex items-center justify-center">
                <div className="bg-white rounded-xl p-12 w-full max-w-2xl shadow-md h-[600px] overflow-hidden max-h-[90vh]">
                    <div className="h-full overflow-y-auto">
                        <button onClick={closeForm} className="absolute top-3 right-4 text-3xl font-extralight" style={{ color: COLORS.secondaryText }}>
                        ×
                        </button>

                        {/* Step 1: Station Details */}
                        {currentStep === 1 && (
                        <div >
                            <h2 className="text-2xl font-normal mb-6" style={{ color: COLORS.mainTextColor }}>
                            Charging Station Details
                            </h2>

                            <div className="flex-col space-y-4 mt-8">
                                <InputField
                                    label="Station Name"
                                    placeholder="Enter station name"
                                    value={formData.stationName}
                                    onChange={handleChange('stationName')}
                                    required
                                />
                                <div className="w-full">
                                    <div className="flex items-center gap-0 mb-0">
                                        <label
                                            className="block"
                                            style={{
                                                color: COLORS.mainTextColor,
                                                fontSize: FONTS.sizes.xs,
                                                fontWeight: FONTS.weights.normal,
                                            }}
                                        >
                                            District
                                        </label>
                                        <span style={{ color: COLORS.danger }}>*</span>
                                    </div>

                                    <select
                                        value={formData.district}
                                        onChange={handleChange('district')}
                                        required
                                        className="w-full rounded-lg border border-neutral-200 px-4 py-3 focus:outline-none focus:ring-1 focus:border-primary"
                                    >
                                        <option 
                                            value="" 
                                            style={{fontSize: FONTS.sizes.xs, fontWeight: FONTS.weights.normal}}
                                        >
                                            Select District
                                        </option>
                                        {districts.map((d) => (
                                            <option 
                                                key={d} 
                                                value={d} 
                                                style={{fontSize: FONTS.sizes.xs, fontWeight: FONTS.weights.normal}}
                                            >
                                                {d}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex gap-2">
                                    <InputField
                                        label="Address Line"
                                        placeholder="Enter address"
                                        value={formData.addressLine}
                                        onChange={handleChange('addressLine')}
                                    />
                                    <InputField
                                        label="City"
                                        placeholder="Enter city"
                                        value={formData.city}
                                        onChange={handleChange('city')}
                                        required
                                    />
                                </div>
                                <div className="w-full">
                                    <div className="flex items-center gap-1 mb-0">
                                        <label
                                            className="block mb-2"
                                            style={{
                                                color: COLORS.mainTextColor,
                                                fontSize: FONTS.sizes.xs,
                                                fontWeight: FONTS.weights.normal,
                                            }}
                                        >
                                            Supported Power Types
                                        </label>
                                        <span style={{ color: COLORS.danger }}>*</span>
                                    </div>
                                    <select
                                        value={formData.supportedPowerTypes}
                                        onChange={handleChange('powerType')}
                                        required
                                        className="w-full rounded-lg border border-neutral-200 px-4 py-3 focus:outline-none focus:ring-1 focus:border-primary"
                                    >
                                        <option 
                                            value="" 
                                            style={{fontSize: FONTS.sizes.xs, fontWeight: FONTS.weights.normal}}
                                        >
                                            Select Power Type
                                        </option>
                                        {supportedPowerTypes.map((d) => (
                                            <option 
                                                key={d} 
                                                value={d} 
                                                style={{fontSize: FONTS.sizes.xs, fontWeight: FONTS.weights.normal}}
                                            >
                                                {d}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-full">
                                        <label
                                            className="block mb-2"
                                            style={{
                                                color: COLORS.mainTextColor,
                                                fontSize: FONTS.sizes.xs,
                                                fontWeight: FONTS.weights.normal,
                                            }}
                                        >
                                            Electricity Provider
                                        </label>
                                        <select
                                            value={formData.electricityProvider}
                                            onChange={handleChange('electricityProvider')}
                                            className="w-full rounded-lg border border-neutral-200 px-4 py-3 focus:outline-none focus:ring-1 focus:border-primary"
                                        >
                                            <option 
                                                value="" 
                                                style={{fontSize: FONTS.sizes.xs, fontWeight: FONTS.weights.normal}}
                                            >
                                                Select Provider
                                            </option>
                                            {elecProviders.map((d) => (
                                                <option 
                                                    key={d} 
                                                    value={d} 
                                                    style={{fontSize: FONTS.sizes.xs, fontWeight: FONTS.weights.normal}}
                                                >
                                                    {d}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="w-full">
                                        <label
                                            className="block mb-2"
                                            style={{
                                                color: COLORS.mainTextColor,
                                                fontSize: FONTS.sizes.xs,
                                                fontWeight: FONTS.weights.normal,
                                            }}
                                        >
                                            Power Source Type
                                        </label>
                                        <select
                                            value={formData.powerSource}
                                            onChange={handleChange('powerSource')}
                                            className="w-full rounded-lg border border-neutral-200 px-4 py-3 focus:outline-none focus:ring-1 focus:border-primary"
                                        >
                                            <option 
                                                value="" 
                                                style={{fontSize: FONTS.sizes.xs, fontWeight: FONTS.weights.normal}}
                                            >
                                                Select Power Source
                                            </option>
                                            {sources.map((d) => (
                                                <option 
                                                    key={d} 
                                                    value={d} 
                                                    style={{fontSize: FONTS.sizes.xs, fontWeight: FONTS.weights.normal}}
                                                >
                                                    {d}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end">
                                <Button variant="primary" type="button" onClick={nextStep}>
                                    Next
                                </Button>
                            </div>
                        </div>
                        )}

                        {/* Future Steps */}
                        {currentStep === 2 && (
                        <div>
                            <h2 className="text-2xl font-normal mb-6" style={{ color: COLORS.mainTextColor }}>
                                Charger Details
                            </h2>
                            
                            <div className="flex-col space-y-4 mt-8">
                                <div className="mb-6">
                                    <label className="block mb-2"
                                        style={{
                                            color: COLORS.mainTextColor,
                                            fontSize: FONTS.sizes.xs,
                                            fontWeight: FONTS.weights.normal
                                    }}>
                                        Number of Chargers
                                    </label>
                                    <input
                                        type="number"
                                        min={1}
                                        value={numChargers}
                                        onChange={updateNumChargers}
                                            className={`w-full rounded-lg border transition-all duration-200 px-4 py-3 border-neutral-200 focus:border-primary focus:outline-none focus:ring-1`}
                                    />
                                </div>

                                {chargers.map((charger, index) => (
                                    <div key={index} className="mb-6 p-4 rounded-lg" style={{ backgroundColor: COLORS.background }}>
                                        <h4 className="text-md font-medium mb-3" style={{ color: COLORS.mainTextColor }}>
                                        Charger {index + 1}
                                        </h4>

                                        <div className="flex-col space-y-4 mt-4">
                                            <InputField
                                            label="Charger Name"
                                            value={charger.name}
                                            onChange={(e) => handleChargerChange(index, 'name', e.target.value)}
                                            // placeholder="e.g., AC Charger 1"
                                            required
                                            />


                                            <div className="mt-3">
                                                <div className="flex items-center gap-0 mb-0">
                                                    <label className="block mb-1 text-xs font-normal" style={{ color: COLORS.mainTextColor }}>
                                                        Power Type
                                                    </label>
                                                    <span style={{ color: COLORS.danger }}>*</span>
                                                </div>
                                                <select
                                                    value={charger.powerType}
                                                    onChange={(e) => handleChargerChange(index, 'powerType', e.target.value)}
                                                    className="w-full rounded-lg px-4 py-2"
                                                    required
                                                >
                                                    <option value="">Select</option>
                                                    {powerTypes.map((type) => (
                                                    <option key={type} value={type}>{type}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <InputField
                                            label="Maximum Power Output (kW)"
                                            type="number"
                                            value={charger.maxPower}
                                            onChange={(e) => handleChargerChange(index, 'maxPower', e.target.value)}
                                            placeholder="e.g., 22"
                                            className="mt-3"
                                            />

                                            <div className="mt-3">
                                                <div className="flex items-center gap-0 mb-0">
                                                    <label className="block mb-1 text-xs font-normal" style={{ color: COLORS.mainTextColor }}>
                                                        Connector Types (Multi-select)
                                                    </label>
                                                    <span style={{ color: COLORS.danger }}>*</span>
                                                </div>
                                                <div className="flex flex-wrap gap-6 mt-4">
                                                    {(charger.powerType === 'AC' ? ACconnectors
                                                    : charger.powerType === 'DC' ? DCconnectors
                                                    : [...new Set()])
                                                    .map((connector) => (
                                                        <label key={connector} className="flex items-center space-x-2 text-sm" style={{ color: COLORS.mainTextColor }}>
                                                        <input
                                                            type="checkbox"
                                                            value={connector}
                                                            required
                                                            checked={charger.connectors.includes(connector)}
                                                            onChange={(e) => {
                                                            const checked = e.target.checked;
                                                            const updated = [...charger.connectors];

                                                            if (checked) {
                                                                updated.push(connector);
                                                            } else {
                                                                const i = updated.indexOf(connector);
                                                                if (i > -1) updated.splice(i, 1);
                                                            }

                                                            handleConnectorChange(index, updated);
                                                            }}
                                                            className="ml-0"
                                                            style={{ accentColor: COLORS.primary }}
                                                        />
                                                        <span>{connector}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>

                            <div className="mt-8 flex justify-between">
                                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                                    Back
                                </Button>
                                <Button variant="primary" onClick={handleAddStation}>Add Station</Button>
                            </div>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        )}
    </Layout>
  );
}