import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useToast } from '../components/Toast';

const defaultVertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const defaultFragmentShader = `
uniform float time;
uniform vec2 resolution;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec3 color = 0.5 + 0.5 * cos(time + uv.xyx + vec3(0.0, 2.0, 4.0));
  gl_FragColor = vec4(color, 1.0);
}
`;

const shaderPresets = {
  rainbow: {
    name: 'Rainbow Gradient',
    fragment: `
uniform float time;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec3 color = 0.5 + 0.5 * cos(time + uv.xyx + vec3(0.0, 2.0, 4.0));
  gl_FragColor = vec4(color, 1.0);
}
`
  },
  waves: {
    name: 'Animated Waves',
    fragment: `
uniform float time;
varying vec2 vUv;

void main() {
  vec2 uv = vUv * 10.0;
  float wave = sin(uv.x + time) * cos(uv.y + time * 0.5);
  vec3 color = vec3(0.0, 0.5 + 0.5 * wave, 1.0);
  gl_FragColor = vec4(color, 1.0);
}
`
  },
  plasma: {
    name: 'Plasma Effect',
    fragment: `
uniform float time;
varying vec2 vUv;

void main() {
  vec2 uv = vUv * 5.0;
  float v = sin(uv.x + time);
  v += sin(uv.y + time);
  v += sin(uv.x + uv.y + time);
  v += sin(sqrt(uv.x * uv.x + uv.y * uv.y) + time);
  v = v * 0.25 + 0.5;
  vec3 color = vec3(v, v * 0.5, 1.0 - v);
  gl_FragColor = vec4(color, 1.0);
}
`
  },
  noise: {
    name: 'Perlin-like Noise',
    fragment: `
uniform float time;
varying vec2 vUv;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
  vec2 uv = vUv * 5.0;
  float n = noise(uv + time * 0.5);
  vec3 color = vec3(n);
  gl_FragColor = vec4(color, 1.0);
}
`
  },
  grid: {
    name: 'Grid Pattern',
    fragment: `
uniform float time;
varying vec2 vUv;

void main() {
  vec2 uv = vUv * 20.0;
  vec2 grid = abs(fract(uv - 0.5) - 0.5) / fwidth(uv);
  float line = min(grid.x, grid.y);
  vec3 color = vec3(1.0 - min(line, 1.0));
  color *= 0.5 + 0.5 * sin(time);
  gl_FragColor = vec4(color, 1.0);
}
`
  },
  toon: {
    name: 'Toon Shading',
    fragment: `
uniform float time;
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
  vec3 normal = normalize(cross(dFdx(vPosition), dFdy(vPosition)));
  float intensity = dot(normal, lightDir);
  intensity = floor(intensity * 4.0) / 4.0;
  vec3 color = vec3(0.0, 0.8, 1.0) * intensity;
  gl_FragColor = vec4(color, 1.0);
}
`
  }
};

