uniform float uTime;
varying vec2 vUv;
uniform float uNoiseStrength;
uniform vec3 uBaseColor;
uniform float uStartY;
uniform float uEndY;
uniform float uStreamSpeed;
uniform float uUvScaleX;
uniform float uUvScaleY;
uniform int uGaussian;

/**
 * 乱数生成
 * @param {vec2} st 位置
 * 参考: https://nogson2.hatenablog.com/entry/2017/11/18/150645
 * 参考: https://thebookofshaders.com/11/?lan=jp
 */
float generateRandomFloat(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

/**
  * バリューノイズ
  * @param {vec2} st 位置
  * 参考: https://nogson2.hatenablog.com/entry/2017/11/18/150645
  * 参考: https://thebookofshaders.com/11/?lan=jp
  */
float generateValueNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

  float a = generateRandomFloat(i);
  float b = generateRandomFloat(i + vec2(1.0, 0.0));
  float c = generateRandomFloat(i + vec2(0.0, 1.0));
  float d = generateRandomFloat(i + vec2(1.0, 1.0));

  vec2 u = f*f*(3.0-2.0*f);

  return mix(a, b, u.x) +
    (c - a)* u.y * (1.0 - u.x) +
    (d - b) * u.x * u.y;
}

/**
 * HSVからRGBへの変換
 * @param {vec3} hsv HSV
 */
vec3 hsv2rgb(vec3 hsv) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(hsv.xxx + K.xyz) * 6.0 - K.www);
  return hsv.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), hsv.y);
}

/**
 * ドットパターンのアルファ値を計算
 */
float calculateDotAlpha(vec2 uv, bool useBlur) {
  float x = sin(uv.x * 6.28318530718) * 0.5 + 0.5;
  vec2 pos = vec2(x * uUvScaleX, uv.y * uUvScaleY + uTime * uStreamSpeed);

  float dots;
  if (useBlur) {
    // 縦方向ブラー：UV座標のY方向を微調整してノイズをサンプリング
    float offset = 0.008; // 0.003→0.008に増加（ブラー強く）
    float noise1 = generateValueNoise(vec2(pos.x, pos.y - offset));
    float noise2 = generateValueNoise(pos);
    float noise3 = generateValueNoise(vec2(pos.x, pos.y + offset));

    // 3サンプルの重み付き平均
    float valueNoise = noise1 * 0.25 + noise2 * 0.5 + noise3 * 0.25;

    // smoothstepでさらに滑らかに（範囲を広げてブラー強化）
    float threshold = 1.0 - uNoiseStrength;
    dots = smoothstep(threshold - 0.15, threshold + 0.15, valueNoise); // 0.05→0.15に増加
  } else {
    // ブラーなし
    float valueNoise = generateValueNoise(pos);
    dots = step(1.0 - uNoiseStrength, valueNoise);
  }

  float fadeIn = smoothstep(1.0 - uStartY, 1.0 - (uStartY+0.1), uv.y);
  float fadeOut = smoothstep(0.0, 1.0 - uEndY, uv.y);
  return dots * 0.7 * fadeIn * fadeOut;
}

/**
 * ブラー処理
 */
float applyBlur(vec2 uv) {
  bool useBlur = uGaussian >= 1;
  return calculateDotAlpha(uv, useBlur);
}

void main() {
  float blurredAlpha = applyBlur(vUv);
  gl_FragColor = vec4(uBaseColor, blurredAlpha);
}
