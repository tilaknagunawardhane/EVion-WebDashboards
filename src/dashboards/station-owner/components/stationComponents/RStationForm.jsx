import React, { useState } from 'react';
import InputField from '../../../../components/ui/InputField';
import Button from '../../../../components/ui/Button';
import { COLORS, FONTS } from '../../../../constants';
import MapPlaceholderImage from '../../../../assets/map-placeholder.png';

export default function StepOneForm({
  formData,
  handleChange,
  nextStep,
  districts,
  elecProviders,
  sources,
  locationData,
  onSetLocationClick,
  mode, 
  onSubmit
}) {

  const isEditMode = mode === 'edit-station';

  const [errors, setErrors] = useState({});

  const validate = () => {
      let newErrors = {};
      if (!formData.stationName.trim()) {
          newErrors.stationName = 'Station Name is required.';
      }
      if (!formData.district) {
          newErrors.district = 'District is required.';
      }
      if (!formData.city.trim()) {
          newErrors.city = 'City is required.';
      }
      if (!locationData) { // Validation for map location
          newErrors.location = 'Please set the station location on the map.';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleNextClick = () => {
    if (validate()) {
      if (isEditMode) {
        onSubmit(); // Directly submit when in edit mode
      } else {
        nextStep(); // Go to next step when adding a new station
      }
    }
  };


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
          error={!!errors.stationName}
          errorMessage={errors.stationName}
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
            className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-1 ${
                            errors.district ? 'border-red-500' : 'border-neutral-200 focus:border-primary'
                        }`}
            style={{
                            fontSize: FONTS.sizes.sm,
                            color: COLORS.mainTextColor,
                            borderWidth: '1px',
                            borderColor: errors.district ? COLORS.danger : COLORS.stroke,
                            backgroundColor: COLORS.background,
                        }}
            >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          {errors.district && ( 
            <p
                className="mt-1"
                style={{
                    color: COLORS.danger,
                    fontSize: FONTS.sizes.sm
                }}
            >
                {errors.district}
            </p>
        )}
        </div>

        {/* Address Line & City */}
        <div className="flex gap-2">
          <InputField
            label="Address Line"
            placeholder="Enter address"
            value={formData.addressLine}
            onChange={handleChange('addressLine')}
            error={!!errors.addressLine}
            errorMessage={errors.addressLine}
          />
          <InputField
            label="City"
            placeholder="Enter city"
            value={formData.city}
            onChange={handleChange('city')}
            required
            error={!!errors.city}
            errorMessage={errors.city}
          />
        </div>


        {/* Set Location on Map Button */}
        <div className="w-full relative rounded-lg overflow-hidden border"
              style={{ borderColor: errors.location ? COLORS.danger : COLORS.stroke }}>
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
            {errors.location && (
                <p
                    className="mt-1 absolute -bottom-6 left-0" // Position error message
                    style={{
                        color: COLORS.danger,
                        fontSize: FONTS.sizes.sm
                    }}
                >
                    {errors.location}
                </p>
            )}
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
              className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-1 ${
                                errors.electricityProvider ? 'border-red-500' : 'border-neutral-200 focus:border-primary'
                            }`}
                            style={{
                                fontSize: FONTS.sizes.sm,
                                color: COLORS.mainTextColor,
                                borderWidth: '1px',
                                borderColor: errors.electricityProvider ? COLORS.danger : COLORS.stroke,
                                backgroundColor: COLORS.background,
                            }}  
              >
              <option value="">Select Provider</option>
              {elecProviders.map((provider) => (
                <option key={provider} value={provider}>
                  {provider}
                </option>
              ))}
            </select>
            {errors.electricityProvider && (
                            <p
                                className="mt-1"
                                style={{
                                    color: COLORS.danger,
                                    fontSize: FONTS.sizes.sm
                                }}
                            >
                                {errors.electricityProvider}
                            </p>
                        )}
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
              className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-1 ${
                                errors.powerSource ? 'border-red-500' : 'border-neutral-200 focus:border-primary'
                            }`}
                            style={{
                                fontSize: FONTS.sizes.sm,
                                color: COLORS.mainTextColor,
                                borderWidth: '1px',
                                borderColor: errors.powerSource ? COLORS.danger : COLORS.stroke,
                                backgroundColor: COLORS.background,
                            }}
              >
              <option value="">Select Power Source</option>
              {sources.map((src) => (
                <option key={src} value={src}>
                  {src}
                </option>
              ))}
            </select>
            {errors.powerSource && (
                            <p
                                className="mt-1"
                                style={{
                                    color: COLORS.danger,
                                    fontSize: FONTS.sizes.sm
                                }}
                            >
                                {errors.powerSource}
                            </p>
                        )}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button variant="primary" type="button" onClick={handleNextClick}>
          {isEditMode ? 'Update' : 'Next'}
        </Button>
      </div>
    </div>
  );
}
