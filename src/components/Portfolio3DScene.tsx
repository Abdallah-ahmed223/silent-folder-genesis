import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import { Group, Mesh, BoxGeometry, SphereGeometry, TorusGeometry, MeshStandardMaterial } from 'three'

// Simplified floating geometry without complex refs
function FloatingGeometry() {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main floating shapes */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-4, 2, -2]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial 
            color="#00bfff" 
            emissive="#00bfff" 
            emissiveIntensity={0.2}
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={2} floatIntensity={1.5}>
        <mesh position={[4, -1, -1]}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial 
            color="#8b5cf6" 
            emissive="#8b5cf6" 
            emissiveIntensity={0.3}
            roughness={0.2}
            metalness={0.7}
          />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={1.5} floatIntensity={2.5}>
        <mesh position={[0, -3, -3]}>
          <torusGeometry args={[1.2, 0.4, 16, 100]} />
          <meshStandardMaterial 
            color="#ff1493" 
            emissive="#ff1493" 
            emissiveIntensity={0.25}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
      </Float>

      {/* Smaller floating particles */}
      {Array.from({ length: 8 }, (_, i) => (
        <Float key={i} speed={1 + Math.random()} rotationIntensity={Math.random() * 2} floatIntensity={1 + Math.random()}>
          <mesh position={[
            (Math.random() - 0.5) * 12,
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 8
          ]}>
            <sphereGeometry args={[0.1 + Math.random() * 0.2, 16, 16]} />
            <meshStandardMaterial 
              color={Math.random() > 0.5 ? "#00ffff" : "#ff69b4"} 
              emissive={Math.random() > 0.5 ? "#00ffff" : "#ff69b4"}
              emissiveIntensity={0.4}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

// Simple loading fallback
function SceneLoading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-primary font-medium">Loading 3D Scene...</p>
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
          camera={{ position: [0, 0, 8], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          {/* Simplified lighting */}
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00bfff" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff1493" />
          
          {/* 3D Objects */}
          <FloatingGeometry />
          
          {/* Camera Controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI - Math.PI / 3}
          />
        </Canvas>
      </Suspense>
    </div>
  )
}