import { useEffect, useRef } from 'react';
import { animate } from 'animejs/animation';

export default function Modal({ open, title, onClose, onConfirm, confirmLabel = 'Save', confirmClass = 'modal-btn-confirm', children }) {
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (open) {
      // Animate modal entrance
      animate('.modal', {
        scale: [0.7, 1],
        opacity: [0, 1],
        duration: 400,
        ease: 'out(expo)',
      });

      animate('.modal-overlay', {
        opacity: [0, 1],
        duration: 300,
        ease: 'out(cubic)',
      });

      setTimeout(() => {
        const el = document.querySelector('.modal-body input, .modal-body select, .modal-body textarea');
        if (el) el.focus();
      }, 50);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        onConfirm();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose, onConfirm]);

  if (!open) return null;

  return (
    <div className="modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body" ref={firstInputRef}>
          {children}
        </div>
        <div className="modal-footer">
          <button className="modal-btn modal-btn-cancel" onClick={onClose}>Cancel</button>
          <button className={`modal-btn ${confirmClass}`} onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}
