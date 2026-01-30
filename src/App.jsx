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
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Disable 3D background on mobile for performance
  useEffect(() => {
    const checkPerformance = () => {
      const isMobile = window.innerWidth < 768
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      setShowBackground(!isMobile && !prefersReducedMotion)
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
