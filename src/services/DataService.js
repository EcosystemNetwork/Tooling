// ===== Data Service Layer (LocalStorage Implementation) =====

const DataService = {
  // Storage keys
  KEYS: {
    PROJECTS: 'dtcc_projects',
    ASSETS: 'dtcc_assets',
    BUILDS: 'dtcc_builds',
    TEAM_MEMBERS: 'dtcc_team_members',
    EVENTS: 'dtcc_events',
    KPIS: 'dtcc_kpis'
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

  // Export all data
  exportData() {
    return {
      projects: this.getProjects(),
      assets: this.getAssets(),
      builds: this.getBuilds(),
      teamMembers: this.getTeamMembers(),
      events: this.getEvents(),
      kpis: this.getKPIs()
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
  },

  // Reset to default data
  resetToDefaults() {
    this.saveProjects(this.getDefaultProjects());
    this.saveAssets(this.getDefaultAssets());
    this.saveBuilds(this.getDefaultBuilds());
    this.saveTeamMembers(this.getDefaultTeamMembers());
    this.saveEvents(this.getDefaultEvents());
    this.saveKPIs(this.getDefaultKPIs());
  },

  // Default data sets
  getDefaultProjects() {
    return [
      { id: 1, name: "GameForge Studio", status: "Active", teamSize: 5, lastUpdated: "2026-02-15", completion: 85, description: "Browser-based game development tooling platform built with React, Three.js, and Babylon.js.", repoUrl: "https://github.com/EcosystemNetwork/Tooling" },
      { id: 2, name: "Three.js Scene Viewer", status: "Active", teamSize: 3, lastUpdated: "2026-02-14", completion: 100, description: "Interactive 3D scene playground with multiple geometries, orbit controls, and screenshot capture.", repoUrl: "https://github.com/EcosystemNetwork/Tooling" },
      { id: 3, name: "GLSL Shader Lab", status: "Active", teamSize: 2, lastUpdated: "2026-02-13", completion: 100, description: "Live GLSL shader editor with vertex and fragment shader support, presets, and real-time preview.", repoUrl: "https://github.com/EcosystemNetwork/Tooling" },
      { id: 4, name: "Asset Pipeline", status: "Beta", teamSize: 3, lastUpdated: "2026-02-12", completion: 72, description: "Upload, organize, and preview game assets including 3D models, textures, audio, and animations.", repoUrl: "https://github.com/EcosystemNetwork/Tooling" },
      { id: 5, name: "Performance Monitor", status: "Active", teamSize: 2, lastUpdated: "2026-02-11", completion: 90, description: "Real-time FPS tracking, memory usage monitoring, and WebGL capabilities detection.", repoUrl: "https://github.com/EcosystemNetwork/Tooling" },
    ];
  },

  getDefaultAssets() {
    return [
      { id: 1, name: "Default Cube", type: "3D Models", size: "0.2 MB", author: "Three.js", color: "#1e88e5" },
      { id: 2, name: "Grid Texture", type: "Textures", size: "0.5 MB", author: "GameForge", color: "#ff5252" },
      { id: 3, name: "UI Click Sound", type: "Audio", size: "0.1 MB", author: "GameForge", color: "#00c9a7" },
      { id: 4, name: "Orbit Camera Rig", type: "Animations", size: "0.3 MB", author: "Three.js", color: "#ffab40" },
      { id: 5, name: "Button Icon Set", type: "UI Elements", size: "0.8 MB", author: "GameForge", color: "#42a5f5" },
      { id: 6, name: "Ambient Loop", type: "Audio", size: "2.4 MB", author: "GameForge", color: "#00e676" },
      { id: 7, name: "PBR Material Pack", type: "Textures", size: "4.6 MB", author: "Poly Haven", color: "#8d6e63" },
      { id: 8, name: "Character Base Mesh", type: "3D Models", size: "8.1 MB", author: "Sketchfab", color: "#7c4dff" },
    ];
  },

  getDefaultBuilds() {
    return [
      { id: 1, project: "GameForge Studio", branch: "main", status: "Success", duration: "2m 35s", triggeredBy: "CI Bot", timestamp: "2026-02-15 10:00" },
      { id: 2, project: "GameForge Studio", branch: "feature/shader-lab", status: "Success", duration: "2m 18s", triggeredBy: "CI Bot", timestamp: "2026-02-14 16:30" },
      { id: 3, project: "GameForge Studio", branch: "feature/scene-viewer", status: "Success", duration: "2m 42s", triggeredBy: "CI Bot", timestamp: "2026-02-13 11:15" },
      { id: 4, project: "GameForge Studio", branch: "feature/performance", status: "Success", duration: "2m 10s", triggeredBy: "CI Bot", timestamp: "2026-02-12 09:45" },
      { id: 5, project: "Asset Pipeline", branch: "main", status: "Success", duration: "1m 55s", triggeredBy: "CI Bot", timestamp: "2026-02-11 14:20" },
      { id: 6, project: "GameForge Studio", branch: "feature/calendar", status: "Success", duration: "2m 28s", triggeredBy: "CI Bot", timestamp: "2026-02-10 13:00" },
      { id: 7, project: "GameForge Studio", branch: "develop", status: "Success", duration: "2m 50s", triggeredBy: "CI Bot", timestamp: "2026-02-09 17:30" },
    ];
  },

  getDefaultTeamMembers() {
    return [
      { id: 1, name: "Project Lead", email: "lead@gameforge.dev", role: "Admin", status: "Active", lastLogin: "2026-02-15 10:00", color: "#1e88e5" },
      { id: 2, name: "Frontend Developer", email: "frontend@gameforge.dev", role: "Developer", status: "Active", lastLogin: "2026-02-15 09:30", color: "#00c9a7" },
      { id: 3, name: "3D Artist", email: "artist@gameforge.dev", role: "Artist", status: "Active", lastLogin: "2026-02-14 16:00", color: "#ffab40" },
      { id: 4, name: "QA Engineer", email: "qa@gameforge.dev", role: "QA", status: "Active", lastLogin: "2026-02-14 14:45", color: "#ff5252" },
      { id: 5, name: "Backend Developer", email: "backend@gameforge.dev", role: "Developer", status: "Active", lastLogin: "2026-02-13 11:20", color: "#7c4dff" },
    ];
  },

  getDefaultEvents() {
    return [
      { id: 1, name: "GameForge v1.0 Launch", game: "GameForge Studio", start: "2026-03-01", end: "2026-03-01", status: "Upcoming", type: "Update" },
      { id: 2, name: "Shader Lab Beta Release", game: "GLSL Shader Lab", start: "2026-02-15", end: "2026-02-28", status: "Live", type: "Update" },
      { id: 3, name: "Asset Pipeline Integration", game: "Asset Pipeline", start: "2026-02-20", end: "2026-03-10", status: "Upcoming", type: "Update" },
      { id: 4, name: "Three.js v170 Migration", game: "Three.js Scene Viewer", start: "2026-02-01", end: "2026-02-14", status: "Ended", type: "Hotfix" },
      { id: 5, name: "Performance Dashboard Sprint", game: "Performance Monitor", start: "2026-02-10", end: "2026-02-24", status: "Live", type: "Update" },
      { id: 6, name: "WebGPU Support Preview", game: "GameForge Studio", start: "2026-04-01", end: "2026-04-30", status: "Upcoming", type: "Seasonal" },
      { id: 7, name: "Code Snippets Library Expansion", game: "GameForge Studio", start: "2026-02-05", end: "2026-02-12", status: "Ended", type: "Update" },
    ];
  },

  getDefaultKPIs() {
    return [
      { id: 1, label: "Total Projects", value: "5", trend: "up", change: "+2" },
      { id: 2, label: "Total Assets", value: "8", trend: "up", change: "+3" },
      { id: 3, label: "Build Success Rate", value: "100%", trend: "up", change: "+0%" },
      { id: 4, label: "Active Team Members", value: "5", trend: "up", change: "+1" },
      { id: 5, label: "Shader Presets", value: "6", trend: "up", change: "+2" },
      { id: 6, label: "Code Snippets", value: "8", trend: "up", change: "+3" },
    ];
  }
};

// Initialize data service on load
DataService.init();

export default DataService;
