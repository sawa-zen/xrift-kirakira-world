import { RigidBody } from '@react-three/rapier'
import { Background } from './components/Background'
import { ConeParticles } from './components/ConeParticles'
import { DotParticles } from './components/DotParticles'
import { SparkParticles } from './components/SparkParticles'
import { NEWTYPE_THEMES, NewtypeTheme } from './constants'

export interface WorldProps {
  position?: [number, number, number]
  scale?: number
  newtypeTheme?: NewtypeTheme
}

export const World: React.FC<WorldProps> = ({
  position = [0, 0, 0],
  scale = 1,
  newtypeTheme = 'machu',
}) => {
  const theme = NEWTYPE_THEMES[newtypeTheme]

  return (
    <group position={position} scale={scale}>
      {/* カメラ位置を [0, 0, 1] に固定できないため、ワールド全体を z=-1 に移動 */}
      {/* アバターの目線の高さ（約1.6m）を考慮して y=1.6 に配置 */}
      <group position={[0, 1.6, -30]}>
        {/* Background - グラデーション背景 (Newtype) */}
        <Background {...theme.background} />
        {/* ConeParticles - コーンレイヤー (Newtype) - 8層構成 */}
        {theme.cones.map((cone, index) => (
          <ConeParticles
            key={index}
            position={cone.position as [number, number, number]}
            scale={cone.scale as [number, number, number]}
            baseColor={cone.color}
            streamSpeed={cone.streamSpeed}
            noiseStrength={cone.noiseStrength}
            rotatingSpeed={cone.rotatingSpeed}
            uvScaleX={cone.uvScaleX}
            uvScaleY={cone.uvScaleY}
            blending={cone.blending}
            startY={cone.startY}
            endY={cone.endY}
            gaussian={cone.gaussian}
          />
        ))}

      </group>

      {/* DotParticles - ドットパーティクル (Newtype) */}
      <DotParticles />

      {/* SparkParticles - スパークパーティクル (Newtype) */}
      <SparkParticles baseColor={theme.spark} />

      {/* 透明な床 - 歩行用（カメラ位置 [0, 0, 0] 基準） */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[100, 100]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      </RigidBody>
    </group>
  )
}
