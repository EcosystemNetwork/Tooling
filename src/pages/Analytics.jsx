import { useState, useCallback } from 'react';
import DataService from '../services/DataService';
import Modal from '../components/Modal';
import { useToast } from '../components/Toast';

export default function Analytics() {
  const [kpis, setKpis] = useState(() => DataService.getKPIs());
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({});
  const showToast = useToast();

  const refresh = () => setKpis(DataService.getKPIs());

  const openAdd = () => {
    setEditingId(null);
    setForm({ label: '', value: '0', trend: 'up', change: '+0.0%' });
    setModalOpen(true);
  };

  const openEdit = (k) => {
    setEditingId(k.id);
    setForm({ label: k.label, value: k.value, trend: k.trend, change: k.change });
    setModalOpen(true);
  };

  const handleSave = useCallback(() => {
    if (!form.label.trim()) { showToast('Label is required', 'error'); return; }
    const data = {
      label: form.label.trim(),
      value: form.value || '0',
      trend: form.trend,
      change: form.change || '+0.0%'
    };
    if (editingId) {
      DataService.updateKPI(editingId, data);
      showToast('KPI updated');
    } else {
      DataService.addKPI(data);
      showToast('KPI added');
    }
    setModalOpen(false);
    refresh();
  }, [form, editingId, showToast]);

  const handleDelete = (id) => { setDeleteId(id); setConfirmOpen(true); };

  const confirmDelete = useCallback(() => {
    DataService.deleteKPI(deleteId);
    setConfirmOpen(false);
    refresh();
    showToast('KPI deleted', 'info');
  }, [deleteId, showToast]);

  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">Analytics &amp; KPIs</h2>
        <button className="add-btn" onClick={openAdd}>+ Add KPI</button>
      </div>
      <div className="kpi-grid">
        {kpis.map((k, i) => (
          <div key={k.id} className="card kpi-card reveal-item" style={{ animationDelay: `${i * 0.07}s` }}>
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-value">{k.value}</div>
            <div className={`kpi-trend ${k.trend}`}>
              {k.trend === 'up' ? '▲' : '▼'} {k.change}
            </div>
            <div className="card-actions">
              <button className="btn-icon" onClick={() => openEdit(k)} title="Edit KPI">✏️</button>
              <button className="btn-icon" onClick={() => handleDelete(k.id)} title="Delete KPI">🗑️</button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} title={editingId ? 'Edit KPI' : 'Add KPI'} onClose={() => setModalOpen(false)} onConfirm={handleSave}>
        <div className="form-group">
          <label className="form-label">KPI Label</label>
          <input className="form-input" type="text" value={form.label || ''} onChange={e => setForm(f => ({ ...f, label: e.target.value }))} placeholder="e.g., Daily Active Users" />
        </div>
        <div className="form-group">
          <label className="form-label">Value</label>
          <input className="form-input" type="text" value={form.value || ''} onChange={e => setForm(f => ({ ...f, value: e.target.value }))} placeholder="e.g., 128,430" />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Trend</label>
            <select className="form-select" value={form.trend || 'up'} onChange={e => setForm(f => ({ ...f, trend: e.target.value }))}>
              {['up', 'down'].map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Change</label>
            <input className="form-input" type="text" value={form.change || ''} onChange={e => setForm(f => ({ ...f, change: e.target.value }))} placeholder="e.g., +12.4%" />
          </div>
        </div>
      </Modal>

      <Modal open={confirmOpen} title="Confirm Action" onClose={() => setConfirmOpen(false)} onConfirm={confirmDelete} confirmLabel="Delete" confirmClass="modal-btn-danger">
        <p className="confirm-message">Are you sure you want to delete this KPI?</p>
      </Modal>
    </section>
  );
}
