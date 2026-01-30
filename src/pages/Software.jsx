import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiPackage, FiDownload, FiStar, FiGithub, FiCopy, FiCheck, FiExternalLink, FiCode } from 'react-icons/fi'
import { SectionHeader, TerminalWindow, CopyButton } from '../components/UIComponents'

const softwareTools = [
  {
    id: 'empatches',
    name: 'EMPatches',
    description: 'Efficient utility for extracting and merging image patches with overlap support. Essential for processing large images in deep learning pipelines.',
    installCommand: 'pip install empatches',
    features: [
      'Overlap support',
      'Batch processing',
      'Multiple formats',
      'GPU acceleration',
    ],
    stats: {
      downloads: '50K+',
      stars: 150,
      version: '0.2.4',
    },
    links: {
      github: 'https://github.com/Mr-TalhaIlyas/EMPatches',
      pypi: 'https://pypi.org/project/empatches/',
      docs: '#',
    },
    gradient: 'from-holo-green to-holo-cyan',
    category: 'image-processing',
  },
  {
    id: 'seizurekit',
    name: 'SeizureKit',
    description: 'Comprehensive medical analysis toolkit for EEG signal processing and seizure detection. Built for clinical research and real-time monitoring applications.',
    installCommand: 'pip install seizurekit',
    features: [
      'EEG preprocessing',
      'Seizure detection',
      'Feature extraction',
      'Clinical reports',
    ],
    stats: {
      downloads: '10K+',
      stars: 85,
      version: '1.0.2',
    },
    links: {
      github: 'https://github.com/Mr-TalhaIlyas/seizurekit',
      pypi: 'https://pypi.org/project/seizurekit/',
      docs: '#',
    },
    gradient: 'from-synth-red to-holo-purple',
    category: 'medical',
  },
  {
    id: 'tfcuda',
    name: 'TF-CUDA Setup',
    description: 'Automated setup scripts for TensorFlow with CUDA support. Eliminates the pain of configuring GPU environments for deep learning.',
    installCommand: 'git clone https://github.com/Mr-TalhaIlyas/TensorFlow-CUDA-Setup',
    features: [
      'Auto CUDA detection',
      'Version compatibility',
      'Multi-GPU support',
      'Docker configs',
    ],
    stats: {
      downloads: '5K+',
      stars: 120,
      version: '2.0.0',
    },
    links: {
      github: 'https://github.com/Mr-TalhaIlyas/TensorFlow-CUDA-Setup',
    },
    gradient: 'from-synth-orange to-synth-yellow',
    category: 'devops',
  },
  {
    id: 'segutils',
    name: 'Segmentation Utils',
    description: 'Collection of utilities for semantic segmentation tasks including data augmentation, metrics calculation, and visualization tools.',
    installCommand: 'pip install gray2color',
    features: [
      'Mask visualization',
      'Metrics calculation',
      'Data augmentation',
      'Format conversion',
    ],
    stats: {
      downloads: '30K+',
      stars: 95,
      version: '0.1.5',
    },
    links: {
      github: 'https://github.com/Mr-TalhaIlyas/gray2color',
      pypi: 'https://pypi.org/project/gray2color/',
    },
    gradient: 'from-holo-cyan to-holo-purple',
    category: 'image-processing',
  },
]

const categories = [
  { id: 'all', label: 'All Tools' },
  { id: 'image-processing', label: 'Image Processing' },
  { id: 'medical', label: 'Medical AI' },
  { id: 'devops', label: 'DevOps' },
]

