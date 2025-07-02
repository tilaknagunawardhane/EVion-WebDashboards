import { Link } from 'react-router-dom'
import Layout from '../../components/Layout'
import { COLORS, FONTS } from '../../constants'

export default function LandingPage() {
  return (
    <Layout>
      <div className="text-center py-20">
        <h1 
          className="font-bold mb-6"
          style={{
            fontSize: FONTS.sizes['5xl'],
            color: COLORS.mainTextColor
          }}
        >
          Welcome to EVION
        </h1>
        <p 
          className="max-w-md mx-auto md:max-w-3xl mb-10"
          style={{
            fontSize: FONTS.sizes.xl,
            color: COLORS.secondaryText
          }}
        >
          Manage your charging stations with ease
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/auth?mode=login"
            className="inline-flex items-center rounded-md shadow-sm"
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: COLORS.primary,
              color: 'white',
              fontSize: FONTS.sizes.base,
              fontWeight: FONTS.weights.medium
            }}
          >
            Sign in
          </Link>
          <Link
            to="/auth?mode=signup"
            className="inline-flex items-center rounded-md shadow-sm"
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: COLORS.bgGreen,
              color: COLORS.primary,
              fontSize: FONTS.sizes.base,
              fontWeight: FONTS.weights.medium
            }}
          >
            Sign up
          </Link>
        </div>
      </div>
    </Layout>
  )
}