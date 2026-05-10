import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls, Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { useInView } from './LazyMount'

interface Skill {
  name: string
  category: 'frameworks' | 'state' | 'styling' | 'devops'
}

const SKILLS: Skill[] = [
  { name: 'React', category: 'frameworks' },
  { name: 'Vue 3', category: 'frameworks' },
  { name: 'Next.js', category: 'frameworks' },
  { name: 'Inertia.js', category: 'frameworks' },
  { name: 'JavaScript', category: 'frameworks' },
  { name: 'TypeScript', category: 'frameworks' },
  { name: 'Redux Toolkit', category: 'state' },
  { name: 'TanStack Query', category: 'state' },
  { name: 'Zustand', category: 'state' },
  { name: 'Vuex', category: 'state' },
  { name: 'Tailwind CSS 4', category: 'styling' },
  { name: 'shadcn', category: 'styling' },
  { name: 'Reka UI', category: 'styling' },
  { name: 'MUI', category: 'styling' },
  { name: 'Bootstrap 5', category: 'styling' },
  { name: 'Sass', category: 'styling' },
  { name: 'Jest', category: 'devops' },
  { name: 'Vitest', category: 'devops' },
  { name: 'React Testing Library', category: 'devops' },
  { name: 'Docker', category: 'devops' },
  { name: 'CI/CD', category: 'devops' },
  { name: 'Git', category: 'devops' },
  { name: 'Core Web Vitals', category: 'devops' },
]

const CATEGORY_COLORS: Record<Skill['category'], string> = {
  frameworks: '#3b82f6',
  state: '#22d3ee',
  styling: '#a855f7',
  devops: '#10b981',
}

const SPLIT_LAMBDA = 1.85
/** Viewports under this width: no orbit/hover; only scroll-driven split + automatic motion. */
const MOBILE_SCROLL_ONLY_MAX_PX = 480
/** Extra group spin on small viewports (no OrbitControls autoRotate). */
const MOBILE_AUTO_SPIN_MULT = 1.35
type SmoothSplitRef = React.MutableRefObject<number>

