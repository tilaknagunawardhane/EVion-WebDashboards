import React, { useState, useEffect } from 'react';
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
      justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white', padding: '20px', borderRadius: '8px',
        width: '90%', maxWidth: '500px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ marginBottom: '15px', fontSize: '1.2em', fontWeight: 'bold' }}>{title}</h2>
        {children}
      </div>
    </div>
  );
};

const Button = ({ onClick, type = 'button', variant, children }) => {
  const baseStyle = {
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    border: '1px solid',
    fontSize: '0.9em'
  };
  const primaryStyle = { ...baseStyle, backgroundColor: '#007bff', color: 'white', borderColor: '#007bff' };
  const outlineStyle = { ...baseStyle, backgroundColor: 'white', color: '#007bff', borderColor: '#007bff' };

  return (
    <button
      type={type}
      onClick={onClick}
      style={variant === 'outline' ? outlineStyle : primaryStyle}
    >
      {children}
    </button>
  );
};

// Assuming COLORS and FONTS are defined globally or imported
const COLORS = {
  mainTextColor: '#333',
  stroke: '#ddd'
};
const FONTS = {
  sizes: {
    sm: '0.875rem'
  }
};


const ChargerStatusModal = ({
  isOpen,
  onClose,
  onSubmit, // This function will handle the form submission
  editingClosure // Can be null for new, or an object for editing
}) => {
  const [formState, setFormState] = useState({
    statusType: 'closeCharger', // 'closeCharger' or 'disableForBookings'
    fromDateTime: '',
    toDateTime: '',
    reason: '',
  });
  const [errors, setErrors] = useState({});

  // Populate form when editingClosure changes
  useEffect(() => {
    if (editingClosure) {
      setFormState({
        statusType: editingClosure.statusType || 'closeCharger',
        fromDateTime: editingClosure.from ? new Date(editingClosure.from).toISOString().slice(0, 16) : '',
        toDateTime: editingClosure.to ? new Date(editingClosure.to).toISOString().slice(0, 16) : '',
        reason: editingClosure.reason || '',
      });
    } else {
      // Reset form for new entry
      setFormState({
        statusType: 'closeCharger',
        fromDateTime: '',
        toDateTime: '',
        reason: '',
      });
    }
  }, [editingClosure]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = (currentForm) => {
    const newErrors = {};
    let isValid = true;
    const { statusType, fromDateTime, toDateTime, reason } = currentForm;

    if (!fromDateTime) {
      newErrors.fromDateTime = 'Start date and time are required.';
      isValid = false;
    }
    if (!reason.trim()) {
      newErrors.reason = 'Reason is required.';
      isValid = false;
    }

    if (fromDateTime) {
      const from = new Date(fromDateTime);
      const now = new Date();

      // For new closures or future starts, it must be in the future
      if (!editingClosure && from < now) {
        newErrors.fromDateTime = 'Start date and time cannot be in the past for new closures.';
        isValid = false;
      }
      // If editing an existing closure that has already started, allow past "from" date
      // If editing and the "from" date is in the future, it must be greater than "now"
      if (editingClosure && from < now && editingClosure.from && new Date(editingClosure.from) > now) {
         newErrors.fromDateTime = 'Start date and time cannot be in the past for future closures.';
         isValid = false;
      }
    }


    // Validate toDateTime only if provided
    if (toDateTime) {
      const from = new Date(fromDateTime);
      const to = new Date(toDateTime);

      if (fromDateTime && from >= to) {
        newErrors.toDateTime = 'End date and time must be after start date and time.';
        isValid = false;
      }
    }

    // You'd typically pass `existingClosures` as a prop to validate overlaps.
    // For this example, I'm omitting the `overlap` validation part as `existingClosures`
    // is not available within this standalone component, but the logic
    // from your original `validateTempCloseForm` can be easily integrated here
    // by passing `existingClosures` and `editingClosureIndex` (or `editingClosure.id`) as props.

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(formState)) {
      onSubmit(formState);
      onClose(); // Close modal on successful submission
    }
  };

  const titleText = editingClosure ? "Edit Charger Status" : "Set Charger Status";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={titleText}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
        {/* Radio Buttons for Status Type */}
        <div className="flex gap-4 mb-4">
          <label className="flex items-center text-sm" style={{ color: COLORS.mainTextColor }}>
            <input
              type="radio"
              name="statusType"
              value="closeCharger"
              checked={formState.statusType === 'closeCharger'}
              onChange={handleChange}
              className="mr-2"
            />
            Close Charger
          </label>
          <label className="flex items-center text-sm" style={{ color: COLORS.mainTextColor }}>
            <input
              type="radio"
              name="statusType"
              value="disableForBookings"
              checked={formState.statusType === 'disableForBookings'}
              onChange={handleChange}
              className="mr-2"
            />
            Disable Charger for Bookings
          </label>
        </div>

        {/* From Date & Time */}
        <div>
          <label htmlFor="fromDateTime" className="block text-xs font-medium mb-1" style={{ color: COLORS.mainTextColor }}>From Date & Time:</label>
          <input
            type="datetime-local"
            id="fromDateTime"
            name="fromDateTime"
            value={formState.fromDateTime}
            onChange={handleChange}
            className={`border rounded-md px-3 py-2 w-full ${errors.fromDateTime ? 'border-red-500' : ''}`}
            style={{ borderColor: COLORS.stroke, color: COLORS.mainTextColor, fontSize: FONTS.sizes.sm }}
          />
          {errors.fromDateTime && (
            <p className="text-red-500 text-xs mt-1">{errors.fromDateTime}</p>
          )}
        </div>

        {/* To Date & Time - Optional */}
        <div>
          <label htmlFor="toDateTime" className="block text-xs font-medium mb-1" style={{ color: COLORS.mainTextColor }}>To Date & Time (Optional):</label>
          <input
            type="datetime-local"
            id="toDateTime"
            name="toDateTime"
            value={formState.toDateTime}
            onChange={handleChange}
            className={`border rounded-md px-3 py-2 w-full ${errors.toDateTime ? 'border-red-500' : ''}`}
            style={{ borderColor: COLORS.stroke, color: COLORS.mainTextColor, fontSize: FONTS.sizes.sm }}
          />
          {errors.toDateTime && (
            <p className="text-red-500 text-xs mt-1">{errors.toDateTime}</p>
          )}
          {!formState.toDateTime && (
            <p className="text-gray-500 text-xs mt-1">If not provided, the charger will remain in this status until updated manually.</p>
          )}
        </div>

        {/* Reason */}
        <div>
          <label htmlFor="reason" className="block text-xs font-medium mb-1" style={{ color: COLORS.mainTextColor }}>Reason:</label>
          <textarea
            id="reason"
            name="reason"
            value={formState.reason}
            onChange={handleChange}
            rows="4"
            className={`border rounded-md px-3 py-2 w-full ${errors.reason ? 'border-red-500' : ''}`}
            style={{ borderColor: COLORS.stroke, color: COLORS.mainTextColor, fontSize: FONTS.sizes.sm }}
          ></textarea>
          {errors.reason && (
            <p className="text-red-500 text-xs mt-1">{errors.reason}</p>
          )}
        </div>

        {errors.overlap && (
          <p className="text-red-500 text-sm text-center">{errors.overlap}</p>
        )}

        <div className="flex justify-end gap-3 mt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
          >
            {editingClosure ? "Save Changes" : "Apply Status"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ChargerStatusModal;