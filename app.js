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
    const maxId = kpis.length > 0 ? Math.max(...kpis.map(k => k.id || 0)) : 0;
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
      { id: 1, name: "Nebula Frontier", status: "Active", teamSize: 24, lastUpdated: "2026-02-10", completion: 78 },
      { id: 2, name: "Shadowkeep Arena", status: "Beta", teamSize: 18, lastUpdated: "2026-02-08", completion: 92 },
      { id: 3, name: "Pixel Odyssey", status: "Alpha", teamSize: 12, lastUpdated: "2026-02-06", completion: 45 },
      { id: 4, name: "Titan Forge", status: "Maintenance", teamSize: 8, lastUpdated: "2025-12-20", completion: 100 },
      { id: 5, name: "Void Runners", status: "Active", teamSize: 20, lastUpdated: "2026-02-09", completion: 62 },
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

// ===== Data Access (now using DataService) =====

const assetTypes = ["All", "3D Models", "Textures", "Audio", "Animations", "UI Elements"];

// Helper to get data from service
let projects = [];
let assets = [];
let builds = [];
let teamMembers = [];
let events = [];
let kpis = [];

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

// ===== CRUD Operations =====

// Projects
function editProject(id) {
  const project = DataService.getProjects().find(p => p.id === id);
  if (!project) return;
  
  const name = prompt("Project Name:", project.name);
  if (!name) return;
  
  const status = prompt("Status (Active/Beta/Alpha/Maintenance):", project.status);
  const teamSize = parseInt(prompt("Team Size:", project.teamSize));
  const completion = parseInt(prompt("Completion %:", project.completion));
  
  DataService.updateProject(id, {
    name,
    status: status || project.status,
    teamSize: teamSize || project.teamSize,
    completion: completion || project.completion,
    lastUpdated: new Date().toISOString().split('T')[0]
  });
  
  renderProjects();
}

function deleteProject(id) {
  if (confirm("Are you sure you want to delete this project?")) {
    DataService.deleteProject(id);
    renderProjects();
  }
}

function addNewProject() {
  const name = prompt("Project Name:");
  if (!name) return;
  
  const status = prompt("Status (Active/Beta/Alpha/Maintenance):", "Active");
  const teamSize = parseInt(prompt("Team Size:", "10"));
  const completion = parseInt(prompt("Completion %:", "0"));
  
  DataService.addProject({
    name,
    status: status || "Active",
    teamSize: teamSize || 10,
    completion: completion || 0,
    lastUpdated: new Date().toISOString().split('T')[0]
  });
  
  renderProjects();
}

// Assets
function editAsset(id) {
  const asset = DataService.getAssets().find(a => a.id === id);
  if (!asset) return;
  
  const name = prompt("Asset Name:", asset.name);
  if (!name) return;
  
  const type = prompt("Type (3D Models/Textures/Audio/Animations/UI Elements):", asset.type);
  const size = prompt("Size (e.g., 10.5 MB):", asset.size);
  const author = prompt("Author:", asset.author);
  const color = prompt("Color (hex code):", asset.color);
  
  DataService.updateAsset(id, {
    name,
    type: type || asset.type,
    size: size || asset.size,
    author: author || asset.author,
    color: color || asset.color
  });
  
  assets = DataService.getAssets();
  renderAssets();
}

function deleteAsset(id) {
  if (confirm("Are you sure you want to delete this asset?")) {
    DataService.deleteAsset(id);
    assets = DataService.getAssets();
    renderAssets();
  }
}

function addNewAsset() {
  const name = prompt("Asset Name:");
  if (!name) return;
  
  const type = prompt("Type (3D Models/Textures/Audio/Animations/UI Elements):", "3D Models");
  const size = prompt("Size (e.g., 10.5 MB):", "1.0 MB");
  const author = prompt("Author:");
  const color = prompt("Color (hex code):", "#1e88e5");
  
  DataService.addAsset({
    name,
    type: type || "3D Models",
    size: size || "1.0 MB",
    author: author || "Unknown",
    color: color || "#1e88e5"
  });
  
  assets = DataService.getAssets();
  renderAssets();
}

// Team Members
function editTeamMember(id) {
  const member = DataService.getTeamMembers().find(m => m.id === id);
  if (!member) return;
  
  const name = prompt("Member Name:", member.name);
  if (!name) return;
  
  const email = prompt("Email:", member.email);
  const role = prompt("Role (Admin/Developer/Artist/QA/Viewer):", member.role);
  const status = prompt("Status (Active/Inactive):", member.status);
  const color = prompt("Color (hex code):", member.color);
  
  DataService.updateTeamMember(id, {
    name,
    email: email || member.email,
    role: role || member.role,
    status: status || member.status,
    color: color || member.color,
    lastLogin: new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().split(' ')[0].slice(0, 5)
  });
  
  renderTeam();
}

function deleteTeamMember(id) {
  if (confirm("Are you sure you want to delete this team member?")) {
    DataService.deleteTeamMember(id);
    renderTeam();
  }
}

function addNewTeamMember() {
  const name = prompt("Member Name:");
  if (!name) return;
  
  const email = prompt("Email:");
  const role = prompt("Role (Admin/Developer/Artist/QA/Viewer):", "Developer");
  const status = prompt("Status (Active/Inactive):", "Active");
  const color = prompt("Color (hex code):", "#1e88e5");
  
  DataService.addTeamMember({
    name,
    email: email || "user@studio.io",
    role: role || "Developer",
    status: status || "Active",
    color: color || "#1e88e5",
    lastLogin: new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().split(' ')[0].slice(0, 5)
  });
  
  renderTeam();
}

