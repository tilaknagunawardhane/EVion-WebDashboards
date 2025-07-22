import React, { useState, useEffect } from 'react';
import { COLORS, FONTS } from '../../../../constants'; // Adjust this path if needed
import Button from '../../../../components/ui/Button';

// Helper to format time for display
const formatTime = (time) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
            <div
                className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col"
                style={{
                    fontFamily: FONTS.family.sans,
                    color: COLORS.mainTextColor
                }}
            >
                <div
                    className="flex justify-between items-center p-4 border-b"
                    style={{ borderColor: COLORS.stroke }}
                >
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
                        &times;
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}


// Default schedule structure for the form
const defaultDaySchedule = {
    selected: false,
    open24Hours: false,
    closed: false,
    timeBlocks: [{ from: '09:00', to: '17:00' }],
};

export default function StationAvailabilityManager({ initialSchedule = null, initialTemporaryClosure = null }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [schedule, setSchedule] = useState(initialSchedule); // The current schedule displayed
    const [formSchedule, setFormSchedule] = useState({}); // Schedule data for the form
    const [formErrors, setFormErrors] = useState({});

    const [temporaryClosures, setTemporaryClosures] = useState(initialTemporaryClosure); // Renamed to plural and initialized with array
    const [isTempCloseModalOpen, setIsTempCloseModalOpen] = useState(false);
    const [editingClosureIndex, setEditingClosureIndex] = useState(null); // New state to track which closure is being edited
    const [tempCloseForm, setTempCloseForm] = useState({
        fromDateTime: '',
        toDateTime: '',
        reason: ''
    });
    const [tempCloseErrors, setTempCloseErrors] = useState({});

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // Initialize formSchedule when the modal opens or initialSchedule changes
    useEffect(() => {
        if (isModalOpen) {
            const initialFormState = {};
            daysOfWeek.forEach(day => {
                const dayKey = day.toLowerCase();
                if (schedule && schedule[dayKey]) {
                    initialFormState[dayKey] = { ...schedule[dayKey] };
                } else {
                    initialFormState[dayKey] = { ...defaultDaySchedule };
                }
            });
            setFormSchedule(initialFormState);
            setFormErrors({}); // Clear errors when opening modal
        }
    }, [isModalOpen, schedule]); // Dependency array: re-run when isModalOpen or schedule changes

    const handleEditClick = () => {
        setIsModalOpen(true);
    };

    const handleDayToggle = (day) => {
        setFormSchedule(prev => {
            const dayKey = day.toLowerCase();
            const newDayState = { ...prev[dayKey], selected: !prev[dayKey].selected };
            if (!newDayState.selected) {
                // Reset state if day is unselected
                newDayState.open24Hours = false;
                newDayState.closed = false;
                newDayState.timeBlocks = [{ from: '09:00', to: '17:00' }];
            }
            return { ...prev, [dayKey]: newDayState };
        });
    };

    const handleOpen24HoursToggle = (day) => {
        setFormSchedule(prev => {
            const dayKey = day.toLowerCase();
            const newDayState = {
                ...prev[dayKey],
                open24Hours: !prev[dayKey].open24Hours,
                closed: false, // Cannot be both open 24 hours and closed
            };
            return { ...prev, [dayKey]: newDayState };
        });
    };

    const handleClosedToggle = (day) => {
        setFormSchedule(prev => {
            const dayKey = day.toLowerCase();
            const newDayState = {
                ...prev[dayKey],
                closed: !prev[dayKey].closed,
                open24Hours: false, // Cannot be both open 24 hours and closed
            };
            return { ...prev, [dayKey]: newDayState };
        });
    };

    const handleTimeChange = (day, blockIndex, field, value) => {
        setFormSchedule(prev => {
            const dayKey = day.toLowerCase();
            const newTimeBlocks = [...prev[dayKey].timeBlocks];
            newTimeBlocks[blockIndex] = {
                ...newTimeBlocks[blockIndex],
                [field]: value,
            };
            return {
                ...prev,
                [dayKey]: { ...prev[dayKey], timeBlocks: newTimeBlocks },
            };
        });
    };

    const handleAddBlock = (day) => {
        setFormSchedule(prev => {
            const dayKey = day.toLowerCase();
            const newTimeBlocks = [...prev[dayKey].timeBlocks, { from: '09:00', to: '17:00' }];
            return {
                ...prev,
                [dayKey]: { ...prev[dayKey], timeBlocks: newTimeBlocks },
            };
        });
    };

    const handleRemoveBlock = (day, blockIndex) => {
        setFormSchedule(prev => {
            const dayKey = day.toLowerCase();
            const newTimeBlocks = prev[dayKey].timeBlocks.filter((_, i) => i !== blockIndex);
            return {
                ...prev,
                [dayKey]: { ...prev[dayKey], timeBlocks: newTimeBlocks.length > 0 ? newTimeBlocks : [{ from: '09:00', to: '17:00' }] }, // Ensure at least one block remains
            };
        });
    };

    const handleTempCloseChange = (e) => {
        const { name, value } = e.target;
        setTempCloseForm(prev => ({ ...prev, [name]: value }));
    };

    const validateTempCloseForm = (currentForm, existingClosures, currentIndex = null) => {
        const errors = {};
        let isValid = true;
        const { fromDateTime, toDateTime, reason } = currentForm;

        if (!fromDateTime) {
            errors.fromDateTime = 'Start date and time are required.';
            isValid = false;
        }
        if (!toDateTime) {
            errors.toDateTime = 'End date and time are required.';
            isValid = false;
        }
        if (!reason.trim()) {
            errors.reason = 'Reason for closure is required.';
            isValid = false;
        }

        if (fromDateTime && toDateTime) {
            const from = new Date(fromDateTime);
            const to = new Date(toDateTime);
            const now = new Date();

            if (from >= to) {
                errors.toDateTime = 'End date and time must be after start date and time.';
                isValid = false;
            }
            // Allow past dates only if the "from" date is for an existing, already started closure
            // For new closures or future starts, it must be in the future
            if (from < now && (currentIndex === null || from > now)) { // Added condition to allow existing past dates
                 errors.fromDateTime = 'Start date and time cannot be in the past for new or future closures.';
                 isValid = false;
            }


            // Check for overlaps with other temporary closures
            existingClosures.forEach((closure, index) => {
                if (index === currentIndex) return; // Skip checking against itself if editing

                const existingFrom = closure.from;
                const existingTo = closure.to;

                // Overlap condition: (new_start < existing_end) AND (existing_start < new_end)
                if (from < existingTo && existingFrom < to) {
                    errors.overlap = `This period overlaps with an existing closure (${existingFrom.toLocaleString()} - ${existingTo.toLocaleString()}).`;
                    isValid = false;
                }
            });
        }

        setTempCloseErrors(errors);
        return isValid;
    };

    const handleTemporaryCloseSubmit = (e) => {
        e.preventDefault();
        if (validateTempCloseForm(tempCloseForm, temporaryClosures, editingClosureIndex)) {
            const newClosure = {
                from: new Date(tempCloseForm.fromDateTime),
                to: new Date(tempCloseForm.toDateTime),
                reason: tempCloseForm.reason.trim()
            };

            let updatedClosures;
            if (editingClosureIndex !== null) {
                // Editing existing closure
                updatedClosures = temporaryClosures.map((closure, idx) =>
                    idx === editingClosureIndex ? newClosure : closure
                );
            } else {
                // Adding new closure
                updatedClosures = [...temporaryClosures, newClosure];
            }

            // Sort closures by start date for easier display and management
            updatedClosures.sort((a, b) => a.from.getTime() - b.from.getTime());

            setTemporaryClosures(updatedClosures);
            setIsTempCloseModalOpen(false);
            setEditingClosureIndex(null); // Reset editing index
            // Here you would typically send updatedClosures to your backend API
            console.log("Temporary Closures Submitted:", updatedClosures);
        }
    };

    const handleRemoveTemporaryClosure = (indexToRemove) => {
        const updatedClosures = temporaryClosures.filter((_, index) => index !== indexToRemove);
        setTemporaryClosures(updatedClosures);
        // Also, inform backend that this closure is removed
        console.log("Temporary Closure Removed:", temporaryClosures[indexToRemove]);
    };

    const handleEditTemporaryClose = (indexToEdit) => {
        const closureToEdit = temporaryClosures[indexToEdit];
        setTempCloseForm({
            fromDateTime: closureToEdit.from.toISOString().slice(0, 16),
            toDateTime: closureToEdit.to.toISOString().slice(0, 16),
            reason: closureToEdit.reason
        });
        setEditingClosureIndex(indexToEdit);
        setIsTempCloseModalOpen(true);
    };

    const handleOpenNewTempCloseModal = () => {
        setEditingClosureIndex(null); // Ensure we're adding a new one
        setTempCloseForm({ // Clear form for new entry
            fromDateTime: '',
            toDateTime: '',
            reason: ''
        });
        setTempCloseErrors({}); // Clear any previous errors
        setIsTempCloseModalOpen(true);
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        Object.entries(formSchedule).forEach(([dayKey, dayData]) => {
            if (dayData.selected) {
                newErrors[dayKey] = {}; // Initialize error object for the day

                if (!dayData.open24Hours && !dayData.closed) {
                    if (dayData.timeBlocks.length === 0) {
                        newErrors[dayKey].general = "Please add at least one time block or select 24 hours/closed.";
                        isValid = false;
                    } else {
                        newErrors[dayKey].blocks = [];
                        dayData.timeBlocks.forEach((block, index) => {
                            const blockErrors = {};
                            const fromTime = block.from;
                            const toTime = block.to;

                            if (!fromTime) {
                                blockErrors.from = "Required";
                                isValid = false;
                            }
                            if (!toTime) {
                                blockErrors.to = "Required";
                                isValid = false;
                            }

                            if (fromTime && toTime) {
                                const [fromH, fromM] = fromTime.split(':').map(Number);
                                const [toH, toM] = toTime.split(':').map(Number);

                                const fromMinutes = fromH * 60 + fromM;
                                const toMinutes = toH * 60 + toM;

                                if (fromMinutes >= toMinutes) {
                                    blockErrors.to = "End time must be after start time.";
                                    isValid = false;
                                }
                            }
                            newErrors[dayKey].blocks[index] = blockErrors;
                        });

                        // Check for overlapping time blocks for the same day
                        for (let i = 0; i < dayData.timeBlocks.length; i++) {
                            for (let j = i + 1; j < dayData.timeBlocks.length; j++) {
                                const blockA = dayData.timeBlocks[i];
                                const blockB = dayData.timeBlocks[j];

                                if (!blockA.from || !blockA.to || !blockB.from || !blockB.to) continue; // Skip if times are missing, validation already caught this

                                const [aFromH, aFromM] = blockA.from.split(':').map(Number);
                                const [aToH, aToM] = blockA.to.split(':').map(Number);
                                const [bFromH, bFromM] = blockB.from.split(':').map(Number);
                                const [bToH, bToM] = blockB.to.split(':').map(Number);

                                const aFromMinutes = aFromH * 60 + aFromM;
                                const aToMinutes = aToH * 60 + aToM;
                                const bFromMinutes = bFromH * 60 + bFromM;
                                const bToMinutes = bToH * 60 + bToM;

                                // Overlap condition: (A_start < B_end) AND (B_start < A_end)
                                if (aFromMinutes < bToMinutes && bFromMinutes < aToMinutes) {
                                    newErrors[dayKey].overlap = "Time blocks cannot overlap.";
                                    isValid = false;
                                    break; // Found an overlap, no need to check further for this day
                                }
                            }
                            if (newErrors[dayKey].overlap) break; // If overlap found, exit outer loop too
                        }
                    }
                }
            }
        });

        setFormErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Filter out unselected days and format the schedule for submission
            const newSchedule = {};
            Object.entries(formSchedule).forEach(([dayKey, dayData]) => {
                if (dayData.selected) {
                    newSchedule[dayKey] = {
                        open24Hours: dayData.open24Hours,
                        closed: dayData.closed,
                        timeBlocks: dayData.open24Hours || dayData.closed ? [] : dayData.timeBlocks,
                    };
                }
            });
            setSchedule(newSchedule); // Update the displayed schedule
            setIsModalOpen(false);
            console.log("Schedule submitted:", newSchedule);
            // Here you would typically send newSchedule to your backend API
        } else {
            console.error("Form has errors:", formErrors);
        }
    };

    return (
        <div
            className="rounded-xl bg-white p-8 flex flex-col gap-4"
            style={{
                fontFamily: FONTS.family.sans,
                color: COLORS.mainTextColor
            }}
        >
            <h3 className="font-medium mb-4" style={{ fontSize: FONTS.sizes.xl, color: COLORS.mainTextColor }}>
                Charging Station Schedule
            </h3>

            {temporaryClosures.length > 0  && (
                temporaryClosures.map((closure, index) => (
                    <div key={index} className="rounded-xl px-8 py-4 mb-0" style={{ backgroundColor: COLORS.bgGreen }}>
                        <div className="flex w-full justify-between mb-2">
                            <p className="font-medium text-base" style={{ color: COLORS.mainTextColor }}>
                                Temporary Closure Active
                            </p>
                            <div className="flex justify-end space-x-0">
                                <button
                                    onClick={() => handleEditTemporaryClose(index)}
                                    className="px-3 py-1 text-sm rounded-lg underline bg-transparent"
                                    style={{ color: COLORS.mainTextColor }}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleRemoveTemporaryClosure(index)}
                                    className="px-3 py-1 text-sm rounded-lg bg-transparent underline"
                                    style={{ color: COLORS.primary }}
                                >
                                    Cancel Closure
                                </button>
                            </div>
                        </div>
                        <div className="flex space-x-16 mb-1">
                            <p style={{fontSize: FONTS.sizes.sm, color: COLORS.mainTextColor, fontWeight: FONTS.weights.medium}}>
                                <span className="font-medium" style={{fontSize: FONTS.sizes.xs, color: COLORS.mainTextColor}}>From:</span> {closure.from.toLocaleString()}
                            </p>
                            <p style={{fontSize: FONTS.sizes.sm, color: COLORS.mainTextColor, fontWeight: FONTS.weights.medium}}>
                                <span className="font-medium" style={{fontSize: FONTS.sizes.xs, color: COLORS.mainTextColor}}>To:</span> {closure.to.toLocaleString()}
                            </p>
                        </div>
                        <p className="text-sm mb-2">
                            <span className="font-medium" style={{fontSize: FONTS.sizes.xs, color: COLORS.mainTextColor}}>Reason:</span> {closure.reason}
                        </p>
                    </div>
                ))    
            )}
            {schedule && Object.keys(schedule).length > 0 ? (
                <div className="flex flex-col gap-4">
                    {daysOfWeek.map(day => {
                        const dayKey = day.toLowerCase();
                        const daySchedule = schedule[dayKey];
                        if (!daySchedule) return null; // Don't display unselected days

                        return (
                            <div key={day} className="flex justify-between items-start">
                                <span className="font-normal w-1/3" style={{fontSize: FONTS.sizes.sm}}>{day}:</span>
                                <div className="flex-1 text-right">
                                    {daySchedule.open24Hours ? (
                                        <span className="text-green-600" style={{fontSize: FONTS.sizes.sm}}>Open 24 Hours</span>
                                    ) : daySchedule.closed ? (
                                        <span className="text-red-600" style={{fontSize: FONTS.sizes.sm}}>Closed</span>
                                    ) : daySchedule.timeBlocks && daySchedule.timeBlocks.length > 0 ? (
                                        daySchedule.timeBlocks.map((block, index) => (
                                            <div key={index} style={{fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium}}>
                                                {formatTime(block.from)} - {formatTime(block.to)}
                                            </div>
                                        ))
                                    ) : (
                                        <span style={{fontSize: FONTS.sizes.sm, color: COLORS.secondaryText}}>No schedule set</span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                    <div className="flex w-full justify-end mt-4 space-x-2">
                        <Button
                            variant="secondary"
                            onClick={handleOpenNewTempCloseModal}
                        >
                            Temporary Close Station
                        </Button>
                        <Button
                            onClick={handleEditClick}
                        >
                            Edit Schedule
                        </Button>
                    </div>
                    
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center gap-4 py-8">
                    <p style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>
                        No schedule has been set for this charging station yet.
                    </p>
                    <Button
                        onClick={handleOpenNewTempCloseModal}
                    >
                        Temporary Close Station
                    </Button>
                    <Button
                        onClick={handleEditClick}
                    >
                        Set Schedule
                    </Button>
                </div>
            )}

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Set Station Availability">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-4">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {daysOfWeek.map(day => (
                            <button
                                type="button"
                                key={day}
                                onClick={() => handleDayToggle(day)}
                                className={`px-4 py-2 rounded-full text-sm font-medium ${formSchedule[day.toLowerCase()]?.selected
                                    ? ' text-white'
                                    : ''
                                    }`}
                                style={{
                                    backgroundColor: formSchedule[day.toLowerCase()]?.selected
                                    ? COLORS.primary
                                    : COLORS.background,
                                    color: formSchedule[day.toLowerCase()]?.selected
                                    ? '#ffffff'
                                    : COLORS.mainTextColor
                                }}
                              >
                                {day.substring(0, 3)}
                            </button>
                        ))}
                    </div>

                    {daysOfWeek.map(day => {
                        const dayKey = day.toLowerCase();
                        const dayData = formSchedule[dayKey];
                        const isDaySelected = dayData?.selected;
                        const is24Hours = dayData?.open24Hours;
                        const isClosed = dayData?.closed;

                        // Get errors for the current day
                        const currentDayErrors = formErrors[dayKey] || {};

                        return (
                            isDaySelected && (
                                <div key={day} className="border p-4 rounded-lg flex flex-col gap-3" style={{ borderColor: COLORS.stroke }}>
                                    <h4 className="font-semibold" style={{ color: COLORS.mainTextColor }}>{day}</h4>

                                    <div className="flex items-center gap-4">
                                        <label className="flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox h-4 w-4"
                                                checked={is24Hours}
                                                onChange={() => handleOpen24HoursToggle(day)}
                                                style={{ accentColor: COLORS.primary }}
                                            />
                                            <span className="ml-2 text-sm">Open 24 Hours</span>
                                        </label>
                                        <label className="flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox h-4 w-4"
                                                checked={isClosed}
                                                onChange={() => handleClosedToggle(day)}
                                                style={{ accentColor: COLORS.primary }}
                                            />
                                            <span className="ml-2 text-sm">Closed</span>
                                        </label>
                                    </div>

                                    {!is24Hours && !isClosed && (
                                        <div className="flex flex-col gap-3">
                                            {dayData?.timeBlocks.map((block, index) => (
                                                <div key={index} className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2">
                                                        <label className="text-xs flex-shrink-0">From:</label>
                                                        <input
                                                            type="time"
                                                            value={block.from}
                                                            onChange={(e) => handleTimeChange(day, index, 'from', e.target.value)}
                                                            className={`border rounded-md px-2 py-1 w-full ${currentDayErrors.blocks?.[index]?.from ? 'border-red-500' : ''}`}
                                                            style={{ borderColor: COLORS.stroke, color: COLORS.mainTextColor, fontSize: FONTS.sizes.sm }}
                                                        />
                                                        <label className="text-xs flex-shrink-0">To:</label>
                                                        <input
                                                            type="time"
                                                            value={block.to}
                                                            onChange={(e) => handleTimeChange(day, index, 'to', e.target.value)}
                                                            className={`border rounded-md px-2 py-1 w-full ${currentDayErrors.blocks?.[index]?.to ? 'border-red-500' : ''}`}
                                                            style={{ borderColor: COLORS.stroke, color: COLORS.mainTextColor, fontSize: FONTS.sizes.sm }}
                                                        />
                                                        {dayData.timeBlocks.length > 1 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveBlock(day, index)}
                                                                className="ml-2 text-red-500 hover:text-red-700 text-lg"
                                                            >
                                                                &times;
                                                            </button>
                                                        )}
                                                    </div>
                                                    {currentDayErrors.blocks?.[index]?.from && (
                                                        <p className="text-red-500 text-xs ml-auto pr-8">{currentDayErrors.blocks[index].from}</p>
                                                    )}
                                                    {currentDayErrors.blocks?.[index]?.to && (
                                                        <p className="text-red-500 text-xs ml-auto pr-8">{currentDayErrors.blocks[index].to}</p>
                                                    )}
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={() => handleAddBlock(day)}
                                                className="mt-2 px-3 py-1 text-white rounded-md text-sm self-start underline bg-transparent"
                                                style={{color: COLORS.primary}}
                                            >
                                                + Add Time Block
                                            </button>
                                        </div>
                                    )}
                                    {currentDayErrors.general && (
                                        <p className="text-red-500 text-xs mt-1">{currentDayErrors.general}</p>
                                    )}
                                    {currentDayErrors.overlap && (
                                        <p className="text-red-500 text-xs mt-1">{currentDayErrors.overlap}</p>
                                    )}
                                </div>
                            )
                        );
                    })}

                    <div className="flex justify-end gap-3 mt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                        >
                            Save Schedule
                        </Button>
                    </div>
                </form>
            </Modal>

            <Modal isOpen={isTempCloseModalOpen} onClose={() => setIsTempCloseModalOpen(false)} title={editingClosureIndex !== null ? "Edit Temporary Closure" : "Add Temporary Closure"}>
                <form onSubmit={handleTemporaryCloseSubmit} className="flex flex-col gap-4 p-4">
                    <div>
                        <label htmlFor="fromDateTime" className="block text-xs font-medium mb-1" style={{color: COLORS.mainTextColor}}>From Date & Time:</label>
                        <input
                            type="datetime-local"
                            id="fromDateTime"
                            name="fromDateTime"
                            value={tempCloseForm.fromDateTime}
                            onChange={handleTempCloseChange}
                            className={`border rounded-md px-3 py-2 w-full ${tempCloseErrors.fromDateTime ? 'border-red-500' : ''}`}
                            style={{ borderColor: COLORS.stroke, color: COLORS.mainTextColor, fontSize: FONTS.sizes.sm }}
                        />
                        {tempCloseErrors.fromDateTime && (
                            <p className="text-red-500 text-xs mt-1">{tempCloseErrors.fromDateTime}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="toDateTime" className="block text-xs font-medium mb-1" style={{color: COLORS.mainTextColor}}>To Date & Time:</label>
                        <input
                            type="datetime-local"
                            id="toDateTime"
                            name="toDateTime"
                            value={tempCloseForm.toDateTime}
                            onChange={handleTempCloseChange}
                            className={`border rounded-md px-3 py-2 w-full ${tempCloseErrors.toDateTime ? 'border-red-500' : ''}`}
                            style={{ borderColor: COLORS.stroke, color: COLORS.mainTextColor, fontSize: FONTS.sizes.sm }}
                        />
                        {tempCloseErrors.toDateTime && (
                            <p className="text-red-500 text-xs mt-1">{tempCloseErrors.toDateTime}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="reason" className="block text-xs font-medium mb-1" style={{color: COLORS.mainTextColor}}>Reason for Closure:</label>
                        <textarea
                            id="reason"
                            name="reason"
                            value={tempCloseForm.reason}
                            onChange={handleTempCloseChange}
                            rows="4"
                            className={`border rounded-md px-3 py-2 w-full ${tempCloseErrors.reason ? 'border-red-500' : ''}`}
                            style={{ borderColor: COLORS.stroke, color: COLORS.mainTextColor, fontSize: FONTS.sizes.sm }}
                        ></textarea>
                        {tempCloseErrors.reason && (
                            <p className="text-red-500 text-xs mt-1">{tempCloseErrors.reason}</p>
                        )}
                    </div>
                    {tempCloseErrors.overlap && (
                        <p className="text-red-500 text-sm text-center">{tempCloseErrors.overlap}</p>
                    )}

                    <div className="flex justify-end gap-3 mt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsTempCloseModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                        >
                            {editingClosureIndex !== null ? "Save Changes" : "Apply Closure"} {/* Dynamic button text */}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}