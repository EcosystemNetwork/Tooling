import { useState, useCallback, useMemo } from 'react';
import DataService from '../services/DataService';
import Modal from '../components/Modal';
import { useToast } from '../components/Toast';

const shaderTypes = ['All', 'Vertex', 'Fragment', 'Post-Process', 'Compute'];

function engineBadgeClass(engine) {
  if (engine === 'Three.js') return 'badge-threejs';
  if (engine === 'Babylon.js') return 'badge-babylonjs';
  return '';
}

export default function Shaders() {
  const [shaders, setShaders] = useState(() => DataService.getShaders());
  const [activeType, setActiveType] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({});
  const showToast = useToast();

  const refresh = () => setShaders(DataService.getShaders());

  const filtered = useMemo(() => {
    if (activeType === 'All') return shaders;
    return shaders.filter(s => s.type === activeType);
  }, [shaders, activeType]);

  const openAdd = () => {
    setEditingId(null);
    setForm({ name: '', type: 'Fragment', engine: 'Three.js', description: '', color1: '#1e88e5', color2: '#00c9a7', tags: '' });
    setModalOpen(true);
  };

  const openEdit = (s) => {
    setEditingId(s.id);
    setForm({ name: s.name, type: s.type, engine: s.engine, description: s.description || '', color1: s.color1, color2: s.color2, tags: (s.tags || []).join(', ') });
    setModalOpen(true);
  };

  const handleSave = useCallback(() => {
    if (!form.name.trim()) { showToast('Name is required', 'error'); return; }
    const data = {
      name: form.name.trim(),
      type: form.type,
      engine: form.engine,
      description: form.description || '',
      color1: form.color1 || '#1e88e5',
      color2: form.color2 || '#00c9a7',
      tags: form.tags.split(',').map(s => s.trim()).filter(Boolean)
    };
    if (editingId) {
      DataService.updateShader(editingId, data);
      showToast('Shader updated');
    } else {
      DataService.addShader(data);
      showToast('Shader added');
    }
    setModalOpen(false);
    refresh();
  }, [form, editingId, showToast]);

  const handleDelete = (id) => { setDeleteId(id); setConfirmOpen(true); };

  const confirmDelete = useCallback(() => {
    DataService.deleteShader(deleteId);
    setConfirmOpen(false);
    refresh();
    showToast('Shader deleted', 'info');
  }, [deleteId, showToast]);

  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">🎨 Shader Library</h2>
        <button className="add-btn" onClick={openAdd}>+ Add Shader</button>
      </div>
      <div className="shader-filters">
        {shaderTypes.map(t => (
          <button key={t} className={`tag-btn${activeType === t ? ' active' : ''}`} onClick={() => setActiveType(t)}>{t}</button>
        ))}
      </div>
      <div className="shader-grid">
        {filtered.map((s, i) => (
          <div key={s.id} className="card shader-card reveal-item" style={{ animationDelay: `${i * 0.07}s` }}>
            <div className="shader-preview" style={{ background: `linear-gradient(135deg, ${s.color1 || '#1e88e5'}, ${s.color2 || '#00c9a7'})` }}></div>
            <div className="shader-header">
              <div className="shader-name">{s.name}</div>
              <span className={`badge ${engineBadgeClass(s.engine)}`}>{s.engine}</span>
            </div>
            <div className="shader-desc">{s.description}</div>
            <div style={{ marginBottom: '6px' }}><span className="badge badge-beta">{s.type}</span></div>
            <div className="shader-tags">
              {(s.tags || []).map((t, j) => (
                <span key={j} className="shader-tag">{t}</span>
              ))}
            </div>
            <div className="card-actions">
              <button className="btn-icon" onClick={() => openEdit(s)} title="Edit Shader">✏️</button>
              <button className="btn-icon" onClick={() => handleDelete(s.id)} title="Delete Shader">🗑️</button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} title={editingId ? 'Edit Shader' : 'Add Shader'} onClose={() => setModalOpen(false)} onConfirm={handleSave}>
        <div className="form-group">
          <label className="form-label">Shader Name</label>
          <input className="form-input" type="text" value={form.name || ''} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g., Toon Cel Shader" />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Type</label>
            <select className="form-select" value={form.type || 'Fragment'} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
              {['Vertex', 'Fragment', 'Post-Process', 'Compute'].map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Engine</label>
            <select className="form-select" value={form.engine || 'Three.js'} onChange={e => setForm(f => ({ ...f, engine: e.target.value }))}>
              {['Three.js', 'Babylon.js'].map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <input className="form-input" type="text" value={form.description || ''} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Brief description" />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Color 1</label>
            <input className="form-input" type="color" value={form.color1 || '#1e88e5'} onChange={e => setForm(f => ({ ...f, color1: e.target.value }))} />
          </div>
          <div className="form-group">
            <label className="form-label">Color 2</label>
            <input className="form-input" type="color" value={form.color2 || '#00c9a7'} onChange={e => setForm(f => ({ ...f, color2: e.target.value }))} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Tags (comma-separated)</label>
          <input className="form-input" type="text" value={form.tags || ''} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="e.g., Lighting, PBR, VFX" />
        </div>
      </Modal>

      <Modal open={confirmOpen} title="Confirm Action" onClose={() => setConfirmOpen(false)} onConfirm={confirmDelete} confirmLabel="Delete" confirmClass="modal-btn-danger">
        <p className="confirm-message">Are you sure you want to delete this shader?</p>
      </Modal>
    </section>
  );
}
