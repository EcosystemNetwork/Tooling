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
    builds.unshift(build); // Add to beginning for most recent first
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
  addScene(scene) {
    const scenes = this.getScenes();
    const maxId = scenes.length > 0 ? Math.max(...scenes.map(s => s.id || 0)) : 0;
    scene.id = maxId + 1;
    scenes.push(scene);
    this.saveScenes(scenes);
    return scene;
  },
  updateScene(id, data) {
    const scenes = this.getScenes();
    const idx = scenes.findIndex(s => s.id === id);
    if (idx !== -1) { scenes[idx] = { ...scenes[idx], ...data }; this.saveScenes(scenes); return scenes[idx]; }
    return null;
  },
  deleteScene(id) { this.saveScenes(this.getScenes().filter(s => s.id !== id)); },

  // Shaders
  getShaders() { return this.load(this.KEYS.SHADERS); },
  saveShaders(shaders) { this.save(this.KEYS.SHADERS, shaders); },
  addShader(shader) {
    const shaders = this.getShaders();
    const maxId = shaders.length > 0 ? Math.max(...shaders.map(s => s.id || 0)) : 0;
    shader.id = maxId + 1;
    shaders.push(shader);
    this.saveShaders(shaders);
    return shader;
  },
  updateShader(id, data) {
    const shaders = this.getShaders();
    const idx = shaders.findIndex(s => s.id === id);
    if (idx !== -1) { shaders[idx] = { ...shaders[idx], ...data }; this.saveShaders(shaders); return shaders[idx]; }
    return null;
  },
  deleteShader(id) { this.saveShaders(this.getShaders().filter(s => s.id !== id)); },

  // Snippets
  getSnippets() { return this.load(this.KEYS.SNIPPETS); },
  saveSnippets(snippets) { this.save(this.KEYS.SNIPPETS, snippets); },
  addSnippet(snippet) {
    const snippets = this.getSnippets();
    const maxId = snippets.length > 0 ? Math.max(...snippets.map(s => s.id || 0)) : 0;
    snippet.id = maxId + 1;
    snippets.push(snippet);
    this.saveSnippets(snippets);
    return snippet;
  },
  updateSnippet(id, data) {
    const snippets = this.getSnippets();
    const idx = snippets.findIndex(s => s.id === id);
    if (idx !== -1) { snippets[idx] = { ...snippets[idx], ...data }; this.saveSnippets(snippets); return snippets[idx]; }
    return null;
  },
  deleteSnippet(id) { this.saveSnippets(this.getSnippets().filter(s => s.id !== id)); },

  // Performance Metrics
  getPerfMetrics() { return this.load(this.KEYS.PERF_METRICS); },
  savePerfMetrics(metrics) { this.save(this.KEYS.PERF_METRICS, metrics); },
  addPerfMetric(metric) {
    const metrics = this.getPerfMetrics();
    const maxId = metrics.length > 0 ? Math.max(...metrics.map(m => m.id || 0)) : 0;
    metric.id = maxId + 1;
    metrics.push(metric);
    this.savePerfMetrics(metrics);
    return metric;
  },
  updatePerfMetric(id, data) {
    const metrics = this.getPerfMetrics();
    const idx = metrics.findIndex(m => m.id === id);
    if (idx !== -1) { metrics[idx] = { ...metrics[idx], ...data }; this.savePerfMetrics(metrics); return metrics[idx]; }
    return null;
  },
  deletePerfMetric(id) { this.savePerfMetrics(this.getPerfMetrics().filter(m => m.id !== id)); },

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
      { id: 1, name: "Nebula Frontier (Three.js)", status: "Active", teamSize: 24, lastUpdated: "2026-02-10", completion: 78, engine: "Three.js" },
      { id: 2, name: "Shadowkeep Arena (Babylon.js)", status: "Beta", teamSize: 18, lastUpdated: "2026-02-08", completion: 92, engine: "Babylon.js" },
      { id: 3, name: "Pixel Odyssey (Three.js)", status: "Alpha", teamSize: 12, lastUpdated: "2026-02-06", completion: 45, engine: "Three.js" },
      { id: 4, name: "Titan Forge (Babylon.js)", status: "Maintenance", teamSize: 8, lastUpdated: "2025-12-20", completion: 100, engine: "Babylon.js" },
      { id: 5, name: "Void Runners (Three.js)", status: "Active", teamSize: 20, lastUpdated: "2026-02-09", completion: 62, engine: "Three.js" },
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
      {
        id: 1,
        title: "Three.js Scene Setup",
        engine: "Three.js",
        category: "Setup",
        description: "Basic Three.js scene with renderer, camera, and animation loop.",
        code: "const scene = new THREE.Scene();\nconst camera = new THREE.PerspectiveCamera(\n  75, window.innerWidth / window.innerHeight,\n  0.1, 1000\n);\nconst renderer = new THREE.WebGLRenderer({\n  antialias: true\n});\nrenderer.setSize(window.innerWidth, window.innerHeight);\nrenderer.setPixelRatio(window.devicePixelRatio);\ndocument.body.appendChild(renderer.domElement);\n\ncamera.position.z = 5;\n\nfunction animate() {\n  requestAnimationFrame(animate);\n  renderer.render(scene, camera);\n}\nanimate();"
      },
      {
        id: 2,
        title: "Babylon.js Scene Setup",
        engine: "Babylon.js",
        category: "Setup",
        description: "Basic Babylon.js engine initialization with scene and render loop.",
        code: "const canvas = document.getElementById('renderCanvas');\nconst engine = new BABYLON.Engine(canvas, true);\n\nconst scene = new BABYLON.Scene(engine);\nconst camera = new BABYLON.ArcRotateCamera(\n  'cam', Math.PI / 4, Math.PI / 3, 10,\n  BABYLON.Vector3.Zero(), scene\n);\ncamera.attachControl(canvas, true);\n\nnew BABYLON.HemisphericLight(\n  'light', new BABYLON.Vector3(0, 1, 0), scene\n);\n\nengine.runRenderLoop(() => scene.render());\nwindow.addEventListener('resize',\n  () => engine.resize()\n);"
      },
      {
        id: 3,
        title: "GLTF Model Loading",
        engine: "Three.js",
        category: "Assets",
        description: "Load a glTF/GLB model with draco compression support.",
        code: "import { GLTFLoader } from\n  'three/addons/loaders/GLTFLoader.js';\nimport { DRACOLoader } from\n  'three/addons/loaders/DRACOLoader.js';\n\nconst dracoLoader = new DRACOLoader();\ndracoLoader.setDecoderPath('/draco/');\n\nconst loader = new GLTFLoader();\nloader.setDRACOLoader(dracoLoader);\n\nloader.load('model.glb', (gltf) => {\n  scene.add(gltf.scene);\n  gltf.animations.forEach((clip) => {\n    const mixer = new THREE.AnimationMixer(\n      gltf.scene\n    );\n    mixer.clipAction(clip).play();\n  });\n});"
      },
      {
        id: 4,
        title: "Physics with Havok",
        engine: "Babylon.js",
        category: "Physics",
        description: "Set up Havok physics engine with ground and dynamic sphere.",
        code: "const havokInstance = await\n  HavokPhysics();\nconst hk = new BABYLON.HavokPlugin(\n  true, havokInstance\n);\nscene.enablePhysics(\n  new BABYLON.Vector3(0, -9.81, 0), hk\n);\n\nconst ground = BABYLON.MeshBuilder\n  .CreateGround('g', { width: 10, height: 10 });\nnew BABYLON.PhysicsAggregate(\n  ground,\n  BABYLON.PhysicsShapeType.BOX,\n  { mass: 0 }, scene\n);\n\nconst sphere = BABYLON.MeshBuilder\n  .CreateSphere('s', { diameter: 1 });\nsphere.position.y = 5;\nnew BABYLON.PhysicsAggregate(\n  sphere,\n  BABYLON.PhysicsShapeType.SPHERE,\n  { mass: 1, restitution: 0.7 }, scene\n);"
      },
      {
        id: 5,
        title: "Custom ShaderMaterial",
        engine: "Three.js",
        category: "Shaders",
        description: "Create a custom shader material with uniforms and animation.",
        code: "const material = new THREE.ShaderMaterial({\n  uniforms: {\n    uTime: { value: 0 },\n    uColor: { value: new THREE.Color('#00c9a7') }\n  },\n  vertexShader: `\n    varying vec2 vUv;\n    void main() {\n      vUv = uv;\n      gl_Position = projectionMatrix\n        * modelViewMatrix\n        * vec4(position, 1.0);\n    }\n  `,\n  fragmentShader: `\n    uniform float uTime;\n    uniform vec3 uColor;\n    varying vec2 vUv;\n    void main() {\n      float pulse = sin(uTime * 2.0) * 0.5\n        + 0.5;\n      gl_FragColor = vec4(\n        uColor * pulse, 1.0\n      );\n    }\n  `\n});"
      },
      {
        id: 6,
        title: "Node Material Builder",
        engine: "Babylon.js",
        category: "Shaders",
        description: "Create a procedural material using Babylon.js Node Material.",
        code: "const nodeMat = new BABYLON.NodeMaterial(\n  'nodeMat', scene\n);\nawait nodeMat.loadAsync(\n  'https://nme.babylonjs.com/'\n  + '#EXAMPLE_ID'\n);\nnodeMat.build(true);\n\n// Or build programmatically:\nconst nme = new BABYLON.NodeMaterial(\n  'custom'\n);\nconst position = new BABYLON.InputBlock(\n  'position'\n);\nposition.setAsAttribute('position');\nconst worldPos = new BABYLON\n  .WorldPositionBlock('worldPos');\nposition.connectTo(worldPos);\nnme.build();\nmesh.material = nme;"
      },
      {
        id: 7,
        title: "Raycasting & Picking",
        engine: "Three.js",
        category: "Interaction",
        description: "Mouse-based raycasting for 3D object picking and interaction.",
        code: "const raycaster = new THREE.Raycaster();\nconst pointer = new THREE.Vector2();\n\nwindow.addEventListener('click', (event) => {\n  pointer.x = (event.clientX\n    / window.innerWidth) * 2 - 1;\n  pointer.y = -(event.clientY\n    / window.innerHeight) * 2 + 1;\n\n  raycaster.setFromCamera(pointer, camera);\n  const intersects = raycaster\n    .intersectObjects(scene.children, true);\n\n  if (intersects.length > 0) {\n    const hit = intersects[0];\n    console.log('Hit:', hit.object.name);\n    hit.object.material.emissive\n      .set(0x00ff00);\n  }\n});"
      },
      {
        id: 8,
        title: "Spatial Audio Setup",
        engine: "Three.js",
        category: "Audio",
        description: "3D positional audio with distance attenuation and Doppler effect.",
        code: "const listener = new THREE.AudioListener();\ncamera.add(listener);\n\nconst sound = new THREE.PositionalAudio(\n  listener\n);\nconst audioLoader = new THREE.AudioLoader();\naudioLoader.load('sound.mp3', (buffer) => {\n  sound.setBuffer(buffer);\n  sound.setRefDistance(10);\n  sound.setRolloffFactor(1);\n  sound.setDistanceModel('exponential');\n  sound.setLoop(true);\n  sound.play();\n});\n\n// Attach to a mesh\nemitterMesh.add(sound);"
      },
      {
        id: 9,
        title: "GLSL Noise Function",
        engine: "GLSL",
        category: "Shaders",
        description: "Classic Simplex noise implementation for procedural effects.",
        code: "vec3 mod289(vec3 x) {\n  return x - floor(x / 289.0) * 289.0;\n}\nvec2 mod289(vec2 x) {\n  return x - floor(x / 289.0) * 289.0;\n}\nvec3 permute(vec3 x) {\n  return mod289((x * 34.0 + 1.0) * x);\n}\nfloat snoise(vec2 v) {\n  const vec4 C = vec4(\n    0.211324865405187,\n    0.366025403784439,\n    -0.577350269189626,\n    0.024390243902439\n  );\n  vec2 i = floor(v + dot(v, C.yy));\n  vec2 x0 = v - i + dot(i, C.xx);\n  vec2 i1 = (x0.x > x0.y)\n    ? vec2(1.0, 0.0)\n    : vec2(0.0, 1.0);\n  vec4 x12 = x0.xyxy + C.xxzz;\n  x12.xy -= i1;\n  i = mod289(i);\n  vec3 p = permute(\n    permute(i.y + vec3(0.0, i1.y, 1.0))\n    + i.x + vec3(0.0, i1.x, 1.0)\n  );\n  vec3 m = max(\n    0.5 - vec3(\n      dot(x0,x0),\n      dot(x12.xy,x12.xy),\n      dot(x12.zw,x12.zw)\n    ), 0.0\n  );\n  m = m * m; m = m * m;\n  vec3 x = 2.0 * fract(p * C.www) - 1.0;\n  vec3 h = abs(x) - 0.5;\n  vec3 ox = floor(x + 0.5);\n  vec3 a0 = x - ox;\n  m *= 1.79284291400159 - 0.85373472095314\n    * (a0*a0 + h*h);\n  vec3 g;\n  g.x = a0.x * x0.x + h.x * x0.y;\n  g.yz = a0.yz * x12.xz + h.yz * x12.yw;\n  return 130.0 * dot(m, g);\n}"
      },
      {
        id: 10,
        title: "WebGPU Compute Basics",
        engine: "WebGPU",
        category: "Compute",
        description: "Minimal WebGPU compute shader for parallel data processing.",
        code: "const adapter = await navigator.gpu\n  .requestAdapter();\nconst device = await adapter\n  .requestDevice();\n\nconst shaderModule = device\n  .createShaderModule({\n  code: `\n    @group(0) @binding(0)\n    var<storage, read_write>\n      data: array<f32>;\n\n    @compute @workgroup_size(64)\n    fn main(\n      @builtin(global_invocation_id)\n      id: vec3<u32>\n    ) {\n      data[id.x] = data[id.x] * 2.0;\n    }\n  `\n});\n\nconst pipeline = device\n  .createComputePipeline({\n  layout: 'auto',\n  compute: {\n    module: shaderModule,\n    entryPoint: 'main'\n  }\n});"
      }
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

