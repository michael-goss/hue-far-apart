import type { Color } from "./types"

export const color_to_hex = (color: Color | null): string => {
	if (!color) return ""
	const r = color.red.toString(16).padStart(2, "0")
	const g = color.green.toString(16).padStart(2, "0")
	const b = color.blue.toString(16).padStart(2, "0")
	return `#${r}${g}${b}`.toUpperCase()
}

export const hex_to_color = (hex: string): Color | null => {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.toLowerCase())
	return result
		? {
				red: parseInt(result[1], 16),
				green: parseInt(result[2], 16),
				blue: parseInt(result[3], 16),
			}
		: null
}

export const calculate_euclidean_distance = (color0: Color, color1: Color): number => {
	const red_squared = (color1.red - color0.red) ** 2
	const green_squared = (color1.green - color0.green) ** 2
	const blue_squared = (color1.blue - color0.blue) ** 2
	return Math.sqrt(red_squared + green_squared + blue_squared)
}

export const round_number = (val: number, digits = 2): number => {
	const factor = 10 ** digits
	return Math.round(val * factor) / factor
}
