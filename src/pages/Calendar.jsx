import { useState, useCallback } from 'react';
import DataService from '../services/DataService';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MAX_VISIBLE_EVENTS = 3;
const TOOLTIP_WIDTH = 260;

function statusColor(status) {
  const map = { Upcoming: '#42a5f5', Live: '#00e676', Ended: '#7a94b8' };
  return map[status] || '#42a5f5';
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

function formatDateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function buildEventMap(events, year, month) {
  const map = {};
  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month + 1, 0);

  events.forEach(event => {
    const start = new Date(event.start + 'T00:00:00');
    const end = new Date(event.end + 'T00:00:00');
    const lo = start < monthStart ? monthStart : start;
    const hi = end > monthEnd ? monthEnd : end;

    for (let d = new Date(lo); d <= hi; d.setDate(d.getDate() + 1)) {
      const key = formatDateKey(d.getFullYear(), d.getMonth(), d.getDate());
      if (!map[key]) map[key] = [];
      map[key].push(event);
    }
  });

  return map;
}

const styles = {
  calendarWrapper: {
    background: 'var(--bg-card)',
    borderRadius: 'var(--radius)',
    border: '1px solid var(--border-color)',
    padding: '24px',
    marginTop: '16px',
  },
  navRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  navBtn: {
    background: 'var(--blue-mid)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-sm)',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background 0.2s',
  },
  monthLabel: {
    fontSize: '20px',
    fontWeight: 700,
    color: 'var(--text-primary)',
    letterSpacing: '0.5px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '1px',
    background: 'var(--border-color)',
    borderRadius: 'var(--radius-sm)',
    overflow: 'hidden',
  },
  dayHeader: {
    background: 'var(--blue-mid)',
    color: 'var(--text-secondary)',
    textAlign: 'center',
    padding: '10px 0',
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  dayCell: {
    background: 'var(--bg-body)',
    minHeight: '100px',
    padding: '6px',
    position: 'relative',
    verticalAlign: 'top',
  },
  dayCellEmpty: {
    background: 'rgba(6, 14, 36, 0.5)',
    minHeight: '100px',
  },
  dayNumber: {
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    marginBottom: '4px',
  },
  todayNumber: {
    background: 'var(--blue-accent)',
    color: '#fff',
    borderRadius: '50%',
    width: '26px',
    height: '26px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    fontWeight: 700,
  },
  eventBar: {
    borderRadius: '4px',
    padding: '2px 6px',
    fontSize: '11px',
    fontWeight: 600,
    marginBottom: '2px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    transition: 'filter 0.15s',
  },
  tooltip: {
    position: 'fixed',
    zIndex: 1000,
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-sm)',
    padding: '14px 18px',
    minWidth: '220px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
  },
  tooltipName: {
    fontSize: '15px',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: '6px',
  },
  tooltipRow: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    marginBottom: '3px',
  },
  todayBtn: {
    background: 'transparent',
    color: 'var(--blue-accent)',
    border: '1px solid var(--blue-accent)',
    borderRadius: 'var(--radius-sm)',
    padding: '6px 14px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 600,
  },
};

export default function Calendar() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [tooltip, setTooltip] = useState(null);

  const events = DataService.getEvents();
  const eventMap = buildEventMap(events, year, month);

  const todayStr = formatDateKey(now.getFullYear(), now.getMonth(), now.getDate());

  const prevMonth = useCallback(() => {
    setMonth(m => {
      if (m === 0) { setYear(y => y - 1); return 11; }
      return m - 1;
    });
    setTooltip(null);
  }, []);

  const nextMonth = useCallback(() => {
    setMonth(m => {
      if (m === 11) { setYear(y => y + 1); return 0; }
      return m + 1;
    });
    setTooltip(null);
  }, []);

  const goToday = useCallback(() => {
    const today = new Date();
    setYear(today.getFullYear());
    setMonth(today.getMonth());
    setTooltip(null);
  }, []);

  const handleEventClick = (e, event) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      event,
      x: rect.left + rect.width / 2,
      y: rect.bottom + 6,
    });
  };

  const closeTooltip = () => setTooltip(null);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const cells = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push(<div key={`empty-${i}`} style={styles.dayCellEmpty} />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = formatDateKey(year, month, day);
    const isToday = dateKey === todayStr;
    const dayEvents = eventMap[dateKey] || [];

    cells.push(
      <div
        key={dateKey}
        style={{
          ...styles.dayCell,
          ...(isToday ? { background: 'rgba(30, 136, 229, 0.08)', boxShadow: 'inset 0 0 0 2px var(--blue-accent)' } : {}),
        }}
        onClick={closeTooltip}
      >
        <div style={styles.dayNumber}>
          {isToday ? <span style={styles.todayNumber}>{day}</span> : day}
        </div>
        {dayEvents.slice(0, MAX_VISIBLE_EVENTS).map(ev => (
          <div
            key={ev.id}
            style={{
              ...styles.eventBar,
              background: statusColor(ev.status) + '22',
              color: statusColor(ev.status),
              borderLeft: `3px solid ${statusColor(ev.status)}`,
            }}
            title={ev.name}
            onClick={e => handleEventClick(e, ev)}
          >
            {ev.name}
          </div>
        ))}
        {dayEvents.length > MAX_VISIBLE_EVENTS && (
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', paddingLeft: '6px' }}>
            +{dayEvents.length - MAX_VISIBLE_EVENTS} more
          </div>
        )}
      </div>
    );
  }

  return (
    <section className="section" onClick={closeTooltip}>
      <div className="section-header">
        <h2 className="section-title">Calendar</h2>
      </div>

      <div style={styles.calendarWrapper}>
        <div style={styles.navRow}>
          <button style={styles.navBtn} onClick={prevMonth}>◀ Prev</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={styles.monthLabel}>{MONTH_NAMES[month]} {year}</span>
            <button style={styles.todayBtn} onClick={goToday}>Today</button>
          </div>
          <button style={styles.navBtn} onClick={nextMonth}>Next ▶</button>
        </div>

        <div style={styles.grid}>
          {DAY_LABELS.map(d => (
            <div key={d} style={styles.dayHeader}>{d}</div>
          ))}
          {cells}
        </div>
      </div>

      {tooltip && (
        <div
          style={{
            ...styles.tooltip,
            left: Math.min(tooltip.x, window.innerWidth - TOOLTIP_WIDTH),
            top: tooltip.y,
          }}
          onClick={e => e.stopPropagation()}
        >
          <div style={styles.tooltipName}>
            <span style={{
              display: 'inline-block',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: statusColor(tooltip.event.status),
              marginRight: '8px',
            }} />
            {tooltip.event.name}
          </div>
          <div style={styles.tooltipRow}>🎮 {tooltip.event.game}</div>
          <div style={styles.tooltipRow}>📅 {tooltip.event.start} → {tooltip.event.end}</div>
          <div style={styles.tooltipRow}>
            Status: <span style={{ color: statusColor(tooltip.event.status), fontWeight: 600 }}>{tooltip.event.status}</span>
          </div>
          <div style={styles.tooltipRow}>Type: {tooltip.event.type}</div>
        </div>
      )}
    </section>
  );
}
