import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Environment } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import { useInView } from './LazyMount'

/** Distant starfield — primary “space” layer */
function ParticleField() {
  const ref = useRef<THREE.Points>(null!)

  const particles = useMemo(() => {
    const count = 2800
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 8 + Math.random() * 36
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }
    return positions
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime()
    ref.current.rotation.y = t * 0.035
    ref.current.rotation.x = t * 0.015
  })

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#c4e9ff"
        size={0.042}
        sizeAttenuation
        depthWrite={false}
        opacity={0.9}
      />
    </Points>
  )
}

/** Fainter secondary layer for depth */
function DistantHaze() {
  const ref = useRef<THREE.Points>(null!)

  const positions = useMemo(() => {
    const count = 900
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 28 + Math.random() * 40
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime()
    ref.current.rotation.y = t * 0.018
    ref.current.rotation.x = t * 0.01
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#6366f180"
        size={0.09}
        sizeAttenuation
        depthWrite={false}
        opacity={0.35}
      />
    </Points>
  )
}

function Scene({
  enablePostProcessing,
  enableChromaticAberration,
}: {
  enablePostProcessing: boolean
  enableChromaticAberration: boolean
}) {
  return (
    <>
      <ambientLight intensity={0.12} />
      <pointLight position={[12, 8, 8]} intensity={0.55} color="#60a5fa" />
      <pointLight position={[-10, -6, -4]} intensity={0.35} color="#a78bfa" />
      <directionalLight position={[0, 2, 12]} intensity={0.18} color="#38bdf8" />

      <Environment preset="night" />

      <ParticleField />
      <DistantHaze />

      {enablePostProcessing && (
        <EffectComposer>
          <Bloom
            intensity={0.55}
            luminanceThreshold={0.65}
            luminanceSmoothing={0.92}
            mipmapBlur
            kernelSize={2}
          />
          {enableChromaticAberration ? (
            <ChromaticAberration
              offset={[0.0005, 0.0005]}
              radialModulation={false}
              modulationOffset={0}
              blendFunction={BlendFunction.NORMAL}
            />
          ) : (
            <></>
          )}
          <Vignette eskil={false} offset={0.18} darkness={0.72} />
        </EffectComposer>
      )}
    </>
  )
}

interface HeroScene3DProps {
  className?: string
}

export default function HeroScene3D({ className = '' }: HeroScene3DProps) {
  const [ref, inView] = useInView('100px')

  const { enablePostProcessing, enableChromaticAberration } = useMemo(() => {
    if (typeof window === 'undefined') {
      return { enablePostProcessing: false, enableChromaticAberration: false }
    }
    return {
      enablePostProcessing: window.matchMedia('(min-width: 1024px)').matches,
      enableChromaticAberration: window.matchMedia('(min-width: 1920px)').matches,
    }
  }, [])

  return (
    <div ref={ref} className={`absolute inset-0 ${className}`}>
      <Suspense fallback={null}>
        <Canvas
          frameloop={inView ? 'always' : 'never'}
          camera={{ position: [0, 0, 10], fov: 58 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.75]}
        >
          <Scene
            enablePostProcessing={enablePostProcessing}
            enableChromaticAberration={enableChromaticAberration}
          />
        </Canvas>
      </Suspense>
    </div>
  )
}
