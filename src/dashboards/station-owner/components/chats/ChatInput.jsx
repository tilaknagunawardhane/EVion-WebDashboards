import React, { useState } from 'react';
import SendIcon from '../../../../assets/alerts_icon.svg';
import AttachIcon from '../../../../assets/attach.svg';
import { COLORS, FONTS } from '../../../../constants';

const ChatInput = ({ onSend, disabled = false, sending = false }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() && !sending) {
            onSend(message);
            setMessage('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-5">
            <div className="flex items-center shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-lg bg-white">
                <button
                    type="button"
                    className="p-3 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={disabled}
                >
                    <img 
                        src={AttachIcon} 
                        alt="Attach" 
                        className="w-4 h-4" 
                    />
                </button>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={disabled ? "Select a chat to message..." : "Type a message..."}
                    className="flex-1 py-3 px-2 rounded-lg focus:outline-none focus:border-transparent"
                    style={{
                        fontSize: FONTS.sizes.sm,
                        color: COLORS.mainTextColor,
                    }}
                    disabled={disabled || sending}
                />
                <button
                    type="submit"
                    className="p-3 text-blue-600 hover:text-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={disabled || sending || !message.trim()}
                >
                    {sending ? (
                        <div className="w-5 h-5 border-t-2 border-blue-600 border-solid rounded-full animate-spin"></div>
                    ) : (
                        <img 
                            src={SendIcon} 
                            alt="Send" 
                            className="w-5 h-5" 
                        />
                    )}
                </button>
            </div>
        </form>
    );
};

export default ChatInput;