uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;

varying vec2 vUv;

void main() {
  vec3 color = uColor1;

  // 下から上へのグラデーション
  if (vUv.y > 0.2) {
    float t = (vUv.y - 0.2) / 0.2;
    color = mix(uColor1, uColor2, t);
  }
  if (vUv.y > 0.4) {
    float t = (vUv.y - 0.4) / 0.04;
    color = mix(uColor2, uColor3, t);
  }
  if (vUv.y > 0.44) {
    float t = (vUv.y - 0.44) / 0.04;
    color = mix(uColor3, uColor4, t);
  }
  if (vUv.y > 0.48) {
    color = uColor4;
  }

  gl_FragColor = vec4(color, 1.0);
}
