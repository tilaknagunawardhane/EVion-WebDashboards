// ChargerDetailsCard.jsx
import React, { useState } from 'react';
import { COLORS, FONTS } from '../../../../constants';
import Button from '../../../../components/ui/Button';

export default function ChargerDetailsCard({ charger, isNew = false, onStatusUpdate }) {

    const [showDeclineModal, setShowDeclineModal] = useState(false);
    const [declineReason, setDeclineReason] = useState('');

    // Ensure charger has all necessary fields with defaults
    const safeCharger = {
        name: 'Unnamed Charger',
        powerType: 'Unknown',
        maxPower: 0,
        price: 0,
        status: 'processing',
        connectors: [],
        rejectionReason: '',
        ...charger
    };

    const shouldShowRejection = safeCharger.status === 'rejected' && safeCharger.rejectionReason;

    const statusColors = {
        'processing': { bg: `${COLORS.primary}20`, text: COLORS.primary },
        'to_be_installed': { bg: `${COLORS.HighlightText}20`, text: COLORS.HighlightText },
        'rejected': { bg: `${COLORS.danger}20`, text: COLORS.danger },
        'open': { bg: `${COLORS.primary}20`, text: COLORS.primary },
        'unavailable': { bg: `${COLORS.warning}20`, text: COLORS.warning },
        'disabled_by_SO': { bg: `${COLORS.danger}20`, text: COLORS.danger },
        'deleted': { bg: `${COLORS.mainTextColor}20`, text: COLORS.mainTextColor }
    };

    const statusColor = statusColors[safeCharger.status] || statusColors.processing;
    const formattedStatus = safeCharger.status.toUpperCase().replace(/_/g, '  ');

    const handleApprove = () => {
        onStatusUpdate(safeCharger._id, 'approve');
    };

    const handleDecline = () => {
        if (declineReason.trim()) {
            onStatusUpdate(safeCharger._id, 'decline', declineReason);
            setShowDeclineModal(false);
            setDeclineReason('');
        }
    };

    const handleCompleteInstallation = () => {
        onStatusUpdate(safeCharger._id, 'complete-installation');
    };

    const renderActionButtons = () => {
        if (!isNew) return null;

        switch (safeCharger.status) {
            case 'processing':
                return (
                    <div className="flex gap-2 mt-4">
                        <Button
                            onClick={handleApprove}
                            className="px-3 py-1 text-xs font-normal items-center rounded-md"
                            variant='primary'
                        >
                            Approve
                        </Button>
                        <Button
                            onClick={() => setShowDeclineModal(true)}
                            className="px-3 py-1 font-normal text-xs rounded-md"
                            variant='danger'
                        >
                            Decline
                        </Button>
                    </div>
                );
            
            case 'to_be_installed':
                return (
                    <div className="mt-4">
                        <Button
                            onClick={handleCompleteInstallation}
                            className="px-3 py-1 text-xs rounded-md"
                            variant='primary'
                        >
                            Complete Installation
                        </Button>
                    </div>
                );
            
            default:
                return null;
        }
    };

    return (
        <div
            className="rounded-lg bg-white p-4 mb-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            style={{
                borderColor: COLORS.stroke
            }}
        >
            <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium" style={{ 
                    color: COLORS.mainTextColor,
                    fontSize: FONTS.sizes.base
                }}>
                    {safeCharger.name}
                </h4>
                <span className="px-2 py-1 rounded-full text-xs" style={{
                    backgroundColor: statusColor.bg,
                    color: statusColor.text,
                    fontWeight: FONTS.weights.medium
                }}>
                    {formattedStatus}
                </span>
            </div>

            <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                    <p className="text-xs" style={{
                        color: COLORS.secondaryText,
                        fontFamily: FONTS.family.sans
                    }}>
                        {safeCharger.powerType} Charger
                    </p>
                    <p className="text-xs" style={{
                        color: COLORS.secondaryText,
                        fontFamily: FONTS.family.sans
                    }}>
                        Power Output: {safeCharger.maxPower} kWh
                    </p>
                </div>
                <p className="text-xs" style={{
                    color: COLORS.secondaryText,
                    fontFamily: FONTS.family.sans
                }}>
                    Unit Price: LKR {safeCharger.price || '0.00'}
                </p>
            </div>

            <div className="flex justify-between items-center">
                <span style={{ 
                    color: COLORS.mainTextColor,
                    fontSize: FONTS.sizes.xs,
                    fontWeight: FONTS.weights.normal
                }}>
                    Connectors:
                </span>
                {/* <div className="text-right">
                    {safeCharger.connectors.length > 0 ? (
                        safeCharger.connectors.map((connector, index) => (
                            <span
                                key={index}
                                className="inline-block text-xs"
                                style={{
                                    color: COLORS.mainTextColor,
                                    fontWeight: FONTS.weights.medium
                                }}
                            >
                                {connector} 
                            </span>
                        ))
                    ) : (
                        <span style={{ 
                            color: COLORS.secondaryText,
                            fontSize: FONTS.sizes.sm
                        }}>
                            None
                        </span>
                    )}
                </div> */}
                <span style={{
                        color: COLORS.mainTextColor,
                        fontWeight: FONTS.weights.medium,
                        fontSize: FONTS.sizes.xs
                    }}>
                        {safeCharger.connectors || 'N/A'}
                    </span>
            </div>

            {shouldShowRejection && (
                <div className="mt-3 p-2 rounded-md" style={{
                    backgroundColor: `${COLORS.danger}10`,
                    border: `1px solid ${COLORS.danger}30`
                }}>
                    <span style={{ 
                        color: COLORS.danger,
                        fontSize: FONTS.sizes.xs,
                        fontWeight: FONTS.weights.medium
                    }}>
                        Rejection Reason: {safeCharger.rejectionReason}
                    </span>
                </div>
            )}

            {renderActionButtons()}

            {/* Decline Modal */}
            {showDeclineModal && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-lg flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h3 className="text-lg font-medium mb-4">Decline Reason</h3>
                        <textarea
                            value={declineReason}
                            onChange={(e) => setDeclineReason(e.target.value)}
                            placeholder="Enter reason for declining..."
                            className="w-full p-2 border rounded-md mb-4 text-sm"
                            style={{color: COLORS.secondaryText}}
                            rows="4"
                        />
                        <div className="flex gap-2 justify-end">
                            <Button
                                onClick={() => setShowDeclineModal(false)}
                                className="px-4 py-2 text-sm rounded-md"
                                variant='outline'
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleDecline}
                                disabled={!declineReason.trim()}
                                className="px-4 py-2 text-sm rounded-md disabled:opacity-50"
                                variant='danger'
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}