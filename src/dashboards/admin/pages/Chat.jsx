import React, { useState, useEffect } from 'react';
import ChatList from '../components/chats/ChatList';
import ChatHeader from '../components/chats/ChatHeader';
import ChatMessage from '../components/chats/ChatMessage';
import ChatInput from '../components/chats/ChatInput';
import { COLORS, FONTS } from '../../../constants';
import AdminPageHeader from '../components/AdminPageHeader';

const ChatPage = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [chatList, setChatList] = useState([]);

    // Initialize chat data
    useEffect(() => {
        setChatList([
            {
                id: 1,
                name: 'Jayden Church',
                lastMessage: 'You: I think it would be perfect...',
                location: 'Ontaro Charging Station, 23, Horana Road, Bandaragana',
                joinDate: '7 July',
                time: '12:38',
                unread: 3,
                avatar: 'JC',
                status: 'online',
                isUnread: true,
                messages: [
                    {
                        id: 1,
                        text: 'Hello! How can I help you?',
                        time: '12:38',
                        isCurrentUser: false
                    }
                ]
            },
            {
                id: 2,
                name: 'Ontaro Station',
                lastMessage: 'Your charging session has completed',
                location: 'Main Charging Hub, 45, Station Road',
                joinDate: '15 June',
                time: '11:45',
                unread: 0,
                avatar: 'OS',
                status: 'offline',
                isUnread: false,
                messages: [
                    {
                        id: 1,
                        text: 'Your charging session #2456 has completed',
                        time: '11:45',
                        isCurrentUser: false
                    }
                ]
            },
            {
                id: 3,
                name: 'Electra Power',
                lastMessage: 'Your payment was successful',
                location: 'Electra Supercharger, 78, Power Lane',
                joinDate: '22 May',
                time: '09:15',
                unread: 0,
                avatar: 'EP',
                status: 'online',
                isUnread: false,
                messages: [
                    {
                        id: 1,
                        text: 'Payment of $24.50 for session #7890 was successful',
                        time: '09:15',
                        isCurrentUser: false
                    }
                ]
            },
            {
                id: 4,
                name: 'Sarah Johnson',
                lastMessage: 'Is the fast charger available now?',
                location: 'Urban Charge Point, 12, Market Street',
                joinDate: '3 July',
                time: '14:20',
                unread: 1,
                avatar: 'SJ',
                status: 'online',
                isUnread: true,
                messages: [
                    {
                        id: 1,
                        text: 'Hi, is the 150kW charger available now?',
                        time: '14:20',
                        isCurrentUser: false
                    }
                ]
            },
            {
                id: 5,
                name: 'VoltNow Support',
                lastMessage: 'We have resolved your issue',
                location: 'VoltNow Headquarters',
                joinDate: '10 June',
                time: '16:05',
                unread: 0,
                avatar: 'VS',
                status: 'offline',
                isUnread: false,
                messages: [
                    {
                        id: 1,
                        text: 'Your reported issue with charger #45 has been resolved',
                        time: '16:05',
                        isCurrentUser: false
                    }
                ]
            },
            {
                id: 6,
                name: 'Michael Chen',
                lastMessage: 'You: Thanks for the help!',
                location: 'Green Energy Station, 56, Oak Avenue',
                joinDate: '28 June',
                time: '10:30',
                unread: 0,
                avatar: 'MC',
                status: 'online',
                isUnread: false,
                messages: [
                    {
                        id: 1,
                        text: 'The charger keeps stopping after 5 minutes',
                        time: '10:15',
                        isCurrentUser: false
                    },
                    {
                        id: 2,
                        text: 'Have you tried charger #3 instead?',
                        time: '10:25',
                        isCurrentUser: true
                    },
                    {
                        id: 3,
                        text: 'You: Thanks for the help!',
                        time: '10:30',
                        isCurrentUser: true
                    }
                ]
            },
            {
                id: 7,
                name: 'PowerGrid Central',
                lastMessage: 'Scheduled maintenance tomorrow',
                location: 'Central Power District',
                joinDate: '5 May',
                time: '08:00',
                unread: 2,
                avatar: 'PC',
                status: 'offline',
                isUnread: true,
                messages: [
                    {
                        id: 1,
                        text: 'Notice: Scheduled maintenance tomorrow 10AM-2PM',
                        time: '08:00',
                        isCurrentUser: false
                    }
                ]
            },
            {
                id: 8,
                name: 'Lisa Rodriguez',
                lastMessage: 'The app says charger is free but...',
                location: 'City Charge Plaza, 34, Main Boulevard',
                joinDate: '19 July',
                time: '17:45',
                unread: 1,
                avatar: 'LR',
                status: 'online',
                isUnread: true,
                messages: [
                    {
                        id: 1,
                        text: 'The app says charger is free but someone is using it',
                        time: '17:45',
                        isCurrentUser: false
                    }
                ]
            },
            {
                id: 9,
                name: 'EcoCharge Network',
                lastMessage: 'New charging station opened nearby',
                location: 'Network Headquarters',
                joinDate: '1 July',
                time: '07:30',
                unread: 0,
                avatar: 'EN',
                status: 'offline',
                isUnread: false,
                messages: [
                    {
                        id: 1,
                        text: 'New station opened at 89 River Street with 10 chargers',
                        time: '07:30',
                        isCurrentUser: false
                    }
                ]
            },
            {
                id: 10,
                name: 'David Wilson',
                lastMessage: 'You: Ill be there in 10 mins',
                location: 'Highway Rest Stop Charger, Exit 45',
                joinDate: '12 July',
                time: '15:10',
                unread: 0,
                avatar: 'DW',
                status: 'online',
                isUnread: false,
                messages: [
                    {
                        id: 1,
                        text: 'Are you still using charger #5?',
                        time: '15:05',
                        isCurrentUser: false
                    },
                    {
                        id: 2,
                        text: "You: I'll be there in 10 mins",
                        time: '15:10',
                        isCurrentUser: true
                    }
                ]
            }
            // ... other chats
        ]);
    }, []);

    // When a chat is selected, load its messages and mark as read
    const handleSelectChat = (chat) => {
        setSelectedChat(chat);
        setMessages(chat.messages || []);

        // Mark as read if there were unread messages
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
        if (!selectedChat) return;

        const newMessage = {
            id: Date.now(), // Better unique ID
            text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isCurrentUser: true
        };

        // Update messages for current view
        setMessages(prev => [...prev, newMessage]);

        // Update the chat list's last message
        setChatList(prevChats =>
            prevChats.map(chat =>
                chat.id === selectedChat.id
                    ? {
                        ...chat,
                        lastMessage: text,
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
        }}>
            <AdminPageHeader title="Chats" />

            <div className="flex flex-col md:flex-row h-[calc(100vh-120px)] bg-white rounded-2xl shadow-sm">
                <ChatList
                    chats={chatList}
                    onSelectChat={handleSelectChat}
                    selectedChatId={selectedChat?.id}
                />

                <div className="flex-1 flex flex-col">
                    {selectedChat ? (
                        <>
                            <ChatHeader user={{
                                name: selectedChat.name,
                                location: selectedChat.location,
                                joinDate: selectedChat.joinDate
                            }} />
                            <div className="flex-1 overflow-y-auto p-4">
                                {/* Station request info - only show for specific chats */}


                                {/* Messages */}
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
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-8 text-center">
                            <div className="max-w-md">
                                <h3 className="text-lg font-medium mb-2">No chat selected</h3>
                                <p className="text-sm">Select a conversation from the list to start messaging</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatPage;