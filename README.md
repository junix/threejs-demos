# Three.js Demos

Three carefully composed WebGL scenes with a true alpha renderer and static, reproducible export pose.

| Scene | Preview |
|---|---|
| Orbital instrument | ![orbital](out/orbital-transparent.png) |
| Spectral terrain | ![terrain](out/terrain-transparent.png) |
| Crystal field | ![crystal](out/crystal-transparent.png) |

Run `npm install && npm test`. Chrome uses SwiftShader when needed, blocks outside networking, checks interaction, captures the transparent canvas, and validates alpha/content thresholds.
