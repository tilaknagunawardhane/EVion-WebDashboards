import { useSearchParams } from 'react-router-dom'
import LoginForm from '../../components/auth/LoginForm'
import SignupForm from '../../components/auth/SignupForm'
import AdminLoginForm from '../../components/auth/AdminLogins'
import SupportOfficerLoginForm from '../../components/auth/SupportOfficerLogins'
// import Layout from '../../components/Layout'

export default function AuthPage() {
  const [searchParams] = useSearchParams()
  const mode = searchParams.get('mode') || 'login'

  switch (mode) {
    case 'adminlogin':
      return <AdminLoginForm />
    case 'support-officerlogin':
      return <SupportOfficerLoginForm></SupportOfficerLoginForm>
    case 'login':
      return <LoginForm />
    default:
      return <SignupForm />
  }
}