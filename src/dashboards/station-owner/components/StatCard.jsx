import { COLORS } from '../../../constants/colors'
import { FONTS } from '../../../constants/fonts'

export default function StatCard({ title, value, activeSessions, icon }) {
  return (
    <div 
      className="p-4 rounded-lg flex flex-col"
      style={{ 
        backgroundColor: 'white',
        border: `1px solid ${COLORS.border}`,
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)'
      }}
    >
      {/* Title Row */}
      <div className="flex items-center mb-4">
        <div style={{ marginRight: 12 }}>
          {icon}
        </div>
        <h3 
          className="text-base font-medium"
          style={{ 
            color: COLORS.mainTextColor,
            fontFamily: FONTS.family.sans
          }}
        >
          {title}
        </h3>
      </div>

      {/* Main Value */}
      <p 
        className="text-2xl font-medium mb-2"
        style={{ 
          color: COLORS.mainTextColor,
          fontFamily: FONTS.family.sans
        }}
      >
        {value}
      </p>

      {/* Active Sessions */}
      {activeSessions && (
        <div className="flex items-center">
          <div 
            className="w-2 h-2 rounded-full mr-2"
            style={{ backgroundColor: COLORS.primary }}
          ></div>
          <span 
            className="text-sm"
            style={{ 
              color: COLORS.secondaryText,
              fontFamily: FONTS.family.sans
            }}
          >
            {activeSessions} Active Sessions
          </span>
        </div>
      )}
    </div>
  )
}