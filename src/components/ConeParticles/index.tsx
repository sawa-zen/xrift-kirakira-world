import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { AdditiveBlending, BackSide, Color, Group, Mesh, ShaderMaterial } from 'three'
// @ts-expect-error - Vite handles GLSL imports
import fragmentShader from './fragment.glsl?raw'
// @ts-expect-error - Vite handles GLSL imports
import vertexShader from './vertex.glsl?raw'

interface ConeParticlesProps {
  position?: [number, number, number]
  scale?: [number, number, number]
  baseColor?: number
  streamSpeed?: number
  noiseStrength?: number
  rotatingSpeed?: number
  gaussian?: boolean
  uvScaleX?: number
  uvScaleY?: number
}

export const ConeParticles: React.FC<ConeParticlesProps> = ({
  position = [0, 0, 0],
  scale = [1, 1, 1],
  baseColor = 0xffffff,
  streamSpeed = 1,
  noiseStrength = 0.5,
  rotatingSpeed = 1,
  gaussian = false,
  uvScaleX = 30.0,
  uvScaleY = 25.0,
}) => {
  const groupRef = useRef<Group>(null)
  const meshRef = useRef<Mesh>(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uStreamSpeed: { value: streamSpeed },
      uBaseColor: { value: new Color(baseColor) },
      uNoiseStrength: { value: noiseStrength },
      uStartY: { value: 0.3 },
      uEndY: { value: 0.7 },
      uUvScaleX: { value: uvScaleX },
      uUvScaleY: { value: uvScaleY },
      uGaussian: { value: gaussian ? 1 : 0 },
    }),
    [baseColor, streamSpeed, noiseStrength, gaussian, uvScaleX, uvScaleY]
  )

  // アニメーション: 時間を更新し、グループを回転
  useFrame((_, delta) => {
    if (meshRef.current && meshRef.current.material instanceof ShaderMaterial) {
      meshRef.current.material.uniforms.uTime.value += delta
    }
    if (groupRef.current) {
      groupRef.current.rotation.z += delta * rotatingSpeed
    }
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh ref={meshRef} rotation={[0, Math.PI / 2, -Math.PI / 2]}>
        <coneGeometry args={[10, 50, 32, 10, true]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          blending={AdditiveBlending}
          side={BackSide}
          depthWrite={false}
          depthTest={false}
        />
      </mesh>
    </group>
  )
}
