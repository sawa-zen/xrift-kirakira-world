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
      {/* Background - グラデーション背景 (Newtype) */}
      <Background {...theme.background} />

      {/* DotParticles - ドットパーティクル (Newtype) */}
      <DotParticles />

      {/* SparkParticles - スパークパーティクル (Newtype) */}
      <SparkParticles baseColor={theme.spark} />

      {/* ConeParticles - コーンレイヤー (Newtype) - 8層構成 */}
      {theme.cones.map((cone, index) => (
        <ConeParticles
          key={index}
          baseColor={cone.color}
          streamSpeed={cone.streamSpeed}
          noiseStrength={cone.noiseStrength}
          rotatingSpeed={cone.rotatingSpeed}
          uvScaleX={cone.scale}
          uvScaleY={cone.scale}
          gaussian={cone.gaussian}
        />
      ))}
    </group>
  )
}
