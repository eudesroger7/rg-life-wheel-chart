import { polarToCartesian } from "../utils/geometry";

interface WheelGridProps {
  cx: number;
  cy: number;
  maxRadius: number;
  levels: number;
  segmentCount: number;
  color: string;
  opacity: number;
}

export function WheelGrid({
  cx,
  cy,
  maxRadius,
  levels,
  segmentCount,
  color,
  opacity,
}: WheelGridProps) {
  const radii = Array.from(
    { length: levels },
    (_, i) => ((i + 1) / levels) * maxRadius,
  );

  const radialLines = Array.from({ length: segmentCount }, (_, i) => {
    const angle = (i / segmentCount) * 2 * Math.PI - Math.PI / 2;
    const end = polarToCartesian(cx, cy, maxRadius, angle);
    return { x2: end.x, y2: end.y };
  });

  return (
    <g stroke={color} strokeOpacity={opacity} fill="none">
      {radii.map((r) => (
        <circle key={r} cx={cx} cy={cy} r={r} strokeWidth={0.8} />
      ))}

      {radialLines.map((line, i) => (
        <line
          key={i}
          x1={cx}
          y1={cy}
          x2={line.x2}
          y2={line.y2}
          strokeWidth={0.8}
        />
      ))}
    </g>
  );
}
