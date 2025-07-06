import React from 'react';
import { COLORS, FONTS } from '../../../constants';

const columns = [
  'Station Name', 'Owner Name', 'Joined On', 'District', 'City', 'Address Line', 
  'Revenue', 'Bookings', 'No of Chargers', 'Type1', 'Type2', 'CCS1', 'CCS2', 
  'CHAdeMO', 'Tesla', 'Status', 'Quick Actions'
];

const placeholderData = [
  {
    stationName: 'EV Central',
    ownerName: 'John Doe',
    joinedOn: '2023-01-15',
    district: 'Central',
    city: 'Metropolis',
    addressLine: '123 Main St',
    revenue: '$12,000',
    bookings: 'Enabled',
    noOfChargers: 8,
    type1: 2,
    type2: 3,
    ccs1: 1,
    ccs2: 1,
    chademo: 1,
    tesla: 0,
    status: 'Active',
    quickActions: ['View', 'Disable', 'Delete'],
  },
  {
    stationName: 'Westside EV',
    ownerName: 'Jane Smith',
    joinedOn: '2022-11-10',
    district: 'West',
    city: 'Gotham',
    addressLine: '456 Elm St',
    revenue: '$8,500',
    bookings: 'Disabled',
    noOfChargers: 5,
    type1: 1,
    type2: 2,
    ccs1: 0,
    ccs2: 1,
    chademo: 1,
    tesla: 0,
    status: 'Disabled',
    quickActions: ['View', 'Enable', 'Delete'],
  },
  {
    stationName: 'North Power Hub',
    ownerName: 'Michael Johnson',
    joinedOn: '2023-03-22',
    district: 'North',
    city: 'Star City',
    addressLine: '789 Oak Ave',
    revenue: '$15,200',
    bookings: 'Enabled',
    noOfChargers: 12,
    type1: 4,
    type2: 5,
    ccs1: 2,
    ccs2: 1,
    chademo: 0,
    tesla: 2,
    status: 'Active',
    quickActions: ['View', 'Disable', 'Delete'],
  },
  {
    stationName: 'Eastside Charging',
    ownerName: 'Sarah Williams',
    joinedOn: '2022-09-05',
    district: 'East',
    city: 'Central City',
    addressLine: '321 Pine Rd',
    revenue: '$9,800',
    bookings: 'Enabled',
    noOfChargers: 6,
    type1: 2,
    type2: 3,
    ccs1: 1,
    ccs2: 0,
    chademo: 0,
    tesla: 1,
    status: 'Under Maintenance',
    quickActions: ['View', 'Disable', 'Delete'],
  },
  {
    stationName: 'Downtown EV Spot',
    ownerName: 'Robert Brown',
    joinedOn: '2023-05-18',
    district: 'Central',
    city: 'Metropolis',
    addressLine: '555 Commerce St',
    revenue: '$18,500',
    bookings: 'Enabled',
    noOfChargers: 10,
    type1: 3,
    type2: 4,
    ccs1: 2,
    ccs2: 1,
    chademo: 1,
    tesla: 3,
    status: 'Active',
    quickActions: ['View', 'Disable', 'Delete'],
  },
  {
    stationName: 'Green Energy Station',
    ownerName: 'Emily Davis',
    joinedOn: '2023-02-14',
    district: 'South',
    city: 'Coastville',
    addressLine: '100 Ocean Blvd',
    revenue: '$7,200',
    bookings: 'Disabled',
    noOfChargers: 4,
    type1: 1,
    type2: 2,
    ccs1: 0,
    ccs2: 1,
    chademo: 0,
    tesla: 0,
    status: 'Closed',
    quickActions: ['View', 'Enable', 'Delete'],
  },
  {
    stationName: 'Tech Park Chargers',
    ownerName: 'David Wilson',
    joinedOn: '2023-04-30',
    district: 'West',
    city: 'Gotham',
    addressLine: '200 Innovation Dr',
    revenue: '$11,300',
    bookings: 'Enabled',
    noOfChargers: 7,
    type1: 2,
    type2: 3,
    ccs1: 1,
    ccs2: 1,
    chademo: 1,
    tesla: 1,
    status: 'Active',
    quickActions: ['View', 'Disable', 'Delete'],
  },
  {
    stationName: 'Highway Rest Stop',
    ownerName: 'Lisa Thompson',
    joinedOn: '2022-12-08',
    district: 'North',
    city: 'Star City',
    addressLine: 'Mile Marker 42',
    revenue: '$22,000',
    bookings: 'Enabled',
    noOfChargers: 15,
    type1: 5,
    type2: 6,
    ccs1: 3,
    ccs2: 2,
    chademo: 2,
    tesla: 4,
    status: 'Active',
    quickActions: ['View', 'Disable', 'Delete'],
  },
  {
    stationName: 'University EV Center',
    ownerName: 'University Admin',
    joinedOn: '2023-01-30',
    district: 'East',
    city: 'Central City',
    addressLine: '1 Campus Way',
    revenue: '$6,500',
    bookings: 'Enabled',
    noOfChargers: 5,
    type1: 2,
    type2: 2,
    ccs1: 1,
    ccs2: 0,
    chademo: 0,
    tesla: 0,
    status: 'Under Maintenance',
    quickActions: ['View', 'Disable', 'Delete'],
  },
  {
    stationName: 'Mall Parking EV',
    ownerName: 'Mall Corporation',
    joinedOn: '2022-10-12',
    district: 'Central',
    city: 'Metropolis',
    addressLine: '800 Shop Rd',
    revenue: '$14,700',
    bookings: 'Enabled',
    noOfChargers: 9,
    type1: 3,
    type2: 4,
    ccs1: 1,
    ccs2: 1,
    chademo: 1,
    tesla: 2,
    status: 'Active',
    quickActions: ['View', 'Disable', 'Delete'],
  },
  {
    stationName: 'Airport Fast Charge',
    ownerName: 'Airport Authority',
    joinedOn: '2023-06-01',
    district: 'South',
    city: 'Coastville',
    addressLine: 'Terminal B Parking',
    revenue: '$25,000',
    bookings: 'Enabled',
    noOfChargers: 20,
    type1: 6,
    type2: 8,
    ccs1: 4,
    ccs2: 3,
    chademo: 2,
    tesla: 5,
    status: 'Active',
    quickActions: ['View', 'Disable', 'Delete'],
  },
  {
    stationName: 'Riverside Charging',
    ownerName: 'Thomas Green',
    joinedOn: '2023-03-15',
    district: 'East',
    city: 'Central City',
    addressLine: '300 River View',
    revenue: '$5,800',
    bookings: 'Disabled',
    noOfChargers: 3,
    type1: 1,
    type2: 1,
    ccs1: 0,
    ccs2: 1,
    chademo: 0,
    tesla: 0,
    status: 'Deleted',
    quickActions: ['View', 'Enable', 'Delete'],
  }
];

