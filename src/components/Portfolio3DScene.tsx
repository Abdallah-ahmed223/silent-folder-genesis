
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import SolarSystem from './3d/SolarSystem'

// Loading fallback with space theme
function SceneLoading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        <p className="text-primary/60 font-medium font-mono text-xs">LOADING...</p>
      </div>
    </div>
  )
}

interface Portfolio3DSceneProps {
  className?: string
  opacity?: number
}

export default function Portfolio3DScene({ className = "", opacity = 0.3 }: Portfolio3DSceneProps) {
  return (
    <div className={`relative w-full h-full ${className}`} style={{ opacity }}>
      <Suspense fallback={<SceneLoading />}>
        <Canvas
          camera={{ position: [0, 5, 25], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
        >
          {/* Solar System Lighting */}
          <ambientLight intensity={0.3} />
          
          {/* Sun's light */}
          <pointLight position={[0, 0, 0]} intensity={1.5} color="#FFD700" />
          
          {/* Additional cosmic lighting */}
          <pointLight position={[20, 20, 20]} intensity={0.4} color="#ffffff" />
          <directionalLight position={[-20, 10, 10]} intensity={0.2} color="#87CEEB" />
          
          {/* Solar System - focused planets only */}
          <SolarSystem focusPlanets={['earth', 'mars', 'jupiter']} />
          
          {/* Interactive Camera Controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.2}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI - Math.PI / 4}
            maxAzimuthAngle={Math.PI / 6}
            minAzimuthAngle={-Math.PI / 6}
          />
        </Canvas>
      </Suspense>
    </div>
  )
}
