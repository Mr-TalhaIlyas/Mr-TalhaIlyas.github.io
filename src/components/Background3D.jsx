import React, { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function ParticleField({ count = 5000 }) {
  const points = useRef()
  const { mouse } = useThree()

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    const colorPalette = [
      new THREE.Color('#00ff9f'), // Holo green
      new THREE.Color('#00f0ff'), // Holo cyan
      new THREE.Color('#b14aed'), // Holo purple
      new THREE.Color('#4a9eff'), // Holo blue
    ]

    for (let i = 0; i < count; i++) {
      // Create a terrain-like distribution
      const x = (Math.random() - 0.5) * 20
      const z = (Math.random() - 0.5) * 20
      
      // Height based on position (creates wave-like terrain)
      const y = Math.sin(x * 0.5) * Math.cos(z * 0.5) * 2 + (Math.random() - 0.5) * 0.5

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      // Assign colors based on height
      const normalizedHeight = (y + 2) / 4
      const colorIndex = Math.floor(normalizedHeight * colorPalette.length)
      const color = colorPalette[Math.min(colorIndex, colorPalette.length - 1)]

      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    return [positions, colors]
  }, [count])

  useFrame((state, delta) => {
    if (!points.current) return

    // Gentle rotation
    points.current.rotation.y += delta * 0.05

    // Mouse interaction
    const targetX = mouse.y * 0.3
    const targetZ = mouse.x * 0.3

    points.current.rotation.x = THREE.MathUtils.lerp(
      points.current.rotation.x,
      targetX,
      delta * 2
    )
    points.current.rotation.z = THREE.MathUtils.lerp(
      points.current.rotation.z,
      targetZ,
      delta * 2
    )

    // Animate particle positions for wave effect
    const positions = points.current.geometry.attributes.position.array
    const time = state.clock.elapsedTime

    for (let i = 0; i < count; i++) {
      const ix = i * 3
      const iy = i * 3 + 1
      
      const x = positions[ix]
      const z = positions[ix + 2]
      
      // Gentle wave animation
      positions[iy] = Math.sin(x * 0.5 + time * 0.5) * 
                      Math.cos(z * 0.5 + time * 0.3) * 2 +
                      Math.sin(time * 0.2) * 0.2
    }

    points.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

function NeuralNetwork({ nodeCount = 50 }) {
  const group = useRef()
  const { mouse } = useThree()

  const [nodes, connections] = useMemo(() => {
    const nodes = []
    const connections = []

    // Create nodes in a 3D space
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 8
        ),
        originalPosition: new THREE.Vector3(
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 8
        ),
      })
    }

    // Create connections between nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = nodes[i].position.distanceTo(nodes[j].position)
        if (distance < 3) {
          connections.push({
            start: nodes[i].position,
            end: nodes[j].position,
            opacity: 1 - distance / 3,
          })
        }
      }
    }

    return [nodes, connections]
  }, [nodeCount])

  useFrame((state, delta) => {
    if (!group.current) return

    // Gentle rotation based on mouse
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      mouse.x * 0.5,
      delta
    )
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      mouse.y * 0.3,
      delta
    )

    // Breathing animation
    const breathe = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 + 1
    group.current.scale.setScalar(breathe)
  })

  return (
    <group ref={group}>
      {/* Nodes */}
      {nodes.map((node, i) => (
        <mesh key={`node-${i}`} position={node.position}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? '#00ff9f' : i % 3 === 1 ? '#00f0ff' : '#b14aed'}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}

      {/* Connections */}
      {connections.map((conn, i) => {
        const points = [conn.start, conn.end]
        const geometry = new THREE.BufferGeometry().setFromPoints(points)

        return (
          <line key={`conn-${i}`} geometry={geometry}>
            <lineBasicMaterial
              color="#00ff9f"
              transparent
              opacity={conn.opacity * 0.3}
            />
          </line>
        )
      })}
    </group>
  )
}

function FloatingOrbs() {
  const orbsRef = useRef([])
  const { mouse } = useThree()

  const orbs = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 10,
      ],
      scale: 0.5 + Math.random() * 0.5,
      speed: 0.5 + Math.random() * 0.5,
      color: ['#00ff9f', '#00f0ff', '#b14aed', '#4a9eff'][i % 4],
    }))
  }, [])

  useFrame((state) => {
    orbsRef.current.forEach((orb, i) => {
      if (!orb) return
      const t = state.clock.elapsedTime * orbs[i].speed
      orb.position.y = orbs[i].position[1] + Math.sin(t) * 0.5
      orb.position.x = orbs[i].position[0] + Math.cos(t * 0.5) * 0.3
      
      // Mouse interaction
      orb.position.x += mouse.x * 0.2
      orb.position.y += mouse.y * 0.2
    })
  })

  return (
    <>
      {orbs.map((orb, i) => (
        <mesh
          key={i}
          ref={(el) => (orbsRef.current[i] = el)}
          position={orb.position}
          scale={orb.scale}
        >
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshBasicMaterial
            color={orb.color}
            transparent
            opacity={0.15}
          />
        </mesh>
      ))}
    </>
  )
}

// Fallback background for when WebGL fails or is unavailable
function FallbackBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-cyber-900">
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-holo-green/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-holo-purple/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-holo-cyan/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      
      {/* Subtle grid */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0, 255, 159, 0.02) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 255, 159, 0.02) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px'
      }} />
    </div>
  )
}

export default function Background3D() {
  const [hasError, setHasError] = useState(false)
  const [isSupported, setIsSupported] = useState(true)

  useEffect(() => {
    // Check WebGL support on mount
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) {
        setIsSupported(false)
      }
    } catch (e) {
      setIsSupported(false)
    }
  }, [])

  // If WebGL not supported or error occurred, show fallback
  if (!isSupported || hasError) {
    return <FallbackBackground />
  }

  return (
    <div className="r3f-canvas">
      <Canvas
        camera={{ position: [0, 2, 10], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
          failIfMajorPerformanceCaveat: true
        }}
        onCreated={({ gl }) => {
          // Additional check after context creation
          if (!gl) {
            setHasError(true)
          }
        }}
        onError={() => setHasError(true)}
      >
        <color attach="background" args={['#0a0f1a']} />
        <fog attach="fog" args={['#0a0f1a', 5, 30]} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#00ff9f" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#b14aed" />

        <ParticleField count={2000} />
        <NeuralNetwork nodeCount={30} />
        <FloatingOrbs />
      </Canvas>
    </div>
  )
}
