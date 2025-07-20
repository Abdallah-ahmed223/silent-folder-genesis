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
          <ambientLight intensity={0.4} />
          <pointLight position={[0, 0, 0]} intensity={1.5} color="#FFD700" />
          <directionalLight position={[10, 10, 10]} intensity={0.3} color="#ffffff" />
          
          <SolarSystem focusPlanets={['earth', 'mars', 'jupiter']} />
          
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