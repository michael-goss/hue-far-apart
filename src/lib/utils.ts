import type { Color } from './types'

export const color_to_hex = (color: Color): string => {
  const r = color.red.toString(16).padStart(2, '0');
  const g = color.green.toString(16).padStart(2, '0');
  const b = color.blue.toString(16).padStart(2, '0');
  return `#${r}${g}${b}`.toUpperCase();
}

export const hex_to_color = (hex: string): Color | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.toLowerCase());
  return result ? {
    red: parseInt(result[1], 16),
    green: parseInt(result[2], 16),
    blue: parseInt(result[3], 16)
  } : null;
}
