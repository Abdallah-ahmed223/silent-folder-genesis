import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { Group, Mesh } from 'three'

// Realistic planet materials and properties
const planetData = {
  mercury: { 
    size: 0.4, 
    color: "#8C7853", 
    emissive: "#4A4A4A", 
    roughness: 0.8, 
    metalness: 0.1,
    distance: 4,
    speed: 0.47
  },
  venus: { 
    size: 0.6, 
    color: "#FFC649", 
    emissive: "#FF8C00", 
    roughness: 0.9, 
    metalness: 0.0,
    distance: 5,
    speed: 0.35
  },
  earth: { 
    size: 0.65, 
    color: "#6B93D6", 
    emissive: "#4169E1", 
    roughness: 0.7, 
    metalness: 0.2,
    distance: 6,
    speed: 0.3
  },
  mars: { 
    size: 0.5, 
    color: "#CD5C5C", 
    emissive: "#B22222", 
    roughness: 0.8, 
    metalness: 0.1,
    distance: 7,
    speed: 0.24
  },
  jupiter: { 
    size: 1.2, 
    color: "#D8CA9D", 
    emissive: "#DAA520", 
    roughness: 0.6, 
    metalness: 0.3,
    distance: 9,
    speed: 0.13
  },
  saturn: { 
    size: 1.0, 
    color: "#FAD5A5", 
    emissive: "#DEB887", 
    roughness: 0.5, 
    metalness: 0.4,
    distance: 12,
    speed: 0.09
  },
  uranus: { 
    size: 0.8, 
    color: "#4FD0E7", 
    emissive: "#00CED1", 
    roughness: 0.3, 
    metalness: 0.6,
    distance: 15,
    speed: 0.06
  },
  neptune: { 
    size: 0.75, 
    color: "#4B70DD", 
    emissive: "#1E90FF", 
    roughness: 0.4, 
    metalness: 0.5,
    distance: 18,
    speed: 0.05
  }
}

interface PlanetProps {
  data: typeof planetData.earth
  planetKey: string
}

function Planet({ data, planetKey }: PlanetProps) {
  const planetRef = useRef<Mesh>(null)
  const orbitRef = useRef<Group>(null)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    // Planet rotation
    if (planetRef.current) {
      planetRef.current.rotation.y = time * 2
    }
    
    // Orbital movement
    if (orbitRef.current) {
      orbitRef.current.rotation.y = time * data.speed
    }
  })

  return (
    <group ref={orbitRef}>
      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <mesh ref={planetRef} position={[data.distance, 0, 0]}>
          <sphereGeometry args={[data.size, 32, 32]} />
          <meshStandardMaterial 
            color={data.color}
            emissive={data.emissive}
            emissiveIntensity={0.1}
            roughness={data.roughness}
            metalness={data.metalness}
          />
        </mesh>
      </Float>
      
      {/* Saturn's rings */}
      {planetKey === 'saturn' && (
        <mesh position={[data.distance, 0, 0]} rotation={[Math.PI / 6, 0, 0]}>
          <ringGeometry args={[1.2, 1.8, 32]} />
          <meshStandardMaterial 
            color="#C4B5A1"
            emissive="#8B7355"
            emissiveIntensity={0.05}
            transparent
            opacity={0.8}
            side={2}
          />
        </mesh>
      )}
    </group>
  )
}

function Sun() {
  const sunRef = useRef<Mesh>(null)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (sunRef.current) {
      sunRef.current.rotation.y = time * 0.1
    }
  })

  return (
    <Float speed={0.2} rotationIntensity={0.05} floatIntensity={0.1}>
      <mesh ref={sunRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial 
          color="#FFD700"
          emissive="#FF6347"
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.0}
        />
      </mesh>
    </Float>
  )
}

function AsteroidBelt() {
  const asteroids = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * Math.PI * 2 + Math.random() * 0.5
    const radius = 8 + Math.random() * 1
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    const y = (Math.random() - 0.5) * 0.3

    return (
      <Float key={i} speed={0.3 + Math.random() * 0.2} rotationIntensity={1} floatIntensity={0.5}>
        <mesh position={[x, y, z]}>
          <boxGeometry args={[0.05 + Math.random() * 0.1, 0.05 + Math.random() * 0.1, 0.05 + Math.random() * 0.1]} />
          <meshStandardMaterial 
            color="#696969"
            emissive="#2F2F2F"
            emissiveIntensity={0.02}
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>
      </Float>
    )
  })

  return <>{asteroids}</>
}

interface SolarSystemProps {
  showAllPlanets?: boolean
  focusPlanets?: (keyof typeof planetData)[]
}

export default function SolarSystem({ showAllPlanets = true, focusPlanets }: SolarSystemProps) {
  const systemRef = useRef<Group>(null)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (systemRef.current) {
      systemRef.current.rotation.y = time * 0.02
    }
  })

  const planetsToShow = focusPlanets || (showAllPlanets ? Object.keys(planetData) : ['earth', 'mars', 'jupiter'])

  return (
    <group ref={systemRef}>
      {/* Sun at center */}
      <Sun />
      
      {/* Planets */}
      {planetsToShow.map((planetKey) => (
        <Planet 
          key={planetKey} 
          data={planetData[planetKey as keyof typeof planetData]} 
          planetKey={planetKey}
        />
      ))}
      
      {/* Asteroid belt between Mars and Jupiter */}
      <AsteroidBelt />
      
      {/* Distant stars */}
      {Array.from({ length: 50 }, (_, i) => {
        const x = (Math.random() - 0.5) * 100
        const y = (Math.random() - 0.5) * 100
        const z = (Math.random() - 0.5) * 100
        
        return (
          <mesh key={`star-${i}`} position={[x, y, z]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial 
              color="#FFFFFF"
              transparent
              opacity={0.6 + Math.random() * 0.4}
            />
          </mesh>
        )
      })}
    </group>
  )
}