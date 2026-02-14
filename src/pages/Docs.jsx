export default function Docs() {
  const resources = [
    {
      category: 'Three.js',
      icon: '🔺',
      links: [
        { name: 'Three.js Documentation', url: 'https://threejs.org/docs/', desc: 'Official API reference and guides' },
        { name: 'Three.js Examples', url: 'https://threejs.org/examples/', desc: 'Interactive examples gallery' },
        { name: 'Three.js Editor', url: 'https://threejs.org/editor/', desc: 'Browser-based 3D scene editor' },
        { name: 'Discover Three.js', url: 'https://discoverthreejs.com/', desc: 'Free online book for learning Three.js' },
      ]
    },
    {
      category: 'Babylon.js',
      icon: '🏛️',
      links: [
        { name: 'Babylon.js Documentation', url: 'https://doc.babylonjs.com/', desc: 'Official docs and tutorials' },
        { name: 'Babylon.js Playground', url: 'https://playground.babylonjs.com/', desc: 'Live code playground' },
        { name: 'Node Material Editor', url: 'https://nme.babylonjs.com/', desc: 'Visual shader graph editor' },
        { name: 'Babylon.js Forum', url: 'https://forum.babylonjs.com/', desc: 'Community support forum' },
      ]
    },
    {
      category: 'Physics Engines',
      icon: '⚛️',
      links: [
        { name: 'Cannon-es', url: 'https://pmndrs.github.io/cannon-es/', desc: 'Lightweight 3D physics for the web' },
        { name: 'Rapier', url: 'https://rapier.rs/', desc: 'High-performance Rust/WASM physics' },
        { name: 'Havok (Babylon)', url: 'https://doc.babylonjs.com/features/featuresDeepDive/physics/havokPlugin', desc: 'Havok physics integration for Babylon.js' },
        { name: 'Ammo.js', url: 'https://github.com/kripken/ammo.js/', desc: 'Bullet physics compiled to JavaScript' },
      ]
    },
    {
      category: 'Debug & Profiling',
      icon: '🔧',
      links: [
        { name: 'Spector.js', url: 'https://spector.babylonjs.com/', desc: 'WebGL debugging and inspection tool' },
        { name: 'Chrome GPU Inspector', url: 'https://developer.chrome.com/docs/devtools/', desc: 'Built-in GPU profiling in Chrome DevTools' },
        { name: 'stats.js', url: 'https://github.com/mrdoob/stats.js/', desc: 'JavaScript performance monitor' },
        { name: 'lil-gui', url: 'https://lil-gui.georgealways.com/', desc: 'Lightweight GUI for tweaking parameters' },
      ]
    },
    {
      category: 'Learning & Tutorials',
      icon: '📚',
      links: [
        { name: 'Three.js Journey', url: 'https://threejs-journey.com/', desc: 'Comprehensive Three.js course by Bruno Simon' },
        { name: 'WebGL Fundamentals', url: 'https://webglfundamentals.org/', desc: 'Learn WebGL from the ground up' },
        { name: 'The Book of Shaders', url: 'https://thebookofshaders.com/', desc: 'Interactive guide to fragment shaders' },
        { name: 'Shader Toy', url: 'https://www.shadertoy.com/', desc: 'Community shader playground and gallery' },
      ]
    }
  ];

  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">📖 Documentation &amp; Resources</h2>
      </div>
      <div className="docs-grid">
        {resources.map((group, i) => (
          <div key={i} className="card docs-category-card reveal-item" style={{ animationDelay: `${i * 0.07}s` }}>
            <div className="docs-category-header">
              <span className="docs-icon">{group.icon}</span>
              <h3 className="docs-category-name">{group.category}</h3>
            </div>
            <div className="docs-links">
              {group.links.map((link, j) => (
                <a key={j} href={link.url} target="_blank" rel="noopener noreferrer" className="docs-link">
                  <div className="docs-link-name">{link.name}</div>
                  <div className="docs-link-desc">{link.desc}</div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
