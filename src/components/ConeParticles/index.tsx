import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { Color, Group, ShaderMaterial } from 'three'
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
  rotatingSpeed = 0.1,
  gaussian = false,
  uvScaleX = 1,
  uvScaleY = 1,
}) => {
  const groupRef = useRef<Group>(null)
  const materialRef = useRef<ShaderMaterial>(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uStreamSpeed: { value: streamSpeed },
      uBaseColor: { value: new Color(baseColor) },
      uNoiseStrength: { value: noiseStrength },
      uStartY: { value: -25 },
      uEndY: { value: 25 },
      uUvScaleX: { value: uvScaleX },
      uUvScaleY: { value: uvScaleY },
      uGaussian: { value: gaussian },
    }),
    [baseColor, streamSpeed, noiseStrength, gaussian, uvScaleX, uvScaleY]
  )

  // アニメーション: 時間を更新し、グループを回転
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
    if (groupRef.current) {
      groupRef.current.rotation.y += rotatingSpeed * 0.01
    }
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh>
        <coneGeometry args={[10, 50, 32, 10, true]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
        />
      </mesh>
    </group>
  )
}
