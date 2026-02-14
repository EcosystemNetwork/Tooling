# GameForge — Browser Game Dev Tooling

A comprehensive React-based dashboard for managing browser-based 3D game development with **Three.js** and **Babylon.js**. Built with React, React Router, and Vite. Each section is its own page with client-side routing. Data is persisted using browser LocalStorage.

## Features

### 📊 Project Dashboard (`/`)
- View and manage game development projects
- Track project status, engine (Three.js / Babylon.js), team size, and completion
- Add, edit, and delete projects with descriptions and repo URLs

### 🎬 Scene Manager (`/scenes`)
- Manage 3D scene configurations (cameras, lights, meshes, textures)
- Filter by engine (Three.js / Babylon.js)
- Track scene objects and status (Active, WIP, Archived)

### 🎨 Shader Library (`/shaders`)
- Organize vertex, fragment, post-process, and compute shaders
- Visual gradient previews and tag-based categorization
- Filter shaders by type

### 📝 Code Snippets (`/snippets`)
- Searchable collection of reusable code patterns for Three.js, Babylon.js, GLSL, and WebGPU
- One-click copy to clipboard
- Filter by engine and search by title/description

### 📦 Asset Manager (`/assets`)
- Organize game assets: 3D Models, Textures, Audio, Animations, UI Elements, Materials, Shaders, Prefabs, Skyboxes
- Search and filter assets by type
- Track asset metadata including size and author

### ⚡ Performance Monitor (`/performance`)
- Track WebGL/WebGPU metrics (draw calls, triangle count, frame time, memory)
- Color-coded thresholds (green/yellow/red)
- Optimization tips for each metric

### 🚀 Build & Deploy Pipeline (`/builds`)
- Monitor build and deployment status
- Track build duration and history

### 👥 Team Management (`/team`)
- Manage team members and their roles

### 📅 Events Schedule (`/events`)
- Schedule and track live operations and events

### 📖 Documentation & Resources (`/docs`)
- Quick links to Three.js and Babylon.js documentation
- Physics engines (Cannon-es, Rapier, Havok, Ammo.js)
- Debug tools (Spector.js, stats.js, lil-gui)
- Learning resources (Three.js Journey, WebGL Fundamentals, The Book of Shaders)

### 📈 Analytics & KPIs (`/analytics`)
- View key performance indicators including game-specific metrics (Avg FPS, WebGL Crash Rate)

### 💾 Data Management
- **Persistent Storage**: All data is automatically saved to browser LocalStorage
- **Export Data**: Download all your data as a JSON file
- **Import Data**: Upload a JSON file to restore or migrate data
- **Reset**: Clear all data and restore default examples

## Tech Stack

- **React 19** — UI framework
- **React Router 7** — Client-side routing (each tab is its own page)
- **Vite** — Build tool and dev server
- **LocalStorage** — Client-side data persistence

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
git clone <repo-url>
cd Tooling
npm install
```

### Development

```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── main.jsx                # Entry point
├── App.jsx                 # Root component with React Router setup
├── index.css               # Global styles
├── components/
│   ├── Layout.jsx          # Shared layout (sidebar, header)
│   ├── Modal.jsx           # Reusable modal component
│   └── Toast.jsx           # Toast notification system
├── pages/
│   ├── Dashboard.jsx       # Project Dashboard page (/)
│   ├── Scenes.jsx          # Scene Manager page (/scenes)
│   ├── Shaders.jsx         # Shader Library page (/shaders)
│   ├── Snippets.jsx        # Code Snippets page (/snippets)
│   ├── Assets.jsx          # Asset Manager page (/assets)
│   ├── Performance.jsx     # Performance Monitor page (/performance)
│   ├── Builds.jsx          # Build Pipeline page (/builds)
│   ├── Team.jsx            # Team Management page (/team)
│   ├── Events.jsx          # Events Schedule page (/events)
│   ├── Docs.jsx            # Documentation & Resources page (/docs)
│   └── Analytics.jsx       # Analytics & KPIs page (/analytics)
└── services/
    └── DataService.js      # LocalStorage data service layer
```

## License

This project is open source and available for use and modification.
