import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function AnimatedCounter({ value, duration = 2, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef(null)
  // Use a smaller margin and amount for better mobile detection
  const isInView = useInView(ref, { once: true, margin: '0px', amount: 0.1 })

  useEffect(() => {
    // Also trigger if component is mounted and visible for a short time (fallback for mobile)
    if (hasAnimated) return
    
    const endValue = typeof value === 'number' ? value : parseFloat(value) || 0
    
    // Fallback: if not triggered after mount, check if element is in viewport
    const fallbackTimer = setTimeout(() => {
      if (!hasAnimated && ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0
        if (isVisible) {
          runAnimation(endValue)
        }
      }
    }, 500)

    if (isInView && !hasAnimated) {
      runAnimation(endValue)
    }

    function runAnimation(endValue) {
      setHasAnimated(true)
      let startTime
      const startValue = 0

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentValue = startValue + (endValue - startValue) * easeOutQuart

        setCount(currentValue)

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }

    return () => clearTimeout(fallbackTimer)
  }, [isInView, value, duration, hasAnimated])

  const endValue = typeof value === 'number' ? value : parseFloat(value) || 0
  const displayValue = Number.isInteger(endValue) 
    ? Math.round(count) 
    : count.toFixed(2)

  return (
    <span ref={ref} className="counter-value">
      {prefix}{displayValue}{suffix}
    </span>
  )
}

export function GlowingBorder({ children, className = '', color = 'green' }) {
  const colorMap = {
    green: 'from-holo-green to-holo-cyan',
    purple: 'from-holo-purple to-holo-pink',
    cyan: 'from-holo-cyan to-holo-blue',
    warm: 'from-synth-orange to-synth-yellow',
  }

  return (
    <div className={`relative p-[1px] rounded-xl ${className}`}>
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${colorMap[color]} opacity-50 blur-sm`} />
      <div className="relative bg-cyber-800 rounded-xl">
        {children}
      </div>
    </div>
  )
}

export function TypewriterText({ text, speed = 50, delay = 0, className = '' }) {
  const [displayText, setDisplayText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    const timeout = setTimeout(() => {
      let index = 0
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1))
          index++
        } else {
          clearInterval(interval)
          setTimeout(() => setShowCursor(false), 1000)
        }
      }, speed)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timeout)
  }, [text, speed, delay, isInView])

  return (
    <span ref={ref} className={className}>
      {displayText}
      {showCursor && <span className="terminal-cursor" />}
    </span>
  )
}

export function HexagonBadge({ children, className = '', color = 'green' }) {
  const colorMap = {
    green: 'border-holo-green text-holo-green',
    cyan: 'border-holo-cyan text-holo-cyan',
    purple: 'border-holo-purple text-holo-purple',
    yellow: 'border-synth-yellow text-synth-yellow',
  }

  return (
    <span className={`inline-flex items-center px-3 py-1 text-xs font-mono border ${colorMap[color]} bg-cyber-800/50 ${className}`}>
      {children}
    </span>
  )
}

export function DataMetric({ label, value, unit = '', color = 'green', icon: Icon }) {
  const colorMap = {
    green: 'text-holo-green border-holo-green/30',
    cyan: 'text-holo-cyan border-holo-cyan/30',
    purple: 'text-holo-purple border-holo-purple/30',
    yellow: 'text-synth-yellow border-synth-yellow/30',
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className={`p-4 rounded-lg border ${colorMap[color]} bg-cyber-800/30 backdrop-blur-sm`}
    >
      <div className="flex items-center space-x-2 mb-2">
        {Icon && <Icon className={`w-4 h-4 ${colorMap[color].split(' ')[0]}`} />}
        <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className={`text-2xl font-display font-bold ${colorMap[color].split(' ')[0]}`}>
        <AnimatedCounter value={value} suffix={unit} />
      </div>
    </motion.div>
  )
}

export function SectionHeader({ title, subtitle, align = 'left' }) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${alignClass[align]}`}
    >
      <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-gradient mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-400 text-lg max-w-2xl mx-auto font-mono">
          {subtitle}
        </p>
      )}
      <div className={`mt-6 h-1 w-24 bg-gradient-to-r from-holo-green to-holo-cyan rounded-full ${
        align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''
      }`} />
    </motion.div>
  )
}

export function TerminalWindow({ children, title = 'terminal', className = '' }) {
  return (
    <div className={`rounded-lg overflow-hidden border border-cyber-600 ${className}`}>
      {/* Title Bar */}
      <div className="flex items-center space-x-2 px-4 py-2 bg-cyber-800 border-b border-cyber-600">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-synth-red" />
          <div className="w-3 h-3 rounded-full bg-synth-yellow" />
          <div className="w-3 h-3 rounded-full bg-holo-green" />
        </div>
        <span className="text-xs font-mono text-gray-500 ml-4">{title}</span>
      </div>
      {/* Content */}
      <div className="p-4 bg-cyber-900/80 font-mono text-sm">
        {children}
      </div>
    </div>
  )
}

export function CopyButton({ text, className = '' }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <motion.button
      onClick={handleCopy}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-3 py-1 text-xs font-mono rounded border transition-all ${
        copied
          ? 'border-holo-green text-holo-green bg-holo-green/10'
          : 'border-cyber-600 text-gray-400 hover:border-holo-cyan hover:text-holo-cyan'
      } ${className}`}
    >
      {copied ? '✓ Copied!' : 'Copy'}
    </motion.button>
  )
}

export function ProgressGauge({ value, max = 100, label, color = 'green', size = 'md' }) {
  const percentage = (value / max) * 100
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  }
  
  const colorMap = {
    green: '#00ff9f',
    cyan: '#00f0ff',
    purple: '#b14aed',
    yellow: '#ffd700',
  }

  const circumference = 2 * Math.PI * 40

  return (
    <div className={`relative ${sizeClasses[size]}`}>
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        {/* Background Circle */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#1a2642"
          strokeWidth="8"
        />
        {/* Progress Circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke={colorMap[color]}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: circumference - (percentage / 100) * circumference }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{
            filter: `drop-shadow(0 0 6px ${colorMap[color]})`,
          }}
        />
      </svg>
      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-display font-bold" style={{ color: colorMap[color] }}>
          <AnimatedCounter value={value} suffix="%" />
        </span>
        {label && (
          <span className="text-[10px] font-mono text-gray-500 text-center mt-1">
            {label}
          </span>
        )}
      </div>
    </div>
  )
}
