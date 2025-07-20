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
          <ambientLight intensity={0.4} />
          <pointLight position={[0, 0, 0]} intensity={1.5} color="#FFD700" />
          <pointLight position={[10, -10, 15]} intensity={0.5} color="#CD5C5C" />
          
          <SolarSystem focusPlanets={['earth', 'mars', 'jupiter', 'saturn', 'neptune']} />
          
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