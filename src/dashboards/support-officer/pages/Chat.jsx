import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import ChatList from '../components/chats/ChatList';
import ChatHeader from '../components/chats/ChatHeader';
import ChatMessage from '../components/chats/ChatMessage';
import ChatInput from '../components/chats/ChatInput';
import { COLORS, FONTS } from '../../../constants';
// import StationOwnerPageHeader from '../components/StationOwnerPageHeader';
import { useAuth } from '../../../contexts/AuthContext';
// import AdminPageHeader from '../components/AdminPageHeader';
import UserPageHeader from '../components/UserPageHeader';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ChatPage = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [chatList, setChatList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const navigate = useNavigate();
    const { currentUser, isStationOwner, isAdmin, isSupportOfficer } = useAuth();

    // Check user authentication and role
    useEffect(() => {
        if (!currentUser) {
            toast.error('Please login to access chats', {
                position: "top-right",
                autoClose: 3000
            });
            navigate('/auth?mode=login');
            return;
        }

        if (!isStationOwner && !isAdmin && !isSupportOfficer) {
            toast.error('Access denied. Required role not found.', {
                position: "top-right",
                autoClose: 3000
            });
            navigate('/');
            return;
        }

        fetchUserChats();
    }, [currentUser, isStationOwner, isAdmin, isSupportOfficer, navigate]);

    // Get bulk unread counts for all chats
    const getBulkUnreadCounts = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const userId = localStorage.getItem('userID');

            const response = await axios.get(
                `${API_BASE_URL}/api/chats/user/${userId}/unread-counts`,
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                }
            );

            if (response.data.success) {
                return response.data.data.perChat || {};
            }
        } catch (error) {
            console.error('Error getting bulk unread counts:', error);
        }
        return {};
    };

    // Fetch user chats from backend
    // Updated fetchUserChats function using individual unread counts
    const fetchUserChats = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('accessToken');
            const userId = localStorage.getItem('userID');

            // First get all chats
            const response = await axios.get(
                `${API_BASE_URL}/api/chats/user/${userId}`,
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                }
            );

            if (response.data.success) {
                // Get unread counts for each chat individually
                const chatsWithUnreadCounts = await Promise.all(
                    response.data.data.map(async (chat) => {
                        try {
                            const unreadResponse = await axios.get(
                                `${API_BASE_URL}/api/chats/${chat._id}/unread-count?userId=${userId}`,
                                {
                                    headers: { 'Authorization': `Bearer ${token}` }
                                }
                            );

                            const unreadCount = unreadResponse.data.success
                                ? unreadResponse.data.data.unreadCount
                                : 0;

                            return {
                                id: chat._id,
                                name: getChatTitle(chat),
                                lastMessage: chat.lastMessage?.text || 'No messages yet',
                                category: getChatCategory(chat.topic),
                                time: chat.lastMessage?.timestamp
                                    ? new Date(chat.lastMessage.timestamp).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })
                                    : '--:--',
                                unread: unreadCount,
                                avatar: getAvatarInitials(chat),
                                status: 'online',
                                isUnread: unreadCount > 0,
                                rawChat: chat
                            };
                        } catch (error) {
                            console.error(`Error getting unread count for chat ${chat._id}:`, error);
                            return {
                                id: chat._id,
                                name: getChatTitle(chat),
                                lastMessage: chat.lastMessage?.text || 'No messages yet',
                                category: getChatCategory(chat.topic),
                                time: '--:--',
                                unread: 0,
                                avatar: getAvatarInitials(chat),
                                status: 'online',
                                isUnread: false,
                                rawChat: chat
                            };
                        }
                    })
                );

                setChatList(chatsWithUnreadCounts);
            } else {
                toast.error('Failed to load chats');
            }
        } catch (error) {
            console.error('Error fetching chats:', error);
            if (error.response?.status === 401) {
                navigate('/auth?mode=login');
            } else {
                toast.error('Error loading chats');
            }
        } finally {
            setLoading(false);
        }
    };

    // Fetch messages for a specific chat
    const fetchChatMessages = async (chatId) => {
        try {
            const token = localStorage.getItem('accessToken');

            const response = await axios.get(
                `${API_BASE_URL}/api/chats/${chatId}/messages`,
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                }
            );

            if (response.data.success) {
                const formattedMessages = response.data.data.map(msg => ({
                    id: msg._id,
                    type: msg.messageType === 'system' ? 'system' : 'text',
                    text: msg.message,
                    time: new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                    }),
                    isCurrentUser: msg.sender.user_id === localStorage.getItem('userID'),
                    ...(msg.messageType === 'system' && parseSystemMessage(msg.message))
                }));

                setMessages(formattedMessages);

                // Mark messages as seen
                await markMessagesAsSeen(chatId);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
            toast.error('Failed to load messages');
        }
    };

    // Mark messages as seen
    const markMessagesAsSeen = async (chatId) => {
        try {
            const token = localStorage.getItem('accessToken');
            const userId = localStorage.getItem('userID');

            await axios.put(
                `${API_BASE_URL}/api/chats/${chatId}/mark-seen`,
                { userId },
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                }
            );

            // Update local chat list to remove unread indicator
            setChatList(prev => prev.map(chat =>
                chat.id === chatId
                    ? { ...chat, unread: 0, isUnread: false }
                    : chat
            ));
        } catch (error) {
            console.error('Error marking messages as seen:', error);
        }
    };

    // Get unread message count for a specific chat (if needed separately)
    const getUnreadCount = async (chatId) => {
        try {
            const token = localStorage.getItem('accessToken');
            const userId = localStorage.getItem('userID');

            const response = await axios.get(
                `${API_BASE_URL}/api/chats/${chatId}/unread-count?userId=${userId}`,
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                }
            );

            // Fixed: response.data.data.unreadCount instead of response.data.count
            return response.data.data?.unreadCount || 0;
        } catch (error) {
            console.error('Error getting unread count:', error);
            return 0;
        }
    };

    // Helper functions (keep these the same)
    const getChatTitle = (chat) => {
        const otherParticipant = chat.participants?.find(p =>
            p.user_id.toString() !== localStorage.getItem('userID')
        );

        if (!otherParticipant) return 'Unknown Chat';

        switch (otherParticipant.role) {
            case 'admin': return 'Platform Manager';
            case 'supportofficer': return 'Support Officer';
            case 'stationowner': return 'Station Owner';
            default: return otherParticipant.role;
        }
    };

    const getChatCategory = (topic) => {
        switch (topic) {
            case 'stationApproval': return 'Station and Charger Management';
            case 'support': return 'Handle Fault Reports';
            case 'reportIssue': return 'Report Issues';
            default: return 'General';
        }
    };

    const getAvatarInitials = (chat) => {
        const otherParticipant = chat.participants?.find(p =>
            p.user_id.toString() !== localStorage.getItem('userID')
        );

        if (!otherParticipant) return 'UC';

        switch (otherParticipant.role) {
            case 'admin': return 'PM';
            case 'supportofficer': return 'SO';
            case 'stationowner': return 'SO';
            default: return otherParticipant.role.substring(0, 2).toUpperCase();
        }
    };

    const parseSystemMessage = (message) => {
        if (message.includes('New station')) {
            return {
                type: 'stationAddition',
                stationName: extractStationName(message),
                address: extractAddress(message),
                stationImage: getDefaultStationImage()
            };
        } else if (message.includes('charger added')) {
            return {
                type: 'chargerAddition',
                stationName: extractStationName(message),
                address: extractAddress(message),
                stationImage: getDefaultStationImage()
            };
        } else if (message.includes('Fault Report')) {
            return {
                type: 'faultReport',
                stationName: extractStationName(message),
                address: extractAddress(message),
                stationImage: getDefaultStationImage()
            };
        }
        return {};
    };

    const extractStationName = (message) => {
        const match = message.match(/"([^"]+)"/);
        return match ? match[1] : 'Unknown Station';
    };

    const extractAddress = (message) => {
        if (message.includes('Location:')) {
            return message.split('Location:')[1]?.split('\n')[0]?.trim() || 'Unknown location';
        }
        return 'Unknown location';
    };

    const getDefaultStationImage = () => {
        return 'https://images.unsplash.com/photo-1616361715039-11dde2199a21?q=80&w=1746&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    };

    // When a chat is selected
    const handleSelectChat = async (chat) => {
        setSelectedChat(chat);
        await fetchChatMessages(chat.id);
    };

    // Send a message
    const handleSendMessage = async (text) => {
        if (!selectedChat || !text.trim()) return;

        try {
            setSending(true);
            const token = localStorage.getItem('accessToken');
            const userId = localStorage.getItem('userID');

            // Get user role from currentUser - fix this based on your auth context structure
            const userRole = currentUser.role ||
                (isStationOwner ? 'stationowner' :
                    isAdmin ? 'admin' :
                        isSupportOfficer ? 'supportofficer' : 'user');

            const response = await axios.post(
                `${API_BASE_URL}/api/chats/${selectedChat.id}/messages`,
                {
                    senderId: userId,
                    senderRole: userRole,
                    message: text.trim()
                },
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                }
            );

            if (response.data.success) {
                const newMessage = {
                    id: response.data.data._id,
                    type: 'text',
                    text: text.trim(),
                    time: new Date().toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                    }),
                    isCurrentUser: true
                };

                setMessages(prev => [...prev, newMessage]);

                setChatList(prev => prev.map(chat =>
                    chat.id === selectedChat.id
                        ? {
                            ...chat,
                            lastMessage: `You: ${text.trim()}`,
                            time: 'Just now',
                            unread: 0,
                            isUnread: false
                        }
                        : chat
                ));
            }
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error('Failed to send message');
        } finally {
            setSending(false);
        }
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
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div style={{
            fontFamily: FONTS.family.sans,
            padding: '24px',
            backgroundColor: COLORS.background,
            minHeight: '100vh'
        }}>
            <UserPageHeader title="Chats" />

            <div className="flex flex-col w-full md:flex-row h-[calc(100vh-130px)] bg-white rounded-2xl shadow-sm">
                <ChatList
                    chats={chatList}
                    onSelectChat={handleSelectChat}
                    selectedChatId={selectedChat?.id}
                    loading={loading}
                />

                <div className="flex-1 flex flex-col">
                    {selectedChat ? (
                        <>
                            <ChatHeader user={{
                                name: selectedChat.name,
                                category: selectedChat.category
                            }} />
                            <div className="flex-1 overflow-y-auto p-4">
                                {messages.map((message) => (
                                    <ChatMessage
                                        key={message.id}
                                        message={message}
                                        isCurrentUser={message.isCurrentUser}
                                    />
                                ))}
                            </div>
                            <ChatInput
                                onSend={handleSendMessage}
                                disabled={!selectedChat || sending}
                                sending={sending}
                            />
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center" style={{ color: COLORS.secondaryText }}>
                            <div className="max-w-md">
                                <h3 className="text-lg font-normal mb-2">No chat selected</h3>
                                <p className="text-sm font-normal">Select a conversation from the list to start messaging</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatPage;