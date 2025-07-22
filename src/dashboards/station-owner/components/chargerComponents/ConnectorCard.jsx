import React from 'react';
import { COLORS, FONTS } from '../../../../constants';
import ClockIcon from '../../../../assets/session_time.svg';
import EnergyIcon from '../../../../assets/session_energy.svg';
import CostIcon from '../../../../assets/session_cost.svg';
import { FiMoreVertical } from 'react-icons/fi';
import BookingDisableForm from '../chargerComponents/BookingDisableForm';


const ChargingSessionCard = ({ connectorName, session, bookings, timeSlots  }) => {

  const duration = session ? getDuration(session.startDate, session.startTime) : 'Not charging';

  function isWithinSlot(slotStr, startTimeStr, endTimeStr) {
    if (!startTimeStr || !endTimeStr || !slotStr) return false;

    const [slotStartStr, slotEndStr] = slotStr.split(' - ');
    const slotStart = toMinutes(slotStartStr);
    const slotEnd = toMinutes(slotEndStr);
    const start = toMinutes(startTimeStr);
    const end = toMinutes(endTimeStr);

    if (
      slotStart == null || slotEnd == null ||
      start == null || end == null
    ) return false;

    return slotStart >= start && slotEnd <= end;
  }

  function toMinutes(timeStr) {
    if (!timeStr || typeof timeStr !== 'string') return null;

    const [h, m] = timeStr.split(':').map(Number);
    if (isNaN(h) || isNaN(m)) return null;

    return h * 60 + m;
  }


  return (
    <div>

      <div className="flex w-full items-center justify-between">
        <h3 className="text-base font-semibold mb-2" style={{ color: COLORS.mainTextColor }}>
          {connectorName}
        </h3>
      </div>
      
      {session ? (
        <div className="gap-4 p-4 rounded-xl" style={{ backgroundColor: COLORS.background}}>
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

          <div className="flex justify-between p-4 mt-2">
            
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
        <div className="flex p-8 rounded-xl text-xs text-gray-400 italic mb-6 h-[197px]" style={{ backgroundColor: COLORS.background }}>No current session</div>
      )}

      <div className="flex items-center mt-6 w-full justify-between">
        <h3 className="text-base font-medium justify-between" style={{ color: COLORS.mainTextColor }}>
          Booking Schedule
        </h3>
      </div>

      {/* Scrollable Booking Grid for 3 Days */}
      <div className="mt-4 overflow-x-auto">
        <div className="flex gap-12 w-max"> {/* Adjust min-width as needed */}
          {[0, 1, 2].map((dayOffset) => {
            const date = new Date();
            date.setDate(date.getDate() + dayOffset);
            const dayLabel = date.toLocaleDateString(undefined, {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
            });

            return (
              <div key={dayOffset} className="flex min-w-[320px] flex-shrink-0 flex-col gap-4">
                <h4 className="text-center text-sm font-semibold text-gray-700">{dayLabel}</h4>
                <div className="grid grid-cols-4 gap-2 text-[11px] font-medium">
                  {timeSlots.map((slot, i) => {
                    let bg = 'transparent';
                    let border = COLORS.border;
                    let text = COLORS.secondaryText;

                    const isCurrent =
                      dayOffset === 0 && session && isWithinSlot(slot, session.startTime, session.endTime);
                    const isBooked = bookings.some(
                      (b) =>
                        b.dateOffset === dayOffset && isWithinSlot(slot, b.startTime, b.endTime)
                    );

                    if (isCurrent) {
                      bg = `${COLORS.primary}20`;
                      text = COLORS.primary;
                      border = COLORS.primary;
                    } else if (isBooked) {
                      bg = `${COLORS.HighlightText}10`;
                      text = COLORS.HighlightText;
                      border = COLORS.HighlightText;
                    }

                    return (
                      <div
                        key={i}
                        className="px-2 py-2 rounded-md text-center border"
                        style={{
                          backgroundColor: bg,
                          color: text,
                          border: `1px solid ${border}`,
                        }}
                      >
                        {slot}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
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
