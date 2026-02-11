// ===== Mock Data =====

const projects = [
  { name: "Nebula Frontier", status: "Active", teamSize: 24, lastUpdated: "2025-01-10", completion: 78 },
  { name: "Shadowkeep Arena", status: "Beta", teamSize: 18, lastUpdated: "2025-01-08", completion: 92 },
  { name: "Pixel Odyssey", status: "Alpha", teamSize: 12, lastUpdated: "2025-01-06", completion: 45 },
  { name: "Titan Forge", status: "Maintenance", teamSize: 8, lastUpdated: "2024-12-20", completion: 100 },
  { name: "Void Runners", status: "Active", teamSize: 20, lastUpdated: "2025-01-09", completion: 62 },
];

const assets = [
  { name: "Spaceship Hull", type: "3D Models", size: "14.2 MB", author: "J. Park", color: "#1e88e5" },
  { name: "Lava Texture Pack", type: "Textures", size: "8.7 MB", author: "S. Chen", color: "#ff5252" },
  { name: "Laser SFX Bundle", type: "Audio", size: "3.1 MB", author: "M. Rivera", color: "#00c9a7" },
  { name: "Character Run Cycle", type: "Animations", size: "6.4 MB", author: "A. Kowalski", color: "#ffab40" },
  { name: "HUD Crosshair Set", type: "UI Elements", size: "1.2 MB", author: "L. Nguyen", color: "#42a5f5" },
  { name: "Forest Ambience", type: "Audio", size: "5.8 MB", author: "D. Okafor", color: "#00e676" },
  { name: "Stone Wall Tileset", type: "Textures", size: "11.3 MB", author: "R. Müller", color: "#8d6e63" },
  { name: "Dragon Rig", type: "3D Models", size: "22.6 MB", author: "K. Tanaka", color: "#7c4dff" },
];

const assetTypes = ["All", "3D Models", "Textures", "Audio", "Animations", "UI Elements"];

const builds = [
  { project: "Nebula Frontier", branch: "main", status: "Success", duration: "4m 32s", triggeredBy: "J. Park", timestamp: "2025-01-10 14:23" },
  { project: "Shadowkeep Arena", branch: "release/0.9", status: "Success", duration: "6m 11s", triggeredBy: "CI Bot", timestamp: "2025-01-10 12:05" },
  { project: "Pixel Odyssey", branch: "feature/inventory", status: "Failed", duration: "2m 48s", triggeredBy: "A. Kowalski", timestamp: "2025-01-10 10:17" },
  { project: "Titan Forge", branch: "hotfix/crash", status: "Success", duration: "3m 05s", triggeredBy: "L. Nguyen", timestamp: "2025-01-09 22:44" },
  { project: "Nebula Frontier", branch: "feature/multiplayer", status: "In Progress", duration: "1m 22s", triggeredBy: "S. Chen", timestamp: "2025-01-10 14:50" },
  { project: "Void Runners", branch: "develop", status: "Failed", duration: "5m 09s", triggeredBy: "M. Rivera", timestamp: "2025-01-10 09:30" },
  { project: "Shadowkeep Arena", branch: "main", status: "Success", duration: "5m 55s", triggeredBy: "D. Okafor", timestamp: "2025-01-09 18:12" },
];

const teamMembers = [
  { name: "Jordan Park", email: "j.park@studio.io", role: "Admin", status: "Active", lastLogin: "2025-01-10 14:00", color: "#1e88e5" },
  { name: "Sofia Chen", email: "s.chen@studio.io", role: "Developer", status: "Active", lastLogin: "2025-01-10 13:45", color: "#00c9a7" },
  { name: "Adam Kowalski", email: "a.kowalski@studio.io", role: "Artist", status: "Active", lastLogin: "2025-01-10 11:20", color: "#ffab40" },
  { name: "Mei Rivera", email: "m.rivera@studio.io", role: "QA", status: "Active", lastLogin: "2025-01-09 17:30", color: "#ff5252" },
  { name: "Linh Nguyen", email: "l.nguyen@studio.io", role: "Developer", status: "Inactive", lastLogin: "2024-12-28 09:15", color: "#7c4dff" },
  { name: "David Okafor", email: "d.okafor@studio.io", role: "Viewer", status: "Active", lastLogin: "2025-01-10 08:00", color: "#42a5f5" },
  { name: "Kira Tanaka", email: "k.tanaka@studio.io", role: "Artist", status: "Active", lastLogin: "2025-01-10 12:10", color: "#00e676" },
];

const events = [
  { name: "Winter Clash 2025", game: "Shadowkeep Arena", start: "2025-01-15", end: "2025-02-15", status: "Upcoming", type: "Seasonal" },
  { name: "Nebula Open Beta", game: "Nebula Frontier", start: "2025-01-20", end: "2025-02-03", status: "Upcoming", type: "Update" },
  { name: "Pixel World Cup", game: "Pixel Odyssey", start: "2025-01-05", end: "2025-01-12", status: "Live", type: "Tournament" },
  { name: "Forge Stability Patch", game: "Titan Forge", start: "2024-12-20", end: "2024-12-20", status: "Ended", type: "Hotfix" },
  { name: "Void Speed Trials", game: "Void Runners", start: "2025-02-01", end: "2025-02-14", status: "Upcoming", type: "Tournament" },
  { name: "Shadow Halloween Event", game: "Shadowkeep Arena", start: "2024-10-20", end: "2024-11-05", status: "Ended", type: "Seasonal" },
  { name: "Nebula v1.2 Rollout", game: "Nebula Frontier", start: "2025-01-10", end: "2025-01-10", status: "Live", type: "Update" },
];

const kpis = [
  { label: "Daily Active Users", value: "128,430", trend: "up", change: "+12.4%" },
  { label: "Revenue (MTD)", value: "$1.42M", trend: "up", change: "+8.1%" },
  { label: "Retention Rate (D7)", value: "41.2%", trend: "down", change: "-2.3%" },
  { label: "Avg Session Duration", value: "24m 18s", trend: "up", change: "+5.7%" },
  { label: "New Users (Today)", value: "9,812", trend: "up", change: "+18.6%" },
  { label: "Conversion Rate", value: "3.8%", trend: "down", change: "-0.4%" },
];

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

function renderProjects() {
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
  const tbody = document.getElementById("buildsBody");
  tbody.innerHTML = builds.map((b, i) => `
    <tr class="reveal-item" style="${delay(i)}">
      <td style="color:var(--text-primary);font-weight:600;">${b.project}</td>
      <td><code style="background:rgba(255,255,255,0.05);padding:2px 8px;border-radius:4px;font-size:0.82rem;">${b.branch}</code></td>
      <td><span class="badge ${buildStatusClass(b.status)}">${b.status}</span></td>
      <td>${b.duration}</td>
      <td>${b.triggeredBy}</td>
      <td>${b.timestamp}</td>
    </tr>
  `).join("");
}

function renderTeam() {
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
    </tr>
  `).join("");
}

function renderEvents() {
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
    </div>
  `).join("");
}

function renderKPIs() {
  const grid = document.getElementById("kpiGrid");
  grid.innerHTML = kpis.map((k, i) => `
    <div class="card kpi-card reveal-item" style="${delay(i)}">
      <div class="kpi-label">${k.label}</div>
      <div class="kpi-value">${k.value}</div>
      <div class="kpi-trend ${k.trend}">
        ${k.trend === "up" ? "▲" : "▼"} ${k.change}
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
