import Navbar from './ui/Navbar'
import { COLORS } from '../constants/colors'

export default function Layout({ children, fullWidth = false }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.background }}>
      <Navbar />
      <main className={fullWidth ? "" : "py-10"}>
        {fullWidth ? (
          children
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        )}
      </main>
    </div>
  )
}