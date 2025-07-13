import React, { useState } from 'react';
import SendIcon from '../../../../assets/send.svg';
import { COLORS, FONTS } from '../../../../constants';
import AttachmentIcon from '../../../../assets/attachment.svg';

const ChatInput = ({ onSend, disabled = false }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            onSend(message);
            setMessage('');
        }
    };
    const handleAttachClick = () => {
        // onAttach(); // Handle attachment logic in parent component
    };

    return (
        <form onSubmit={handleSubmit} className="p-5">
            <div className="flex items-center shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-lg bg-white">
                <button
                    type="button"
                    onClick={handleAttachClick}
                    className="p-3 text-gray-500 hover:text-gray-700 transition-colors"
                    disabled={disabled}
                >
                    <img
                        src={AttachmentIcon}
                        alt="Attach file"
                        className="w-5 h-5"
                    />
                </button>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-5 py-5 rounded-l-lg focus:outline-none focus:ring-2 focus:border-transparent"
                    style={{
                        fontSize: FONTS.sizes.sm,
                        color: COLORS.mainTextColor,
                        // Add focus ring color directly in style
                        '--tw-ring-color': COLORS.border
                    }}
                    disabled={disabled}
                />
                <button
                    type="submit"
                    className="text-white p-5 rounded-r-lg transition-colors disabled:opacity-50"
                    //   style={{ backgroundColor: COLORS.primary }}
                    disabled={disabled || !message.trim()}
                >
                    <img
                        src={SendIcon}
                        alt="Send"
                        className="w-5 h-5"
                    />
                </button>
            </div>
        </form>
    );
};

export default ChatInput;