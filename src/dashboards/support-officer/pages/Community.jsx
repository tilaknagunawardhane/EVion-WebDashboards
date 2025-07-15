import React, {useState} from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { FONTS, COLORS } from "../../../constants";
import DataTableTopBar from "../../../components/ui/DataTableTopBar";
import OverviewCard from "../../admin/components/OverviewCard";
import PageHeader from "../../admin/components/AdminPageHeader";
import TabBar from "../../../components/ui/TabBar";
import { CommunityPost, Hashtags, DateTime, Header, Content, Replies } from "../components/CommunityPost";
import CommunityRightPanel from "../components/CommunityRightPanel";

export default function CommunityPage(){
    // const { id } = useParams();
    // const navigate = useNavigate();
    // const [search, setSearch] = useState('');
    // const [filter, setFilter] = useState({});
    // const [sort, setSort] = useState('Date');
    const [activeTab, setActiveTab] = useState('communityDiscussion');

    const CommunityTabs = [
    { id: 'communityDiscussion', label: 'Community Discussion' },
    { id: 'pendingForApproval', label: 'Pending For Approval' },
    { id: 'flaggedbyUsers', label: 'Flagged by Users' },
    ];

    const mobileTabLabels = {
    communityDiscussion: 'Community Discussion',
    pendingForApproval: 'Pending For Approval',
    flaggedbyUsers: 'Flagged by Users',
    };

    const sampleData = {
    hashtags: ['chargingissues', 'plugs', 'slowcharging'],
    dateTime: 'Monday 6 Jul, 11:53 AM',
    header: 'BYD Atto 3 vs Nissan Leaf – Which Is Better for Long Trips?',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?w=400&h=200&fit=crop&crop=center',
        alt: 'BYD Atto 3 electric vehicle'
      },
      {
        src: 'https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?w=400&h=200&fit=crop&crop=center',
        alt: 'BYD Atto 3 electric vehicle'
      },
      null // This will render as placeholder
    ],
    content: `Hi everyone, I recently bought an EV and noticed that the real-world range I'm getting on 
      a full charge is significantly lower than the manufacturer's advertised range. For 
      example, my EV is supposed to do 450 km per charge, but I barely get around 370 km, 
      even with careful driving. I'm trying to understand what factors actually affect this — 
      things like AC usage, passenger load, or terrain. Can other EV users share their 
      experiences? How much range are you realistically getting, and what are your driving 
      conditions like? Also, any tips to improve range would be great!`,
    replies: [
      {
        username: 'John Doe',
        timestamp: '3 hrs ago',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        content: `Hey, totally relatable! I drive a BYD Atto 3, and yeah, the range difference is real. On paper, it says 420 
          km, but realistically I get around 350 km, especially if I'm using AC or carrying passengers.`,
        readMore: true
      }
    ],
    showViewAll: true
    };

    const currentUser = {
    id: '001',
    Name: 'John Doe',
    'Account Status': 'Active',
    };

    const stats = {
    totalPosts: 25,
    rejectedPosts: 1,
    flagsReceived: 3,
    lastPostOn: '6 Jul, 11:53 AM'
    };

    return (
        <div style={{
            fontFamily: FONTS.family.sans,
            padding: '24px',
            backgroundColor: COLORS.background,
        }}>
            {/* Header Section */}
            <PageHeader title={`Community Posts & Moderation`} />

            {/* Tab Bar */}
                <div className="mb-6">
                <TabBar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    tabs={CommunityTabs}
                    mobileLabels={mobileTabLabels}
                />
            </div>

            {/* Main Content */}
            <div className="grid grid-colos-1 md:grid-cols-4 gap-4 md:gap-6">
                {/* Left Side */}
                <div className="md:col-span-3">
                    <OverviewCard>
                        <div className="space-y-8">
                        <CommunityPost {...sampleData} />      
                    </div>
                    </OverviewCard>
                    
                </div>

                {/* Right Side - 1/4 width */}
                <div className="lg:col-span-1">
                    <div className="sticky top-6 space-y-6">
                    <CommunityRightPanel
                        user={currentUser}
                        stats={stats}
                    />
                    </div>
                </div>

            </div>  
        </div>
    )
}