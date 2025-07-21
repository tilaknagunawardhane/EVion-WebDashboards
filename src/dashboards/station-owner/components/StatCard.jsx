import { COLORS } from '../../../constants/colors'
import { FONTS } from '../../../constants/fonts'

export default function StatCard({ title, value, icon }) {
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
      <div className="flex items-center mb-2">
        <div style={{ marginRight: 4 }}>
          {icon}
        </div>
        <h3 
          className="text-sm font-medium"
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
        className="text-xl font-medium"
        style={{ 
          color: COLORS.mainTextColor,
          fontFamily: FONTS.family.sans
        }}
      >
        {value}
      </p>
    </div>
  )
}