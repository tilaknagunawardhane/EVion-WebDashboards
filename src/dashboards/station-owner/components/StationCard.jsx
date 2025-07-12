import { COLORS, FONTS } from '../../../constants'
import StationImage from '../../../assets/station_img.png'
import { useNavigate } from 'react-router-dom';

export default function StationCard({ station }) {
  // Status configuration
  const statusConfig = {
    active: {
      text: 'Active',
      bgColor: COLORS.bgGreen,
      textColor: COLORS.primary
    },
    maintenance: {
      text: 'Maintenance',
      bgColor: '#FEF3C7',
      textColor: COLORS.HighlightText
    },
    offline: {
      text: 'Offline',
      bgColor: '#FEE2E2',
      textColor: COLORS.danger
    }
  }

  const navigate = useNavigate();
  const status = statusConfig[station.status] || statusConfig.active

  const openProfile = () => {
    navigate(`/station-owner/stationprofile/${station.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border" style={{ borderColor: COLORS.border }}>
      {/* Image Section */}
      <div className="h-40 bg-gray-100 flex items-center justify-center" style={{ backgroundColor: COLORS.background }}>
        {/* <svg
          className="w-12 h-12"
          fill="none"
          stroke={COLORS.secondaryText}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
          />
        </svg> */}
         <img
              src={StationImage}
              alt="Station Image"
              className="w-full h-full object-cover"
              style={{ objectFit: 'cover', borderRadius: '0.5rem' }}
             
              />
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 
            className="text-lg font-semibold truncate" 
            style={{ color: COLORS.mainTextColor, fontFamily: FONTS.family.sans }}
          >
            {station.name}
          </h3>
          <span 
            className="px-2 py-1 rounded-full text-xs font-medium"
            style={{ 
              backgroundColor: status.bgColor,
              color: status.textColor
            }}
          >
            {status.text}
          </span>
        </div>

        {/* Station Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke={COLORS.secondaryText}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p className="text-sm" style={{ color: COLORS.secondaryText, fontFamily: FONTS.family.sans }}>
              {station.location}
            </p>
          </div>

          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke={COLORS.secondaryText}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <p className="text-sm" style={{ color: COLORS.secondaryText, fontFamily: FONTS.family.sans }}>
              {station.power}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <button
            className="px-3 py-1 rounded-md text-sm font-medium"
            onClick={openProfile}
            style={{
              backgroundColor: COLORS.background,
              color: COLORS.primary,
              fontFamily: FONTS.family.sans
            }}
          >
            Details
          </button>
          <button
            className="px-3 py-1 rounded-md text-sm font-medium"
            style={{
              backgroundColor: COLORS.background,
              color: COLORS.secondaryText,
              fontFamily: FONTS.family.sans
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  )
}