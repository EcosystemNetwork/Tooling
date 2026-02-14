import { useState } from 'react';
import DataService from '../services/DataService';

const statusColors = {
  Upcoming: '#42a5f5',
  Live: '#00e676',
  Ended: '#7a94b8',
};

const filterOptions = ['All', 'Upcoming', 'Live', 'Ended'];

export default function Timeline() {
  const [events] = useState(() => DataService.getEvents());
  const [filter, setFilter] = useState('All');

  const filtered = events
    .filter(e => filter === 'All' || e.status === filter)
    .sort((a, b) => new Date(a.start) - new Date(b.start));

  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">Event Timeline</h2>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {filterOptions.map(opt => (
          <button
            key={opt}
            onClick={() => setFilter(opt)}
            style={{
              padding: '0.4rem 1rem',
              borderRadius: 'var(--radius-sm, 6px)',
              border: filter === opt ? '1.5px solid var(--blue-accent, #42a5f5)' : '1px solid var(--border-color, #23293a)',
              background: filter === opt ? 'rgba(66,165,245,0.15)' : 'var(--bg-card, #181c2e)',
              color: filter === opt ? 'var(--blue-accent, #42a5f5)' : 'var(--text-secondary, #b0bec5)',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 600,
              transition: 'all 0.2s',
            }}
          >
            {opt}
          </button>
        ))}
      </div>

      <div style={{ position: 'relative', paddingLeft: '2.5rem' }}>
        {/* Vertical timeline line */}
        <div
          style={{
            position: 'absolute',
            left: '0.75rem',
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'var(--border-color, #23293a)',
          }}
        />

        {filtered.length === 0 && (
          <p style={{ color: 'var(--text-muted, #6b7a99)', padding: '2rem 0' }}>No events match the current filter.</p>
        )}

        {filtered.map((e, i) => {
          const color = statusColors[e.status] || '#7a94b8';
          return (
            <div
              key={e.id}
              className="reveal-item"
              style={{
                position: 'relative',
                marginBottom: '1.5rem',
                animationDelay: `${i * 0.07}s`,
              }}
            >
              {/* Timeline dot */}
              <div
                style={{
                  position: 'absolute',
                  left: '-1.95rem',
                  top: '1.2rem',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: color,
                  border: '2px solid var(--bg-body, #0f111a)',
                  zIndex: 1,
                }}
              />

              {/* Event card */}
              <div
                className="card"
                style={{
                  borderLeft: `3px solid ${color}`,
                  padding: '1rem 1.25rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary, #e0e6f0)' }}>{e.name}</span>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <span
                      style={{
                        padding: '0.15rem 0.6rem',
                        borderRadius: 'var(--radius-sm, 6px)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        background: `${color}22`,
                        color: color,
                      }}
                    >
                      {e.status}
                    </span>
                    <span
                      style={{
                        padding: '0.15rem 0.6rem',
                        borderRadius: 'var(--radius-sm, 6px)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        background: 'rgba(255,255,255,0.06)',
                        color: 'var(--text-secondary, #b0bec5)',
                      }}
                    >
                      {e.type}
                    </span>
                  </div>
                </div>
                <div style={{ color: 'var(--text-secondary, #b0bec5)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>🎮 {e.game}</div>
                <div style={{ color: 'var(--text-muted, #6b7a99)', fontSize: '0.82rem' }}>📅 {e.start} → {e.end}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
