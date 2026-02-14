import { useState } from 'react';
import { useToast } from '../components/Toast';

const codeSnippets = [
  {
    id: 1,
    title: 'Basic Three.js Scene Setup',
    framework: 'Three.js',
    category: 'Setup',
    description: 'Initialize a basic Three.js scene with camera, renderer, and animation loop',
    code: `import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 2, 5);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Handle resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});`
  },
  {
    id: 2,
    title: 'Basic Babylon.js Scene Setup',
    framework: 'Babylon.js',
    category: 'Setup',
    description: 'Initialize a basic Babylon.js scene with camera, lights, and engine',
    code: `import * as BABYLON from '@babylonjs/core';

// Get canvas
const canvas = document.getElementById('renderCanvas');

// Create engine and scene
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);

// Camera
const camera = new BABYLON.ArcRotateCamera(
  'camera',
  -Math.PI / 2,
  Math.PI / 2.5,
  10,
  new BABYLON.Vector3(0, 0, 0),
  scene
);
camera.attachControl(canvas, true);

// Lighting
const hemisphericLight = new BABYLON.HemisphericLight(
  'light',
  new BABYLON.Vector3(0, 1, 0),
  scene
);
hemisphericLight.intensity = 0.7;

const directionalLight = new BABYLON.DirectionalLight(
  'dirLight',
  new BABYLON.Vector3(-1, -2, -1),
  scene
);
directionalLight.position = new BABYLON.Vector3(5, 10, 5);
directionalLight.intensity = 0.5;

// Render loop
engine.runRenderLoop(() => {
  scene.render();
});

// Handle resize
window.addEventListener('resize', () => {
  engine.resize();
});`
  },
  {
    id: 3,
    title: 'Load GLTF Model (Three.js)',
    framework: 'Three.js',
    category: 'Loading',
    description: 'Load and display a GLTF 3D model with animations',
    code: `import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const loader = new GLTFLoader();

loader.load(
  '/models/scene.gltf',
  (gltf) => {
    const model = gltf.scene;
    scene.add(model);
    
    // Setup animations
    if (gltf.animations.length > 0) {
      const mixer = new THREE.AnimationMixer(model);
      gltf.animations.forEach((clip) => {
        mixer.clipAction(clip).play();
      });
      
      // In animation loop:
      // const delta = clock.getDelta();
      // mixer.update(delta);
    }
    
    // Center and scale model
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);
    
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 5 / maxDim;
    model.scale.setScalar(scale);
  },
  (progress) => {
    console.log((progress.loaded / progress.total * 100) + '% loaded');
  },
  (error) => {
    console.error('Error loading model:', error);
  }
);`
  },
  {
    id: 4,
    title: 'Custom Shader Material',
    framework: 'Three.js',
    category: 'Shaders',
    description: 'Create a custom shader material with uniforms',
    code: `const material = new THREE.ShaderMaterial({
  uniforms: {
    time: { value: 0.0 },
    color: { value: new THREE.Color(0x00ff00) },
    texture1: { value: new THREE.TextureLoader().load('/texture.jpg') }
  },
  vertexShader: \`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  \`,
  fragmentShader: \`
    uniform float time;
    uniform vec3 color;
    uniform sampler2D texture1;
    varying vec2 vUv;
    
    void main() {
      vec4 texColor = texture2D(texture1, vUv);
      vec3 finalColor = mix(texColor.rgb, color, 0.5);
      gl_FragColor = vec4(finalColor, 1.0);
    }
  \`
});

// Update in animation loop:
// material.uniforms.time.value = performance.now() * 0.001;`
  },
  {
    id: 5,
    title: 'Physics with Cannon.js',
    framework: 'Three.js',
    category: 'Physics',
    description: 'Integrate physics simulation with Cannon.js',
    code: `import * as CANNON from 'cannon-es';

// Create physics world
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);

// Create physics body
const sphereShape = new CANNON.Sphere(1);
const sphereBody = new CANNON.Body({
  mass: 1,
  shape: sphereShape,
  position: new CANNON.Vec3(0, 5, 0)
});
world.addBody(sphereBody);

// Ground
const groundShape = new CANNON.Plane();
const groundBody = new CANNON.Body({
  mass: 0,
  shape: groundShape
});
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
world.addBody(groundBody);

// Create visual mesh
const geometry = new THREE.SphereGeometry(1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const sphereMesh = new THREE.Mesh(geometry, material);
scene.add(sphereMesh);

// Update in animation loop:
const timeStep = 1 / 60;
function animate() {
  world.step(timeStep);
  
  // Sync visual with physics
  sphereMesh.position.copy(sphereBody.position);
  sphereMesh.quaternion.copy(sphereBody.quaternion);
  
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();`
  },
  {
    id: 6,
    title: 'Post-Processing Effects',
    framework: 'Three.js',
    category: 'Effects',
    description: 'Add post-processing effects like bloom and FXAA',
    code: `import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';

// Create composer
const composer = new EffectComposer(renderer);

// Add render pass
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

// Add bloom pass
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5, // strength
  0.4, // radius
  0.85 // threshold
);
composer.addPass(bloomPass);

// Add FXAA antialiasing
const fxaaPass = new ShaderPass(FXAAShader);
const pixelRatio = renderer.getPixelRatio();
fxaaPass.material.uniforms['resolution'].value.x = 1 / (window.innerWidth * pixelRatio);
fxaaPass.material.uniforms['resolution'].value.y = 1 / (window.innerHeight * pixelRatio);
composer.addPass(fxaaPass);

// In animation loop, use composer instead of renderer:
// composer.render();`
  },
  {
    id: 7,
    title: 'Raycasting for Object Picking',
    framework: 'Three.js',
    category: 'Interaction',
    description: 'Detect mouse clicks on 3D objects',
    code: `const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseClick(event) {
  // Calculate mouse position in normalized device coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
  // Update raycaster
  raycaster.setFromCamera(mouse, camera);
  
  // Calculate objects intersecting the ray
  const intersects = raycaster.intersectObjects(scene.children, true);
  
  if (intersects.length > 0) {
    const object = intersects[0].object;
    console.log('Clicked on:', object.name);
    
    // Change color on click
    object.material.color.setHex(Math.random() * 0xffffff);
  }
}

window.addEventListener('click', onMouseClick);`
  },
  {
    id: 8,
    title: 'Particle System',
    framework: 'Three.js',
    category: 'Effects',
    description: 'Create an efficient particle system',
    code: `const particleCount = 5000;
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const velocities = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i += 3) {
  positions[i] = (Math.random() - 0.5) * 10;
  positions[i + 1] = (Math.random() - 0.5) * 10;
  positions[i + 2] = (Math.random() - 0.5) * 10;
  
  velocities[i] = (Math.random() - 0.5) * 0.02;
  velocities[i + 1] = (Math.random() - 0.5) * 0.02;
  velocities[i + 2] = (Math.random() - 0.5) * 0.02;
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
  size: 0.1,
  color: 0x00ff00,
  transparent: true,
  opacity: 0.8,
  blending: THREE.AdditiveBlending
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

// Update in animation loop:
function animate() {
  const positions = particles.geometry.attributes.position.array;
  
  for (let i = 0; i < positions.length; i += 3) {
    positions[i] += velocities[i];
    positions[i + 1] += velocities[i + 1];
    positions[i + 2] += velocities[i + 2];
    
    // Wrap around bounds
    if (Math.abs(positions[i]) > 5) velocities[i] *= -1;
    if (Math.abs(positions[i + 1]) > 5) velocities[i + 1] *= -1;
    if (Math.abs(positions[i + 2]) > 5) velocities[i + 2] *= -1;
  }
  
  particles.geometry.attributes.position.needsUpdate = true;
  requestAnimationFrame(animate);
}
animate();`
  }
];

