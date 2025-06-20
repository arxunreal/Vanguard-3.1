import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, Text3D, Center } from '@react-three/drei'
import * as THREE from 'three'

interface VanguardSceneProps {
  children: React.ReactNode
  intensity?: number
}

const VanguardLogo: React.FC = () => {
  const logoRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (logoRef.current) {
      logoRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      logoRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.5
    }
  })

  return (
    <group ref={logoRef} position={[0, 5, -20]}>
      <Center>
        <Text3D
          font="/fonts/helvetiker_bold.typeface.json"
          size={3}
          height={0.8}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.15}
          bevelSize={0.08}
          bevelOffset={0}
          bevelSegments={8}
        >
          VANGUARD
          <meshStandardMaterial color="#dc2626" metalness={0.9} roughness={0.1} />
        </Text3D>
      </Center>
    </group>
  )
}

const VanguardVLogo: React.FC = () => {
  const vLogoRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (vLogoRef.current) {
      vLogoRef.current.rotation.y = state.clock.elapsedTime * 0.3
      vLogoRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  // Create the exact V shape from your logo
  const createVShape = () => {
    const shape = new THREE.Shape()
    
    // White part of the V (left side)
    shape.moveTo(-2, 3)
    shape.lineTo(-0.3, -3)
    shape.lineTo(0.3, -3)
    shape.lineTo(-1.4, 3)
    shape.lineTo(-2, 3)
    
    return shape
  }

  const createVShapeRight = () => {
    const shape = new THREE.Shape()
    
    // Right side of the V
    shape.moveTo(2, 3)
    shape.lineTo(0.3, -3)
    shape.lineTo(-0.3, -3)
    shape.lineTo(1.4, 3)
    shape.lineTo(2, 3)
    
    return shape
  }

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={0.8}>
      <group ref={vLogoRef} position={[15, 5, -10]} scale={[2, 2, 2]}>
        {/* White part of V */}
        <mesh>
          <extrudeGeometry args={[createVShape(), { depth: 0.5, bevelEnabled: true, bevelThickness: 0.1, bevelSize: 0.05 }]} />
          <meshStandardMaterial color="#ffffff" metalness={0.3} roughness={0.2} />
        </mesh>
        
        {/* Dark part of V */}
        <mesh>
          <extrudeGeometry args={[createVShapeRight(), { depth: 0.5, bevelEnabled: true, bevelThickness: 0.1, bevelSize: 0.05 }]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.1} />
        </mesh>
      </group>
    </Float>
  )
}

const FloatingVanguardText: React.FC = () => {
  const textRefs = useRef<THREE.Group[]>([])
  
  useFrame((state) => {
    textRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.rotation.y = state.clock.elapsedTime * (0.1 + index * 0.05)
        ref.position.y = Math.sin(state.clock.elapsedTime * 0.5 + index) * 2
      }
    })
  })

  const positions = [
    [-25, 8, -15],
    [25, 12, -20],
    [-20, -2, -25],
    [20, -8, -15],
    [0, 18, -30],
    [-30, 2, -10],
    [30, 7, -25],
    [0, -15, -35],
    [-35, 15, -25],
    [35, 0, -20],
    [-15, 25, -40],
    [15, -20, -30]
  ]

  return (
    <>
      {positions.map((position, index) => (
        <Float key={index} speed={0.5 + index * 0.2} rotationIntensity={0.3} floatIntensity={0.5}>
          <group 
            ref={(el) => { if (el) textRefs.current[index] = el }}
            position={position as [number, number, number]}
            scale={[0.8, 0.8, 0.8]}
          >
            <Center>
              <Text3D
                font="/fonts/helvetiker_bold.typeface.json"
                size={1.5}
                height={0.3}
                curveSegments={8}
                bevelEnabled
                bevelThickness={0.05}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={3}
              >
                VANGUARD
                <meshStandardMaterial 
                  color="#dc2626" 
                  metalness={0.7} 
                  roughness={0.3} 
                  transparent 
                  opacity={0.6}
                />
              </Text3D>
            </Center>
          </group>
        </Float>
      ))}
    </>
  )
}

const GeometricStructures: React.FC = () => {
  const structuresRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (structuresRef.current) {
      structuresRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <group ref={structuresRef}>
      {/* Pillars */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 25
        return (
          <group key={i} position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}>
            <mesh>
              <cylinderGeometry args={[0.5, 0.8, 12, 8]} />
              <meshStandardMaterial color="#7f1d1d" metalness={0.7} roughness={0.3} />
            </mesh>
            <pointLight position={[0, 6, 0]} color="#dc2626" intensity={0.5} distance={10} />
          </group>
        )
      })}
      
      {/* Central platform */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[30, 32, 2, 32]} />
        <meshStandardMaterial color="#1f1f1f" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Floating rings */}
      {Array.from({ length: 3 }, (_, i) => (
        <Float key={i} speed={0.5 + i * 0.2} rotationIntensity={0.2} floatIntensity={0.3}>
          <mesh position={[0, 15 + i * 5, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[8 + i * 2, 0.3, 8, 32]} />
            <meshStandardMaterial color="#dc2626" transparent opacity={0.7} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

export const VanguardScene: React.FC<VanguardSceneProps> = ({ children, intensity = 1 }) => {
  return (
    <div className="relative">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 10, 30], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'linear-gradient(to bottom, #0f0f0f, #1a1a1a, #2d1b1b)' }}
        >
          <fog attach="fog" args={['#1a1a1a', 20, 100]} />
          
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={0.6} color="#ffffff" />
          <pointLight position={[0, 20, 0]} intensity={1.2} color="#dc2626" />
          <spotLight
            position={[0, 30, 0]}
            angle={0.3}
            penumbra={1}
            intensity={1}
            color="#dc2626"
            target-position={[0, 0, 0]}
          />

          {/* 3D Elements */}
          <GeometricStructures />
          <VanguardLogo />
          <VanguardVLogo />
          <FloatingVanguardText />
          
          {/* Environment */}
          <Environment preset="night" />
        </Canvas>
      </div>
      
      {/* UI Overlay - Now scrollable */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}