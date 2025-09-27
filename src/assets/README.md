# Assets Directory

This directory contains all game assets organized by type. Art contributors should place their work in the appropriate subdirectories.

## Directory Structure

### `/sprites/`
- **Character sprites**: Player, monsters, NPCs
- **Item sprites**: Weapons, pickups, interactables
- **Effect sprites**: Explosions, magic effects, particles
- **Format**: PNG with transparency, pixel art style preferred

### `/textures/`
- **Wall textures**: Stone, brick, wood, metal surfaces
- **Floor textures**: Dirt, stone, tile patterns
- **Ceiling textures**: Basic ceiling patterns
- **Format**: Square power-of-2 sizes (64x64, 128x128, 256x256)

### `/sounds/`
- **SFX**: Footsteps, weapon sounds, monster noises, trap triggers
- **Music**: Background tracks for different dungeon areas
- **Ambient**: Environmental sounds, echoes, dungeon atmosphere
- **Format**: MP3 or OGG Vorbis, 44.1kHz preferred

### `/maps/`
- **Level data**: JSON files containing dungeon layouts
- **Tile definitions**: Map tile type configurations
- **Spawn points**: Player and monster starting positions
- **Format**: JSON with grid-based layout data

### `/ui/`
- **Interface elements**: Buttons, panels, frames
- **Icons**: Health, ammo, inventory item icons
- **Cursors**: Custom mouse cursors for different modes
- **Format**: PNG with transparency, consistent style

## Asset Naming Conventions

- Use lowercase with underscores: `wall_stone_01.png`
- Include size in filename if multiple sizes: `monster_goblin_32x32.png`
- Version numbers for iterations: `sword_sprite_v2.png`
- Descriptive names over cryptic abbreviations

## Contributing Assets

1. **Check existing assets** first to maintain style consistency
2. **Follow pixel art guidelines** for retro aesthetic
3. **Include source files** (.psd, .aseprite) when possible
4. **Test assets in-game** before submitting PR
5. **Update AssetConfig.js** when adding new assets

## Technical Requirements

- **Sprites**: Transparent backgrounds, consistent pixel density
- **Textures**: Tileable when used for walls/floors
- **Audio**: Normalized volume levels, avoid clipping
- **File sizes**: Keep reasonable for web deployment
- **Compatibility**: Ensure cross-browser format support

## Style Guide

- **Color palette**: Limited retro palette preferred
- **Pixel art**: Clean pixels, no anti-aliasing
- **Lighting**: Consider how assets will look with distance-based shading
- **Animation frames**: Consistent timing and smooth transitions