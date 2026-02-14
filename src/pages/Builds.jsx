import { useState, useCallback } from 'react';
import DataService from '../services/DataService';
import Modal from '../components/Modal';
import { useToast } from '../components/Toast';

function buildStatusClass(status) {
  if (status === 'Success') return 'badge-success';
  if (status === 'Failed') return 'badge-failed';
  return 'badge-inprogress';
}

export default function Builds() {
  const [builds, setBuilds] = useState(() => DataService.getBuilds());
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({});
  const showToast = useToast();

  const refresh = () => setBuilds(DataService.getBuilds());

  const openAdd = () => {
    setEditingId(null);
    setForm({ project: '', branch: 'main', status: 'In Progress', duration: '0m 00s', triggeredBy: '' });
    setModalOpen(true);
  };

  const openEdit = (b) => {
    setEditingId(b.id);
    setForm({ project: b.project, branch: b.branch, status: b.status, duration: b.duration, triggeredBy: b.triggeredBy, timestamp: b.timestamp });
    setModalOpen(true);
  };

  const handleSave = useCallback(() => {
    if (!form.project.trim()) { showToast('Project name is required', 'error'); return; }
    const now = new Date();
    const timestamp = form.timestamp || (now.toISOString().split('T')[0] + ' ' + now.toTimeString().split(' ')[0].slice(0, 5));
    const data = {
      project: form.project.trim(),
      branch: form.branch || 'main',
      status: form.status,
      duration: form.duration || '0m 00s',
      triggeredBy: form.triggeredBy || 'Manual',
      timestamp
    };
    if (editingId) {
      DataService.updateBuild(editingId, data);
      showToast('Build updated');
    } else {
      DataService.addBuild(data);
      showToast('Build added');
    }
    setModalOpen(false);
    refresh();
  }, [form, editingId, showToast]);

  const handleDelete = (id) => { setDeleteId(id); setConfirmOpen(true); };

  const confirmDelete = useCallback(() => {
    DataService.deleteBuild(deleteId);
    setConfirmOpen(false);
    refresh();
    showToast('Build deleted', 'info');
  }, [deleteId, showToast]);

  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">Build &amp; Deploy Pipeline Monitor</h2>
        <button className="add-btn" onClick={openAdd}>+ Add Build</button>
      </div>
      <div className="builds-table-wrapper">
        <table className="builds-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Branch</th>
              <th>Status</th>
              <th>Duration</th>
              <th>Triggered By</th>
              <th>Timestamp</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {builds.map((b, i) => (
              <tr key={b.id} className="reveal-item" style={{ animationDelay: `${i * 0.07}s` }}>
                <td style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{b.project}</td>
                <td><code style={{ background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.82rem' }}>{b.branch}</code></td>
                <td><span className={`badge ${buildStatusClass(b.status)}`}>{b.status}</span></td>
                <td>{b.duration}</td>
                <td>{b.triggeredBy}</td>
                <td>{b.timestamp}</td>
                <td>
                  <button className="btn-icon" onClick={() => openEdit(b)} title="Edit Build">✏️</button>
                  <button className="btn-icon" onClick={() => handleDelete(b.id)} title="Delete Build">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={modalOpen} title={editingId ? 'Edit Build' : 'Add Build'} onClose={() => setModalOpen(false)} onConfirm={handleSave}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Project</label>
            <input className="form-input" type="text" value={form.project || ''} onChange={e => setForm(f => ({ ...f, project: e.target.value }))} placeholder="Project name" />
          </div>
          <div className="form-group">
            <label className="form-label">Branch</label>
            <input className="form-input" type="text" value={form.branch || ''} onChange={e => setForm(f => ({ ...f, branch: e.target.value }))} placeholder="e.g., main" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Status</label>
            <select className="form-select" value={form.status || 'In Progress'} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
              {['Success', 'Failed', 'In Progress'].map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Duration</label>
            <input className="form-input" type="text" value={form.duration || ''} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} placeholder="e.g., 4m 32s" />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Triggered By</label>
          <input className="form-input" type="text" value={form.triggeredBy || ''} onChange={e => setForm(f => ({ ...f, triggeredBy: e.target.value }))} placeholder="Who triggered this build" />
        </div>
      </Modal>

      <Modal open={confirmOpen} title="Confirm Action" onClose={() => setConfirmOpen(false)} onConfirm={confirmDelete} confirmLabel="Delete" confirmClass="modal-btn-danger">
        <p className="confirm-message">Are you sure you want to delete this build?</p>
      </Modal>
    </section>
  );
}
