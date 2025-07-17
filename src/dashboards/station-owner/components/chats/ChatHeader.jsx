import React from 'react';
import { COLORS, FONTS } from '../../../../constants';

const ChatHeader = ({ user }) => {
  return (
    <div className="p-4 rounded-2xl w-full">
      <h2 className="text-lg font-semibold" style={{fontSize: FONTS.sizes.xl }}>{user.name}</h2>
      {user.location && (
        <p className="text-sm " style={{color: COLORS.primary }}>{user.location}</p>
      )}
      {user.joinDate && (
        <p className="text-xs text-gray-400 mt-5 text-center">Joined {user.joinDate}</p>
      )}
    </div>
  );
};

export default ChatHeader;