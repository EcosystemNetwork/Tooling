# GameForge — Browser Game Dev Tooling

A comprehensive web-based dashboard for browser-based 3D game development with **Three.js** and **Babylon.js**. Manage scenes, shaders, code snippets, assets, performance metrics, and your entire game dev pipeline — all from one place. Features persistent data storage using LocalStorage.

## Features

### 📊 Project Dashboard
- View and manage multiple game development projects
- Track project status, team size, engine (Three.js / Babylon.js), and completion percentage
- Add, edit, and delete projects

### 🌐 Scene Manager
- Manage 3D scene configurations for Three.js and Babylon.js
- Track camera types, light counts, mesh counts, and texture usage per scene
- Tag scenes with objects (Skybox, Physics, NavMesh, PostProcessing, etc.)
- Filter scenes by engine (Three.js / Babylon.js)

### ✨ Shader Library
- Organize and manage vertex, fragment, post-process, and compute shaders
- Visual gradient preview for each shader
- Tag-based categorization (Lighting, PBR, VFX, Water, etc.)
- Filter shaders by type

### 📝 Code Snippets Library
- Reusable code patterns for Three.js, Babylon.js, GLSL, and WebGPU
- Searchable and filterable by engine and category
- One-click copy to clipboard
- Categories include Setup, Shaders, Physics, Assets, Interaction, Audio, and more

### 🎨 Asset Manager
- Organize game assets across 10 categories: 3D Models, Textures, Audio, Animations, UI Elements, Materials, Shaders, Prefabs, and Skyboxes
- Search and filter assets by type
- Track asset metadata including size and author

### ⚡ Performance Monitor
- Track WebGL/WebGPU performance metrics (draw calls, triangle count, frame time, etc.)
- Color-coded progress bars (green/yellow/red) based on thresholds
- Optimization tips for each metric
- Overview stats panel for key indicators

### 🚀 Build & Deploy Pipeline
- Monitor build and deployment status
- Track build duration and triggered-by information
- View build history with timestamps

### 👥 Team Management
- Manage team members and their roles (Admin, Developer, Artist, QA, Viewer)
- Track member status and last login times
- Assign role-based permissions

### 📅 Events Schedule
- Schedule and track live operations and events
- Categorize events by type (Seasonal, Update, Tournament, Hotfix)
- Monitor event status (Upcoming, Live, Ended)

### 📚 Documentation & Resources
- Quick links to Three.js and Babylon.js official docs, examples, playgrounds, and forums
- Essential tools section with links to physics engines (Cannon-es, Rapier), debug tools (Spector.js, Tweakpane), and utilities (glTF Report)
- Learning resources including Three.js Journey, WebGL/WebGPU Fundamentals, Book of Shaders, and Shadertoy

### 📈 Analytics & KPIs
- View key performance indicators including player-facing metrics
- Track FPS averages and WebGL crash rates alongside business metrics
- Trend indicators for each KPI

### 💾 Data Management
- **Persistent Storage**: All data is automatically saved to browser LocalStorage
- **Export Data**: Download all your data as a JSON file
- **Import Data**: Upload a JSON file to restore or migrate data
- **Reset**: Clear all data and restore default examples

## Getting Started

### Installation

1. Clone or download this repository
2. No build process or dependencies required - it's a standalone HTML/CSS/JS application

### Running the Application

Simply open `index.html` in a modern web browser:

```bash
# Using a local server (recommended)
python -m http.server 8000
# or
npx serve

# Then navigate to http://localhost:8000
```

