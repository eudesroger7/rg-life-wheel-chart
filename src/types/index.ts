import type { CSSProperties } from "react";

export type LabelVariant = "radial" | "aligned";

export interface LifeArea {
  /** Display label for the area */
  label: string;
  /** Score from 0 to 10 */
  value: number;
  /** Optional hex/hsl/rgb color. Auto-generated if omitted. */
  color?: string;
}

export interface LifeWheelProps {
  /** Array of life areas (1–50) */
  areas: LifeArea[];
  /** Number of concentric grid rings (default: 10) */
  gridLevels?: number;
  /** Grid line color (default: "#d1d5db") */
  gridColor?: string;
  /** Grid line opacity (default: 0.6) */
  gridOpacity?: number;
  /** Segment stroke color (default: "white") */
  strokeColor?: string;
  /** Segment stroke width in SVG units (default: 1.5) */
  strokeWidth?: number;
  /** Font size for labels in SVG units (default: 10) */
  labelFontSize?: number;
  /** Label text color (default: "#374151") */
  labelColor?: string;
  /** Extra padding between wheel and label (default: 12) */
  labelPadding?: number;
  /** Label layout variant: "radial" (along radius) or "aligned" (horizontal) (default: "radial") */
  labelVariant?: LabelVariant;
  /** Optional className for the container div */
  className?: string;
  /** Optional inline styles for the container div */
  style?: CSSProperties;
  /** Callback when a segment is clicked */
  onAreaClick?: (area: LifeArea, index: number) => void;
}
