import React from 'react';
import InputField from '../ui/InputField';
import Button from '../ui/Button';
import { COLORS, FONTS } from '../../constants';

export default function StepOneForm({
  formData,
  handleChange,
  nextStep,
  districts,
  elecProviders,
  supportedPowerTypes,
  sources
}) {
  return (
    <div>
      <h2
        className="text-2xl font-normal mb-6"
        style={{ color: COLORS.mainTextColor }}
      >
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

        {/* District Dropdown */}
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
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Address Line & City */}
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

        {/* Supported Power Types */}
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
            <option value="">Select Power Type</option>
            {supportedPowerTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Electricity Provider & Power Source */}
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
              <option value="">Select Provider</option>
              {elecProviders.map((provider) => (
                <option key={provider} value={provider}>
                  {provider}
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
              <option value="">Select Power Source</option>
              {sources.map((src) => (
                <option key={src} value={src}>
                  {src}
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
  );
}
