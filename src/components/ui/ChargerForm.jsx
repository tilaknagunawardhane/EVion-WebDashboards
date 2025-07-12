import React from 'react';
import InputField from './InputField';
import Button from './Button';
import { COLORS, FONTS } from '../../constants';

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
  goBack,
  onSubmit
}) {
  return (
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
            className="w-full rounded-lg border transition-all duration-200 px-4 py-3 border-neutral-200 focus:border-primary focus:outline-none focus:ring-1"
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
                      : [])
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
        <Button variant="outline" onClick={goBack}>
          Back
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Add Station
        </Button>
      </div>
    </div>
  );
}
