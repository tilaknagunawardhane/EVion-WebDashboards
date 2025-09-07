import React from 'react';
import InputField from '../ui/InputField';
import Button from '../ui/Button';
import { COLORS, FONTS } from '../../constants';
import MapPlaceholderImage from '../../assets/map-placeholder.png'; // Adjust the path as necessary

export default function StepOneForm({
  formData,
  handleChange,
  nextStep,
  districts,
  elecProviders,
  supportedPowerTypes,
  locationData,
  onSetLocationClick,
  sources,
  errors
}) {
  return (
    <div>
      <h2 className="text-2xl font-normal mb-6" style={{ color: COLORS.mainTextColor }}>
        Charging Station Details
      </h2>

      <div className="flex-col space-y-4 mt-8">
        <InputField
          label="Station Name"
          placeholder="Enter station name"
          value={formData.stationName}
          onChange={handleChange('stationName')}
          error={errors.stationName}
          errorMessage={errors.stationName}
          required
        />

        <div className="w-full">
          <div className="flex items-center gap-0 mb-1">
            <label className="block" style={{
              color: COLORS.mainTextColor,
              fontSize: FONTS.sizes.xs,
              fontWeight: FONTS.weights.normal,
            }}>
              District
            </label>
            <span style={{ color: COLORS.danger }}>*</span>
          </div>
          <select
            value={formData.district}
            onChange={handleChange('district')}
            className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-1 ${
              errors.district ? 'border-red-500' : 'border-neutral-200 focus:border-primary'
            }`}
            required
          >
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district._id} value={district._id}>
                {district.name}
              </option>
            ))}
          </select>
          {errors.district && (
            <p className="mt-1 text-sm text-red-600">{errors.district}</p>
          )}
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
            error={errors.city}
            errorMessage={errors.city}
            required
          />
        </div>

        <div className="w-full relative rounded-lg overflow-hidden border"
            style={{ borderColor: errors.locationData ? COLORS.danger : COLORS.stroke }}>
            <img
                src={MapPlaceholderImage} // Your map image
                alt="Map Placeholder"
                className="w-full h-32 object-cover" // Adjust height as needed
            />
            <button
                type="button"
                onClick={onSetLocationClick}
                style={{color:COLORS.mainTextColor}}
                className="absolute inset-0 flex items-center justify-center font-semibold text-lg bg-black/5 bg-opacity-50 hover:bg-opacity-70 transition-all duration-200"
            >
                {locationData ? (
                    `Location Set: ${locationData.lat.toFixed(3)}, ${locationData.lng.toFixed(3)}`
                ) : (
                    'Set Location on Map'
                )}
                {/* Optional: Add a checkmark icon if locationData is set */}
            </button>
            {errors.locationData && (
                <p
                    className="mt-1 absolute -bottom-6 left-0" // Position error message
                    style={{
                        color: COLORS.danger,
                        fontSize: FONTS.sizes.sm
                    }}
                >
                    {errors.locationData}
                </p>
            )}
        </div>

        <div className="flex gap-2">
          <div className="w-full">
            <label className="block mb-1" style={{
              color: COLORS.mainTextColor,
              fontSize: FONTS.sizes.xs,
              fontWeight: FONTS.weights.normal,
            }}>
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
            <label className="block mb-1" style={{
              color: COLORS.mainTextColor,
              fontSize: FONTS.sizes.xs,
              fontWeight: FONTS.weights.normal,
            }}>
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
        <Button variant="primary" onClick={nextStep}>
          Next
        </Button>
      </div>
    </div>
  );
}