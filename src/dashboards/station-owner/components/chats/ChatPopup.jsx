// components/ui/ChatPopup.jsx
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FiMessageCircle, FiX, FiUser, FiSend, FiChevronDown } from 'react-icons/fi';
import { COLORS } from '../../../../constants';
import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ChatPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeChat, setActiveChat] = useState(null);
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const messagesEndRef = useRef(null);

    const fetchUserChats = async () => {
        try {
            setLoading(true);
            setError('');
            const userId = localStorage.getItem('userID');
            const token = localStorage.getItem('accessToken');

            const response = await axios.get(
                `${API_BASE_URL}/api/chats/user/${userId}`,
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                }
            );

            if (response.data.success) {
                setChats(response.data.data);
            } else {
                setError('Failed to fetch chats');
            }
        } catch (error) {
            console.error('Error fetching chats:', error);
            setError('Error loading chats');
        } finally {
            setLoading(false);
        }
    };

    const fetchChatMessages = async (chatId) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('accessToken');

            const response = await axios.get(
                `${API_BASE_URL}/api/chats/${chatId}/messages`,
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                }
            );

            if (response.data.success) {
                setMessages(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
            toast.error('Failed to load messages');
        } finally {
            setLoading(false);
        }
    };

    const sendMessage = async () => {
        if (!newMessage.trim() || !activeChat) return;

        try {
            const token = localStorage.getItem('accessToken');
            const userId = localStorage.getItem('userID');
            const userRole = 'stationowner'; // Assuming station owner role

            const response = await axios.post(
                `${API_BASE_URL}/api/chats/${activeChat._id}/messages`,
                {
                    senderId: userId,
                    senderRole: userRole,
                    message: newMessage.trim()
                },
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                }
            );

            if (response.data.success) {
                setNewMessage('');
                // Refresh messages
                fetchChatMessages(activeChat._id);
                // Refresh chats to update last message
                fetchUserChats();
            }
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error('Failed to send message');
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen && !activeChat) {
            fetchUserChats();
        }
    }, [isOpen, activeChat]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleChatSelect = (chat) => {
        setActiveChat(chat);
        fetchChatMessages(chat._id);
    };

    const handleBackToChats = () => {
        setActiveChat(null);
        setMessages([]);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const getChatTitle = (chat) => {
        const otherParticipant = chat.participants?.find(p =>
            p.user_id !== localStorage.getItem('userID')
        );

        if (!otherParticipant) return 'Unknown Chat';

        switch (otherParticipant.role) {
            case 'admin': return 'Admin';
            case 'supportofficer': return 'Support';
            default: return otherParticipant.role;
        }
    };

    const getLastMessagePreview = (chat) => {
        if (!chat.lastMessage?.text) return 'No messages yet';
        return chat.lastMessage.text.length > 25
            ? chat.lastMessage.text.substring(0, 25) + '...'
            : chat.lastMessage.text;
    };

    return (
        <>
            {/* Floating Chat Button */}
            <button
                className="fixed flex items-center gap-2 bottom-6 right-6 shadow-lg p-4 rounded-full hover:shadow-xl transition-all duration-200 z-40"
                style={{
                    backgroundColor: COLORS.primary,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
                onClick={() => setIsOpen(!isOpen)}
            >
                <FiMessageCircle size={20} color={COLORS.background} />
                <span className="font-medium text-white">Chat</span>
            </button>

            {/* Chat Bubble */}
            {isOpen && (
                <div className="fixed bottom-20 right-6 z-50 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
                    {/* Header */}
                    <div
                        className="px-4 py-3 flex items-center justify-between"
                        style={{ backgroundColor: COLORS.primary }}
                    >
                        {activeChat ? (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleBackToChats}
                                    className="p-1 rounded-full hover:bg-white hover:bg-opacity-20"
                                >
                                    <FiChevronDown size={16} className="text-white rotate-90 hover:text-black" />
                                </button>
                                <h3 className="text-sm font-semibold text-white">
                                    {getChatTitle(activeChat)}
                                </h3>
                            </div>
                        ) : (
                            <h3 className="text-sm font-semibold text-white">Your Chats</h3>
                        )}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1 rounded-full hover:bg-white hover:bg-opacity-20"
                        >
                            <FiX size={16} className="text-white hover:text-black" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="max-h-96 overflow-y-auto">
                        {activeChat ? (
                            // Chat Messages
                            <div className="p-3 space-y-2">
                                {loading ? (
                                    <div className="flex justify-center py-4">
                                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2" style={{ border: COLORS.primary }}></div>
                                    </div>
                                ) : messages.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500 text-sm">
                                        No messages yet. Start the conversation!
                                    </div>
                                ) : (
                                    messages.map((message) => (
                                        <div
                                            key={message._id}
                                            className={`flex ${message.sender.user_id === localStorage.getItem('userID') ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className="max-w-xs px-3 py-2 rounded-lg text-sm"
                                                style={
                                                    message.sender.user_id === localStorage.getItem('userID')
                                                        ? { backgroundColor: COLORS.bgGreen, color: COLORS.mainTextColor } // or any suitable text color
                                                        : { backgroundColor: COLORS.background, color: COLORS.mainTextColor}
                                                }
                                            >
                                                {/* <div
                                                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${message.sender.user_id === localStorage.getItem('userID')
                                                            ? 'bg-green-100 text-gray-800'
                                                            : 'bg-gray-100 text-gray-800'
                                                        }`}
                                                > */}
                                                    {message.message}
                                                    <div className="text-xs text-gray-500 mt-1">
                                                        {new Date(message.timestamp).toLocaleTimeString()}
                                                    </div>
                                                </div>
                                            </div>
                                            ))
                                )}
                                            <div ref={messagesEndRef} />
                                        </div>
                                    ) : (
                                // Chat List
                                <div className="p-3 space-y-2">
                                    {loading ? (
                                        <div className="flex justify-center py-4">
                                            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-green-500"></div>
                                        </div>
                                    ) : error ? (
                                        <div className="text-center py-4 text-red-500 text-sm">
                                            {error}
                                        </div>
                                    ) : chats.length === 0 ? (
                                        <div className="text-center py-4 text-gray-500 text-sm">
                                            No chats available
                                        </div>
                                    ) : (
                                        chats.map((chat) => (
                                            <div
                                                key={chat._id}
                                                onClick={() => handleChatSelect(chat)}
                                                className="p-3 border rounded-lg cursor-pointer hover:border-green-300 transition-colors"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"  style={{ backgroundColor: COLORS.bgGreen }}>
                                                            <FiUser size={14} style={{ color: COLORS.primary }}/>
                                                        </div>
                                                        <div>
                                                            <h4 className="text-sm font-medium text-gray-800">
                                                                {getChatTitle(chat)}
                                                            </h4>
                                                            <p className="text-xs text-gray-600">
                                                                {getLastMessagePreview(chat)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {chat.lastMessage && (
                                                        <span className="text-xs text-gray-500 whitespace-nowrap">
                                                            {new Date(chat.lastMessage.timestamp).toLocaleTimeString()}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                        )}
                            </div>

                    {/* Message Input (only when chat is active) */}
                        {activeChat && (
                            <div className="p-3 border-t bg-gray-50">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Type your message..."
                                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                    <button
                                        onClick={sendMessage}
                                        disabled={!newMessage.trim()}
                                        className="px-3 py-2 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                         style={{ backgroundColor: COLORS.primary }}
                                    >
                                        <FiSend size={16} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
            )}
                </>
            );
}