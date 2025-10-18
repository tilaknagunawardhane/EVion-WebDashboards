import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StepOneForm from '../ui/StationForm';
import StepTwoForm from '../ui/ChargerForm';
import { MapModal } from '../ui/MapComponents';
import { LoadScript } from '@react-google-maps/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Default form data structure
const defaultFormData = {
  stationName: '',
  addressLine: '',
  district: '',
  city: '',
  _id: '',
  electricityProvider: '',
  powerSource: '',
};

export default function AddChargingStationForm({ onClose, onSubmit, isEdit = false, stationId: propStationId, stationToEdit }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [numChargers, setNumChargers] = useState(1);
  const [chargers, setChargers] = useState([{
    name: '',
    powerType: '',
    maxPower: '',
    price: '',
    status: 'processing',
    connectors: []
  }]);
  const [districts, setDistricts] = useState([]);
  const [connectors, setConnectors] = useState({ AC: [], DC: [] });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showMapModal, setShowMapModal] = useState(false);
  const { id: paramStationId } = useParams();
  const [locationData, setLocationData] = useState(null);

  // Initialize formData with default values
  const [formData, setFormData] = useState(defaultFormData);

  // Handler for setting location from map
  const handleSetLocationOnMap = () => {
    setShowMapModal(true);
  };

  const handleLocationSelect = (location, address = '') => {
    setLocationData(location);

    // Auto-fill address if available
    if (address) {
      setFormData(prev => ({
        ...prev,
        addressLine: address
      }));
    }
  };

  // Prefer propStationId over paramStationId
  const stationId = propStationId || paramStationId;

  const navigate = useNavigate();

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

        if (isEdit && stationId) {
          const stationOwnerID = localStorage.getItem('userID');
          console.log('Making request to edit station:', stationId);
          const response = await axios.post(
            `${API_BASE_URL}/api/stations/edit-station/${stationId}`,
            { stationOwnerID },
            {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
              }
            }
          );
          console.log('Response:', response.data);

          if (response.data.success) {
            const station = response.data.data;

            // Safely update formData with station data
            const updatedFormData = {
              stationName: station.station_name || '',
              addressLine: station.address || '',
              district: station.district || '',
              city: station.city || '',
              electricityProvider: station.electricity_provider || '',
              powerSource: station.power_source || '',
              _id: station._id || '',
            };

            setFormData(updatedFormData);

            // Set location data if coordinates exist
            if (station.location && station.location.longitude && station.location.latitude) {
              setLocationData({
                lat: station.location.latitude,
                lng: station.location.longitude
              });
            }

            setNumChargers(station.chargers?.length || 1);
            setChargers(station.chargers?.map(charger => ({
              name: charger.charger_name || '',
              powerType: charger.power_type || '',
              maxPower: charger.max_power_output?.toString() || '',
              status: charger.charger_status,
              price: charger.price || '',
              _id: charger._id,
              connectors: charger.connector_types || []
            })) || [{ name: '', powerType: '', maxPower: '', price: '', status: '', connectors: [] }]);
          } else {
            toast.error('Failed to load station data');
            onClose();
          }
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error loading data');
        console.error('Error fetching data:', error);
        onClose();
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [isEdit, stationId, onClose]);

  // Function to check if a charger is editable
  const isChargerEditable = (charger) => {
    return charger.status !== 'to_be_installed';
  };

  const validateStepOne = () => {
    const newErrors = {};

    // Safely access formData properties with fallbacks
    const stationName = formData?.stationName || '';
    const district = formData?.district || '';
    const city = formData?.city || '';

    if (!stationName.trim()) {
      newErrors.stationName = 'Station name is required';
    } else if (stationName.trim().length < 3) {
      newErrors.stationName = 'Station name must be at least 3 characters';
    }

    if (!district) {
      newErrors.district = 'District is required';
    }

    if (!city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!locationData) {
      newErrors.location = 'Please select a location on the map';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStepTwo = () => {
    const newErrors = { chargers: [] };
    let isValid = true;

    chargers.forEach((charger, index) => {
      if (!isChargerEditable(charger)) {
        return;
      }

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

      const priceNum = parseFloat(charger.price);
      if (!charger.price || charger.price.toString().trim() === '') {
        chargerErrors.price = 'Unit price is required';
        isValid = false;
      } else if (isNaN(priceNum)) {
        chargerErrors.price = 'Must be a valid number';
        isValid = false;
      } else if (priceNum < 1) {
        chargerErrors.maxPower = 'Must be greater than LKR 1';
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
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
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
    if (!isChargerEditable(chargers[index])) {
      return;
    }

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
    if (!isChargerEditable(chargers[index])) {
      return;
    }

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
      // Safely access formData properties
      const stationData = {
        station_name: formData?.stationName?.trim() || '',
        address: formData?.addressLine?.trim() || '',
        district: formData?.district || '',
        city: formData?.city?.trim() || '',
        electricity_provider: formData?.electricityProvider || undefined,
        power_source: formData?.powerSource || undefined,
        location: locationData ? {
          longitude: locationData.lng,
          latitude: locationData.lat
        } : undefined,
        chargers: chargers.map(charger => ({
          charger_name: charger.name.trim(),
          power_type: charger.powerType,
          max_power_output: parseFloat(charger.maxPower),
          price: parseFloat(charger.price) || 0,
          _id: charger._id,
          charger_status: charger.charger_status,
          connector_types: charger.connectors.map(connectorId => ({
            connector: connectorId,
            status: 'unavailable'
          }))
        }))
      };

      const stationOwnerID = localStorage.getItem('userID');
      let response;

      if (isEdit) {
        response = await axios.put(
          `${API_BASE_URL}/api/stations/update-station/${stationId}`,
          { stationOwnerID, ...stationData },
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
              'Content-Type': 'application/json'
            }
          }
        );
        toast.success('Station updated successfully!');
      } else {
        response = await axios.post(
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

        if (response.data.success) {
          try {
            const chatResponse = await axios.post(
              `${API_BASE_URL}/api/chats/auto-create`,
              { stationOwnerId: stationOwnerID },
              {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                  'Content-Type': 'application/json'
                }
              }
            );

            if (chatResponse.data.success) {
              console.log('Auto chats created successfully:', chatResponse.data);
            }
          } catch (chatError) {
            console.error('Error creating auto chats:', chatError);
          }
        }
      }

      onSubmit?.(response.data.data);

      if (!isEdit && response.data.shouldNavigateToDashboard) {
        navigate('/station-owner');
      } else if (!isEdit) {
        navigate('/initstation');
      }

      onClose();
    } catch (error) {
      console.error('Error submitting station:', error);
      const errorMessage = error.response?.data?.message ||
        (error.response?.status === 401 ? 'Please login again' :
          `Failed to ${isEdit ? 'update' : 'submit'} station. Please try again.`);
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
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={['places']}>
      <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/10 flex items-center justify-center">
        <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-md max-h-[90vh] flex flex-col">
          <div className="flex-1 overflow-y-auto">
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
                locationData={locationData}
                onSetLocationClick={handleSetLocationOnMap}
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
                isChargerEditable={isChargerEditable}
              />
            )}
          </div>
        </div>

        {/* Map Modal */}
        <MapModal
          isOpen={showMapModal}
          onClose={() => setShowMapModal(false)}
          onLocationSelect={handleLocationSelect}
          initialLocation={locationData}
        />
      </div>
    </LoadScript>
  );
}