// ===== Data Access (now using DataService) =====

const assetTypes = ["All", "3D Models", "Textures", "Audio", "Animations", "UI Elements", "Materials", "Shaders", "Prefabs", "Skyboxes"];

// Helper to get data from service
let projects = [];
let assets = [];
let builds = [];
let teamMembers = [];
let events = [];
let kpis = [];
let scenes = [];
let shaders = [];
let snippets = [];
let perfMetrics = [];

// ===== Helpers =====

function getInitials(name) {
  return name.split(" ").map(w => w[0]).join("").toUpperCase();
}

function statusBadgeClass(status) {
  const map = { Active: "badge-active", Beta: "badge-beta", Alpha: "badge-alpha", Maintenance: "badge-maintenance" };
  return map[status] || "";
}

function buildStatusClass(status) {
  if (status === "Success") return "badge-success";
  if (status === "Failed") return "badge-failed";
  return "badge-inprogress";
}

function eventStatusClass(status) {
  const map = { Upcoming: "badge-upcoming", Live: "badge-live", Ended: "badge-ended" };
  return map[status] || "";
}

function roleClass(role) {
  return "role-" + role.toLowerCase();
}

function delay(i) {
  return `animation-delay: ${i * 0.07}s;`;
}

// ===== Renderers =====

function refreshData() {
  projects = DataService.getProjects();
  assets = DataService.getAssets();
  builds = DataService.getBuilds();
  teamMembers = DataService.getTeamMembers();
  events = DataService.getEvents();
  kpis = DataService.getKPIs();
  scenes = DataService.getScenes();
  shaders = DataService.getShaders();
  snippets = DataService.getSnippets();
  perfMetrics = DataService.getPerfMetrics();
}

function renderProjects() {
  refreshData();
  const grid = document.getElementById("projectGrid");
  grid.innerHTML = projects.map((p, i) => `
    <div class="card project-card reveal-item" style="${delay(i)}">
      <div class="project-header">
        <div class="project-name">${p.name}</div>
        <span class="badge ${statusBadgeClass(p.status)}">${p.status}</span>
      </div>
      <div class="project-meta">
        <span>👥 ${p.teamSize} members</span>
        <span>🕐 ${p.lastUpdated}</span>
        ${p.engine ? `<span>🎮 ${p.engine}</span>` : ''}
      </div>
      <div class="progress-bar-wrapper">
        <div class="progress-bar-fill" style="width: ${p.completion}%"></div>
      </div>
      <div class="progress-label">
        <span>Completion</span>
        <span>${p.completion}%</span>
      </div>
      <div class="card-actions">
        <button class="btn-icon" onclick="editProject(${p.id})" title="Edit Project">✏️</button>
        <button class="btn-icon" onclick="deleteProject(${p.id})" title="Delete Project">🗑️</button>
      </div>
    </div>
  `).join("");
}

function renderAssets(filteredAssets) {
  const grid = document.getElementById("assetGrid");
  const list = filteredAssets || assets;
  grid.innerHTML = list.map((a, i) => `
    <div class="card asset-card reveal-item" style="${delay(i)}">
      <div class="asset-thumb" style="background: linear-gradient(135deg, ${a.color}, ${a.color}88);"></div>
      <div class="asset-name">${a.name}</div>
      <div class="asset-info">
        <span class="asset-type-tag">${a.type}</span>
        <span>${a.size}</span>
      </div>
      <div class="asset-info" style="margin-top:6px;">
        <span>by ${a.author}</span>
      </div>
      <div class="card-actions">
        <button class="btn-icon" onclick="editAsset(${a.id})" title="Edit Asset">✏️</button>
        <button class="btn-icon" onclick="deleteAsset(${a.id})" title="Delete Asset">🗑️</button>
      </div>
    </div>
  `).join("");
}

