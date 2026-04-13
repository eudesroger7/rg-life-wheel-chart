import { useMemo } from "react";
import type { LifeWheelProps } from "../types";
import { generateColorPalette, resolveColors } from "../utils/colorPalette";
import { getSegmentAngles } from "../utils/geometry";
import { WheelGrid } from "./WheelGrid";
import { WheelSegment } from "./WheelSegment";
import { WheelLabel } from "./WheelLabel";

const VIEW_BOX_SIZE = 300;
const CENTER = VIEW_BOX_SIZE / 2;
const MAX_RADIUS_RATIO = 0.38; // fraction of viewBox half-size used for the wheel
const LABEL_PADDING_DEFAULT = 12;

export function LifeWheel({
  areas,
  gridLevels = 10,
  gridColor = "#d1d5db",
  gridOpacity = 0.6,
  strokeColor = "white",
  strokeWidth = 1.5,
  labelFontSize = 9,
  labelColor = "#374151",
  labelPadding = LABEL_PADDING_DEFAULT,
  className,
  style,
  onAreaClick,
}: LifeWheelProps) {
  const safeAreas = useMemo(() => areas.slice(0, 50), [areas]);
  const count = safeAreas.length;

  const palette = useMemo(() => generateColorPalette(count), [count]);
  const resolvedColors = useMemo(
    () => resolveColors(safeAreas, palette),
    [safeAreas, palette],
  );

  const maxRadius = CENTER * MAX_RADIUS_RATIO * 2;
  const labelRadius = maxRadius + labelPadding;

  if (count === 0) return null;

  return (
    <div
      className={className}
      style={{
        width: "100%",
        maxWidth: "600px",
        aspectRatio: "1 / 1",
        ...style,
      }}
    >
      <svg
        viewBox={`0 0 ${VIEW_BOX_SIZE} ${VIEW_BOX_SIZE}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          overflow: "visible",
        }}
        aria-label="Life Wheel Chart"
        role="img"
      >
        <circle cx={CENTER} cy={CENTER} r={maxRadius} fill="white" />

        <WheelGrid
          cx={CENTER}
          cy={CENTER}
          maxRadius={maxRadius}
          levels={gridLevels}
          segmentCount={count}
          color={gridColor}
          opacity={gridOpacity}
        />

        {safeAreas.map((area, i) => {
          const { startAngle, endAngle } = getSegmentAngles(i, count);
          return (
            <WheelSegment
              key={`segment-${i}`}
              cx={CENTER}
              cy={CENTER}
              maxRadius={maxRadius}
              value={area.value}
              startAngle={startAngle}
              endAngle={endAngle}
              color={resolvedColors[i]}
              strokeColor={strokeColor}
              strokeWidth={strokeWidth}
              onClick={onAreaClick ? () => onAreaClick(area, i) : undefined}
            />
          );
        })}

        <circle
          cx={CENTER}
          cy={CENTER}
          r={maxRadius}
          fill="none"
          stroke={gridColor}
          strokeOpacity={gridOpacity}
          strokeWidth={0.8}
        />

        {safeAreas.map((area, i) => {
          const { midAngle } = getSegmentAngles(i, count);
          return (
            <WheelLabel
              key={`label-${i}`}
              cx={CENTER}
              cy={CENTER}
              labelRadius={labelRadius}
              midAngle={midAngle}
              label={area.label}
              fontSize={labelFontSize}
              color={labelColor}
            />
          );
        })}
      </svg>
    </div>
  );
}
