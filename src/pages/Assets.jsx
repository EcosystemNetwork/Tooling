import { useState, useCallback, useMemo } from 'react';
import DataService from '../services/DataService';
import Modal from '../components/Modal';
import { useToast } from '../components/Toast';

const assetTypes = ['All', '3D Models', 'Textures', 'Audio', 'Animations', 'UI Elements', 'Materials', 'Shaders', 'Prefabs', 'Skyboxes'];

export default function Assets() {
  const [assets, setAssets] = useState(() => DataService.getAssets());
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({});
  const showToast = useToast();

  const refresh = () => setAssets(DataService.getAssets());

  const filtered = useMemo(() => {
    return assets.filter(a => {
      const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.author.toLowerCase().includes(search.toLowerCase());
      const matchesType = activeType === 'All' || a.type === activeType;
      return matchesSearch && matchesType;
    });
  }, [assets, search, activeType]);

  const openAdd = () => {
    setEditingId(null);
    setForm({ name: '', type: '3D Models', size: '1.0 MB', author: '', color: '#1e88e5' });
    setModalOpen(true);
  };

  const openEdit = (a) => {
    setEditingId(a.id);
    setForm({ name: a.name, type: a.type, size: a.size, author: a.author, color: a.color });
    setModalOpen(true);
  };

  const handleSave = useCallback(() => {
    if (!form.name.trim()) { showToast('Name is required', 'error'); return; }
    const data = {
      name: form.name.trim(),
      type: form.type,
      size: form.size || '1.0 MB',
      author: form.author || 'Unknown',
      color: form.color || '#1e88e5'
    };
    if (editingId) {
      DataService.updateAsset(editingId, data);
      showToast('Asset updated');
    } else {
      DataService.addAsset(data);
      showToast('Asset added');
    }
    setModalOpen(false);
    refresh();
  }, [form, editingId, showToast]);

  const handleDelete = (id) => { setDeleteId(id); setConfirmOpen(true); };

  const confirmDelete = useCallback(() => {
    DataService.deleteAsset(deleteId);
    setConfirmOpen(false);
    refresh();
    showToast('Asset deleted', 'info');
  }, [deleteId, showToast]);

  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">Asset Manager Library</h2>
        <button className="add-btn" onClick={openAdd}>+ Add Asset</button>
      </div>
      <div className="asset-controls">
        <div className="search-wrapper">
          <input type="text" className="search-input" placeholder="Search assets..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="tag-filters">
          {assetTypes.map(t => (
            <button key={t} className={`tag-btn${activeType === t ? ' active' : ''}`} onClick={() => setActiveType(t)}>{t}</button>
          ))}
        </div>
      </div>
      <div className="asset-grid">
        {filtered.map((a, i) => (
          <div key={a.id} className="card asset-card reveal-item" style={{ animationDelay: `${i * 0.07}s` }}>
            <div className="asset-thumb" style={{ background: `linear-gradient(135deg, ${a.color}, ${a.color}88)` }}></div>
            <div className="asset-name">{a.name}</div>
            <div className="asset-info">
              <span className="asset-type-tag">{a.type}</span>
              <span>{a.size}</span>
            </div>
            <div className="asset-info" style={{ marginTop: '6px' }}>
              <span>by {a.author}</span>
            </div>
            <div className="card-actions">
              <button className="btn-icon" onClick={() => openEdit(a)} title="Edit Asset">✏️</button>
              <button className="btn-icon" onClick={() => handleDelete(a.id)} title="Delete Asset">🗑️</button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} title={editingId ? 'Edit Asset' : 'Add Asset'} onClose={() => setModalOpen(false)} onConfirm={handleSave}>
        <div className="form-group">
          <label className="form-label">Asset Name</label>
          <input className="form-input" type="text" value={form.name || ''} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Enter asset name" />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Type</label>
            <select className="form-select" value={form.type || '3D Models'} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
              {['3D Models', 'Textures', 'Audio', 'Animations', 'UI Elements', 'Materials', 'Shaders', 'Prefabs', 'Skyboxes'].map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Size</label>
            <input className="form-input" type="text" value={form.size || ''} onChange={e => setForm(f => ({ ...f, size: e.target.value }))} placeholder="e.g., 10.5 MB" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Author</label>
            <input className="form-input" type="text" value={form.author || ''} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} placeholder="Author name" />
          </div>
          <div className="form-group">
            <label className="form-label">Color</label>
            <input className="form-input" type="color" value={form.color || '#1e88e5'} onChange={e => setForm(f => ({ ...f, color: e.target.value }))} />
          </div>
        </div>
      </Modal>

      <Modal open={confirmOpen} title="Confirm Action" onClose={() => setConfirmOpen(false)} onConfirm={confirmDelete} confirmLabel="Delete" confirmClass="modal-btn-danger">
        <p className="confirm-message">Are you sure you want to delete this asset?</p>
      </Modal>
    </section>
  );
}
