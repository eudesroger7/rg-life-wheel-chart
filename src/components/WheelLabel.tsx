import { useMemo } from "react";
import { polarToCartesian } from "../utils/geometry";

type LabelVariant = "radial" | "aligned";

interface WheelLabelProps {
  cx: number;
  cy: number;
  labelRadius: number;
  midAngle: number;
  label: string;
  fontSize: number;
  color: string;
  variant?: LabelVariant;
}

export function WheelLabel({
  cx,
  cy,
  labelRadius,
  midAngle,
  label,
  fontSize,
  color,
  variant = "radial",
}: WheelLabelProps) {
  const radialLines = useMemo(() => {
    const maxCharsPerLine = 12;

    const words = label.trim().split(/\s+/);
    const lines: string[] = [];
    let currentLine = "";

    for (const word of words) {
      const nextLine = currentLine ? `${currentLine} ${word}` : word;

      if (nextLine.length <= maxCharsPerLine) {
        currentLine = nextLine;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }

    if (currentLine) lines.push(currentLine);

    return lines;
  }, [label]);

  if (variant === "radial") {
    const lines = radialLines;
    const lineHeight = fontSize * 1.1;
    const blockHeight = lines.length * lineHeight;
    const gap = -5;

    const adjustedRadius = labelRadius + gap + blockHeight / 2;
    const position = polarToCartesian(cx, cy, adjustedRadius, midAngle);

    const angleDeg = (midAngle * 180) / Math.PI;
    const isTopHalf = Math.sin(midAngle) < 0;
    const rotation = isTopHalf ? angleDeg - 270 : angleDeg - 450;

    return (
      <text
        x={position.x}
        y={position.y}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={fontSize}
        fill={color}
        fontFamily="system-ui, -apple-system, sans-serif"
        transform={`rotate(${rotation}, ${position.x}, ${position.y})`}
      >
        {lines.map((line, index) => {
          const dy =
            index === 0 ? -((lines.length - 1) * lineHeight) / 2 : lineHeight;

          return (
            <tspan key={index} x={position.x} dy={dy}>
              {line}
            </tspan>
          );
        })}
      </text>
    );
  }

  const position = polarToCartesian(cx, cy, labelRadius, midAngle);
  const angleDeg = (midAngle * 180) / Math.PI;
  const isLeftSide = Math.cos(midAngle) < 0;
  const rotation = isLeftSide ? angleDeg + 180 : angleDeg;
  const textAnchor = isLeftSide ? "end" : "start";

  return (
    <text
      x={position.x}
      y={position.y}
      textAnchor={textAnchor}
      fontSize={fontSize}
      fill={color}
      fontFamily="system-ui, -apple-system, sans-serif"
      transform={`rotate(${rotation}, ${position.x}, ${position.y})`}
    >
      {label}
    </text>
  );
}
