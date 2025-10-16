<img src="./src/assets/hue-far-apart.svg" alt="Hue Far Apart" style="transform: scaleY(0.8);" />

A color distance calculator that measures how far apart two colors are using Euclidean distance in RGB color space.

## About

Inspired by the [Distractible podcast](https://spotify.link/distractible), where the wheel occasionally forces Mark to calculate RGB values by hand to see whose shirt is closest to their background. This tool exists so he doesn't have to suffer through the math anymore.

## Features

- **EyeDropper API**: Pick colors directly from your screen (supported browsers)
- **Fallback color picker**: Works on all devices
- **Manual hex input**: Type hex codes directly
- **Session history**: Keeps track of all calculated color pairs
- **Mobile-friendly**: Responsive design for all screen sizes

## Tech Stack

- Svelte 5
- TypeScript
- Vite
- Bun

## Development
```bash
# Install dependencies
bun install

# Run dev server
bun run dev

# Build for production
bun run build
```

## How It Works

The app calculates the Euclidean distance between two colors in RGB space:
```
distance = √((R₂-R₁)² + (G₂-G₁)² + (B₂-B₁)²)
```

The maximum possible distance between two colors is 441.67 (black to white).
