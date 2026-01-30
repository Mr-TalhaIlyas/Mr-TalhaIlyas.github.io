import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi'
import { SiGooglescholar } from 'react-icons/si'

const socialLinks = [
  {
    icon: FiGithub,
    href: 'https://github.com/Mr-TalhaIlyas',
    label: 'GitHub',
    color: 'hover:text-holo-green',
  },
  {
    icon: SiGooglescholar,
    href: 'https://scholar.google.com/citations?user=HYNOyyAAAAAJ',
    label: 'Google Scholar',
    color: 'hover:text-holo-cyan',
  },
  {
    icon: FiMail,
    href: 'mailto:talha.ilyas@monash.edu',
    label: 'Email',
    color: 'hover:text-holo-purple',
  },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative z-10 border-t border-cyber-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-holo-green via-holo-cyan to-holo-purple flex items-center justify-center">
                <span className="font-display font-bold text-cyber-900 text-lg">TI</span>
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg text-gradient">
                  Talha Ilyas
                </h3>
                <p className="text-xs text-gray-500 font-mono">Vision Intelligence Researcher</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Forged in the fields of precision agriculture, now refining vision intelligence 
              for critical healthcare applications.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-holo-green">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Projects', href: '#/projects' },
                { label: 'Publications', href: '#/publications' },
                { label: 'Software', href: '#/software' },
                { label: 'Contact', href: '#/contact' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-holo-cyan transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-holo-green">Connect</h4>
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center justify-center w-10 h-10 rounded-lg border border-cyber-600 text-gray-400 ${social.color} hover:border-current transition-all`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              <span className="font-mono text-holo-cyan">AIM for Health Lab</span>
              <br />
              Monash University, Australia
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-cyber-700/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © {currentYear} Talha Ilyas. Crafted with{' '}
              <FiHeart className="inline-block w-4 h-4 text-synth-red animate-pulse" /> 
              {' '}and{' '}
              <span className="text-holo-green">React</span> + 
              <span className="text-holo-cyan"> Three.js</span>
            </p>
            <div className="flex items-center space-x-4 text-xs text-gray-600 font-mono">
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-holo-green animate-pulse" />
                <span>SYSTEM.ONLINE</span>
              </span>
              <span>v1.0.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-holo-green/50 to-transparent" />
    </footer>
  )
}
