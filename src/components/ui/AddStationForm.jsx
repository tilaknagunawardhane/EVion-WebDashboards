import React, { useState } from 'react';
import Button from '../ui/Button';
import InputField from '../ui/InputField';
import { useNavigate } from 'react-router-dom';
import { COLORS, FONTS } from '../../constants';
import StepOneForm from '../ui/StationForm';
import StepTwoForm from '../ui/ChargerForm';


const elecProviders = [
    'CEB', 'LECO', 'Private'
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

export default function AddChargingStationForm({ onClose, onSubmit }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [numChargers, setNumChargers] = useState(1);
  const [chargers, setChargers] = useState([
    { name: '', maxPower: '', connectors: [] }
  ]);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    stationName: '',
    addressLine: '',
    district: '',
    city: '',
    electricityProvider: '',
    powerSource: '',
  });

  const handleChange = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  const updateNumChargers = (e) => {
    const count = parseInt(e.target.value, 10);
    setNumChargers(count);
    const newArray = Array.from({ length: count }, (_, i) => chargers[i] || {
      name: '', maxPower: '', connectors: []
    });
    setChargers(newArray);
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

  const submit = () => {
    const station = {
      name: formData.stationName,
      address: `${formData.addressLine}, ${formData.city}`,
      district: formData.district,
      electricityProvider: formData.electricityProvider,
      powerSource: formData.powerSource,
      numChargers,
      chargers,
      status: 'Processing',
    };

    onSubmit?.(station);
    navigate('/initstation');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/10 flex items-center justify-center">
      <div className="bg-white rounded-xl p-12 w-full max-w-2xl shadow-md h-[600px] overflow-hidden max-h-[90vh]">
        <div className="h-full overflow-y-auto">
          <button onClick={onClose} className="absolute top-3 right-4 text-3xl font-extralight" style={{ color: COLORS.secondaryText }}>×</button>

          {currentStep === 1 ? (
            <StepOneForm 
                {...{ 
                    formData,
                    handleChange, 
                    nextStep: () => setCurrentStep(2),
                    districts,
                    elecProviders,
                    sources 
                }} />
          ) : (
            <StepTwoForm {...{
              numChargers,
              updateNumChargers,
              chargers,
              handleChargerChange,
              handleConnectorChange,
              goBack: () => setCurrentStep(1),
              onSubmit: submit,
            }} />
          )}
        </div>
      </div>
    </div>
  );
}