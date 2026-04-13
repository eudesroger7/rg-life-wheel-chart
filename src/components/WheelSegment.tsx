import { buildSegmentPath } from "../utils/geometry";

interface WheelSegmentProps {
  cx: number;
  cy: number;
  maxRadius: number;
  value: number;
  startAngle: number;
  endAngle: number;
  color: string;
  strokeColor: string;
  strokeWidth: number;
  label?: string;
  onClick?: () => void;
}

export function WheelSegment({
  cx,
  cy,
  maxRadius,
  value,
  startAngle,
  endAngle,
  color,
  strokeColor,
  strokeWidth,
  label,
  onClick,
}: WheelSegmentProps) {
  const clampedValue = Math.min(10, Math.max(0, value));
  const radius = (clampedValue / 10) * maxRadius;

  if (radius <= 0) return null;

  const d = buildSegmentPath(cx, cy, radius, startAngle, endAngle);

  return (
    <path
      d={d}
      fill={color}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      onClick={onClick}
      style={{
        cursor: onClick ? "pointer" : "default",
        transition: "opacity 0.2s",
        mixBlendMode: "multiply",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as SVGPathElement).style.opacity = "0.85";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as SVGPathElement).style.opacity = "1";
      }}
    >
      {label && <title>{label}</title>}
    </path>
  );
}