function useSkillsScrollOnlyViewport() {
  const [active, setActive] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_SCROLL_ONLY_MAX_PX : false,
  )

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_SCROLL_ONLY_MAX_PX - 1}px)`)
    const sync = () => setActive(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return active
}

function fibonacciSphere(n: number, radius: number) {
  const points: [number, number, number][] = []
  const phi = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / Math.max(1, n - 1)) * 2
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = phi * i
    points.push([Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius])
  }
  return points
}

function CoreMetalCube({ smoothSplitRef }: { smoothSplitRef: SmoothSplitRef }) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!meshRef.current) return
    const split = smoothSplitRef.current
    const mergeAmount = 1 - THREE.MathUtils.smoothstep(split, 0.08, 0.4)
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.x = t * 0.14
    meshRef.current.rotation.y = t * 0.2
    meshRef.current.rotation.z = t * 0.06
    meshRef.current.position.y = Math.sin(t * 0.7) * 0.14
    const s = Math.max(0.001, 1 + mergeAmount * 0.9)
    meshRef.current.scale.setScalar(s)
    const mat = meshRef.current.material as THREE.MeshPhysicalMaterial
    mat.opacity = Math.min(1, 0.28 + mergeAmount * 0.72)
    meshRef.current.visible = mergeAmount > 0.015
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1.25, 1.25, 1.25]} />
      <meshPhysicalMaterial
        color="#7dd3fc"
        emissive="#2563eb"
        emissiveIntensity={0.24}
        metalness={0.2}
        roughness={0.08}
        clearcoat={1}
        clearcoatRoughness={0.05}
        reflectivity={1}
        transmission={0.65}
        thickness={0.8}
        ior={1.2}
        transparent
        opacity={1}
      />
    </mesh>
  )
}

function SkillCube({
  target,
  skill,
  index,
  smoothSplitRef,
  interactionDisabled,
}: {
  target: [number, number, number]
  skill: Skill
  index: number
  smoothSplitRef: SmoothSplitRef
  interactionDisabled: boolean
}) {
  const groupRef = useRef<THREE.Group>(null!)
  const labelRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const color = CATEGORY_COLORS[skill.category]
  const hoverOn = interactionDisabled ? false : hovered

  useFrame((state) => {
    const g = groupRef.current
    if (!g) return
    const split = smoothSplitRef.current
    const spread = THREE.MathUtils.smoothstep(split, 0.08, 0.86)
    const t = state.clock.getElapsedTime()
    const eased = spread * spread * (3 - 2 * spread)
    g.position.set(target[0] * eased, target[1] * eased, target[2] * eased)
    g.rotation.x = t * 0.11 + index * 0.02
    g.rotation.y = t * 0.17 + index * 0.05
    g.position.y += Math.sin(t * 1.05 + index * 0.37) * 0.045 * eased
    const base = 0.34
    const hoverBoost = hoverOn ? 1.16 : 1
    const sc = Math.max(0.001, base * eased * hoverBoost)
    g.scale.setScalar(sc)

    const la = spread > 0.12 ? Math.min(1, (spread - 0.12) / 0.34) : 0
    const el = labelRef.current
    if (el) el.style.opacity = String(la * (hoverOn ? 1 : 0.86))
  })

  const noopRaycast = () => null

  return (
    <group ref={groupRef}>
      <mesh
        raycast={interactionDisabled ? noopRaycast : undefined}
        onPointerOver={
          interactionDisabled
            ? undefined
            : (e) => {
                e.stopPropagation()
                setHovered(true)
                document.body.style.cursor = 'pointer'
              }
        }
        onPointerOut={
          interactionDisabled
            ? undefined
            : () => {
                setHovered(false)
                document.body.style.cursor = 'auto'
              }
        }
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hoverOn ? 0.55 : 0.22}
          metalness={0.22}
          roughness={hoverOn ? 0.08 : 0.14}
          clearcoat={1}
          clearcoatRoughness={0.05}
          reflectivity={1}
          transmission={0.5}
          thickness={0.55}
          ior={1.17}
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh raycast={() => null}>
        <boxGeometry args={[1.05, 1.05, 1.05]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={hoverOn ? 0.5 : 0.3} />
      </mesh>
      <Html position={[0, 0.78, 0]} center distanceFactor={7.5} style={{ pointerEvents: 'none', userSelect: 'none' }}>
        <div
          ref={labelRef}
          style={{
            padding: '4px 10px',
            borderRadius: '8px',
            background: `${color}20`,
            border: `1px solid ${color}`,
            color: '#ffffff',
            fontSize: '12px',
            fontWeight: 600,
            fontFamily: '"Exo 2", system-ui, sans-serif',
            whiteSpace: 'nowrap',
            backdropFilter: 'blur(8px)',
            textShadow: `0 0 8px ${color}`,
            opacity: 0,
            transition: 'opacity 220ms ease-out',
          }}
        >
          {skill.name}
        </div>
      </Html>
    </group>
  )
}

function Scene({ splitTarget, scrollOnly }: { splitTarget: number; scrollOnly: boolean }) {
  const positions = useMemo(() => fibonacciSphere(SKILLS.length, 4.3), [])
  const groupRef = useRef<THREE.Group>(null!)
  const targetRef = useRef(splitTarget)
  const smoothSplitRef = useRef(splitTarget)
  targetRef.current = splitTarget

  useFrame((state, delta) => {
    const tgt = THREE.MathUtils.clamp(targetRef.current, 0, 1)
    const alpha = 1 - Math.exp(-SPLIT_LAMBDA * delta)
    smoothSplitRef.current += (tgt - smoothSplitRef.current) * alpha

    if (groupRef.current) {
      const split = smoothSplitRef.current
      const spread = THREE.MathUtils.smoothstep(split, 0.08, 0.86)
      const baseSpeed = 0.045 + spread * 0.055
      const speed = scrollOnly ? baseSpeed * MOBILE_AUTO_SPIN_MULT : baseSpeed
      groupRef.current.rotation.y = state.clock.getElapsedTime() * speed
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[6, 6, 7]} intensity={0.9} color="#7dd3fc" />
      <pointLight position={[-6, -5, -3]} intensity={0.62} color="#a855f7" />
      <directionalLight position={[4, 8, 4]} intensity={0.28} />
      <Environment preset="city" />
      <CoreMetalCube smoothSplitRef={smoothSplitRef} />
      <group ref={groupRef}>
        {SKILLS.map((skill, i) => (
          <SkillCube
            key={skill.name}
            skill={skill}
            target={positions[i]}
            index={i}
            smoothSplitRef={smoothSplitRef}
            interactionDisabled={scrollOnly}
          />
        ))}
      </group>
      <EffectComposer>
        <Bloom intensity={0.52} luminanceThreshold={0.32} luminanceSmoothing={0.9} mipmapBlur kernelSize={2} />
      </EffectComposer>
    </>
  )
}

interface SkillsGlobe3DProps {
  className?: string
  splitProgress?: number
}

export default function SkillsGlobe3D({ className = '', splitProgress = 0 }: SkillsGlobe3DProps) {
  const [ref, inView] = useInView('100px')
  const [hover, setHover] = useState(false)
  const scrollOnly = useSkillsScrollOnlyViewport()
  const effectiveSplit = scrollOnly ? splitProgress : Math.min(1, splitProgress + (hover ? 0.42 : 0))

  useEffect(() => {
    if (scrollOnly) setHover(false)
  }, [scrollOnly])

  return (
    <div
      ref={ref}
      className={`relative w-full ${className}`}
      style={{ minHeight: '600px' }}
      onPointerEnter={scrollOnly ? undefined : () => setHover(true)}
      onPointerLeave={scrollOnly ? undefined : () => setHover(false)}
    >
      <Suspense
        fallback={
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <Canvas
          frameloop={inView ? 'always' : 'never'}
          camera={{ position: [0, 0, 10.5], fov: 52 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.75]}
          style={scrollOnly ? { touchAction: 'pan-y' } : undefined}
        >
          <Scene splitTarget={effectiveSplit} scrollOnly={scrollOnly} />
          {!scrollOnly && (
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              enableRotate
              autoRotate
              autoRotateSpeed={0.34 + effectiveSplit * 0.35}
              rotateSpeed={0.55}
            />
          )}
        </Canvas>
      </Suspense>
    </div>
  )
}

export { SKILLS, CATEGORY_COLORS }
