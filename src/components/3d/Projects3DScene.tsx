import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import { Group } from 'three'

function Projects3DObjects() {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.08
    }
  })

  return (
    <group ref={groupRef}>
      {/* Project showcase elements */}
      <Float speed={1.4} rotationIntensity={1.2} floatIntensity={1.8}>
        <mesh position={[-3.5, 2, -2]}>
          <boxGeometry args={[1.2, 0.8, 0.1]} />
          <meshStandardMaterial 
            color="#4ade80" 
            emissive="#4ade80" 
            emissiveIntensity={0.15}
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={1.5} floatIntensity={2.2}>
        <mesh position={[3.5, -1, -1.5]}>
          <boxGeometry args={[1, 1.4, 0.1]} />
          <meshStandardMaterial 
            color="#a855f7" 
            emissive="#a855f7" 
            emissiveIntensity={0.2}
            roughness={0.05}
            metalness={0.9}
          />
        </mesh>
      </Float>

      <Float speed={1.1} rotationIntensity={0.8} floatIntensity={1.5}>
        <mesh position={[0, -2.5, -2.5]}>
          <boxGeometry args={[1.6, 1, 0.1]} />
          <meshStandardMaterial 
            color="#f97316" 
            emissive="#f97316" 
            emissiveIntensity={0.18}
            roughness={0.15}
            metalness={0.7}
          />
        </mesh>
      </Float>

      {/* Code elements */}
      {Array.from({ length: 8 }, (_, i) => (
        <Float key={i} speed={0.6 + Math.random() * 0.8} rotationIntensity={Math.random() * 1.5} floatIntensity={0.8 + Math.random() * 0.7}>
          <mesh position={[
            (Math.random() - 0.5) * 12,
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 8
          ]}>
            <boxGeometry args={[0.2, 0.2, 0.05]} />
            <meshStandardMaterial 
              color={['#06b6d4', '#8b5cf6', '#ef4444', '#10b981'][Math.floor(Math.random() * 4)]} 
              emissive={['#06b6d4', '#8b5cf6', '#ef4444', '#10b981'][Math.floor(Math.random() * 4)]}
              emissiveIntensity={0.4}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

function SceneLoading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
}

interface Projects3DSceneProps {
  className?: string
}

export default function Projects3DScene({ className = "" }: Projects3DSceneProps) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Suspense fallback={<SceneLoading />}>
        <Canvas
          camera={{ position: [0, 0, 7], fov: 55 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.35} />
          <pointLight position={[10, 10, 10]} intensity={0.9} color="#4ade80" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
          
          <Projects3DObjects />
          
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.4}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI - Math.PI / 3}
          />
        </Canvas>
      </Suspense>
    </div>
  )
}