export default function ChargingStationsTable({ stations, filter, sort, search }) {
  let data = stations && stations.length > 0 ? stations : placeholderData;

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

  return (
    <div className="overflow-hidden bg-white">
      <div className="relative overflow-x-auto">
      <div className="max-h-[500px] overflow-y-auto">
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
                <td className="px-4 py-3 whitespace-nowrap font-medium">
                  {row.stationName}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{row.ownerName}</td>
                <td className="px-4 py-3 whitespace-nowrap" style={{ color: COLORS.secondaryText }}>
                  {row.joinedOn}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{row.district}</td>
                <td className="px-4 py-3 whitespace-nowrap">{row.city}</td>
                <td className="px-4 py-3 whitespace-nowrap" style={{ color: COLORS.secondaryText }}>
                  {row.addressLine}
                </td>
                <td className="px-4 py-3 whitespace-nowrap font-medium" style={{ color: COLORS.primary }}>
                  {row.revenue}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span 
                    className="px-2.5 py-1 text-xs font-medium inline-flex items-center gap-1"
                    style={getBookingsStyle(row.bookings)}
                  >
                    <span 
                      className="w-1.5 h-1.5 rounded-full" 
                      style={{ 
                        background: row.bookings === 'Enabled' ? COLORS.primary : COLORS.danger
                      }}
                    ></span>
                    {row.bookings}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-center">{row.noOfChargers}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center">{row.type1}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center">{row.type2}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center">{row.ccs1}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center">{row.ccs2}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center">{row.chademo}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center">{row.tesla}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span 
                    className="px-2.5 py-1 text-xs font-medium inline-flex items-center gap-1"
                    style={getStatusStyle(row.status)}
                  >
                    <span 
                      className="w-1.5 h-1.5 rounded-full" 
                      style={{ background: getStatusDotColor(row.status) }}
                    ></span>
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {row.quickActions.map((action, i) => {
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}