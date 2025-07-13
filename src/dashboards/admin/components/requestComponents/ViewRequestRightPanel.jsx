import React, { useState } from 'react';
import { COLORS, FONTS } from '../../../../constants';
import UserProfileCard from '../userComponents/UserProfileCard';
import ChatIcon from '../../../../assets/chat.svg';
import Button from '../../../../components/ui/Button';

// Modal Component with backdrop blur
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

export default function ViewRequestRightPanel({ request }) {
    const [showDiscardModal, setShowDiscardModal] = useState(false);
    const [discardReason, setDiscardReason] = useState('');
    const [isTextareaFocused, setIsTextareaFocused] = useState(false);

    const user = {
        Name: request.requester,
        'Account Status': request.requesterStatus,
        'Date of Registration': request.date,
        Email: request.email,
        'Company Name': request.company,
        'Business Reg No': request.businessRegNo,
        'Tax ID': request.taxId
    };

    const handleDiscard = () => {
        // Handle discard logic here
        console.log('Discarding with reason:', discardReason);
        setShowDiscardModal(false);
        setDiscardReason('');
    };

    const handleModalClose = () => {
        setShowDiscardModal(false);
        setDiscardReason(''); // Clear textarea when modal closes
    };

    const renderActionButtons = () => {
        switch (request.status) {
            case 'NEW':
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
                        >
                            Discard
                        </Button>
                        <Button
                            variant="primary"
                            size="base"
                            className="w-full"
                        >
                            {request.status === 'NEW' ? 'Approve' : 'Complete Installation'}
                        </Button>
                    </>
                );
            case 'WAITING FOR PAYMENT':
                return (
                    <div className="text-center py-2 px-4 rounded-md"
                        style={{
                            backgroundColor: `${COLORS.primary}20`,
                            color: COLORS.primary,
                            fontWeight: FONTS.weights.medium
                        }}>
                        APPROVED
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col h-full relative">
            {/* Scrollable content area - No need for blur here since modal has its own backdrop */}
            <div className="space-y-4 md:space-y-6 overflow-y-auto flex-1">
                {/* User Profile Section */}
                <div className="w-full">
                    <UserProfileCard user={user} />
                </div>

                {/* Email with Chat Icon */}
                <div className="flex items-center justify-center gap-2">
                    <a
                        href={`mailto:${request.email}`}
                        className="flex items-center gap-1 text-primary hover:underline"
                        style={{
                            color: COLORS.primary,
                            fontSize: FONTS.sizes.sm,
                            cursor: 'pointer',
                            textDecoration: 'none'
                        }}
                    >
                        {request.email}
                        <img
                            src={ChatIcon}
                            alt="Chat icon"
                            className="w-5 h-5"
                        />
                    </a>
                </div>

                {/* Operator Info Section */}
                <div className="p-4 rounded-lg bg-white shadow-sm">
                    <div className="space-y-2">
                        <div>
                            <p className="text-sm" style={{ color: COLORS.mainTextColor }}>
                                {request.operator}
                            </p>
                        </div>
                        <div className='flex justify-between'>
                            <p className="text-xs" style={{ color: COLORS.secondaryText }}>District</p>
                            <p className="text-xs" style={{ color: COLORS.mainTextColor }}>
                                {request.district}
                            </p>
                        </div>
                        <div className='flex justify-between'>
                            <p className="text-xs" style={{ color: COLORS.secondaryText }}>Business Reg No.</p>
                            <p className="text-xs" style={{ color: COLORS.mainTextColor }}>
                                {request.businessRegNo}
                            </p>
                        </div>
                        <div className='flex justify-between'>
                            <p className="text-xs" style={{ color: COLORS.secondaryText }}>Tax ID</p>
                            <p className="text-xs" style={{ color: COLORS.mainTextColor }}>
                                {request.taxId}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fixed action buttons at bottom */}
            <div className="sticky bottom-0 bg-white pt-4 pb-2" style={{
                backgroundColor: COLORS.background
            }}>
                <div className="flex flex-col gap-3">
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
                        Discard {request.title.includes('Charger') ? 'Charger' : 'Station'}
                    </h2>
                    <p className="mb-4 text-sm" style={{ 
                        color: COLORS.secondaryText,
                        fontFamily: FONTS.family.sans
                    }}>
                        Do you really want to discard this request to add a new charging {request.title.includes('Charger') ? 'charger' : 'station'}?
                    </p>
                    
                    <div className="mb-6">
                        <label className="block text-xs mb-2" style={{ 
                            color: COLORS.secondaryText,
                            fontFamily: FONTS.family.sans
                        }}>
                            Enter the reason to discard
                        </label>
                        <textarea
                            className="w-full p-3 border rounded text-sm transition-colors"
                            style={{
                                borderColor: isTextareaFocused ? COLORS.primary : COLORS.stroke,
                                minHeight: '100px',
                                fontFamily: FONTS.family.sans,
                                backgroundColor: COLORS.background,
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
                            disabled={!discardReason.trim()}
                            style={{ fontFamily: FONTS.family.sans }}
                        >
                            Confirm
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}