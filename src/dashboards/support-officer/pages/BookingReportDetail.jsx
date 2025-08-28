import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { FONTS, COLORS } from "../../../constants";
import PageHeader from "../../admin/components/AdminPageHeader";
import UserPageHeader from '../components/UserPageHeader';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function BookingReportDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { isSupportOfficer } = useAuth();
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [action, setAction] = useState('');
    const [refundAmount, setRefundAmount] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectedReason, setRejectedReason] = useState('');
    const [showRefundConfirm, setShowRefundConfirm] = useState(false);
    const [showAddRefundModal, setShowAddRefundModal] = useState(false);
    const [newRefundAmount, setNewRefundAmount] = useState('');
    const [showUpdateRefundConfirm, setShowUpdateRefundConfirm] = useState(false);

    const userId = location.state?.userId;

    useEffect(() => {
        if (!isSupportOfficer) {
            toast.error('Access denied');
            navigate('/support-officer/fault-reports');
            return;
        }
        fetchReportDetails();
    }, [id, isSupportOfficer, navigate]);

    const fetchReportDetails = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/api/reports/report-details/bookings/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Failed to fetch report details');

            const data = await response.json();
            if (data.success) {
                setReport(data.data);
                setAction(data.data.action || '');
                setRefundAmount(data.data.refund_amount || '');
                setNewRefundAmount(data.data.refund_amount || '');
            }
        } catch (error) {
            toast.error('Failed to load report details');
        } finally {
            setLoading(false);
        }
    };

    const handleResolve = async () => {
        if (!action) {
            toast.error('Please describe the actions taken');
            return;
        }

        if (refundAmount && parseFloat(refundAmount) > 0) {
            setShowRefundConfirm(true);
            return;
        }

        await submitResolve();
    };

    const submitResolve = async () => {
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/api/reports/save-report-action/bookings/${id}/action`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    status: 'resolved',
                    action,
                    resolved_by: userId || 'Support Officer',
                    refund_amount: refundAmount ? parseFloat(refundAmount) : undefined
                })
            });

            const data = await response.json();
            if (data.success) {
                toast.success('Report marked as resolved');
                setReport(data.data);
                setRefundAmount(data.data.refund_amount || '');
                setNewRefundAmount(data.data.refund_amount || '');
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            toast.error('Failed to update report');
        } finally {
            setIsSubmitting(false);
            setShowRefundConfirm(false);
        }
    };

    const handleReject = () => {
        setShowRejectModal(true);
    };

    const confirmReject = async () => {
        if (!rejectedReason) {
            toast.error('Please provide a rejection reason');
            return;
        }

        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/api/reports/save-report-action/bookings/${id}/action`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    status: 'rejected',
                    action: action || 'Report rejected',
                    rejected_reason: rejectedReason,
                    resolved_by: userId || 'Support Officer'
                })
            });

            const data = await response.json();
            if (data.success) {
                toast.success('Report rejected successfully');
                navigate('/support-officer/faultReports');
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            toast.error('Failed to reject report');
        } finally {
            setIsSubmitting(false);
            setShowRejectModal(false);
        }
    };

    const handleAddRefund = () => {
        setShowAddRefundModal(true);
        setNewRefundAmount(report.refund_amount || '');
    };

    const confirmAddRefund = async () => {
        if (!newRefundAmount || parseFloat(newRefundAmount) <= 0) {
            toast.error('Please enter a valid refund amount');
            return;
        }

        // Check if this is an update to existing refund
        const hasExistingRefund = report.refund_amount && report.refund_amount > 0;
        const isChangingAmount = hasExistingRefund && parseFloat(newRefundAmount) !== parseFloat(report.refund_amount);

        if (isChangingAmount) {
            setShowUpdateRefundConfirm(true);
            return;
        }

        await submitAddRefund();
    };

    const submitAddRefund = async () => {
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/api/reports/refund-reports/bookings/${id}/refund`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    refund_amount: parseFloat(newRefundAmount),
                    is_refunded: true
                })
            });

            const data = await response.json();
            if (data.success) {
                const successMessage = report.refund_amount && report.refund_amount > 0 
                    ? 'Refund updated successfully' 
                    : 'Refund added successfully';
                
                toast.success(successMessage);
                setReport(data.data);
                setRefundAmount(data.data.refund_amount || '');
                setNewRefundAmount(data.data.refund_amount || '');
                setShowAddRefundModal(false);
                setShowUpdateRefundConfirm(false);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            toast.error('Failed to process refund');
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeRejectModal = () => {
        setShowRejectModal(false);
        setRejectedReason('');
    };

    const closeRefundConfirm = () => {
        setShowRefundConfirm(false);
    };

    const closeAddRefundModal = () => {
        setShowAddRefundModal(false);
        setShowUpdateRefundConfirm(false);
    };

    if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>;
    if (!report) return <div>Report not found</div>;

    const canAddRefund = report.status === 'resolved' && report.status !== 'rejected';
    const hasExistingRefund = report.refund_amount && report.refund_amount > 0;

    return (
        <div style={{ fontFamily: FONTS.family.sans, padding: '24px', backgroundColor: COLORS.background }}>
            <UserPageHeader title={`Booking Report - ${report.category}`} />

            {/* Reject Modal */}
            {showRejectModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h3 className="text-lg font-semibold mb-4">Reject Report</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Rejection Reason *
                            </label>
                            <textarea
                                value={rejectedReason}
                                onChange={(e) => setRejectedReason(e.target.value)}
                                rows="4"
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Please provide the reason for rejection..."
                                required
                            />
                        </div>
                        <div className="flex space-x-3 justify-end">
                            <button
                                onClick={closeRejectModal}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmReject}
                                disabled={isSubmitting || !rejectedReason}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Rejecting...' : 'Confirm Reject'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Refund Confirmation Modal */}
            {showRefundConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h3 className="text-lg font-semibold mb-4">Confirm Refund</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            You are about to issue a refund of <strong>Rs {refundAmount}</strong> for this booking report.
                            Are you sure you want to proceed?
                        </p>
                        <div className="flex space-x-3 justify-end">
                            <button
                                onClick={closeRefundConfirm}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={submitResolve}
                                disabled={isSubmitting}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Processing...' : 'Confirm Refund & Resolve'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Refund Modal */}
            {showAddRefundModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h3 className="text-lg font-semibold mb-4">
                            {hasExistingRefund ? 'Update Refund' : 'Add Refund'}
                        </h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Refund Amount *
                            </label>
                            <input
                                type="number"
                                value={newRefundAmount}
                                onChange={(e) => setNewRefundAmount(e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="0.00"
                                step="0.01"
                                min="0"
                            />
                            {hasExistingRefund && (
                                <p className="text-sm text-gray-500 mt-1">
                                    Current refund amount: Rs {report.refund_amount}
                                </p>
                            )}
                        </div>
                        <div className="flex space-x-3 justify-end">
                            <button
                                onClick={closeAddRefundModal}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmAddRefund}
                                disabled={isSubmitting || !newRefundAmount || parseFloat(newRefundAmount) <= 0}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Processing...' : hasExistingRefund ? 'Update Refund' : 'Add Refund'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Update Refund Confirmation Modal */}
            {showUpdateRefundConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h3 className="text-lg font-semibold mb-4">Confirm Refund Update</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            You are about to change the refund amount from <strong>Rs {report.refund_amount}</strong> to <strong>Rs {newRefundAmount}</strong>.
                            Are you sure you want to update the refund?
                        </p>
                        <div className="flex space-x-3 justify-end">
                            <button
                                onClick={closeAddRefundModal}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={submitAddRefund}
                                disabled={isSubmitting}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Updating...' : 'Confirm Update'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow p-6 mb-6">
                        <h2 className="text-xl font-semibold mb-4">Report Details</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium" style={{ color: COLORS.secondaryText }}>Report ID</label>
                                <p className="mt-1">{report._id}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium" style={{ color: COLORS.secondaryText }}>Status</label>
                                <p className="mt-1 capitalize">{report.status.replace('-', ' ')}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium" style={{ color: COLORS.secondaryText }}>Reported By</label>
                                <p className="mt-1">{report.user_id?.name}</p>
                                <p className="mt-1">{report.user_id?.email}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium" style={{ color: COLORS.secondaryText }}>Reported Date</label>
                                <p className="mt-1">{new Date(report.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium" style={{ color: COLORS.secondaryText }}>Reported Time</label>
                                <p className="mt-1">{new Date(report.createdAt).toLocaleTimeString()}</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium" style={{ color: COLORS.secondaryText }}>Description</label>
                            <p className="mt-1 bg-gray-50 p-3 rounded">{report.description}</p>
                        </div>

                        {report.attachments && report.attachments.length > 0 && (
                            <div className="mb-6">
                                <label className="block text-sm font-medium" style={{ color: COLORS.secondaryText }}>Attachments</label>
                                <div className="mt-2 space-y-2">
                                    {report.attachments.map((attachment, index) => (
                                        <a key={index} href={attachment} target="_blank" rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 text-sm block">
                                            Attachment {index + 1}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mb-6">
                            <label className="block text-sm font-medium" style={{ color: COLORS.secondaryText }}>Station Details</label>
                            <div className="mt-2 bg-gray-50 p-3 rounded">
                                <p><strong>Name:</strong> {report.booking_id?.charging_station_id?.station_name}</p>
                                <p><strong>Address:</strong> {report.booking_id?.charging_station_id?.address}, {report.booking_id?.charging_station_id?.city}</p>
                                <p><strong>Status:</strong> {report.booking_id?.charging_station_id?.station_status}</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium" style={{ color: COLORS.secondaryText }}>Booking Details</label>
                            <div className="mt-2 bg-gray-50 p-3 rounded">
                                <p><strong>Booking ID:</strong> {report.booking_id?._id}</p>
                                <p><strong>Date:</strong> {report.booking_id?.booking_date ? new Date(report.booking_id.booking_date).toLocaleDateString() : 'N/A'}</p>
                                <p><strong>Time:</strong> {report.booking_id?.start_time ? new Date(report.booking_id.start_time).toLocaleTimeString() : 'N/A'}</p>
                                <p><strong>Status:</strong> {report.booking_id?.status}</p>
                                <p><strong>Cost:</strong> Rs {report.booking_id?.cost || '0.00'}</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium" style={{ color: COLORS.secondaryText }}>Vehicle Details</label>
                            <div className="mt-2 bg-gray-50 p-3 rounded">
                                <p><strong>Make:</strong> {report.vehicle_details?.make}</p>
                                <p><strong>Model:</strong> {report.vehicle_details?.model}</p>
                                <p><strong>Year:</strong> {report.vehicle_details?.manufactured_year}</p>
                                <p><strong>Color:</strong> {report.vehicle_details?.color}</p>
                                <p><strong>Battery Capacity:</strong> {report.vehicle_details?.battery_capacity} kWh</p>
                                <p><strong>AC Connector:</strong> {report.vehicle_details?.connector_type_AC}</p>
                                <p><strong>DC Connector:</strong> {report.vehicle_details?.connector_type_DC}</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium" style={{ color: COLORS.secondaryText }}>Charger & Connector Details</label>
                            <div className="mt-2 bg-gray-50 p-3 rounded">
                                <p><strong>Charger Name:</strong> {report.charger_details?.charger_name || 'N/A'}</p>
                                <p><strong>Power Type:</strong> {report.charger_details?.power_type || 'N/A'}</p>
                                <p><strong>Max Power Output:</strong> {report.charger_details?.max_power_output || 'N/A'} kW</p>
                                <p><strong>Connector Type:</strong> {report.connector_details?.type_name || 'N/A'}</p>
                                <p><strong>Current Type:</strong> {report.connector_details?.current_type || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow p-6 sticky top-6">
                        <h3 className="text-lg font-semibold mb-4">Resolution Actions</h3>

                        {report.status === 'under-review' && (
                            <>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Actions Taken (for resolution)
                                    </label>
                                    <textarea
                                        value={action}
                                        onChange={(e) => setAction(e.target.value)}
                                        rows="4"
                                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Describe the actions taken to resolve this issue..."
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Refund Amount (Optional)
                                    </label>
                                    <input
                                        type="number"
                                        value={refundAmount}
                                        onChange={(e) => setRefundAmount(e.target.value)}
                                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="0.00"
                                        step="0.01"
                                        min="0"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <button
                                        onClick={handleResolve}
                                        disabled={isSubmitting || !action}
                                        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Mark as Resolved'}
                                    </button>
                                    <button
                                        onClick={handleReject}
                                        disabled={isSubmitting}
                                        className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Reject Report'}
                                    </button>
                                </div>
                            </>
                        )}

                        {report.status !== 'under-review' && (
                            <div className="space-y-4">
                                <div className="bg-gray-50 p-4 rounded-md">
                                    <h4 className="font-medium mb-2">Resolution Details</h4>
                                    <p className="text-sm text-gray-600 mb-2">
                                        <strong>Status:</strong> {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                                    </p>
                                    {report.action && (
                                        <p className="text-sm text-gray-600 mb-2">
                                            <strong>Actions Taken:</strong> {report.action}
                                        </p>
                                    )}
                                    {report.rejected_reason && (
                                        <p className="text-sm text-gray-600 mb-2">
                                            <strong>Rejection Reason:</strong> {report.rejected_reason}
                                        </p>
                                    )}
                                    {report.refund_amount && (
                                        <p className="text-sm text-gray-600 mb-2">
                                            <strong>Refund Amount:</strong> Rs {report.refund_amount}
                                        </p>
                                    )}
                                    {report.resolved_at && (
                                        <p className="text-sm text-gray-600 mt-2">
                                            <strong>Resolved At:</strong> {new Date(report.resolved_at).toLocaleString()}
                                        </p>
                                    )}
                                </div>

                                {canAddRefund && (
                                    <button
                                        onClick={handleAddRefund}
                                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                                    >
                                        {report.refund_amount ? 'Update Refund' : 'Add Refund'}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}