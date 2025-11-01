export const WORLD_CONFIG = {
  size: 20,
  wallHeight: 5,
  wallThickness: 0.5,
} as const

export const COLORS = {
  ground: '#90EE90',
  wall: '#8B4513',
  decorations: {
    box: '#FF6347',
    cylinder: '#4169E1',
    sphere: '#FFD700',
  },
  lightPost: '#696969',
} as const

// Newtype カラーテーマ
export const NEWTYPE_THEMES = {
  machu: {
    background: {
      color1: 0xFDFAA0,
      color2: 0xEFA8D0,
      color3: 0x55BFBB,
      color4: 0x043344,
    },
    spark: 0x55BFBB,
    cones: [
      { position: [0, 0, 1], scale: [0.9, 0.9, 1.0], color: 0x005675, streamSpeed: 12.0, noiseStrength: 0.05, rotatingSpeed: -0.3, uvScaleX: 50.0, uvScaleY: 25.0, blending: 1, startY: 0.4, endY: 0.7, gaussian: true },
      { position: [0, 0, 1], scale: [2, 2, 1.0], color: 0x55BFBB, streamSpeed: 30.0, noiseStrength: 0.15, rotatingSpeed: 0.3, uvScaleX: 30.0, uvScaleY: 50.0, blending: 2, startY: 0.3, endY: 0.7, gaussian: true },
      { position: [0, 0, -18], scale: [2, 2, 0.2], color: 0x37817F, streamSpeed: 30.0, noiseStrength: 0.1, rotatingSpeed: -0.4, uvScaleX: 60.0, uvScaleY: 30.0, blending: 2, startY: 0.4, endY: 0.7, gaussian: false },
      { position: [0, 0, 1], scale: [3, 3, 1.5], color: 0x2CC1A3, streamSpeed: 40.0, noiseStrength: 0.1, rotatingSpeed: -0.2, uvScaleX: 60.0, uvScaleY: 60.0, blending: 2, startY: 0.3, endY: 0.7, gaussian: true },
      { position: [0, 0, -14], scale: [0.35, 0.35, 0.2], color: 0xFDFAA0, streamSpeed: 12.0, noiseStrength: 0.5, rotatingSpeed: 0.3, uvScaleX: 10.0, uvScaleY: 25.0, blending: 2, startY: 0.3, endY: 0.35, gaussian: false },
      { position: [0, 0, -18], scale: [0.5, 0.5, 0.1], color: 0xFE91CE, streamSpeed: 8.0, noiseStrength: 0.3, rotatingSpeed: -0.2, uvScaleX: 20.0, uvScaleY: 20.0, blending: 1, startY: 0.5, endY: 0.3, gaussian: false },
      { position: [0, 0, 1], scale: [0.4, 0.4, 1.0], color: 0xAAFC6C, streamSpeed: 18.0, noiseStrength: 0.05, rotatingSpeed: 0.5, uvScaleX: 50.0, uvScaleY: 25.0, blending: 2, startY: 0.4, endY: 0.7, gaussian: false },
      { position: [0, 0, 1], scale: [0.5, 0.5, 1.0], color: 0xED54AA, streamSpeed: 19.0, noiseStrength: 0.05, rotatingSpeed: -0.3, uvScaleX: 50.0, uvScaleY: 30.0, blending: 2, startY: 0.2, endY: 0.7, gaussian: false },
    ],
  },
  nyaan: {
    background: {
      color1: 0xfab95b,
      color2: 0x87cefa,
      color3: 0x9370db,
      color4: 0x274d6d,
    },
    spark: 0x9370db,
    cones: [
      { position: [0, 0, 1], scale: [0.9, 0.9, 1.0], color: 0x274d6d, streamSpeed: 12.0, noiseStrength: 0.05, rotatingSpeed: -0.3, uvScaleX: 50.0, uvScaleY: 25.0, blending: 1, startY: 0.4, endY: 0.7, gaussian: true },
      { position: [0, 0, 1], scale: [2, 2, 1.0], color: 0x004e8a, streamSpeed: 30.0, noiseStrength: 0.15, rotatingSpeed: 0.3, uvScaleX: 30.0, uvScaleY: 50.0, blending: 2, startY: 0.3, endY: 0.7, gaussian: true },
      { position: [0, 0, -18], scale: [2, 2, 0.2], color: 0x9370db, streamSpeed: 30.0, noiseStrength: 0.1, rotatingSpeed: -0.4, uvScaleX: 60.0, uvScaleY: 30.0, blending: 2, startY: 0.4, endY: 0.7, gaussian: false },
      { position: [0, 0, 1], scale: [3, 3, 1.5], color: 0x87cefa, streamSpeed: 40.0, noiseStrength: 0.1, rotatingSpeed: -0.2, uvScaleX: 60.0, uvScaleY: 60.0, blending: 2, startY: 0.3, endY: 0.7, gaussian: true },
      { position: [0, 0, -14], scale: [0.35, 0.35, 0.2], color: 0xffd700, streamSpeed: 12.0, noiseStrength: 0.5, rotatingSpeed: 0.3, uvScaleX: 10.0, uvScaleY: 25.0, blending: 2, startY: 0.3, endY: 0.35, gaussian: false },
      { position: [0, 0, -18], scale: [0.5, 0.5, 0.1], color: 0xf18904, streamSpeed: 8.0, noiseStrength: 0.3, rotatingSpeed: -0.2, uvScaleX: 20.0, uvScaleY: 20.0, blending: 1, startY: 0.5, endY: 0.3, gaussian: false },
      { position: [0, 0, 1], scale: [0.4, 0.4, 1.0], color: 0xffd700, streamSpeed: 18.0, noiseStrength: 0.05, rotatingSpeed: 0.5, uvScaleX: 50.0, uvScaleY: 25.0, blending: 2, startY: 0.4, endY: 0.7, gaussian: false },
      { position: [0, 0, 1], scale: [0.5, 0.5, 1.0], color: 0xfab95b, streamSpeed: 19.0, noiseStrength: 0.05, rotatingSpeed: -0.3, uvScaleX: 50.0, uvScaleY: 30.0, blending: 2, startY: 0.2, endY: 0.7, gaussian: false },
    ],
  },
} as const

export type NewtypeTheme = keyof typeof NEWTYPE_THEMES
