import React from 'react';
import SearchIcon from '../../../../assets/search_icon.svg';
import { COLORS, FONTS } from '../../../../constants';

const ChatList = ({ chats, onSelectChat, selectedChatId }) => {
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
                        placeholder="Search"
                        className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none text-sm"
                        style={{ fontFamily: FONTS.family.sans, background: COLORS.background, color: COLORS.secondaryText }}
                    />
                </div>
            </div>

            {/* Chat list */}
            <div>
                {chats.map((chat) => (
                    <div 
                        key={chat.id} 
                        className={`p-5 cursor-pointer flex items-center transition-colors `}
                        style={{backgroundColor: selectedChatId === chat.id ? COLORS.bgGreen : '' }}
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
                            {chat.status === 'away' && (
                                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-yellow-400 rounded-full border border-white"></span>
                            )}
                        </div>

                        {/* Chat info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                                <p 
                                    className="font-semibold text-sm truncate"
                                    style={{ 
                                        color: selectedChatId === chat.id ? COLORS.primary : COLORS.mainTextColor,
                                        fontFamily: FONTS.family.sans
                                    }}
                                >
                                    {chat.name}
                                </p>
                                <div className="flex items-center space-x-1">
                                    <span 
                                        className="text-xs"
                                        style={{ color: COLORS.secondaryText }}
                                    >
                                        {chat.time}
                                    </span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-0.5">
                                <p 
                                    className="text-xs truncate pr-2"
                                    style={{ color: COLORS.secondaryText }}
                                >
                                    {chat.lastMessage}
                                </p>
                                {chat.unread > 0 && (
                                    <span 
                                        className="text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]"
                                        style={{
                                            backgroundColor: COLORS.primary,
                                            color: 'white'
                                        }}
                                    >
                                        {chat.unread > 9 ? '9+' : chat.unread}
                                    </span>
                                )}
                                {chat.isUnread && !chat.unread && (
                                    <span 
                                        className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: COLORS.primary }}
                                    ></span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatList;