import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { animate } from 'animejs/animation'

// Global button hover animations
document.addEventListener('DOMContentLoaded', () => {
  // Add hover animations to all buttons
  document.addEventListener('mouseenter', (e) => {
    if (e.target instanceof Element && e.target.matches('button:not(.hamburger), .add-btn, .header-btn, .btn-icon')) {
      animate(e.target, {
        scale: 1.05,
        duration: 300,
        ease: 'out(cubic)',
      });
    }
  }, true);

  document.addEventListener('mouseleave', (e) => {
    if (e.target instanceof Element && e.target.matches('button:not(.hamburger), .add-btn, .header-btn, .btn-icon')) {
      animate(e.target, {
        scale: 1,
        duration: 300,
        ease: 'out(cubic)',
      });
    }
  }, true);

  // Add click animations to all buttons
  document.addEventListener('click', (e) => {
    if (e.target instanceof Element && e.target.matches('button, .add-btn, .header-btn, .btn-icon')) {
      animate(e.target, {
        scale: [1, 0.95, 1],
        duration: 400,
        ease: 'outElastic(1, 0.5)',
      });
    }
  }, true);
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
