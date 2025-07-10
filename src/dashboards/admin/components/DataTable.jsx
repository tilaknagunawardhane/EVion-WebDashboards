import React, { useMemo } from 'react';
import { COLORS, FONTS } from '../../../constants';
import { useNavigate } from 'react-router-dom';

const getStatusStyle = (status) => {
  const statusMap = {
    'Active': { background: COLORS.bgGreen, color: COLORS.primary },
    'Completed': { background: COLORS.bgGreen, color: COLORS.primary },
    'Confirmed': { background: COLORS.bgGreen, color: COLORS.primary },
    'Attended': { background: COLORS.bgGreen, color: COLORS.primary },
    'Paid': { background: COLORS.bgGreen, color: COLORS.primary },
    'Resolved': { background: COLORS.bgGreen, color: COLORS.primary },
    'Closed': { background: '#fdc7c7', color: COLORS.danger },
    'Under Maintenance': { background: '#fadba9', color: COLORS.mainTextColor },
    'Disabled': { background: '#fdc7c7', color: COLORS.danger },
    'Deleted': { background: '#fdc7c7', color: COLORS.danger },
    'No-show': { background: '#fdc7c7', color: COLORS.danger },
    'Cancelled': { background: '#fdc7c7', color: COLORS.danger },
    'In Progress': { background: '#fadba9', color: COLORS.mainTextColor },
    'New': { background: '#d0e0ff', color: COLORS.primary },
    'Refunded': { background: '#d0f0fd', color: COLORS.primary },
    'Default': { background: COLORS.bgGreen, color: COLORS.primary }
  };
  
  return statusMap[status] || statusMap['Default'];
};

const getStatusDotColor = (status) => {
  const statusColorMap = {
    'Active': COLORS.primary,
    'Completed': COLORS.primary,
    'Confirmed': COLORS.primary,
    'Attended': COLORS.primary,
    'Paid': COLORS.primary,
    'Resolved': COLORS.primary,
    'Closed': COLORS.danger,
    'Disabled': COLORS.danger,
    'Deleted': COLORS.danger,
    'No-show': COLORS.danger,
    'Cancelled': COLORS.danger,
    'Under Maintenance': COLORS.HighlightText,
    'In Progress': COLORS.HighlightText,
    'New': COLORS.primary,
    'Refunded': COLORS.primary,
    'Default': COLORS.primary
  };
  
  return statusColorMap[status] || statusColorMap['Default'];
};

const renderCellContent = (value, column, rowData) => {
  // Handle empty values
  if (value === null || value === undefined || value === '') {
    return '-';
  }

  if (column === 'Quick Actions') {
    return renderQuickActions(value, rowData);
  }

  // Handle status cells
  if (column.toLowerCase().includes('status')) {
    return (
      <span 
        className="px-2.5 py-1 text-xs font-medium inline-flex items-center gap-1 rounded-md"
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
    const isEnabled = value === 'Enabled' || value === 'Yes';
    return (
      <span 
        className="px-2.5 py-1 text-xs font-medium inline-flex items-center gap-1 rounded-md"
        style={isEnabled ? 
          { background: COLORS.bgGreen, color: COLORS.primary } : 
          { background: '#fdc7c7', color: COLORS.danger }
        }
      >
        <span 
          className="w-1.5 h-1.5 rounded-full" 
          style={{ background: isEnabled ? COLORS.primary : COLORS.danger }}
        ></span>
        {value}
      </span>
    );
  }
  
  // Handle action links
  if (column === 'View Receipt' || column === 'Actions') {
    return (
      <a 
        href="#" 
        onClick={(e) => {
          e.stopPropagation();
          // Handle link click (e.g., open receipt)
        }}
        style={{ 
          color: COLORS.primary,
          textDecoration: 'underline',
          fontWeight: FONTS.weights.medium
        }}
      >
        {value}
      </a>
    );
  }

  // Handle numeric values with special formatting
  if (column.includes('Cost') || column.includes('Fee') || column.includes('Amount')) {
    return (
      <span style={{ fontWeight: FONTS.weights.medium }}>
        {value}
      </span>
    );
  }

  // Handle dates
  if (column.includes('Date') || column.includes('On')) {
    return (
      <span style={{ color: COLORS.secondaryText }}>
        {value}
      </span>
    );
  }

  // Handle IDs
  if (column.includes('ID')) {
    return (
      <code style={{ fontFamily: FONTS.family.mono, color: COLORS.primary }}>
        {value}
      </code>
    );
  }

  // Default cell rendering
  return value;
};

const renderQuickActions = (actions, rowData) => {
  const actionConfigs = {
    'View': {
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      ),
      color: COLORS.primary,
      onClick: () => console.log('View', rowData)
    },
    'Disable': {
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
        </svg>
      ),
      color: COLORS.HighlightText,
      onClick: () => console.log('Disable', rowData)
    },
    'Enable': {
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      ),
      color: COLORS.HighlightText,
      onClick: () => console.log('Enable', rowData)
    },
    'Delete': {
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
      ),
      color: COLORS.danger,
      onClick: () => console.log('Delete', rowData)
    }
  };

  return (
    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
      {actions.map((action, i) => {
        const config = actionConfigs[action];
        if (!config) return null;
        
        return (
          <button
            key={i}
            className="px-2.5 py-1 text-xs font-medium flex items-center gap-1"
            style={{
              fontFamily: FONTS.family.sans,
              fontWeight: FONTS.weights.medium,
              fontSize: FONTS.sizes.xs,
              color: config.color,
              backgroundColor: 'transparent',
              border: 'none',
            }}
            onClick={(e) => {
              e.stopPropagation();
              config.onClick();
            }}
          >
            {config.icon}
            {action}
          </button>
        );
      })}
    </div>
  );
};