function renderTagFilters() {
  const container = document.getElementById("tagFilters");
  container.innerHTML = assetTypes.map(t =>
    `<button class="tag-btn${t === "All" ? " active" : ""}" data-type="${t}">${t}</button>`
  ).join("");
}

function renderBuilds() {
  refreshData();
  const tbody = document.getElementById("buildsBody");
  tbody.innerHTML = builds.map((b, i) => `
    <tr class="reveal-item" style="${delay(i)}">
      <td style="color:var(--text-primary);font-weight:600;">${b.project}</td>
      <td><code style="background:rgba(255,255,255,0.05);padding:2px 8px;border-radius:4px;font-size:0.82rem;">${b.branch}</code></td>
      <td><span class="badge ${buildStatusClass(b.status)}">${b.status}</span></td>
      <td>${b.duration}</td>
      <td>${b.triggeredBy}</td>
      <td>${b.timestamp}</td>
      <td>
        <button class="btn-icon" onclick="editBuild(${b.id})" title="Edit Build">✏️</button>
        <button class="btn-icon" onclick="deleteBuild(${b.id})" title="Delete Build">🗑️</button>
      </td>
    </tr>
  `).join("");
}

function renderTeam() {
  refreshData();
  const tbody = document.getElementById("teamBody");
  tbody.innerHTML = teamMembers.map((m, i) => `
    <tr class="reveal-item" style="${delay(i)}">
      <td>
        <div class="member-cell">
          <div class="member-avatar" style="background:${m.color};">${getInitials(m.name)}</div>
          <span class="member-name">${m.name}</span>
        </div>
      </td>
      <td>${m.email}</td>
      <td><span class="role-badge ${roleClass(m.role)}">${m.role}</span></td>
      <td><span class="status-dot ${m.status.toLowerCase()}">${m.status}</span></td>
      <td>${m.lastLogin}</td>
      <td>
        <button class="btn-icon" onclick="editTeamMember(${m.id})" title="Edit Member">✏️</button>
        <button class="btn-icon" onclick="deleteTeamMember(${m.id})" title="Delete Member">🗑️</button>
      </td>
    </tr>
  `).join("");
}

function renderEvents() {
  refreshData();
  const grid = document.getElementById("eventsGrid");
  grid.innerHTML = events.map((e, i) => `
    <div class="card event-card reveal-item" style="${delay(i)}">
      <div class="event-header">
        <div class="event-name">${e.name}</div>
        <span class="badge ${eventStatusClass(e.status)}">${e.status}</span>
      </div>
      <div class="event-game">🎮 ${e.game}</div>
      <div class="event-dates">📅 ${e.start} → ${e.end}</div>
      <div class="event-footer">
        <span class="type-badge">${e.type}</span>
      </div>
      <div class="card-actions">
        <button class="btn-icon" onclick="editEvent(${e.id})" title="Edit Event">✏️</button>
        <button class="btn-icon" onclick="deleteEvent(${e.id})" title="Delete Event">🗑️</button>
      </div>
    </div>
  `).join("");
}

function renderKPIs() {
  refreshData();
  const grid = document.getElementById("kpiGrid");
  grid.innerHTML = kpis.map((k, i) => `
    <div class="card kpi-card reveal-item" style="${delay(i)}">
      <div class="kpi-label">${k.label}</div>
      <div class="kpi-value">${k.value}</div>
      <div class="kpi-trend ${k.trend}">
        ${k.trend === "up" ? "▲" : "▼"} ${k.change}
      </div>
      <div class="card-actions">
        <button class="btn-icon" onclick="editKPI(${k.id})" title="Edit KPI">✏️</button>
        <button class="btn-icon" onclick="deleteKPI(${k.id})" title="Delete KPI">🗑️</button>
      </div>
    </div>
  `).join("");
}

// ===== Scene Manager Renderers =====

function sceneEngineClass(engine) {
  if (engine === 'Three.js') return 'badge-threejs';
  if (engine === 'Babylon.js') return 'badge-babylonjs';
  return '';
}

function sceneStatusClass(status) {
  if (status === 'Active') return 'badge-active';
  if (status === 'WIP') return 'badge-alpha';
  return 'badge-maintenance';
}

function renderScenes(filteredScenes) {
  refreshData();
  var grid = document.getElementById("sceneGrid");
  var list = filteredScenes || scenes;
  grid.innerHTML = list.map(function(s, i) {
    var objTags = (s.objects || []).map(function(o) {
      return '<span class="scene-obj-tag">' + escapeHTML(o) + '</span>';
    }).join("");
    return '<div class="card scene-card reveal-item" style="' + delay(i) + '">' +
      '<div class="scene-header">' +
        '<div class="scene-name">' + escapeHTML(s.name) + '</div>' +
        '<span class="badge ' + sceneEngineClass(s.engine) + '">' + escapeHTML(s.engine) + '</span>' +
      '</div>' +
      '<div class="scene-engine">Status: <span class="badge ' + sceneStatusClass(s.status) + '">' + escapeHTML(s.status) + '</span></div>' +
      '<div class="scene-stats">' +
        '<span>📷 ' + escapeHTML(s.camera || 'Camera') + '</span>' +
        '<span>💡 ' + s.lights + ' lights</span>' +
        '<span>🔷 ' + s.meshes + ' meshes</span>' +
        '<span>🖼️ ' + s.textures + ' textures</span>' +
      '</div>' +
      '<div class="scene-objects">' + objTags + '</div>' +
      '<div class="card-actions">' +
        '<button class="btn-icon" onclick="editScene(' + s.id + ')" title="Edit Scene">✏️</button>' +
        '<button class="btn-icon" onclick="deleteScene(' + s.id + ')" title="Delete Scene">🗑️</button>' +
      '</div>' +
    '</div>';
  }).join("");
}

// ===== Shader Library Renderers =====

function renderShaders(filteredShaders) {
  refreshData();
  var grid = document.getElementById("shaderGrid");
  var list = filteredShaders || shaders;
  grid.innerHTML = list.map(function(s, i) {
    var tags = (s.tags || []).map(function(t) {
      return '<span class="shader-tag">' + escapeHTML(t) + '</span>';
    }).join("");
    return '<div class="card shader-card reveal-item" style="' + delay(i) + '">' +
      '<div class="shader-preview" style="background: linear-gradient(135deg, ' + escapeHTML(s.color1 || '#1e88e5') + ', ' + escapeHTML(s.color2 || '#00c9a7') + ');"></div>' +
      '<div class="shader-header">' +
        '<div class="shader-name">' + escapeHTML(s.name) + '</div>' +
        '<span class="badge ' + sceneEngineClass(s.engine) + '">' + escapeHTML(s.engine) + '</span>' +
      '</div>' +
      '<div class="shader-desc">' + escapeHTML(s.description || '') + '</div>' +
      '<div style="margin-bottom:6px;"><span class="badge badge-beta">' + escapeHTML(s.type) + '</span></div>' +
      '<div class="shader-tags">' + tags + '</div>' +
      '<div class="card-actions">' +
        '<button class="btn-icon" onclick="editShader(' + s.id + ')" title="Edit Shader">✏️</button>' +
        '<button class="btn-icon" onclick="deleteShader(' + s.id + ')" title="Delete Shader">🗑️</button>' +
      '</div>' +
    '</div>';
  }).join("");
}

// ===== Code Snippets Renderers =====

function renderSnippets(filteredSnippets) {
  refreshData();
  var grid = document.getElementById("snippetGrid");
  var list = filteredSnippets || snippets;
  grid.innerHTML = list.map(function(s, i) {
    return '<div class="card snippet-card reveal-item" style="' + delay(i) + '">' +
      '<div class="snippet-header">' +
        '<div class="snippet-title">' + escapeHTML(s.title) + '</div>' +
        '<span class="badge ' + sceneEngineClass(s.engine) + '">' + escapeHTML(s.engine) + '</span>' +
      '</div>' +
      '<div class="snippet-desc">' + escapeHTML(s.description || '') + '</div>' +
      '<div class="snippet-code">' + escapeHTML(s.code || '') + '</div>' +
      '<div class="snippet-meta">' +
        '<span>' + escapeHTML(s.category || 'General') + '</span>' +
        '<button class="snippet-copy-btn" onclick="copySnippet(' + s.id + ')">📋 Copy</button>' +
      '</div>' +
      '<div class="card-actions">' +
        '<button class="btn-icon" onclick="editSnippet(' + s.id + ')" title="Edit Snippet">✏️</button>' +
        '<button class="btn-icon" onclick="deleteSnippet(' + s.id + ')" title="Delete Snippet">🗑️</button>' +
      '</div>' +
    '</div>';
  }).join("");
}

