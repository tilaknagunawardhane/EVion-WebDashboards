import React from 'react';
import { COLORS, FONTS } from '../../../constants';

const getStatusStyle = (status) => {
  switch(status) {
    case 'Active':
      return { background: COLORS.bgGreen, color: COLORS.primary };
    case 'Closed':
      return { background: '#fdc7c7', color: COLORS.danger };
    case 'Under Maintenance':
      return { background: '#fadba9', color: COLORS.mainTextColor };
    case 'Disabled':
      return { background: '#fdc7c7', color: COLORS.danger };
    case 'Deleted':
      return { background: '#fdc7c7', color: COLORS.danger };
    default:
      return { background: COLORS.bgGreen, color: COLORS.primary };
  }
};

const getBookingsStyle = (bookings) => {
  return bookings === 'Enabled' 
    ? { background: COLORS.bgGreen, color: COLORS.primary }
    : { background: '#fdc7c7', color: COLORS.danger };
};

const getActionStyle = (action) => {
  switch(action) {
    case 'Delete':
      return { color: COLORS.danger };
    case 'Disable':
    case 'Enable':
      return { color: COLORS.HighlightText };
    default:
      return { color: COLORS.primary };
  }
};

const getStatusDotColor = (status) => {
  switch(status) {
    case 'Active': return COLORS.primary;
    case 'Disabled': return COLORS.danger;
    case 'Under Maintenance': return COLORS.HighlightText;
    default: return COLORS.danger;
  }
};

const renderCellContent = (value, column) => {
  // Handle status cells
  if (column.toLowerCase().includes('status')) {
    return (
      <span 
        className="px-2.5 py-1 text-xs font-medium inline-flex items-center gap-1"
        style={getStatusStyle(value)}
      >
        <span 
          className="w-1.5 h-1.5 rounded-full" 
          style={{ background: getStatusDotColor(value) }}
        ></span>
        {value}
      </span>
    );
  }
  
  // Handle booking/enabled cells
  if (column.toLowerCase().includes('bookings') || column.toLowerCase().includes('enabled')) {
    return (
      <span 
        className="px-2.5 py-1 text-xs font-medium inline-flex items-center gap-1"
        style={getBookingsStyle(value)}
      >
        <span 
          className="w-1.5 h-1.5 rounded-full" 
          style={{ 
            background: value === 'Enabled' ? COLORS.primary : COLORS.danger
          }}
        ></span>
        {value}
      </span>
    );
  }
  
  // Handle quick actions
  if (column === 'Quick Actions') {
    return (
      <div className="flex items-center gap-2">
        {value.map((action, i) => {
          const { color } = getActionStyle(action);
          return (
            <button
              key={i}
              className="px-2.5 py-1 text-xs font-medium flex items-center gap-1"
              style={{
                fontFamily: FONTS.family.sans,
                fontWeight: FONTS.weights.medium,
                fontSize: FONTS.sizes.xs,
                color: color,
                backgroundColor: 'transparent',
                border: 'none',
              }}
            >
              {action === 'View' && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              )}
              {action === 'Disable' && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                </svg>
              )}
              {action === 'Enable' && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              )}
              {action === 'Delete' && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              )}
              {action}
            </button>
          );
        })}
      </div>
    );
  }
  
  // Default cell rendering
  return value;
};

export default function DataTable({ columns, data, filter, sort, search }) {
  return (
    <div className="overflow-hidden bg-white">
      <div className="relative overflow-x-auto">
        <div className="max-h-[500px] overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <table className="w-full text-sm" style={{ fontFamily: FONTS.family.sans }}>
            <thead>
              <tr style={{ 
                background: COLORS.bgGreen,
                position: 'sticky',
                top: 0,
                zIndex: 10
              }}>
                {columns.map((col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-left font-medium whitespace-nowrap"
                    style={{
                      color: COLORS.mainTextColor,
                      fontWeight: FONTS.weights.semibold,
                      fontSize: FONTS.sizes.sm,
                    }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr
                  key={idx}
                  style={{
                    fontSize: FONTS.sizes.sm,
                    color: COLORS.mainTextColor,
                    fontWeight: FONTS.weights.normal,
                  }}
                >
                  {columns.map((column) => (
                    <td 
                      key={column} 
                      className="px-4 py-3 whitespace-nowrap"
                      style={column === 'Revenue' || column === 'Total Spend' ? 
                        { color: COLORS.primary, fontWeight: FONTS.weights.medium } : 
                        column === 'Address Line' || column === 'Date of Registration' ?
                        { color: COLORS.secondaryText } :
                        {}
                      }
                    >
                      {renderCellContent(row[column], column)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}