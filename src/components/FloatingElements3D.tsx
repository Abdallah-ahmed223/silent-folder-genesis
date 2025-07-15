import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { Group } from 'three'

// Mini 3D scene for section backgrounds
function MiniFloatingElements() {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* Small floating elements */}
      {Array.from({ length: 6 }, (_, i) => (
        <Float key={i} speed={0.5 + Math.random() * 0.5} rotationIntensity={0.5} floatIntensity={1}>
          <mesh position={[
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 4
          ]}>
            {Math.random() > 0.5 ? (
              <boxGeometry args={[0.2, 0.2, 0.2]} />
            ) : (
              <sphereGeometry args={[0.15, 16, 16]} />
            )}
            <meshStandardMaterial 
              color={Math.random() > 0.5 ? "#3b82f6" : "#8b5cf6"} 
              emissive={Math.random() > 0.5 ? "#3b82f6" : "#8b5cf6"}
              emissiveIntensity={0.2}
              transparent
              opacity={0.6}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

interface FloatingElements3DProps {
  className?: string
  intensity?: 'low' | 'medium' | 'high'
}

export default function FloatingElements3D({ 
  className = "", 
  intensity = 'low' 
}: FloatingElements3DProps) {
  const elementCount = intensity === 'low' ? 3 : intensity === 'medium' ? 5 : 8

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          gl={{ alpha: true, antialias: false }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={0.4} color="#3b82f6" />
          
          <group>
            {Array.from({ length: elementCount }, (_, i) => (
              <Float key={i} speed={0.3 + Math.random() * 0.3} rotationIntensity={0.3} floatIntensity={0.8}>
                <mesh position={[
                  (Math.random() - 0.5) * 6,
                  (Math.random() - 0.5) * 4,
                  (Math.random() - 0.5) * 3
                ]}>
                  {i % 3 === 0 ? (
                    <boxGeometry args={[0.15, 0.15, 0.15]} />
                  ) : i % 3 === 1 ? (
                    <sphereGeometry args={[0.1, 12, 12]} />
                  ) : (
                    <octahedronGeometry args={[0.12]} />
                  )}
                  <meshStandardMaterial 
                    color={i % 2 === 0 ? "#3b82f6" : "#8b5cf6"} 
                    emissive={i % 2 === 0 ? "#3b82f6" : "#8b5cf6"}
                    emissiveIntensity={0.15}
                    transparent
                    opacity={0.4}
                  />
                </mesh>
              </Float>
            ))}
          </group>
        </Canvas>
      </Suspense>
    </div>
  )
}