export default function DataTable({ 
  columns, 
  data, 
  filter, 
  sort, 
  search, 
  onRowClick,
  rowClickDisabled = false,
  customActions = null
}) {
  const navigate = useNavigate();

  const handleRowClick = (rowData) => {
    if (!rowClickDisabled && onRowClick) {
      onRowClick(rowData);
    }
  };

  const processedData = useMemo(() => {
    let result = [...data];
    
    // Apply search
    if (search) {
      const searchTerm = search.toLowerCase();
      result = result.filter(row => 
        columns.some(column => {
          const value = String(row[column] || '').toLowerCase();
          return value.includes(searchTerm);
        })
      );
    }
    
    // Apply filter
    if (filter && filter.value) {
      result = result.filter(row => {
        if (filter.value === 'status') {
          return row['Account Status'] === filter.label;
        }
        // Add other filter conditions as needed
        return true;
      });
    }
    
    // Apply sorting
    if (sort) {
      result.sort((a, b) => {
        // Special sorting for status fields
        if (sort.includes('Status')) {
          const statusOrder = ['Active', 'Completed', 'Confirmed', 'New', 'In Progress', 'Disabled', 'Cancelled'];
          return statusOrder.indexOf(a[sort]) - statusOrder.indexOf(b[sort]);
        }
        
        // Numeric sorting
        if (typeof a[sort] === 'number' || sort.includes('Amount') || sort.includes('Cost') || sort.includes('Fee')) {
          return (parseFloat(a[sort]) || 0) - (parseFloat(b[sort]) || 0);
        }
        
        // Date sorting
        if (sort.includes('Date') || sort.includes('On')) {
          return new Date(a[sort]) - new Date(b[sort]);
        }
        
        // Default string sorting
        return String(a[sort]).localeCompare(String(b[sort]));
      });
    }
    
    return result;
  }, [data, filter, sort, search, columns]);

  

 return (
    <div className="overflow-hidden bg-white rounded-lg">
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
              {processedData.map((row, idx) => (
                <tr
                  key={idx}
                  style={{
                    fontSize: FONTS.sizes.sm,
                    color: COLORS.mainTextColor,
                    fontWeight: FONTS.weights.normal,
                    cursor: rowClickDisabled ? 'default' : 'pointer',
                  }}
                  onClick={() => handleRowClick(row)}
                  className={rowClickDisabled ? '' : "hover:bg-gray-50 transition-colors duration-150"}
                >
                  {columns.map((column) => (
                    <td 
                      key={column} 
                      className="px-4 py-3 whitespace-nowrap border-b"
                      style={{ 
                        borderColor: COLORS.stroke,
                        ...(column.includes('Cost') || column.includes('Fee') || column.includes('Amount') ? 
                          { color: COLORS.primary, fontWeight: FONTS.weights.medium } : 
                          column.includes('Date') || column.includes('On') ?
                          { color: COLORS.secondaryText } :
                          {}
                        )
                      }}
                    >
                      {customActions && column === 'Quick Actions' 
                        ? customActions(row) 
                        : renderCellContent(row[column], column, row)}
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