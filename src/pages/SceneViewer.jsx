import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'stats.js';
import { useToast } from '../components/Toast';

export default function SceneViewer() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const statsRef = useRef(null);
  const animationIdRef = useRef(null);
  const meshRef = useRef(null);
  
  const [showStats, setShowStats] = useState(true);
  const [objectType, setObjectType] = useState('cube');
  const [wireframe, setWireframe] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0.01, z: 0 });
  const [backgroundColor, setBackgroundColor] = useState('#060e24');
  const [objectColor, setObjectColor] = useState('#00c9a7');
  const [lightIntensity, setLightIntensity] = useState(1);
  const [gridHelper, setGridHelper] = useState(true);
  const [axesHelper, setAxesHelper] = useState(true);
  const showToast = useToast();

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(backgroundColor);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(5, 5, 5);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controlsRef.current = controls;

    // Stats
    const stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb
    stats.dom.style.position = 'absolute';
    stats.dom.style.top = '10px';
    stats.dom.style.left = '10px';
    if (showStats) {
      containerRef.current.appendChild(stats.dom);
    }
    statsRef.current = stats;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, lightIntensity);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Grid and Axes helpers
    if (gridHelper) {
      const grid = new THREE.GridHelper(20, 20, 0x1e88e5, 0x1e88e5);
      grid.material.opacity = 0.2;
      grid.material.transparent = true;
      scene.add(grid);
    }

    if (axesHelper) {
      const axes = new THREE.AxesHelper(5);
      scene.add(axes);
    }

    // Create object function
    const createObject = (scene, type, color, wireframe) => {
      let geometry;
      switch (type) {
        case 'cube':
          geometry = new THREE.BoxGeometry(2, 2, 2);
          break;
        case 'sphere':
          geometry = new THREE.SphereGeometry(1.5, 32, 32);
          break;
        case 'torus':
          geometry = new THREE.TorusGeometry(1.5, 0.5, 16, 100);
          break;
        case 'cone':
          geometry = new THREE.ConeGeometry(1.5, 3, 32);
          break;
        case 'cylinder':
          geometry = new THREE.CylinderGeometry(1.5, 1.5, 3, 32);
          break;
        case 'tetrahedron':
          geometry = new THREE.TetrahedronGeometry(2);
          break;
        case 'octahedron':
          geometry = new THREE.OctahedronGeometry(2);
          break;
        case 'dodecahedron':
          geometry = new THREE.DodecahedronGeometry(2);
          break;
        case 'icosahedron':
          geometry = new THREE.IcosahedronGeometry(2);
          break;
        case 'torusknot':
          geometry = new THREE.TorusKnotGeometry(1.5, 0.5, 100, 16);
          break;
        default:
          geometry = new THREE.BoxGeometry(2, 2, 2);
      }

      const material = new THREE.MeshStandardMaterial({
        color: color,
        wireframe: wireframe,
        metalness: 0.3,
        roughness: 0.4,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      meshRef.current = mesh;
    };

    // Create initial object
    createObject(scene, objectType, objectColor, wireframe);

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      if (meshRef.current) {
        meshRef.current.rotation.x += rotation.x;
        meshRef.current.rotation.y += rotation.y;
        meshRef.current.rotation.z += rotation.z;
      }
      
      controls.update();
      stats.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      if (containerRef.current && stats.dom && stats.dom.parentNode) {
        containerRef.current.removeChild(stats.dom);
      }
      renderer.dispose();
    };
  }, []);

  // Update scene when settings change
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.background = new THREE.Color(backgroundColor);
    }
  }, [backgroundColor]);

  useEffect(() => {
    if (sceneRef.current && meshRef.current) {
      sceneRef.current.remove(meshRef.current);
      createObject(sceneRef.current, objectType, objectColor, wireframe);
    }
  }, [objectType, objectColor, wireframe]);

  useEffect(() => {
    if (statsRef.current && containerRef.current) {
      if (showStats && !containerRef.current.contains(statsRef.current.dom)) {
        containerRef.current.appendChild(statsRef.current.dom);
      } else if (!showStats && containerRef.current.contains(statsRef.current.dom)) {
        containerRef.current.removeChild(statsRef.current.dom);
      }
    }
  }, [showStats]);

  const resetCamera = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(5, 5, 5);
      controlsRef.current.reset();
      showToast('Camera reset to default position');
    }
  };

  const takeScreenshot = () => {
    if (rendererRef.current) {
      const dataURL = rendererRef.current.domElement.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `scene-${Date.now()}.png`;
      link.href = dataURL;
      link.click();
      showToast('Screenshot saved!');
    }
  };

  return (
    <section className="section scene-viewer-section">
      <div className="section-header">
        <h2 className="section-title">🎮 3D Scene Playground (Three.js)</h2>
      </div>

      <div className="scene-viewer-container">
        <div className="scene-canvas-wrapper" ref={containerRef}></div>
        
        <div className="scene-controls-panel">
          <div className="control-section">
            <h3 className="control-title">Object Settings</h3>
            
            <div className="form-group">
              <label className="form-label">Geometry Type</label>
              <select className="form-select" value={objectType} onChange={(e) => setObjectType(e.target.value)}>
                <option value="cube">Cube</option>
                <option value="sphere">Sphere</option>
                <option value="torus">Torus</option>
                <option value="cone">Cone</option>
                <option value="cylinder">Cylinder</option>
                <option value="tetrahedron">Tetrahedron</option>
                <option value="octahedron">Octahedron</option>
                <option value="dodecahedron">Dodecahedron</option>
                <option value="icosahedron">Icosahedron</option>
                <option value="torusknot">Torus Knot</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Object Color</label>
              <input
                className="form-input"
                type="color"
                value={objectColor}
                onChange={(e) => setObjectColor(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label checkbox-label">
                <input
                  type="checkbox"
                  checked={wireframe}
                  onChange={(e) => setWireframe(e.target.checked)}
                />
                <span>Wireframe Mode</span>
              </label>
            </div>
          </div>

          <div className="control-section">
            <h3 className="control-title">Scene Settings</h3>
            
            <div className="form-group">
              <label className="form-label">Background Color</label>
              <input
                className="form-input"
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Light Intensity: {lightIntensity.toFixed(1)}</label>
              <input
                className="form-range"
                type="range"
                min="0"
                max="3"
                step="0.1"
                value={lightIntensity}
                onChange={(e) => setLightIntensity(parseFloat(e.target.value))}
              />
            </div>

            <div className="form-group">
              <label className="form-label checkbox-label">
                <input
                  type="checkbox"
                  checked={gridHelper}
                  onChange={(e) => setGridHelper(e.target.checked)}
                />
                <span>Show Grid</span>
              </label>
            </div>

            <div className="form-group">
              <label className="form-label checkbox-label">
                <input
                  type="checkbox"
                  checked={axesHelper}
                  onChange={(e) => setAxesHelper(e.target.checked)}
                />
                <span>Show Axes</span>
              </label>
            </div>

            <div className="form-group">
              <label className="form-label checkbox-label">
                <input
                  type="checkbox"
                  checked={showStats}
                  onChange={(e) => setShowStats(e.target.checked)}
                />
                <span>Show FPS Stats</span>
              </label>
            </div>
          </div>

          <div className="control-section">
            <h3 className="control-title">Rotation Speed</h3>
            
            <div className="form-group">
              <label className="form-label">X Axis: {rotation.x.toFixed(3)}</label>
              <input
                className="form-range"
                type="range"
                min="-0.05"
                max="0.05"
                step="0.001"
                value={rotation.x}
                onChange={(e) => setRotation({ ...rotation, x: parseFloat(e.target.value) })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Y Axis: {rotation.y.toFixed(3)}</label>
              <input
                className="form-range"
                type="range"
                min="-0.05"
                max="0.05"
                step="0.001"
                value={rotation.y}
                onChange={(e) => setRotation({ ...rotation, y: parseFloat(e.target.value) })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Z Axis: {rotation.z.toFixed(3)}</label>
              <input
                className="form-range"
                type="range"
                min="-0.05"
                max="0.05"
                step="0.001"
                value={rotation.z}
                onChange={(e) => setRotation({ ...rotation, z: parseFloat(e.target.value) })}
              />
            </div>
          </div>

          <div className="control-section">
            <h3 className="control-title">Actions</h3>
            <div className="button-group">
              <button className="btn-primary" onClick={resetCamera}>🎥 Reset Camera</button>
              <button className="btn-primary" onClick={takeScreenshot}>📸 Screenshot</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