Or directly open the file:
```bash
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

## Usage Guide

### Adding New Items

Each section has an "Add" button in the top-right corner:

1. **Add Project**: Click "+ Add Project" in the Dashboard section
2. **Add Scene**: Click "+ Add Scene" in the Scene Manager section
3. **Add Shader**: Click "+ Add Shader" in the Shader Library section
4. **Add Snippet**: Click "+ Add Snippet" in the Code Snippets section
5. **Add Asset**: Click "+ Add Asset" in the Asset Manager section
6. **Add Metric**: Click "+ Add Metric" in the Performance Monitor section
7. **Add Build**: Click "+ Add Build" in the Build Pipeline section
8. **Add Team Member**: Click "+ Add Member" in the Team section
9. **Add Event**: Click "+ Add Event" in the Events section
10. **Add KPI**: Click "+ Add KPI" in the Analytics section

Follow the prompts to enter the required information.

### Editing Items

Each item card or row has an edit button (✏️):
- Click the edit icon
- Update the information in the prompts
- Changes are automatically saved

### Deleting Items

Each item has a delete button (🗑️):
- Click the delete icon
- Confirm the deletion
- The item is permanently removed

### Searching and Filtering

**Asset Search**: Use the search bar in the Asset Manager to find assets by name or author.

**Asset Type Filter**: Click on type tags (All, 3D Models, Textures, Materials, Shaders, Prefabs, Skyboxes, etc.) to filter assets by category.

**Scene Engine Filter**: Use the engine toggle buttons (All Engines, Three.js, Babylon.js) to filter scenes by engine.

**Shader Type Filter**: Click on type tags (All, Vertex, Fragment, Post-Process, Compute) to filter shaders.

**Snippet Search & Filter**: Use the search bar and engine filter buttons (All, Three.js, Babylon.js, GLSL, WebGPU) to find code snippets.

### Data Management

Access data management controls in the top header:

- **💾 Export**: Download all your data as a JSON file for backup or migration
- **📥 Import**: Upload a previously exported JSON file to restore data
- **🔄 Reset**: Clear all data and restore the default example dataset

## Data Structure

All data is stored in browser LocalStorage with the following keys:

```javascript
{
  "projects": [...],      // Game project entries
  "scenes": [...],        // 3D scene configurations
  "shaders": [...],       // Shader library entries
  "snippets": [...],      // Code snippet entries
  "assets": [...],        // Asset entries
  "perfMetrics": [...],   // Performance metric entries
  "builds": [...],        // Build history
  "teamMembers": [...],   // Team member profiles
  "events": [...],        // Event schedules
  "kpis": [...]           // KPI metrics
}
```

### Example Data Format

**Project**:
```json
{
  "id": 1,
  "name": "Nebula Frontier (Three.js)",
  "status": "Active",
  "engine": "Three.js",
  "teamSize": 24,
  "lastUpdated": "2026-02-10",
  "completion": 78
}
```

**Scene**:
```json
{
  "id": 1,
  "name": "Battle Arena",
  "engine": "Babylon.js",
  "camera": "ArcRotateCamera",
  "lights": 5,
  "meshes": 48,
  "textures": 22,
  "status": "Active",
  "objects": ["Terrain", "PhysicsWorld", "NavMesh", "Shadows", "Water"]
}
```

**Shader**:
```json
{
  "id": 1,
  "name": "Toon Cel Shader",
  "type": "Fragment",
  "engine": "Three.js",
  "description": "Classic cel-shading with configurable edge detection",
  "color1": "#ff6b9d",
  "color2": "#c44569",
  "tags": ["Lighting", "NPR", "Stylized"]
}
```

**Code Snippet**:
```json
{
  "id": 1,
  "title": "Three.js Scene Setup",
  "engine": "Three.js",
  "category": "Setup",
  "description": "Basic Three.js scene with renderer, camera, and animation loop.",
  "code": "const scene = new THREE.Scene(); ..."
}
```

**Asset**:
```json
{
  "id": 1,
  "name": "Spaceship Hull",
  "type": "3D Models",
  "size": "14.2 MB",
  "author": "J. Park",
  "color": "#1e88e5"
}
```

**Team Member**:
```json
{
  "id": 1,
  "name": "Jordan Park",
  "email": "j.park@studio.io",
  "role": "Admin",
  "status": "Active",
  "lastLogin": "2026-02-10 14:00",
  "color": "#1e88e5"
}
```

**Event**:
```json
{
  "id": 1,
  "name": "Winter Clash 2026",
  "game": "Shadowkeep Arena",
  "start": "2026-02-15",
  "end": "2026-03-15",
  "status": "Upcoming",
  "type": "Seasonal"
}
```

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

LocalStorage must be enabled in your browser.

## Data Persistence

- Data is stored locally in your browser using LocalStorage
- Data persists across browser sessions
- Data is specific to the domain/origin
- Maximum storage: ~5-10MB (browser dependent)
- Clearing browser data will delete stored information (use Export feature for backups)

## Customization

### Modifying Default Data

Edit the `getDefault*()` methods in `app.js` to change the initial example data:
- `getDefaultProjects()`
- `getDefaultScenes()`
- `getDefaultShaders()`
- `getDefaultSnippets()`
- `getDefaultAssets()`
- `getDefaultPerfMetrics()`
- `getDefaultBuilds()`
- `getDefaultTeamMembers()`
- `getDefaultEvents()`
- `getDefaultKPIs()`

### Styling

Edit `styles.css` to customize colors, fonts, and layout. Key CSS variables are defined in the `:root` selector:

```css
:root {
  --blue-dark: #0a2463;
  --green-primary: #00c9a7;
  --bg-body: #060e24;
  --text-primary: #eef0ff;
  /* ... more variables */
}
```

## Deployment

### Static Hosting

Deploy to any static hosting service:

- **GitHub Pages**: Push to a repository and enable Pages
- **Netlify**: Drag and drop the folder or connect to Git
- **Vercel**: Import the project and deploy
- **AWS S3**: Upload files to an S3 bucket with static hosting enabled

### No Backend Required

This application runs entirely in the browser with no server-side dependencies. All data is stored locally using browser LocalStorage.

## Limitations

- Data is stored locally per browser/device
- No multi-user collaboration (single-user application)
- No real-time sync across devices
- Storage limited to browser's LocalStorage capacity (~5-10MB)
- No authentication or user management

## Future Enhancements

To make this a production-ready application with real data sharing:

1. **Backend API**: Add a Node.js/Express backend with database (PostgreSQL, MongoDB)
2. **Authentication**: Implement user login and authentication
3. **Real-time Sync**: Add WebSocket support for live updates
4. **File Uploads**: Support actual file uploads for 3D models, textures, and audio
5. **Multi-user**: Add collaboration features and permissions
6. **Cloud Storage**: Store assets in cloud storage (AWS S3, Azure Blob)
7. **Integrated 3D Preview**: Embed live Three.js/Babylon.js scene previews in the Scene Manager
8. **Shader Playground**: Add a live GLSL editor with real-time preview
9. **Performance Profiling**: Connect to real WebGL context for live performance monitoring
10. **Asset Pipeline Integration**: Connect to glTF pipeline tools for optimization
11. **Version Control**: Track asset and scene version history
12. **API Integration**: Connect to CI/CD tools, project management systems

## License

This project is open source and available for use and modification.

## Support

For issues, questions, or contributions, please open an issue in the repository.
