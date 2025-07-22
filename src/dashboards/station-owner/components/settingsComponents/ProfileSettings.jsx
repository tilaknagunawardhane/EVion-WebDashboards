import React, { useState, useEffect } from 'react';
import InputField from '../../../../components/ui/InputField'; // Adjust path as needed
import { COLORS, FONTS } from '../../../../constants'; // Adjust path as needed
import Button from '../../../../components/ui/Button';

export default function ProfilePage() {
    // State to hold all form data
    const [formData, setFormData] = useState({
        // User Data
        photo: null, // Stores File object or base64 URL
        fullName: '',
        contactNumber: '',
        email: '',
        role: 'Station Owner', // Locked field
        nic: '',
        nicImage: null, // Stores File object or base64 URL

        // Business Details
        businessName: '',
        district: '',
        addressLine: '',
        streetName: '',
        city: '',
        businessRegNo: '',
        taxNo: '',
    });

    // State to hold validation errors
    const [formErrors, setFormErrors] = useState({});

    // List of districts for the dropdown
    const districts = [
        'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 'Gampaha',
        'Hambantota', 'Jaffna', 'Kalutara', 'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala',
        'Mannar', 'Matale', 'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa',
        'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
    ];

    // Required fields for validation
    const requiredFields = [
        'fullName', 'contactNumber', 'email', 'nic', 'nicImage',
        'businessName', 'district', 'businessRegNo', 'taxNo'
    ];

    // Simulate loading existing data (replace with actual API call in a real app)
    useEffect(() => {
        // Example of pre-filled data for demonstration
        const mockExistingData = {
            photo: null, // Or a base64 string if loaded
            fullName: 'John Doe',
            contactNumber: '0771234567',
            email: 'john.doe@example.com',
            role: 'Station Owner',
            nic: '901234567V',
            nicImage: null, // Or a base64 string if loaded

            businessName: 'GreenCharge Solutions',
            district: 'Colombo',
            addressLine: '123, Main Street',
            streetName: 'Flower Road',
            city: 'Colombo 07',
            businessRegNo: 'PV123456',
            taxNo: '123456789',
        };
        setFormData(mockExistingData);
    }, []);

    // Generic handler for input field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error as user types
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    // Handler for file input changes (images)
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            const file = files[0];
            // For display purposes, convert to base64. In a real app, you'd upload the File object.
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, [name]: reader.result })); // Store base64 string
            };
            reader.readAsDataURL(file);

            // Clear error
            if (formErrors[name]) {
                setFormErrors(prev => ({ ...prev, [name]: '' }));
            }
        }
    };

    // Validation function
    const validateForm = () => {
        const errors = {};
        let isValid = true;

        requiredFields.forEach(field => {
            if (!formData[field] || (typeof formData[field] === 'string' && formData[field].trim() === '')) {
                errors[field] = `${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} is required.`;
                isValid = false;
            }
        });

        // Specific email format validation
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Invalid email format.';
            isValid = false;
        }

        // Basic contact number validation (e.g., 10 digits)
        if (formData.contactNumber && !/^\d{10}$/.test(formData.contactNumber)) {
            errors.contactNumber = 'Contact number must be 10 digits.';
            isValid = false;
        }

        // Basic NIC validation (e.g., 9 digits + V/X or 12 digits)
        if (formData.nic && !/^(\d{9}[vVxX]|\d{12})$/.test(formData.nic)) {
            errors.nic = 'Invalid NIC format (e.g., 123456789V or 199012345678).';
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form data submitted:', formData);
            // Here you would typically send formData to your backend API
            alert('Profile saved successfully!'); // Use a custom modal in a real app
        } else {
            console.log('Form has validation errors:', formErrors);
            alert('Please correct the errors in the form.'); // Use a custom modal in a real app
        }
    };

    return (
        <div
            className="rounded-xl bg-white p-0 flex flex-col gap-8"
            style={{
                background: COLORS.background,
                fontFamily: FONTS.family.sans,
                color: COLORS.mainTextColor
            }}
        >

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              {/* User Data Section */}
              <div className="flex flex-col gap-4 py-6 px-8 rounded-xl bg-white items-start">
                  <h3 className="font-normal text-xl" style={{ color: COLORS.mainTextColor }}>
                      User Data
                  </h3>

                  {/* Photo */}
                  <div className="flex flex-col items-start gap-2">
                      <label className="block text-sm font-normal" style={{ color: COLORS.mainTextColor }}>
                          Profile Photo
                      </label>
                      <div className="flex items-end">
                          <div
                            className="w-24 h-24 rounded-full overflow-hidden border-1 flex items-center justify-center"
                            style={{ borderColor: COLORS.primary, backgroundColor: COLORS.bgGreen }}
                        >
                            {formData.photo ? (
                                <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <svg className="w-8 h-8" style={{color:COLORS.primary}} fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            )}
                        </div>
                        <input
                            type="file"
                            id="photoUploadInput"
                            name="photo"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden" 
                        />
                        <label
                            htmlFor="photoUploadInput" // Link to the hidden input
                            className="cursor-pointer px-4 py-2 rounded-lg text-sm font-normal bg-transparent underline"
                            style={{
                                color: COLORS.primary,
                            }}
                        >
                            Choose File
                        </label>
                      </div>
                  </div>

                  <div className="flex w-full justify-between space-x-4">
                    <InputField
                      label="Full Name"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required={true}
                      error={!!formErrors.fullName}
                      errorMessage={formErrors.fullName}
                    />
                    <InputField
                      label="Role"
                      name="role"
                      value={formData.role}
                      readOnly={true} // Locked field
                      disabled={true}
                      className="opacity-70 cursor-not-allowed" // Visual cue for locked
                  />
                  </div>
                  <InputField
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required={true}
                      error={!!formErrors.email}
                      errorMessage={formErrors.email}
                  />
                  <div className="flex w-full justify-between space-x-4">
                    <InputField
                      label="Contact Number"
                      name="contactNumber"
                      type="tel"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      required={true}
                      error={!!formErrors.contactNumber}
                      errorMessage={formErrors.contactNumber}
                    />
                    <InputField
                      label="NIC"
                      name="nic"
                      value={formData.nic}
                      onChange={handleChange}
                      required={true}
                      error={!!formErrors.nic}
                      errorMessage={formErrors.nic}
                    />
                  </div>
                  
                  {/* Image of NIC */}
                  <div>
                      <label className="block mb-2" style={{ color: COLORS.mainTextColor, fontSize: FONTS.sizes.xs, fontWeight: FONTS.weights.normal }}>
                          Image of NIC<span style={{ color: COLORS.danger }}>*</span>
                      </label>
                      <input
                          type="file"
                          id="nicImage"
                          name="nicImage"
                          accept="image/*"
                          onChange={handleFileChange}
                          className={`text-sm text-gray-500 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold ${formErrors.nicImage ? 'border-red-500' : ''}`}
                          style={{
                              '--file-bg-color': COLORS.primary,
                              '--file-text-color': 'white',
                              backgroundColor: 'var(--file-bg-color)',
                              color: 'var(--file-text-color)',
                          }}
                      />
                      {formData.nicImage && (
                          <img src={formData.nicImage} alt="NIC" className="mt-2 max-h-40 object-contain rounded-md border" style={{ borderColor: COLORS.stroke }} />
                      )}
                      {formErrors.nicImage && (
                          <p className="mt-1" style={{ color: COLORS.danger, fontSize: FONTS.sizes.sm }}>
                              {formErrors.nicImage}
                          </p>
                      )}
                  </div>
              </div>

              {/* Business Details Section */}
              <div className="flex flex-col gap-4 py-6 px-8 rounded-xl bg-white">
                  <h3 className="font-normal text-xl" style={{ color: COLORS.mainTextColor }}>
                      Business Details
                  </h3>
                  <InputField
                      label="Business Name"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      required={true}
                      error={!!formErrors.businessName}
                      errorMessage={formErrors.businessName}
                  />
                  <div className="flex w-full justify-between space-x-4">
                      {/* District Dropdown */}
                      <div className="flex-1/2">
                          <label className="block mb-2" style={{ color: COLORS.mainTextColor, fontSize: FONTS.sizes.xs, fontWeight: FONTS.weights.normal }}>
                              District<span style={{ color: COLORS.danger }}>*</span>
                          </label>
                          <select
                              name="district"
                              value={formData.district}
                              onChange={handleChange}
                              required={true}
                              className={`w-full rounded-lg border transition-all duration-200 px-4 py-3 focus:outline-none focus:ring-1 ${
                                  formErrors.district ? 'border-red-500' : 'border-neutral-200 focus:border-primary'
                              }`}
                              style={{
                                  fontSize: FONTS.sizes.sm,
                                  color: COLORS.mainTextColor,
                                  borderWidth: '1px',
                                  borderColor: formErrors.district ? COLORS.danger : COLORS.stroke,
                                  backgroundColor: COLORS.background,
                              }}
                          >
                              <option value="">Select District</option>
                              {districts.map(district => (
                                  <option key={district} value={district}>{district}</option>
                              ))}
                          </select>
                          {formErrors.district && (
                              <p className="mt-1" style={{ color: COLORS.danger, fontSize: FONTS.sizes.sm }}>
                                  {formErrors.district}
                              </p>
                          )}
                      </div>

                      <div className="flex-1/2">
                        <InputField
                            label="City"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                        />
                      </div>
                  </div>

                 <div className="flex w-full justify-between space-x-4"> 
                    <InputField
                        label="Address Line"
                        name="addressLine"
                        value={formData.addressLine}
                        onChange={handleChange}
                    />
                    <InputField
                        label="Street Name"
                        name="streetName"
                        value={formData.streetName}
                        onChange={handleChange}
                    />
                  </div>
                  <div className="flex w-full justify-between space-x-4">
                    <InputField
                      label="Business Registration No"
                      name="businessRegNo"
                      value={formData.businessRegNo}
                      onChange={handleChange}
                      required={true}
                      error={!!formErrors.businessRegNo}
                      errorMessage={formErrors.businessRegNo}
                    />
                    <InputField
                        label="Tax No"
                        name="taxNo"
                        value={formData.taxNo}
                        onChange={handleChange}
                        required={true}
                        error={!!formErrors.taxNo}
                        errorMessage={formErrors.taxNo}
                    />
                  </div>
                  
              </div>

              <div className="flex justify-end mt-4">
                  <Button
                      type="submit"
                  >
                      Save Profile
                  </Button>
              </div>
          </form>
        </div>
    );
}