function CopyInstallButton({ command }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <motion.button
      onClick={handleCopy}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg font-mono text-sm transition-all ${
        copied
          ? 'bg-holo-green/20 border-holo-green text-holo-green border'
          : 'bg-cyber-900 border border-cyber-600 text-gray-300 hover:border-holo-green hover:text-holo-green'
      }`}
    >
      <span className="text-holo-green">$</span>
      <span className="flex-1 text-left truncate">{command}</span>
      {copied ? (
        <FiCheck className="w-4 h-4 flex-shrink-0" />
      ) : (
        <FiCopy className="w-4 h-4 flex-shrink-0" />
      )}
    </motion.button>
  )
}

export default function Software() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredTools = activeCategory === 'all'
    ? softwareTools
    : softwareTools.filter((tool) => tool.category === activeCategory)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Software Armory"
          subtitle="// Open-source tools for the research community"
          align="center"
        />

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex flex-wrap justify-center gap-2 p-1 rounded-lg border border-cyber-600 bg-cyber-800/30 backdrop-blur-sm">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-md text-sm font-mono transition-all ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-holo-green to-holo-cyan text-cyber-900'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative h-full p-6 rounded-2xl border border-cyber-600 bg-cyber-800/30 backdrop-blur-sm overflow-hidden hover:border-transparent transition-all duration-300">
                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${tool.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} style={{ padding: '1px' }}>
                  <div className="w-full h-full rounded-2xl bg-cyber-800" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center`}>
                        <FiPackage className="w-6 h-6 text-cyber-900" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-xl text-gradient">
                          {tool.name}
                        </h3>
                        <p className="text-xs text-gray-500 font-mono">v{tool.stats.version}</p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="flex items-center space-x-1 text-synth-yellow">
                        <FiStar className="w-4 h-4" />
                        <span>{tool.stats.stars}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-holo-cyan">
                        <FiDownload className="w-4 h-4" />
                        <span>{tool.stats.downloads}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 flex-grow">
                    {tool.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tool.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-2 py-1 text-xs font-mono rounded border border-cyber-600 text-gray-400"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Install Command */}
                  <div className="mb-4">
                    <CopyInstallButton command={tool.installCommand} />
                  </div>

                  {/* Links */}
                  <div className="flex items-center space-x-4 pt-4 border-t border-cyber-700">
                    <a
                      href={tool.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-sm text-gray-400 hover:text-holo-green transition-colors"
                    >
                      <FiGithub className="w-4 h-4" />
                      <span>Repository</span>
                    </a>
                    {tool.links.pypi && (
                      <a
                        href={tool.links.pypi}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-sm text-gray-400 hover:text-holo-cyan transition-colors"
                      >
                        <FiExternalLink className="w-4 h-4" />
                        <span>PyPI</span>
                      </a>
                    )}
                    {tool.links.docs && (
                      <a
                        href={tool.links.docs}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-sm text-gray-400 hover:text-holo-purple transition-colors"
                      >
                        <FiCode className="w-4 h-4" />
                        <span>Docs</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Install Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <h3 className="font-display font-bold text-2xl text-center text-gradient mb-8">
            Quick Install
          </h3>

          <TerminalWindow title="install.sh" className="max-w-2xl mx-auto">
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <span className="text-gray-500">#</span>
                <span className="text-gray-500">Install all essential tools</span>
              </div>
              
              {softwareTools
                .filter((tool) => tool.installCommand.startsWith('pip'))
                .map((tool) => (
                  <div key={tool.id} className="flex items-center justify-between">
                    <div>
                      <span className="text-holo-green">$</span>{' '}
                      <span className="text-gray-300">{tool.installCommand}</span>
                    </div>
                    <CopyButton text={tool.installCommand} />
                  </div>
                ))}

              <div className="pt-4 border-t border-cyber-600">
                <span className="text-holo-green">$</span>{' '}
                <span className="text-gray-500">_</span>
                <span className="terminal-cursor" />
              </div>
            </div>
          </TerminalWindow>
        </motion.section>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-4">
            Explore more tools and contribute to open-source research
          </p>
          <a
            href="https://github.com/Mr-TalhaIlyas"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-gradient-to-r from-holo-green to-holo-cyan text-cyber-900 font-semibold hover:shadow-holo-lg transition-all"
          >
            <FiGithub className="w-5 h-5" />
            <span>Visit GitHub Profile</span>
          </a>
        </motion.div>
      </div>
    </motion.div>
  )
}
