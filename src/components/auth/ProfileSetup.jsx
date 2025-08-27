import React, { useState, useRef, useEffect } from 'react';
import { COLORS, FONTS } from '../../constants';
import evionLogo from '../../assets/Logo 2.svg';
import Button from '../../components/ui/Button';
import InputField from '../../components/ui/InputField';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const steps = [
  { id: 1, label: 'Business & Legal Details' },
  { id: 2, label: 'Payment Setup' },
  { id: 3, label: 'Verify Identity' },
];

const stepDescriptions = {
  1: "Running this as a business? Drop your business details here. If you're an individual owner, you can skip this part!",
  2: "Your information is securely encrypted and used only for verification and financial transactions. We never share your data with third parties.",
  3: "National ID is required to confirm your identity. We handle all personal data with strict privacy and security standards.",
};

export default function AccountSetup() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { userData } = location.state || {};
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for dropdown data
  const [dropdownData, setDropdownData] = useState({
    districts: [],
    banks: [],
    branches: []
  });

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    business: '',
    reg: '',
    confirmReg: '',
    tax: '',
    district: '',
    accountholder: '',
    bank: '',
    branch: '',
    accountnumber: '',
    idNumber: '',
    nicImage: null,
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!userData) {
      navigate('/auth');
      return;
    }

    const fetchInitialData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/common/data`);
        setDropdownData({
          districts: response.data.data.districts,
          banks: response.data.data.banks,
          branches: []
        });
        setLoading(false);
      } catch (error) {
        toast.error('Failed to load initial data');
        navigate('/auth');
      }
    };

    fetchInitialData();
  }, [userData, navigate]);

  // Load branches when bank is selected
  useEffect(() => {
    if (formData.bank) {
      const fetchBranches = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/api/common/branches/${formData.bank}`);
          setDropdownData(prev => ({
            ...prev,
            branches: response.data.data
          }));
        } catch (error) {
          toast.error('Failed to load branches');
        }
      };

      fetchBranches();
    }
  }, [formData.bank]);


  const handleInputChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, nicImage: e.target.files[0] });
    setErrors(prev => ({ ...prev, nicImage: '' }));
  };

  const removeImage = () => {
    setFormData({ ...formData, nicImage: null });
    setErrors(prev => ({ ...prev, nicImage: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateStep = () => {
    const newErrors = {};
    if (currentStep === 1) {
      if (!formData.business.trim()) newErrors.business = 'Please enter your business name';
      if (!formData.reg.trim()) newErrors.reg = 'Please enter your business registration number';
      else if (!/^[a-zA-Z0-9-]+$/.test(formData.reg))
        newErrors.reg = 'Business registration number must contain only letters, numbers, and hyphens';
      if (formData.reg !== formData.confirmReg) newErrors.confirmReg = 'Business registration numbers do not match';
      if (!formData.district) newErrors.district = 'Please select a district';
}

    if (currentStep === 2) {
      if (!formData.accountholder.trim()) newErrors.accountholder = 'Please enter account holder name';
      else if (!/^[a-zA-Z\s]+$/.test(formData.accountholder))
        newErrors.accountholder = 'Account holder name must contain only letters and spaces';
      if (!formData.bank.trim()) newErrors.bank = 'Please select a bank';
      if (!formData.branch.trim()) newErrors.branch = 'Please select a branch';
      if (!formData.accountnumber.trim()) newErrors.accountnumber = 'Please enter account number';
      else if (!/^\d{6,20}$/.test(formData.accountnumber))
        newErrors.accountnumber = 'Account number must be numeric and 6-20 digits long';
    }

    if (currentStep === 3) {
      if (!formData.idNumber.trim()) newErrors.idNumber = 'Please enter your NIC';
      else if (!/^\d{9}[vVxX]$|^\d{12}$/.test(formData.idNumber))
        newErrors.idNumber = 'Invalid NIC format';
      if (!formData.nicImage) newErrors.nicImage = 'Please upload NIC image';
    }

    setErrors(newErrors);

    // Return false if any errors exist
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (!validateStep()) return;
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setIsSubmitting(true);

    try {
      // Create FormData for multipart upload
      const formDataToSend = new FormData();

      // Add user data from previous steps
      formDataToSend.append('name', userData.name || searchParams.get("name") || "");
      formDataToSend.append('email', userData.email || searchParams.get("email") || "");
      formDataToSend.append('contact', userData.phone || searchParams.get("phone") || "");
      formDataToSend.append('password', userData.password || searchParams.get("password") || "");

      // Add business information
      formDataToSend.append('businessName', formData.business);
      formDataToSend.append('businessRegistrationNumber', formData.reg);
      formDataToSend.append('taxId', formData.tax);
      formDataToSend.append('district', formData.district);

      // Add payment information
      formDataToSend.append('accountHolderName', formData.accountholder);
      formDataToSend.append('bank', formData.bank);
      formDataToSend.append('branch', formData.branch);
      formDataToSend.append('accountNumber', formData.accountnumber);

      // Add identity verification
      formDataToSend.append('nic', formData.idNumber);
      if (formData.nicImage) {
        formDataToSend.append('nicImage', formData.nicImage);
      }

      console.log(formDataToSend);

      // Submit to backend
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/station-owner/register`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      // Handle successful registration
      toast.success('Registration successful! Verification pending.');

      // Store tokens if needed
      if (response.data.accessToken && response.data.refreshToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('userID', response.data.user._id);
      }

      // Redirect to dashboard or next step
      navigate('/initaddstation');

    } catch (error) {
      console.error('Registration error:', error);

      // Handle specific error cases
      if (error.response) {
        if (error.response.status === 400) {
          toast.error(error.response.data.message || 'Validation failed');
        } else if (error.response.status === 409) {
          toast.error('User already exists with this email or NIC');
        } else {
          toast.error('Registration failed. Please try again.');
        }
      } else {
        toast.error('Network error. Please check your connection.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFormContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <InputField
              label="Business Name"
              placeholder="Enter your business name"
              value={formData.business}
              onChange={handleInputChange('business')}
              error={!!errors.business}
              errorMessage={errors.business}
              required
            />
            {/* <InputField
              label="District"
              placeholder="Select the district your business belongs to"
              value={formData.district}
              onChange={handleInputChange('district')}
            /> */}
            <div className="w-full">
              <label
                className="block mb-2"
                style={{
                  color: COLORS.mainTextColor,
                  fontSize: FONTS.sizes.xs,
                  fontWeight: FONTS.weights.normal,
                }}
              >
                District
              </label>
              <select
                value={formData.district}
                onChange={handleInputChange('district')}
                className="w-full rounded-lg border border-neutral-200 px-4 py-3 focus:outline-none focus:ring-1 focus:border-primary"
                disabled={loading}
              >
                <option value="" style={{ fontSize: FONTS.sizes.xs, fontWeight: FONTS.weights.normal }}>
                  {loading ? 'Loading districts...' : 'Select District'}
                </option>
                {dropdownData.districts.map((d) => (
                  <option key={d._id} value={d._id} style={{ fontSize: FONTS.sizes.xs, fontWeight: FONTS.weights.normal }}>
                    {d.name}, {d.province}
                  </option>
                ))}
                
              </select>
            </div>
            <InputField
              label="Business Registration Number"
              type="text"
              placeholder="Enter your business registration number"
              value={formData.reg}
              onChange={handleInputChange('reg')}
              error={!!errors.reg}
              errorMessage={errors.reg}
              required
            />
            <InputField
            label="Business Registration Number Confirmation"
            type="text"
            placeholder="Confirm your business registration number"
            value={formData.confirmReg}
            onChange={handleInputChange('confirmReg')}
            error={!!errors.confirmReg}
            errorMessage={errors.confirmReg}
            required
            />
            {/* <InputField
              label="Tax ID"
              type="text"
              placeholder="Enter your business's tax ID"
              value={formData.tax}
              onChange={handleInputChange('tax')}
              error={!!errors.tax}
              errorMessage={errors.tax}
            /> */}
          </>
        );
      case 2:
        return (
          <>
            <InputField
              label="Account Holder Name"
              placeholder="Enter the account holder name"
              value={formData.accountholder}
              onChange={handleInputChange('accountholder')}
              error={!!errors.accountholder}
              errorMessage={errors.accountholder}
              required
            />
            
            <div className="w-full">
              <label
                className="block mb-2"
                style={{
                  color: COLORS.mainTextColor,
                  fontSize: FONTS.sizes.xs,
                  fontWeight: FONTS.weights.normal,
                }}
              >
                Bank
              </label>
              <select
                value={formData.bank}
                onChange={handleInputChange('bank')}
                required
                className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-1 ${errors.bank ? 'border-red-500' : 'border-neutral-200 focus:border-primary'
                  }`}
                disabled={loading}
              >
                <option value="" style={{ fontSize: FONTS.sizes.xs, fontWeight: FONTS.weights.normal }}>
                  {loading ? 'Loading banks...' : 'Select Bank'}
                </option>
                {dropdownData.banks.map((b) => (
                  <option key={b._id} value={b._id} style={{ fontSize: FONTS.sizes.xs, fontWeight: FONTS.weights.normal }}>
                    {b.name} ({b.code})
                  </option>
                ))}
              </select>
              {errors.bank && (
                <p className="mt-1 text-sm" style={{ color: COLORS.danger }}>
                  {errors.bank}
                </p>
              )}
            </div>

            <InputField
              label="Branch"
              placeholder="Enter the branch name"
              value={formData.branch}
              onChange={handleInputChange('branch')}
              error={!!errors.branch}
              errorMessage={errors.branch}
              required
            />

            <InputField
              label="Account Number"
              placeholder="Enter the account number"
              value={formData.accountnumber}
              onChange={handleInputChange('accountnumber')}
              error={!!errors.accountnumber}
              errorMessage={errors.accountnumber}
              required
            />
          </>
        );
      case 3:
        return (
          <>
            <InputField
              label="NIC"
              placeholder="Enter your NIC"
              value={formData.idNumber}
              onChange={handleInputChange('idNumber')}
              error={!!errors.idNumber}
              errorMessage={errors.idNumber}
              required
            />
            <div className="w-full mt-4">
              <label
                className="block mb-2"
                style={{
                  color: COLORS.mainTextColor,
                  fontSize: FONTS.sizes.xs,
                  fontWeight: FONTS.weights.normal,
                }}
              >
                Upload NIC Image <span style={{ color: COLORS.danger }}>*</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                required
                className="w-full rounded-lg border border-neutral-200 px-4 py-3 focus:outline-none focus:ring-1 focus:border-primary"
              />
              {formData.nicImage && (
                <div className="mt-2 flex items-center justify-between bg-gray-100 px-3 py-2 rounded-lg">
                  <span className="text-xs text-gray-700 truncate">{formData.nicImage.name}</span>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="ml-2 text-gray-500 hover:text-red-600 text-sm font-bold"
                  >
                    ✕
                  </button>
                </div>
              )}
              {errors.nicImage && (
                <p
                  className="mt-1 text-sm"
                  style={{ color: COLORS.danger }}
                >
                  {errors.nicImage}
                </p>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-2">Please ensure your details are correct for identity verification.</p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {showSuccess && (
        <div
          className="fixed top-6 right-6 px-6 py-3 rounded-lg shadow-lg z-50"
          style={{
            backgroundColor: COLORS.primary,
            color: 'white',
            fontSize: FONTS.sizes.sm,
            fontFamily: FONTS.family.sans,
            fontWeight: FONTS.weights.medium,
          }}
        >
          🎉 Your account has been successfully created!
        </div>
      )}

      <div className="flex flex-col md:flex-row w-full max-w-6xl p-6 md:p-8 gap-8">
        {/* Left Panel with Progress */}
        <div className="flex-1 flex-col justify-center items-start text-left">
          <div className="flex mb-4">
            <img
              src={evionLogo}
              alt="EVion Logo"
              className="h-10 w-auto"
            />
          </div>
          <h1 style={{ color: COLORS.mainTextColor, fontSize: FONTS.sizes['3xl'], fontFamily: FONTS.family.sans, fontWeight: FONTS.weights['500'] }}>
            Few More Steps to Go!
          </h1>
          <div className="flex flex-col gap-12 w-full mt-24">
            {steps.map((step) => {
              const isActive = currentStep === step.id;
              return (
                <div key={step.id} className="flex flex-col gap-2">
                  <div
                    onClick={() => {
                      if (step.id < currentStep) {
                        setCurrentStep(step.id);  // Allow going back anytime
                      } else if (step.id === currentStep) {
                        setCurrentStep(step.id);
                      } else {
                        if (validateStep()) setCurrentStep(step.id);  // Only allow forward jump if current step is valid
                      }
                    }}
                    className="flex items-center gap-4 cursor-pointer transition-colors"
                    style={{
                      color: isActive ? COLORS.primary : COLORS.mainTextColor,
                      fontSize: FONTS.sizes.lg,
                      fontWeight: FONTS.weights.normal,
                    }}
                  >
                    <div
                      className="h-4 w-4 rounded-full border"
                      style={{
                        backgroundColor: isActive ? COLORS.primary : 'transparent',
                        borderColor: isActive ? COLORS.primary : COLORS.mainTextColor,
                      }}
                    />
                    <span>{step.label}</span>
                  </div>

                  {isActive && (
                    <p
                      style={{
                        color: COLORS.mainTextColor,
                        fontSize: FONTS.sizes.sm,
                        fontWeight: FONTS.weights.normal,
                        marginLeft: '1.5rem',
                        marginTop: '0.25rem',
                      }}
                      className="max-w-xs"
                    >
                      {stepDescriptions[step.id]}
                    </p>
                  )}
                </div>
              );
            })}
          </div>


          {/* <img src={stationImage} alt="EV Station" className="mt-auto w-full h-auto object-cover rounded-lg" /> */}
        </div>

        {/* Right Form Section */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md p-12 bg-white rounded-lg shadow-md h-[600px] overflow-hidden">
            <div className="h-full overflow-y-auto">
              <h2
                style={{
                  color: COLORS.mainTextColor,
                  fontSize: FONTS.sizes['2xl'],
                  fontFamily: FONTS.family.sans,
                  fontWeight: FONTS.weights['500'],
                }}
                className="mb-6"
              >
                {steps[currentStep - 1]?.label}
              </h2>

              <form className="space-y-4">{renderFormContent()}</form>

              <div className="flex justify-between mt-8">
                {currentStep === 1 ? (
                  <Button variant="outline" onClick={nextStep}>
                    Skip
                  </Button>
                ) : (
                  <Button variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                )}

                {currentStep < steps.length ? (
                  <Button variant="primary" onClick={nextStep}>
                    Next
                  </Button>
                ) : (
                  <Button variant="primary" onClick={handleSubmit}>
                    Finish
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
