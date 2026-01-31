import { useState, useEffect, Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Components
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import Background3D from './components/Background3D'

// Lazy load pages for better performance
const Hero = lazy(() => import('./pages/Hero'))
const About = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))
const Publications = lazy(() => import('./pages/Publications'))
const Software = lazy(() => import('./pages/Software'))
const Contact = lazy(() => import('./pages/Contact'))

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [showBackground, setShowBackground] = useState(true)
  const location = useLocation()

  useEffect(() => {
    // Faster loading on mobile/tablet devices
    const isMobileOrTablet = window.innerWidth < 1024 || 
      ('ontouchstart' in window || navigator.maxTouchPoints > 0)
    const loadingTime = isMobileOrTablet ? 1000 : 2000

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, loadingTime)

    return () => clearTimeout(timer)
  }, [])

  // Disable 3D background on mobile/tablet for performance
  useEffect(() => {
    const checkPerformance = () => {
      // Disable on screens smaller than 1024px (includes tablets)
      const isSmallScreen = window.innerWidth < 1024
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      
      // Check if device is touch-based (mobile/tablet indicator)
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      
      // Check WebGL support
      let hasWebGL = false
      try {
        const canvas = document.createElement('canvas')
        hasWebGL = !!(window.WebGLRenderingContext && 
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')))
      } catch (e) {
        hasWebGL = false
      }

      // Disable 3D for: small screens, touch devices, no WebGL, or reduced motion preference
      const shouldDisable = isSmallScreen || (isTouchDevice && window.innerWidth < 1200) || !hasWebGL || prefersReducedMotion
      setShowBackground(!shouldDisable)
    }

    checkPerformance()
    window.addEventListener('resize', checkPerformance)
    return () => window.removeEventListener('resize', checkPerformance)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="relative min-h-screen bg-cyber-900 text-gray-100 overflow-x-hidden">
      {/* 3D Background */}
      {showBackground && <Background3D />}

      {/* Grid Overlay */}
      <div className="fixed inset-0 grid-bg pointer-events-none z-0" />

      {/* Noise Texture */}
      <div className="fixed inset-0 noise-overlay pointer-events-none z-0" />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-holo-green border-t-transparent rounded-full animate-spin" />
            </div>
          }>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Hero />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/publications" element={<Publications />} />
              <Route path="/software" element={<Software />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
