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
      { id: 1, name: "Nebula Frontier", status: "Active", teamSize: 24, lastUpdated: "2026-02-10", completion: 78, description: "Open-world space exploration game with procedural generation and multiplayer combat.", repoUrl: "https://github.com/studio/nebula-frontier" },
      { id: 2, name: "Shadowkeep Arena", status: "Beta", teamSize: 18, lastUpdated: "2026-02-08", completion: 92, description: "Competitive PvP arena shooter with ranked matchmaking and seasonal content.", repoUrl: "https://github.com/studio/shadowkeep-arena" },
      { id: 3, name: "Pixel Odyssey", status: "Alpha", teamSize: 12, lastUpdated: "2026-02-06", completion: 45, description: "Retro-inspired platformer with roguelike elements and pixel art graphics.", repoUrl: "https://github.com/studio/pixel-odyssey" },
      { id: 4, name: "Titan Forge", status: "Maintenance", teamSize: 8, lastUpdated: "2025-12-20", completion: 100, description: "Crafting and building simulation game in maintenance mode.", repoUrl: "" },
      { id: 5, name: "Void Runners", status: "Active", teamSize: 20, lastUpdated: "2026-02-09", completion: 62, description: "Fast-paced racing game set in zero-gravity environments.", repoUrl: "https://github.com/studio/void-runners" },
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
    ];
  }
};

// Initialize data service on load
DataService.init();

export default DataService;
