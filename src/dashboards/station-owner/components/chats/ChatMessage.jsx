import React from 'react';
import { COLORS, FONTS } from '../../../../constants';

const ChatMessage = ({ message, isCurrentUser }) => {
  const isStationAddition = message.type === 'stationAddition';
  const isChargerAddition = message.type === 'chargerAddition';
  const isFaultReport = message.type === 'faultReport';

  if (isStationAddition || isChargerAddition || isFaultReport) {
    let cardTitle = '';
    if (isStationAddition) {
      cardTitle = 'Request to add a new Charging Station!';
    } else if (isChargerAddition) {
      cardTitle = 'Request to add a new Charger!';
    } else if (isFaultReport) {
      cardTitle = 'A new Fault Report was Received!';
    }


    const bgColor = (isStationAddition || isChargerAddition) ? COLORS.primary : COLORS.bgGreen;
    const innerBg = (isStationAddition || isChargerAddition) ? COLORS.bgGreen : COLORS.background;
    const title = (isStationAddition || isChargerAddition) ? 'white' : COLORS.mainTextColor;

    return (
      <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
        <div
            className={`max-w-xs md:max-w-md rounded-2xl px-4 py-2 ${
            isCurrentUser ? 'rounded-br-none' : 'rounded-bl-none'
            }`}
          style={{
            backgroundColor: bgColor,
            fontFamily: FONTS.family.sans,
          }}
        >
          <p className="font-normal text-sm mb-2 " style={{color: title}}>{cardTitle}</p>
          <div
            className="flex items-start p-3 rounded-xl"
            style={{ backgroundColor: innerBg }}
          >
            <img
              src={message.stationImage}
              alt="station"
              className="w-14 h-14 object-cover rounded-md mr-3"
            />
            <div className="flex-1">
              <p className="text-sm font-normal mb-1 underline" style={{color: COLORS.mainTextColor}}>{message.stationName}</p>
              <p className="text-xs font-normal" style={{color: COLORS.secondaryText }}>{message.address}</p>
            </div>
          </div>
          <p
              className="text-xs text-right mt-2"
              style={{ color: title }}
              >
              {message.time}
          </p>
        </div>
      </div>
    );
  }

  // Default text message
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-xs md:max-w-md rounded-2xl px-4 py-2 ${
          isCurrentUser ? 'rounded-br-none' : 'rounded-bl-none'
        }`}
        style={{
          backgroundColor: isCurrentUser ? COLORS.primary : COLORS.bgGreen,
          color: isCurrentUser ? 'white' : COLORS.mainTextColor,
          fontFamily: FONTS.family.sans,
        }}
      >
        <p className="text-sm">{message.text}</p>
        <p
          className="text-xs text-right mt-2"
          style={{
            opacity: 0.7,
            color: isCurrentUser ? COLORS.background : COLORS.secondaryText,
          }}
        >
          {message.time}
        </p>
      </div>
    </div>
  );
};


export default ChatMessage;