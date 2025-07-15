import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Box, Torus, Float, Text3D, Environment } from '@react-three/drei'
import { Group, Mesh } from 'three'

// Animated floating geometric shapes
function FloatingGeometry() {
  const groupRef = useRef<Group>(null)
  const sphereRef = useRef<Mesh>(null)
  const boxRef = useRef<Mesh>(null)
  const torusRef = useRef<Mesh>(null)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1
    }
    
    if (sphereRef.current) {
      sphereRef.current.rotation.x = time * 0.5
      sphereRef.current.rotation.y = time * 0.3
    }
    
    if (boxRef.current) {
      boxRef.current.rotation.x = time * 0.4
      boxRef.current.rotation.z = time * 0.2
    }
    
    if (torusRef.current) {
      torusRef.current.rotation.x = time * 0.3
      torusRef.current.rotation.y = time * 0.6
    }
  })

  return (
    <group ref={groupRef}>
      {/* Floating Sphere */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <Sphere ref={sphereRef} args={[1, 32, 32]} position={[-4, 2, -2]}>
          <meshStandardMaterial 
            color="#00bfff" 
            emissive="#00bfff" 
            emissiveIntensity={0.2}
            roughness={0.1}
            metalness={0.8}
          />
        </Sphere>
      </Float>

      {/* Floating Box */}
      <Float speed={2} rotationIntensity={2} floatIntensity={1.5}>
        <Box ref={boxRef} args={[1.5, 1.5, 1.5]} position={[4, -1, -1]}>
          <meshStandardMaterial 
            color="#8b5cf6" 
            emissive="#8b5cf6" 
            emissiveIntensity={0.3}
            roughness={0.2}
            metalness={0.7}
          />
        </Box>
      </Float>

      {/* Floating Torus */}
      <Float speed={1.8} rotationIntensity={1.5} floatIntensity={2.5}>
        <Torus ref={torusRef} args={[1.2, 0.4, 16, 100]} position={[0, -3, -3]}>
          <meshStandardMaterial 
            color="#ff1493" 
            emissive="#ff1493" 
            emissiveIntensity={0.25}
            roughness={0.1}
            metalness={0.9}
          />
        </Torus>
      </Float>

      {/* Additional smaller elements */}
      {Array.from({ length: 12 }, (_, i) => (
        <Float key={i} speed={1 + Math.random()} rotationIntensity={Math.random() * 2} floatIntensity={1 + Math.random()}>
          <Sphere args={[0.1 + Math.random() * 0.2, 16, 16]} 
            position={[
              (Math.random() - 0.5) * 15,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10
            ]}>
            <meshStandardMaterial 
              color={Math.random() > 0.5 ? "#00ffff" : "#ff69b4"} 
              emissive={Math.random() > 0.5 ? "#00ffff" : "#ff69b4"}
              emissiveIntensity={0.4}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  )
}

// 3D Loading fallback
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
          {/* Lighting */}
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00bfff" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff1493" />
          <spotLight 
            position={[0, 10, 0]} 
            intensity={0.8} 
            color="#8b5cf6"
            angle={0.3}
            penumbra={1}
            castShadow
          />

          {/* Environment */}
          <Environment preset="night" />
          
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