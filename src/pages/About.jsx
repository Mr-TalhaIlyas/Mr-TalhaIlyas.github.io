import { motion } from 'framer-motion'
import { FiMapPin, FiCalendar, FiAward, FiBookOpen, FiCode, FiCpu } from 'react-icons/fi'
import { SectionHeader, TerminalWindow, TypewriterText } from '../components/UIComponents'

const timeline = [
  {
    period: '2023 - Present',
    role: 'Researcher',
    institution: 'AIM for Health Lab',
    location: 'Monash University, Australia',
    description: 'Developing advanced AI systems for medical imaging, focusing on seizure detection, medical phenotyping, and clinical decision support systems.',
    focus: ['Medical AI', 'Vision Intelligence', 'Clinical Applications'],
    color: 'holo-cyan',
  },
  {
    period: '2019 - 2023',
    role: 'Researcher',
    institution: 'Robot Vision Lab',
    location: 'JBNU University, South Korea',
    description: 'Pioneered computer vision systems for precision agriculture, including crop-weed classification, disease detection, and autonomous field analysis.',
    focus: ['Precision Agriculture', 'Deep Learning', 'Edge AI'],
    color: 'holo-green',
  },
]

const skills = [
  {
    category: 'Computer Vision',
    items: ['Semantic Segmentation', 'Object Detection', 'Instance Segmentation', 'Image Classification', 'Medical Imaging'],
    icon: FiCpu,
    color: 'holo-green',
  },
  {
    category: 'Deep Learning',
    items: ['CNNs', 'Transformers', 'U-Net Variants', 'Domain Adaptation', 'Self-Supervised Learning'],
    icon: FiCode,
    color: 'holo-cyan',
  },
  {
    category: 'Tools & Frameworks',
    items: ['PyTorch', 'TensorFlow', 'OpenCV', 'ONNX', 'TensorRT'],
    icon: FiBookOpen,
    color: 'holo-purple',
  },
]

const achievements = [
  { metric: '30+', label: 'Publications' },
  { metric: '1500+', label: 'Citations' },
  { metric: '15+', label: 'Open Source Projects' },
  { metric: '88.54%', label: 'Best mIOU (CWD30)' },
]

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="About Me"
          subtitle="// System.biography.load()"
          align="center"
        />

        {/* Split Layout: Visual + Terminal */}
        <div className="grid lg:grid-cols-2 gap-8 mb-24">
          {/* Visual Side - Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="sticky top-24">
              {/* Profile Card */}
              <div className="relative p-8 rounded-2xl border border-cyber-600 bg-cyber-800/30 backdrop-blur-sm overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-holo-green/20 to-transparent rounded-bl-full" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-holo-purple/20 to-transparent rounded-tr-full" />

                <div className="relative z-10">
                  {/* Avatar Placeholder */}
                  <div className="w-32 h-32 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-holo-green via-holo-cyan to-holo-purple flex items-center justify-center">
                    <span className="font-display font-bold text-4xl text-cyber-900">TI</span>
                  </div>

                  <h3 className="font-display font-bold text-2xl text-center text-gradient mb-2">
                    Talha Ilyas
                  </h3>
                  <p className="text-center text-gray-400 font-mono text-sm mb-6">
                    Vision Intelligence Researcher
                  </p>

                  {/* Current Position */}
                  <div className="p-4 rounded-lg border border-holo-cyan/30 bg-cyber-900/50 mb-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <FiMapPin className="w-4 h-4 text-holo-cyan" />
                      <span className="text-sm font-mono text-holo-cyan">Current Position</span>
                    </div>
                    <p className="text-gray-300 font-medium">AIM for Health Lab</p>
                    <p className="text-gray-500 text-sm">Monash University, Australia</p>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    {achievements.map((item) => (
                      <div key={item.label} className="text-center p-3 rounded-lg bg-cyber-900/50">
                        <div className="text-xl font-display font-bold text-holo-green">
                          {item.metric}
                        </div>
                        <div className="text-xs font-mono text-gray-500">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Terminal Side - Biography */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <TerminalWindow title="bio.sh" className="h-full">
              <div className="space-y-4 text-gray-300">
                <div>
                  <span className="text-holo-green">$</span>{' '}
                  <span className="text-holo-cyan">cat</span> researcher_profile.txt
                </div>

                <div className="border-l-2 border-holo-green/30 pl-4 space-y-4">
                  <p>
                    <span className="text-holo-green">[ORIGIN]</span> My journey into computer vision began 
                    in the agricultural fields of South Korea, where I developed AI systems to help farmers 
                    detect weeds and monitor crop health.
                  </p>

                  <p>
                    <span className="text-holo-cyan">[EVOLUTION]</span> At Robot Vision Lab (JBNU), I created 
                    benchmark datasets like <span className="text-synth-yellow">CWD30</span> with 219,770+ images 
                    spanning 30 plant species, pushing the boundaries of agricultural computer vision.
                  </p>

                  <p>
                    <span className="text-holo-purple">[CURRENT]</span> Now at Monash University's AIM for Health Lab, 
                    I apply these skills to medical imaging—building systems that can detect seizures, analyze 
                    disease phenotypes, and support clinical decision-making.
                  </p>

                  <p>
                    <span className="text-synth-orange">[MISSION]</span> To bridge the gap between cutting-edge 
                    AI research and real-world applications that improve human lives—whether in agriculture 
                    or healthcare.
                  </p>
                </div>

                <div className="pt-4 border-t border-cyber-600">
                  <span className="text-holo-green">$</span>{' '}
                  <span className="text-gray-500">_</span>
                  <span className="terminal-cursor" />
                </div>
              </div>
            </TerminalWindow>
          </motion.div>
        </div>

        {/* Timeline Section */}
        <section className="mb-24">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-2xl text-center text-gradient mb-12"
          >
            Research Timeline
          </motion.h3>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-holo-green via-holo-cyan to-holo-purple" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.period}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative flex flex-col md:flex-row ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-2 border-current bg-cyber-900"
                       style={{ borderColor: `var(--color-${item.color})` }} />

                  {/* Content Card */}
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className={`p-6 rounded-xl border border-${item.color}/30 bg-cyber-800/30 backdrop-blur-sm`}>
                      <div className="flex items-center space-x-2 mb-2">
                        <FiCalendar className={`w-4 h-4 text-${item.color}`} />
                        <span className={`text-sm font-mono text-${item.color}`}>{item.period}</span>
                      </div>

                      <h4 className="font-display font-semibold text-xl text-gray-100 mb-1">
                        {item.role}
                      </h4>
                      <p className="text-gray-400 text-sm mb-3">
                        {item.institution} • {item.location}
                      </p>

                      <p className="text-gray-300 text-sm mb-4">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {item.focus.map((tag) => (
                          <span
                            key={tag}
                            className={`px-2 py-1 text-xs font-mono rounded border border-${item.color}/30 text-${item.color}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-2xl text-center text-gradient mb-12"
          >
            Technical Expertise
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`p-6 rounded-xl border border-${skill.color}/30 bg-cyber-800/30 backdrop-blur-sm`}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg bg-${skill.color}/10 flex items-center justify-center`}>
                    <skill.icon className={`w-5 h-5 text-${skill.color}`} />
                  </div>
                  <h4 className={`font-display font-semibold text-${skill.color}`}>
                    {skill.category}
                  </h4>
                </div>

                <ul className="space-y-2">
                  {skill.items.map((item) => (
                    <li key={item} className="flex items-center space-x-2 text-sm text-gray-400">
                      <span className={`w-1.5 h-1.5 rounded-full bg-${skill.color}`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  )
}
