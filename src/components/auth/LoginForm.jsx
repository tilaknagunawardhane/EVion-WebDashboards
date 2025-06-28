import { useForm } from 'react-hook-form'
import { useAuth } from '../../contexts/AuthContext'
import { COLORS, FONTS } from '../../constants'
import Button from '../ui/Button'

export default function LoginForm() {
  const { register, handleSubmit } = useForm()
  const { login } = useAuth()

  const onSubmit = (data) => {
    login({ 
      email: data.email, 
      role: data.role, 
      name: data.role === 'admin' ? 'Admin User' : 'Station Owner' 
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label 
          htmlFor="email"
          className="block"
          style={{
            fontSize: FONTS.sizes.sm,
            color: COLORS.gray[700],
            fontWeight: FONTS.weights.medium
          }}
        >
          Email
        </label>
        <input
          {...register('email', { required: true })}
          type="email"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          style={{
            borderColor: COLORS.gray[300],
            padding: '0.5rem 0.75rem',
            fontSize: FONTS.sizes.sm
          }}
        />
      </div>

      <div>
        <label 
          htmlFor="password"
          className="block"
          style={{
            fontSize: FONTS.sizes.sm,
            color: COLORS.gray[700],
            fontWeight: FONTS.weights.medium
          }}
        >
          Password
        </label>
        <input
          {...register('password', { required: true })}
          type="password"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          style={{
            borderColor: COLORS.gray[300],
            padding: '0.5rem 0.75rem',
            fontSize: FONTS.sizes.sm
          }}
        />
      </div>

      <div>
        <label 
          htmlFor="role"
          className="block"
          style={{
            fontSize: FONTS.sizes.sm,
            color: COLORS.gray[700],
            fontWeight: FONTS.weights.medium
          }}
        >
          Role
        </label>
        <select
          {...register('role', { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          style={{
            borderColor: COLORS.gray[300],
            padding: '0.5rem 0.75rem',
            fontSize: FONTS.sizes.sm
          }}
        >
          <option value="station-owner">Station Owner</option>
          <option value="admin">Admin</option>
          <option value="support-officer">Support Officer</option>
        </select>
      </div>

      <Button type="submit" variant="primary" className="w-full">
        Sign In
      </Button>
    </form>
  )
}