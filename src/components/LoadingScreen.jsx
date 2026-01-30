import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState('Initializing neural networks...')

  const statusMessages = [
    'Initializing neural networks...',
    'Loading vision modules...',
    'Calibrating inference engines...',
    'Syncing publication data...',
    'Rendering holographic interface...',
    'System ready.'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 15
        if (next >= 100) {
          clearInterval(interval)
          return 100
        }
        return next
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const messageIndex = Math.min(
      Math.floor((progress / 100) * statusMessages.length),
      statusMessages.length - 1
    )
    setStatusText(statusMessages[messageIndex])
  }, [progress])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] bg-cyber-900 flex flex-col items-center justify-center"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center space-y-8">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-holo-green via-holo-cyan to-holo-purple flex items-center justify-center">
            <span className="font-display font-bold text-cyber-900 text-4xl">TI</span>
          </div>
          
          {/* Pulsing Rings */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-holo-green"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-holo-cyan"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.3,
            }}
          />
        </motion.div>

        {/* Title */}
        <div className="text-center">
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-gradient">
            TALHA ILYAS
          </h1>
          <p className="font-mono text-sm text-gray-500 mt-2">
            Vision Intelligence Portfolio
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 sm:w-80 space-y-3">
          <div className="h-1 bg-cyber-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-holo-green via-holo-cyan to-holo-purple"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
          
          <div className="flex items-center justify-between text-xs font-mono">
            <motion.span
              key={statusText}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gray-400"
            >
              {statusText}
            </motion.span>
            <span className="text-holo-green">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Decorative Binary Stream */}
        <div className="absolute inset-x-0 bottom-20 flex justify-center overflow-hidden opacity-20">
          <div className="font-mono text-xs text-holo-green/50 whitespace-nowrap animate-pulse">
            {'01'.repeat(50)}
          </div>
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-holo-green/30" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-holo-green/30" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-holo-green/30" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-holo-green/30" />
    </motion.div>
  )
}
