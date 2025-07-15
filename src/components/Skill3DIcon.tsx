import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { Group } from 'three'

// 3D skill icon shapes
const skillShapes = {
  frontend: () => (
    <boxGeometry args={[0.6, 0.6, 0.1]} />
  ),
  backend: () => (
    <cylinderGeometry args={[0.3, 0.3, 0.8, 8]} />
  ),
  mobile: () => (
    <boxGeometry args={[0.4, 0.7, 0.1]} />
  ),
  design: () => (
    <octahedronGeometry args={[0.4]} />
  ),
  animation: () => (
    <torusGeometry args={[0.35, 0.15, 8, 16]} />
  ),
  tools: () => (
    <coneGeometry args={[0.3, 0.8, 6]} />
  )
}

interface SkillIconProps {
  type: keyof typeof skillShapes
  color: string
}

function SkillIcon({ type, color }: SkillIconProps) {
  const meshRef = useRef<Group>(null)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.4
      meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.1
    }
  })

  const ShapeComponent = skillShapes[type]

  return (
    <group ref={meshRef}>
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh>
          <ShapeComponent />
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={0.2}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
        
        {/* Orbiting particles */}
        {Array.from({ length: 3 }, (_, i) => (
          <Float key={i} speed={2 + i * 0.3} rotationIntensity={1} floatIntensity={1}>
            <mesh position={[
              Math.cos(i * Math.PI * 0.66 + Date.now() * 0.001) * 0.8,
              Math.sin(i * Math.PI * 0.66 + Date.now() * 0.001) * 0.8,
              0.3
            ]}>
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshStandardMaterial 
                color="#ffffff" 
                emissive="#ffffff" 
                emissiveIntensity={0.5}
              />
            </mesh>
          </Float>
        ))}
      </Float>
    </group>
  )
}

interface Skill3DIconProps {
  type: keyof typeof skillShapes
  color?: string
  className?: string
  isActive?: boolean
}

export default function Skill3DIcon({ 
  type, 
  color = "#3b82f6", 
  className = "",
  isActive = false 
}: Skill3DIconProps) {
  return (
    <div className={`relative w-12 h-12 ${className}`}>
      <Suspense fallback={
        <div className="w-full h-full bg-primary/20 rounded-lg animate-pulse" />
      }>
        <Canvas
          camera={{ position: [0, 0, 2.5], fov: 50 }}
          gl={{ alpha: true, antialias: false }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[1, 1, 1]} intensity={0.6} color={color} />
          <pointLight position={[-1, -1, 1]} intensity={0.3} color="#8b5cf6" />
          
          <SkillIcon type={type} color={color} />
        </Canvas>
      </Suspense>
      
      {/* Active state glow */}
      <div className={`absolute inset-0 rounded-lg transition-opacity duration-300 pointer-events-none ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`} style={{
        background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`
      }} />
    </div>
  )
}