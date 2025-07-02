import { useForm } from 'react-hook-form'
import { useAuth } from '../../contexts/AuthContext'
import { COLORS } from '../../constants'

export default function SignupForm() {
  const { register, handleSubmit } = useForm()
  const { login } = useAuth()

  const onSubmit = (data) => {
    // In a real app, you would send this to your backend
    login({ 
      email: data.email, 
      role: 'station-owner', 
      name: data.name 
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium" style={{ color: COLORS.mainTextColor }}>
          Full Name
        </label>
        <input
          {...register('name', { required: true })}
          id="name"
          type="text"
          className="mt-1 block w-full rounded-md shadow-sm"
          style={{ borderColor: COLORS.stroke }}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium" style={{ color: COLORS.mainTextColor }}>
          Email address
        </label>
        <input
          {...register('email', { required: true })}
          id="email"
          type="email"
          className="mt-1 block w-full rounded-md shadow-sm"
          style={{ borderColor: COLORS.stroke }}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium" style={{ color: COLORS.mainTextColor }}>
          Password
        </label>
        <input
          {...register('password', { required: true })}
          id="password"
          type="password"
          className="mt-1 block w-full rounded-md shadow-sm"
          style={{ borderColor: COLORS.stroke }}
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium"
          style={{ backgroundColor: COLORS.primary, color: 'white' }}
        >
          Sign up
        </button>
      </div>
    </form>
  )
}