import { useState } from 'react';
import DataService from '../services/DataService';
import Modal from '../components/Modal';
import { useToast } from '../components/Toast';

const defaultResources = [
  {
    id: 1,
    title: 'Three.js Documentation',
    description: 'Official Three.js documentation with guides, examples, and API reference',
    url: 'https://threejs.org/docs/',
    category: 'Documentation',
    framework: 'Three.js',
    tags: ['docs', 'api', 'reference']
  },
  {
    id: 2,
    title: 'Three.js Examples',
    description: 'Hundreds of interactive Three.js examples covering all features',
    url: 'https://threejs.org/examples/',
    category: 'Examples',
    framework: 'Three.js',
    tags: ['examples', 'demos', 'showcase']
  },
  {
    id: 3,
    title: 'Babylon.js Documentation',
    description: 'Complete Babylon.js documentation with tutorials and playground',
    url: 'https://doc.babylonjs.com/',
    category: 'Documentation',
    framework: 'Babylon.js',
    tags: ['docs', 'tutorials', 'guide']
  },
  {
    id: 4,
    title: 'Babylon.js Playground',
    description: 'Interactive playground to test and share Babylon.js code',
    url: 'https://playground.babylonjs.com/',
    category: 'Tools',
    framework: 'Babylon.js',
    tags: ['playground', 'editor', 'interactive']
  },
  {
    id: 5,
    title: 'Three.js Journey',
    description: 'Premium course for learning Three.js from basics to advanced',
    url: 'https://threejs-journey.com/',
    category: 'Learning',
    framework: 'Three.js',
    tags: ['course', 'tutorial', 'learning']
  },
  {
    id: 6,
    title: 'Discover Three.js',
    description: 'Free comprehensive book on Three.js fundamentals',
    url: 'https://discoverthreejs.com/',
    category: 'Learning',
    framework: 'Three.js',
    tags: ['book', 'tutorial', 'free']
  },
  {
    id: 7,
    title: 'WebGL Fundamentals',
    description: 'Learn WebGL from the ground up, foundation for Three.js and Babylon.js',
    url: 'https://webglfundamentals.org/',
    category: 'Learning',
    framework: 'WebGL',
    tags: ['webgl', 'fundamentals', 'tutorial']
  },
  {
    id: 8,
    title: 'Shadertoy',
    description: 'Community of shader artists sharing GLSL fragment shaders',
    url: 'https://www.shadertoy.com/',
    category: 'Tools',
    framework: 'GLSL',
    tags: ['shaders', 'glsl', 'community']
  },
  {
    id: 9,
    title: 'Sketchfab',
    description: 'Platform for publishing, sharing, and discovering 3D models',
    url: 'https://sketchfab.com/',
    category: 'Assets',
    framework: 'General',
    tags: ['models', '3d', 'assets']
  },
  {
    id: 10,
    title: 'Poly Haven',
    description: 'Free high-quality 3D assets including HDRIs, textures, and models',
    url: 'https://polyhaven.com/',
    category: 'Assets',
    framework: 'General',
    tags: ['assets', 'free', 'hdri', 'textures']
  },
  {
    id: 11,
    title: 'glTF Sample Models',
    description: 'Collection of glTF 2.0 sample models for testing',
    url: 'https://github.com/KhronosGroup/glTF-Sample-Models',
    category: 'Assets',
    framework: 'General',
    tags: ['gltf', 'models', 'samples']
  },
  {
    id: 12,
    title: 'Three.js Editor',
    description: 'Web-based scene editor for Three.js projects',
    url: 'https://threejs.org/editor/',
    category: 'Tools',
    framework: 'Three.js',
    tags: ['editor', 'visual', 'scene']
  }
];

export default function Resources() {
  const [resources] = useState(defaultResources);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterFramework, setFilterFramework] = useState('All');
  const showToast = useToast();

  const categories = ['All', 'Documentation', 'Examples', 'Learning', 'Tools', 'Assets'];
  const frameworks = ['All', 'Three.js', 'Babylon.js', 'WebGL', 'GLSL', 'General'];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = filterCategory === 'All' || resource.category === filterCategory;
    const matchesFramework = filterFramework === 'All' || resource.framework === filterFramework;
    
    return matchesSearch && matchesCategory && matchesFramework;
  });

  const openResource = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    showToast('Opening resource in new tab');
  };

  const copyUrl = (url) => {
    navigator.clipboard.writeText(url);
    showToast('URL copied to clipboard!');
  };

  return (
    <section className="section resources-section">
      <div className="section-header">
        <h2 className="section-title">📚 Game Dev Resources</h2>
      </div>

      <div className="resources-controls">
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search resources, tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-group">
          <select
            className="form-select"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          
          <select
            className="form-select"
            value={filterFramework}
            onChange={(e) => setFilterFramework(e.target.value)}
          >
            {frameworks.map(fw => (
              <option key={fw} value={fw}>{fw}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="resources-grid">
        {filteredResources.map((resource, i) => (
          <div
            key={resource.id}
            className="card resource-card reveal-item"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="resource-header">
              <h3 className="resource-title">{resource.title}</h3>
              <span className="badge badge-category">{resource.category}</span>
            </div>
            
            <p className="resource-description">{resource.description}</p>
            
            <div className="resource-meta">
              <span className="resource-framework">{resource.framework}</span>
              <div className="resource-tags">
                {resource.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
            
            <div className="resource-actions">
              <button
                className="btn-primary"
                onClick={() => openResource(resource.url)}
              >
                🔗 Open
              </button>
              <button
                className="btn-icon"
                onClick={() => copyUrl(resource.url)}
                title="Copy URL"
              >
                📋
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="empty-state">
          <p>No resources found matching your criteria.</p>
        </div>
      )}

      <div className="card resources-info">
        <h3 className="card-title">Quick Start Guide</h3>
        <div className="quick-start-grid">
          <div className="quick-start-item">
            <h4>🎮 Three.js</h4>
            <p>Lightweight, easy to use, perfect for creative coding and web experiences.</p>
            <code>npm install three</code>
          </div>
          <div className="quick-start-item">
            <h4>🏰 Babylon.js</h4>
            <p>Full-featured game engine with built-in physics, audio, and advanced features.</p>
            <code>npm install @babylonjs/core</code>
          </div>
          <div className="quick-start-item">
            <h4>⚡ Performance Tips</h4>
            <ul>
              <li>Use instanced meshes for repeated objects</li>
              <li>Implement frustum culling and LOD</li>
              <li>Optimize textures (compress, use mipmaps)</li>
              <li>Batch draw calls when possible</li>
              <li>Use object pooling for dynamic objects</li>
            </ul>
          </div>
          <div className="quick-start-item">
            <h4>🎨 Best Practices</h4>
            <ul>
              <li>Keep scenes under 100K triangles for mobile</li>
              <li>Limit number of lights (3-5 for good performance)</li>
              <li>Use baked lighting when possible</li>
              <li>Implement asset loading screens</li>
              <li>Test on target devices early and often</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
