import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { COLORS, FONTS } from '../../../../constants';
import StationOwnerPageHeader from '../../components/StationOwnerPageHeader';
import { useAuth } from '../../../../contexts/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const StationOwnerReportDetails = () => {
    const { type, reportId } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (currentUser && reportId && type) {
            fetchReportDetails();
        }
    }, [currentUser, reportId, type]);

    const fetchReportDetails = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userID');
            
            if (!userId) {
                toast.error('User ID not found');
                return;
            }

            // Determine user model from currentUser
            const userModel = currentUser?.constructor?.modelName 
                ? currentUser.constructor.modelName 
                : (currentUser?.role === 'stationowner' ? 'stationowner' :
                    currentUser?.role === 'admin' ? 'Admin' :
                    currentUser?.role === 'supportofficer' ? 'SupportOfficer' : 'EvOwner');

            const response = await axios.get(
                `${API_BASE_URL}/api/reports/get-stationowner-report-details/${userId}/${type}/${reportId}`,
                {
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.success) {
                setReport(response.data.data);
            } else {
                throw new Error('Failed to fetch report details');
            }
        } catch (error) {
            console.error('Error fetching report details:', error);
            if (error.response?.status === 401) {
                navigate('/auth?mode=login');
            } else {
                toast.error('Failed to load report details');
                navigate('/station-owner/fault-reports');
            }
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        const statusText = status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ');
        return (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                status === 'resolved' ? 'bg-green-100 text-green-800' :
                status === 'rejected' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
            }`}>
                {statusText}
            </span>
        );
    };

    if (loading) {
        return (
            <div style={{ 
                fontFamily: FONTS.family.sans, 
                padding: '24px', 
                backgroundColor: COLORS.background,
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div 
                    className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" 
                    style={{ borderColor: COLORS.primary }}
                ></div>
            </div>
        );
    }

    if (!report) {
        return (
            <div style={{ fontFamily: FONTS.family.sans, padding: '24px', backgroundColor: COLORS.background }}>
                <StationOwnerPageHeader title="Report Not Found" />
                <div className="text-center py-12">
                    <p className="text-gray-600">Report not found or you don't have access to view it.</p>
                    <button
                        onClick={() => navigate('/station-owner/fault-reports')}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Back to Reports
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ fontFamily: FONTS.family.sans, padding: '24px', backgroundColor: COLORS.background }}>
            <StationOwnerPageHeader title={`Report Details - ${report.category}`} />

            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-6">
                    <h2 className="text-xl font-semibold">Report Information</h2>
                    {getStatusBadge(report.status)}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: COLORS.secondaryText }}>Report ID</label>
                        <p>{report._id}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: COLORS.secondaryText }}>Report Type</label>
                        <p className="text-gray-900 capitalize">{type}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: COLORS.secondaryText }}>Reported By</label>
                        <p className="text-gray-900">{report.user_id?.name || 'Unknown'}</p>
                        <p className="text-gray-600 text-sm">{report.user_id?.email || ''}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: COLORS.secondaryText }}>Reported Date & Time</label>
                        <p className="text-gray-900">{new Date(report.createdAt).toLocaleDateString()}</p>
                        <p className="text-gray-600 text-sm">{new Date(report.createdAt).toLocaleTimeString()}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: COLORS.secondaryText }}>Category</label>
                        <p className="text-gray-900">{report.category}</p>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2" style={{ color: COLORS.secondaryText }}>Description</label>
                    <p className="text-gray-900 bg-gray-50 p-4 rounded-md whitespace-pre-wrap">{report.description}</p>
                </div>

                {report.attachments && report.attachments.length > 0 && (
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2" style={{ color: COLORS.secondaryText }}>Attachments</label>
                        <div className="space-y-2">
                            {report.attachments.map((attachment, index) => (
                                <a 
                                    key={index} 
                                    href={attachment} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 text-sm block flex items-center"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                    </svg>
                                    Attachment {index + 1}
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                {/* Station Details */}
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2" style={{ color: COLORS.secondaryText }}>Station Details</label>
                    <div className="bg-gray-50 p-4 rounded-md">
                        <p><strong>Name:</strong> {report.station_id?.station_name || report.booking_id?.charging_station_id?.station_name || 'N/A'}</p>
                        <p><strong>Address:</strong> {report.station_id?.address || report.booking_id?.charging_station_id?.address || 'N/A'}</p>
                        <p><strong>City:</strong> {report.station_id?.city || report.booking_id?.charging_station_id?.city || 'N/A'}</p>
                    </div>
                </div>

                {/* Type-specific details */}
                {type === 'charger' && report.charger_details && (
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2" style={{ color: COLORS.secondaryText }}>Charger Details</label>
                        <div className="bg-gray-50 p-4 rounded-md">
                            <p><strong>Charger Name:</strong> {report.charger_details.charger_name || 'N/A'}</p>
                            <p><strong>Power Type:</strong> {report.charger_details.power_type || 'N/A'}</p>
                            <p><strong>Max Power Output:</strong> {report.charger_details.max_power_output || 'N/A'} kW</p>
                        </div>
                    </div>
                )}

                {type === 'booking' && report.vehicle_details && (
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2" style={{ color: COLORS.secondaryText }}>Vehicle Details</label>
                        <div className="bg-gray-50 p-4 rounded-md">
                            <p><strong>Make:</strong> {report.vehicle_details.make || 'N/A'}</p>
                            <p><strong>Model:</strong> {report.vehicle_details.model || 'N/A'}</p>
                            <p><strong>Year:</strong> {report.vehicle_details.manufactured_year || 'N/A'}</p>
                            <p><strong>Battery Capacity:</strong> {report.vehicle_details.battery_capacity || 'N/A'} kWh</p>
                        </div>
                    </div>
                )}

                {/* Resolution Details (if resolved or rejected) */}
                {(report.status === 'resolved' || report.status === 'rejected') && (
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {report.status === 'resolved' ? 'Resolution Details' : 'Rejection Details'}
                        </label>
                        <div className="bg-gray-50 p-4 rounded-md">
                            {report.action && (
                                <p><strong>Actions Taken:</strong> {report.action}</p>
                            )}
                            {report.rejected_reason && (
                                <p><strong>Rejection Reason:</strong> {report.rejected_reason}</p>
                            )}
                            {report.resolved_by && (
                                <p><strong>Resolved By:</strong> {report.resolved_by.name || 'Support Officer'}</p>
                            )}
                            {report.resolved_at && (
                                <p><strong>Resolved At:</strong> {new Date(report.resolved_at).toLocaleString()}</p>
                            )}
                            {report.refund_amount && (
                                <p><strong>Refund Amount:</strong> Rs {report.refund_amount}</p>
                            )}
                        </div>
                    </div>
                )}

                <div className="flex space-x-4">
                    <button
                        onClick={() => navigate('/station-owner/alerts')}
                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                    >
                        Back to Reports
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StationOwnerReportDetails;