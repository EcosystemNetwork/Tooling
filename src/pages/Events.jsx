import { useState, useCallback, useRef } from 'react';
import DataService from '../services/DataService';
import Modal from '../components/Modal';
import { useToast } from '../components/Toast';

function eventStatusClass(status) {
  const map = { Upcoming: 'badge-upcoming', Live: 'badge-live', Ended: 'badge-ended' };
  return map[status] || '';
}

export default function Events() {
  const [events, setEvents] = useState(() => DataService.getEvents());
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({});
  const [dragOverId, setDragOverId] = useState(null);
  const dragItem = useRef(null);
  const showToast = useToast();

  const refresh = () => setEvents(DataService.getEvents());
  const today = new Date().toISOString().split('T')[0];

  const openAdd = () => {
    setEditingId(null);
    setForm({ name: '', game: '', start: today, end: today, status: 'Upcoming', type: 'Update' });
    setModalOpen(true);
  };

  const openEdit = (e) => {
    setEditingId(e.id);
    setForm({ name: e.name, game: e.game, start: e.start, end: e.end, status: e.status, type: e.type });
    setModalOpen(true);
  };

  const handleSave = useCallback(() => {
    if (!form.name.trim()) { showToast('Name is required', 'error'); return; }
    const data = {
      name: form.name.trim(),
      game: form.game || 'Unknown Game',
      start: form.start || today,
      end: form.end || today,
      status: form.status,
      type: form.type
    };
    if (editingId) {
      DataService.updateEvent(editingId, data);
      showToast('Event updated');
    } else {
      DataService.addEvent(data);
      showToast('Event added');
    }
    setModalOpen(false);
    refresh();
  }, [form, editingId, showToast, today]);

  const handleDelete = (id) => { setDeleteId(id); setConfirmOpen(true); };

  const confirmDelete = useCallback(() => {
    DataService.deleteEvent(deleteId);
    setConfirmOpen(false);
    refresh();
    showToast('Event deleted', 'info');
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
    const reordered = [...events];
    const [moved] = reordered.splice(dragIndex, 1);
    reordered.splice(dropIndex, 0, moved);
    setEvents(reordered);
    DataService.saveEvents(reordered);
    setDragOverId(null);
    dragItem.current = null;
    showToast('Events reordered');
  };

  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">Live Ops / Events Schedule</h2>
        <button className="add-btn" onClick={openAdd}>+ Add Event</button>
      </div>
      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>💡 Drag and drop cards to rearrange</p>
      <div className="events-grid">
        {events.map((e, i) => (
          <div
            key={e.id}
            className="card event-card reveal-item"
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
            <div className="event-header">
              <div className="event-name">{e.name}</div>
              <span className={`badge ${eventStatusClass(e.status)}`}>{e.status}</span>
            </div>
            <div className="event-game">🎮 {e.game}</div>
            <div className="event-dates">📅 {e.start} → {e.end}</div>
            <div className="event-footer">
              <span className="type-badge">{e.type}</span>
            </div>
            <div className="card-actions">
              <button className="btn-icon" onClick={() => openEdit(e)} title="Edit Event">✏️</button>
              <button className="btn-icon" onClick={() => handleDelete(e.id)} title="Delete Event">🗑️</button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} title={editingId ? 'Edit Event' : 'Add Event'} onClose={() => setModalOpen(false)} onConfirm={handleSave}>
        <div className="form-group">
          <label className="form-label">Event Name</label>
          <input className="form-input" type="text" value={form.name || ''} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Enter event name" />
        </div>
        <div className="form-group">
          <label className="form-label">Game</label>
          <input className="form-input" type="text" value={form.game || ''} onChange={e => setForm(f => ({ ...f, game: e.target.value }))} placeholder="Game title" />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Start Date</label>
            <input className="form-input" type="date" value={form.start || today} onChange={e => setForm(f => ({ ...f, start: e.target.value }))} />
          </div>
          <div className="form-group">
            <label className="form-label">End Date</label>
            <input className="form-input" type="date" value={form.end || today} onChange={e => setForm(f => ({ ...f, end: e.target.value }))} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Status</label>
            <select className="form-select" value={form.status || 'Upcoming'} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
              {['Upcoming', 'Live', 'Ended'].map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Type</label>
            <select className="form-select" value={form.type || 'Update'} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
              {['Seasonal', 'Update', 'Tournament', 'Hotfix'].map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>
      </Modal>

      <Modal open={confirmOpen} title="Confirm Action" onClose={() => setConfirmOpen(false)} onConfirm={confirmDelete} confirmLabel="Delete" confirmClass="modal-btn-danger">
        <p className="confirm-message">Are you sure you want to delete this event?</p>
      </Modal>
    </section>
  );
}
