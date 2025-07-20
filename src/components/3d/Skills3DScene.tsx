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
          <ambientLight intensity={0.35} />
          <pointLight position={[0, 0, 0]} intensity={1.8} color="#FFD700" />
          <pointLight position={[-15, 5, 10]} intensity={0.6} color="#4B70DD" />
          
          <SolarSystem focusPlanets={['mercury', 'venus', 'earth', 'mars', 'uranus']} />
          
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