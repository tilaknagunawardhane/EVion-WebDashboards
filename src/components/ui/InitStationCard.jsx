import React, { useState } from 'react';
import { COLORS, FONTS } from '../../constants';
import Button from '../ui/Button';

export default function StationCard({ station, onEdit, onPay, onRemove }) {
  const [expanded, setExpanded] = useState(false);

  const statusColors = {
    'Processing': COLORS.star || '#F59E0B',
    'Approved - Waiting for Payment': COLORS.star || '#3B82F6',
    'To be Installed': COLORS.primary || '#10B981',
  };

  return (
    <div
      className="rounded-xl p-8 shadow-md"
      style={{
        backgroundColor: 'white',
        overflow: 'hidden',
      }}
    >
      <div className="flex justify-between items-center mb-2">
        <h3
          style={{
            fontFamily: FONTS.family.sans,
            fontWeight: FONTS.weights.normal,
            fontSize: FONTS.sizes.base,
            color: COLORS.mainTextColor
          }}
        >
          {station.name}
        </h3>

        <span
          className="px-4 py-1.5 rounded-sm text-xs font-semibold"
          style={{
            backgroundColor: statusColors[station.status] || '#E5E7EB',
            color: 'white',
            fontWeight: FONTS.weights.normal
          }}
        >
          {station.status}
        </span>
      </div>

      <p
        className="mb-2"
        style={{
          color: COLORS.secondaryText,
          fontSize: FONTS.sizes.xs,
        }}
      >
        {station.address}
      </p>

      <div className="flex flex-wrap gap-4 text-sm mt-4">
        <div>
          <strong
            style={{
              color: COLORS.secondaryText,
              fontWeight: FONTS.weights.normal,
            }}
          >
            Power Types:
          </strong>{' '}
          {station.powerTypes.join(', ')}
        </div>
        <div>
          <strong
            style={{
              color: COLORS.secondaryText,
              fontWeight: FONTS.weights.normal,
            }}
          >
            Chargers:
          </strong>{' '}
          {station.numChargers}
        </div>
      </div>

      <button
        className="mt-4 underline"
        style={{ color: COLORS.primary }}
        onClick={() => setExpanded(!expanded)}
        >
        { expanded ? 'Collapse' : 'View All' }
      </button>


      { expanded && (
        <div className="mt-4 text-sm space-y-2">
          {Object.entries(station.details || {}).map(([label, value]) => (
            <div key={label}>
              <strong style={{ color: COLORS.secondaryText }}>{label}:</strong>{' '}
              <span style={{ color: COLORS.mainTextColor }}>{value || '-'}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-6">
        {station.status === 'Processing' && (
          <Button variant="primary" onClick={() => onEdit?.(station)}>
            Edit
          </Button>
        )}

        {station.status === 'Approved - Waiting for Payment' && (
          <Button variant="primary" onClick={() => onPay?.(station)}>
            Pay Now
          </Button>
        )}

        <Button variant="outline" onClick={() => onRemove?.(station)}>
          Remove
        </Button>
      </div>
    </div>
  );
}
