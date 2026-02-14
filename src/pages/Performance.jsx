import { useState, useEffect, useRef } from 'react';

export default function Performance() {
  const [webglInfo, setWebglInfo] = useState(null);
  const [memoryUsage, setMemoryUsage] = useState(null);
  const [fps, setFps] = useState(0);
  const [fpsHistory, setFpsHistory] = useState([]);
  const animationRef = useRef(null);
  const lastTimeRef = useRef(0);
  const framesRef = useRef([]);

  useEffect(() => {
    // Get WebGL info
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    
    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      const info = {
        version: gl.getParameter(gl.VERSION),
        vendor: gl.getParameter(gl.VENDOR),
        renderer: gl.getParameter(gl.RENDERER),
        shadingLanguageVersion: gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
        maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
        maxVertexAttribs: gl.getParameter(gl.MAX_VERTEX_ATTRIBS),
        maxVertexUniformVectors: gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS),
        maxVaryingVectors: gl.getParameter(gl.MAX_VARYING_VECTORS),
        maxFragmentUniformVectors: gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS),
        maxTextureImageUnits: gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS),
        maxRenderbufferSize: gl.getParameter(gl.MAX_RENDERBUFFER_SIZE),
        maxViewportDims: gl.getParameter(gl.MAX_VIEWPORT_DIMS),
        unmaskedVendor: debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : 'N/A',
        unmaskedRenderer: debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'N/A',
      };
      
      // Check for WebGL extensions
      const extensions = gl.getSupportedExtensions() || [];
      info.extensions = extensions;
      info.extensionsCount = extensions.length;
      
      setWebglInfo(info);
    }

    // FPS counter
    const measureFPS = () => {
      const now = performance.now();
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = now;
      }
      const delta = now - lastTimeRef.current;
      
      framesRef.current.push(1000 / delta);
      if (framesRef.current.length > 60) {
        framesRef.current.shift();
      }
      
      const avgFps = framesRef.current.reduce((a, b) => a + b, 0) / framesRef.current.length;
      setFps(Math.round(avgFps));
      
      // Update history every second
      if (framesRef.current.length === 60) {
        setFpsHistory(prev => {
          const newHistory = [...prev, Math.round(avgFps)];
          return newHistory.slice(-30); // Keep last 30 seconds
        });
      }
      
      lastTimeRef.current = now;
      animationRef.current = requestAnimationFrame(measureFPS);
    };
    
    animationRef.current = requestAnimationFrame(measureFPS);

    // Memory monitoring
    const updateMemory = () => {
      if (performance.memory) {
        setMemoryUsage({
          usedJSHeapSize: (performance.memory.usedJSHeapSize / 1048576).toFixed(2),
          totalJSHeapSize: (performance.memory.totalJSHeapSize / 1048576).toFixed(2),
          jsHeapSizeLimit: (performance.memory.jsHeapSizeLimit / 1048576).toFixed(2),
        });
      }
    };
    
    updateMemory();
    const memoryInterval = setInterval(updateMemory, 1000);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearInterval(memoryInterval);
    };
  }, []);

  const getWebGPUInfo = async () => {
    if ('gpu' in navigator) {
      try {
        const adapter = await navigator.gpu.requestAdapter();
        if (adapter) {
          return {
            available: true,
            features: Array.from(adapter.features),
            limits: adapter.limits,
          };
        }
      } catch (err) {
        return { available: false, error: err.message };
      }
    }
    return { available: false };
  };

  const [webgpuInfo, setWebgpuInfo] = useState(null);
  useEffect(() => {
    getWebGPUInfo().then(setWebgpuInfo);
  }, []);

  return (
    <section className="section performance-section">
      <div className="section-header">
        <h2 className="section-title">⚡ Performance Monitor</h2>
      </div>

      <div className="performance-grid">
        {/* FPS Monitor */}
        <div className="card perf-card">
          <h3 className="card-title">FPS Monitor</h3>
          <div className="fps-display">
            <div className="fps-value">{fps}</div>
            <div className="fps-label">Frames Per Second</div>
          </div>
          <div className="fps-chart">
            {fpsHistory.map((f, i) => (
              <div
                key={i}
                className="fps-bar"
                style={{
                  height: `${(f / 60) * 100}%`,
                  backgroundColor: f >= 50 ? '#00c9a7' : f >= 30 ? '#ffab40' : '#ff5252'
                }}
              />
            ))}
          </div>
        </div>

        {/* Memory Usage */}
        {memoryUsage && (
          <div className="card perf-card">
            <h3 className="card-title">Memory Usage (JavaScript Heap)</h3>
            <div className="memory-stats">
              <div className="stat-item">
                <div className="stat-label">Used</div>
                <div className="stat-value">{memoryUsage.usedJSHeapSize} MB</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Total</div>
                <div className="stat-value">{memoryUsage.totalJSHeapSize} MB</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Limit</div>
                <div className="stat-value">{memoryUsage.jsHeapSizeLimit} MB</div>
              </div>
            </div>
            <div className="memory-bar">
              <div
                className="memory-fill"
                style={{
                  width: `${(parseFloat(memoryUsage.usedJSHeapSize) / parseFloat(memoryUsage.jsHeapSizeLimit)) * 100}%`
                }}
              />
            </div>
          </div>
        )}

        {/* WebGL Info */}
        {webglInfo && (
          <>
            <div className="card perf-card wide">
              <h3 className="card-title">WebGL Capabilities</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Version:</span>
                  <span className="info-value">{webglInfo.version}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Vendor:</span>
                  <span className="info-value">{webglInfo.vendor}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Renderer:</span>
                  <span className="info-value">{webglInfo.renderer}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">GLSL Version:</span>
                  <span className="info-value">{webglInfo.shadingLanguageVersion}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Unmasked Vendor:</span>
                  <span className="info-value">{webglInfo.unmaskedVendor}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Unmasked Renderer:</span>
                  <span className="info-value">{webglInfo.unmaskedRenderer}</span>
                </div>
              </div>
            </div>

            <div className="card perf-card">
              <h3 className="card-title">WebGL Limits</h3>
              <div className="limits-list">
                <div className="limit-item">
                  <span>Max Texture Size:</span>
                  <strong>{webglInfo.maxTextureSize}</strong>
                </div>
                <div className="limit-item">
                  <span>Max Vertex Attributes:</span>
                  <strong>{webglInfo.maxVertexAttribs}</strong>
                </div>
                <div className="limit-item">
                  <span>Max Texture Units:</span>
                  <strong>{webglInfo.maxTextureImageUnits}</strong>
                </div>
                <div className="limit-item">
                  <span>Max Renderbuffer Size:</span>
                  <strong>{webglInfo.maxRenderbufferSize}</strong>
                </div>
                <div className="limit-item">
                  <span>Max Viewport:</span>
                  <strong>{webglInfo.maxViewportDims[0]} x {webglInfo.maxViewportDims[1]}</strong>
                </div>
                <div className="limit-item">
                  <span>Extensions Supported:</span>
                  <strong>{webglInfo.extensionsCount}</strong>
                </div>
              </div>
            </div>
          </>
        )}

        {/* WebGPU Info */}
        <div className="card perf-card">
          <h3 className="card-title">WebGPU Support</h3>
          {webgpuInfo ? (
            webgpuInfo.available ? (
              <div className="webgpu-available">
                <div className="status-badge success">✅ Available</div>
                <div className="info-item">
                  <span className="info-label">Features:</span>
                  <span className="info-value">{webgpuInfo.features?.length || 0}</span>
                </div>
              </div>
            ) : (
              <div className="status-badge error">❌ Not Available</div>
            )
          ) : (
            <div className="status-badge">⏳ Checking...</div>
          )}
        </div>

        {/* Browser Info */}
        <div className="card perf-card">
          <h3 className="card-title">Browser Information</h3>
          <div className="browser-info">
            <div className="info-item">
              <span className="info-label">User Agent:</span>
              <span className="info-value small">{navigator.userAgent}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Platform:</span>
              <span className="info-value">{navigator.platform}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Hardware Concurrency:</span>
              <span className="info-value">{navigator.hardwareConcurrency} cores</span>
            </div>
            <div className="info-item">
              <span className="info-label">Device Memory:</span>
              <span className="info-value">{navigator.deviceMemory ? `${navigator.deviceMemory} GB` : 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