// ===== Performance Monitor Renderers =====

function perfColor(value, max) {
  var pct = (value / max) * 100;
  if (pct < 50) return 'good';
  if (pct < 80) return 'warn';
  return 'bad';
}

function formatPerfValue(value) {
  if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
  if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
  return String(value);
}

function renderPerfMetrics() {
  refreshData();

  // Render overview stats
  var overview = document.getElementById("perfOverview");
  var overviewStats = [
    { label: "FPS Target", value: "60", unit: "fps", status: "good" },
    { label: "Draw Calls", value: perfMetrics.length > 0 ? formatPerfValue(perfMetrics[0].value) : "0", unit: perfMetrics.length > 0 ? perfMetrics[0].unit : "", status: perfMetrics.length > 0 ? perfColor(perfMetrics[0].value, perfMetrics[0].max) : "good" },
    { label: "Frame Budget", value: "16.67", unit: "ms", status: "good" },
    { label: "Metrics Tracked", value: String(perfMetrics.length), unit: "active", status: "good" }
  ];
  overview.innerHTML = overviewStats.map(function(s) {
    return '<div class="perf-stat-card reveal-item">' +
      '<div class="perf-stat-label">' + escapeHTML(s.label) + '</div>' +
      '<div class="perf-stat-value perf-stat-' + s.status + '">' + escapeHTML(s.value) + '</div>' +
      '<div class="perf-stat-unit">' + escapeHTML(s.unit) + '</div>' +
    '</div>';
  }).join("");

  // Render detailed metrics
  var grid = document.getElementById("perfGrid");
  grid.innerHTML = perfMetrics.map(function(m, i) {
    var pct = Math.min((m.value / m.max) * 100, 100);
    var colorClass = perfColor(m.value, m.max);
    return '<div class="card perf-card reveal-item" style="' + delay(i) + '">' +
      '<div class="perf-name">' + escapeHTML(m.name) + '</div>' +
      '<div class="perf-category">' + escapeHTML(m.category) + '</div>' +
      '<div class="perf-bar-wrapper">' +
        '<div class="perf-bar-fill perf-bar-' + colorClass + '" style="width:' + pct + '%;"></div>' +
      '</div>' +
      '<div class="perf-detail">' +
        '<span>' + formatPerfValue(m.value) + ' ' + escapeHTML(m.unit) + '</span>' +
        '<span>max ' + formatPerfValue(m.max) + '</span>' +
      '</div>' +
      (m.tip ? '<div style="margin-top:8px;font-size:0.72rem;color:var(--text-muted);font-style:italic;">💡 ' + escapeHTML(m.tip) + '</div>' : '') +
      '<div class="card-actions">' +
        '<button class="btn-icon" onclick="editPerfMetric(' + m.id + ')" title="Edit Metric">✏️</button>' +
        '<button class="btn-icon" onclick="deletePerfMetric(' + m.id + ')" title="Delete Metric">🗑️</button>' +
      '</div>' +
    '</div>';
  }).join("");
}

// ===== Interactivity =====

function setupAssetSearch() {
  const input = document.getElementById("assetSearch");
  input.addEventListener("input", () => {
    const query = input.value.toLowerCase();
    const activeType = document.querySelector(".tag-btn.active")?.dataset.type || "All";
    const filtered = assets.filter(a => {
      const matchesSearch = a.name.toLowerCase().includes(query) || a.author.toLowerCase().includes(query);
      const matchesType = activeType === "All" || a.type === activeType;
      return matchesSearch && matchesType;
    });
    renderAssets(filtered);
  });
}

function setupTagFilters() {
  const container = document.getElementById("tagFilters");
  container.addEventListener("click", (e) => {
    if (!e.target.classList.contains("tag-btn")) return;
    container.querySelectorAll(".tag-btn").forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");
    const type = e.target.dataset.type;
    const query = document.getElementById("assetSearch").value.toLowerCase();
    const filtered = assets.filter(a => {
      const matchesType = type === "All" || a.type === type;
      const matchesSearch = a.name.toLowerCase().includes(query) || a.author.toLowerCase().includes(query);
      return matchesType && matchesSearch;
    });
    renderAssets(filtered);
  });
}

function setupSidebar() {
  const hamburger = document.getElementById("hamburgerBtn");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebarOverlay");

  function toggleSidebar() {
    sidebar.classList.toggle("open");
    overlay.classList.toggle("open");
  }

  hamburger.addEventListener("click", toggleSidebar);
  overlay.addEventListener("click", toggleSidebar);
}

function setupNavLinks() {
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
      link.classList.add("active");
      // Close sidebar on mobile
      const sidebar = document.getElementById("sidebar");
      const overlay = document.getElementById("sidebarOverlay");
      if (sidebar.classList.contains("open")) {
        sidebar.classList.remove("open");
        overlay.classList.remove("open");
      }
    });
  });
}

// ===== Engine Toggle (Scene Manager) =====

function setupEngineToggle() {
  var container = document.querySelector(".engine-toggle");
  if (!container) return;
  container.addEventListener("click", function(e) {
    if (!e.target.classList.contains("engine-btn")) return;
    container.querySelectorAll(".engine-btn").forEach(function(b) { b.classList.remove("active"); });
    e.target.classList.add("active");
    var engine = e.target.dataset.engine;
    if (engine === "all") {
      renderScenes();
    } else {
      var engineMap = { threejs: "Three.js", babylonjs: "Babylon.js" };
      var filtered = scenes.filter(function(s) { return s.engine === engineMap[engine]; });
      renderScenes(filtered);
    }
  });
}

// ===== Shader Filters =====

function setupShaderFilters() {
  var container = document.querySelector(".shader-filters");
  if (!container) return;
  container.addEventListener("click", function(e) {
    if (!e.target.classList.contains("tag-btn")) return;
    container.querySelectorAll(".tag-btn").forEach(function(b) { b.classList.remove("active"); });
    e.target.classList.add("active");
    var type = e.target.dataset.shaderType;
    if (type === "All") {
      renderShaders();
    } else {
      var filtered = shaders.filter(function(s) { return s.type === type; });
      renderShaders(filtered);
    }
  });
}

// ===== Snippet Search & Filters =====

function setupSnippetSearch() {
  var input = document.getElementById("snippetSearch");
  if (!input) return;
  input.addEventListener("input", function() {
    var query = input.value.toLowerCase();
    var activeEngine = document.querySelector(".snippet-filters .tag-btn.active");
    var engine = activeEngine ? activeEngine.dataset.snippetEngine : "All";
    var filtered = snippets.filter(function(s) {
      var matchesSearch = s.title.toLowerCase().includes(query) || (s.description || "").toLowerCase().includes(query) || (s.category || "").toLowerCase().includes(query);
      var matchesEngine = engine === "All" || s.engine === engine;
      return matchesSearch && matchesEngine;
    });
    renderSnippets(filtered);
  });
}

function setupSnippetFilters() {
  var container = document.getElementById("snippetFilters");
  if (!container) return;
  container.addEventListener("click", function(e) {
    if (!e.target.classList.contains("tag-btn")) return;
    container.querySelectorAll(".tag-btn").forEach(function(b) { b.classList.remove("active"); });
    e.target.classList.add("active");
    var engine = e.target.dataset.snippetEngine;
    var query = (document.getElementById("snippetSearch").value || "").toLowerCase();
    var filtered = snippets.filter(function(s) {
      var matchesEngine = engine === "All" || s.engine === engine;
      var matchesSearch = s.title.toLowerCase().includes(query) || (s.description || "").toLowerCase().includes(query);
      return matchesEngine && matchesSearch;
    });
    renderSnippets(filtered);
  });
}

// ===== Modal & Toast System =====

