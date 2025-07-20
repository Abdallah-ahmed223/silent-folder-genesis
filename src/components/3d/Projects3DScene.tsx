import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import SolarSystem from './SolarSystem'

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
          <ambientLight intensity={0.3} />
          <pointLight position={[0, 0, 0]} intensity={1.2} color="#FFD700" />
          <pointLight position={[15, 10, 15]} intensity={0.4} color="#87CEEB" />
          
          <SolarSystem focusPlanets={['venus', 'earth', 'saturn', 'jupiter']} />
          
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