export default function ShaderLab() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const materialRef = useRef(null);
  const animationIdRef = useRef(null);
  
  const [vertexShader, setVertexShader] = useState(defaultVertexShader);
  const [fragmentShader, setFragmentShader] = useState(defaultFragmentShader);
  const [error, setError] = useState('');
  const [selectedPreset, setSelectedPreset] = useState('');
  const showToast = useToast();

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 2;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Compile shader function
    const compileShader = (scene, geometry, vShader, fShader) => {
      try {
        // Remove old mesh
        if (scene.children.length > 0) {
          scene.remove(scene.children[0]);
        }

        const material = new THREE.ShaderMaterial({
          vertexShader: vShader,
          fragmentShader: fShader,
          uniforms: {
            time: { value: 0 },
            resolution: { value: new THREE.Vector2(
              containerRef.current?.clientWidth || 800,
              containerRef.current?.clientHeight || 600
            )}
          }
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        materialRef.current = material;
        setError('');
        return true;
      } catch (err) {
        setError(err.message);
        return false;
      }
    };

    // Create plane with shader material
    const geometry = new THREE.PlaneGeometry(3, 3, 64, 64);
    compileShader(scene, geometry, vertexShader, fragmentShader);

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      if (materialRef.current && materialRef.current.uniforms.time) {
        materialRef.current.uniforms.time.value = performance.now() * 0.001;
      }
      
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
      
      if (materialRef.current && materialRef.current.uniforms.resolution) {
        materialRef.current.uniforms.resolution.value.set(width, height);
      }
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
      renderer.dispose();
    };
  }, []);

  const applyShader = () => {
    if (sceneRef.current) {
      const geometry = new THREE.PlaneGeometry(3, 3, 64, 64);
      try {
        // Remove old mesh
        if (sceneRef.current.children.length > 0) {
          sceneRef.current.remove(sceneRef.current.children[0]);
        }

        const material = new THREE.ShaderMaterial({
          vertexShader: vertexShader,
          fragmentShader: fragmentShader,
          uniforms: {
            time: { value: 0 },
            resolution: { value: new THREE.Vector2(
              containerRef.current?.clientWidth || 800,
              containerRef.current?.clientHeight || 600
            )}
          }
        });

        const mesh = new THREE.Mesh(geometry, material);
        sceneRef.current.add(mesh);
        materialRef.current = material;
        setError('');
        showToast('Shader compiled successfully!');
      } catch (err) {
        setError(err.message);
        showToast('Shader compilation failed', 'error');
      }
    }
  };

  const loadPreset = (presetKey) => {
    if (presetKey && shaderPresets[presetKey]) {
      setFragmentShader(shaderPresets[presetKey].fragment);
      setVertexShader(defaultVertexShader);
      setSelectedPreset(presetKey);
      showToast(`Loaded preset: ${shaderPresets[presetKey].name}`);
      
      // Auto-apply
      setTimeout(() => {
        if (sceneRef.current) {
          const geometry = new THREE.PlaneGeometry(3, 3, 64, 64);
          try {
            if (sceneRef.current.children.length > 0) {
              sceneRef.current.remove(sceneRef.current.children[0]);
            }
            const material = new THREE.ShaderMaterial({
              vertexShader: defaultVertexShader,
              fragmentShader: shaderPresets[presetKey].fragment,
              uniforms: {
                time: { value: 0 },
                resolution: { value: new THREE.Vector2(
                  containerRef.current?.clientWidth || 800,
                  containerRef.current?.clientHeight || 600
                )}
              }
            });
            const mesh = new THREE.Mesh(geometry, material);
            sceneRef.current.add(mesh);
            materialRef.current = material;
            setError('');
          } catch (err) {
            setError(err.message);
          }
        }
      }, 100);
    }
  };

  const resetShaders = () => {
    setVertexShader(defaultVertexShader);
    setFragmentShader(defaultFragmentShader);
    setSelectedPreset('');
    if (sceneRef.current) {
      const geometry = new THREE.PlaneGeometry(3, 3, 64, 64);
      try {
        if (sceneRef.current.children.length > 0) {
          sceneRef.current.remove(sceneRef.current.children[0]);
        }
        const material = new THREE.ShaderMaterial({
          vertexShader: defaultVertexShader,
          fragmentShader: defaultFragmentShader,
          uniforms: {
            time: { value: 0 },
            resolution: { value: new THREE.Vector2(
              containerRef.current?.clientWidth || 800,
              containerRef.current?.clientHeight || 600
            )}
          }
        });
        const mesh = new THREE.Mesh(geometry, material);
        sceneRef.current.add(mesh);
        materialRef.current = material;
        setError('');
      } catch (err) {
        setError(err.message);
      }
    }
    showToast('Shaders reset to default');
  };

  return (
    <section className="section shader-lab-section">
      <div className="section-header">
        <h2 className="section-title">🎨 Shader Lab (GLSL)</h2>
      </div>

      <div className="shader-lab-container">
        <div className="shader-preview-wrapper" ref={containerRef}></div>
        
        <div className="shader-editor-panel">
          <div className="shader-presets">
            <label className="form-label">Load Preset:</label>
            <select 
              className="form-select" 
              value={selectedPreset}
              onChange={(e) => loadPreset(e.target.value)}
            >
              <option value="">Select a preset...</option>
              {Object.entries(shaderPresets).map(([key, preset]) => (
                <option key={key} value={key}>{preset.name}</option>
              ))}
            </select>
          </div>

          <div className="shader-editor">
            <h3 className="editor-title">Vertex Shader</h3>
            <textarea
              className="code-editor"
              value={vertexShader}
              onChange={(e) => setVertexShader(e.target.value)}
              spellCheck="false"
            />
          </div>

          <div className="shader-editor">
            <h3 className="editor-title">Fragment Shader</h3>
            <textarea
              className="code-editor"
              value={fragmentShader}
              onChange={(e) => setFragmentShader(e.target.value)}
              spellCheck="false"
            />
          </div>

          {error && (
            <div className="shader-error">
              <strong>⚠️ Compilation Error:</strong>
              <pre>{error}</pre>
            </div>
          )}

          <div className="shader-actions">
            <button className="btn-primary" onClick={applyShader}>
              ▶️ Compile & Run
            </button>
            <button className="btn-secondary" onClick={resetShaders}>
              🔄 Reset
            </button>
          </div>

          <div className="shader-info">
            <h4>Available Uniforms:</h4>
            <ul>
              <li><code>uniform float time</code> - Time in seconds</li>
              <li><code>uniform vec2 resolution</code> - Canvas resolution</li>
            </ul>
            <h4>Available Varyings:</h4>
            <ul>
              <li><code>varying vec2 vUv</code> - UV coordinates (0-1)</li>
              <li><code>varying vec3 vPosition</code> - Vertex position</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
