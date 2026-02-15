import { useEffect, useRef } from 'react';
import { animate } from 'animejs/animation';

/**
 * Custom hook for anime.js animations
 * @param {Object} config - Animation configuration
 * @param {Array} deps - Dependencies array (triggers re-animation)
 */
export function useAnime(config, deps = []) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const animation = animate(ref.current, config);

    return () => {
      if (animation) animation.pause();
    };
  }, deps);

  return ref;
}

/**
 * Trigger an animation on demand
 * @param {string|Element|Array} targets - Animation targets
 * @param {Object} config - Animation configuration
 */
export function animateElements(targets, config) {
  return animate(targets, config);
}
