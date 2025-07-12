import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { COLORS, FONTS } from '../../../../constants';
import NotificationsIcon from '../../../../assets/notifications.svg';
import RequestDetailsWithStation from '../../components/requestComponents/RequestDelailsWithStation';
import ViewRequestRightPanel from '../../components/requestComponents/ViewRequestRightPanel';
import AdminPageHeader from '../../components/AdminPageHeader';

export default function ViewRequest() {
    const { type, id } = useParams(); // Get request ID and type from URL
    const location = useLocation();

    const pageTitle = type === 'connector' ? 'New Charger' : 'New Charging Station';

    // Sample data - replace with actual data fetching
    const request = {
        id: id,
        title: pageTitle,
        stationName: "EviGO Charging Station",
        address: "No.24, Joshep Road, Welipanna",
        status: "NEW",
        requester: "John Doe",
        requesterStatus: "Active",
        contactPerson: "Premasiri Chemadasa Mavaltha",
        contactNumber: "6:1",
        company: "Mavilaland PL",
        date: "12 Dec 2024",
        email: "johndoe@gmail.com",
        operator: "EviGO Pvt(Ltd)",
        district: "Colombo",
        businessRegNo: "WC45543",
        taxId: "#ewfb45555547",
        location: "Bloomfield Cricket and Athletic Club",
        chargersPlanned: "02",
        // Add these new fields for connector type
        rating: 4.5, // Sample rating
        reviewCount: 24, // Sample review count
        existingChargers: type === 'connector' ? [ // Only include for connectors
            {
                name: "Existing Charger 1",
                ports: ["CCS2"],
                power: "50 kW",
                price: "LKR 50.00"
            },
            {
                name: "Existing Charger 2",
                ports: ["CHAdeMo"],
                power: "100 kW",
                price: "LKR 55.00"
            }
        ] : [],
        chargers: [
            {
                name: "HyperCharge Dual-Port (DC Fast Charger)",
                ports: ["CCS2", "CHAdeMo"],
                power: "150 kW",
                price: "LKR 60.00"
            },
            {
                name: "FastCharge DC - Bay OI (DC Fast Charger)",
                ports: ["CCS2"],
                power: "60 kW",
                price: "LKR 55.00"
            }
        ]
    };

    return (
        <div style={{
            fontFamily: FONTS.family.sans,
            padding: '24px',
            backgroundColor: COLORS.background,
        }}>
            {/* Header Section */}
            <AdminPageHeader title={`${request.title}`} />

            {/* Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                {/* Left Side - Pass both request and type props */}
                <div className="md:col-span-3">
                    <RequestDetailsWithStation request={request} type={type} />
                </div>

                {/* Right Side */}
                <div className="md:sticky md:top-6 space-y-4 md:space-y-6">
                    <ViewRequestRightPanel request={request} />
                </div>
            </div>
        </div>
    );
}