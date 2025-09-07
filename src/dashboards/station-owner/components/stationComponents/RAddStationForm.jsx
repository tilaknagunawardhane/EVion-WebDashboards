import React, { useState, useEffect } from 'react';
import Button from '../../../../components/ui/Button';
import InputField from '../../../../components/ui/InputField';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { COLORS, FONTS } from '../../../../constants';
import StepOneForm from '../stationComponents/RStationForm';
import StepTwoForm from '../stationComponents/RChargerForm';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const elecProviders = [
    'CEB', 'LECO', 'Private'
];

const sources = [
    'Solar', 'Grid', 'Hybrid'
];

export default function AddChargingStationForm({ onClose, onSubmit, mode, initialFormData, initialChargerData, stationId: propStationId }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [numChargers, setNumChargers] = useState(1);
  const [chargers, setChargers] = useState([
    { name: '', powerType: '', maxPower: '', status: 'processing', price: '', connectors: [] }
  ]);
  const [districts, setDistricts] = useState([]);
  const [connectors, setConnectors] = useState({ AC: [], DC: [] });
  const [loading, setLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const { id: paramStationId } = useParams();
  const [locationData, setLocationData] = useState(null);

  const handleSetLocationOnMap = () => {
    alert('Opening map to set location...');
    const dummyLat = 6.90 + Math.random() * 0.1;
    const dummyLng = 79.90 + Math.random() * 0.1;
    setLocationData({ lat: dummyLat, lng: dummyLng });
  };

  const stationId = propStationId || paramStationId;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    stationName: '',
    addressLine: '',
    district: '',
    city: '',
    _id: '',
    electricityProvider: '',
    powerSource: '',
    status: 'unavailable', // Default status for new stations
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

            if (mode === 'edit-charger' && initialChargerData) {
                // Editing an existing charger
                setCurrentStep(2);
                setNumChargers(1); // Force 1 charger for editing
                setChargers([
                    {
                        name: initialChargerData.name || '',
                        maxPower: initialChargerData.maxPower?.toString() || '',
                        price: initialChargerData.price || '',
                        status: initialChargerData.chargerStatus || 'processing',
                        connectors: initialChargerData.connectors || [], // Use connectorTypes for pre-filling checkboxes
                        powerType: initialChargerData.powerType || '',
                        _id: initialChargerData._id
                    }
                ]);
                setFormData({}); // Clear station form data as it's not relevant here
                setLocationData(null); // Clear location data as it's not relevant here
            } else if (mode === 'add-new-charger') {
                // Adding a new charger to an existing station
                setCurrentStep(2);
                setNumChargers(1); // Start with one empty charger form
                setChargers([
                    { name: '', maxPower: '', price: '', connectors: [], powerType: '', status: 'processing' }
                ]);
                setFormData({}); // Clear station form data
                setLocationData(null); // Clear location data
            } else if (mode === 'edit-station' && initialFormData) { // Changed 'add-station' to 'edit-station' for clarity
                // Editing an existing station (StationProfile's "Update Station Details")
                setCurrentStep(1); // Always start at Step 1 for station details edit
                setFormData({
                    stationName: initialFormData.name || '',
                    addressLine: initialFormData.addressLine || '',
                    city: initialFormData.city || '',
                    district: initialFormData.district || '',
                    electricityProvider: initialFormData.electricityProvider || '',
                    powerSource: initialFormData.powerSource || '',
                    status: initialFormData.status || 'unavailable',
                    _id: initialFormData._id
                });
                setLocationData(initialFormData.location || null); // Pre-fill location
                setNumChargers(initialFormData.chargers?.length || 1);
                setChargers(initialFormData.chargers || [{ name: '', maxPower: '', price: '', connectors: [], powerType: '', status: 'processing' }]);
            } else {
                // Default: 'add-station' mode for a brand new station
                setCurrentStep(1);
                setNumChargers(1);
                setChargers([
                    { name: '', maxPower: '', price: '', connectors: [], powerType: '', status: 'processing' }
                ]);
                setFormData({
                    stationName: '',
                    addressLine: '',
                    district: '',
                    city: '',
                    electricityProvider: '',
                    powerSource: '',
                    status: 'unavailable',
                });
                setLocationData(null);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error loading data');
            console.error('Error fetching data:', error);
            // onClose();
        } finally {
            setLoading(false);
        }
    };

    fetchInitialData();

  }, [mode, initialFormData, initialChargerData, onClose]);
  
  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const updateNumChargers = (e) => {
    const count = parseInt(e.target.value, 10);
    setNumChargers(count);
    const newArray = Array.from({ length: count }, (_, i) => chargers[i] || {
      name: '', maxPower: '', price: '', connectors: []
    });
    setChargers(newArray);
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

  const submit = async () => {

        // setIsSubmitting(true);

        try {

            const stationOwnerID = localStorage.getItem('userID');
            let response;

            if (mode === 'edit-station') { // Use 'edit-station' explicitly
                const stationData = {
                    station_name: formData.stationName.trim(),
                    address: formData.addressLine.trim(),
                    // district: formData.district,
                    // city: formData.city.trim(),
                    electricity_provider: formData.electricityProvider || undefined,
                    power_source: formData.powerSource || undefined,
                };
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

            } else if (mode === 'add-station') { // Original add new station flow
                const stationData = {
                    station_name: formData.stationName.trim(),
                    address: formData.addressLine.trim(),
                    district: formData.district,
                    city: formData.city.trim(),
                    station_status: 'unavailable', // New stations start as unavailable
                    electricity_provider: formData.electricityProvider || undefined,
                    power_source: formData.powerSource || undefined,
                    chargers: chargers.map(charger => ({
                        charger_name: charger.name.trim(),
                        power_type: charger.powerType,
                        max_power_output: parseFloat(charger.maxPower),
                        price: parseFloat(charger.price) || 0,
                        charger_status: 'processing',
                        connector_types: charger.connectors.map(connectorId => ({
                        connector: connectorId,
                        status: 'available'
                        }))
                    }))
                };

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

            } else if (mode === 'add-new-charger') {
                const chargerData = {
                    charger_name: chargers[0].name.trim(),
                    power_type: chargers[0].powerType,
                    max_power_output: parseFloat(chargers[0].maxPower),
                    price: parseFloat(chargers[0].price) || 0,
                    connector_types: chargers[0].connectors.map(connectorId => ({
                        connector: connectorId,
                        status: 'available'
                    })),
                    charger_status: 'processing'
                };

                response = await axios.post(
                    `${API_BASE_URL}/api/stations/${stationId}/add-charger`,
                    { stationOwnerID, ...chargerData },
                    {
                        headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                        }
                    }
                    );
                toast.success('Charger added successfully!');

            } else if (mode === 'edit-charger' && initialChargerData) {
                const chargerData = {
                    charger_name: chargers[0].name.trim(),
                    power_type: chargers[0].powerType,
                    max_power_output: parseFloat(chargers[0].maxPower),
                    price: parseFloat(chargers[0].price) || 0,
                    connector_types: chargers[0].connectors.map(connectorId => ({
                        connector: connectorId,
                        status: 'available'
                    }))
                };

                response = await axios.put(
                    `${API_BASE_URL}/api/stations/${stationId}/update-charger/${chargers[0]._id}`,
                    { stationOwnerID, ...chargerData },
                    {
                        headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                        }
                    }
                    );
                toast.success('Charger updated successfully!');
            }

            onSubmit?.(response.data.data);
            // navigate('/initstation'); // This navigation should be decided by the parent component, not here
            onClose();
        } catch (error) {
            console.error('Error submitting:', error);
            const errorMessage = error.response?.data?.message ||
                (error.response?.status === 401 ? 'Please login again' :
                `Failed to submit. Please try again.`);
            toast.error(errorMessage);

            if (error.response?.status === 401) {
                navigate('/login');
            }
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
            <div className="bg-white rounded-xl p-12 w-full max-w-2xl shadow-md h-[600px] overflow-hidden max-h-[90vh]">
                <div className="h-full overflow-y-auto">
                    <button onClick={onClose} className="absolute top-3 right-4 text-3xl font-extralight" style={{ color: COLORS.secondaryText }}>×</button>

                    {/* Conditional rendering for forms based on mode and current step */}
                    {(currentStep === 1 && mode === 'add-station') || mode === 'edit-station' ? (
                        <StepOneForm
                            {...{
                                formData,
                                handleChange,
                                nextStep: () => setCurrentStep(2),
                                districts,
                                elecProviders,
                                sources,
                                locationData,      // Pass location data
                                onSetLocationClick: handleSetLocationOnMap, // Pass map setter function
                                mode, // Pass the mode to StepOneForm
                                submit // Pass submit directly for 'edit-station'
                            }} />
                    ) : (
                        <StepTwoForm {...{
                            numChargers: (mode === 'add-new-charger' || mode === 'edit-charger') ? 1 : numChargers,
                            updateNumChargers,
                            chargers,
                            handleChargerChange,
                            handleConnectorChange,
                            getAvailableConnectors,
                            goBack: () => {
                                if (mode === 'add-new-charger' || mode === 'edit-charger') {
                                    onClose();
                                } else {
                                    setCurrentStep(1);
                                }
                            },
                            onSubmit: submit,
                            formMode: mode,
                            isEditingOrAddingSingleCharger: (mode === 'add-new-charger' || mode === 'edit-charger')
                        }} />
                    )}
                </div>
            </div>
        </div>
    );
}