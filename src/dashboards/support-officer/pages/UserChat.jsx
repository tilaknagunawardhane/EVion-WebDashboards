import React, { useState, useEffect } from 'react';
import ChatList from '../components/chats/ChatList';
import ChatHeader from '../components/chats/ChatHeader';
import ChatMessage from '../components/chats/ChatMessage';
import ChatInput from '../components/chats/ChatInput';
import { COLORS, FONTS } from '../../../constants';
import UserPageHeader from '../components/UserPageHeader';

const ChatPage = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [chatList, setChatList] = useState([]);

    // Initialize chat data
    useEffect(() => {
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
            },
            {
                id: 3,
                type: 'text',
                text: 'Thanks for joining the Evion Network!',
                time: '12:42',
                isCurrentUser: false,
            },
            {
                id: 2,
                type: 'chargerAddition',
                stationName: 'EVion Station - Colombo 7',
                address: '123 Green Lane, Colombo 07',
                stationImage: 'https://images.unsplash.com/photo-1616361715039-11dde2199a21?q=80&w=1746&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                time: '13:28',
                isCurrentUser: true
            },

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
        }
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
            <StationOwnerPageHeader title="Chats" />

            <div className="flex flex-col w-full md:flex-row h-[calc(100vh-130px)] bg-white rounded-2xl shadow-sm">
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

export default ChatPage;