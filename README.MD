<!-- README.md -->

# rg-life-wheel-chart

A dynamic, zero-dependency Life Wheel Chart component for React and Next.js.
Built with pure SVG — no canvas, no third-party chart libraries.

## Features

- Supports **1 to 50** life areas dynamically
- Auto-generated chromatic color palette — override per area as needed
- Fully **responsive** via SVG viewBox
- Clean, typed API with full TypeScript support
- Compatible with React 17+ and Next.js (App Router & Pages Router)

## Installation

```bash
npm install rg-life-wheel-chart
# or
yarn add rg-life-wheel-chart
# or
pnpm add rg-life-wheel-chart
```

## Basic Usage

```tsx
import { LifeWheel } from "rg-life-wheel-chart";

const areas = [
  { label: "Health", value: 8 },
  { label: "Career", value: 6 },
  { label: "Love", value: 7 },
  { label: "Family", value: 5 },
  { label: "Spirituality", value: 4 },
  { label: "Money", value: 6 },
  { label: "Fun", value: 9 },
  { label: "Friends", value: 7 },
];

export default function App() {
  return <LifeWheel areas={areas} />;
}
```

## Custom Colors

```tsx
const areas = [
  { label: "Health", value: 8, color: "#f43f5e" },
  { label: "Career", value: 6, color: "#6366f1" },
  { label: "Love", value: 7 }, // auto-colored
];

<LifeWheel areas={areas} />;
```

## Props

| Prop            | Type                    | Default     | Description                         |
| --------------- | ----------------------- | ----------- | ----------------------------------- |
| `areas`         | `LifeArea[]`            | required    | Array of life areas (1–50)          |
| `gridLevels`    | `number`                | `10`        | Number of concentric rings          |
| `gridColor`     | `string`                | `"#d1d5db"` | Grid line color                     |
| `gridOpacity`   | `number`                | `0.6`       | Grid line opacity                   |
| `strokeColor`   | `string`                | `"white"`   | Segment border color                |
| `strokeWidth`   | `number`                | `1.5`       | Segment border width                |
| `labelFontSize` | `number`                | `9`         | Label font size (SVG units)         |
| `labelColor`    | `string`                | `"#374151"` | Label text color                    |
| `labelPadding`  | `number`                | `12`        | Space between wheel edge and labels |
| `className`     | `string`                | —           | CSS class for the wrapper div       |
| `style`         | `CSSProperties`         | —           | Inline styles for the wrapper div   |
| `onAreaClick`   | `(area, index) => void` | —           | Click handler for segments          |

## LifeArea Interface

```typescript
interface LifeArea {
  label: string; // display name
  value: number; // score from 0 to 10
  color?: string; // any valid CSS color (hex, hsl, rgb...)
}
```

## Next.js (App Router)

If using the App Router, add `"use client"` to the file that imports the component since it uses React hooks internally.

```tsx
"use client";
import { LifeWheel } from "rg-life-wheel-chart";
```

## License

MIT
