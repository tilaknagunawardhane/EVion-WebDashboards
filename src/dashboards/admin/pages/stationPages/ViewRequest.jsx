import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
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
    const { type, id } = useParams();
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequestDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_BASE_URL}/api/admin/request-details/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('adminAccessToken')}`
                    }
                });
                console.log('Request details response:', response);

                if (response.data.success) {
                    setRequest(response.data.data);
                } else {
                    toast.error('Failed to fetch request details');
                }
            } catch (error) {
                console.error('Error fetching request:', error);
                toast.error(error.response?.data?.message || 'Error fetching request');
            } finally {
                setLoading(false);
            }
        };

        fetchRequestDetails();
    }, [id]);

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

    return (
        <div style={{
            fontFamily: FONTS.family.sans,
            padding: '24px',
            backgroundColor: COLORS.background,
        }}>
            <AdminPageHeader title={request.title} />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                <div className="md:col-span-3">
                    <RequestDetailsWithStation request={request} type={type} />
                </div>

                <div className="md:sticky md:top-6 space-y-4 md:space-y-6">
                    <ViewRequestRightPanel request={request} />
                </div>
            </div>
        </div>
    );
}