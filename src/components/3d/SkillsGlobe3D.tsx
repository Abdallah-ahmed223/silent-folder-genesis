import { Suspense, useMemo, useRef, useState } from 'react'
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

/** Shared smoothed 0..1 split; updated once per frame in Scene */
type SmoothSplitRef = React.MutableRefObject<number>

function BigMergeCube({ smoothSplitRef }: { smoothSplitRef: SmoothSplitRef }) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!meshRef.current) return
    const split = smoothSplitRef.current
    const mergeAmount = 1 - THREE.MathUtils.smoothstep(split, 0.06, 0.34)
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.x = t * 0.18
    meshRef.current.rotation.y = t * 0.26
    const s = Math.max(0.001, mergeAmount * 1.45)
    meshRef.current.scale.setScalar(s)
    const mat = meshRef.current.material as THREE.MeshStandardMaterial
    mat.opacity = Math.min(1, mergeAmount * 1.4)
    meshRef.current.visible = mergeAmount > 0.015
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1.1, 1.1, 1.1]} />
      <meshStandardMaterial
        color="#2563eb"
        emissive="#1e1b4b"
        emissiveIntensity={0.45}
        metalness={0.88}
        roughness={0.18}
        transparent
        opacity={1}
      />
    </mesh>
  )
}

interface SkillCubeProps {
  target: [number, number, number]
  skill: Skill
  index: number
  smoothSplitRef: SmoothSplitRef
}

function SkillCube({ target, skill, index, smoothSplitRef }: SkillCubeProps) {
  const groupRef = useRef<THREE.Group>(null!)
  const labelRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const color = CATEGORY_COLORS[skill.category]

  useFrame((state) => {
    const g = groupRef.current
    if (!g) return
    const split = smoothSplitRef.current
    const spread = THREE.MathUtils.smoothstep(split, 0.06, 0.82)
    const t = state.clock.getElapsedTime()
    const eased = spread * spread * (3 - 2 * spread)
    g.position.set(target[0] * eased, target[1] * eased, target[2] * eased)
    g.rotation.x = t * 0.12 + index * 0.04
    g.rotation.y = t * 0.18 + index * 0.06
    const base = 0.32
    const hoverBoost = hovered ? 1.15 : 1
    const sc = Math.max(0.001, base * eased * hoverBoost)
    g.scale.setScalar(sc)

    const la = spread > 0.08 ? Math.min(1, (spread - 0.08) / 0.42) : 0
    const el = labelRef.current
    if (el) el.style.opacity = String(la * (hovered ? 1 : 0.88))
  })

  return (
    <group ref={groupRef}>
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = 'auto'
        }}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.95 : 0.42}
          metalness={0.75}
          roughness={0.28}
        />
      </mesh>
      <mesh raycast={() => null}>
        <boxGeometry args={[1.03, 1.03, 1.03]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.35} />
      </mesh>
      <Html position={[0, 0.75, 0]} center distanceFactor={7} style={{ pointerEvents: 'none', userSelect: 'none' }}>
        <div
          ref={labelRef}
          style={{
            padding: '4px 10px',
            borderRadius: '8px',
            background: `${color}22`,
            border: `1px solid ${color}`,
            color: '#ffffff',
            fontSize: '12px',
            fontWeight: 600,
            fontFamily: '"Exo 2", system-ui, sans-serif',
            whiteSpace: 'nowrap',
            backdropFilter: 'blur(8px)',
            textShadow: `0 0 8px ${color}`,
            opacity: 0,
            transition: 'opacity 240ms ease-out',
          }}
        >
          {skill.name}
        </div>
      </Html>
    </group>
  )
}

/** ~2–3: frame-rate independent; lower = slower expand/collapse */
const SPLIT_LAMBDA = 1.85

function Scene({ splitTarget }: { splitTarget: number }) {
  const positions = useMemo(() => fibonacciSphere(SKILLS.length, 4.2), [])
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
      const spread = THREE.MathUtils.smoothstep(split, 0.06, 0.82)
      const speed = 0.04 + spread * 0.05
      groupRef.current.rotation.y = state.clock.getElapsedTime() * speed
    }
  })

  return (
    <>
      <ambientLight intensity={0.45} />
      <pointLight position={[6, 6, 6]} intensity={1.1} />
      <pointLight position={[-6, -4, -2]} intensity={0.55} color="#a855f7" />
      <directionalLight position={[4, 8, 4]} intensity={0.35} />
      <Environment preset="city" />
      <BigMergeCube smoothSplitRef={smoothSplitRef} />
      <group ref={groupRef}>
        {SKILLS.map((skill, i) => (
          <SkillCube key={skill.name} skill={skill} target={positions[i]} index={i} smoothSplitRef={smoothSplitRef} />
        ))}
      </group>
      <EffectComposer>
        <Bloom intensity={0.65} luminanceThreshold={0.32} luminanceSmoothing={0.9} mipmapBlur kernelSize={2} />
      </EffectComposer>
    </>
  )
}

interface SkillsGlobe3DProps {
  className?: string
  /** 0 = single merged cube, 1 = cubes split with labels */
  splitProgress?: number
}

export default function SkillsGlobe3D({ className = '', splitProgress = 0 }: SkillsGlobe3DProps) {
  const [ref, inView] = useInView('100px')
  const [hover, setHover] = useState(false)
  const effectiveSplit = Math.min(1, splitProgress + (hover ? 0.4 : 0))

  return (
    <div
      ref={ref}
      className={`relative w-full ${className}`}
      style={{ minHeight: '600px' }}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
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
        >
          <Scene splitTarget={effectiveSplit} />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate
            autoRotate
            autoRotateSpeed={0.35 + effectiveSplit * 0.35}
            rotateSpeed={0.55}
          />
        </Canvas>
      </Suspense>
    </div>
  )
}

export { SKILLS, CATEGORY_COLORS }
