import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiGithub, FiLinkedin, FiMapPin, FiExternalLink } from 'react-icons/fi'
import { SiGooglescholar, SiOrcid, SiPypi, SiDocker } from 'react-icons/si'
import { FiYoutube } from 'react-icons/fi'
import { SectionHeader, TerminalWindow } from '../components/UIComponents'

const contactInfo = [
  {
    icon: FiMail,
    label: 'Email',
    value: '<first_name>.<last_name>@monash.edu',
    href: 'mailto:<first_name>.<last_name>@monash.edu',
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
    href: 'https://www.linkedin.com/in/talha-ilyas-bb1a17159/',
    color: 'holo-blue',
  },
  {
    icon: SiOrcid,
    label: 'ORCID',
    value: 'ORCID Profile',
    href: 'https://orcid.org/0000-0002-4168-2998',
    color: 'holo-purple',
  },
  {
    icon: SiPypi,
    label: 'PyPI',
    value: 'talhailyas',
    href: 'https://pypi.org/user/talhailyas/',
    color: 'holo-green',
  },
  {
    icon: SiDocker,
    label: 'Docker Hub',
    value: 'talhailyas',
    href: 'https://hub.docker.com/repositories/talhailyas',
    color: 'holo-cyan',
  },
  {
    icon: FiYoutube,
    label: 'YouTube',
    value: '@yondarz',
    href: 'https://www.youtube.com/@yondarz',
    color: 'synth-red',
  },
]

export default function Contact() {
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

          {/* Right: Affiliations & Resources */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Affiliations */}
            <div className="p-8 rounded-2xl border border-cyber-600 bg-cyber-800/30 backdrop-blur-sm">
              <h3 className="font-display font-semibold text-xl text-gradient mb-6">
                Affiliations
              </h3>
              <div className="space-y-4">
                <a
                  href="https://www.monash.edu/it/aimh-lab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-xl border border-holo-cyan/30 bg-cyber-900/50 hover:border-holo-cyan/60 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-200 font-medium group-hover:text-holo-cyan transition-colors">AIM for Health Lab</p>
                      <p className="text-gray-500 text-sm">Monash University, Australia</p>
                    </div>
                    <FiExternalLink className="w-4 h-4 text-gray-600 group-hover:text-holo-cyan transition-colors" />
                  </div>
                </a>
                <a
                  href="https://www.alfredhealth.org.au/services/st-kilda-road-clinic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-xl border border-holo-green/30 bg-cyber-900/50 hover:border-holo-green/60 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-200 font-medium group-hover:text-holo-green transition-colors">Alfred Health</p>
                      <p className="text-gray-500 text-sm">Honorary Researcher • Melbourne, Australia</p>
                    </div>
                    <FiExternalLink className="w-4 h-4 text-gray-600 group-hover:text-holo-green transition-colors" />
                  </div>
                </a>
                <a
                  href="https://robot.jbnu.ac.kr/robot/21492/subview.do"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-xl border border-holo-purple/30 bg-cyber-900/50 hover:border-holo-purple/60 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-200 font-medium group-hover:text-holo-purple transition-colors">Core Research Institute of Intelligent Robots</p>
                      <p className="text-gray-500 text-sm">Honorary Researcher • JBNU, Korea</p>
                    </div>
                    <FiExternalLink className="w-4 h-4 text-gray-600 group-hover:text-holo-purple transition-colors" />
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
