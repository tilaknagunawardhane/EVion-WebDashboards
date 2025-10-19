import React, { useState, useEffect, useCallback } from "react";
import { FONTS, COLORS } from "../../../constants";
import OverviewCard from "../../admin/components/OverviewCard";
import TabBar from "../../../components/ui/TabBar";
import { CommunityPost } from "../components/CommunityPost"; 
import CommunityRightPanel from "../components/CommunityRightPanel";
import UserPageHeader from '../components/UserPageHeader';

const API_BASE_URL = 'http://localhost:5000/api/discussions'; 
const ALL_DISCUSSIONS_API_URL = `${API_BASE_URL}/get-discussions`; 
const FLAGGED_API_URL = `${API_BASE_URL}/get-flagged-discussions`;
const STATS_API_URL = `${API_BASE_URL}/get-stats`; 

export default function CommunityPage(){
    const [activeTab, setActiveTab] = useState('communityDiscussion');
    
    const [postsData, setPostsData] = useState({
        communityDiscussion: [],
        flaggedbyUsers: []
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // UI state for post expansion and replies
    const [expandedPosts, setExpandedPosts] = useState({});
    const [showAllReplies, setShowAllReplies] = useState({});

    const CommunityTabs = [
        { id: 'communityDiscussion', label: 'Community Discussion' },
        { id: 'flaggedbyUsers', label: 'Flagged by Users' },
    ];

    const currentUser = { id: '001', Name: 'Support Office', 'Account Status': 'Active' };
    
    const [stats, setStats] = useState({ 
        totalPosts: '...', 
        flagsReceived: '...', 
        lastPostOn: '...' 
    });


    // --- Data Formatting ---

    const formatPost = (discussion) => {
        const totalFlags = (discussion.flagged_count?.spam || 0) + 
                           (discussion.flagged_count?.harassment || 0) + 
                           (discussion.flagged_count?.other || 0);
        
        return {
            id: discussion._id,
            username: discussion.user,
            dateTime: new Date(discussion.createdAt).toLocaleDateString() + ', ' + new Date(discussion.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            header: discussion.title,
            // 🐛 FIX 1: Display FULL content
            content: discussion.description, 
            hashtags: discussion.hashtags || [],
            // 🐛 FIX 2: Pass image array (requires correct rendering in CommunityPost component)
            images: discussion.images || [], 
            replies: discussion.comments.map(c => ({ 
                username: c.user,
                timestamp: new Date(c.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                content: c.text,
                // FIX 3: Removed 'readMore: true'
            })),
            showViewAll: discussion.comments.length > 1,
            isFlagged: discussion.isFlagged, 
            flagCount: totalFlags,
        };
    };

    // --- API & Data Fetching Logic ---
    
    const fetchStats = useCallback(async () => {
        try {
            const response = await fetch(STATS_API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} for stats`);
            }
            const data = await response.json();
            const fetchedStats = data.data;

            let lastPostOnFormatted = 'N/A';
            if (fetchedStats.lastPostOn) {
                const date = new Date(fetchedStats.lastPostOn);
                lastPostOnFormatted = date.toLocaleDateString();
            }

            setStats({
                totalPosts: fetchedStats.totalPosts.toString(),
                flagsReceived: fetchedStats.flagsReceived.toString(),
                lastPostOn: lastPostOnFormatted,
            });

        } catch (err) {
            console.error('Fetch Stats Error:', err);
        }
    }, []);


    const fetchPosts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // Fetch All Discussions
            const communityResponse = await fetch(ALL_DISCUSSIONS_API_URL);
            if (!communityResponse.ok) throw new Error(`HTTP error! status: ${communityResponse.status} for community discussions`);
            const communityData = await communityResponse.json();
            const communityDiscussions = communityData.data;

            // Fetch Flagged Discussions
            const flaggedResponse = await fetch(FLAGGED_API_URL);
            if (!flaggedResponse.ok) throw new Error(`HTTP error! status: ${flaggedResponse.status} for flagged discussions`);
            const flaggedData = await flaggedResponse.json();
            const flaggedDiscussions = flaggedData.data;

            const newPostsData = {
                communityDiscussion: communityDiscussions.map(formatPost),
                flaggedbyUsers: flaggedDiscussions.map(formatPost)
            };

            setPostsData(newPostsData);

        } catch (err) {
            setError(`Failed to fetch posts: ${err.message}`);
            console.error('Fetch Posts Error:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPosts();
        fetchStats(); 
    }, [fetchPosts, fetchStats]);


    // --- Action Handler (DELETE/DISCARD logic) ---

    const handleDiscardPost = useCallback(async (postId) => {
        // 🚨 CRUCIAL: Check for missing ID to prevent a 400 error originating here
        if (!postId) {
            alert("Error: Post ID is missing. Cannot proceed with deletion.");
            console.error("Deletion Error: Post ID is falsy or missing.");
            return;
        }
        
        if (!window.confirm("Are you sure you want to permanently delete this post? This action cannot be undone.")) {
            return;
        }

        try {
            const deleteUrl = `${API_BASE_URL}/discussions/${postId}`;
            
            const response = await fetch(deleteUrl, {
                method: 'DELETE',
            });
            
            if (!response.ok) {
                // Read the server's error message for better debugging
                const errorText = await response.text(); 
                throw new Error(`Failed to delete. Status: ${response.status}. Server message: ${errorText}`);
            }
            
            alert("Post deleted successfully.");
            fetchPosts();
            fetchStats(); 

        } catch (err) {
            alert(`Failed to delete post: ${err.message}`);
            console.error('Delete Post Error:', err);
        }
    }, [fetchPosts, fetchStats]);

    // --- Utility Functions (UX) ---
    const toggleExpandPost = (postId) => {
        setExpandedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
    };

    const toggleShowAllReplies = (postId) => {
        setShowAllReplies(prev => ({ ...prev, [postId]: !prev[postId] }));
    };

    const getActivePosts = () => {
        let currentPosts = postsData[activeTab];

        return currentPosts.map(post => {
            let actions = null;
            
            const deleteButtonLabel = activeTab === 'flaggedbyUsers' 
                ? `Discard Post (${post.flagCount} Flags)`
                : 'Delete Post'; 

            actions = (
                <div className="flex justify-end mt-4">
                    <button 
                        onClick={() => handleDiscardPost(post.id)}
                        className={`px-4 py-2 text-white rounded-lg transition-colors ${activeTab === 'flaggedbyUsers' ? 'bg-red-500 hover:bg-red-600' : 'bg-red-700 hover:bg-red-800'}`}
                    >
                        {deleteButtonLabel}
                    </button>
                </div>
            );
            
            return { ...post, actions };
        });
    };

    // --- Component Render ---

    return (
        <div style={{
            fontFamily: FONTS.family.sans,
            padding: '24px',
            backgroundColor: COLORS.background,
        }}>
            {/* Header Section */}
            <UserPageHeader title={`Community Posts & Moderation`} />

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
                        {loading && <p className="text-center py-8">Loading posts...</p>}
                        {error && <p className="text-red-500 text-center py-8">Error: {error}</p>}
                        
                        {!loading && !error && (
                            <div className="space-y-8">
                                {getActivePosts().length === 0 ? (
                                    <p className="text-center text-gray-500 py-8">No posts found for this tab.</p>
                                ) : (
                                    getActivePosts().map(post => (
                                        <div key={post.id}>
                                            {/* Display the username before the CommunityPost component */}
                                            <p className="text-sm text-gray-600 mb-1">
                                                <span className="font-semibold">Posted by:</span> {post.username}
                                            </p>
                                            <CommunityPost 
                                                {...post}
                                                isExpanded={expandedPosts[post.id]}
                                                onExpand={() => toggleExpandPost(post.id)}
                                                showAllReplies={showAllReplies[post.id]}
                                                onViewAllReplies={() => toggleShowAllReplies(post.id)}
                                            />
                                            {post.actions}
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </OverviewCard>
                </div>

                {/* Right Side - 1/4 width */}
                <div className="lg:col-span-1">
                    <div className="sticky top-6 space-y-6">
                        <CommunityRightPanel
                            user={currentUser}
                            // Pass the dynamically fetched stats
                            stats={stats} 
                        />
                    </div>
                </div>
            </div>  
        </div>
    )
}