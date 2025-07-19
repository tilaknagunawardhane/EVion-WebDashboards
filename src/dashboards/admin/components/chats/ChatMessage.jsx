import React from 'react';
import { COLORS, FONTS } from '../../../../constants';

const ChatMessage = ({ message, isCurrentUser }) => {
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div 
        className={`max-w-xs md:max-w-md rounded-2xl px-4 py-2 ${
          isCurrentUser ? 'rounded-br-none' : 'rounded-bl-none'
        }`}
        style={{
          backgroundColor: isCurrentUser ? COLORS.primary : COLORS.bgGreen,
          color: isCurrentUser ? 'white' : COLORS.mainTextColor,
          fontFamily: FONTS.family.sans
        }}
      >
        <p className="text-sm">{message.text}</p>
        <p 
          className="text-xs text-right mt-2" 
          style={{ 
            opacity: 0.7,
            color: isCurrentUser ? COLORS.background : COLORS.secondaryText
          }}
        >
          {message.time}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;