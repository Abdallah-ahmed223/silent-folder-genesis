import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import { Group } from 'three'

// Advanced Space Scene with multiple cosmic elements
function SpaceStation() {
  const stationRef = useRef<Group>(null)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    if (stationRef.current) {
      stationRef.current.rotation.y = time * 0.05
      stationRef.current.rotation.x = Math.sin(time * 0.3) * 0.1
    }
  })

  return (
    <group ref={stationRef}>
      {/* Central Space Station Core */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
        <group>
          {/* Main Hub */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[1.5, 32, 32]} />
            <meshStandardMaterial 
              color="#0ea5e9" 
              emissive="#0ea5e9" 
              emissiveIntensity={0.3}
              roughness={0.2}
              metalness={0.8}
              transparent
              opacity={0.8}
            />
          </mesh>

          {/* Station Rings */}
          <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[2.5, 0.2, 8, 32]} />
            <meshStandardMaterial 
              color="#a855f7" 
              emissive="#a855f7" 
              emissiveIntensity={0.4}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>

          <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 4, Math.PI / 3]}>
            <torusGeometry args={[3.2, 0.15, 6, 24]} />
            <meshStandardMaterial 
              color="#06b6d4" 
              emissive="#06b6d4" 
              emissiveIntensity={0.3}
              roughness={0.1}
              metalness={0.8}
            />
          </mesh>
        </group>
      </Float>
    </group>
  )
}

// Floating Cosmic Objects
function CosmicElements() {
  const elementsRef = useRef<Group>(null)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    if (elementsRef.current) {
      elementsRef.current.rotation.y = time * 0.08
    }
  })

  return (
    <group ref={elementsRef}>
      {/* Asteroid Field */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const radius = 8 + Math.random() * 4
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const y = (Math.random() - 0.5) * 6

        return (
          <Float key={i} speed={0.5 + Math.random()} rotationIntensity={Math.random() * 2} floatIntensity={1 + Math.random()}>
            <mesh position={[x, y, z]}>
              <boxGeometry args={[0.2 + Math.random() * 0.4, 0.2 + Math.random() * 0.4, 0.2 + Math.random() * 0.4]} />
              <meshStandardMaterial 
                color={['#64748b', '#94a3b8', '#cbd5e1'][Math.floor(Math.random() * 3)]}
                emissive="#475569"
                emissiveIntensity={0.1}
                roughness={0.8}
                metalness={0.3}
              />
            </mesh>
          </Float>
        )
      })}

      {/* Energy Orbs */}
      {Array.from({ length: 6 }, (_, i) => {
        const angle = (i / 6) * Math.PI * 2
        const radius = 12
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius

        return (
          <Float key={`orb-${i}`} speed={2 + Math.random()} rotationIntensity={3} floatIntensity={3}>
            <mesh position={[x, Math.sin(angle * 2) * 2, z]}>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshStandardMaterial 
                color={['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981'][Math.floor(Math.random() * 4)]}
                emissive={['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981'][Math.floor(Math.random() * 4)]}
                emissiveIntensity={0.6}
                transparent
                opacity={0.8}
              />
            </mesh>
          </Float>
        )
      })}

      {/* Distant Planets */}
      <Float speed={0.3} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[-15, 3, -8]}>
          <sphereGeometry args={[0.8, 20, 20]} />
          <meshStandardMaterial 
            color="#ef4444" 
            emissive="#ef4444" 
            emissiveIntensity={0.2}
            roughness={0.3}
          />
        </mesh>
      </Float>

      <Float speed={0.4} rotationIntensity={0.3} floatIntensity={0.7}>
        <mesh position={[18, -2, -12]}>
          <sphereGeometry args={[1.2, 24, 24]} />
          <meshStandardMaterial 
            color="#22c55e" 
            emissive="#22c55e" 
            emissiveIntensity={0.15}
            roughness={0.4}
          />
        </mesh>
      </Float>
    </group>
  )
}

// Loading fallback with space theme
function SceneLoading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4 nebula-pulse"></div>
        <p className="text-primary font-medium font-mono">INITIALIZING SPACE ENVIRONMENT...</p>
        <div className="text-xs text-accent font-mono mt-2">◉ LOADING COSMIC ELEMENTS</div>
      </div>
    </div>
  )
}

interface Portfolio3DSceneProps {
  className?: string
}

export default function Portfolio3DScene({ className = "" }: Portfolio3DSceneProps) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Suspense fallback={<SceneLoading />}>
        <Canvas
          camera={{ position: [0, 2, 15], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          {/* Advanced Lighting Setup */}
          <ambientLight intensity={0.2} />
          
          {/* Multiple colored lights for cosmic effect */}
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#0ea5e9" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#a855f7" />
          <pointLight position={[0, 15, 5]} intensity={0.8} color="#06b6d4" />
          <pointLight position={[15, -5, -10]} intensity={0.6} color="#ec4899" />
          
          {/* Rim lighting */}
          <directionalLight position={[20, 20, 20]} intensity={0.3} color="#ffffff" />
          
          {/* 3D Space Elements */}
          <SpaceStation />
          <CosmicElements />
          
          {/* Interactive Camera Controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.3}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI - Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
            minAzimuthAngle={-Math.PI / 4}
          />
        </Canvas>
      </Suspense>
    </div>
  )
}