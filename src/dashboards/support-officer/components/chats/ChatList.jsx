import React from 'react';
import SearchIcon from '../../../../assets/search_icon.svg';
import { COLORS, FONTS } from '../../../../constants';

const ChatList = ({ chats, onSelectChat, selectedChatId, loading }) => {
    if (loading) {
        return (
            <div className="w-full md:w-1/3 overflow-y-auto rounded-2xl">
                <div className="p-4">
                    <div className="animate-pulse">
                        <div className="h-10 bg-gray-200 rounded-lg mb-4"></div>
                        {[1, 2, 3].map(i => (
                            <div key={i} className="p-5 flex items-center mb-2">
                                <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                                <div className="flex-1">
                                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                    <div className="h-3 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Function to truncate long messages
    const truncateMessage = (message, maxLength = 25) => {
        if (!message) return '';
        if (message.length <= maxLength) return message;
        return message.substring(0, maxLength) + '...';
    };

    return (
        <div className="w-full md:w-1/3 overflow-y-auto rounded-2xl">
            {/* Header with search */}
            <div className="sticky top-0 bg-white z-10 p-4">
                <div className="relative">
                    <img
                        src={SearchIcon}
                        alt="Search"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                        style={{ color: COLORS.secondaryText }}
                    />
                    <input
                        type="text"
                        placeholder="Search chats..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none text-sm"
                        style={{ fontFamily: FONTS.family.sans, background: COLORS.background, color: COLORS.secondaryText }}
                    />
                </div>
            </div>

            {/* Chat list */}
            <div>
                {chats.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        <p>No chats available</p>
                        <p className="text-sm mt-1">Start a conversation by adding a station</p>
                    </div>
                ) : (
                    chats.map((chat) => (
                        <div 
                            key={chat.id} 
                            className={`p-5 cursor-pointer flex items-center transition-colors hover:bg-gray-50 ${
                                selectedChatId === chat.id ? 'bg-blue-50' : ''
                            }`}
                            onClick={() => onSelectChat(chat)}
                        >
                            {/* Avatar with status indicator */}
                            <div className={`relative mr-3 w-10 h-10 rounded-full flex items-center justify-center 
                                ${chat.status === 'online' ? 'bg-green-50' :
                                chat.status === 'away' ? 'bg-yellow-50' : 'bg-gray-50'}`}>
                                <span className="font-medium" style={{ color: COLORS.mainTextColor }}>
                                    {chat.avatar}
                                </span>
                                {chat.status === 'online' && (
                                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white"></span>
                                )}
                            </div>

                            {/* Chat info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-1">
                                    <p 
                                        className="font-semibold text-sm truncate"
                                        style={{ 
                                            color: selectedChatId === chat.id ? COLORS.primary : COLORS.mainTextColor,
                                            fontFamily: FONTS.family.sans
                                        }}
                                    >
                                        {chat.name}
                                    </p>
                                    <div className="flex items-center space-x-2">
                                        <span 
                                            className="text-xs whitespace-nowrap"
                                            style={{ color: COLORS.secondaryText }}
                                        >
                                            {chat.time}
                                        </span>
                                        {chat.unread > 0 && (
                                            <span 
                                                className="text-xs rounded-full min-w-[16px] h-4 flex items-center justify-center px-1"
                                                style={{
                                                    backgroundColor: COLORS.primary,
                                                    color: 'white'
                                                }}
                                            >
                                                {chat.unread > 9 ? '9+' : chat.unread}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="flex justify-between items-center">
                                    <p 
                                        className="text-xs truncate pr-2 flex-1"
                                        style={{ color: COLORS.secondaryText }}
                                    >
                                        {truncateMessage(chat.lastMessage)}
                                    </p>
                                </div>
                                
                                {chat.category && (
                                    <p 
                                        className="text-xs text-gray-400 mt-1"
                                        style={{ color: COLORS.secondaryText }}
                                    >
                                        {chat.category}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ChatList;