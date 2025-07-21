import React, { useState, useEffect } from 'react';
import Button from '../../../../components/ui/Button';
import InputField from '../../../../components/ui/InputField';
// import { useNavigate } from 'react-router-dom';
import { COLORS, FONTS } from '../../../../constants';
import StepOneForm from '../stationComponents/RStationForm';
import StepTwoForm from '../stationComponents/RChargerForm';


const elecProviders = [
    'CEB', 'LECO', 'Private'
];

const districts = [
    'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 'Gampaha', 'Hambanthota', 'Jaffna', 'Kalutara', 'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar', 'Matale', 'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya'
];

const sources = [
    'Solar', 'Grid', 'Hybrid'
];

export default function AddChargingStationForm({ onClose, onSubmit, mode, initialFormData, initialChargerData }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [numChargers, setNumChargers] = useState(1);
  const [chargers, setChargers] = useState([
    { name: '', maxPower: '', connectors: [] }
  ]);
  const [locationData, setLocationData] = useState(null);
//   const navigate = useNavigate();

  const [formData, setFormData] = useState({
    stationName: '',
    addressLine: '',
    district: '',
    city: '',
    electricityProvider: '',
    powerSource: '',
  });

  useEffect(() => {
        if (mode === 'edit-charger' && initialChargerData) {
            // Editing an existing charger
            setCurrentStep(2);
            setNumChargers(1); // Force 1 charger for editing
            setChargers([
                {
                    name: initialChargerData.name || '',
                    maxPower: initialChargerData.maxPower || '',
                    connectors: initialChargerData.connectorTypes || [], // Use connectorTypes for pre-filling checkboxes
                    powerType: initialChargerData.powerType || ''
                }
            ]);
            setFormData({}); // Clear station form data as it's not relevant here
            setLocationData(null); // Clear location data as it's not relevant here
        } else if (mode === 'add-new-charger') {
            // Adding a new charger to an existing station
            setCurrentStep(2);
            setNumChargers(1); // Start with one empty charger form
            setChargers([
                { name: '', maxPower: '', connectors: [], powerType: '' }
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
            });
            setLocationData(initialFormData.location || null); // Pre-fill location
            setNumChargers(initialFormData.numChargers || 1);
            setChargers(initialFormData.chargers || [{ name: '', maxPower: '', connectors: [], powerType: '' }]);
        } else {
            // Default: 'add-station' mode for a brand new station
            setCurrentStep(1);
            setNumChargers(1);
            setChargers([
                { name: '', maxPower: '', connectors: [], powerType: '' }
            ]);
            setFormData({
                stationName: '',
                addressLine: '',
                district: '',
                city: '',
                electricityProvider: '',
                powerSource: '',
            });
            setLocationData(null);
        }
    }, [mode, initialFormData, initialChargerData]);
  
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

  const handleSetLocationOnMap = () => {
      // In a real application, you would open a map modal here.
      // For demonstration, let's simulate setting a location.
      alert('Opening map to set location...');
      // Simulate setting a location after user interaction
      const dummyLat = 6.90 + Math.random() * 0.1; // Random latitude near Boralesgamuwa
      const dummyLng = 79.90 + Math.random() * 0.1; // Random longitude near Boralesgamuwa
      setLocationData({ lat: dummyLat, lng: dummyLng });
      // After user selects location on map, setLocationData({ lat: newLat, lng: newLng });
  };

  const submit = () => {
        let submissionData = {};

        if (mode === 'edit-station') { // Use 'edit-station' explicitly
            submissionData = {
                station: {
                    ...formData, // Take all updated formData
                    id: initialFormData.id, // Keep the original ID
                    location: locationData,
                    // If you allow editing chargers from this flow, include chargers array too
                    // For now, let's assume editing station details only.
                },
                type: 'edit-station' // Custom type to indicate station edit
            };
        }
        else if (mode === 'add-station') { // Original add new station flow
            submissionData = {
                station: {
                    name: formData.stationName,
                    address: `${formData.addressLine}, ${formData.city}`, // Combine address parts
                    district: formData.district,
                    electricityProvider: formData.electricityProvider,
                    powerSource: formData.powerSource,
                    location: locationData, // Include location data
                    numChargers,
                    chargers,
                    status: 'Processing',
                },
                type: 'add-station'
            };
        } else if (mode === 'add-new-charger') {
            submissionData = {
                charger: chargers[0], // Assuming only one new charger is added at a time
                type: 'add-charger-to-existing-station'
                // You'll likely need to pass the parent station's ID here from ViewStationRightPanel
                // For example: stationId: <currentStationId> passed down from a parent component
            };
        } else if (mode === 'edit-charger' && initialChargerData) {
            submissionData = {
                chargerId: initialChargerData.id, // Original ID of the charger being edited
                updatedChargerData: chargers[0], // The updated data for the single charger
                type: 'edit-charger'
            };
        }

        onSubmit?.(submissionData);
        // navigate('/initstation'); // This navigation should be decided by the parent component, not here
        onClose();
    };

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
                                onSubmit: mode === 'edit-station' ? submit : undefined // Pass submit directly for 'edit-station'
                            }} />
                    ) : (
                        <StepTwoForm {...{
                            numChargers: (mode === 'add-new-charger' || mode === 'edit-charger') ? 1 : numChargers,
                            updateNumChargers,
                            chargers,
                            handleChargerChange,
                            handleConnectorChange,
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