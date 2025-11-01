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
      color1: 0xfab95b,
      color2: 0xf98b88,
      color3: 0x52d3d8,
      color4: 0x274d6d,
    },
    spark: 0x52d3d8,
    cones: [
      { color: 0x274d6d, streamSpeed: 12.0, noiseStrength: 0.05, rotatingSpeed: -0.3, scale: 0.9, gaussian: true },
      { color: 0x004e8a, streamSpeed: 30.0, noiseStrength: 0.15, rotatingSpeed: 0.3, scale: 2.0, gaussian: true },
      { color: 0x8fbbaf, streamSpeed: 30.0, noiseStrength: 0.1, rotatingSpeed: -0.4, scale: 2.0, gaussian: false },
      { color: 0xf98b88, streamSpeed: 40.0, noiseStrength: 0.1, rotatingSpeed: -0.2, scale: 3.0, gaussian: true },
      { color: 0xe6d72a, streamSpeed: 12.0, noiseStrength: 0.5, rotatingSpeed: 0.3, scale: 0.35, gaussian: false },
      { color: 0xf18904, streamSpeed: 8.0, noiseStrength: 0.3, rotatingSpeed: -0.2, scale: 0.5, gaussian: false },
      { color: 0x9acd32, streamSpeed: 18.0, noiseStrength: 0.05, rotatingSpeed: 0.5, scale: 0.4, gaussian: false },
      { color: 0xf18904, streamSpeed: 19.0, noiseStrength: 0.05, rotatingSpeed: -0.3, scale: 0.5, gaussian: false },
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
      { color: 0x274d6d, streamSpeed: 12.0, noiseStrength: 0.05, rotatingSpeed: -0.3, scale: 0.9, gaussian: true },
      { color: 0x004e8a, streamSpeed: 30.0, noiseStrength: 0.15, rotatingSpeed: 0.3, scale: 2.0, gaussian: true },
      { color: 0x9370db, streamSpeed: 30.0, noiseStrength: 0.1, rotatingSpeed: -0.4, scale: 2.0, gaussian: false },
      { color: 0x87cefa, streamSpeed: 40.0, noiseStrength: 0.1, rotatingSpeed: -0.2, scale: 3.0, gaussian: true },
      { color: 0xffd700, streamSpeed: 12.0, noiseStrength: 0.5, rotatingSpeed: 0.3, scale: 0.35, gaussian: false },
      { color: 0xf18904, streamSpeed: 8.0, noiseStrength: 0.3, rotatingSpeed: -0.2, scale: 0.5, gaussian: false },
      { color: 0xffd700, streamSpeed: 18.0, noiseStrength: 0.05, rotatingSpeed: 0.5, scale: 0.4, gaussian: false },
      { color: 0xfab95b, streamSpeed: 19.0, noiseStrength: 0.05, rotatingSpeed: -0.3, scale: 0.5, gaussian: false },
    ],
  },
} as const

export type NewtypeTheme = keyof typeof NEWTYPE_THEMES
