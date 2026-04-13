export interface Point {
  x: number;
  y: number;
}

/** Converts polar coordinates to Cartesian. Angle in radians. */
export function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angleRad: number,
): Point {
  return {
    x: cx + radius * Math.cos(angleRad),
    y: cy + radius * Math.sin(angleRad),
  };
}

/**
 * Returns the SVG path string for a filled pie segment.
 * Handles the edge case where a full circle (value=10, single area) is drawn correctly.
 */
export function buildSegmentPath(
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number,
): string {
  if (radius <= 0) return "";

  const angleDelta = endAngle - startAngle;
  const isFullCircle = Math.abs(angleDelta - Math.PI * 2) < 1e-6;

  if (isFullCircle) {
    // SVG arcs cannot span exactly 360°, so we split into two halves
    const mid = startAngle + Math.PI;
    const p1 = polarToCartesian(cx, cy, radius, startAngle);
    const p2 = polarToCartesian(cx, cy, radius, mid);
    return [
      `M ${cx} ${cy}`,
      `L ${p1.x} ${p1.y}`,
      `A ${radius} ${radius} 0 0 1 ${p2.x} ${p2.y}`,
      `A ${radius} ${radius} 0 0 1 ${p1.x} ${p1.y}`,
      "Z",
    ].join(" ");
  }

  const start = polarToCartesian(cx, cy, radius, startAngle);
  const end = polarToCartesian(cx, cy, radius, endAngle);
  const largeArcFlag = angleDelta > Math.PI ? 1 : 0;

  return [
    `M ${cx} ${cy}`,
    `L ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
    "Z",
  ].join(" ");
}

/** Derives SVG text-anchor and dominant-baseline from an angle. */
export function getLabelAlignment(angleRad: number): {
  textAnchor: string;
  dominantBaseline: string;
} {
  const cos = Math.cos(angleRad);
  const sin = Math.sin(angleRad);

  const textAnchor = cos > 0.3 ? "start" : cos < -0.3 ? "end" : "middle";

  const dominantBaseline =
    sin > 0.3 ? "hanging" : sin < -0.3 ? "auto" : "middle";

  return { textAnchor, dominantBaseline };
}

/** Computes start angle, end angle, and mid angle (in radians) for segment i of n. */
export function getSegmentAngles(i: number, n: number) {
  const slice = (2 * Math.PI) / n;
  const offset = -Math.PI / 2; // start from top
  const startAngle = i * slice + offset;
  const endAngle = (i + 1) * slice + offset;
  const midAngle = startAngle + slice / 2;
  return { startAngle, endAngle, midAngle };
}
