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
            error={errors.addressLine}
            errorMessage={errors.addressLine}
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

        {/* Updated Location Selection Section */}
        <div className="w-full">
          <div className="flex items-center gap-0 mb-1">
            <label className="block" style={{
              color: COLORS.mainTextColor,
              fontSize: FONTS.sizes.xs,
              fontWeight: FONTS.weights.normal,
            }}>
              Station Location
            </label>
            <span style={{ color: COLORS.danger }}>*</span>
          </div>
          
          <div className={`relative rounded-lg overflow-hidden border transition-all duration-200 ${
            errors.location ? 'border-red-500' : 'border-neutral-200 hover:border-primary'
          }`}>
            <img
              src={MapPlaceholderImage}
              alt="Map Placeholder"
              className="w-full h-32 object-cover"
            />
            <button
              type="button"
              onClick={onSetLocationClick}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/5 hover:bg-black/10 transition-all duration-200 w-full"
            >
              {locationData ? (
                <div className="text-center">
                  <div className="font-semibold text-lg mb-1" style={{ color: COLORS.success }}>
                    ✓ Location Selected
                  </div>
                  <div className="text-sm opacity-90" style={{ color: COLORS.mainTextColor }}>
                    Lat: {locationData.lat.toFixed(6)}, Lng: {locationData.lng.toFixed(6)}
                  </div>
                  <div className="text-xs mt-1 opacity-75" style={{ color: COLORS.mainTextColor }}>
                    Click to change location
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="font-semibold text-lg mb-1" style={{ color: COLORS.mainTextColor }}>
                    Set Location on Map
                  </div>
                  <div className="text-sm opacity-75" style={{ color: COLORS.mainTextColor }}>
                    Click to select your station location
                  </div>
                </div>
              )}
            </button>
          </div>
          
          {errors.location && (
            <p 
              className="mt-1 text-sm"
              style={{ color: COLORS.danger }}
            >
              {errors.location}
            </p>
          )}
          
          {locationData && (
            <div className="mt-2 p-3 rounded-lg bg-green-50 border border-green-200">
              <div className="flex items-center text-sm">
                <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span style={{ color: COLORS.success }} className="font-medium">
                  Location confirmed
                </span>
              </div>
              <div className="text-xs mt-1" style={{ color: COLORS.secondaryText }}>
                Coordinates: {locationData.lat.toFixed(6)}, {locationData.lng.toFixed(6)}
              </div>
            </div>
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
        <Button 
          variant="primary" 
          onClick={nextStep}
          disabled={!locationData} // Optional: disable next button if no location selected
        >
          Next
        </Button>
      </div>
    </div>
  );
}