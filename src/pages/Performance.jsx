import { useState, useCallback } from 'react';
import DataService from '../services/DataService';
import Modal from '../components/Modal';
import { useToast } from '../components/Toast';

function perfColor(value, max) {
  const pct = (value / max) * 100;
  if (pct < 50) return 'good';
  if (pct < 80) return 'warn';
  return 'bad';
}

function formatPerfValue(value) {
  if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
  if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
  return String(value);
}

export default function Performance() {
  const [metrics, setMetrics] = useState(() => DataService.getPerfMetrics());
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({});
  const showToast = useToast();

  const refresh = () => setMetrics(DataService.getPerfMetrics());

  const overviewStats = [
    { label: 'FPS Target', value: '60', unit: 'fps', status: 'good' },
    { label: 'Draw Calls', value: metrics.length > 0 ? formatPerfValue(metrics[0].value) : '0', unit: metrics.length > 0 ? metrics[0].unit : '', status: metrics.length > 0 ? perfColor(metrics[0].value, metrics[0].max) : 'good' },
    { label: 'Frame Budget', value: '16.67', unit: 'ms', status: 'good' },
    { label: 'Metrics Tracked', value: String(metrics.length), unit: 'active', status: 'good' }
  ];

  const openAdd = () => {
    setEditingId(null);
    setForm({ name: '', category: 'Rendering', unit: '', value: 0, max: 100, tip: '' });
    setModalOpen(true);
  };

  const openEdit = (m) => {
    setEditingId(m.id);
    setForm({ name: m.name, category: m.category, unit: m.unit, value: m.value, max: m.max, tip: m.tip || '' });
    setModalOpen(true);
  };

  const handleSave = useCallback(() => {
    if (!form.name.trim()) { showToast('Name is required', 'error'); return; }
    const data = {
      name: form.name.trim(),
      category: form.category,
      unit: form.unit || '',
      value: parseFloat(form.value) || 0,
      max: parseFloat(form.max) || 100,
      tip: form.tip || ''
    };
    if (editingId) {
      DataService.updatePerfMetric(editingId, data);
      showToast('Metric updated');
    } else {
      DataService.addPerfMetric(data);
      showToast('Metric added');
    }
    setModalOpen(false);
    refresh();
  }, [form, editingId, showToast]);

  const handleDelete = (id) => { setDeleteId(id); setConfirmOpen(true); };

  const confirmDelete = useCallback(() => {
    DataService.deletePerfMetric(deleteId);
    setConfirmOpen(false);
    refresh();
    showToast('Metric deleted', 'info');
  }, [deleteId, showToast]);

  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">⚡ Performance Monitor</h2>
        <button className="add-btn" onClick={openAdd}>+ Add Metric</button>
      </div>

      <div className="perf-overview">
        {overviewStats.map((s, i) => (
          <div key={i} className="perf-stat-card reveal-item">
            <div className="perf-stat-label">{s.label}</div>
            <div className={`perf-stat-value perf-stat-${s.status}`}>{s.value}</div>
            <div className="perf-stat-unit">{s.unit}</div>
          </div>
        ))}
      </div>

      <div className="perf-grid">
        {metrics.map((m, i) => {
          const pct = Math.min((m.value / m.max) * 100, 100);
          const colorClass = perfColor(m.value, m.max);
          return (
            <div key={m.id} className="card perf-card reveal-item" style={{ animationDelay: `${i * 0.07}s` }}>
              <div className="perf-name">{m.name}</div>
              <div className="perf-category">{m.category}</div>
              <div className="perf-bar-wrapper">
                <div className={`perf-bar-fill perf-bar-${colorClass}`} style={{ width: `${pct}%` }}></div>
              </div>
              <div className="perf-detail">
                <span>{formatPerfValue(m.value)} {m.unit}</span>
                <span>max {formatPerfValue(m.max)}</span>
              </div>
              {m.tip && <div className="perf-tip">💡 {m.tip}</div>}
              <div className="card-actions">
                <button className="btn-icon" onClick={() => openEdit(m)} title="Edit Metric">✏️</button>
                <button className="btn-icon" onClick={() => handleDelete(m.id)} title="Delete Metric">🗑️</button>
              </div>
            </div>
          );
        })}
      </div>

      <Modal open={modalOpen} title={editingId ? 'Edit Metric' : 'Add Metric'} onClose={() => setModalOpen(false)} onConfirm={handleSave}>
        <div className="form-group">
          <label className="form-label">Metric Name</label>
          <input className="form-input" type="text" value={form.name || ''} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g., Draw Calls" />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Category</label>
            <select className="form-select" value={form.category || 'Rendering'} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
              {['Rendering', 'Memory', 'Performance', 'Geometry', 'Loading', 'Network'].map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Unit</label>
            <input className="form-input" type="text" value={form.unit || ''} onChange={e => setForm(f => ({ ...f, unit: e.target.value }))} placeholder="e.g., ms, MB" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Current Value</label>
            <input className="form-input" type="number" step="any" value={form.value || 0} onChange={e => setForm(f => ({ ...f, value: e.target.value }))} />
          </div>
          <div className="form-group">
            <label className="form-label">Max Threshold</label>
            <input className="form-input" type="number" step="any" value={form.max || 100} onChange={e => setForm(f => ({ ...f, max: e.target.value }))} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Optimization Tip</label>
          <input className="form-input" type="text" value={form.tip || ''} onChange={e => setForm(f => ({ ...f, tip: e.target.value }))} placeholder="Performance optimization advice" />
        </div>
      </Modal>

      <Modal open={confirmOpen} title="Confirm Action" onClose={() => setConfirmOpen(false)} onConfirm={confirmDelete} confirmLabel="Delete" confirmClass="modal-btn-danger">
        <p className="confirm-message">Are you sure you want to delete this metric?</p>
      </Modal>
    </section>
  );
}
