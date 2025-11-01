import { useMemo } from 'react'
import { BackSide, Color } from 'three'
// @ts-expect-error - Vite handles GLSL imports
import fragmentShader from './fragment.glsl?raw'
// @ts-expect-error - Vite handles GLSL imports
import vertexShader from './vertex.glsl?raw'

interface BackgroundProps {
  color1?: number
  color2?: number
  color3?: number
  color4?: number
}

export const Background: React.FC<BackgroundProps> = ({
  color1 = 0x000000,
  color2 = 0x1a1a2e,
  color3 = 0x16213e,
  color4 = 0x0f3460,
}) => {
  const uniforms = useMemo(
    () => ({
      uColor1: {
        value: new Color(color1),
      },
      uColor2: {
        value: new Color(color2),
      },
      uColor3: {
        value: new Color(color3),
      },
      uColor4: {
        value: new Color(color4),
      },
    }),
    [color1, color2, color3, color4]
  )

  return (
    <mesh rotation={[Math.PI / 2, 0, Math.PI / 2]} scale={[3, 15, 3]}>
      <sphereGeometry args={[15, 32, 8]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={BackSide}
      />
    </mesh>
  )
}
