import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { COLORS } from "../../../../constants";
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PaymentProofModal = ({ isOpen, onClose, payoutBatch, onUploadProof, isSubmitting }) => {
    const [bankReference, setBankReference] = useState('');
    const [paymentNotes, setPaymentNotes] = useState('');
    const [proofFile, setProofFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [uploadingFile, setUploadingFile] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                toast.error('File size must be less than 5MB');
                return;
            }
            if (!['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'].includes(file.type)) {
                toast.error('Please upload a JPG, PNG, or PDF file');
                return;
            }
            setProofFile(file);
            setFileName(file.name);
        }
    };

    const uploadFileToServer = async (file) => {
        setUploadingFile(true);
        try {
            const formData = new FormData();
            formData.append('payment-proofs', file);
            formData.append('folder', 'payment-proofs');
            
            const token = localStorage.getItem('token');
            const response = await axios.post(`${API_BASE_URL}/api/admin/upload/file`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                console.log('File uploaded successfully:', response.data.fileUrl);
                return response.data.fileUrl;
            } else {
                throw new Error('File upload failed');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            throw new Error('Failed to upload file');
        } finally {
            setUploadingFile(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!bankReference.trim()) {
            toast.error('Please enter a bank reference number');
            return;
        }

        if (!proofFile) {
            toast.error('Please upload a payment proof file');
            return;
        }

        try {
            // Upload file to server
            const fileUrl = await uploadFileToServer(proofFile);
            console.log('Received file URL:', fileUrl);
            
            // Call the parent component's upload proof function
            await onUploadProof({
                bank_reference: bankReference.trim(),
                payment_proof_url: fileUrl,
                notes: paymentNotes.trim()
            });

            // Reset form
            setBankReference('');
            setPaymentNotes('');
            setProofFile(null);
            setFileName('');
            
        } catch (error) {
            console.error('Error in payment proof submission:', error);
            toast.error(error.message || 'Failed to process payment proof');
        }
    };

    const handleClose = () => {
        setBankReference('');
        setPaymentNotes('');
        setProofFile(null);
        setFileName('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">Upload Payment Proof</h2>
                
                {/* Batch Information */}
                <div className="mb-6 p-4 bg-gray-50 rounded border border-gray-200">
                    <h3 className="font-medium mb-2">Batch Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div>
                            <span className="font-medium">Batch Number:</span> {payoutBatch?.batch_number}
                        </div>
                        <div>
                            <span className="font-medium">Period:</span> {payoutBatch?.month_year}
                        </div>
                        <div>
                            <span className="font-medium">Total Amount:</span> {payoutBatch?.total_amount}
                        </div>
                        <div>
                            <span className="font-medium">Station Owners:</span> {payoutBatch?.total_station_owners}
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bank Reference Number *
                        </label>
                        <input
                            type="text"
                            value={bankReference}
                            onChange={(e) => setBankReference(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter bank transaction reference number"
                            required
                            disabled={isSubmitting || uploadingFile}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Payment Proof (Receipt/Screenshot) *
                        </label>
                        <div className="flex items-center gap-3">
                            <label className="flex-1">
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    accept=".jpg,.jpeg,.png,.pdf"
                                    className="hidden"
                                    disabled={isSubmitting || uploadingFile}
                                />
                                <div className={`w-full border border-gray-300 rounded-md p-2 text-center cursor-pointer transition-colors ${
                                    isSubmitting || uploadingFile ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-gray-50'
                                }`}>
                                    {uploadingFile ? 'Uploading file...' : (fileName || 'Choose file (JPG, PNG, PDF - max 5MB)')}
                                </div>
                            </label>
                            {fileName && !uploadingFile && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setProofFile(null);
                                        setFileName('');
                                    }}
                                    className="px-3 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors text-sm"
                                    disabled={isSubmitting}
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            Supported formats: JPG, PNG, PDF (Maximum file size: 5MB)
                        </p>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Notes (Optional)
                        </label>
                        <textarea
                            value={paymentNotes}
                            onChange={(e) => setPaymentNotes(e.target.value)}
                            rows="3"
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Any additional notes about this payment..."
                            disabled={isSubmitting || uploadingFile}
                        />
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={isSubmitting || uploadingFile}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting || uploadingFile || !bankReference || !proofFile}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors"
                        >
                            {isSubmitting || uploadingFile ? 'Processing...' : 'Confirm Payment'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PaymentProofModal;