function escapeHTML(str) {
  var div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function showToast(message, type) {
  type = type || "success";
  var container = document.getElementById("toastContainer");
  var toast = document.createElement("div");
  toast.className = "toast toast-" + type;
  toast.setAttribute("role", "status");
  var icons = { success: "✅", error: "❌", info: "ℹ️" };
  toast.textContent = (icons[type] || "") + " " + message;
  container.appendChild(toast);
  setTimeout(function() {
    toast.classList.add("toast-out");
    setTimeout(function() { toast.remove(); }, 300);
  }, 3000);
}

function openModal(title, bodyHTML, onConfirm, confirmLabel, confirmClass) {
  var overlay = document.getElementById("modalOverlay");
  var titleEl = document.getElementById("modalTitle");
  var bodyEl = document.getElementById("modalBody");
  var confirmBtn = document.getElementById("modalConfirm");
  var cancelBtn = document.getElementById("modalCancel");
  var closeBtn = document.getElementById("modalClose");

  titleEl.textContent = title;
  bodyEl.innerHTML = bodyHTML;
  confirmBtn.textContent = confirmLabel || "Save";
  confirmBtn.className = "modal-btn " + (confirmClass || "modal-btn-confirm");

  overlay.classList.add("open");

  // Focus first input
  var firstInput = bodyEl.querySelector("input, select, textarea");
  if (firstInput) setTimeout(function() { firstInput.focus(); }, 50);

  function cleanup() {
    overlay.classList.remove("open");
    confirmBtn.removeEventListener("click", handleConfirm);
    cancelBtn.removeEventListener("click", cleanup);
    closeBtn.removeEventListener("click", cleanup);
    overlay.removeEventListener("click", handleOverlayClick);
  }

  function handleConfirm() {
    if (onConfirm) {
      var result = onConfirm();
      if (result === false) return;
    }
    cleanup();
  }

  function handleOverlayClick(e) {
    if (e.target === overlay) cleanup();
  }

  confirmBtn.addEventListener("click", handleConfirm);
  cancelBtn.addEventListener("click", cleanup);
  closeBtn.addEventListener("click", cleanup);
  overlay.addEventListener("click", handleOverlayClick);
}

function confirmModal(message, onConfirm) {
  openModal(
    "Confirm Action",
    '<p class="confirm-message">' + message + '</p>',
    onConfirm,
    "Delete",
    "modal-btn-danger"
  );
}

function selectOptions(options, selected) {
  return options.map(function(opt) {
    var escaped = escapeHTML(opt);
    return '<option value="' + escaped + '"' + (opt === selected ? ' selected' : '') + '>' + escaped + '</option>';
  }).join("");
}

// ===== CRUD Operations =====

// Projects
function projectFormHTML(p) {
  p = p || {};
  return '' +
    '<div class="form-group">' +
      '<label class="form-label">Project Name</label>' +
      '<input class="form-input" id="f-name" type="text" value="' + escapeHTML(p.name || '') + '" placeholder="Enter project name">' +
    '</div>' +
    '<div class="form-row">' +
      '<div class="form-group">' +
        '<label class="form-label">Status</label>' +
        '<select class="form-select" id="f-status">' + selectOptions(["Active", "Beta", "Alpha", "Maintenance"], p.status || "Active") + '</select>' +
      '</div>' +
      '<div class="form-group">' +
        '<label class="form-label">Engine</label>' +
        '<select class="form-select" id="f-engine">' + selectOptions(["Three.js", "Babylon.js"], p.engine || "Three.js") + '</select>' +
      '</div>' +
    '</div>' +
    '<div class="form-row">' +
      '<div class="form-group">' +
        '<label class="form-label">Team Size</label>' +
        '<input class="form-input" id="f-teamSize" type="number" min="1" value="' + escapeHTML(String(p.teamSize || 10)) + '">' +
      '</div>' +
      '<div class="form-group">' +
        '<label class="form-label">Completion %</label>' +
        '<input class="form-input" id="f-completion" type="number" min="0" max="100" value="' + escapeHTML(String(p.completion || 0)) + '">' +
      '</div>' +
    '</div>';
}

function editProject(id) {
  var project = DataService.getProjects().find(function(p) { return p.id === id; });
  if (!project) return;
  openModal("Edit Project", projectFormHTML(project), function() {
    var name = document.getElementById("f-name").value.trim();
    if (!name) { showToast("Name is required", "error"); return false; }
    DataService.updateProject(id, {
      name: name,
      status: document.getElementById("f-status").value,
      engine: document.getElementById("f-engine").value,
      teamSize: parseInt(document.getElementById("f-teamSize").value) || project.teamSize,
      completion: parseInt(document.getElementById("f-completion").value) || project.completion,
      lastUpdated: new Date().toISOString().split('T')[0]
    });
    renderProjects();
    showToast("Project updated");
  });
}

function deleteProject(id) {
  confirmModal("Are you sure you want to delete this project?", function() {
    DataService.deleteProject(id);
    renderProjects();
    showToast("Project deleted", "info");
  });
}

function addNewProject() {
  openModal("Add Project", projectFormHTML(), function() {
    var name = document.getElementById("f-name").value.trim();
    if (!name) { showToast("Name is required", "error"); return false; }
    DataService.addProject({
      name: name,
      status: document.getElementById("f-status").value,
      engine: document.getElementById("f-engine").value,
      teamSize: parseInt(document.getElementById("f-teamSize").value) || 10,
      completion: parseInt(document.getElementById("f-completion").value) || 0,
      lastUpdated: new Date().toISOString().split('T')[0]
    });
    renderProjects();
    showToast("Project added");
  });
}

// Assets
function assetFormHTML(a) {
  a = a || {};
  return '' +
    '<div class="form-group">' +
      '<label class="form-label">Asset Name</label>' +
      '<input class="form-input" id="f-name" type="text" value="' + escapeHTML(a.name || '') + '" placeholder="Enter asset name">' +
    '</div>' +
    '<div class="form-row">' +
      '<div class="form-group">' +
        '<label class="form-label">Type</label>' +
        '<select class="form-select" id="f-type">' + selectOptions(["3D Models", "Textures", "Audio", "Animations", "UI Elements"], a.type || "3D Models") + '</select>' +
      '</div>' +
      '<div class="form-group">' +
        '<label class="form-label">Size</label>' +
        '<input class="form-input" id="f-size" type="text" value="' + escapeHTML(a.size || '1.0 MB') + '" placeholder="e.g., 10.5 MB">' +
      '</div>' +
    '</div>' +
    '<div class="form-row">' +
      '<div class="form-group">' +
        '<label class="form-label">Author</label>' +
        '<input class="form-input" id="f-author" type="text" value="' + escapeHTML(a.author || '') + '" placeholder="Author name">' +
      '</div>' +
      '<div class="form-group">' +
        '<label class="form-label">Color</label>' +
        '<input class="form-input" id="f-color" type="color" value="' + escapeHTML(a.color || '#1e88e5') + '">' +
      '</div>' +
    '</div>';
}

function editAsset(id) {
  var asset = DataService.getAssets().find(function(a) { return a.id === id; });
  if (!asset) return;
  openModal("Edit Asset", assetFormHTML(asset), function() {
    var name = document.getElementById("f-name").value.trim();
    if (!name) { showToast("Name is required", "error"); return false; }
    DataService.updateAsset(id, {
      name: name,
      type: document.getElementById("f-type").value,
      size: document.getElementById("f-size").value || asset.size,
      author: document.getElementById("f-author").value || asset.author,
      color: document.getElementById("f-color").value || asset.color
    });
    assets = DataService.getAssets();
    renderAssets();
    showToast("Asset updated");
  });
}

function deleteAsset(id) {
  confirmModal("Are you sure you want to delete this asset?", function() {
    DataService.deleteAsset(id);
    assets = DataService.getAssets();
    renderAssets();
    showToast("Asset deleted", "info");
  });
}

function addNewAsset() {
  openModal("Add Asset", assetFormHTML(), function() {
    var name = document.getElementById("f-name").value.trim();
    if (!name) { showToast("Name is required", "error"); return false; }
    DataService.addAsset({
      name: name,
      type: document.getElementById("f-type").value,
      size: document.getElementById("f-size").value || "1.0 MB",
      author: document.getElementById("f-author").value || "Unknown",
      color: document.getElementById("f-color").value || "#1e88e5"
    });
    assets = DataService.getAssets();
    renderAssets();
    showToast("Asset added");
  });
}

// Team Members
function teamFormHTML(m) {
  m = m || {};
  return '' +
    '<div class="form-row">' +
      '<div class="form-group">' +
        '<label class="form-label">Name</label>' +
        '<input class="form-input" id="f-name" type="text" value="' + escapeHTML(m.name || '') + '" placeholder="Full name">' +
      '</div>' +
      '<div class="form-group">' +
        '<label class="form-label">Email</label>' +
        '<input class="form-input" id="f-email" type="email" value="' + escapeHTML(m.email || '') + '" placeholder="email@example.com">' +
      '</div>' +
    '</div>' +
    '<div class="form-row">' +
      '<div class="form-group">' +
        '<label class="form-label">Role</label>' +
        '<select class="form-select" id="f-role">' + selectOptions(["Admin", "Developer", "Artist", "QA", "Viewer"], m.role || "Developer") + '</select>' +
      '</div>' +
      '<div class="form-group">' +
        '<label class="form-label">Status</label>' +
        '<select class="form-select" id="f-status">' + selectOptions(["Active", "Inactive"], m.status || "Active") + '</select>' +
      '</div>' +
    '</div>' +
    '<div class="form-group">' +
      '<label class="form-label">Avatar Color</label>' +
      '<input class="form-input" id="f-color" type="color" value="' + escapeHTML(m.color || '#1e88e5') + '">' +
    '</div>';
}

function editTeamMember(id) {
  var member = DataService.getTeamMembers().find(function(m) { return m.id === id; });
  if (!member) return;
  openModal("Edit Team Member", teamFormHTML(member), function() {
    var name = document.getElementById("f-name").value.trim();
    if (!name) { showToast("Name is required", "error"); return false; }
    DataService.updateTeamMember(id, {
      name: name,
      email: document.getElementById("f-email").value || member.email,
      role: document.getElementById("f-role").value,
      status: document.getElementById("f-status").value,
      color: document.getElementById("f-color").value || member.color,
      lastLogin: new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().split(' ')[0].slice(0, 5)
    });
    renderTeam();
    showToast("Team member updated");
  });
}

function deleteTeamMember(id) {
  confirmModal("Are you sure you want to delete this team member?", function() {
    DataService.deleteTeamMember(id);
    renderTeam();
    showToast("Team member deleted", "info");
  });
}

function addNewTeamMember() {
  openModal("Add Team Member", teamFormHTML(), function() {
    var name = document.getElementById("f-name").value.trim();
    if (!name) { showToast("Name is required", "error"); return false; }
    DataService.addTeamMember({
      name: name,
      email: document.getElementById("f-email").value || "user@studio.io",
      role: document.getElementById("f-role").value,
      status: document.getElementById("f-status").value,
      color: document.getElementById("f-color").value || "#1e88e5",
      lastLogin: new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().split(' ')[0].slice(0, 5)
    });
    renderTeam();
    showToast("Team member added");
  });
}

// Events
function eventFormHTML(e) {
  e = e || {};
  var today = new Date().toISOString().split('T')[0];
  return '' +
    '<div class="form-group">' +
      '<label class="form-label">Event Name</label>' +
      '<input class="form-input" id="f-name" type="text" value="' + escapeHTML(e.name || '') + '" placeholder="Enter event name">' +
    '</div>' +
    '<div class="form-group">' +
      '<label class="form-label">Game</label>' +
      '<input class="form-input" id="f-game" type="text" value="' + escapeHTML(e.game || '') + '" placeholder="Game title">' +
    '</div>' +
    '<div class="form-row">' +
      '<div class="form-group">' +
        '<label class="form-label">Start Date</label>' +
        '<input class="form-input" id="f-start" type="date" value="' + escapeHTML(e.start || today) + '">' +
      '</div>' +
      '<div class="form-group">' +
        '<label class="form-label">End Date</label>' +
        '<input class="form-input" id="f-end" type="date" value="' + escapeHTML(e.end || today) + '">' +
      '</div>' +
    '</div>' +
    '<div class="form-row">' +
      '<div class="form-group">' +
        '<label class="form-label">Status</label>' +
        '<select class="form-select" id="f-status">' + selectOptions(["Upcoming", "Live", "Ended"], e.status || "Upcoming") + '</select>' +
      '</div>' +
      '<div class="form-group">' +
        '<label class="form-label">Type</label>' +
        '<select class="form-select" id="f-type">' + selectOptions(["Seasonal", "Update", "Tournament", "Hotfix"], e.type || "Update") + '</select>' +
      '</div>' +
    '</div>';
}

function editEvent(id) {
  var event = DataService.getEvents().find(function(e) { return e.id === id; });
  if (!event) return;
  openModal("Edit Event", eventFormHTML(event), function() {
    var name = document.getElementById("f-name").value.trim();
    if (!name) { showToast("Name is required", "error"); return false; }
    DataService.updateEvent(id, {
      name: name,
      game: document.getElementById("f-game").value || event.game,
      start: document.getElementById("f-start").value || event.start,
      end: document.getElementById("f-end").value || event.end,
      status: document.getElementById("f-status").value,
      type: document.getElementById("f-type").value
    });
    renderEvents();
    showToast("Event updated");
  });
}

function deleteEvent(id) {
  confirmModal("Are you sure you want to delete this event?", function() {
    DataService.deleteEvent(id);
    renderEvents();
    showToast("Event deleted", "info");
  });
}

function addNewEvent() {
  openModal("Add Event", eventFormHTML(), function() {
    var name = document.getElementById("f-name").value.trim();
    if (!name) { showToast("Name is required", "error"); return false; }
    DataService.addEvent({
      name: name,
      game: document.getElementById("f-game").value || "Unknown Game",
      start: document.getElementById("f-start").value || new Date().toISOString().split('T')[0],
      end: document.getElementById("f-end").value || new Date().toISOString().split('T')[0],
      status: document.getElementById("f-status").value,
      type: document.getElementById("f-type").value
    });
    renderEvents();
    showToast("Event added");
  });
}

// Builds
function buildFormHTML(b) {
  b = b || {};
  return '' +
    '<div class="form-row">' +
      '<div class="form-group">' +
        '<label class="form-label">Project</label>' +
        '<input class="form-input" id="f-project" type="text" value="' + escapeHTML(b.project || '') + '" placeholder="Project name">' +
      '</div>' +
      '<div class="form-group">' +
        '<label class="form-label">Branch</label>' +
        '<input class="form-input" id="f-branch" type="text" value="' + escapeHTML(b.branch || 'main') + '" placeholder="e.g., main">' +
      '</div>' +
    '</div>' +
    '<div class="form-row">' +
      '<div class="form-group">' +
        '<label class="form-label">Status</label>' +
        '<select class="form-select" id="f-status">' + selectOptions(["Success", "Failed", "In Progress"], b.status || "In Progress") + '</select>' +
      '</div>' +
      '<div class="form-group">' +
        '<label class="form-label">Duration</label>' +
        '<input class="form-input" id="f-duration" type="text" value="' + escapeHTML(b.duration || '0m 00s') + '" placeholder="e.g., 4m 32s">' +
      '</div>' +
    '</div>' +
    '<div class="form-group">' +
      '<label class="form-label">Triggered By</label>' +
      '<input class="form-input" id="f-triggeredBy" type="text" value="' + escapeHTML(b.triggeredBy || '') + '" placeholder="Who triggered this build">' +
    '</div>';
}

function editBuild(id) {
  var build = DataService.getBuilds().find(function(b) { return b.id === id; });
  if (!build) return;
  openModal("Edit Build", buildFormHTML(build), function() {
    var project = document.getElementById("f-project").value.trim();
    if (!project) { showToast("Project name is required", "error"); return false; }
    DataService.updateBuild(id, {
      project: project,
      branch: document.getElementById("f-branch").value || build.branch,
      status: document.getElementById("f-status").value,
      duration: document.getElementById("f-duration").value || build.duration,
      triggeredBy: document.getElementById("f-triggeredBy").value || build.triggeredBy,
      timestamp: build.timestamp
    });
    renderBuilds();
    showToast("Build updated");
  });
}

function deleteBuild(id) {
  confirmModal("Are you sure you want to delete this build?", function() {
    DataService.deleteBuild(id);
    renderBuilds();
    showToast("Build deleted", "info");
  });
}

function addNewBuild() {
  openModal("Add Build", buildFormHTML(), function() {
    var project = document.getElementById("f-project").value.trim();
    if (!project) { showToast("Project name is required", "error"); return false; }
    var now = new Date();
    var timestamp = now.toISOString().split('T')[0] + ' ' + now.toTimeString().split(' ')[0].slice(0, 5);
    DataService.addBuild({
      project: project,
      branch: document.getElementById("f-branch").value || "main",
      status: document.getElementById("f-status").value,
      duration: document.getElementById("f-duration").value || "0m 00s",
      triggeredBy: document.getElementById("f-triggeredBy").value || "Manual",
      timestamp: timestamp
    });
    renderBuilds();
    showToast("Build added");
  });
}

// KPIs
function kpiFormHTML(k) {
  k = k || {};
  return '' +
    '<div class="form-group">' +
      '<label class="form-label">KPI Label</label>' +
      '<input class="form-input" id="f-label" type="text" value="' + escapeHTML(k.label || '') + '" placeholder="e.g., Daily Active Users">' +
    '</div>' +
    '<div class="form-group">' +
      '<label class="form-label">Value</label>' +
      '<input class="form-input" id="f-value" type="text" value="' + escapeHTML(k.value || '0') + '" placeholder="e.g., 128,430">' +
    '</div>' +
    '<div class="form-row">' +
      '<div class="form-group">' +
        '<label class="form-label">Trend</label>' +
        '<select class="form-select" id="f-trend">' + selectOptions(["up", "down"], k.trend || "up") + '</select>' +
      '</div>' +
      '<div class="form-group">' +
        '<label class="form-label">Change</label>' +
        '<input class="form-input" id="f-change" type="text" value="' + escapeHTML(k.change || '+0.0%') + '" placeholder="e.g., +12.4%">' +
      '</div>' +
    '</div>';
}

function editKPI(id) {
  var kpi = DataService.getKPIs().find(function(k) { return k.id === id; });
  if (!kpi) return;
  openModal("Edit KPI", kpiFormHTML(kpi), function() {
    var label = document.getElementById("f-label").value.trim();
    if (!label) { showToast("Label is required", "error"); return false; }
    DataService.updateKPI(id, {
      label: label,
      value: document.getElementById("f-value").value || kpi.value,
      trend: document.getElementById("f-trend").value,
      change: document.getElementById("f-change").value || kpi.change
    });
    renderKPIs();
    showToast("KPI updated");
  });
}

function deleteKPI(id) {
  confirmModal("Are you sure you want to delete this KPI?", function() {
    DataService.deleteKPI(id);
    renderKPIs();
    showToast("KPI deleted", "info");
  });
}

function addNewKPI() {
  openModal("Add KPI", kpiFormHTML(), function() {
    var label = document.getElementById("f-label").value.trim();
    if (!label) { showToast("Label is required", "error"); return false; }
    DataService.addKPI({
      label: label,
      value: document.getElementById("f-value").value || "0",
      trend: document.getElementById("f-trend").value,
      change: document.getElementById("f-change").value || "+0.0%"
    });
    renderKPIs();
    showToast("KPI added");
  });
}

// ===== Scene CRUD =====

function sceneFormHTML(s) {
  s = s || {};
  return '' +
    '<div class="form-group">' +
      '<label class="form-label">Scene Name</label>' +
      '<input class="form-input" id="f-name" type="text" value="' + escapeHTML(s.name || '') + '" placeholder="e.g., Main Menu">' +
    '</div>' +
    '<div class="form-row">' +
      '<div class="form-group">' +
        '<label class="form-label">Engine</label>' +
        '<select class="form-select" id="f-engine">' + selectOptions(["Three.js", "Babylon.js"], s.engine || "Three.js") + '</select>' +
      '</div>' +
      '<div class="form-group">' +
        '<label class="form-label">Camera Type</label>' +
        '<input class="form-input" id="f-camera" type="text" value="' + escapeHTML(s.camera || 'PerspectiveCamera') + '" placeholder="e.g., PerspectiveCamera">' +
      '</div>' +
    '</div>' +
    '<div class="form-row">' +
      '<div class="form-group">' +
        '<label class="form-label">Lights</label>' +
        '<input class="form-input" id="f-lights" type="number" min="0" value="' + (s.lights || 1) + '">' +
      '</div>' +
      '<div class="form-group">' +
        '<label class="form-label">Meshes</label>' +
        '<input class="form-input" id="f-meshes" type="number" min="0" value="' + (s.meshes || 0) + '">' +
      '</div>' +
    '</div>' +
    '<div class="form-row">' +
      '<div class="form-group">' +
        '<label class="form-label">Textures</label>' +
        '<input class="form-input" id="f-textures" type="number" min="0" value="' + (s.textures || 0) + '">' +
      '</div>' +
      '<div class="form-group">' +
        '<label class="form-label">Status</label>' +
        '<select class="form-select" id="f-status">' + selectOptions(["Active", "WIP", "Archived"], s.status || "WIP") + '</select>' +
      '</div>' +
    '</div>' +
    '<div class="form-group">' +
      '<label class="form-label">Objects (comma-separated)</label>' +
      '<input class="form-input" id="f-objects" type="text" value="' + escapeHTML((s.objects || []).join(', ')) + '" placeholder="e.g., Skybox, Terrain, Physics">' +
    '</div>';
}

function addNewScene() {
  openModal("Add Scene", sceneFormHTML(), function() {
    var name = document.getElementById("f-name").value.trim();
    if (!name) { showToast("Name is required", "error"); return false; }
    DataService.addScene({
      name: name,
      engine: document.getElementById("f-engine").value,
      camera: document.getElementById("f-camera").value || "PerspectiveCamera",
      lights: parseInt(document.getElementById("f-lights").value) || 1,
      meshes: parseInt(document.getElementById("f-meshes").value) || 0,
      textures: parseInt(document.getElementById("f-textures").value) || 0,
      status: document.getElementById("f-status").value,
      objects: document.getElementById("f-objects").value.split(",").map(function(s) { return s.trim(); }).filter(Boolean)
    });
    renderScenes();
    showToast("Scene added");
  });
}

function editScene(id) {
  var scene = DataService.getScenes().find(function(s) { return s.id === id; });
  if (!scene) return;
  openModal("Edit Scene", sceneFormHTML(scene), function() {
    var name = document.getElementById("f-name").value.trim();
    if (!name) { showToast("Name is required", "error"); return false; }
    DataService.updateScene(id, {
      name: name,
      engine: document.getElementById("f-engine").value,
      camera: document.getElementById("f-camera").value || scene.camera,
      lights: parseInt(document.getElementById("f-lights").value) || scene.lights,
      meshes: parseInt(document.getElementById("f-meshes").value) || scene.meshes,
      textures: parseInt(document.getElementById("f-textures").value) || scene.textures,
      status: document.getElementById("f-status").value,
      objects: document.getElementById("f-objects").value.split(",").map(function(s) { return s.trim(); }).filter(Boolean)
    });
    renderScenes();
    showToast("Scene updated");
  });
}

function deleteScene(id) {
  confirmModal("Are you sure you want to delete this scene?", function() {
    DataService.deleteScene(id);
    renderScenes();
    showToast("Scene deleted", "info");
  });
}

// ===== Shader CRUD =====

function shaderFormHTML(s) {
  s = s || {};
  return '' +
    '<div class="form-group">' +
      '<label class="form-label">Shader Name</label>' +
      '<input class="form-input" id="f-name" type="text" value="' + escapeHTML(s.name || '') + '" placeholder="e.g., Toon Cel Shader">' +
    '</div>' +
    '<div class="form-row">' +
      '<div class="form-group">' +
        '<label class="form-label">Type</label>' +
        '<select class="form-select" id="f-type">' + selectOptions(["Vertex", "Fragment", "Post-Process", "Compute"], s.type || "Fragment") + '</select>' +
      '</div>' +
      '<div class="form-group">' +
        '<label class="form-label">Engine</label>' +
        '<select class="form-select" id="f-engine">' + selectOptions(["Three.js", "Babylon.js"], s.engine || "Three.js") + '</select>' +
      '</div>' +
    '</div>' +
    '<div class="form-group">' +
      '<label class="form-label">Description</label>' +
      '<input class="form-input" id="f-desc" type="text" value="' + escapeHTML(s.description || '') + '" placeholder="Brief description">' +
    '</div>' +
    '<div class="form-row">' +
      '<div class="form-group">' +
        '<label class="form-label">Color 1</label>' +
        '<input class="form-input" id="f-color1" type="color" value="' + escapeHTML(s.color1 || '#1e88e5') + '">' +
      '</div>' +
      '<div class="form-group">' +
        '<label class="form-label">Color 2</label>' +
        '<input class="form-input" id="f-color2" type="color" value="' + escapeHTML(s.color2 || '#00c9a7') + '">' +
      '</div>' +
    '</div>' +
    '<div class="form-group">' +
      '<label class="form-label">Tags (comma-separated)</label>' +
      '<input class="form-input" id="f-tags" type="text" value="' + escapeHTML((s.tags || []).join(', ')) + '" placeholder="e.g., Lighting, PBR, VFX">' +
    '</div>';
}

function addNewShader() {
  openModal("Add Shader", shaderFormHTML(), function() {
    var name = document.getElementById("f-name").value.trim();
    if (!name) { showToast("Name is required", "error"); return false; }
    DataService.addShader({
      name: name,
      type: document.getElementById("f-type").value,
      engine: document.getElementById("f-engine").value,
      description: document.getElementById("f-desc").value || "",
      color1: document.getElementById("f-color1").value || "#1e88e5",
      color2: document.getElementById("f-color2").value || "#00c9a7",
      tags: document.getElementById("f-tags").value.split(",").map(function(s) { return s.trim(); }).filter(Boolean)
    });
    renderShaders();
    showToast("Shader added");
  });
}

function editShader(id) {
  var shader = DataService.getShaders().find(function(s) { return s.id === id; });
  if (!shader) return;
  openModal("Edit Shader", shaderFormHTML(shader), function() {
    var name = document.getElementById("f-name").value.trim();
    if (!name) { showToast("Name is required", "error"); return false; }
    DataService.updateShader(id, {
      name: name,
      type: document.getElementById("f-type").value,
      engine: document.getElementById("f-engine").value,
      description: document.getElementById("f-desc").value || shader.description,
      color1: document.getElementById("f-color1").value || shader.color1,
      color2: document.getElementById("f-color2").value || shader.color2,
      tags: document.getElementById("f-tags").value.split(",").map(function(s) { return s.trim(); }).filter(Boolean)
    });
    renderShaders();
    showToast("Shader updated");
  });
}

function deleteShader(id) {
  confirmModal("Are you sure you want to delete this shader?", function() {
    DataService.deleteShader(id);
    renderShaders();
    showToast("Shader deleted", "info");
  });
}

// ===== Code Snippet CRUD =====

function snippetFormHTML(s) {
  s = s || {};
  return '' +
    '<div class="form-group">' +
      '<label class="form-label">Title</label>' +
      '<input class="form-input" id="f-title" type="text" value="' + escapeHTML(s.title || '') + '" placeholder="e.g., Three.js Scene Setup">' +
    '</div>' +
    '<div class="form-row">' +
      '<div class="form-group">' +
        '<label class="form-label">Engine</label>' +
        '<select class="form-select" id="f-engine">' + selectOptions(["Three.js", "Babylon.js", "GLSL", "WebGPU"], s.engine || "Three.js") + '</select>' +
      '</div>' +
      '<div class="form-group">' +
        '<label class="form-label">Category</label>' +
        '<select class="form-select" id="f-category">' + selectOptions(["Setup", "Shaders", "Physics", "Assets", "Interaction", "Audio", "Animation", "Compute", "Networking", "General"], s.category || "General") + '</select>' +
      '</div>' +
    '</div>' +
    '<div class="form-group">' +
      '<label class="form-label">Description</label>' +
      '<input class="form-input" id="f-desc" type="text" value="' + escapeHTML(s.description || '') + '" placeholder="Brief description of snippet">' +
    '</div>' +
    '<div class="form-group">' +
      '<label class="form-label">Code</label>' +
      '<textarea class="form-input" id="f-code" rows="8" style="font-family:monospace;resize:vertical;" placeholder="Paste code here...">' + escapeHTML(s.code || '') + '</textarea>' +
    '</div>';
}

function addNewSnippet() {
  openModal("Add Code Snippet", snippetFormHTML(), function() {
    var title = document.getElementById("f-title").value.trim();
    if (!title) { showToast("Title is required", "error"); return false; }
    DataService.addSnippet({
      title: title,
      engine: document.getElementById("f-engine").value,
      category: document.getElementById("f-category").value,
      description: document.getElementById("f-desc").value || "",
      code: document.getElementById("f-code").value || ""
    });
    renderSnippets();
    showToast("Snippet added");
  });
}

function editSnippet(id) {
  var snippet = DataService.getSnippets().find(function(s) { return s.id === id; });
  if (!snippet) return;
  openModal("Edit Code Snippet", snippetFormHTML(snippet), function() {
    var title = document.getElementById("f-title").value.trim();
    if (!title) { showToast("Title is required", "error"); return false; }
    DataService.updateSnippet(id, {
      title: title,
      engine: document.getElementById("f-engine").value,
      category: document.getElementById("f-category").value,
      description: document.getElementById("f-desc").value || snippet.description,
      code: document.getElementById("f-code").value || snippet.code
    });
    renderSnippets();
    showToast("Snippet updated");
  });
}

function deleteSnippet(id) {
  confirmModal("Are you sure you want to delete this snippet?", function() {
    DataService.deleteSnippet(id);
    renderSnippets();
    showToast("Snippet deleted", "info");
  });
}

function copySnippet(id) {
  var snippet = DataService.getSnippets().find(function(s) { return s.id === id; });
  if (!snippet) return;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(snippet.code).then(function() {
      showToast("Code copied to clipboard!");
    }).catch(function() {
      showToast("Failed to copy", "error");
    });
  } else {
    var textarea = document.createElement('textarea');
    textarea.value = snippet.code;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showToast("Code copied to clipboard!");
    } catch (e) {
      showToast("Failed to copy", "error");
    }
    document.body.removeChild(textarea);
  }
}

