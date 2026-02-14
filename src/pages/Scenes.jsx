import { useState, useCallback, useMemo } from 'react';
import DataService from '../services/DataService';
import Modal from '../components/Modal';
import { useToast } from '../components/Toast';

function engineBadgeClass(engine) {
  if (engine === 'Three.js') return 'badge-threejs';
  if (engine === 'Babylon.js') return 'badge-babylonjs';
  return '';
}

function statusBadgeClass(status) {
  if (status === 'Active') return 'badge-active';
  if (status === 'WIP') return 'badge-alpha';
  return 'badge-maintenance';
}

export default function Scenes() {
  const [scenes, setScenes] = useState(() => DataService.getScenes());
  const [engineFilter, setEngineFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({});
  const showToast = useToast();

  const refresh = () => setScenes(DataService.getScenes());

  const filtered = useMemo(() => {
    if (engineFilter === 'all') return scenes;
    const engineMap = { threejs: 'Three.js', babylonjs: 'Babylon.js' };
    return scenes.filter(s => s.engine === engineMap[engineFilter]);
  }, [scenes, engineFilter]);

  const openAdd = () => {
    setEditingId(null);
    setForm({ name: '', engine: 'Three.js', camera: 'PerspectiveCamera', lights: 1, meshes: 0, textures: 0, status: 'WIP', objects: '' });
    setModalOpen(true);
  };

  const openEdit = (s) => {
    setEditingId(s.id);
    setForm({ name: s.name, engine: s.engine, camera: s.camera, lights: s.lights, meshes: s.meshes, textures: s.textures, status: s.status, objects: (s.objects || []).join(', ') });
    setModalOpen(true);
  };

  const handleSave = useCallback(() => {
    if (!form.name.trim()) { showToast('Name is required', 'error'); return; }
    const data = {
      name: form.name.trim(),
      engine: form.engine,
      camera: form.camera || 'PerspectiveCamera',
      lights: parseInt(form.lights) || 1,
      meshes: parseInt(form.meshes) || 0,
      textures: parseInt(form.textures) || 0,
      status: form.status,
      objects: form.objects.split(',').map(s => s.trim()).filter(Boolean)
    };
    if (editingId) {
      DataService.updateScene(editingId, data);
      showToast('Scene updated');
    } else {
      DataService.addScene(data);
      showToast('Scene added');
    }
    setModalOpen(false);
    refresh();
  }, [form, editingId, showToast]);

  const handleDelete = (id) => { setDeleteId(id); setConfirmOpen(true); };

  const confirmDelete = useCallback(() => {
    DataService.deleteScene(deleteId);
    setConfirmOpen(false);
    refresh();
    showToast('Scene deleted', 'info');
  }, [deleteId, showToast]);

  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">🎬 Scene Manager</h2>
        <button className="add-btn" onClick={openAdd}>+ Add Scene</button>
      </div>
      <div className="engine-toggle">
        {[['all', 'All Engines'], ['threejs', 'Three.js'], ['babylonjs', 'Babylon.js']].map(([key, label]) => (
          <button key={key} className={`engine-btn${engineFilter === key ? ' active' : ''}`} onClick={() => setEngineFilter(key)}>{label}</button>
        ))}
      </div>
      <div className="scene-grid">
        {filtered.map((s, i) => (
          <div key={s.id} className="card scene-card reveal-item" style={{ animationDelay: `${i * 0.07}s` }}>
            <div className="scene-header">
              <div className="scene-name">{s.name}</div>
              <span className={`badge ${engineBadgeClass(s.engine)}`}>{s.engine}</span>
            </div>
            <div className="scene-engine">Status: <span className={`badge ${statusBadgeClass(s.status)}`}>{s.status}</span></div>
            <div className="scene-stats">
              <span>📷 {s.camera}</span>
              <span>💡 {s.lights} lights</span>
              <span>🔷 {s.meshes} meshes</span>
              <span>🖼️ {s.textures} textures</span>
            </div>
            <div className="scene-objects">
              {(s.objects || []).map((o, j) => (
                <span key={j} className="scene-obj-tag">{o}</span>
              ))}
            </div>
            <div className="card-actions">
              <button className="btn-icon" onClick={() => openEdit(s)} title="Edit Scene">✏️</button>
              <button className="btn-icon" onClick={() => handleDelete(s.id)} title="Delete Scene">🗑️</button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} title={editingId ? 'Edit Scene' : 'Add Scene'} onClose={() => setModalOpen(false)} onConfirm={handleSave}>
        <div className="form-group">
          <label className="form-label">Scene Name</label>
          <input className="form-input" type="text" value={form.name || ''} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g., Main Menu" />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Engine</label>
            <select className="form-select" value={form.engine || 'Three.js'} onChange={e => setForm(f => ({ ...f, engine: e.target.value }))}>
              {['Three.js', 'Babylon.js'].map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Camera Type</label>
            <input className="form-input" type="text" value={form.camera || ''} onChange={e => setForm(f => ({ ...f, camera: e.target.value }))} placeholder="e.g., PerspectiveCamera" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Lights</label>
            <input className="form-input" type="number" min="0" value={form.lights || 0} onChange={e => setForm(f => ({ ...f, lights: e.target.value }))} />
          </div>
          <div className="form-group">
            <label className="form-label">Meshes</label>
            <input className="form-input" type="number" min="0" value={form.meshes || 0} onChange={e => setForm(f => ({ ...f, meshes: e.target.value }))} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Textures</label>
            <input className="form-input" type="number" min="0" value={form.textures || 0} onChange={e => setForm(f => ({ ...f, textures: e.target.value }))} />
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select className="form-select" value={form.status || 'WIP'} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
              {['Active', 'WIP', 'Archived'].map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Objects (comma-separated)</label>
          <input className="form-input" type="text" value={form.objects || ''} onChange={e => setForm(f => ({ ...f, objects: e.target.value }))} placeholder="e.g., Skybox, Terrain, Physics" />
        </div>
      </Modal>

      <Modal open={confirmOpen} title="Confirm Action" onClose={() => setConfirmOpen(false)} onConfirm={confirmDelete} confirmLabel="Delete" confirmClass="modal-btn-danger">
        <p className="confirm-message">Are you sure you want to delete this scene?</p>
      </Modal>
    </section>
  );
}
