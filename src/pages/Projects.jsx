import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiDatabase, FiTarget, FiLayers, FiPlay, FiExternalLink, FiGithub } from 'react-icons/fi'
import { SectionHeader, AnimatedCounter, ProgressGauge } from '../components/UIComponents'

const projects = [
  {
    id: 'cwd30',
    title: 'CWD30',
    subtitle: 'Crop-Weed Benchmark Dataset',
    type: 'Benchmark Dataset',
    category: 'agriculture',
    description: 'Comprehensive multi-crop weed dataset for agricultural AI research. Features high-resolution images across diverse field conditions with pixel-level annotations.',
    metrics: [
      { label: 'Images', value: 219770, suffix: '+', color: 'green' },
      { label: 'Weed Species', value: 20, suffix: '', color: 'cyan' },
      { label: 'Crop Species', value: 10, suffix: '', color: 'purple' },
    ],
    keyMetric: { value: 88.54, label: 'mIOU', model: 'SegNeXt' },
    features: ['Pixel-Level Annotations', 'Multi-Crop Coverage', 'Real Field Conditions', 'Benchmark Leaderboard'],
    technologies: ['Semantic Segmentation', 'Domain Adaptation', 'Transfer Learning'],
    links: {
      github: 'https://github.com/Mr-TalhaIlyas/CWD30',
      paper: '#',
    },
    gradient: 'from-holo-green to-holo-cyan',
    icon: FiDatabase,
  },
  {
    id: 'diana',
    title: 'DIANA',
    subtitle: 'Paprika Disease Phenotyping System',
    type: 'Phenotyping System',
    category: 'agriculture',
    description: 'Advanced phenotyping system combining disease detection with severity analysis. Multi-task learning approach for comprehensive plant health assessment.',
    metrics: [
      { label: 'Detection mAP', value: 91.7, suffix: '%', color: 'green' },
      { label: 'Panoptic Quality', value: 70.78, suffix: '%', color: 'cyan' },
    ],
    keyMetric: { value: 91.7, label: 'mAP', model: 'Detection' },
    features: ['Multi-Task Learning', 'Severity Analysis', 'Real-Time Processing', 'Edge Deployment'],
    technologies: ['Object Detection', 'Instance Segmentation', 'Panoptic Segmentation'],
    links: {
      github: 'https://github.com/Mr-TalhaIlyas/DIANA',
      paper: '#',
    },
    gradient: 'from-holo-cyan to-holo-purple',
    icon: FiTarget,
  },
  {
    id: 'arufe',
    title: 'ARUFE',
    subtitle: 'Adaptive Recognition for Unseen Farm Environments',
    type: 'Domain Adaptation Framework',
    category: 'agriculture',
    description: 'Novel framework for adapting vision models to unseen agricultural environments. Addresses domain shift challenges in real-world deployment scenarios.',
    metrics: [
      { label: 'Domain Gap Reduction', value: 45, suffix: '%', color: 'green' },
      { label: 'Zero-Shot Performance', value: 78, suffix: '%', color: 'purple' },
    ],
    keyMetric: { value: 78, label: 'Accuracy', model: 'Zero-Shot' },
    features: ['Unseen Environment Adaptation', 'Self-Training Pipeline', 'Pseudo-Label Generation', 'Multi-Source Learning'],
    technologies: ['Domain Adaptation', 'Self-Supervised Learning', 'Unsupervised DA'],
    links: {
      github: 'https://github.com/Mr-TalhaIlyas/ARUFE',
      paper: '#',
    },
    gradient: 'from-holo-purple to-synth-orange',
    icon: FiLayers,
  },
  {
    id: 'seizurekit',
    title: 'SeizureKit',
    subtitle: 'Medical Seizure Analysis Toolkit',
    type: 'Medical AI Toolkit',
    category: 'medical',
    description: 'Comprehensive toolkit for EEG-based seizure detection and analysis. Includes preprocessing pipelines, feature extraction, and deep learning models.',
    metrics: [
      { label: 'Sensitivity', value: 94, suffix: '%', color: 'cyan' },
      { label: 'Specificity', value: 96, suffix: '%', color: 'green' },
    ],
    keyMetric: { value: 95, label: 'F1-Score', model: 'Detection' },
    features: ['EEG Processing', 'Seizure Detection', 'Clinical Integration', 'Real-Time Monitoring'],
    technologies: ['Signal Processing', 'Time-Series Analysis', 'Medical AI'],
    links: {
      github: 'https://github.com/Mr-TalhaIlyas/seizurekit',
      paper: '#',
    },
    gradient: 'from-synth-red to-holo-purple',
    icon: FiPlay,
  },
]

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'agriculture', label: 'Agriculture AI' },
  { id: 'medical', label: 'Medical AI' },
]

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Research Projects"
          subtitle="// Containment units initialized"
          align="center"
        />

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 rounded-lg border border-cyber-600 bg-cyber-800/30 backdrop-blur-sm">
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

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative p-6 rounded-2xl border border-cyber-600 bg-cyber-800/30 backdrop-blur-sm overflow-hidden hover:border-transparent transition-all duration-300">
                  {/* Gradient Border Effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} style={{ padding: '1px' }}>
                    <div className="w-full h-full rounded-2xl bg-cyber-800" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                          <project.icon className="w-6 h-6 text-cyber-900" />
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-xl text-gradient">
                            {project.title}
                          </h3>
                          <p className="text-sm text-gray-500 font-mono">{project.type}</p>
                        </div>
                      </div>

                      {/* Key Metric Gauge */}
                      <ProgressGauge
                        value={project.keyMetric.value}
                        label={project.keyMetric.label}
                        color="green"
                        size="sm"
                      />
                    </div>

                    {/* Subtitle */}
                    <h4 className="text-gray-300 font-medium mb-3">{project.subtitle}</h4>

                    {/* Description */}
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {project.metrics.map((metric) => (
                        <div key={metric.label} className="text-center p-2 rounded-lg bg-cyber-900/50">
                          <div className={`text-lg font-display font-bold text-${metric.color === 'green' ? 'holo-green' : metric.color === 'cyan' ? 'holo-cyan' : 'holo-purple'}`}>
                            <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                          </div>
                          <div className="text-xs font-mono text-gray-500">{metric.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs font-mono rounded border border-cyber-600 text-gray-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-4 pt-4 border-t border-cyber-700">
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-sm text-gray-400 hover:text-holo-green transition-colors"
                      >
                        <FiGithub className="w-4 h-4" />
                        <span>Repository</span>
                      </a>
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="flex items-center space-x-2 text-sm text-gray-400 hover:text-holo-cyan transition-colors"
                      >
                        <FiExternalLink className="w-4 h-4" />
                        <span>Details</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              {/* Backdrop */}
              <div className="absolute inset-0 bg-cyber-900/90 backdrop-blur-sm" />

              {/* Modal Content */}
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-cyber-600 bg-cyber-800 p-8"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-lg border border-cyber-600 flex items-center justify-center text-gray-400 hover:text-holo-green hover:border-holo-green transition-all"
                >
                  ×
                </button>

                {/* Project Header */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedProject.gradient} flex items-center justify-center`}>
                    <selectedProject.icon className="w-8 h-8 text-cyber-900" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-2xl text-gradient">
                      {selectedProject.title}
                    </h2>
                    <p className="text-gray-400 font-mono">{selectedProject.subtitle}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-6">{selectedProject.description}</p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-display font-semibold text-holo-green mb-3">Key Features</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProject.features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2 text-sm text-gray-400">
                        <span className="w-2 h-2 rounded-full bg-holo-cyan" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {selectedProject.metrics.map((metric) => (
                    <div key={metric.label} className="p-4 rounded-xl border border-cyber-600 bg-cyber-900/50 text-center">
                      <div className="text-2xl font-display font-bold text-holo-green">
                        <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                      </div>
                      <div className="text-xs font-mono text-gray-500">{metric.label}</div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex space-x-4">
                  <a
                    href={selectedProject.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-gradient-to-r from-holo-green to-holo-cyan text-cyber-900 font-semibold hover:shadow-holo-lg transition-all"
                  >
                    <FiGithub className="w-5 h-5" />
                    <span>View on GitHub</span>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
