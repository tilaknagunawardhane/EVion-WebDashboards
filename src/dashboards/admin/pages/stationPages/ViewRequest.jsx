import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { COLORS, FONTS } from '../../../../constants';
// import { Button } from '../../../../components/ui/';
import NotificationsIcon from '../../../../assets/notifications.svg';
import RequestDetailsWithStation from '../../components/requestComponents/RequestDelailsWithStation'
import ViewRequestRightPanel from '../../components/requestComponents/ViewRequestRightPanel'

export default function ViewRequest() {
    const { type, id } = useParams();// Get request ID, type (station, connector) from URL
    const location = useLocation();

    const pageTitle = type === 'connector' ? 'New Charger' : 'New Charging Station';
    // Sample data - replace with actual data fetching
    const request = {
        id: id,
        title: pageTitle,
        stationName: "EviGO Charging Station",
        address: "No.24, Joshep Road, Welipanna",
        status: "WAITING FOR PAYMENT",
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold" style={{ color: COLORS.mainTextColor }}>
                        {request.title}
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <img
                            src={NotificationsIcon}
                            alt="Notifications"
                            style={{
                                width: '24px',
                                height: '24px',
                                cursor: 'pointer'
                            }}
                        />
                        <span className="absolute top-0 right-0 w-2 h-2 rounded-full"
                            style={{ backgroundColor: COLORS.primary }}></span>
                    </div>
                </div>
            </div>


            {/* Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                {/* Left Side */}
                <div className="md:col-span-3">
                        <RequestDetailsWithStation request={request} />
                </div>

                {/* Right Side - 1/4 width */}
                {/* <div className="lg:col-span-1"> */}
                <div className="md:sticky md:top-6 space-y-4 md:space-y-6">
                    <ViewRequestRightPanel request={request} />
                </div>
                {/* </div> */}
            </div>
        </div>
    );
}