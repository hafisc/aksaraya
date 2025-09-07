import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X, BookOpen } from 'lucide-react'

const navigationItems = [
  { name: 'Beranda', path: '/' },
  { name: 'Atlas', path: '/atlas' },
  { name: 'Latihan', path: '/practice' },
  { name: 'Kuis', path: '/quiz' },
  { name: 'Cerita', path: '/stories' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  return (
    <nav className="bg-[#592B18] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-white" />
              <span className="text-xl font-bold text-white font-cultural">
                Aksaraya
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'bg-white text-[#592B18]'
                    : 'text-white hover:text-white hover:bg-white/20'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-white focus:outline-none focus:text-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-[#592B18] border-t border-white/20"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'bg-white text-[#592B18]'
                    : 'text-white hover:text-white hover:bg-white/20'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  )
}
