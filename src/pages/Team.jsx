import { useState, useCallback } from 'react';
import DataService from '../services/DataService';
import Modal from '../components/Modal';
import { useToast } from '../components/Toast';

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase();
}

function roleClass(role) {
  return 'role-' + role.toLowerCase();
}

export default function Team() {
  const [members, setMembers] = useState(() => DataService.getTeamMembers());
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({});
  const showToast = useToast();

  const refresh = () => setMembers(DataService.getTeamMembers());

  const openAdd = () => {
    setEditingId(null);
    setForm({ name: '', email: '', role: 'Developer', status: 'Active', color: '#1e88e5' });
    setModalOpen(true);
  };

  const openEdit = (m) => {
    setEditingId(m.id);
    setForm({ name: m.name, email: m.email, role: m.role, status: m.status, color: m.color });
    setModalOpen(true);
  };

  const handleSave = useCallback(() => {
    if (!form.name.trim()) { showToast('Name is required', 'error'); return; }
    const now = new Date();
    const lastLogin = now.toISOString().split('T')[0] + ' ' + now.toTimeString().split(' ')[0].slice(0, 5);
    const data = {
      name: form.name.trim(),
      email: form.email || 'user@studio.io',
      role: form.role,
      status: form.status,
      color: form.color || '#1e88e5',
      lastLogin
    };
    if (editingId) {
      DataService.updateTeamMember(editingId, data);
      showToast('Team member updated');
    } else {
      DataService.addTeamMember(data);
      showToast('Team member added');
    }
    setModalOpen(false);
    refresh();
  }, [form, editingId, showToast]);

  const handleDelete = (id) => { setDeleteId(id); setConfirmOpen(true); };

  const confirmDelete = useCallback(() => {
    DataService.deleteTeamMember(deleteId);
    setConfirmOpen(false);
    refresh();
    showToast('Team member deleted', 'info');
  }, [deleteId, showToast]);

  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">User / Admin Roles &amp; Permissions</h2>
        <button className="add-btn" onClick={openAdd}>+ Add Member</button>
      </div>
      <div className="team-table-wrapper">
        <table className="team-table">
          <thead>
            <tr>
              <th>Member</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m, i) => (
              <tr key={m.id} className="reveal-item" style={{ animationDelay: `${i * 0.07}s` }}>
                <td>
                  <div className="member-cell">
                    <div className="member-avatar" style={{ background: m.color }}>{getInitials(m.name)}</div>
                    <span className="member-name">{m.name}</span>
                  </div>
                </td>
                <td>{m.email}</td>
                <td><span className={`role-badge ${roleClass(m.role)}`}>{m.role}</span></td>
                <td><span className={`status-dot ${m.status.toLowerCase()}`}>{m.status}</span></td>
                <td>{m.lastLogin}</td>
                <td>
                  <button className="btn-icon" onClick={() => openEdit(m)} title="Edit Member">✏️</button>
                  <button className="btn-icon" onClick={() => handleDelete(m.id)} title="Delete Member">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={modalOpen} title={editingId ? 'Edit Team Member' : 'Add Team Member'} onClose={() => setModalOpen(false)} onConfirm={handleSave}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Name</label>
            <input className="form-input" type="text" value={form.name || ''} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Full name" />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" value={form.email || ''} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="email@example.com" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Role</label>
            <select className="form-select" value={form.role || 'Developer'} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}>
              {['Admin', 'Developer', 'Artist', 'QA', 'Viewer'].map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select className="form-select" value={form.status || 'Active'} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
              {['Active', 'Inactive'].map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Avatar Color</label>
          <input className="form-input" type="color" value={form.color || '#1e88e5'} onChange={e => setForm(f => ({ ...f, color: e.target.value }))} />
        </div>
      </Modal>

      <Modal open={confirmOpen} title="Confirm Action" onClose={() => setConfirmOpen(false)} onConfirm={confirmDelete} confirmLabel="Delete" confirmClass="modal-btn-danger">
        <p className="confirm-message">Are you sure you want to delete this team member?</p>
      </Modal>
    </section>
  );
}
