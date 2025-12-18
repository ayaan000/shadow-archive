# The Shadow Archive

A minimalist 2D web-based exploration game about discovery in the shadows.

## 🎮 About

The Shadow Archive is an atmospheric, slow-paced exploration game where you uncover hidden entities in a dark, abstract world. There is no combat—only curiosity, discovery, and the quiet joy of revelation.

## ✨ Features

- **Exploration-Driven**: Move through four distinct regions, each with its own visual atmosphere
- **Discovery Mechanic**: Entities appear as shadows and reveal themselves as you approach
- **Journal System**: Track your discoveries with persistent progress (localStorage)
- **Procedural Visuals**: All graphics rendered with Canvas API—no external assets needed
- **Ambient Audio**: Procedural soundscapes using Web Audio API
- **Boss Entities**: Large guardians that unlock new regions when discovered

## 🎯 How to Play

- **WASD** or **Arrow Keys** - Move your shadow explorer
- **J** - Open/close the journal
- Approach shadows to reveal entities
- Discover bosses to progress to new regions

## 🌍 Regions

1. **The Forest** - Ancient woods filled with wisps and forgotten spirits
2. **The Frozen Wastes** - Ice-covered plains holding crystallized memories
3. **The Ancient Ruins** - Remnants of a civilization lost to time
4. **The Void** - The space between existence and non-existence

## 🚀 Running Locally

Simply open `index.html` in a modern web browser. No build process required!

## 📁 Project Structure

```
shadow_archive/
├── index.html          # Main HTML file
├── style.css           # Visual styling
├── data/
│   └── content.js      # Region and entity data
└── js/
    ├── main.js         # Entry point
    ├── game.js         # Main game loop and state
    ├── player.js       # Player controller
    ├── world.js        # Region rendering
    ├── entities.js     # Entity system
    ├── journal.js      # Journal UI and persistence
    ├── input.js        # Keyboard input
    └── audio.js        # Procedural audio
```

## 🛠️ Technical Details

- **No external dependencies** - Pure vanilla JavaScript
- **ES6 Modules** - Clean code organization
- **Canvas API** - For all rendering
- **Web Audio API** - For procedural sounds
- **LocalStorage** - For saving progress
- **Fully client-side** - Ready for GitHub Pages

## 🎨 Design Philosophy

The game is contemplative, mysterious, and rewarding through curiosity rather than skill. Discovery should feel meaningful, quiet, and slightly emotional.

## 📝 Extending the Game

The code is modular and well-commented for easy extension:

- Add new regions in `data/content.js`
- Create new entity types in `js/entities.js`
- Modify visual styles in `style.css`
- Adjust ambient sounds in `js/audio.js`

## 🌐 Deployment

This game is optimized for GitHub Pages:

1. Push to a GitHub repository
2. Enable GitHub Pages in settings
3. Set source to main branch
4. Your game will be live!

---

**Explore. Discover. Remember.**
