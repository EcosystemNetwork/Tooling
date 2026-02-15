import { useState, useCallback, createContext, useContext, useEffect } from 'react';
import { animate } from 'animejs/animation';

const ToastContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev =>
        prev.map(t => (t.id === id ? { ...t, leaving: true } : t))
      );
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 300);
    }, 3000);
  }, []);

  // Animate toasts when they appear
  useEffect(() => {
    if (toasts.length > 0) {
      const latestToast = document.querySelector('.toast:last-child');
      if (latestToast && !latestToast.dataset.animated) {
        latestToast.dataset.animated = 'true';
        animate(latestToast, {
          translateX: [100, 0],
          opacity: [0, 1],
          duration: 500,
          ease: 'out(expo)',
        });
      }
    }
  }, [toasts]);

  const icons = { success: '✅', error: '❌', info: 'ℹ️' };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className="toast-container" aria-live="polite">
        {toasts.map(t => (
          <div
            key={t.id}
            className={`toast toast-${t.type}${t.leaving ? ' toast-out' : ''}`}
            role="status"
          >
            {icons[t.type] || ''} {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
