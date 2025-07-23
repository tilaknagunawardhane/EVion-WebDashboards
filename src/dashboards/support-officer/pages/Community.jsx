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
    const [activeTab, setActiveTab] = useState('communityDiscussion');
    const [expandedPosts, setExpandedPosts] = useState({});
    const [showAllReplies, setShowAllReplies] = useState({});

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

    // Sample data for different tabs
    const postsData = {
        communityDiscussion: [
            {
                id: 'post1',
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
                    },
                    {
                        username: 'Sarah Smith',
                        timestamp: '2 hrs ago',
                        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
                        content: `I've found that driving style makes a huge difference. Aggressive acceleration and high speeds really drain the battery. Try to maintain a steady speed and use regenerative braking.`,
                        readMore: false
                    }
                ],
                showViewAll: true,
                isFlagged: false,
                isPending: false
            },
            {
                id: 'post2',
                hashtags: ['batterylife', 'maintenance'],
                dateTime: 'Tuesday 7 Jul, 09:15 AM',
                header: 'How often should I service my EV battery?',
                images: [],
                content: `I've had my electric vehicle for about a year now and I'm wondering about battery maintenance. The dealership mentioned annual check-ups, but I'm not sure what exactly gets checked. Does anyone have experience with this? Are there specific things I should be monitoring between service appointments? I've heard about battery degradation but not sure how to track it.`,
                replies: [
                    {
                        username: 'Mike Johnson',
                        timestamp: '5 hrs ago',
                        avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=40&h=40&fit=crop&crop=face',
                        content: `Most EVs have built-in battery health monitoring. You can usually find it in your vehicle's settings menu. The most important things to watch are the maximum charge capacity over time and any unusual temperature fluctuations.`,
                        readMore: false
                    }
                ],
                showViewAll: false,
                isFlagged: false,
                isPending: false
            }
        ],
        pendingForApproval: [
            {
                id: 'post3',
                hashtags: ['newmodel', 'rumors'],
                dateTime: 'Wednesday 8 Jul, 02:30 PM',
                header: 'Heard about the upcoming Tesla Model 2 - any details?',
                images: [
                    {
                        src: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&h=200&fit=crop&crop=center',
                        alt: 'Tesla vehicle'
                    }
                ],
                content: `A friend who works at Tesla told me they're developing a new budget model called Model 2 that will be priced under $25,000. Has anyone else heard about this? Apparently it will have a smaller battery but with new technology that gives it decent range. Wondering if it's worth waiting for or if I should just get a Model 3 now.`,
                replies: [],
                showViewAll: false,
                isFlagged: false,
                isPending: true
            }
        ],
        flaggedbyUsers: [
            {
                id: 'post4',
                hashtags: ['controversial', 'politics'],
                dateTime: 'Thursday 9 Jul, 10:45 AM',
                header: 'Why electric vehicles are actually worse for the environment',
                images: [],
                content: `I think all this EV hype is just greenwashing. The mining for lithium destroys ecosystems, and most electricity still comes from fossil fuels. We're just moving the pollution somewhere else. Plus, the batteries can't be recycled properly.`,
                replies: [
                    {
                        username: 'EcoWarrior',
                        timestamp: '1 hr ago',
                        avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=40&h=40&fit=crop&crop=face',
                        content: `This is misinformation. Multiple studies show EVs have lower lifetime emissions even with current electricity grids. Battery recycling technology is improving rapidly.`,
                        readMore: true
                    }
                ],
                showViewAll: true,
                isFlagged: true,
                isPending: false
            }
        ]
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

    const toggleExpandPost = (postId) => {
        setExpandedPosts(prev => ({
            ...prev,
            [postId]: !prev[postId]
        }));
    };

    const toggleShowAllReplies = (postId) => {
        setShowAllReplies(prev => ({
            ...prev,
            [postId]: !prev[postId]
        }));
    };

    const getActivePosts = () => {
        return postsData[activeTab] || [];
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                {/* Left Side */}
                <div className="md:col-span-3">
                    <OverviewCard>
                        <div className="space-y-8">
                            {getActivePosts().map(post => (
                                <CommunityPost 
                                    key={post.id}
                                    {...post}
                                    isExpanded={expandedPosts[post.id]}
                                    onExpand={() => toggleExpandPost(post.id)}
                                    showAllReplies={showAllReplies[post.id]}
                                    onViewAllReplies={() => toggleShowAllReplies(post.id)}
                                />
                            ))}
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