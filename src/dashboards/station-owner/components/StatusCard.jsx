import { COLORS } from '../../../constants/colors'
import { FONTS } from '../../../constants/fonts'

export default function StatusCard({ title, items, style }) {
  return (
    <div style={{ 
      backgroundColor: 'white',
      border: `1px solid ${COLORS.border}`,
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
      ...style
    }}>
      <h3 
        style={{ 
          color: COLORS.mainTextColor,
          fontSize: FONTS.sizes.lg,
          fontWeight: FONTS.weights.semibold,
          marginBottom: '20px'
        }}
      >
        {title}
      </h3>
      
      <div style={{ display: 'grid', gap: '16px' }}>
        {items.map((item, index) => (
          <div 
            key={index} 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ 
                color: item.color,
                fontSize: '20px',
                lineHeight: '20px'
              }}>
                {item.indicator}
              </span>
              <span style={{ 
                color: COLORS.mainTextColor,
                fontSize: FONTS.sizes.base
              }}>
                {item.label}
              </span>
            </div>
            <span style={{ 
              color: COLORS.mainTextColor,
              fontSize: FONTS.sizes.base,
              fontWeight: FONTS.weights.medium
            }}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}