# キラキラ - XRift World

機動戦士ガンダム ジークアクスに登場する「キラキラ」を再現したXRiftワールドです。

## 概要

「キラキラ」は、ニュータイプが見る幻想的な光の空間です。このワールドでは、カラフルなグラデーション背景、流れるドットパーティクル、輝くスパークパーティクル、そして8層の回転する光のコーン（円錐）が複雑に重なり合い、神秘的な視覚体験を創り出します。

元となったエフェクト実装: [sawa-zen/portfolio/newtype](https://github.com/sawa-zen/portfolio/tree/main/newtype)

## 特徴

### パーティクルエフェクト

- **Background**: 4色のグラデーション背景（黄色→ピンク→ティール→ダークブルー）
- **DotParticles**: 奥から手前に流れる無数のドットパーティクル
- **SparkParticles**: 明滅するスパークエフェクト（テクスチャベース）
- **ConeParticles**: 8層の光の円錐レイヤー
  - 各層が異なる色、速度、ノイズ強度で回転
  - カスタムシェーダーによる流れるパターン
  - AdditiveBlending/NormalBlendingの組み合わせ

### テーマ

現在実装されているテーマ:
- **machu**: 元のNewtypeエフェクトの配色を忠実に再現
- **nyaan**: 別カラーバリエーション（参考実装）

## 技術スタック

- **React Three Fiber**: 3Dシーンのコンポーネント化
- **Three.js**: WebGLレンダリング
- **カスタムGLSLシェーダー**: パーティクルエフェクトの実装
- **Rapier物理エンジン**: 透明な床による歩行機能
- **XRift**: WebXRプラットフォーム対応

## 開発

### セットアップ

```bash
npm install
```

### 開発サーバー起動

```bash
npm run dev
```

http://localhost:5173 でローカル環境で確認できます。

### ビルド

```bash
npm run build
```

Module Federation形式でビルドされ、XRiftプラットフォームで読み込み可能な形式で `dist/` に出力されます。

### TypeScript型チェック

```bash
npm run typecheck
```

## プロジェクト構造

```
kirakira/
├── public/
│   └── spark.png              # スパークパーティクル用テクスチャ
├── src/
│   ├── components/
│   │   ├── Background/        # グラデーション背景
│   │   │   ├── index.tsx
│   │   │   ├── vertex.glsl
│   │   │   └── fragment.glsl
│   │   ├── DotParticles/      # ドットパーティクル
│   │   │   ├── index.tsx
│   │   │   ├── vertex.glsl
│   │   │   └── fragment.glsl
│   │   ├── SparkParticles/    # スパークパーティクル
│   │   │   ├── index.tsx
│   │   │   ├── vertex.glsl
│   │   │   └── fragment.glsl
│   │   └── ConeParticles/     # 光の円錐レイヤー
│   │       ├── index.tsx
│   │       ├── vertex.glsl
│   │       └── fragment.glsl
│   ├── World.tsx              # メインワールドコンポーネント
│   ├── constants.ts           # カラーテーマ定義
│   ├── dev.tsx                # 開発用エントリーポイント
│   └── index.tsx              # 本番用エクスポート
└── package.json
```

## カスタマイズ

### テーマの切り替え

`src/World.tsx` でテーマを変更できます：

```typescript
<World newtypeTheme="machu" />  // デフォルト
<World newtypeTheme="nyaan" />  // 別カラー
```

### 新しいテーマの追加

`src/constants.ts` の `NEWTYPE_THEMES` に新しいテーマを追加できます：

```typescript
export const NEWTYPE_THEMES = {
  machu: { /* ... */ },
  nyaan: { /* ... */ },
  yourTheme: {
    background: {
      color1: 0xFFFFFF,  // 最下部
      color2: 0xCCCCCC,
      color3: 0x888888,
      color4: 0x000000,  // 最上部
    },
    spark: 0xFFFFFF,
    cones: [
      // 8層の設定...
    ],
  },
}
```

### パラメータ調整

各ConeParticlesレイヤーは以下のパラメータで調整可能：
- `color`: レイヤーの色
- `position`, `scale`: 位置とスケール
- `streamSpeed`: 流れる速度
- `noiseStrength`: ノイズの強度
- `rotatingSpeed`: 回転速度
- `uvScaleX`, `uvScaleY`: UVスケール
- `blending`: 1=NormalBlending, 2=AdditiveBlending
- `startY`, `endY`: Y軸方向のグラデーション範囲
- `gaussian`: ガウシアンフィルター有効化

## ライセンス

MIT

## クレジット

元となったNewtypeエフェクト: [sawa-zen/portfolio](https://github.com/sawa-zen/portfolio)