// ===== Performance Metric CRUD =====

function perfFormHTML(m) {
  m = m || {};
  return '' +
    '<div class="form-group">' +
      '<label class="form-label">Metric Name</label>' +
      '<input class="form-input" id="f-name" type="text" value="' + escapeHTML(m.name || '') + '" placeholder="e.g., Draw Calls">' +
    '</div>' +
    '<div class="form-row">' +
      '<div class="form-group">' +
        '<label class="form-label">Category</label>' +
        '<select class="form-select" id="f-category">' + selectOptions(["Rendering", "Memory", "Performance", "Geometry", "Loading", "Network"], m.category || "Rendering") + '</select>' +
      '</div>' +
      '<div class="form-group">' +
        '<label class="form-label">Unit</label>' +
        '<input class="form-input" id="f-unit" type="text" value="' + escapeHTML(m.unit || '') + '" placeholder="e.g., ms, MB, calls/frame">' +
      '</div>' +
    '</div>' +
    '<div class="form-row">' +
      '<div class="form-group">' +
        '<label class="form-label">Current Value</label>' +
        '<input class="form-input" id="f-value" type="number" step="any" value="' + (m.value || 0) + '">' +
      '</div>' +
      '<div class="form-group">' +
        '<label class="form-label">Max Threshold</label>' +
        '<input class="form-input" id="f-max" type="number" step="any" value="' + (m.max || 100) + '">' +
      '</div>' +
    '</div>' +
    '<div class="form-group">' +
      '<label class="form-label">Optimization Tip</label>' +
      '<input class="form-input" id="f-tip" type="text" value="' + escapeHTML(m.tip || '') + '" placeholder="Performance optimization advice">' +
    '</div>';
}

