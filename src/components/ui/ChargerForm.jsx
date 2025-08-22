import React from 'react';
import InputField from './InputField';
import Button from './Button';
import { COLORS, FONTS } from '../../constants';

export default function ChargerForm({
  numChargers,
  updateNumChargers,
  chargers,
  handleChargerChange,
  handleConnectorChange,
  getAvailableConnectors,
  goBack,
  onSubmit,
  errors,
  isSubmitting
}) {
  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-200px)]"> {/* Adjust this value as needed */}
      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto pb-4">
        <h2 className="text-2xl font-normal mb-6" style={{ color: COLORS.mainTextColor }}>
          Charger Details
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block mb-2" style={{
              color: COLORS.mainTextColor,
              fontSize: FONTS.sizes.xs,
              fontWeight: FONTS.weights.normal
            }}>
              Number of Chargers
            </label>
            <input
              type="number"
              min={1}
              max={10}
              value={numChargers}
              onChange={updateNumChargers}
              className="w-full rounded-lg border px-4 py-3 border-neutral-200 focus:border-primary focus:outline-none focus:ring-1"
            />
          </div>

          {chargers.map((charger, index) => (
            <div key={index} className="p-4 rounded-lg" style={{ backgroundColor: COLORS.background }}>
              <h4 className="text-md font-medium mb-4" style={{ color: COLORS.mainTextColor }}>
                Charger {index + 1}
              </h4>

              <div className="space-y-4">
                <InputField
                  label="Charger Name"
                  value={charger.name}
                  onChange={(e) => handleChargerChange(index, 'name', e.target.value)}
                  error={errors.chargers?.[index]?.name}
                  required
                />

                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <label className="block text-sm" style={{ color: COLORS.mainTextColor }}>
                      Power Type
                    </label>
                    <span style={{ color: COLORS.danger }}>*</span>
                  </div>
                  <select
                    value={charger.powerType}
                    onChange={(e) => handleChargerChange(index, 'powerType', e.target.value)}
                    className={`w-full rounded-lg px-4 py-2 border ${errors.chargers?.[index]?.powerType ? 'border-red-500' : 'border-neutral-200'
                      }`}
                    required
                  >
                    <option value="">Select</option>
                    <option value="AC">AC</option>
                    <option value="DC">DC</option>
                  </select>
                  {errors.chargers?.[index]?.powerType && (
                    <p className="mt-1 text-sm text-red-600">{errors.chargers[index].powerType}</p>
                  )}
                </div>

                <div className="flex gap-2">
                    <InputField
                      label="Maximum Power Output (kW)"
                      type="number"
                      value={charger.maxPower}
                      onChange={(e) => {
                        // Ensure value stays within bounds
                        let value = e.target.value;
                        if (value !== '') {
                          value = Math.max(1, Math.min(1000, Number(value)));
                        }
                        handleChargerChange(index, 'maxPower', value);
                      }}
                      placeholder="e.g., 22"
                      error={errors.chargers?.[index]?.maxPower}
                      required
                      min={1}
                      max={1000}
                      onBlur={(e) => {
                        // If field is empty after blur, set to minimum value
                        if (e.target.value === '') {
                          handleChargerChange(index, 'maxPower', 1);
                        }
                      }}
                    />

                    <InputField
                      label="Price per kWh"
                      placeholder="Enter price per kWh"
                      value={charger.price}
                      onChange={(e) => handleChargerChange(index, 'price', e.target.value)}
                      error={errors.chargers?.[index]?.price}
                      required
                    />
                </div>

                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <label className="block text-sm" style={{ color: COLORS.mainTextColor }}>
                      Connector Types
                    </label>
                    <span style={{ color: COLORS.danger }}>*</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {getAvailableConnectors(charger.powerType).map((connector) => (
                      <label
                        key={connector._id}
                        className="flex items-center space-x-2 text-sm p-2 rounded hover:bg-gray-50"
                        style={{ color: COLORS.mainTextColor }}
                      >
                        <input
                          type="checkbox"
                          checked={charger.connectors.includes(connector._id)}
                          onChange={(e) => {
                            const updated = [...charger.connectors];
                            if (e.target.checked) {
                              updated.push(connector._id);
                            } else {
                              const index = updated.indexOf(connector._id);
                              if (index > -1) updated.splice(index, 1);
                            }
                            handleConnectorChange(index, updated);
                          }}
                          className="ml-0"
                          style={{ accentColor: COLORS.primary }}
                        />
                        <span>{connector.type_name}</span>
                      </label>
                    ))}
                  </div>
                  {errors.chargers?.[index]?.connectors && (
                    <p className="mt-1 text-sm text-red-600">{errors.chargers[index].connectors}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed button area */}
      <div className="pt-4 mt-auto sticky bottom-0 bg-white border-t border-gray-200">
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={goBack}
            disabled={isSubmitting}
            className="px-6 py-2"
          >
            Back
          </Button>
          <Button
            variant="primary"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="px-6 py-2"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : 'Submit Station'}
          </Button>
        </div>
      </div>
    </div>
  );
}