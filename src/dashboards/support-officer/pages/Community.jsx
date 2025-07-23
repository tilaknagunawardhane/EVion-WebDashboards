import React, {useState} from "react";
import { FONTS, COLORS } from "../../../constants";
import OverviewCard from "../../admin/components/OverviewCard";
import PageHeader from "../../admin/components/AdminPageHeader";
import TabBar from "../../../components/ui/TabBar";
import { CommunityPost } from "../components/CommunityPost";
import CommunityRightPanel from "../components/CommunityRightPanel";

export default function CommunityPage(){
    const [activeTab, setActiveTab] = useState('communityDiscussion');
    const [expandedPosts, setExpandedPosts] = useState({});
    const [showAllReplies, setShowAllReplies] = useState({});
    const [postsData, setPostsData] = useState({
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
                    }
                ],
                content: `Hi everyone, I recently bought an EV and noticed that the real-world range...`,
                replies: [
                    {
                        username: 'John Doe',
                        timestamp: '3 hrs ago',
                        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
                        content: `Hey, totally relatable! I drive a BYD Atto 3...`,
                        readMore: true
                    }
                ],
                showViewAll: true,
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
                content: `A friend who works at Tesla told me they're developing a new budget model...`,
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
                content: `I think all this EV hype is just greenwashing...`,
                replies: [
                    {
                        username: 'EcoWarrior',
                        timestamp: '1 hr ago',
                        avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=40&h=40&fit=crop&crop=face',
                        content: `This is misinformation. Multiple studies show EVs have lower lifetime emissions...`,
                        readMore: true
                    }
                ],
                showViewAll: true,
                isFlagged: true,
                isPending: false
            }
        ]
    });

    const CommunityTabs = [
        { id: 'communityDiscussion', label: 'Community Discussion' },
        { id: 'pendingForApproval', label: 'Pending For Approval' },
        { id: 'flaggedbyUsers', label: 'Flagged by Users' },
    ];

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

    const handleApprovePost = (postId) => {
        setPostsData(prev => {
            // Find the post to approve
            const postToApprove = prev.pendingForApproval.find(post => post.id === postId);
            
            // Remove from pending
            const updatedPending = prev.pendingForApproval.filter(post => post.id !== postId);
            
            // Add to community discussion
            return {
                ...prev,
                pendingForApproval: updatedPending,
                communityDiscussion: [
                    ...prev.communityDiscussion,
                    { ...postToApprove, isPending: false }
                ]
            };
        });
    };

    const handleDiscardPost = (postId) => {
        setPostsData(prev => ({
            ...prev,
            flaggedbyUsers: prev.flaggedbyUsers.filter(post => post.id !== postId)
        }));
    };

    const getActivePosts = () => {
        return postsData[activeTab].map(post => {
            let actions = null;
            
            if (activeTab === 'pendingForApproval') {
                actions = (
                    <div className="flex justify-end mt-4">
                        <button 
                            onClick={() => handleApprovePost(post.id)}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                            Approve Post
                        </button>
                    </div>
                );
            } else if (activeTab === 'flaggedbyUsers') {
                actions = (
                    <div className="flex justify-end mt-4">
                        <button 
                            onClick={() => handleDiscardPost(post.id)}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                            Discard Post
                        </button>
                    </div>
                );
            }
            
            return {
                ...post,
                actions
            };
        });
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
                />
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                {/* Left Side */}
                <div className="md:col-span-3">
                    <OverviewCard>
                        <div className="space-y-8">
                            {getActivePosts().map(post => (
                                <div key={post.id}>
                                    <CommunityPost 
                                        {...post}
                                        isExpanded={expandedPosts[post.id]}
                                        onExpand={() => toggleExpandPost(post.id)}
                                        showAllReplies={showAllReplies[post.id]}
                                        onViewAllReplies={() => toggleShowAllReplies(post.id)}
                                    />
                                    {post.actions}
                                </div>
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