function addNewPerfMetric() {
  openModal("Add Performance Metric", perfFormHTML(), function() {
    var name = document.getElementById("f-name").value.trim();
    if (!name) { showToast("Name is required", "error"); return false; }
    DataService.addPerfMetric({
      name: name,
      category: document.getElementById("f-category").value,
      unit: document.getElementById("f-unit").value || "",
      value: parseFloat(document.getElementById("f-value").value) || 0,
      max: parseFloat(document.getElementById("f-max").value) || 100,
      tip: document.getElementById("f-tip").value || ""
    });
    renderPerfMetrics();
    showToast("Metric added");
  });
}

function editPerfMetric(id) {
  var metric = DataService.getPerfMetrics().find(function(m) { return m.id === id; });
  if (!metric) return;
  openModal("Edit Performance Metric", perfFormHTML(metric), function() {
    var name = document.getElementById("f-name").value.trim();
    if (!name) { showToast("Name is required", "error"); return false; }
    DataService.updatePerfMetric(id, {
      name: name,
      category: document.getElementById("f-category").value,
      unit: document.getElementById("f-unit").value || metric.unit,
      value: parseFloat(document.getElementById("f-value").value) || metric.value,
      max: parseFloat(document.getElementById("f-max").value) || metric.max,
      tip: document.getElementById("f-tip").value || metric.tip
    });
    renderPerfMetrics();
    showToast("Metric updated");
  });
}

