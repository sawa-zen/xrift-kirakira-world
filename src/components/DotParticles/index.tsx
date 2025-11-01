import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { BufferAttribute, BufferGeometry, DoubleSide, ShaderMaterial } from 'three'
// @ts-expect-error - Vite handles GLSL imports
import fragmentShader from './fragment.glsl?raw'
// @ts-expect-error - Vite handles GLSL imports
import vertexShader from './vertex.glsl?raw'

const PARTICLE_COUNT = 500

export const DotParticles: React.FC = () => {
  const geometryRef = useRef<BufferGeometry>(null)
  const materialRef = useRef<ShaderMaterial>(null)

  // パーティクルの初期位置を生成
  const positions = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 20 // x: -10 ~ 10
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20 // y: -10 ~ 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40 // z: -20 ~ 20
    }
    return pos
  }, [])

  // ジオメトリに位置データを設定
  useEffect(() => {
    if (geometryRef.current) {
      geometryRef.current.setAttribute('position', new BufferAttribute(positions, 3))
    }
  }, [positions])

  // アニメーション: 時間を更新
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  )

  return (
    <points>
      <bufferGeometry ref={geometryRef} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite
        side={DoubleSide}
      />
    </points>
  )
}
