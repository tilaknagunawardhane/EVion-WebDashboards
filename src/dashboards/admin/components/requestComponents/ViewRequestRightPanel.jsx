import React, { useState } from 'react';
import { COLORS, FONTS } from '../../../../constants';
import UserProfileCard from '../userComponents/UserProfileCard';
import ChatIcon from '../../../../assets/chat.svg';
import Button from '../../../../components/ui/Button';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Pointer } from 'lucide-react';

const primaryColorFilter = `
brightness(0)
invert(1)
`;

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export default function ViewRequestRightPanel({ request }) {
    const [currentRequest, setCurrentRequest] = useState(request);

    const navigate = useNavigate();

    const user = {
        Name: currentRequest.stationOwner,
        'Account Status': currentRequest.ownerAccountStatus,
        'Date of Registration': currentRequest.ownerRegisteredOn,
         Email: currentRequest.email,
        'Company Name': currentRequest.businessName,
        'Business Reg No': currentRequest.businessRegNo,
        // 'Tax ID': currentRequest.taxId
    };

    return (
        <div className="flex flex-col h-[calc(100vh-140px)] overflow-y-auto relative">
            {/* Scrollable content area - No need for blur here since modal has its own backdrop */}
            <div className="space-y-4 md:space-y-6 flex-1">
                {/* User Profile Section */}
                <div className="w-full">
                    <UserProfileCard user={user} />
                </div>

                {/* Email with Chat Icon */}
                <div className="flex flex-column items-center justify-between gap-2 w-full">
                    <div className="underline">
                        <a
                            href={`mailto:${currentRequest.email}`}
                            className="flex items-center gap-1 text-primary underline italic w-1"
                            style={{
                                color: COLORS.primary,
                                fontSize: FONTS.sizes.sm,
                                cursor: 'pointer',
                                textDecoration: 'none'
                            }}
                        >
                            {currentRequest.email}
                        </a>
                    </div>

                    <div  className="rounded-full p-3" style={{cursor: 'pointer', backgroundColor: COLORS.primary}} onClick={() => navigate(`/admin/chat/`)}>
                        <img
                            src={ChatIcon}
                            alt="Chat icon"
                            style={{ filter: primaryColorFilter }}
                            className="w-4 h-4"
                        />
                    </div>
                    
                </div>

                {/* Operator Info Section */}
                <div className="p-4 rounded-lg bg-white shadow-sm">
                    <div className="space-y-2">
                        <div>
                            <p className="text-normal font-semibold" style={{ color: COLORS.mainTextColor }}>
                                {currentRequest.businessName}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm" style={{ color: COLORS.mainTextColor }}>
                                BusinessRegNo: {currentRequest.businessRegNo}
                            </p>
                        </div>
                        <div className='flex justify-between'>
                            <p className="text-xs" style={{ color: COLORS.mainTextColor }}>
                               District: {currentRequest.district}
                            </p>
                        </div>
                    </div>
                </div>
                
            </div>

            
        </div>
    );
}