import { useState, useCallback, useMemo } from 'react';
import DataService from '../services/DataService';
import Modal from '../components/Modal';
import { useToast } from '../components/Toast';

const engineFilters = ['All', 'Three.js', 'Babylon.js', 'GLSL', 'WebGPU'];

function engineBadgeClass(engine) {
  if (engine === 'Three.js') return 'badge-threejs';
  if (engine === 'Babylon.js') return 'badge-babylonjs';
  return '';
}

export default function Snippets() {
  const [snippets, setSnippets] = useState(() => DataService.getSnippets());
  const [search, setSearch] = useState('');
  const [activeEngine, setActiveEngine] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({});
  const showToast = useToast();

  const refresh = () => setSnippets(DataService.getSnippets());

  const filtered = useMemo(() => {
    return snippets.filter(s => {
      const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase()) ||
        (s.description || '').toLowerCase().includes(search.toLowerCase()) ||
        (s.category || '').toLowerCase().includes(search.toLowerCase());
      const matchesEngine = activeEngine === 'All' || s.engine === activeEngine;
      return matchesSearch && matchesEngine;
    });
  }, [snippets, search, activeEngine]);

  const copySnippet = (snippet) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(snippet.code).then(() => {
        showToast('Code copied to clipboard!');
      }).catch(() => {
        showToast('Failed to copy', 'error');
      });
    } else {
      showToast('Clipboard not available', 'error');
    }
  };

  const openAdd = () => {
    setEditingId(null);
    setForm({ title: '', engine: 'Three.js', category: 'General', description: '', code: '' });
    setModalOpen(true);
  };

  const openEdit = (s) => {
    setEditingId(s.id);
    setForm({ title: s.title, engine: s.engine, category: s.category || 'General', description: s.description || '', code: s.code || '' });
    setModalOpen(true);
  };

  const handleSave = useCallback(() => {
    if (!form.title.trim()) { showToast('Title is required', 'error'); return; }
    const data = {
      title: form.title.trim(),
      engine: form.engine,
      category: form.category,
      description: form.description || '',
      code: form.code || ''
    };
    if (editingId) {
      DataService.updateSnippet(editingId, data);
      showToast('Snippet updated');
    } else {
      DataService.addSnippet(data);
      showToast('Snippet added');
    }
    setModalOpen(false);
    refresh();
  }, [form, editingId, showToast]);

  const handleDelete = (id) => { setDeleteId(id); setConfirmOpen(true); };

  const confirmDelete = useCallback(() => {
    DataService.deleteSnippet(deleteId);
    setConfirmOpen(false);
    refresh();
    showToast('Snippet deleted', 'info');
  }, [deleteId, showToast]);

  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">📝 Code Snippets</h2>
        <button className="add-btn" onClick={openAdd}>+ Add Snippet</button>
      </div>
      <div className="asset-controls">
        <div className="search-wrapper">
          <input type="text" className="search-input" placeholder="Search snippets..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="snippet-filters">
          {engineFilters.map(e => (
            <button key={e} className={`tag-btn${activeEngine === e ? ' active' : ''}`} onClick={() => setActiveEngine(e)}>{e}</button>
          ))}
        </div>
      </div>
      <div className="snippet-grid">
        {filtered.map((s, i) => (
          <div key={s.id} className="card snippet-card reveal-item" style={{ animationDelay: `${i * 0.07}s` }}>
            <div className="snippet-header">
              <div className="snippet-title">{s.title}</div>
              <span className={`badge ${engineBadgeClass(s.engine)}`}>{s.engine}</span>
            </div>
            <div className="snippet-desc">{s.description}</div>
            <pre className="snippet-code">{s.code}</pre>
            <div className="snippet-meta">
              <span>{s.category || 'General'}</span>
              <button className="snippet-copy-btn" onClick={() => copySnippet(s)}>📋 Copy</button>
            </div>
            <div className="card-actions">
              <button className="btn-icon" onClick={() => openEdit(s)} title="Edit Snippet">✏️</button>
              <button className="btn-icon" onClick={() => handleDelete(s.id)} title="Delete Snippet">🗑️</button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} title={editingId ? 'Edit Snippet' : 'Add Snippet'} onClose={() => setModalOpen(false)} onConfirm={handleSave}>
        <div className="form-group">
          <label className="form-label">Title</label>
          <input className="form-input" type="text" value={form.title || ''} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g., Three.js Scene Setup" />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Engine</label>
            <select className="form-select" value={form.engine || 'Three.js'} onChange={e => setForm(f => ({ ...f, engine: e.target.value }))}>
              {['Three.js', 'Babylon.js', 'GLSL', 'WebGPU'].map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select className="form-select" value={form.category || 'General'} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
              {['Setup', 'Shaders', 'Physics', 'Assets', 'Interaction', 'Audio', 'Animation', 'Compute', 'Networking', 'General'].map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <input className="form-input" type="text" value={form.description || ''} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Brief description" />
        </div>
        <div className="form-group">
          <label className="form-label">Code</label>
          <textarea className="form-input" rows="8" style={{ fontFamily: 'monospace', resize: 'vertical' }} value={form.code || ''} onChange={e => setForm(f => ({ ...f, code: e.target.value }))} placeholder="Paste code here..." />
        </div>
      </Modal>

      <Modal open={confirmOpen} title="Confirm Action" onClose={() => setConfirmOpen(false)} onConfirm={confirmDelete} confirmLabel="Delete" confirmClass="modal-btn-danger">
        <p className="confirm-message">Are you sure you want to delete this snippet?</p>
      </Modal>
    </section>
  );
}
