import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import { Group } from 'three'

function Skills3DObjects() {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.06
    }
  })

  return (
    <group ref={groupRef}>
      {/* Technology symbols */}
      <Float speed={1.3} rotationIntensity={1} floatIntensity={1.6}>
        <mesh position={[-3, 1.5, -2]}>
          <icosahedronGeometry args={[0.8]} />
          <meshStandardMaterial 
            color="#3b82f6" 
            emissive="#3b82f6" 
            emissiveIntensity={0.2}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
      </Float>

      <Float speed={1.7} rotationIntensity={1.3} floatIntensity={2}>
        <mesh position={[3, -0.8, -1.8]}>
          <tetrahedronGeometry args={[1]} />
          <meshStandardMaterial 
            color="#ec4899" 
            emissive="#ec4899" 
            emissiveIntensity={0.25}
            roughness={0.05}
            metalness={0.8}
          />
        </mesh>
      </Float>

      <Float speed={1.1} rotationIntensity={0.9} floatIntensity={1.3}>
        <mesh position={[0, -2.2, -3]}>
          <coneGeometry args={[0.8, 1.6, 6]} />
          <meshStandardMaterial 
            color="#f59e0b" 
            emissive="#f59e0b" 
            emissiveIntensity={0.18}
            roughness={0.2}
            metalness={0.7}
          />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={1.1} floatIntensity={1.8}>
        <mesh position={[-1.5, 0.5, -1]}>
          <octahedronGeometry args={[0.6]} />
          <meshStandardMaterial 
            color="#10b981" 
            emissive="#10b981" 
            emissiveIntensity={0.22}
            roughness={0.15}
            metalness={0.85}
          />
        </mesh>
      </Float>

      {/* Skill nodes */}
      {Array.from({ length: 10 }, (_, i) => (
        <Float key={i} speed={0.5 + Math.random() * 0.6} rotationIntensity={Math.random() * 1.2} floatIntensity={0.6 + Math.random() * 0.8}>
          <mesh position={[
            (Math.random() - 0.5) * 14,
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 10
          ]}>
            <sphereGeometry args={[0.1 + Math.random() * 0.15, 12, 12]} />
            <meshStandardMaterial 
              color={['#3b82f6', '#ec4899', '#f59e0b', '#10b981', '#8b5cf6'][Math.floor(Math.random() * 5)]} 
              emissive={['#3b82f6', '#ec4899', '#f59e0b', '#10b981', '#8b5cf6'][Math.floor(Math.random() * 5)]}
              emissiveIntensity={0.5}
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

interface Skills3DSceneProps {
  className?: string
}

export default function Skills3DScene({ className = "" }: Skills3DSceneProps) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Suspense fallback={<SceneLoading />}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[8, 8, 8]} intensity={0.7} color="#3b82f6" />
          <pointLight position={[-8, -8, -8]} intensity={0.6} color="#ec4899" />
          <spotLight position={[0, 10, 5]} intensity={0.5} color="#f59e0b" />
          
          <Skills3DObjects />
          
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.35}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI - Math.PI / 4}
          />
        </Canvas>
      </Suspense>
    </div>
  )
}