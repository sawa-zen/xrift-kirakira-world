import { useXRift } from '@xrift/world-components'
import { useFrame, useLoader } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, DoubleSide, ShaderMaterial, TextureLoader } from 'three'
// @ts-expect-error - Vite handles GLSL imports
import fragmentShader from './fragment.glsl?raw'
// @ts-expect-error - Vite handles GLSL imports
import vertexShader from './vertex.glsl?raw'

const PARTICLE_COUNT = 200

interface SparkParticlesProps {
  baseColor?: number
}

export const SparkParticles: React.FC<SparkParticlesProps> = ({
  baseColor = 0x0078ff,
}) => {
  const { baseUrl } = useXRift()
  const geometryRef = useRef<BufferGeometry>(null)
  const materialRef = useRef<ShaderMaterial>(null)

  // テクスチャを読み込み
  const texture = useLoader(TextureLoader, `${baseUrl}spark.png`)

  // パーティクルの初期位置とUVを生成
  const { positions, uvs } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3)
    const uv = new Float32Array(PARTICLE_COUNT * 2)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 10 // x: -5 ~ 5
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10 // y: -5 ~ 5
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40 // z: -20 ~ 20
      uv[i * 2 + 0] = Math.random() // u: 0 ~ 1
      uv[i * 2 + 1] = Math.random() // v: 0 ~ 1
    }
    return { positions: pos, uvs: uv }
  }, [])

  // ジオメトリに位置データとUVを設定
  useEffect(() => {
    if (geometryRef.current) {
      geometryRef.current.setAttribute('position', new BufferAttribute(positions, 3))
      geometryRef.current.setAttribute('uv', new BufferAttribute(uvs, 2))
    }
  }, [positions, uvs])

  // アニメーション: 時間を更新
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uBaseColor: { value: new Color(baseColor) },
      uTexture: { value: texture },
      uMinPointSize: { value: 0.5 },
      uMaxPointSize: { value: 150.0 },
      uDistanceNormalizeFactor: { value: 10.0 },
    }),
    [baseColor, texture]
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
        blending={AdditiveBlending}
        depthWrite={false}
        side={DoubleSide}
      />
    </points>
  )
}
