import { useSearchParams } from 'react-router-dom'
import LoginForm from '../../components/auth/LoginForm'
import SignupForm from '../../components/auth/SignupForm'
import Layout from '../../components/Layout'

export default function AuthPage() {
  const [searchParams] = useSearchParams()
  const mode = searchParams.get('mode') || 'login'

  return (
    <Layout>
      <div className="max-w-md mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {mode === 'login' ? (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign in to your account</h2>
              <LoginForm />
              <div className="mt-4 text-sm text-gray-600">
                Don't have an account?{' '}
                <a href="/auth?mode=signup" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign up
                </a>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Create a new account</h2>
              <SignupForm />
              <div className="mt-4 text-sm text-gray-600">
                Already have an account?{' '}
                <a href="/auth?mode=login" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign in
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}