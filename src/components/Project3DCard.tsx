import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { Group } from 'three'
import { motion } from 'framer-motion'

// 3D floating icon for projects
function ProjectIcon({ icon }: { icon: string }) {
  const meshRef = useRef<Group>(null)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.3
      meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.1
    }
  })

  return (
    <group ref={meshRef}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <mesh>
          <boxGeometry args={[0.8, 0.8, 0.2]} />
          <meshStandardMaterial 
            color="#3b82f6" 
            emissive="#3b82f6" 
            emissiveIntensity={0.3}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        {/* Floating particles around the icon */}
        {Array.from({ length: 4 }, (_, i) => (
          <Float key={i} speed={2 + i * 0.5} rotationIntensity={1} floatIntensity={1.5}>
            <mesh position={[
              Math.cos(i * Math.PI * 0.5) * 1.2,
              Math.sin(i * Math.PI * 0.5) * 1.2,
              0.5
            ]}>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshStandardMaterial 
                color="#8b5cf6" 
                emissive="#8b5cf6" 
                emissiveIntensity={0.4}
              />
            </mesh>
          </Float>
        ))}
      </Float>
    </group>
  )
}

interface Project3DCardProps {
  className?: string
  isHovered?: boolean
}

export default function Project3DCard({ className = "", isHovered = false }: Project3DCardProps) {
  return (
    <div className={`relative w-16 h-16 ${className}`}>
      <Suspense fallback={
        <div className="w-full h-full bg-primary/20 rounded-lg animate-pulse" />
      }>
        <Canvas
          camera={{ position: [0, 0, 3], fov: 50 }}
          gl={{ alpha: true, antialias: false }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[2, 2, 2]} intensity={0.6} color="#3b82f6" />
          <pointLight position={[-2, -2, 2]} intensity={0.3} color="#8b5cf6" />
          
          <ProjectIcon icon="code" />
        </Canvas>
      </Suspense>
      
      {/* Glow effect overlay */}
      <div className={`absolute inset-0 rounded-lg transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-60'
      }`} style={{
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)'
      }} />
    </div>
  )
}