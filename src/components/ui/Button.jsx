import { COLORS, FONTS } from '../../constants'

export default function Button({
  children,
  type = 'button',
  onClick,
  className = '',
  variant = 'primary',
  size = 'base'
}) {
  const baseStyles = {
    borderRadius: '0.375rem',
    fontWeight: FONTS.weights.medium,
    transition: 'colors 0.15s ease-in-out',
    outline: 'none',
    border: 'none',
    cursor: 'pointer'
  }

  const variantStyles = {
    primary: {
      backgroundColor: COLORS.primary,
      color: 'white',
    },
    secondary: {
      backgroundColor: COLORS.bgGreen,
      color: COLORS.mainTextColor,
    },
    danger: {
      backgroundColor: COLORS.danger,
      color: 'white',
    }
  }

  const sizeStyles = {
    sm: {
      fontSize: FONTS.sizes.sm,
      padding: '0.25rem 0.75rem'
    },
    base: {
      fontSize: FONTS.sizes.base,
      padding: '0.5rem 1rem'
    },
    lg: {
      fontSize: FONTS.sizes.lg,
      padding: '0.75rem 1.5rem'
    }
  }

  const combinedStyles = {
    ...baseStyles,
    ...variantStyles[variant],
    ...sizeStyles[size]
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
      style={combinedStyles}
    >
      {children}
    </button>
  )
}