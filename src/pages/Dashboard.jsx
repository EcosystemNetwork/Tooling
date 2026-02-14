import { useState, useCallback, useRef } from 'react';
import DataService from '../services/DataService';
import Modal from '../components/Modal';
import { useToast } from '../components/Toast';

function statusBadgeClass(status) {
  const map = { Active: 'badge-active', Beta: 'badge-beta', Alpha: 'badge-alpha', Maintenance: 'badge-maintenance' };
  return map[status] || '';
}

function isValidURL(str) {
  try { new URL(str); return true; } catch { return false; }
}

export default function Dashboard() {
  const [projects, setProjects] = useState(() => DataService.getProjects());
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [dragOverId, setDragOverId] = useState(null);
  const dragItem = useRef(null);
  const showToast = useToast();

  const refresh = () => setProjects(DataService.getProjects());

  const openAdd = () => {
    setEditingId(null);
    setForm({ name: '', description: '', repoUrl: '', status: 'Active', teamSize: 10, completion: 0 });
    setErrors({});
    setModalOpen(true);
  };

  const openEdit = (p) => {
    setEditingId(p.id);
    setForm({ name: p.name, description: p.description || '', repoUrl: p.repoUrl || '', status: p.status, teamSize: p.teamSize, completion: p.completion });
    setErrors({});
    setModalOpen(true);
  };

  const handleSave = useCallback(() => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Project name is required';
    if (form.repoUrl && !isValidURL(form.repoUrl)) errs.repoUrl = 'Please enter a valid URL';
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      if (errs.name) showToast('Project name is required', 'error');
      if (errs.repoUrl) showToast('Please enter a valid URL', 'error');
      return;
    }
    const data = {
      name: form.name.trim(),
      description: form.description.trim(),
      repoUrl: form.repoUrl.trim(),
      status: form.status,
      teamSize: parseInt(form.teamSize) || 10,
      completion: parseInt(form.completion) || 0,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    if (editingId) {
      DataService.updateProject(editingId, data);
      showToast('Project updated');
    } else {
      DataService.addProject(data);
      showToast('Project added');
    }
    setModalOpen(false);
    refresh();
  }, [form, editingId, showToast]);

  const handleDelete = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = useCallback(() => {
    DataService.deleteProject(deleteId);
    setConfirmOpen(false);
    refresh();
    showToast('Project deleted', 'info');
  }, [deleteId, showToast]);

  // Drag-and-drop handlers
  const handleDragStart = (e, index) => {
    dragItem.current = index;
    e.dataTransfer.effectAllowed = 'move';
    e.currentTarget.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1';
    dragItem.current = null;
    setDragOverId(null);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverId(index);
  };

  const handleDragLeave = () => {
    setDragOverId(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = dragItem.current;
    if (dragIndex === null || dragIndex === dropIndex) {
      setDragOverId(null);
      return;
    }
    const reordered = [...projects];
    const [moved] = reordered.splice(dragIndex, 1);
    reordered.splice(dropIndex, 0, moved);
    setProjects(reordered);
    DataService.saveProjects(reordered);
    setDragOverId(null);
    dragItem.current = null;
    showToast('Projects reordered');
  };

  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">Project Dashboard Overview</h2>
        <button className="add-btn" onClick={openAdd}>+ Add Project</button>
      </div>
      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>💡 Drag and drop cards to rearrange</p>
      <div className="project-grid">
        {projects.map((p, i) => (
          <div
            key={p.id}
            className="card project-card reveal-item"
            style={{
              animationDelay: `${i * 0.07}s`,
              cursor: 'grab',
              outline: dragOverId === i ? '2px solid var(--green-primary)' : 'none',
              outlineOffset: '2px',
            }}
            draggable
            onDragStart={ev => handleDragStart(ev, i)}
            onDragEnd={handleDragEnd}
            onDragOver={ev => handleDragOver(ev, i)}
            onDragLeave={handleDragLeave}
            onDrop={ev => handleDrop(ev, i)}
          >
            <div className="project-header">
              <div className="project-name">{p.name}</div>
              <span className={`badge ${statusBadgeClass(p.status)}`}>{p.status}</span>
            </div>
            {p.description && <div className="project-description">{p.description}</div>}
            <div className="project-meta">
              <span>👥 {p.teamSize} members</span>
              <span>🕐 {p.lastUpdated}</span>
            </div>
            {p.repoUrl && (
              <div className="project-repo">
                <a href={p.repoUrl} target="_blank" rel="noopener noreferrer">🔗 Repository</a>
              </div>
            )}
            <div className="progress-bar-wrapper">
              <div className="progress-bar-fill" style={{ width: `${p.completion}%` }}></div>
            </div>
            <div className="progress-label">
              <span>Completion</span>
              <span>{p.completion}%</span>
            </div>
            <div className="card-actions">
              <button className="btn-icon" onClick={() => openEdit(p)} title="Edit Project">✏️</button>
              <button className="btn-icon" onClick={() => handleDelete(p.id)} title="Delete Project">🗑️</button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} title={editingId ? 'Edit Project' : 'Add Project'} onClose={() => setModalOpen(false)} onConfirm={handleSave}>
        <div className="form-group">
          <label className="form-label">Project Name <span className="form-required">*</span></label>
          <input className={`form-input${errors.name ? ' form-input-error' : ''}`} type="text" value={form.name || ''} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Enter project name" />
          {errors.name && <span className="form-error visible">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea className="form-input form-textarea" rows="3" value={form.description || ''} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Describe the project goals, tech stack, or key details..." />
        </div>
        <div className="form-group">
          <label className="form-label">Repository URL</label>
          <input className={`form-input${errors.repoUrl ? ' form-input-error' : ''}`} type="url" value={form.repoUrl || ''} onChange={e => setForm(f => ({ ...f, repoUrl: e.target.value }))} placeholder="https://github.com/org/repo" />
          {errors.repoUrl && <span className="form-error visible">{errors.repoUrl}</span>}
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Status</label>
            <select className="form-select" value={form.status || 'Active'} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
              {['Active', 'Beta', 'Alpha', 'Maintenance'].map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Team Size</label>
            <input className="form-input" type="number" min="1" value={form.teamSize || 10} onChange={e => setForm(f => ({ ...f, teamSize: e.target.value }))} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Completion: <span>{form.completion || 0}%</span></label>
          <input className="form-range" type="range" min="0" max="100" value={form.completion || 0} onChange={e => setForm(f => ({ ...f, completion: e.target.value }))} />
        </div>
      </Modal>

      <Modal open={confirmOpen} title="Confirm Action" onClose={() => setConfirmOpen(false)} onConfirm={confirmDelete} confirmLabel="Delete" confirmClass="modal-btn-danger">
        <p className="confirm-message">Are you sure you want to delete this project?</p>
      </Modal>
    </section>
  );
}