export default function CodeSnippets() {
  const [selectedSnippet, setSelectedSnippet] = useState(null);
  const [filterFramework, setFilterFramework] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const showToast = useToast();

  const frameworks = ['All', 'Three.js', 'Babylon.js'];
  const categories = ['All', ...new Set(codeSnippets.map(s => s.category))];

  const filteredSnippets = codeSnippets.filter(snippet => {
    const matchesSearch = 
      snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFramework = filterFramework === 'All' || snippet.framework === filterFramework;
    const matchesCategory = filterCategory === 'All' || snippet.category === filterCategory;
    return matchesSearch && matchesFramework && matchesCategory;
  });

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    showToast('Code copied to clipboard!');
  };

  return (
    <section className="section snippets-section">
      <div className="section-header">
        <h2 className="section-title">💻 Code Snippets</h2>
      </div>

      <div className="snippets-controls">
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search snippets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-group">
          <select
            className="form-select"
            value={filterFramework}
            onChange={(e) => setFilterFramework(e.target.value)}
          >
            {frameworks.map(fw => (
              <option key={fw} value={fw}>{fw}</option>
            ))}
          </select>
          
          <select
            className="form-select"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="snippets-grid">
        {filteredSnippets.map((snippet, i) => (
          <div
            key={snippet.id}
            className="card snippet-card reveal-item"
            style={{ animationDelay: `${i * 0.05}s` }}
            onClick={() => setSelectedSnippet(snippet)}
          >
            <div className="snippet-header">
              <h3 className="snippet-title">{snippet.title}</h3>
              <span className="badge badge-framework">{snippet.framework}</span>
            </div>
            <p className="snippet-description">{snippet.description}</p>
            <div className="snippet-footer">
              <span className="snippet-category">{snippet.category}</span>
              <button
                className="btn-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  copyCode(snippet.code);
                }}
                title="Copy Code"
              >
                📋
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedSnippet && (
        <div className="snippet-modal-overlay" onClick={() => setSelectedSnippet(null)}>
          <div className="snippet-modal" onClick={(e) => e.stopPropagation()}>
            <div className="snippet-modal-header">
              <div>
                <h3>{selectedSnippet.title}</h3>
                <p>{selectedSnippet.description}</p>
              </div>
              <button className="close-btn" onClick={() => setSelectedSnippet(null)}>×</button>
            </div>
            <div className="snippet-modal-body">
              <pre><code>{selectedSnippet.code}</code></pre>
            </div>
            <div className="snippet-modal-footer">
              <button className="btn-primary" onClick={() => copyCode(selectedSnippet.code)}>
                📋 Copy Code
              </button>
              <button className="btn-secondary" onClick={() => setSelectedSnippet(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
