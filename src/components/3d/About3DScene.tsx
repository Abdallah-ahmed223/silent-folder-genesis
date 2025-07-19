import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, Text3D, Center } from '@react-three/drei'
import { Group } from 'three'

function About3DObjects() {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* Code symbols floating around */}
      <Float speed={1.2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[-3, 1, -2]}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial 
            color="#00bfff" 
            emissive="#00bfff" 
            emissiveIntensity={0.1}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
        <mesh position={[3, -0.5, -1]}>
          <cylinderGeometry args={[0.6, 0.6, 1.2, 8]} />
          <meshStandardMaterial 
            color="#8b5cf6" 
            emissive="#8b5cf6" 
            emissiveIntensity={0.15}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={2}>
        <mesh position={[0, -2, -3]}>
          <octahedronGeometry args={[1]} />
          <meshStandardMaterial 
            color="#ff1493" 
            emissive="#ff1493" 
            emissiveIntensity={0.2}
            roughness={0.15}
            metalness={0.7}
          />
        </mesh>
      </Float>

      {/* Small particles */}
      {Array.from({ length: 6 }, (_, i) => (
        <Float key={i} speed={0.8 + Math.random() * 0.4} rotationIntensity={Math.random()} floatIntensity={0.5 + Math.random()}>
          <mesh position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 6
          ]}>
            <dodecahedronGeometry args={[0.15]} />
            <meshStandardMaterial 
              color={Math.random() > 0.5 ? "#00ffff" : "#ff69b4"} 
              emissive={Math.random() > 0.5 ? "#00ffff" : "#ff69b4"}
              emissiveIntensity={0.3}
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

interface About3DSceneProps {
  className?: string
}

export default function About3DScene({ className = "" }: About3DSceneProps) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Suspense fallback={<SceneLoading />}>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[8, 8, 8]} intensity={0.8} color="#00bfff" />
          <pointLight position={[-8, -8, -8]} intensity={0.4} color="#ff1493" />
          
          <About3DObjects />
          
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.3}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI - Math.PI / 4}
          />
        </Canvas>
      </Suspense>
    </div>
  )
}