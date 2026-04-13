import { polarToCartesian, getLabelAlignment } from "../utils/geometry";

interface WheelLabelProps {
  cx: number;
  cy: number;
  labelRadius: number;
  midAngle: number;
  label: string;
  fontSize: number;
  color: string;
}

export function WheelLabel({
  cx,
  cy,
  labelRadius,
  midAngle,
  label,
  fontSize,
  color,
}: WheelLabelProps) {
  const position = polarToCartesian(cx, cy, labelRadius, midAngle);
  const { textAnchor, dominantBaseline } = getLabelAlignment(midAngle);
  const alignedTextAnchor = textAnchor as
    | "start"
    | "middle"
    | "end"
    | "inherit";
  const alignedDominantBaseline = dominantBaseline as
    | "middle"
    | "inherit"
    | "auto"
    | "use-script"
    | "no-change"
    | "reset-size"
    | "ideographic"
    | "alphabetic"
    | "hanging"
    | "mathematical"
    | "central"
    | "text-after-edge"
    | "text-before-edge"
    | undefined;

  const words = label.split(" ");
  const lines =
    words.length > 2
      ? [
          words.slice(0, Math.ceil(words.length / 2)).join(" "),
          words.slice(Math.ceil(words.length / 2)).join(" "),
        ]
      : [label];

  const lineHeight = fontSize * 1.2;

  return (
    <text
      x={position.x}
      y={position.y}
      textAnchor={alignedTextAnchor}
      dominantBaseline={alignedDominantBaseline}
      fontSize={fontSize}
      fill={color}
      fontFamily="system-ui, -apple-system, sans-serif"
    >
      {lines.map((line, i) => (
        <tspan key={i} x={position.x} dy={i === 0 ? 0 : lineHeight}>
          {line}
        </tspan>
      ))}
    </text>
  );
}
