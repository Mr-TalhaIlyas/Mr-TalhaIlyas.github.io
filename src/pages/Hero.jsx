import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Text, Float } from '@react-three/drei'
import * as THREE from 'three'
import { FiArrowRight, FiGithub, FiBookOpen, FiCode, FiCpu, FiPackage, FiBox } from 'react-icons/fi'
import { SiDocker, SiPypi } from 'react-icons/si'
import { AnimatedCounter } from '../components/UIComponents'

// Interactive 3D Scene Component
function HeroScene() {
  const pointsRef = useRef()

  const particleCount = 2000
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3
    const radius = Math.random() * 5 + 2
    const theta = Math.random() * Math.PI * 2
    const phi = Math.random() * Math.PI

    positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i3 + 2] = radius * Math.cos(phi)

    // Color gradient based on position
    const t = (positions[i3 + 1] + 5) / 10
    const color = new THREE.Color().lerpColors(
      new THREE.Color('#00ff9f'),
      new THREE.Color('#b14aed'),
      t
    )
    colors[i3] = color.r
    colors[i3 + 1] = color.g
    colors[i3 + 2] = color.b
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="#00ff9f" intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#b14aed" intensity={0.5} />

      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[0, 0, 0]}>
          <icosahedronGeometry args={[1.5, 1]} />
          <meshBasicMaterial
            color="#00ff9f"
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
      </Float>
    </>
  )
}

// Stats data
const stats = [
  { label: 'Publications', value: 15, suffix: '+', icon: FiBookOpen },
  { label: 'Citations', value: 456, suffix: '+', icon: FiCpu },
  { label: 'Open Source Projects', value: 15, suffix: '+', icon: FiCode },
  { label: 'h-index', value: 12, suffix: '', icon: FiGithub },
]

// Software stats
const softwareStats = [
  { label: 'PyPI Packages', value: 5, suffix: '', icon: SiPypi, color: 'holo-green' },
  { label: 'Docker Images', value: 4, suffix: '', icon: SiDocker, color: 'holo-cyan' },
]

// Quick links
const quickLinks = [
  { label: 'View Projects', path: '/projects', color: 'from-holo-green to-holo-cyan' },
  { label: 'Publications', path: '/publications', color: 'from-holo-cyan to-holo-purple' },
  { label: 'Software & Tools', path: '/software', color: 'from-holo-purple to-holo-pink' },
]

