/**
 * Generates a visually distinct chromatic palette in HSL.
 * Distributes hues evenly across the color wheel.
 */
export function generateColorPalette(count: number): string[] {
  return Array.from({ length: count }, (_, i) => {
    const hue = Math.round((i / count) * 360);
    const saturation = 65 + (i % 3) * 5; // slight variation: 65, 70, 75
    const lightness = 55 + (i % 2) * 5; // slight variation: 55, 60
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  });
}

/**
 * Merges user-provided colors with auto-generated ones.
 * Areas without a color receive one from the palette.
 */
export function resolveColors(
  areas: Array<{ color?: string }>,
  palette: string[],
): string[] {
  return areas.map(
    (area, i) => area.color ?? palette[i] ?? palette[i % palette.length],
  );
}
