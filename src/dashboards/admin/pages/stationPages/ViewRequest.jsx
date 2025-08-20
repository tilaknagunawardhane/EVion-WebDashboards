import React, { useState, useEffect } from 'react';
// import { useParams, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { COLORS, FONTS } from '../../../../constants';
import NotificationsIcon from '../../../../assets/notifications.svg';
import RequestDetailsWithStation from '../../components/requestComponents/RequestDelailsWithStation';
import ViewRequestRightPanel from '../../components/requestComponents/ViewRequestRightPanel';
import AdminPageHeader from '../../components/AdminPageHeader';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ViewRequest() {
    // const { type, id } = useParams();
    const { id } = useParams();
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequestDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_BASE_URL}/api/admin/request-details/${id}`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
                });
                
                if (response.data.success) {
                    setRequest(response.data.data);
                } else {
                    toast.error('Failed to fetch request details');
                }
            } catch (error) {
                console.error('Error fetching request:', error);
                toast.error(error.response?.data?.message || 'Error fetching request details');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchRequestDetails();
        }
    }, [id]);

    const handleStatusUpdate = async (chargerId, action, reason) => {
        try {
            const response = await axios.put(
                `${API_BASE_URL}/api/admin/update-request-status/${id}`,
                { action, reason, chargerId },
                { headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` } }
            );

            if (response.data.success) {
                toast.success('Status updated successfully');
                // Refresh the data by calling the API again
                const refreshResponse = await axios.get(`${API_BASE_URL}/api/admin/request-details/${id}`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
                });
                
                if (refreshResponse.data.success) {
                    setRequest(refreshResponse.data.data);
                }
            }
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error(error.response?.data?.message || 'Error updating status');
        }
    };

    if (loading) {
        return (
            <div style={{
                fontFamily: FONTS.family.sans,
                padding: '24px',
                backgroundColor: COLORS.background,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!request) {
        return (
            <div style={{
                fontFamily: FONTS.family.sans,
                padding: '24px',
                backgroundColor: COLORS.background,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <p>Request not found</p>
            </div>
        );
    }
    // const handleStatusUpdate = (newStatus) => {
    //     setRequestData(prev => ({
    //         ...prev,
    //         status: newStatus
    //     }));
    // };
    return (
        <div style={{
            fontFamily: FONTS.family.sans,
            padding: '24px',
            backgroundColor: COLORS.background,
        }}>
            <AdminPageHeader title={request.title} />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                <div className="md:col-span-3">
                    <RequestDetailsWithStation 
                        request={request}
                        onStatusUpdate={handleStatusUpdate} />
                </div>

                <div className="md:sticky md:top-6 space-y-4 md:space-y-6">
                    <ViewRequestRightPanel 
                        request={request}
                        onStatusUpdate={handleStatusUpdate} />
                </div>
            </div>
        </div>
    );
}