import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StepOneForm from '../ui/StationForm';
import StepTwoForm from '../ui/ChargerForm';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function AddChargingStationForm({ onClose, onSubmit }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [numChargers, setNumChargers] = useState(1);
  const [chargers, setChargers] = useState([{
    name: '', 
    powerType: '', 
    maxPower: '', 
    connectors: [] 
  }]);
  const [districts, setDistricts] = useState([]);
  const [connectors, setConnectors] = useState({ AC: [], DC: [] });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    stationName: '',
    addressLine: '',
    district: '',
    city: '',
    electricityProvider: '',
    powerSource: '',
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        
        const [districtsRes, acRes, dcRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/common/districts`),
          axios.get(`${API_BASE_URL}/api/common/connectors/AC`),
          axios.get(`${API_BASE_URL}/api/common/connectors/DC`)
        ]);
        
        setDistricts(districtsRes.data?.data || []);
        setConnectors({
          AC: acRes.data?.data || [],
          DC: dcRes.data?.data || []
        });
      } catch (error) {
        toast.error('Failed to load initial data. Please try again.');
        console.error('Error fetching initial data:', error);
        setDistricts([]);
        setConnectors({ AC: [], DC: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const validateStepOne = () => {
    const newErrors = {};
    
    if (!formData.stationName.trim()) {
      newErrors.stationName = 'Station name is required';
    } else if (formData.stationName.trim().length < 3) {
      newErrors.stationName = 'Station name must be at least 3 characters';
    }
    
    if (!formData.district) {
      newErrors.district = 'District is required';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStepTwo = () => {
    const newErrors = { chargers: [] };
    let isValid = true;

    chargers.forEach((charger, index) => {
      const chargerErrors = {};
      
      if (!charger.name.trim()) {
        chargerErrors.name = 'Charger name is required';
        isValid = false;
      }
      
      if (!charger.powerType) {
        chargerErrors.powerType = 'Power type is required';
        isValid = false;
      }
      
      const maxPowerNum = parseFloat(charger.maxPower);
      
      if (!charger.maxPower || charger.maxPower.toString().trim() === '') {
        chargerErrors.maxPower = 'Max power is required';
        isValid = false;
      } else if (isNaN(maxPowerNum)) {
        chargerErrors.maxPower = 'Must be a valid number';
        isValid = false;
      } else if (maxPowerNum < 1 || maxPowerNum > 1000) {
        chargerErrors.maxPower = 'Must be between 1 and 1000 kW';
        isValid = false;
      }
      
      if (charger.connectors.length === 0) {
        chargerErrors.connectors = 'At least one connector is required';
        isValid = false;
      }
      
      if (Object.keys(chargerErrors).length > 0) {
        newErrors.chargers[index] = chargerErrors;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const updateNumChargers = (e) => {
    const count = parseInt(e.target.value, 10) || 1;
    setNumChargers(count);
    setChargers(Array.from({ length: count }, (_, i) => (
      chargers[i] || { 
        name: '', 
        powerType: '', 
        maxPower: '', 
        connectors: [] 
      }
    )));
  };

  const handleChargerChange = (index, field, value) => {
    const updated = [...chargers];
    updated[index][field] = value;
    
    if (field === 'powerType') {
      updated[index].connectors = [];
    }
    
    if (errors.chargers?.[index]?.[field]) {
      const newErrors = { ...errors };
      delete newErrors.chargers[index][field];
      setErrors(newErrors);
    }
    
    setChargers(updated);
  };

  const handleConnectorChange = (index, selected) => {
    const updated = [...chargers];
    updated[index].connectors = selected;
    
    if (errors.chargers?.[index]?.connectors) {
      const newErrors = { ...errors };
      delete newErrors.chargers[index].connectors;
      setErrors(newErrors);
    }
    
    setChargers(updated);
  };

  const handleNextStep = () => {
    if (validateStepOne()) {
      setCurrentStep(2);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
  };

  const submitStation = async () => {
    if (!validateStepTwo()) {
        toast.error('Please fix all errors before submitting');
        return;
    }

    setIsSubmitting(true);

    try {
        const stationData = {
            station_name: formData.stationName.trim(),
            address: formData.addressLine.trim(),
            district: formData.district,
            city: formData.city.trim(),
            electricity_provider: formData.electricityProvider || undefined,
            power_source: formData.powerSource || undefined,
            chargers: chargers.map(charger => ({
                charger_name: charger.name.trim(),
                power_type: charger.powerType,
                max_power_output: parseFloat(charger.maxPower),
                connector_types: charger.connectors
            }))
        };

        const stationOwnerID = localStorage.getItem('userID');
        const response = await axios.post(
            `${API_BASE_URL}/api/stations/create-station`,
            { stationOwnerID, ...stationData },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        toast.success('Station request submitted successfully!');
        onSubmit?.(response.data.data);
        
        // Navigate based on backend response
        if (response.data.shouldNavigateToDashboard) {
            navigate('/station-owner');
        } else {
            navigate('/initstation');
        }
        
        onClose();
    } catch (error) {
        console.error('Error submitting station:', error);
        const errorMessage = error.response?.data?.message || 
                           (error.response?.status === 401 ? 'Please login again' : 
                           'Failed to submit station. Please try again.');
        toast.error(errorMessage);
        
        if (error.response?.status === 401) {
            navigate('/login');
        }
    } finally {
        setIsSubmitting(false);
    }
};

  const getAvailableConnectors = (powerType) => {
    return powerType ? connectors[powerType] || [] : [];
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/10 flex items-center justify-center">
        <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-md max-h-[90vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/10 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-md max-h-[90vh] overflow-hidden">
        <div className="h-full overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-3xl font-extralight hover:text-gray-600"
            disabled={isSubmitting}
          >
            ×
          </button>

          <h2 className="text-2xl font-bold mb-6 text-center">
            {currentStep === 1 ? 'Station Information' : 'Charger Configuration'}
          </h2>

          {currentStep === 1 ? (
            <StepOneForm
              formData={formData}
              handleChange={handleChange}
              nextStep={handleNextStep}
              districts={districts}
              errors={errors}
              elecProviders={['CEB', 'LECO', 'Private']}
              sources={['Grid', 'Solar', 'Hybrid']}
              supportedPowerTypes={['AC', 'DC']}
            />
          ) : (
            <StepTwoForm
              numChargers={numChargers}
              updateNumChargers={updateNumChargers}
              chargers={chargers}
              handleChargerChange={handleChargerChange}
              handleConnectorChange={handleConnectorChange}
              getAvailableConnectors={getAvailableConnectors}
              goBack={handlePrevStep}
              onSubmit={submitStation}
              errors={errors}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      </div>
    </div>
  );
}