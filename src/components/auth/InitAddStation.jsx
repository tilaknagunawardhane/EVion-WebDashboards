import { useState } from 'react';
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout'
import { COLORS, FONTS } from '../../constants'
import Button from '../ui/Button';
import InputField from '../ui/InputField';
import { FiEdit, FiMessageCircle } from 'react-icons/fi';
import stationImage from '../../assets/cuate.svg'


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

export default function LandingPage() {
    const [showForm, setShowForm] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [numChargers, setNumChargers] = useState(1);
    const [chargers, setChargers] = useState([
        { name: '', powerType: '', maxPower: '', connectors: []}
    ]);
    
    // const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        stationName: '',
        addressLine: '',
        district: '',
        city: '',
        electricityProvider: '',
        powerType: '',
        powerSource: '',
    });

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
        <div className="text-center py-8">
            <div className="flex w-full justify-center">
                <img src={stationImage} alt="Dashboard" className="w-auto h-72 object-cover rounded-lg" />
            </div>
            
            <h1 
            className="mb-0"
            style={{
                font: FONTS.weights.normal,
                fontSize: FONTS.sizes['4xl'],
                color: COLORS.mainTextColor
            }}
            >
            Hello Adeesha!
            </h1>
            <p 
            className="max-w-md mx-auto md:max-w-3xl mb-12"
            style={{
                font: FONTS.weights.normal,
                fontSize: FONTS.sizes.base,
                color: COLORS.secondaryText
            }}
            >
            Now you can add your charging station.
            </p>
            <div className="flex-column justify-center items-center">
                <Button variant="primary" type="button" onClick={ () => setShowForm(true)}>
                    Add Charging Station
                </Button>
                <p 
                className="mt-4 underline" 
                style={{ 
                    font: FONTS.weights.normal,
                    fontSize: FONTS.sizes.xs,
                    color: COLORS.secondaryText,
                }}
                >
                Installation Process & Charges
                </p>
            </div>
            {/* Chat Icon */}
            <button className="fixed flex gap-1 bottom-6 right-6 bg-white shadow-lg p-4 rounded-full" style={{ backgroundColor: COLORS.primary}}>
                <FiMessageCircle size={24} color={COLORS.background} />
                <span style={{ color: COLORS.background }}>Chat</span>
            </button>
        </div>

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
                                <Button variant="primary">Add Station</Button>
                            </div>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        )}
        </Layout>
    )
}