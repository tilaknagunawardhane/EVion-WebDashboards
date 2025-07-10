import { Link } from 'react-router-dom'
import Layout from '../../components/Layout'
import { COLORS, FONTS } from '../../constants'
import Button from '../ui/Button';
import { FiEdit, FiMessageCircle } from 'react-icons/fi';

export default function LandingPage() {
  return (
    <Layout>
      <div className="text-center py-20">
        <h1 
          className="mb-2"
          style={{
            font: FONTS.weights.normal,
            fontSize: FONTS.sizes['4xl'],
            color: COLORS.mainTextColor
          }}
        >
          Hello Andrew!
        </h1>
        <p 
          className="max-w-md mx-auto md:max-w-3xl mb-10"
          style={{
            font: FONTS.weights.normal,
            fontSize: FONTS.sizes.base,
            color: COLORS.secondaryText
          }}
        >
          Now you can add your charging station.
        </p>
        <div className="flex justify-center space-x-4">
            <Button variant="primary" type="submit">
                Add Station
            </Button>
        </div>
        {/* Chat Icon */}
        <button className="fixed flex gap-1 bottom-6 right-6 bg-white shadow-lg p-4 rounded-full" style={{ backgroundColor: COLORS.primary}}>
            <FiMessageCircle size={24} color={COLORS.background} />
            <span style={{ color: COLORS.background }}>Chat</span>
        </button>
      </div>
    </Layout>
  )
}