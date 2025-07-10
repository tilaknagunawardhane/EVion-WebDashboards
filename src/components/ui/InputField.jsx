import React, { useState } from 'react';
import { COLORS, FONTS } from '../../constants'
import eyeIcon from '../../assets/eye.svg';

export default function InputField({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  name,
  required = false,
  error = false,
  errorMessage = '',
  className = '',
  ...props
}) {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputType = type === 'password' && isPasswordVisible ? 'text' : type; // Toggle type

  return (
    <div className={`w-full ${className}`}>
      {/* Label */}
      {label && (
        <label 
          className="block mb-2"
          style={{
            color: COLORS.mainTextColor,
            fontSize: FONTS.sizes.xs,
            fontWeight: FONTS.weights.normal
          }}
        >
          {label}
          {required && <span style={{ color: COLORS.danger }}>*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          name={name}
          required={required}
          className={`w-full rounded-lg border transition-all duration-200 px-4 py-3 focus:outline-none focus:ring-1 ${
            error ? 'border-red-500' : 'border-neutral-200 focus:border-primary'
          }`}
          style={{
            fontSize: FONTS.sizes.sm,
            color: COLORS.mainTextColor,
            borderWidth: '1px',
            borderColor: error ? COLORS.danger : COLORS.stroke,
            backgroundColor: COLORS.background,
          }}
          placeholder={placeholder}
          {...props}
        />

        {type === 'password' && (
          <div
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <img
              src={eyeIcon}
              alt="Toggle password visibility"
              className="w-5 h-5"
            />
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && errorMessage && (
        <p 
          className="mt-1"
          style={{
            color: COLORS.danger,
            fontSize: FONTS.sizes.sm
          }}
        >
          {errorMessage}
        </p>
      )}
    </div>
  )
}