import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiGithub, FiBook } from 'react-icons/fi'

const navLinks = [
  { path: '/', label: 'Home', id: 'home' },
  { path: '/about', label: 'About', id: 'about' },
  { path: '/projects', label: 'Projects', id: 'projects' },
  { path: '/publications', label: 'Publications', id: 'publications' },
  { path: '/software', label: 'Software', id: 'software' },
  { path: '/contact', label: 'Contact', id: 'contact' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-dark shadow-lg shadow-cyber-900/50' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-holo-green via-holo-cyan to-holo-purple flex items-center justify-center">
                <span className="font-display font-bold text-cyber-900 text-lg">TI</span>
              </div>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-holo-green to-holo-purple blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-semibold text-lg text-gradient">
                Talha Ilyas
              </span>
              <p className="text-xs text-gray-500 font-mono">Vision Intelligence</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={link.path}
                className={`nav-link font-medium text-sm transition-colors ${
                  location.pathname === link.path
                    ? 'text-holo-green'
                    : 'text-gray-400 hover:text-gray-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* External Links & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/Mr-TalhaIlyas"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center justify-center w-9 h-9 rounded-lg border border-cyber-600 text-gray-400 hover:text-holo-green hover:border-holo-green transition-all"
              aria-label="GitHub"
            >
              <FiGithub className="w-5 h-5" />
            </a>
            <a
              href="https://scholar.google.com/citations?user=HYNOyyAAAAAJ"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center justify-center w-9 h-9 rounded-lg border border-cyber-600 text-gray-400 hover:text-holo-cyan hover:border-holo-cyan transition-all"
              aria-label="Google Scholar"
            >
              <FiBook className="w-5 h-5" />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-cyber-600 text-gray-400 hover:text-holo-green hover:border-holo-green transition-all"
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-dark border-t border-cyber-700 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                      location.pathname === link.path
                        ? 'bg-holo-green/10 text-holo-green border-l-2 border-holo-green'
                        : 'text-gray-400 hover:bg-cyber-700/50 hover:text-gray-100'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <div className="flex items-center space-x-4 pt-4 px-4 border-t border-cyber-700">
                <a
                  href="https://github.com/Mr-TalhaIlyas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-400 hover:text-holo-green transition-colors"
                >
                  <FiGithub className="w-5 h-5" />
                  <span className="text-sm">GitHub</span>
                </a>
                <a
                  href="https://scholar.google.com/citations?user=HYNOyyAAAAAJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-400 hover:text-holo-cyan transition-colors"
                >
                  <FiBook className="w-5 h-5" />
                  <span className="text-sm">Scholar</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
