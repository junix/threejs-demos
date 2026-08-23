# Three.js Demos

Twelve carefully composed WebGL scenes with a true alpha renderer and static, reproducible export pose.

`catalog.json` records the scene use, question, family, complexity, and techniques.

| Orbital | Terrain | Crystal | Molecule |
|---|---|---|---|
| ![orbital](out/orbital-transparent.png) | ![terrain](out/terrain-transparent.png) | ![crystal](out/crystal-transparent.png) | ![molecule](out/molecule-transparent.png) |
| City | Globe | Ribbons | Lattice |
| ![city](out/city-transparent.png) | ![globe](out/globe-transparent.png) | ![ribbons](out/ribbons-transparent.png) | ![lattice](out/lattice-transparent.png) |
| Vectors | Knots | Particles | Metaballs |
| ![vectors](out/vectors-transparent.png) | ![knots](out/knots-transparent.png) | ![particles](out/particles-transparent.png) | ![metaballs](out/metaballs-transparent.png) |

Run `npm install && npm test`. Chrome uses SwiftShader when needed, blocks outside networking, checks interaction, captures the transparent canvas, and validates alpha/content thresholds.
