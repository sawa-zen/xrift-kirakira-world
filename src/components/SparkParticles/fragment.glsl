uniform sampler2D uTexture;
uniform vec3 uBaseColor;

varying float vOpacity;
varying vec2 vUv;

void main() {
  // テクスチャから色を取得
  vec4 texColor = texture2D(uTexture, gl_PointCoord);

  // 輝度を計算
  float luminance = (texColor.r + texColor.g + texColor.b) / 3.0;

  // ベースカラーと白の間を輝度で補間
  vec3 white = vec3(1.0, 1.0, 1.0);
  vec3 finalColor = mix(uBaseColor, white, luminance);

  // アルファ値を計算
  float alpha = texColor.a * vOpacity * luminance;

  gl_FragColor = vec4(finalColor, alpha);
}
