import React, { useState, useRef } from 'react';
import { COLORS, FONTS } from '../../constants';
import Button from '../ui/Button';
import { FiMoreVertical } from 'react-icons/fi'; 

export default function StationCard({ station, onEdit, onRemove, onClick }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  // Safe defaults for station data
  const safeStation = {
    name: '',
    status: 'processing',
    address: '',
    powerTypes: [],
    electricityProvider: '',
    powerSource: '',
    numChargers: 0,
    chargers: [],
    ...station
  };

  const statusColors = {
    'processing': COLORS.star || '#F59E0B',
    'approved': COLORS.primary || '#3B82F6',
    'to_be_installed': COLORS.mainTextColor || '#10B981',
    'active': COLORS.primary,
    'closed': COLORS.bgGreen,
    'rejected': COLORS.danger,
  };

  return (
    <div
      className="rounded-xl p-6 shadow-md"
      style={{
        backgroundColor: 'white',
        overflow: 'hidden',
      }}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-0">
        <div>
          <h3
            style={{
              fontFamily: FONTS.family.sans,
              fontWeight: FONTS.weights.normal,
              fontSize: FONTS.sizes.base,
              color: COLORS.mainTextColor
            }}
          >
            {safeStation.name}
          </h3>

          <p
            className="mb-2"
            style={{
              color: COLORS.secondaryText,
              fontSize: FONTS.sizes.xs,
            }}
          >
            {safeStation.address}
          </p>
        </div>

        <div className="relative" ref={menuRef}>
          <button onClick={() => setShowMenu(!showMenu)}>
            <FiMoreVertical size={20} color={COLORS.mainTextColor} />
          </button>

          {showMenu && (
            <div
              className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-50"
              style={{ border: '1px solid #e5e7eb' }}
            >
              {safeStation.status === 'processing' && (
                <button
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => {
                    onEdit?.(station);
                    setShowMenu(false);
                  }}
                >
                  Edit
                </button>
              )}
              <button
                className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                onClick={() => {
                  onRemove?.(safeStation);
                  setShowMenu(false);
                }}
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex-col gap-0 mt-8">  
        <div className="flex flex-wrap gap-4 text-sm mt-2">
          <div>
            <strong
              style={{ fontWeight: FONTS.weights.normal, color: COLORS.secondaryText, fontSize: FONTS.sizes.xs }}
            >
              Power Types:
            </strong>{' '}
            {safeStation.powerTypes?.join(', ') || 'N/A'}
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-4 text-sm">
          <div>
            <strong
              style={{ fontWeight: FONTS.weights.normal, color: COLORS.secondaryText, fontSize: FONTS.sizes.xs }}
            >
              Electricity Provider:
            </strong>{' '}
            {safeStation.electricityProvider || 'N/A'}
          </div>
          <div>
            <strong
              style={{ fontWeight: FONTS.weights.normal, color: COLORS.secondaryText, fontSize: FONTS.sizes.xs }}
            >
              Power Source:
            </strong>{' '}
            {safeStation.powerSource || 'N/A'}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-sm mt-2">
          <div>
            <strong
              style={{ fontWeight: FONTS.weights.normal, color: COLORS.secondaryText, fontSize: FONTS.sizes.xs }}
            >
              Number of Chargers:
            </strong>{' '}
            {safeStation.numChargers}
          </div>
        </div>

        <div className="mt-4 space-y-4">
          {safeStation.chargers?.map((charger, idx) => {
            const safeCharger = {
              name: 'Unnamed Charger',
              powerType: 'Unknown',
              maxPower: 0,
              connectors: [],
              status: 'processing',
              ...charger
            };

            const formattedStatus = safeCharger.status
              .replace(/_/g, ' ')
              .replace(/\b\w/g, l => l.toUpperCase());
            
            return (
              <div key={idx} className="relative rounded-lg p-4" style={{ backgroundColor: COLORS.background }}>
                <span
                  className="absolute top-2 right-2 px-3 py-1 rounded-xl text-xs font-semibold"
                  style={{
                    backgroundColor: statusColors[safeCharger.status] || '#E5E7EB',
                    color: 'white',
                    fontWeight: FONTS.weights.normal
                  }}
                >
                  {formattedStatus}
                </span>
                <h4 className="mb-2" style={{ color: COLORS.mainTextColor }}>
                  {safeCharger.name}
                </h4>
                <p style={{ fontSize: FONTS.sizes.sm, color: COLORS.mainTextColor }}>
                  <strong style={{ fontWeight: FONTS.weights.normal, color: COLORS.secondaryText, fontSize: FONTS.sizes.xs }}>Power Type:</strong> {safeCharger.powerType}
                </p>
                <p style={{ fontSize: FONTS.sizes.sm, color: COLORS.mainTextColor }}>
                  <strong style={{ fontWeight: FONTS.weights.normal, color: COLORS.secondaryText, fontSize: FONTS.sizes.xs }}>Max Power Output:</strong> {safeCharger.maxPower} kW
                </p>
                <p style={{ fontSize: FONTS.sizes.sm, color: COLORS.mainTextColor }}>
                  <strong style={{ fontWeight: FONTS.weights.normal, color: COLORS.secondaryText, fontSize: FONTS.sizes.xs }}>Connectors:</strong> {safeCharger.connectors?.join(', ') || 'None'}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}