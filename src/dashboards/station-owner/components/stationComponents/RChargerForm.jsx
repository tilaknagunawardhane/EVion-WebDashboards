import React, { useState, useEffect } from 'react';
import InputField from '../../../../components/ui/InputField';
import Button from '../../../../components/ui/Button';
import { COLORS, FONTS } from '../../../../constants';

const ACconnectors = [
  'Type 1 (SAE J1772)', 'Type 2 (Mennekes)', 'Tesla'
];

const DCconnectors = [
  'CCS1', 'CCS2', 'CHAdeMO', 'GB/T (Chinese Standard)', 'Tesla'
];

const powerTypes = ['AC', 'DC'];

export default function ChargerForm({
  numChargers,
  updateNumChargers,
  chargers,
  handleChargerChange,
  handleConnectorChange,
  getAvailableConnectors,
  goBack,
  onSubmit,
  formMode,
  isEditingOrAddingSingleCharger
}) {

  const [chargerErrors, setChargerErrors] = useState([]);

  useEffect(() => {
        setChargerErrors(Array(chargers.length).fill({}));
    }, [chargers.length]);

  const submitButtonText = formMode === 'edit-charger' ? 'Update Charger' :
        formMode === 'add-new-charger' ? 'Add Charger' :
        'Add Station'; // Default for adding a whole station
  
  const showNumChargersInput = !(formMode === 'edit-charger' || formMode === 'add-new-charger');

  const validateChargers = () => {
        let allChargersValid = true;
        let newChargerErrors = Array(chargers.length).fill({});

        chargers.forEach((charger, index) => {
            let chargerSpecificErrors = {};
            if (!charger.name.trim()) {
                chargerSpecificErrors.name = 'Charger Name is required.';
                allChargersValid = false;
            }
            if (!charger.powerType && formMode !== 'edit-charger') {
                chargerSpecificErrors.powerType = 'Power Type is required.';
                allChargersValid = false;
            }
            // Power output cannot be null or empty string
            if (charger.maxPower === null || charger.maxPower === '' || parseFloat(charger.maxPower) <= 0) {
                chargerSpecificErrors.maxPower = 'Power Output is required and must be a positive number.';
                allChargersValid = false;
            }
            if (charger.price === null || charger.price === '' || parseFloat(charger.price) <= 0) {
                chargerSpecificErrors.price = 'Price is required and must be a positive number.';
                allChargersValid = false;
            }
            if (charger.connectors.length === 0 && formMode !== 'edit-charger') {
                chargerSpecificErrors.connectors = 'At least one Connector Type is required.';
                allChargersValid = false;
            }
            newChargerErrors[index] = chargerSpecificErrors;
        });

        setChargerErrors(newChargerErrors);
        return allChargersValid;
    };

    const handleSubmitClick = () => {
        if (validateChargers()) {
            onSubmit(); // Proceed to submit if all validations pass
        }
    };

    const isDisabled = formMode === 'edit-charger';

  return (
    <div>
      <h2 className="text-2xl font-normal mb-6" style={{ color: COLORS.mainTextColor }}>
        Charger Details
      </h2>

      <div className="flex-col space-y-4 mt-8">
        {showNumChargersInput && (
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
              max={5}
              value={numChargers}
              onChange={updateNumChargers}
              className="w-full rounded-lg border transition-all duration-200 px-4 py-3 border-neutral-200 focus:border-primary focus:outline-none focus:ring-1"
            />
          </div>
        )}

        {chargers.map((charger, index) => (
            ((formMode === 'edit-charger' || formMode === 'add-new-charger') && index > 0) ? null :
              (
                <div key={index} className="mb-6 p-4 rounded-lg" style={{ backgroundColor: COLORS.background }}>
                  <h4 className="text-md font-medium mb-3" style={{ color: COLORS.mainTextColor }}>
                    {formMode === 'edit-charger' ? 'Edit Charger' : `Charger ${index + 1}`}
                  </h4>

                  <div className="flex-col space-y-4 mt-4">
                    <InputField
                      label="Charger Name"
                      value={charger.name}
                      onChange={(e) => handleChargerChange(index, 'name', e.target.value)}
                      required
                      error={!!chargerErrors[index]?.name}
                      errorMessage={chargerErrors[index]?.name}
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
                        className={`w-full rounded-lg px-4 py-2 border focus:outline-none focus:ring-1 ${
                            chargerErrors[index]?.powerType ? 'border-red-500' : 'border-neutral-200 focus:border-primary'
                        }`}
                        style={{
                            fontSize: FONTS.sizes.sm,
                            color: COLORS.mainTextColor,
                            borderWidth: '1px',
                            borderColor: chargerErrors[index]?.powerType ? COLORS.danger : COLORS.stroke,
                            backgroundColor: COLORS.background,
                        }}
                        required
                        disabled={isDisabled}
                      >
                        <option value="">Select</option>
                        {powerTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      {chargerErrors[index]?.powerType && (
                                        <p
                                            className="mt-1"
                                            style={{
                                                color: COLORS.danger,
                                                fontSize: FONTS.sizes.sm
                                            }}
                                        >
                                            {chargerErrors[index]?.powerType}
                                        </p>
                                    )}
                    </div>
                    
                    <div className="flex gap-2">
                      <InputField
                        label="Maximum Power Output (kW)"
                        type="number"
                        value={charger.maxPower}
                        onChange={(e) => handleChargerChange(index, 'maxPower', e.target.value)}
                        placeholder="e.g., 22"
                        min={1}
                        max={1000}
                        error={!!chargerErrors[index]?.maxPower}
                        errorMessage={chargerErrors[index]?.maxPower}
                        required
                      />
                      <InputField
                        label="Price per kWh"
                        placeholder="Enter price per kWh"
                        value={charger.price}
                        onChange={(e) => handleChargerChange(index, 'price', e.target.value)}
                        error={!!chargerErrors[index]?.price}
                        errorMessage={chargerErrors[index]?.price}
                        required
                      />
                    </div>

                    <div className="mt-3">
                      <div className="flex items-center gap-0 mb-0">
                        <label className="block mb-1 text-xs font-normal" style={{ color: COLORS.mainTextColor }}>
                          Connector Types (Multi-select)
                        </label>
                        <span style={{ color: COLORS.danger }}>*</span>
                      </div>
                      <div className="flex flex-wrap gap-6 mt-4">
                        {getAvailableConnectors(charger.powerType).map((connector) => (
                            <label key={connector._id} className="flex items-center space-x-2 text-sm" style={{ color: COLORS.mainTextColor }}>
                              <input
                                type="checkbox"
                                value={connector._id}
                                required
                                checked={charger.connectors.includes(connector._id)}
                                onChange={(e) => {
                                  const checked = e.target.checked;
                                  const updated = [...charger.connectors];

                                  if (checked) {
                                    updated.push(connector._id);
                                  } else {
                                    const i = updated.indexOf(connector._id);
                                    if (i > -1) updated.splice(i, 1);
                                  }

                                  handleConnectorChange(index, updated);
                                }}
                                className="ml-0"
                                style={{ accentColor: COLORS.primary }}
                                disabled={isDisabled}
                              />
                              <span>{connector.type_name}</span>
                            </label>
                          ))}
                      </div>
                      {chargerErrors[index]?.connectors && ( // Display error for connectors
                        <p
                            className="mt-1"
                            style={{
                                color: COLORS.danger,
                                fontSize: FONTS.sizes.sm
                            }}
                        >
                            {chargerErrors[index]?.connectors}
                        </p>
                    )}
                    </div>
                  </div>
                </div>
              )
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={goBack}>
          {formMode === 'add-station' ? 'Back' : 'Cancel'}
        </Button>
        <Button variant="primary" onClick={handleSubmitClick}>
          {submitButtonText}
        </Button>
      </div>
    </div>
  );
}
