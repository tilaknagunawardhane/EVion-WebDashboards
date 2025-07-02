import { COLORS } from '../../../constants/colors'
import { FONTS } from '../../../constants/fonts'


export default function StatCard({ title, value, icon, trend }) {
  return (
    <div 
      className="p-4 rounded-lg shadow-sm flex flex-col"
      style={{ 
        backgroundColor: 'white',
        border: `1px solid ${COLORS.border}`
      }}
    >
      <div className="flex justify-between items-start mb-2">
        <p 
          className="text-sm"
          style={{ color: COLORS.secondaryText }}
        >
          {title}
        </p>
        <div className="p-2 rounded-md" style={{ backgroundColor: COLORS.bgGreen }}>
          {icon}
        </div>
      </div>
      <p 
        className="text-2xl font-semibold mb-1"
        style={{ color: COLORS.mainTextColor }}
      >
        {value}
      </p>
      {trend && (
        <div className="flex items-center">
          <span 
            className="text-xs"
            style={{ 
              color: trend.value > 0 ? COLORS.primary : COLORS.danger 
            }}
          >
            {trend.value > 0 ? '↑' : '↓'} {Math.abs(trend.value)}% {trend.label}
          </span>
        </div>
      )}
    </div>
  )
}