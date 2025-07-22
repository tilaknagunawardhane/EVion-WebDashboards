// src/components/modals/PaymentDetailsModal.jsx
import React, { useState, useEffect } from 'react';
import Button from '../../../../components/ui/Button'; // Adjust path as necessary
import { COLORS, FONTS } from '../../../../constants'; // Adjust path as necessary

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/10 flex items-center justify-center">
            <div className="bg-white rounded-xl p-8 w-full max-w-lg shadow-md max-h-[90vh] overflow-y-auto relative">
                <h3 className="text-xl font-medium mb-4" style={{ color: COLORS.mainTextColor }}>{title}</h3>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-3xl font-extralight"
                    style={{ color: COLORS.secondaryText }}
                >
                    ×
                </button>
                {children}
            </div>
        </div>
    );
};


export default function PaymentDetailsModal({ isOpen, onClose, paymentData, onConfirmPayment }) {
    const [proofFile, setProofFile] = useState(null);
    const [fileError, setFileError] = useState('');

    // Reset state when modal opens/closes or paymentData changes
    useEffect(() => {
        if (isOpen) {
            setProofFile(null);
            setFileError('');
        }
    }, [isOpen, paymentData]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
                setProofFile(file);
                setFileError('');
            } else {
                setProofFile(null);
                setFileError('Please upload a PDF or image file (JPG, PNG).');
            }
        } else {
            setProofFile(null);
            setFileError('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!proofFile) {
            setFileError('Proof document is required.');
            return;
        }
        // In a real application, you would upload the file to storage (e.g., Firebase Storage, S3)
        // and then pass the URL to onConfirmPayment.
        // For this example, we'll simulate a file upload with a dummy URL.
        const dummyProofUrl = `https://example.com/proofs/${paymentData.paymentID || 'new'}-${Date.now()}.${proofFile.name.split('.').pop()}`;
        onConfirmPayment(paymentData.paymentID, dummyProofUrl, proofFile);
    };

    if (!isOpen || !paymentData) return null;

    // Mock bank details for the station owner
    const mockBankDetails = {
        bankName: 'Commercial Bank PLC',
        accountNumber: '1234 1234 1234', // Masked
        accountHolder: paymentData['Owner Name'],
        branch: 'Colombo Main Branch',
        swiftCode: 'CBLLKSLX',
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Payment Details & Proof Upload">
            <div className="p-0">
                <h4 className="text-md font-medium mb-3" style={{ color: COLORS.mainTextColor }}>Station Owner Account Details:</h4>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6 text-sm mb-6 p-6 rounded-xl" style={{ backgroundColor: COLORS.background}}>
                    <p><strong style={{ color: COLORS.secondaryText, fontWeight: FONTS.weights.normal, fontSize: FONTS.sizes.xs }}>Owner Name:</strong> {paymentData['Owner Name']}</p>
                    <div className="flex justify-between space-x-4">
                        <p><strong style={{ textAlign: 'left', color: COLORS.secondaryText, fontWeight: FONTS.weights.normal, fontSize: FONTS.sizes.xs  }}>Bank Name:</strong> {mockBankDetails.bankName}</p>
                        <p><strong style={{ textAlignl: 'right', color: COLORS.secondaryText, fontWeight: FONTS.weights.normal, fontSize: FONTS.sizes.xs  }}>Branch:</strong> {mockBankDetails.branch}</p>
                    </div>
                    
                    <p><strong style={{ color: COLORS.secondaryText, fontWeight: FONTS.weights.normal, fontSize: FONTS.sizes.xs  }}>Account No:</strong> {mockBankDetails.accountNumber}</p>
                    <p><strong style={{ color: COLORS.secondaryText, fontWeight: FONTS.weights.normal, fontSize: FONTS.sizes.xs  }}>Account Holder:</strong> {mockBankDetails.accountHolder}</p>
                    
                    {/* <p><strong style={{ color: COLORS.secondaryText, fontWeight: FONTS.weights.normal, fontSize: FONTS.sizes.xs  }}>SWIFT Code:</strong> {mockBankDetails.swiftCode}</p> */}
                    <div className="flex justify-between space-x-4">
                        <p style={{ fontSize: FONTS.sizes['xl'], color: COLORS.primary}}><strong style={{ color: COLORS.secondaryText, fontWeight: FONTS.weights.normal, fontSize: FONTS.sizes.xs  }}>Total Revenue:</strong> {paymentData['Total Revenue(LKR)']}</p>
                        <p><strong style={{ color: COLORS.secondaryText, fontWeight: FONTS.weights.normal, fontSize: FONTS.sizes.xs  }}>Week Range:</strong> {paymentData['Week Range']}</p>
                    </div>
                    
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="proofUpload" className="block text-xs font-medium mb-1" style={{ color: COLORS.mainTextColor }}>Upload Proof Document (PDF, JPG, PNG):</label>
                        <input
                            type="file"
                            id="proofUpload"
                            name="proofUpload"
                            accept=".pdf, .jpg, .jpeg, .png"
                            onChange={handleFileChange}
                            className={`border rounded-md px-3 py-2 w-full text-sm ${fileError ? 'border-red-500' : 'border-neutral-200'}`}
                            style={{ borderColor: COLORS.stroke, color: COLORS.mainTextColor, fontSize: FONTS.sizes.sm }}
                        />
                        {fileError && (
                            <p className="text-red-500 text-xs mt-1">{fileError}</p>
                        )}
                        {proofFile && (
                            <p className="text-xs mt-1" style={{ color: COLORS.secondaryText }}>Selected file: {proofFile.name}</p>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 mt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                        >
                            Close
                        </Button>
                        <Button
                            type="submit"
                            disabled={!proofFile} // Disable until a file is selected
                        >
                            Upload and Confirm Payment
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}