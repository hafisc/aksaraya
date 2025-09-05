import { } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Disclosure } from '@headlessui/react'
import { Menu, X } from 'lucide-react'
import { cn } from '../lib/utils'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Learn', href: '/learn' },
  { name: 'Practice', href: '/practice' },
  { name: 'Quiz', href: '/quiz' },
  { name: 'Atlas', href: '/atlas' },
  { name: 'Stories', href: '/stories' },
  { name: 'About', href: '/about' },
]

export function NavBar() {
  const location = useLocation()

  return (
    <Disclosure as="nav" className="bg-gabus-pualam/95 backdrop-blur-sm border-b border-giring-emas/20 sticky top-0 z-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex items-center space-x-3">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl text-giring-emas"
                  >
                    ꦲ
                  </motion.div>
                  <span className="text-xl font-bold text-indigo-lurik font-cultural">
                    Aksaraya
                  </span>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200',
                      location.pathname === item.href
                        ? 'text-giring-emas bg-indigo-lurik/10'
                        : 'text-indigo-lurik hover:text-giring-emas hover:bg-indigo-lurik/5'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-indigo-lurik hover:text-giring-emas hover:bg-indigo-lurik/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-giring-emas">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <X className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Menu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gabus-pualam border-t border-giring-emas/20">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={cn(
                    'block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200',
                    location.pathname === item.href
                      ? 'text-giring-emas bg-indigo-lurik/10'
                      : 'text-indigo-lurik hover:text-giring-emas hover:bg-indigo-lurik/5'
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
