# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Project Sanctum** is an asymmetric multiplayer game prototype featuring adventurers vs. a dungeon master in a cursed labyrinth. This Phaser.js implementation serves as a vertical slice/prototype hosted on GitHub Pages for easy accessibility and testing with friends.

### Game Concept
- **Adventurers (1-3 players)**: First-person retro FPS perspective, find relic and escape
- **Dungeon Master (1 player)**: Top-down tactical view, control traps/monsters to stop adventurers
- **Core Fantasy**: Indiana Jones meets Doom with asymmetric multiplayer tension

### Technical Goals
Building a **semi-custom raycasting engine** within Phaser to achieve:
- Retro FPS visuals (sprite monsters, pixelated textures, chunky lighting)
- First-person perspective for adventurers using raycasting techniques
- Top-down tactical interface for dungeon master
- Real-time multiplayer capabilities (future: WebRTC/WebSockets)

## Development Commands

- `npm run dev` - Start the development server with hot reloading
- `npm run build` - Build the project for production (outputs to `dist/`)
- `npm run preview` - Preview the production build locally on port 5173

## Architecture

### Core Structure
- **Entry point**: `src/main.js` - Main Phaser game configuration and scene management
- **Game configuration**: 1920x1080 resolution, AUTO renderer type, dark theme
- **Raycasting engine**: Custom implementation within Phaser's 2D canvas for pseudo-3D rendering
- **Scene architecture**: Separate scenes for adventurer FPS view and DM tactical view

### Key Technologies
- **Phaser 3.80.0**: 2D game engine used for custom raycasting implementation
- **Vite 5.4.0**: Build tool and development server with HMR
- **Canvas 2D API**: Direct pixel manipulation for raycasting rendering
- **ES6 modules**: Modern JavaScript for clean architecture

### Raycasting Engine Considerations
When implementing the raycasting system:
- **Performance**: Use Phaser's graphics objects or direct canvas manipulation for wall rendering
- **Grid-based maps**: 2D tile arrays for collision detection and wall placement
- **Texture mapping**: Sprite-based wall textures using Phaser's texture system
- **Lighting**: Distance-based shading and dynamic lighting effects
- **Sprites**: Billboard sprites for monsters/objects in 3D space

### Current Implementation
Basic Phaser setup with placeholder UI displaying project title and version

### Deployment
- Automatic deployment to GitHub Pages via GitHub Actions on main branch pushes
- Vite base path configured for GitHub Pages: `/maxdribny.github.io/project-sanctum/`
- SPA routing support with 404.html fallback

## Development Guidelines

### Project Structure Recommendations
```
src/
├── main.js                 # Entry point and game configuration
├── scenes/
│   ├── AdventurerScene.js  # First-person raycasting view
│   ├── DungeonMasterScene.js # Top-down tactical view
│   └── MenuScene.js        # UI and game setup
├── engine/
│   ├── Raycaster.js        # Core raycasting implementation
│   ├── Map.js              # Grid-based dungeon representation
│   └── Renderer.js         # 3D rendering utilities
├── entities/
│   ├── Player.js           # Adventurer controller
│   ├── Monster.js          # AI entities
│   └── Trap.js             # Interactive dungeon elements
└── assets/                 # Sprites, textures, sounds
```

### Raycasting Implementation Notes
- **Resolution considerations**: 1920x1080 may be too high for real-time raycasting; consider rendering at lower resolution and scaling up
- **Ray casting frequency**: Balance visual quality vs performance (every pixel vs every N pixels)
- **Wall height calculation**: `wallHeight = (wallDistance > 0) ? screenHeight / wallDistance : screenHeight`
- **Texture sampling**: Use Phaser's texture coordinates for wall surface mapping
- **Performance optimization**: Use object pooling for rays, cache wall calculations

### Multiplayer Architecture (Future)
- Consider peer-to-peer WebRTC for low-latency DM interactions
- State synchronization between adventurer clients and DM client
- Event-driven architecture for trap triggers and monster spawns

### Testing Strategy
- GitHub Pages deployment enables easy testing with friends
- Consider URL parameters for quick scene/mode switching during development
- Debug overlays for raycasting visualization (ray lines, collision points)