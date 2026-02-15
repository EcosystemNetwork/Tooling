import { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import DataService from '../services/DataService';
import { useToast } from './Toast';
import { animate } from 'animejs/animation';
import { stagger } from 'animejs/utils';

const navItems = [
  { to: '/', icon: '📊', label: 'Dashboard' },
  { to: '/scene-viewer', icon: '🎮', label: '3D Scene' },
  { to: '/shader-lab', icon: '🎨', label: 'Shader Lab' },
  { to: '/assets', icon: '🗂️', label: 'Assets' },
  { to: '/code-snippets', icon: '💻', label: 'Snippets' },
  { to: '/resources', icon: '📚', label: 'Resources' },
  { to: '/performance', icon: '⚡', label: 'Performance' },
  { to: '/builds', icon: '🚀', label: 'Builds' },
  { to: '/team', icon: '👥', label: 'Team' },
  { to: '/events', icon: '📅', label: 'Events' },
  { to: '/calendar', icon: '🗓️', label: 'Calendar' },
  { to: '/timeline', icon: '⏳', label: 'Timeline' },
  { to: '/analytics', icon: '📈', label: 'Analytics' },
];

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const showToast = useToast();

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  // Initial animations on mount
  useEffect(() => {
    // Animate background shapes with floating effect
    animate('.shape', {
      translateX: function() {
        return Math.random() * 100 - 50;
      },
      translateY: function() {
        return Math.random() * 100 - 50;
      },
      scale: function() {
        return Math.random() * 0.4 + 0.8;
      },
      duration: 8000,
      ease: 'inOut(sine)',
      direction: 'alternate',
      loop: true,
    });

    // Animate header title
    animate('.header-title', {
      translateY: [-20, 0],
      opacity: [0, 1],
      duration: 1000,
      ease: 'out(expo)',
    });

    // Animate header buttons
    animate('.header-btn', {
      translateY: [-20, 0],
      opacity: [0, 1],
      delay: stagger(100, {from: 'first', start: 300}),
      duration: 800,
      ease: 'out(expo)',
    });

    // Animate header avatar
    animate('.header-avatar', {
      scale: [0, 1],
      rotate: [180, 0],
      duration: 1000,
      delay: 500,
      ease: 'outElastic(1, 0.6)',
    });

    // Animate sidebar navigation items
    animate('.nav-link', {
      translateX: [-50, 0],
      opacity: [0, 1],
      delay: stagger(50, {from: 'first', start: 200}),
      duration: 800,
      ease: 'out(expo)',
    });

    // Animate sidebar logo
    animate('.sidebar-logo', {
      scale: [0, 1],
      rotate: [-180, 0],
      duration: 1200,
      ease: 'outElastic(1, 0.5)',
    });
  }, []);

  const exportAllData = () => {
    const data = DataService.exportData();
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'dtcc-data-' + new Date().toISOString().split('T')[0] + '.json';
    link.click();
    URL.revokeObjectURL(url);
    showToast('Data exported successfully!');
  };

  const importData = () => {
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
          showToast('Data imported successfully! Refresh the page to see changes.', 'info');
          window.location.reload();
        } catch (err) {
          showToast('Error importing data: ' + err.message, 'error');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const resetData = () => {
    if (window.confirm('Are you sure you want to reset all data to defaults? This cannot be undone.')) {
      DataService.resetToDefaults();
      showToast('Data reset to defaults successfully!');
      window.location.reload();
    }
  };

  return (
    <>
      {/* Decorative background shapes */}
      <div className="bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
        <div className="shape shape-5"></div>
      </div>

      {/* Top Header */}
      <header className="top-header">
        <button className="hamburger" onClick={toggleSidebar} aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
        <h1 className="header-title">GameForge Studio</h1>
        <div className="header-controls">
          <button className="header-btn" onClick={exportAllData} title="Export Data">💾 Export</button>
          <button className="header-btn" onClick={importData} title="Import Data">📥 Import</button>
          <button className="header-btn" onClick={resetData} title="Reset Data">🔄 Reset</button>
        </div>
        <div className="header-user">
          <span className="header-user-name">User</span>
          <div className="header-avatar">GF</div>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <nav className={`sidebar${sidebarOpen ? ' open' : ''}`}>
        <div className="sidebar-logo">GF</div>
        <ul className="sidebar-nav">
          {navItems.map(item => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                onClick={closeSidebar}
              >
                <span className="nav-icon">{item.icon}</span> {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Overlay for Mobile */}
      <div
        className={`sidebar-overlay${sidebarOpen ? ' open' : ''}`}
        onClick={closeSidebar}
      ></div>

      {/* Main Content */}
      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
}
