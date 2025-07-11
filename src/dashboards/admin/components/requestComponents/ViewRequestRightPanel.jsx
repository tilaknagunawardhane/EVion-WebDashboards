import React from 'react';
import { COLORS, FONTS } from '../../../../constants';
import UserProfileCard from '../userComponents/UserProfileCard';
import ChatIcon from '../../../../assets/chat.svg';
import Button from '../../../../components/ui/Button';

export default function ViewRequestRightPanel({ request }) {
    const user = {
        Name: request.requester,
        'Account Status': request.requesterStatus,
        'Date of Registration': request.date,
        Email: request.email,
        'Company Name': request.company,
        'Business Reg No': request.businessRegNo,
        'Tax ID': request.taxId
    };

    const renderActionButtons = () => {
        switch (request.status) {
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
                        >
                            Discard
                        </Button>
                        <Button
                            variant="primary"
                            size="base"
                            className="w-full"
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
                        >
                            Discard
                        </Button>
                        <Button
                            variant="primary"
                            size="base"
                            className="w-full"
                        >
                            Complete Installation
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
        <div className="flex flex-col h-full">
            {/* Scrollable content area */}
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
        </div>
    );
}