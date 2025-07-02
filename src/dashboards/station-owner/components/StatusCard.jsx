import { COLORS } from '../../../constants/colors'
import { FONTS } from '../../../constants/fonts'

export default function StatusCard({ title, items }) {
  return (
    <div 
      className="p-4 rounded-lg shadow-sm"
      style={{ 
        backgroundColor: 'white',
        border: `1px solid ${COLORS.border}`
      }}
    >
      <h3 
        className="text-lg font-semibold mb-3"
        style={{ color: COLORS.mainTextColor }}
      >
        {title}
      </h3>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ 
                  backgroundColor: 
                    item.status === 'Active' ? COLORS.primary :
                    item.status === 'Faulted' ? COLORS.danger : 
                    COLORS.secondaryText
                }}
              />
              <span style={{ color: COLORS.mainTextColor }}>{item.label}</span>
            </div>
            <span style={{ color: COLORS.mainTextColor }}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}