// Events
function editEvent(id) {
  const event = DataService.getEvents().find(e => e.id === id);
  if (!event) return;
  
  const name = prompt("Event Name:", event.name);
  if (!name) return;
  
  const game = prompt("Game:", event.game);
  const start = prompt("Start Date (YYYY-MM-DD):", event.start);
  const end = prompt("End Date (YYYY-MM-DD):", event.end);
  const status = prompt("Status (Upcoming/Live/Ended):", event.status);
  const type = prompt("Type (Seasonal/Update/Tournament/Hotfix):", event.type);
  
  DataService.updateEvent(id, {
    name,
    game: game || event.game,
    start: start || event.start,
    end: end || event.end,
    status: status || event.status,
    type: type || event.type
  });
  
  renderEvents();
}

function deleteEvent(id) {
  if (confirm("Are you sure you want to delete this event?")) {
    DataService.deleteEvent(id);
    renderEvents();
  }
}

function addNewEvent() {
  const name = prompt("Event Name:");
  if (!name) return;
  
  const game = prompt("Game:");
  const start = prompt("Start Date (YYYY-MM-DD):", new Date().toISOString().split('T')[0]);
  const end = prompt("End Date (YYYY-MM-DD):", new Date().toISOString().split('T')[0]);
  const status = prompt("Status (Upcoming/Live/Ended):", "Upcoming");
  const type = prompt("Type (Seasonal/Update/Tournament/Hotfix):", "Update");
  
  DataService.addEvent({
    name,
    game: game || "Unknown Game",
    start: start || new Date().toISOString().split('T')[0],
    end: end || new Date().toISOString().split('T')[0],
    status: status || "Upcoming",
    type: type || "Update"
  });
  
  renderEvents();
}

// Builds
function editBuild(id) {
  const build = DataService.getBuilds().find(b => b.id === id);
  if (!build) return;
  
  const project = prompt("Project:", build.project);
  if (!project) return;
  
  const branch = prompt("Branch:", build.branch);
  const status = prompt("Status (Success/Failed/In Progress):", build.status);
  const duration = prompt("Duration (e.g., 4m 32s):", build.duration);
  const triggeredBy = prompt("Triggered By:", build.triggeredBy);
  
  DataService.updateBuild(id, {
    project,
    branch: branch || build.branch,
    status: status || build.status,
    duration: duration || build.duration,
    triggeredBy: triggeredBy || build.triggeredBy,
    timestamp: build.timestamp
  });
  
  renderBuilds();
}

function deleteBuild(id) {
  if (confirm("Are you sure you want to delete this build?")) {
    DataService.deleteBuild(id);
    renderBuilds();
  }
}

function addNewBuild() {
  const project = prompt("Project:");
  if (!project) return;
  
  const branch = prompt("Branch:", "main");
  const status = prompt("Status (Success/Failed/In Progress):", "In Progress");
  const duration = prompt("Duration (e.g., 4m 32s):", "0m 00s");
  const triggeredBy = prompt("Triggered By:");
  
  const now = new Date();
  const timestamp = now.toISOString().split('T')[0] + ' ' + now.toTimeString().split(' ')[0].slice(0, 5);
  
  DataService.addBuild({
    project,
    branch: branch || "main",
    status: status || "In Progress",
    duration: duration || "0m 00s",
    triggeredBy: triggeredBy || "Manual",
    timestamp
  });
  
  renderBuilds();
}

// KPIs
function editKPI(id) {
  const kpi = DataService.getKPIs().find(k => k.id === id);
  if (!kpi) return;
  
  const label = prompt("KPI Label:", kpi.label);
  if (!label) return;
  
  const value = prompt("Value:", kpi.value);
  const trend = prompt("Trend (up/down):", kpi.trend);
  const change = prompt("Change (e.g., +12.4%):", kpi.change);
  
  DataService.updateKPI(id, {
    label,
    value: value || kpi.value,
    trend: trend || kpi.trend,
    change: change || kpi.change
  });
  
  renderKPIs();
}

function deleteKPI(id) {
  if (confirm("Are you sure you want to delete this KPI?")) {
    DataService.deleteKPI(id);
    renderKPIs();
  }
}

function addNewKPI() {
  const label = prompt("KPI Label:");
  if (!label) return;
  
  const value = prompt("Value:", "0");
  const trend = prompt("Trend (up/down):", "up");
  const change = prompt("Change (e.g., +12.4%):", "+0.0%");
  
  DataService.addKPI({
    label,
    value: value || "0",
    trend: trend || "up",
    change: change || "+0.0%"
  });
  
  renderKPIs();
}

// Data Management
function exportAllData() {
  const data = DataService.exportData();
  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `dtcc-data-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
  alert("Data exported successfully!");
}

function importData() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        DataService.importData(data);
        // Re-render all sections instead of reloading
        renderProjects();
        renderAssets();
        renderBuilds();
        renderTeam();
        renderEvents();
        renderKPIs();
        alert("Data imported successfully!");
      } catch (err) {
        alert("Error importing data: " + err.message);
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

function resetData() {
  if (confirm("Are you sure you want to reset all data to defaults? This cannot be undone.")) {
    DataService.resetToDefaults();
    // Re-render all sections instead of reloading
    renderProjects();
    renderAssets();
    renderBuilds();
    renderTeam();
    renderEvents();
    renderKPIs();
    alert("Data reset to defaults successfully!");
  }
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
  setupAssetSearch();
  setupTagFilters();
  setupSidebar();
  setupNavLinks();
});
