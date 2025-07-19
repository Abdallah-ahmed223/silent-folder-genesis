import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import { Group } from 'three'

function Contact3DObjects() {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.04
    }
  })

  return (
    <group ref={groupRef}>
      {/* Communication symbols */}
      <Float speed={1.6} rotationIntensity={0.8} floatIntensity={2}>
        <mesh position={[-3.5, 2, -2.5]}>
          <sphereGeometry args={[0.8, 16, 16]} />
          <meshStandardMaterial 
            color="#06b6d4" 
            emissive="#06b6d4" 
            emissiveIntensity={0.3}
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>
      </Float>

      <Float speed={1.3} rotationIntensity={1.2} floatIntensity={1.5}>
        <mesh position={[3.5, -1.5, -2]}>
          <torusGeometry args={[1, 0.3, 12, 48]} />
          <meshStandardMaterial 
            color="#8b5cf6" 
            emissive="#8b5cf6" 
            emissiveIntensity={0.25}
            roughness={0.05}
            metalness={0.9}
          />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={1} floatIntensity={2.3}>
        <mesh position={[0, -2.8, -3.5]}>
          <cylinderGeometry args={[0.6, 1, 1.2, 8]} />
          <meshStandardMaterial 
            color="#f97316" 
            emissive="#f97316" 
            emissiveIntensity={0.2}
            roughness={0.15}
            metalness={0.75}
          />
        </mesh>
      </Float>

      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.8}>
        <mesh position={[1.5, 0.8, -1.5]}>
          <dodecahedronGeometry args={[0.7]} />
          <meshStandardMaterial 
            color="#10b981" 
            emissive="#10b981" 
            emissiveIntensity={0.28}
            roughness={0.1}
            metalness={0.85}
          />
        </mesh>
      </Float>

      {/* Message particles */}
      {Array.from({ length: 12 }, (_, i) => (
        <Float key={i} speed={0.4 + Math.random() * 0.5} rotationIntensity={Math.random() * 0.8} floatIntensity={0.5 + Math.random() * 0.6}>
          <mesh position={[
            (Math.random() - 0.5) * 16,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 12
          ]}>
            <boxGeometry args={[0.15, 0.15, 0.15]} />
            <meshStandardMaterial 
              color={['#06b6d4', '#8b5cf6', '#f97316', '#10b981', '#ef4444'][Math.floor(Math.random() * 5)]} 
              emissive={['#06b6d4', '#8b5cf6', '#f97316', '#10b981', '#ef4444'][Math.floor(Math.random() * 5)]}
              emissiveIntensity={0.6}
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

interface Contact3DSceneProps {
  className?: string
}

export default function Contact3DScene({ className = "" }: Contact3DSceneProps) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Suspense fallback={<SceneLoading />}>
        <Canvas
          camera={{ position: [0, 0, 9], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#06b6d4" />
          <pointLight position={[-10, -10, -10]} intensity={0.6} color="#8b5cf6" />
          <spotLight position={[5, 0, 8]} intensity={0.4} color="#f97316" />
          
          <Contact3DObjects />
          
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.25}
            minPolarAngle={Math.PI / 3.5}
            maxPolarAngle={Math.PI - Math.PI / 3.5}
          />
        </Canvas>
      </Suspense>
    </div>
  )
}