export default function Hero() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Canvas */}
        <div className="absolute inset-0 z-0">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 60 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
          >
            <HeroScene />
          </Canvas>
        </div>

        {/* Content Overlay */}
        <motion.div
          style={{ y, opacity }}
          className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-holo-green/30 bg-cyber-800/50 backdrop-blur-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-holo-green animate-pulse" />
            <span className="text-sm font-mono text-holo-green">
              AIM for Health Lab • Monash University
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display font-bold text-5xl sm:text-6xl lg:text-8xl mb-6"
          >
            <span className="text-gradient">Talha Ilyas</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="font-display text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-4">
              Vision Intelligence Researcher
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono text-sm sm:text-base leading-relaxed">
              <span className="text-holo-cyan">{'>'}</span> Forged in the fields of precision agriculture,
              <br />
              <span className="text-holo-green">{'>'}</span> Now refining vision intelligence for critical healthcare applications.
            </p>
          </motion.div>

          {/* Research Domains */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {['Computer Vision', 'Deep Learning', 'Medical AI', 'Edge AI', 'Precision Agriculture'].map((domain, i) => (
              <span
                key={domain}
                className="px-4 py-2 text-sm font-mono rounded-lg border border-cyber-600 bg-cyber-800/30 backdrop-blur-sm text-gray-300 hover:border-holo-green hover:text-holo-green transition-all cursor-default"
              >
                {domain}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/projects"
              className="group inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-gradient-to-r from-holo-green to-holo-cyan text-cyber-900 font-semibold transition-all hover:shadow-holo-lg"
            >
              <span>Explore Research</span>
              <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="https://github.com/Mr-TalhaIlyas"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg border border-cyber-600 text-gray-300 font-semibold hover:border-holo-green hover:text-holo-green transition-all"
            >
              <FiGithub className="w-5 h-5" />
              <span>GitHub</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="flex flex-col items-center space-y-2">
            <span className="text-xs font-mono text-gray-500">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-cyber-600 flex items-start justify-center p-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-holo-green" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-24 border-t border-cyber-700/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative p-6 rounded-xl border border-cyber-600 bg-cyber-800/30 backdrop-blur-sm group hover:border-holo-green/50 transition-all"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-holo-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <stat.icon className="w-6 h-6 text-holo-green mb-4" />
                <div className="text-3xl sm:text-4xl font-display font-bold text-gradient mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm font-mono text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Software Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {softwareStats.map((stat, index) => (
              <Link
                key={stat.label}
                to="/software"
                className={`flex items-center space-x-3 px-6 py-3 rounded-xl border border-${stat.color}/30 bg-cyber-800/30 hover:border-${stat.color}/60 transition-all group`}
              >
                <stat.icon className={`w-5 h-5 text-${stat.color}`} />
                <span className="text-2xl font-display font-bold text-gradient">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-sm font-mono text-gray-400 group-hover:text-gray-300">{stat.label}</span>
              </Link>
            ))}
          </motion.div>

          {/* Industrial Projects Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 p-6 rounded-2xl border border-synth-yellow/30 bg-cyber-800/30 backdrop-blur-sm"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-synth-yellow to-holo-green flex items-center justify-center">
                  <FiCpu className="w-6 h-6 text-cyber-900" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-lg text-synth-yellow">Industrial Projects</h4>
                  <p className="text-sm text-gray-400">Real-world AI deployments in agriculture & healthcare</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 text-xs font-mono rounded-full bg-holo-green/20 text-holo-green border border-holo-green/30">
                  2 Completed
                </span>
                <span className="px-3 py-1 text-xs font-mono rounded-full bg-synth-orange/20 text-synth-orange border border-synth-orange/30">
                  1 Ongoing
                </span>
                <Link
                  to="/projects"
                  className="flex items-center space-x-2 text-sm text-holo-cyan hover:text-holo-green transition-colors"
                >
                  <span>View Projects</span>
                  <FiArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="relative z-10 py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center font-display text-2xl sm:text-3xl font-bold text-gradient mb-12"
          >
            Explore Portfolio
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-6">
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  to={link.path}
                  className="group block relative p-8 rounded-2xl border border-cyber-600 bg-cyber-800/30 backdrop-blur-sm overflow-hidden hover:border-transparent transition-all"
                >
                  {/* Gradient Border on Hover */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${link.color} opacity-0 group-hover:opacity-100 transition-opacity`} style={{ padding: '1px' }}>
                    <div className="w-full h-full rounded-2xl bg-cyber-800" />
                  </div>

                  <div className="relative z-10">
                    <h4 className="font-display font-semibold text-xl text-gray-100 mb-2 group-hover:text-gradient transition-all">
                      {link.label}
                    </h4>
                    <div className="flex items-center text-holo-cyan group-hover:translate-x-2 transition-transform">
                      <span className="text-sm font-mono">View all</span>
                      <FiArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Journey Teaser */}
      <section className="relative z-10 py-24 border-t border-cyber-700/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-display text-2xl sm:text-3xl font-bold mb-6">
              <span className="text-holo-green">From Fields</span> to{' '}
              <span className="text-holo-cyan">Healthcare</span>
            </h3>
            <p className="text-gray-400 leading-relaxed mb-8 max-w-2xl mx-auto">
              My research journey began in precision agriculture at Robot Vision Lab (JBNU), 
              developing computer vision systems for crop monitoring and weed detection. 
              Now at Monash University's AIM for Health Lab, I apply these skills to medical 
              imaging and healthcare AI applications.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center space-x-2 text-holo-cyan hover:text-holo-green transition-colors font-mono"
            >
              <span>Read full story</span>
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
