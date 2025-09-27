# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Project Sanctum** is an asymmetric multiplayer game prototype featuring adventurers vs. a dungeon master in a cursed labyrinth. This Phaser.js implementation serves as a vertical slice/prototype hosted on GitHub Pages for easy accessibility and testing with friends.

## 🏗️ Core Architectural Philosophy

**MODULARITY AND ACCESSIBILITY FIRST**: This project is designed from the ground up to be contribution-friendly for developers of varying skill levels. Every architectural decision should prioritize:

### 🎯 Design Principles
1. **Modular Components**: Each system should be self-contained and independently testable
2. **Clear Interfaces**: Well-defined APIs between modules with minimal coupling
3. **Progressive Complexity**: Simple entry points that can be extended without breaking existing functionality
4. **Documentation-Driven Development**: Code should be self-explanatory with comprehensive comments
5. **Skill-Level Agnostic**: Beginners should be able to contribute alongside experienced developers

### 🧩 Contribution Accessibility
- **Beginner-friendly tasks**: UI components, asset integration, simple gameplay mechanics
- **Intermediate challenges**: System integration, performance optimization, testing
- **Advanced projects**: Core engine development, networking, complex algorithms

**CRITICAL**: When planning or implementing any feature, always ask:
- "Can a junior developer understand and extend this?"
- "Is this module isolated enough that it won't break other systems?"
- "Are the inputs/outputs clearly defined and documented?"
- "Can someone contribute to this without understanding the entire codebase?"

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
- Development work happens on `dev` branch with local testing
- Only stable, reviewed code on `main` gets deployed to live site
- Vite base path configured for GitHub Pages: `/project-sanctum/`
- SPA routing support with 404.html fallback

## Development Guidelines

### Modular Project Structure
The project structure is designed for maximum contribution accessibility:

```
src/
├── main.js                 # Entry point - minimal, just bootstraps the game
├── config/
│   ├── GameConfig.js       # Centralized configuration (resolution, physics, etc.)
│   └── AssetConfig.js      # Asset loading definitions
├── scenes/
│   ├── AdventurerScene.js  # First-person raycasting view (isolated)
│   ├── DungeonMasterScene.js # Top-down tactical view (isolated)
│   └── MenuScene.js        # UI and game setup (beginner-friendly)
├── engine/
│   ├── Raycaster.js        # Core raycasting (advanced, well-documented)
│   ├── Map.js              # Grid-based dungeon (intermediate)
│   ├── Renderer.js         # 3D rendering utilities (advanced)
│   └── EventBus.js         # Communication between modules (intermediate)
├── entities/
│   ├── Player.js           # Adventurer controller (intermediate)
│   ├── Monster.js          # AI entities (intermediate to advanced)
│   └── Trap.js             # Interactive elements (beginner to intermediate)
├── ui/
│   ├── HUD.js              # Game interface (beginner-friendly)
│   ├── Menu.js             # Navigation (beginner-friendly)
│   └── DebugPanel.js       # Development tools (intermediate)
├── utils/
│   ├── MathUtils.js        # Reusable math functions (all skill levels)
│   ├── AssetLoader.js      # Asset management (beginner-friendly)
│   └── InputManager.js     # Input handling (intermediate)
└── assets/                 # Sprites, textures, sounds (art contributors)
```

**Design Philosophy Notes:**
- Each module should export a clear API with JSDoc documentation
- Use dependency injection to make modules testable
- Prefer composition over inheritance for flexibility
- Include example usage in comments for complex modules

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

### Code Implementation Guidelines

#### For ALL Contributors
1. **Documentation First**: Write JSDoc comments before implementation
2. **Small Functions**: Keep functions under 20 lines when possible
3. **Descriptive Naming**: Use clear, self-documenting variable and function names
4. **Error Handling**: Always handle edge cases and provide meaningful error messages

#### Module Design Pattern
```javascript
/**
 * Example of contribution-friendly module structure
 */
export class ExampleModule {
  /**
   * Clear constructor with documented parameters
   * @param {Object} config - Configuration object
   * @param {number} config.width - Module width
   * @param {number} config.height - Module height
   */
  constructor(config = {}) {
    this.validateConfig(config);
    this.initializeModule(config);
  }

  /**
   * Public API method - well documented
   * @param {number} input - What this parameter does
   * @returns {Object} What this returns
   */
  publicMethod(input) {
    // Implementation with clear steps
  }

  // Private methods clearly marked and documented
  #privateMethod() {
    // Internal implementation
  }
}
```

#### Skill-Level Guidelines
- **Beginners**: Focus on UI components, asset integration, and simple utility functions
- **Intermediate**: Work on game logic, scene management, and system integration
- **Advanced**: Implement core engine features, performance optimization, and complex algorithms

### Testing Strategy
- **Modular Testing**: Each module should be testable in isolation
- **Integration Points**: Test module interactions at well-defined interfaces
- **GitHub Pages**: Live testing environment for immediate feedback
- **Debug Tools**: URL parameters and debug panels for development testing
- **Regression Prevention**: Always test existing functionality when adding features
- Never sign off on PRs or commits that this was generated with AI or Claude Code