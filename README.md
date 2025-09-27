# Project Sanctum

> An asymmetric multiplayer dungeon crawler where adventurers face off against a malevolent dungeon master in a cursed labyrinth.

## 🤝 **Built for Collaboration**

**Project Sanctum is designed from the ground up to welcome contributors of all skill levels.** Whether you're a seasoned developer or just starting your coding journey, there's a place for you in this project. Our modular architecture ensures that you can contribute meaningfully without needing to understand the entire codebase.

## 🎮 Game Concept

**Project Sanctum** is a retro-inspired game that combines the tension of classic FPS gameplay with strategic dungeon mastery. Players take on one of two roles:

- **Adventurers (1-3 players)**: Navigate a first-person retro FPS environment, solve puzzles, fight monsters, and escape with the relic
- **Dungeon Master (1 player)**: Command a top-down tactical view to place traps, spawn monsters, and prevent the adventurers from escaping

Think *Indiana Jones meets Doom* with asymmetric multiplayer tension perfect for streaming and replay value.

## 🚀 Live Demo

Play the current prototype: **[https://maxdribny.github.io/project-sanctum/](https://maxdribny.github.io/project-sanctum/)**

## 🛠️ Technical Stack

- **Engine**: Phaser 3.80.0 with custom raycasting implementation
- **Build Tool**: Vite 5.4.0
- **Deployment**: GitHub Pages with automated CI/CD
- **Language**: Modern JavaScript (ES6 modules)

## 🏗️ Modular Architecture Philosophy

**Every system is designed to be independently understandable and contributable:**

- **🧩 Self-Contained Modules**: Work on one system without breaking others
- **📚 Documentation-First**: Code explains itself through comprehensive comments
- **🎯 Progressive Complexity**: Simple entry points that grow with your skills
- **🔗 Clear Interfaces**: Well-defined APIs between components
- **✅ Isolated Testing**: Each module can be tested independently

### Technical Features
- **Raycasting Engine**: Pseudo-3D rendering for first-person perspective
- **Scene Management**: Separate, isolated scenes for different game modes
- **Grid-Based Maps**: Intuitive tile-based collision and dungeon systems
- **Event-Driven Design**: Loose coupling between game systems

## 🤝 Contributing

We welcome contributions from developers of all skill levels! This project is designed to be collaboration-friendly with clear guidelines and modular architecture.

### 📋 Prerequisites

- **Node.js** (v16 or higher)
- **Git**
- Basic knowledge of JavaScript and game development concepts
- Familiarity with Phaser.js is helpful but not required

### 🔧 Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/project-sanctum.git
   cd project-sanctum
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open your browser** to `http://localhost:5173`

### 🌳 Branching Strategy

We use a structured branching approach to keep development organized:

#### Branch Types

- **`main`** - Production-ready releases only. Protected branch.
- **`dev`** - Active development branch. GitHub Pages deploys from here.
- **`feat-[feature-name]`** - New features (e.g., `feat-raycasting-engine`)
- **`fix-[issue-description]`** - Bug fixes (e.g., `fix-collision-detection`)
- **`docs-[section]`** - Documentation updates (e.g., `docs-contributing-guide`)

#### Workflow

1. **Create your feature branch from `dev`**
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feat-your-feature-name
   ```

2. **Make your changes and commit**
   ```bash
   git add .
   git commit -m "Add raycasting wall rendering"
   ```

3. **Push and create a Pull Request**
   ```bash
   git push origin feat-your-feature-name
   ```
   - Open a PR against the `dev` branch
   - Use the PR template and provide clear descriptions
   - Request review from team members

4. **After PR approval and merge**
   ```bash
   git checkout dev
   git pull origin dev
   git branch -d feat-your-feature-name
   ```

### 📝 Commit Guidelines

Use clear, descriptive commit messages:

- **feat:** New features (`feat: implement monster AI pathfinding`)
- **fix:** Bug fixes (`fix: resolve wall collision issues`)
- **docs:** Documentation (`docs: update raycasting engine guide`)
- **refactor:** Code improvements (`refactor: optimize rendering pipeline`)
- **test:** Testing (`test: add unit tests for map generation`)

### 🎯 Contribution Areas by Skill Level

**🟢 Beginner-Friendly (Great First Contributions)**
- **UI Components**: HUD elements, menus, buttons
- **Asset Integration**: Loading sprites, textures, sounds
- **Simple Gameplay**: Basic interactions, simple animations
- **Documentation**: Comments, README improvements, tutorials
- **Testing**: Writing basic test cases, manual testing

**🟡 Intermediate Challenges**
- **Game Logic**: Player movement, collision detection
- **Scene Management**: Transitions, state management
- **System Integration**: Connecting modules together
- **Performance**: Basic optimization, asset management
- **Input Handling**: Keyboard, mouse, gamepad support

**🔴 Advanced Projects**
- **Raycasting Engine**: Core 3D rendering mathematics
- **Monster AI**: Pathfinding algorithms, behavior trees
- **Networking**: WebRTC/WebSocket multiplayer implementation
- **Engine Architecture**: Core systems and optimization
- **Complex Algorithms**: Map generation, physics simulation

#### 🎨 Non-Programming Contributions
- **Pixel Art**: Sprites, textures, UI elements
- **Sound Design**: Retro-style audio effects
- **Game Design**: Level layouts, gameplay mechanics
- **Documentation**: Tutorials, guides, wiki content
- **Testing**: Gameplay testing, bug reporting

### 🐛 Bug Reports

Found a bug? Please create an issue with:

1. **Clear description** of the problem
2. **Steps to reproduce** the issue
3. **Expected vs actual behavior**
4. **Browser/device information**
5. **Screenshots** if applicable

### 💡 Feature Requests

Have an idea? We'd love to hear it! Create an issue with:

1. **Problem statement** - What need does this address?
2. **Proposed solution** - How would you implement it?
3. **Alternative solutions** - Any other approaches considered?
4. **Additional context** - Mockups, references, etc.

### 📖 Code Style

- Use **ES6+ features** (const/let, arrow functions, modules)
- Follow **camelCase** for variables and functions
- Use **PascalCase** for classes and constructors
- Keep functions **small and focused** (single responsibility)
- Add **JSDoc comments** for public APIs
- Use **meaningful variable names**

### 🧪 Testing

Before submitting a PR:

1. **Test locally** with `npm run dev`
2. **Build successfully** with `npm run build`
3. **Preview production** with `npm run preview`
4. **Test in multiple browsers** if possible

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎯 Roadmap

- [ ] **Prototype Phase**: Basic raycasting engine and game loop
- [ ] **Alpha Phase**: Core gameplay mechanics and single-player mode
- [ ] **Beta Phase**: Multiplayer implementation and balancing
- [ ] **Release Phase**: Polish, performance optimization, and content

## 🤔 Questions?

- Check the [CLAUDE.md](CLAUDE.md) file for technical architecture details
- Browse existing [Issues](https://github.com/maxdribny/project-sanctum/issues) for common questions
- Create a new issue for technical questions or clarifications

---

**Ready to dive into the labyrinth?** Start by setting up your development environment and checking out the `dev` branch to see what we're currently working on!