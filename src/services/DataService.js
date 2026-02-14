// ===== Data Service Layer (LocalStorage Implementation) =====

const DataService = {
  // Storage keys
  KEYS: {
    PROJECTS: 'dtcc_projects',
    ASSETS: 'dtcc_assets',
    BUILDS: 'dtcc_builds',
    TEAM_MEMBERS: 'dtcc_team_members',
    EVENTS: 'dtcc_events',
    KPIS: 'dtcc_kpis',
    SCENES: 'dtcc_scenes',
    SHADERS: 'dtcc_shaders',
    SNIPPETS: 'dtcc_snippets',
    PERF_METRICS: 'dtcc_perf_metrics'
  },

  // Initialize with default data if empty
  init() {
    if (!localStorage.getItem(this.KEYS.PROJECTS)) {
      this.saveProjects(this.getDefaultProjects());
    }
    if (!localStorage.getItem(this.KEYS.ASSETS)) {
      this.saveAssets(this.getDefaultAssets());
    }
    if (!localStorage.getItem(this.KEYS.BUILDS)) {
      this.saveBuilds(this.getDefaultBuilds());
    }
    if (!localStorage.getItem(this.KEYS.TEAM_MEMBERS)) {
      this.saveTeamMembers(this.getDefaultTeamMembers());
    }
    if (!localStorage.getItem(this.KEYS.EVENTS)) {
      this.saveEvents(this.getDefaultEvents());
    }
    if (!localStorage.getItem(this.KEYS.KPIS)) {
      this.saveKPIs(this.getDefaultKPIs());
    }
    if (!localStorage.getItem(this.KEYS.SCENES)) {
      this.saveScenes(this.getDefaultScenes());
    }
    if (!localStorage.getItem(this.KEYS.SHADERS)) {
      this.saveShaders(this.getDefaultShaders());
    }
    if (!localStorage.getItem(this.KEYS.SNIPPETS)) {
      this.saveSnippets(this.getDefaultSnippets());
    }
    if (!localStorage.getItem(this.KEYS.PERF_METRICS)) {
      this.savePerfMetrics(this.getDefaultPerfMetrics());
    }
  },

  // Generic CRUD operations
  load(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  },

  save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  },

  // Generic CRUD helpers
  _addItem(key, item) {
    const items = this.load(key);
    const maxId = items.reduce((max, i) => Math.max(max, i.id || 0), 0);
    item.id = maxId + 1;
    items.push(item);
    this.save(key, items);
    return item;
  },

  _updateItem(key, id, data) {
    const items = this.load(key);
    const idx = items.findIndex(i => i.id === id);
    if (idx !== -1) {
      items[idx] = { ...items[idx], ...data };
      this.save(key, items);
      return items[idx];
    }
    return null;
  },

  _deleteItem(key, id) {
    this.save(key, this.load(key).filter(i => i.id !== id));
  },

  // Projects
  getProjects() {
    return this.load(this.KEYS.PROJECTS);
  },

  saveProjects(projects) {
    this.save(this.KEYS.PROJECTS, projects);
  },

  addProject(project) {
    const projects = this.getProjects();
    const maxId = projects.length > 0 ? Math.max(...projects.map(p => p.id || 0)) : 0;
    project.id = maxId + 1;
    projects.push(project);
    this.saveProjects(projects);
    return project;
  },

  updateProject(id, updatedData) {
    const projects = this.getProjects();
    const index = projects.findIndex(p => p.id === id);
    if (index !== -1) {
      projects[index] = { ...projects[index], ...updatedData };
      this.saveProjects(projects);
      return projects[index];
    }
    return null;
  },

  deleteProject(id) {
    const projects = this.getProjects();
    const filtered = projects.filter(p => p.id !== id);
    this.saveProjects(filtered);
  },

  // Assets
  getAssets() {
    return this.load(this.KEYS.ASSETS);
  },

  saveAssets(assets) {
    this.save(this.KEYS.ASSETS, assets);
  },

  addAsset(asset) {
    const assets = this.getAssets();
    const maxId = assets.length > 0 ? Math.max(...assets.map(a => a.id || 0)) : 0;
    asset.id = maxId + 1;
    assets.push(asset);
    this.saveAssets(assets);
    return asset;
  },

  updateAsset(id, updatedData) {
    const assets = this.getAssets();
    const index = assets.findIndex(a => a.id === id);
    if (index !== -1) {
      assets[index] = { ...assets[index], ...updatedData };
      this.saveAssets(assets);
      return assets[index];
    }
    return null;
  },

  deleteAsset(id) {
    const assets = this.getAssets();
    const filtered = assets.filter(a => a.id !== id);
    this.saveAssets(filtered);
  },

  // Builds
  getBuilds() {
    return this.load(this.KEYS.BUILDS);
  },

  saveBuilds(builds) {
    this.save(this.KEYS.BUILDS, builds);
  },

  addBuild(build) {
    const builds = this.getBuilds();
    const maxId = builds.length > 0 ? Math.max(...builds.map(b => b.id || 0)) : 0;
    build.id = maxId + 1;
    builds.unshift(build);
    this.saveBuilds(builds);
    return build;
  },

  updateBuild(id, updatedData) {
    const builds = this.getBuilds();
    const index = builds.findIndex(b => b.id === id);
    if (index !== -1) {
      builds[index] = { ...builds[index], ...updatedData };
      this.saveBuilds(builds);
      return builds[index];
    }
    return null;
  },

  deleteBuild(id) {
    const builds = this.getBuilds();
    const filtered = builds.filter(b => b.id !== id);
    this.saveBuilds(filtered);
  },

  // Team Members
  getTeamMembers() {
    return this.load(this.KEYS.TEAM_MEMBERS);
  },

  saveTeamMembers(members) {
    this.save(this.KEYS.TEAM_MEMBERS, members);
  },

  addTeamMember(member) {
    const members = this.getTeamMembers();
    const maxId = members.length > 0 ? Math.max(...members.map(m => m.id || 0)) : 0;
    member.id = maxId + 1;
    members.push(member);
    this.saveTeamMembers(members);
    return member;
  },

  updateTeamMember(id, updatedData) {
    const members = this.getTeamMembers();
    const index = members.findIndex(m => m.id === id);
    if (index !== -1) {
      members[index] = { ...members[index], ...updatedData };
      this.saveTeamMembers(members);
      return members[index];
    }
    return null;
  },

  deleteTeamMember(id) {
    const members = this.getTeamMembers();
    const filtered = members.filter(m => m.id !== id);
    this.saveTeamMembers(filtered);
  },

  // Events
  getEvents() {
    return this.load(this.KEYS.EVENTS);
  },

  saveEvents(events) {
    this.save(this.KEYS.EVENTS, events);
  },

  addEvent(event) {
    const events = this.getEvents();
    const maxId = events.length > 0 ? Math.max(...events.map(e => e.id || 0)) : 0;
    event.id = maxId + 1;
    events.push(event);
    this.saveEvents(events);
    return event;
  },

  updateEvent(id, updatedData) {
    const events = this.getEvents();
    const index = events.findIndex(e => e.id === id);
    if (index !== -1) {
      events[index] = { ...events[index], ...updatedData };
      this.saveEvents(events);
      return events[index];
    }
    return null;
  },

  deleteEvent(id) {
    const events = this.getEvents();
    const filtered = events.filter(e => e.id !== id);
    this.saveEvents(filtered);
  },

  // KPIs
  getKPIs() {
    return this.load(this.KEYS.KPIS);
  },

  saveKPIs(kpis) {
    this.save(this.KEYS.KPIS, kpis);
  },

  addKPI(kpi) {
    const kpis = this.getKPIs();
    const idsWithValues = kpis.filter(k => k.id).map(k => k.id);
    const maxId = idsWithValues.length > 0 ? Math.max(...idsWithValues) : 0;
    kpi.id = maxId + 1;
    kpis.push(kpi);
    this.saveKPIs(kpis);
    return kpi;
  },

  updateKPI(id, updatedData) {
    const kpis = this.getKPIs();
    const index = kpis.findIndex(k => k.id === id);
    if (index !== -1) {
      kpis[index] = { ...kpis[index], ...updatedData };
      this.saveKPIs(kpis);
      return kpis[index];
    }
    return null;
  },

  deleteKPI(id) {
    const kpis = this.getKPIs();
    const filtered = kpis.filter(k => k.id !== id);
    this.saveKPIs(filtered);
  },

  // Scenes
  getScenes() { return this.load(this.KEYS.SCENES); },
  saveScenes(scenes) { this.save(this.KEYS.SCENES, scenes); },
  addScene(scene) { return this._addItem(this.KEYS.SCENES, scene); },
  updateScene(id, data) { return this._updateItem(this.KEYS.SCENES, id, data); },
  deleteScene(id) { this._deleteItem(this.KEYS.SCENES, id); },

  // Shaders
  getShaders() { return this.load(this.KEYS.SHADERS); },
  saveShaders(shaders) { this.save(this.KEYS.SHADERS, shaders); },
  addShader(shader) { return this._addItem(this.KEYS.SHADERS, shader); },
  updateShader(id, data) { return this._updateItem(this.KEYS.SHADERS, id, data); },
  deleteShader(id) { this._deleteItem(this.KEYS.SHADERS, id); },

  // Snippets
  getSnippets() { return this.load(this.KEYS.SNIPPETS); },
  saveSnippets(snippets) { this.save(this.KEYS.SNIPPETS, snippets); },
  addSnippet(snippet) { return this._addItem(this.KEYS.SNIPPETS, snippet); },
  updateSnippet(id, data) { return this._updateItem(this.KEYS.SNIPPETS, id, data); },
  deleteSnippet(id) { this._deleteItem(this.KEYS.SNIPPETS, id); },

  // Performance Metrics
  getPerfMetrics() { return this.load(this.KEYS.PERF_METRICS); },
  savePerfMetrics(metrics) { this.save(this.KEYS.PERF_METRICS, metrics); },
  addPerfMetric(metric) { return this._addItem(this.KEYS.PERF_METRICS, metric); },
  updatePerfMetric(id, data) { return this._updateItem(this.KEYS.PERF_METRICS, id, data); },
  deletePerfMetric(id) { this._deleteItem(this.KEYS.PERF_METRICS, id); },

  // Export all data
  exportData() {
    return {
      projects: this.getProjects(),
      assets: this.getAssets(),
      builds: this.getBuilds(),
      teamMembers: this.getTeamMembers(),
      events: this.getEvents(),
      kpis: this.getKPIs(),
      scenes: this.getScenes(),
      shaders: this.getShaders(),
      snippets: this.getSnippets(),
      perfMetrics: this.getPerfMetrics()
    };
  },

  // Import all data
  importData(data) {
    if (data.projects) this.saveProjects(data.projects);
    if (data.assets) this.saveAssets(data.assets);
    if (data.builds) this.saveBuilds(data.builds);
    if (data.teamMembers) this.saveTeamMembers(data.teamMembers);
    if (data.events) this.saveEvents(data.events);
    if (data.kpis) this.saveKPIs(data.kpis);
    if (data.scenes) this.saveScenes(data.scenes);
    if (data.shaders) this.saveShaders(data.shaders);
    if (data.snippets) this.saveSnippets(data.snippets);
    if (data.perfMetrics) this.savePerfMetrics(data.perfMetrics);
  },

  // Reset to default data
  resetToDefaults() {
    this.saveProjects(this.getDefaultProjects());
    this.saveAssets(this.getDefaultAssets());
    this.saveBuilds(this.getDefaultBuilds());
    this.saveTeamMembers(this.getDefaultTeamMembers());
    this.saveEvents(this.getDefaultEvents());
    this.saveKPIs(this.getDefaultKPIs());
    this.saveScenes(this.getDefaultScenes());
    this.saveShaders(this.getDefaultShaders());
    this.saveSnippets(this.getDefaultSnippets());
    this.savePerfMetrics(this.getDefaultPerfMetrics());
  },

  // Default data sets
  getDefaultProjects() {
    return [
      { id: 1, name: "Nebula Frontier (Three.js)", status: "Active", teamSize: 24, lastUpdated: "2026-02-10", completion: 78, engine: "Three.js", description: "Open-world space exploration game with procedural generation and multiplayer combat.", repoUrl: "https://github.com/studio/nebula-frontier" },
      { id: 2, name: "Shadowkeep Arena (Babylon.js)", status: "Beta", teamSize: 18, lastUpdated: "2026-02-08", completion: 92, engine: "Babylon.js", description: "Competitive PvP arena shooter with ranked matchmaking and seasonal content.", repoUrl: "https://github.com/studio/shadowkeep-arena" },
      { id: 3, name: "Pixel Odyssey (Three.js)", status: "Alpha", teamSize: 12, lastUpdated: "2026-02-06", completion: 45, engine: "Three.js", description: "Retro-inspired platformer with roguelike elements and pixel art graphics.", repoUrl: "https://github.com/studio/pixel-odyssey" },
      { id: 4, name: "Titan Forge (Babylon.js)", status: "Maintenance", teamSize: 8, lastUpdated: "2025-12-20", completion: 100, engine: "Babylon.js", description: "Crafting and building simulation game in maintenance mode.", repoUrl: "" },
      { id: 5, name: "Void Runners (Three.js)", status: "Active", teamSize: 20, lastUpdated: "2026-02-09", completion: 62, engine: "Three.js", description: "Fast-paced racing game set in zero-gravity environments.", repoUrl: "https://github.com/studio/void-runners" },
    ];
  },

  getDefaultAssets() {
    return [
      { id: 1, name: "Spaceship Hull", type: "3D Models", size: "14.2 MB", author: "J. Park", color: "#1e88e5" },
      { id: 2, name: "Lava Texture Pack", type: "Textures", size: "8.7 MB", author: "S. Chen", color: "#ff5252" },
      { id: 3, name: "Laser SFX Bundle", type: "Audio", size: "3.1 MB", author: "M. Rivera", color: "#00c9a7" },
      { id: 4, name: "Character Run Cycle", type: "Animations", size: "6.4 MB", author: "A. Kowalski", color: "#ffab40" },
      { id: 5, name: "HUD Crosshair Set", type: "UI Elements", size: "1.2 MB", author: "L. Nguyen", color: "#42a5f5" },
      { id: 6, name: "Forest Ambience", type: "Audio", size: "5.8 MB", author: "D. Okafor", color: "#00e676" },
      { id: 7, name: "Stone Wall Tileset", type: "Textures", size: "11.3 MB", author: "R. Müller", color: "#8d6e63" },
      { id: 8, name: "Dragon Rig", type: "3D Models", size: "22.6 MB", author: "K. Tanaka", color: "#7c4dff" },
      { id: 9, name: "PBR Metal Material", type: "Materials", size: "4.1 MB", author: "S. Chen", color: "#90a4ae" },
      { id: 10, name: "HDR Sky Panorama", type: "Skyboxes", size: "18.5 MB", author: "D. Okafor", color: "#29b6f6" },
      { id: 11, name: "Dungeon Prefab Kit", type: "Prefabs", size: "32.0 MB", author: "A. Kowalski", color: "#ab47bc" },
      { id: 12, name: "Water Shader Pack", type: "Shaders", size: "0.8 MB", author: "K. Tanaka", color: "#26c6da" },
    ];
  },

  getDefaultBuilds() {
    return [
      { id: 1, project: "Nebula Frontier", branch: "main", status: "Success", duration: "4m 32s", triggeredBy: "J. Park", timestamp: "2026-02-10 14:23" },
      { id: 2, project: "Shadowkeep Arena", branch: "release/0.9", status: "Success", duration: "6m 11s", triggeredBy: "CI Bot", timestamp: "2026-02-10 12:05" },
      { id: 3, project: "Pixel Odyssey", branch: "feature/inventory", status: "Failed", duration: "2m 48s", triggeredBy: "A. Kowalski", timestamp: "2026-02-10 10:17" },
      { id: 4, project: "Titan Forge", branch: "hotfix/crash", status: "Success", duration: "3m 05s", triggeredBy: "L. Nguyen", timestamp: "2026-02-09 22:44" },
      { id: 5, project: "Nebula Frontier", branch: "feature/multiplayer", status: "In Progress", duration: "1m 22s", triggeredBy: "S. Chen", timestamp: "2026-02-10 14:50" },
      { id: 6, project: "Void Runners", branch: "develop", status: "Failed", duration: "5m 09s", triggeredBy: "M. Rivera", timestamp: "2026-02-10 09:30" },
      { id: 7, project: "Shadowkeep Arena", branch: "main", status: "Success", duration: "5m 55s", triggeredBy: "D. Okafor", timestamp: "2026-02-09 18:12" },
    ];
  },

  getDefaultTeamMembers() {
    return [
      { id: 1, name: "Jordan Park", email: "j.park@studio.io", role: "Admin", status: "Active", lastLogin: "2026-02-10 14:00", color: "#1e88e5" },
      { id: 2, name: "Sofia Chen", email: "s.chen@studio.io", role: "Developer", status: "Active", lastLogin: "2026-02-10 13:45", color: "#00c9a7" },
      { id: 3, name: "Adam Kowalski", email: "a.kowalski@studio.io", role: "Artist", status: "Active", lastLogin: "2026-02-10 11:20", color: "#ffab40" },
      { id: 4, name: "Mei Rivera", email: "m.rivera@studio.io", role: "QA", status: "Active", lastLogin: "2026-02-09 17:30", color: "#ff5252" },
      { id: 5, name: "Linh Nguyen", email: "l.nguyen@studio.io", role: "Developer", status: "Inactive", lastLogin: "2025-12-28 09:15", color: "#7c4dff" },
      { id: 6, name: "David Okafor", email: "d.okafor@studio.io", role: "Viewer", status: "Active", lastLogin: "2026-02-10 08:00", color: "#42a5f5" },
      { id: 7, name: "Kira Tanaka", email: "k.tanaka@studio.io", role: "Artist", status: "Active", lastLogin: "2026-02-10 12:10", color: "#00e676" },
    ];
  },

  getDefaultEvents() {
    return [
      { id: 1, name: "Winter Clash 2026", game: "Shadowkeep Arena", start: "2026-02-15", end: "2026-03-15", status: "Upcoming", type: "Seasonal" },
      { id: 2, name: "Nebula Open Beta", game: "Nebula Frontier", start: "2026-02-20", end: "2026-03-03", status: "Upcoming", type: "Update" },
      { id: 3, name: "Pixel World Cup", game: "Pixel Odyssey", start: "2026-02-05", end: "2026-02-12", status: "Live", type: "Tournament" },
      { id: 4, name: "Forge Stability Patch", game: "Titan Forge", start: "2025-12-20", end: "2025-12-20", status: "Ended", type: "Hotfix" },
      { id: 5, name: "Void Speed Trials", game: "Void Runners", start: "2026-03-01", end: "2026-03-14", status: "Upcoming", type: "Tournament" },
      { id: 6, name: "Shadow Halloween Event", game: "Shadowkeep Arena", start: "2025-10-20", end: "2025-11-05", status: "Ended", type: "Seasonal" },
      { id: 7, name: "Nebula v1.2 Rollout", game: "Nebula Frontier", start: "2026-02-10", end: "2026-02-10", status: "Live", type: "Update" },
    ];
  },

  getDefaultKPIs() {
    return [
      { id: 1, label: "Daily Active Users", value: "128,430", trend: "up", change: "+12.4%" },
      { id: 2, label: "Revenue (MTD)", value: "$1.42M", trend: "up", change: "+8.1%" },
      { id: 3, label: "Retention Rate (D7)", value: "41.2%", trend: "down", change: "-2.3%" },
      { id: 4, label: "Avg Session Duration", value: "24m 18s", trend: "up", change: "+5.7%" },
      { id: 5, label: "New Users (Today)", value: "9,812", trend: "up", change: "+18.6%" },
      { id: 6, label: "Conversion Rate", value: "3.8%", trend: "down", change: "-0.4%" },
      { id: 7, label: "Avg FPS (Players)", value: "58.3", trend: "up", change: "+3.2%" },
      { id: 8, label: "WebGL Crash Rate", value: "0.12%", trend: "down", change: "-0.05%" },
    ];
  },

  getDefaultScenes() {
    return [
      { id: 1, name: "Main Menu", engine: "Three.js", camera: "PerspectiveCamera", lights: 3, meshes: 12, textures: 8, status: "Active", objects: ["Skybox", "ParticleSystem", "UI Overlay", "PostProcessing"] },
      { id: 2, name: "Battle Arena", engine: "Babylon.js", camera: "ArcRotateCamera", lights: 5, meshes: 48, textures: 22, status: "Active", objects: ["Terrain", "PhysicsWorld", "NavMesh", "Shadows", "Water"] },
      { id: 3, name: "Inventory Screen", engine: "Three.js", camera: "OrthographicCamera", lights: 2, meshes: 6, textures: 4, status: "WIP", objects: ["ItemGrid", "3D Preview", "UI Canvas"] },
      { id: 4, name: "Open World Zone 1", engine: "Babylon.js", camera: "FollowCamera", lights: 4, meshes: 156, textures: 64, status: "Active", objects: ["LOD Terrain", "Foliage", "NPCs", "PhysicsAggregate", "Fog"] },
      { id: 5, name: "Cutscene Intro", engine: "Three.js", camera: "CinematicCamera", lights: 6, meshes: 24, textures: 16, status: "WIP", objects: ["AnimationMixer", "AudioListener", "Timeline", "Bloom"] },
      { id: 6, name: "Multiplayer Lobby", engine: "Babylon.js", camera: "FreeCamera", lights: 3, meshes: 20, textures: 12, status: "Active", objects: ["GUI", "Avatars", "ChatOverlay", "Particles"] },
    ];
  },

  getDefaultShaders() {
    return [
      { id: 1, name: "Toon Cel Shader", type: "Fragment", engine: "Three.js", description: "Classic cel-shading with configurable edge detection and color banding.", color1: "#ff6b9d", color2: "#c44569", tags: ["Lighting", "NPR", "Stylized"] },
      { id: 2, name: "PBR Water Surface", type: "Vertex", engine: "Babylon.js", description: "Physically-based water with wave displacement, foam, and subsurface scattering.", color1: "#26c6da", color2: "#0097a7", tags: ["Water", "PBR", "Displacement"] },
      { id: 3, name: "Bloom Post-Process", type: "Post-Process", engine: "Three.js", description: "HDR bloom effect with configurable threshold, intensity, and blur passes.", color1: "#ffd740", color2: "#ff6f00", tags: ["Post-Process", "HDR", "Glow"] },
      { id: 4, name: "Dissolve Effect", type: "Fragment", engine: "Three.js", description: "Noise-based dissolve transition with customizable edge glow and color.", color1: "#e040fb", color2: "#7c4dff", tags: ["VFX", "Noise", "Transition"] },
      { id: 5, name: "Terrain Splatmap", type: "Fragment", engine: "Babylon.js", description: "Multi-texture terrain blending using splatmap with triplanar projection.", color1: "#66bb6a", color2: "#2e7d32", tags: ["Terrain", "Blending", "Triplanar"] },
      { id: 6, name: "Screen-Space Reflections", type: "Post-Process", engine: "Babylon.js", description: "Ray-marched screen-space reflections for glossy surfaces.", color1: "#42a5f5", color2: "#1565c0", tags: ["SSR", "Reflections", "Ray March"] },
      { id: 7, name: "Hologram Effect", type: "Vertex", engine: "Three.js", description: "Animated hologram with scan lines, flicker, and edge glow.", color1: "#00e5ff", color2: "#00838f", tags: ["VFX", "Sci-Fi", "Animation"] },
      { id: 8, name: "GPU Particle Compute", type: "Compute", engine: "Babylon.js", description: "WebGPU compute shader for particle simulation with forces and collisions.", color1: "#ff5252", color2: "#b71c1c", tags: ["Particles", "WebGPU", "Simulation"] },
    ];
  },

  getDefaultSnippets() {
    return [
      { id: 1, title: "Three.js Scene Setup", engine: "Three.js", category: "Setup", description: "Basic Three.js scene with renderer, camera, and animation loop.", code: "const scene = new THREE.Scene();\nconst camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);\nconst renderer = new THREE.WebGLRenderer({ antialias: true });\nrenderer.setSize(window.innerWidth, window.innerHeight);\ndocument.body.appendChild(renderer.domElement);\n\nfunction animate() {\n  requestAnimationFrame(animate);\n  renderer.render(scene, camera);\n}\nanimate();" },
      { id: 2, title: "Babylon.js Scene Setup", engine: "Babylon.js", category: "Setup", description: "Basic Babylon.js engine initialization with scene and render loop.", code: "const canvas = document.getElementById('renderCanvas');\nconst engine = new BABYLON.Engine(canvas, true);\nconst scene = new BABYLON.Scene(engine);\nconst camera = new BABYLON.ArcRotateCamera('cam', Math.PI/4, Math.PI/3, 10, BABYLON.Vector3.Zero(), scene);\ncamera.attachControl(canvas, true);\nnew BABYLON.HemisphericLight('light', new BABYLON.Vector3(0,1,0), scene);\nengine.runRenderLoop(() => scene.render());" },
      { id: 3, title: "GLTF Model Loading", engine: "Three.js", category: "Assets", description: "Load a glTF/GLB model with draco compression support.", code: "import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';\nimport { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';\n\nconst dracoLoader = new DRACOLoader();\ndracoLoader.setDecoderPath('/draco/');\nconst loader = new GLTFLoader();\nloader.setDRACOLoader(dracoLoader);\nloader.load('model.glb', (gltf) => {\n  scene.add(gltf.scene);\n});" },
      { id: 4, title: "Physics with Havok", engine: "Babylon.js", category: "Physics", description: "Set up Havok physics engine with ground and dynamic sphere.", code: "const havokInstance = await HavokPhysics();\nconst hk = new BABYLON.HavokPlugin(true, havokInstance);\nscene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), hk);\n\nconst ground = BABYLON.MeshBuilder.CreateGround('g', {width:10, height:10});\nnew BABYLON.PhysicsAggregate(ground, BABYLON.PhysicsShapeType.BOX, {mass:0}, scene);" },
      { id: 5, title: "Custom ShaderMaterial", engine: "Three.js", category: "Shaders", description: "Create a custom shader material with uniforms and animation.", code: "const material = new THREE.ShaderMaterial({\n  uniforms: {\n    uTime: { value: 0 },\n    uColor: { value: new THREE.Color('#00c9a7') }\n  },\n  vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,\n  fragmentShader: `uniform float uTime; uniform vec3 uColor; varying vec2 vUv; void main() { float pulse = sin(uTime * 2.0) * 0.5 + 0.5; gl_FragColor = vec4(uColor * pulse, 1.0); }`\n});" },
      { id: 6, title: "Raycasting & Picking", engine: "Three.js", category: "Interaction", description: "Mouse-based raycasting for 3D object picking.", code: "const raycaster = new THREE.Raycaster();\nconst pointer = new THREE.Vector2();\nwindow.addEventListener('click', (event) => {\n  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;\n  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;\n  raycaster.setFromCamera(pointer, camera);\n  const intersects = raycaster.intersectObjects(scene.children, true);\n  if (intersects.length > 0) console.log('Hit:', intersects[0].object.name);\n});" },
    ];
  },

  getDefaultPerfMetrics() {
    return [
      { id: 1, name: "Draw Calls", category: "Rendering", value: 142, max: 500, unit: "calls/frame", tip: "Keep under 200 for mobile, 500 for desktop" },
      { id: 2, name: "Triangle Count", category: "Geometry", value: 245000, max: 1000000, unit: "tris/frame", tip: "Target under 500K for mobile, 2M for desktop" },
      { id: 3, name: "Texture Memory", category: "Memory", value: 256, max: 1024, unit: "MB", tip: "Compress textures with KTX2/Basis for 4x savings" },
      { id: 4, name: "Shader Switches", category: "Rendering", value: 18, max: 50, unit: "switches/frame", tip: "Batch materials and use texture atlases" },
      { id: 5, name: "Frame Time", category: "Performance", value: 12.4, max: 33.3, unit: "ms", tip: "16.67ms = 60 FPS, 33.3ms = 30 FPS" },
      { id: 6, name: "JS Heap Size", category: "Memory", value: 48, max: 256, unit: "MB", tip: "Watch for GC pauses causing frame drops" },
      { id: 7, name: "GPU Utilization", category: "Performance", value: 68, max: 100, unit: "%", tip: "Keep headroom for spikes and particle effects" },
      { id: 8, name: "Asset Load Time", category: "Loading", value: 2.8, max: 10, unit: "seconds", tip: "Use progressive loading and LODs" },
    ];
  }
};

// Initialize data service on load
DataService.init();

export default DataService;