function deletePerfMetric(id) {
  confirmModal("Are you sure you want to delete this metric?", function() {
    DataService.deletePerfMetric(id);
    renderPerfMetrics();
    showToast("Metric deleted", "info");
  });
}

// Data Management
function exportAllData() {
  var data = DataService.exportData();
  var dataStr = JSON.stringify(data, null, 2);
  var dataBlob = new Blob([dataStr], { type: 'application/json' });
  var url = URL.createObjectURL(dataBlob);
  var link = document.createElement('a');
  link.href = url;
  link.download = 'dtcc-data-' + new Date().toISOString().split('T')[0] + '.json';
  link.click();
  URL.revokeObjectURL(url);
  showToast("Data exported successfully!");
}

function importData() {
  var input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = function(e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(event) {
      try {
        var data = JSON.parse(event.target.result);
        DataService.importData(data);
        renderProjects();
        renderAssets();
        renderBuilds();
        renderTeam();
        renderEvents();
        renderKPIs();
        renderScenes();
        renderShaders();
        renderSnippets();
        renderPerfMetrics();
        showToast("Data imported successfully!");
      } catch (err) {
        showToast("Error importing data: " + err.message, "error");
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

function resetData() {
  confirmModal("Are you sure you want to reset all data to defaults? This cannot be undone.", function() {
    DataService.resetToDefaults();
    renderProjects();
    renderAssets();
    renderBuilds();
    renderTeam();
    renderEvents();
    renderKPIs();
    renderScenes();
    renderShaders();
    renderSnippets();
    renderPerfMetrics();
    showToast("Data reset to defaults successfully!");
  });
}

// ===== Init =====

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  renderTagFilters();
  renderAssets();
  renderBuilds();
  renderTeam();
  renderEvents();
  renderKPIs();
  renderScenes();
  renderShaders();
  renderSnippets();
  renderPerfMetrics();
  setupAssetSearch();
  setupTagFilters();
  setupSidebar();
  setupNavLinks();
  setupEngineToggle();
  setupShaderFilters();
  setupSnippetSearch();
  setupSnippetFilters();
});
