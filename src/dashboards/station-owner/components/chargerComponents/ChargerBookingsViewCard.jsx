import React from 'react';
import { COLORS, FONTS } from '../../../../constants';
import ClockIcon from '../../../../assets/export_icon.svg';
import EnergyIcon from '../../../../assets/export_icon.svg';
import CostIcon from '../../../../assets/export_icon.svg';

const ChargingSessionCard = ({ connectorName, session, bookings, timeSlots }) => {

  const isWithinSlot = (slotTime, sessionStart, sessionEnd) => {
    const slot = new Date(`1970-01-01T${slotTime}:00`);
    const start = new Date(`1970-01-01T${sessionStart}:00`);
    const end = new Date(`1970-01-01T${sessionEnd}:00`);
    return slot >= start && slot < end;
  };

  const duration = session ? getDuration(session.startDate, session.startTime) : 'Not chargingi';

  return (
    <div>

      <h3 className="text-base font-semibold mb-2" style={{ color: COLORS.mainTextColor }}>
        {connectorName}
      </h3>

      {session ? (
        <div>
          <div className="flex items-center justify-between">
            <div style={{ fontSize: FONTS.sizes.sm, color: COLORS.mainTextColor, fontWeight: FONTS.weights.medium }}>
                {session.vehicle}
            </div>
            <div style={{ fontSize: FONTS.sizes.xs, color: COLORS.mainTextColor, fontWeight: FONTS.weights.medium }}>
                <strong
                style={{ fontWeight: FONTS.weights.normal, color: COLORS.secondaryText, fontSize: FONTS.sizes.xs }}
                >
                Charging Started At:
                </strong>{' '}
                {session.startTime}
            </div>

          </div>
          <div className="flex justify-between px-8 py-4 rounded-xl mt-2" style={{ backgroundColor: COLORS.background }}>
            
            {/* Duration */}
            <div className="flex-col justify-items-center space-y-2">
              <img
                src={ClockIcon}
                alt=""
                className="w-12 h-12"
                style={{
                    color: COLORS.primary
                }}
              />
              <div className="space-y-0">
                <div style={{ color: COLORS.secondaryText, fontSize: FONTS.sizes.xs, fontWeight: FONTS.weights.normal }}>Duration</div>
                <div style={{ color: COLORS.mainTextColor, fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium }}>{duration}</div>
              </div>
            </div>

            {/* Energy */}
            <div className="flex-col justify-items-center space-y-2">
              <img
                src={EnergyIcon}
                alt=""
                className="w-12 h-12"
                style={{
                    color: COLORS.primary
                }}
              />
              <div className="space-y-0">
                <div style={{ color: COLORS.secondaryText, fontSize: FONTS.sizes.xs, fontWeight: FONTS.weights.normal }}>Energy</div>
                <div style={{ color: COLORS.mainTextColor, fontSize: FONTS.sizes.xl, fontWeight: FONTS.weights.semibold }}>
                  {session.energy}
                  <span style={{ color: COLORS.mainTextColor, fontSize: FONTS.sizes.xs, fontWeight: FONTS.weights.normal }}>
                    kWh
                  </span>
                </div>
              </div>
            </div>

            {/* Cost */}
            <div className="flex-col justify-items-center space-y-2">
              <img
                src={CostIcon}
                alt=""
                className="w-12 h-12"
                style={{
                    color: COLORS.primary
                }}
              />
              <div className="space-y-0">
                <div style={{ color: COLORS.secondaryText, fontSize: FONTS.sizes.xs, fontWeight: FONTS.weights.normal }}>Cost</div>
                <div style={{ color: COLORS.mainTextColor, fontSize: FONTS.sizes.xl, fontWeight: FONTS.weights.semibold }}>
                  <span style={{ color: COLORS.mainTextColor, fontSize: FONTS.sizes.xs, fontWeight: FONTS.weights.normal }}>
                    Rs.
                  </span>
                  {session.cost}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-xs text-gray-400 italic mb-6">No current session</div>
      )}

      {/* Booking Grid */}
      <div className="grid grid-cols-2 gap-2 text-[11px] font-medium mt-8">
        {timeSlots.map((slot, i) => {
          let bg = 'transparent';
          let border = COLORS.secondaryText;
          let text = COLORS.secondaryText;

          const isCurrent = session && isWithinSlot(slot, session.startTime, session.endTime);
          const isBooked = bookings.some(b => isWithinSlot(slot, b.startTime, b.endTime));

          if (isCurrent) {
            bg = COLORS.primary;
            text = 'white';
            border = COLORS.primary;
          } else if (isBooked) {
            bg = COLORS.star;
            text = 'white';
            border = COLORS.star;
          }

          return (
            <div
              key={i}
              className="px-2 py-2 rounded-md text-center"
              style={{
                backgroundColor: bg,
                color: text,
                border: `1px solid ${border}`
              }}
            >
              {slot}
            </div>
          );
        })}
      </div>

    </div>
  );
};

// Duration calculation
function getDuration(startDateStr, startTimeStr, current = new Date()) {
  const [startHour, startMinute] = startTimeStr.split(':').map(Number);

  // Create full start DateTime object
  const startDateTime = new Date(startDateStr);
  startDateTime.setHours(startHour, startMinute, 0, 0); // add time to the date

  let diffMs = current - startDateTime;

  // Prevent negative durations
  if (diffMs < 0) diffMs = 0;

  const diffMins = Math.floor(diffMs / 60000);
  const hours = Math.floor(diffMins / 60);
  const minutes = diffMins % 60;

  return `${hours} hr${hours !== 1 ? 's' : ''} : ${minutes} min${minutes !== 1 ? 's' : ''}`;
}



export default ChargingSessionCard;
