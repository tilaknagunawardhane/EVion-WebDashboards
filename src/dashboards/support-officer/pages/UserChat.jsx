import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { COLORS, FONTS } from '../../../constants';
import UserPageHeader from '../components/UserPageHeader';
import ChatList from '../components/chats/ChatList';
import ChatHeader from '../components/chats/ChatHeader';
import ChatMessage from '../components/chats/ChatMessage';
import ChatInput from '../components/chats/ChatInput';

const UserChatPage = () => {
    const location = useLocation();
    const { user } = location.state || {};
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [chatList, setChatList] = useState([]);

    // Initialize chat data with the user from navigation
    useEffect(() => {
        const userChat = {
            id: 3,
            name: user?.Name || 'User',
            lastMessage: 'Started conversation',
            category: 'Fault Report Discussion',
            time: 'Just now',
            unread: 0,
            avatar: user?.Name?.charAt(0) || 'U',
            status: 'online',
            isUnread: false,
            messages: [
                {
                    id: 1,
                    type: 'text',
                    text: `Hello, I'm contacting you regarding the fault report.`,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    isCurrentUser: false
                }
            ]
        };

        setChatList([
            {
                id: 1,
                name: 'Platform Manager',
                lastMessage: 'You: Request to add a new charger!',
                category: 'Station and Charger Management',
                time: '12:38',
                unread: 3,
                avatar: 'PM',
                status: 'online',
                isUnread: true,
                messages: [
                    {
                        id: 1,
                        type: 'stationAddition',
                        stationName: 'EVion Station - Colombo 7',
                        address: '123 Green Lane, Colombo 07',
                        stationImage: 'https://images.unsplash.com/photo-1703860271509-b50f5679f2a0?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                        time: '12:42',
                        isCurrentUser: true
                    }
                ]
            },
            {
                id: 2,
                name: 'Support Officer',
                lastMessage: 'A new fault was reported!',
                category: 'Handle Fault Reports',
                time: '11:45',
                unread: 0,
                avatar: 'SO',
                status: 'offline',
                isUnread: false,
                messages: [
                    {
                        id: 1,
                        type: 'faultReport',
                        stationName: 'EVion Station - Kandy',
                        address: '45 Hill Street, Kandy',
                        stationImage: 'https://images.unsplash.com/photo-1616361715039-11dde2199a21?q=80&w=1746&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                        time: '11:45',
                        isCurrentUser: false
                    }
                ]
            },
            userChat
        ]);

        // Auto-select the user chat if coming from navigation
        setSelectedChat(userChat);
        setMessages(userChat.messages);
    }, [user]);

    const handleSelectChat = (chat) => {
        setSelectedChat(chat);
        setMessages(chat.messages || []);

        if (chat.unread > 0) {
            setChatList(prevChats =>
                prevChats.map(c =>
                    c.id === chat.id
                        ? { ...c, unread: 0, isUnread: false }
                        : c
                )
            );
        }
    };

    const handleSendMessage = (text) => {
        if (!selectedChat || !text.trim()) return;

        const newMessage = {
            id: Date.now(),
            type: 'text',
            text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isCurrentUser: true
        };

        setMessages(prev => [...prev, newMessage]);

        setChatList(prevChats =>
            prevChats.map(chat =>
                chat.id === selectedChat.id
                    ? {
                        ...chat,
                        lastMessage: `You: ${text}`,
                        time: 'Just now',
                        messages: [...chat.messages, newMessage]
                    }
                    : chat
            )
        );
    };

    return (
        <div style={{
            fontFamily: FONTS.family.sans,
            padding: '24px',
            backgroundColor: COLORS.background,
            height: '100vh',
            overflow: 'hidden'
        }}>
            <UserPageHeader title={`Chat with ${user?.Name || 'User'}`} />

            <div className="flex flex-col w-full md:flex-row h-[calc(100vh-130px)] bg-white rounded-2xl shadow-sm">
                <ChatList
                    chats={chatList}
                    onSelectChat={handleSelectChat}
                    selectedChatId={selectedChat?.id}
                />

                <div className="flex-1 flex flex-col border-l" style={{ borderColor: COLORS.stroke }}>
                    {selectedChat ? (
                        <>
                            <ChatHeader 
                                user={{
                                    name: selectedChat.name,
                                    status: selectedChat.status,
                                    avatar: selectedChat.avatar,
                                    accountStatus: user?.['Account Status'] || 'Unknown'
                                }} 
                            />
                            <div className="flex-1 overflow-y-auto p-4">
                                {messages.map((message) => (
                                    <ChatMessage
                                        key={`${selectedChat.id}-${message.id}`}
                                        message={message}
                                        isCurrentUser={message.isCurrentUser}
                                    />
                                ))}
                            </div>
                            <ChatInput
                                onSend={handleSendMessage}
                                disabled={!selectedChat}
                            />
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center" style={{color: COLORS.secondaryText}}>
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

export default UserChatPage;