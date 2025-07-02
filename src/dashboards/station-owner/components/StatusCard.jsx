import { COLORS } from '../../../constants/colors';
import { FONTS } from '../../../constants/fonts';
import ConnectorStatusChart from '../components/ConnectorStatusChart';

export default function StatusCard({ title, style }) {
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
      
      <div style={{ height: '250px' }}>
        <ConnectorStatusChart />
      </div>
    </div>
  );
}