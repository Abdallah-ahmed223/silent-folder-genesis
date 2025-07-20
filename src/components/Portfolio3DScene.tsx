import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import SolarSystem from './3d/SolarSystem'

// Loading fallback with space theme
function SceneLoading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4 nebula-pulse"></div>
        <p className="text-primary font-medium font-mono">INITIALIZING SPACE ENVIRONMENT...</p>
        <div className="text-xs text-accent font-mono mt-2">◉ LOADING COSMIC ELEMENTS</div>
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
          camera={{ position: [0, 5, 25], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          {/* Solar System Lighting */}
          <ambientLight intensity={0.3} />
          
          {/* Sun's light */}
          <pointLight position={[0, 0, 0]} intensity={2} color="#FFD700" />
          
          {/* Additional cosmic lighting */}
          <pointLight position={[20, 20, 20]} intensity={0.5} color="#ffffff" />
          <directionalLight position={[-20, 10, 10]} intensity={0.3} color="#87CEEB" />
          
          {/* Solar System */}
          <SolarSystem showAllPlanets={true} />
          
          {/* Interactive Camera Controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.3}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI - Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
            minAzimuthAngle={-Math.PI / 4}
          />
        </Canvas>
      </Suspense>
    </div>
  )
}