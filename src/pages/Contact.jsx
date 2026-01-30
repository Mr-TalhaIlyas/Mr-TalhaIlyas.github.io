import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiGithub, FiLinkedin, FiMapPin, FiSend, FiExternalLink } from 'react-icons/fi'
import { SiGooglescholar, SiOrcid } from 'react-icons/si'
import { SectionHeader, TerminalWindow } from '../components/UIComponents'

const contactInfo = [
  {
    icon: FiMail,
    label: 'Email',
    value: 'talha.ilyas@monash.edu',
    href: 'mailto:talha.ilyas@monash.edu',
    color: 'holo-green',
  },
  {
    icon: FiMapPin,
    label: 'Location',
    value: 'Monash University, Australia',
    href: '#',
    color: 'holo-cyan',
  },
]

const socialLinks = [
  {
    icon: FiGithub,
    label: 'GitHub',
    value: 'Mr-TalhaIlyas',
    href: 'https://github.com/Mr-TalhaIlyas',
    color: 'holo-green',
  },
  {
    icon: SiGooglescholar,
    label: 'Google Scholar',
    value: 'Talha Ilyas',
    href: 'https://scholar.google.com/citations?user=HYNOyyAAAAAJ',
    color: 'holo-cyan',
  },
  {
    icon: FiLinkedin,
    label: 'LinkedIn',
    value: 'Talha Ilyas',
    href: 'https://linkedin.com/in/talha-ilyas',
    color: 'holo-blue',
  },
  {
    icon: SiOrcid,
    label: 'ORCID',
    value: 'ORCID Profile',
    href: 'https://orcid.org/',
    color: 'holo-purple',
  },
]

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setSubmitted(true)
    setFormState({ name: '', email: '', subject: '', message: '' })

    setTimeout(() => setSubmitted(false), 5000)
  }

  const handleChange = (e) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Get In Touch"
          subtitle="// Establishing connection..."
          align="center"
        />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Terminal Style Contact Card */}
            <TerminalWindow title="contact_info.sh">
              <div className="space-y-4">
                <div>
                  <span className="text-holo-green">$</span>{' '}
                  <span className="text-holo-cyan">echo</span>{' '}
                  <span className="text-synth-yellow">"Let's collaborate!"</span>
                </div>

                <div className="border-l-2 border-holo-green/30 pl-4 space-y-3">
                  <p className="text-gray-300">
                    I'm always interested in discussing new research opportunities, 
                    collaborations, and innovative projects in Computer Vision and Medical AI.
                  </p>
                  
                  <p className="text-gray-400 text-sm">
                    Whether you're a fellow researcher, industry professional, or student 
                    looking to explore AI applications in healthcare or agriculture — 
                    feel free to reach out.
                  </p>
                </div>

                <div className="pt-2">
                  <span className="text-holo-green">$</span>{' '}
                  <span className="text-gray-500">_</span>
                  <span className="terminal-cursor" />
                </div>
              </div>
            </TerminalWindow>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className={`flex items-center space-x-4 p-4 rounded-xl border border-${item.color}/30 bg-cyber-800/30 backdrop-blur-sm hover:border-${item.color}/60 transition-all`}
                >
                  <div className={`w-12 h-12 rounded-lg bg-${item.color}/10 flex items-center justify-center`}>
                    <item.icon className={`w-6 h-6 text-${item.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-mono">{item.label}</p>
                    <p className="text-gray-200">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-display font-semibold text-lg text-holo-green mb-4">
                Connect Online
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className={`flex items-center space-x-3 p-4 rounded-xl border border-cyber-600 bg-cyber-800/30 hover:border-${social.color}/50 transition-all group`}
                  >
                    <social.icon className={`w-5 h-5 text-gray-400 group-hover:text-${social.color} transition-colors`} />
                    <span className="text-sm text-gray-300 group-hover:text-gray-100 transition-colors">
                      {social.label}
                    </span>
                    <FiExternalLink className="w-4 h-4 text-gray-600 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="p-8 rounded-2xl border border-cyber-600 bg-cyber-800/30 backdrop-blur-sm">
              <h3 className="font-display font-semibold text-xl text-gradient mb-6">
                Send a Message
              </h3>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-holo-green/20 flex items-center justify-center mb-4">
                    <FiSend className="w-8 h-8 text-holo-green" />
                  </div>
                  <h4 className="font-display font-semibold text-xl text-holo-green mb-2">
                    Message Sent!
                  </h4>
                  <p className="text-gray-400 text-center">
                    Thank you for reaching out. I'll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Input */}
                  <div>
                    <label className="block text-sm font-mono text-gray-400 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-cyber-600 bg-cyber-900/50 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-holo-green transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-sm font-mono text-gray-400 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-cyber-600 bg-cyber-900/50 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-holo-green transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Subject Input */}
                  <div>
                    <label className="block text-sm font-mono text-gray-400 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-cyber-600 bg-cyber-900/50 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-holo-green transition-colors"
                      placeholder="What's this about?"
                    />
                  </div>

                  {/* Message Input */}
                  <div>
                    <label className="block text-sm font-mono text-gray-400 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-cyber-600 bg-cyber-900/50 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-holo-green transition-colors resize-none"
                      placeholder="Your message..."
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center justify-center space-x-2 px-6 py-4 rounded-lg font-semibold transition-all ${
                      isSubmitting
                        ? 'bg-cyber-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-holo-green to-holo-cyan text-cyber-900 hover:shadow-holo-lg'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <FiSend className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>

                  <p className="text-xs text-gray-500 text-center">
                    This form currently simulates submission. For actual inquiries, 
                    please use the email address provided.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
