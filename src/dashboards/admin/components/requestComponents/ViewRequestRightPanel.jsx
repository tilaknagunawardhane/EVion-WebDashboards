import React, { useState } from 'react';
import { COLORS, FONTS } from '../../../../constants';
import UserProfileCard from '../userComponents/UserProfileCard';
import ChatIcon from '../../../../assets/chat.svg';
import Button from '../../../../components/ui/Button';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Pointer } from 'lucide-react';

const primaryColorFilter = `
brightness(0)
invert(1)
`;

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Modal Component with backdrop blur (same as before)
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-opacity-30 backdrop-blur-lg" />
      <div 
        className="bg-white rounded-xl shadow-lg w-full max-w-md border relative z-10"
        style={{ borderColor: COLORS.stroke }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default function ViewRequestRightPanel({ request, onStatusUpdate }) {
    const [showDiscardModal, setShowDiscardModal] = useState(false);
    const [discardReason, setDiscardReason] = useState('');
    const [isTextareaFocused, setIsTextareaFocused] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentRequest, setCurrentRequest] = useState(request);

    const navigate = useNavigate();

    const user = {
        Name: currentRequest.requester,
        'Account Status': currentRequest.requesterStatus,
        'Date of Registration': currentRequest.date,
        Email: currentRequest.email,
        'Company Name': currentRequest.company,
        'Business Reg No': currentRequest.businessRegNo,
        'Tax ID': currentRequest.taxId
    };

    const handleStatusUpdate = async (action) => {
        setIsLoading(true);
        try {
            const payload = {
                action,
                ...(action === 'discard' && { reason: discardReason })
            };

            const response = await axios.put(
                `${API_BASE_URL}/api/admin/update-request-status/${currentRequest.id}`,
                payload,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('adminAccessToken')}`
                    }
                }
            );

            if (response.data.success) {
                setCurrentRequest(prev => ({
                    ...prev,
                    status: response.data.data.request_status === 'approved' ? 'IN-PROGRESS' : 
                           response.data.data.request_status === 'finished' ? 'WAITING FOR PAYMENT' :
                           'REJECTED',
                    request_status: response.data.data.request_status,
                    station_status: response.data.data.station_status
                }));
                toast.success(`Request ${action}d successfully`);
            } else {
                toast.error(response.data.message || 'Failed to update request status');
            }
        } catch (error) {
            console.error('Error updating request status:', error);
            toast.error(error.response?.data?.message || 'Error updating request status');
        } finally {
            setIsLoading(false);
            setShowDiscardModal(false);
            setDiscardReason('');
        }
    };

    const handleDiscard = () => {
        handleStatusUpdate('discard');
    };

    const handleApprove = () => {
        handleStatusUpdate('approve');
    };

    const handleComplete = () => {
        handleStatusUpdate('complete');
    };

    const handleModalClose = () => {
        setShowDiscardModal(false);
        setDiscardReason('');
    };

    const handleStatusUpdate = () => {
        if (request.status === 'NEW') {
            onStatusUpdate('IN-PROGRESS');
        } else if (request.status === 'IN-PROGRESS') {
            onStatusUpdate('WAITING FOR PAYMENT');
        }
    };

    const renderActionButtons = () => {
        switch (currentRequest.status) {
            case 'NEW':
                return (
                    <>
                        <Button
                            variant="danger_outline"
                            size="base"
                            className="w-full"
                            style={{
                                borderColor: COLORS.danger,
                                color: COLORS.danger
                            }}
                            onClick={() => setShowDiscardModal(true)}
                            disabled={isLoading}
                        >
                            Discard
                        </Button>
                        <Button
                            variant="primary"
                            size="base"
                            className="w-full"
                            onClick={handleApprove}
                            disabled={isLoading}
                        >
                            Approve
                        </Button>
                    </>
                );
            case 'IN-PROGRESS':
                return (
                    <>
                        <Button
                            variant="danger_outline"
                            size="base"
                            className="w-full"
                            style={{
                                borderColor: COLORS.danger,
                                color: COLORS.danger
                            }}
                            onClick={() => setShowDiscardModal(true)}
                            disabled={isLoading}
                        >
                            Discard
                        </Button>
                        <Button
                            variant="primary"
                            size="base"
                            className="w-full"
                            onClick={handleComplete}
                            disabled={isLoading}
                        >
                            Complete Installation
                        </Button>
                    </>
                );
            case 'WAITING FOR PAYMENT':
                return (
                    <div className="text-center py-2 px-4 rounded-md bg-transparent"
                        style={{
                            backgroundColor: COLORS.bgGreen,
                            color: COLORS.primary,
                            fontWeight: FONTS.weights.medium,
                            fontSize: FONTS.sizes.sm
                        }}>
                        APPROVED
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-140px)] overflow-y-auto relative">
            {/* Scrollable content area - No need for blur here since modal has its own backdrop */}
            <div className="space-y-4 md:space-y-6 flex-1">
                {/* User Profile Section */}
                <div className="w-full">
                    <UserProfileCard user={user} />
                </div>

                {/* Email with Chat Icon */}
                <div className="flex items-center justify-center gap-2">
                    <a
                        href={`mailto:${currentRequest.email}`}
                        className="flex items-center gap-1 text-primary hover:underline"
                        style={{
                            color: COLORS.primary,
                            fontSize: FONTS.sizes.sm,
                            cursor: 'pointer',
                            textDecoration: 'none'
                        }}
                    >
                        {currentRequest.email}
                        </a>
                        <img
                            src={ChatIcon}
                            alt="Chat icon"
                            style={{ filter: primaryColorFilter }}
                            className="w-4 h-4"
                        />
                    </div>
                    
                </div>

                {/* Operator Info Section */}
                <div className="p-4 rounded-lg bg-white shadow-sm">
                    <div className="space-y-2">
                        <div>
                            <p className="text-sm" style={{ color: COLORS.mainTextColor }}>
                                {currentRequest.operator}
                            </p>
                        </div>
                        <div className='flex justify-between'>
                            <p className="text-xs" style={{ color: COLORS.secondaryText }}>District</p>
                            <p className="text-xs" style={{ color: COLORS.mainTextColor }}>
                                {currentRequest.district}
                            </p>
                        </div>
                        <div className='flex justify-between'>
                            <p className="text-xs" style={{ color: COLORS.secondaryText }}>Business Reg No.</p>
                            <p className="text-xs" style={{ color: COLORS.mainTextColor }}>
                                {currentRequest.businessRegNo}
                            </p>
                        </div>
                        <div className='flex justify-between'>
                            <p className="text-xs" style={{ color: COLORS.secondaryText }}>Tax ID</p>
                            <p className="text-xs" style={{ color: COLORS.mainTextColor }}>
                                {currentRequest.taxId}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fixed action buttons at bottom */}
            <div className="sticky bottom-0 bg-white pt-4 pb-2" style={{
                backgroundColor: COLORS.background
            }}>
                <div className="flex flex-col gap-2">
                    {renderActionButtons()}
                </div>
            </div>

            {/* Discard Confirmation Modal */}
            <Modal isOpen={showDiscardModal} onClose={handleModalClose}>
                <div className="p-6" style={{ maxWidth: '600px' }}>
                    <h2 className="text-xl font-bold mb-4" style={{ 
                        color: COLORS.mainTextColor,
                        fontFamily: FONTS.family.sans
                    }}>
                        Discard {currentRequest.title.includes('Charger') ? 'Charger' : 'Station'}
                    </h2>
                    <p className="mb-4 text-sm" style={{ 
                        color: COLORS.mainTextColor,
                        fontFamily: FONTS.family.sans
                    }}>
                        Do you really want to discard this request to add a new charging {currentRequest.title.includes('Charger') ? 'charger' : 'station'}?
                    </p>
                    
                    <div className="mb-6">
                        <label className="block text-xs mb-2" style={{ 
                            color: COLORS.secondaryText,
                            fontFamily: FONTS.family.sans,
                            fontWeight: FONTS.weights.normal
                        }}>
                            Enter the reason to discard
                        </label>
                        <textarea
                            className="w-full p-3 border rounded text-sm transition-colors"
                            style={{
                                borderColor: isTextareaFocused ? COLORS.danger : COLORS.stroke,
                                minHeight: '100px',
                                fontFamily: FONTS.family.sans,
                                backgroundColor: isTextareaFocused ? COLORS.bgRed : COLORS.background,
                                outline: 'none'
                            }}
                            value={discardReason}
                            onChange={(e) => setDiscardReason(e.target.value)}
                            onFocus={() => setIsTextareaFocused(true)}
                            onBlur={() => setIsTextareaFocused(false)}
                            placeholder="Type your reason here..."
                        />
                    </div>
                    
                    <div className="flex justify-end gap-3">
                        <Button
                            variant="outline"
                            size="base"
                            onClick={handleModalClose}
                            disabled={isLoading}
                            style={{
                                borderColor: COLORS.stroke,
                                color: COLORS.mainTextColor,
                                fontFamily: FONTS.family.sans
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            size="base"
                            onClick={handleDiscard}
                            disabled={!discardReason.trim() || isLoading}
                            style={{ fontFamily: FONTS.family.sans }}
                        >
                            {isLoading ? 'Processing...' : 'Confirm'}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}