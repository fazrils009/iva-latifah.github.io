/**
 * Shared utilities. Kept dependency-free and framework-free on purpose —
 * the whole site is plain HTML/CSS/JS, loaded as ordinary <script> tags
 * (not ES modules) so it also runs correctly when opened directly from
 * disk via file://, where module CORS rules can block loading.
 *
 * Everything is attached to window.Utils to keep the global scope tidy.
 */
window.Utils = (function () {
  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Simple focus trap for the one modal the page has (the letter overlay).
   * Re-queries focusable elements on every Tab press rather than caching
   * them once, because the letter reveals new buttons (Yes/Maybe, then
   * Let's plan it) after the trap is already active.
   */
  function trapFocus(container) {
    function focusable() {
      return Array.from(
        container.querySelectorAll(
          'a[href], button:not([disabled]):not([hidden]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);
    }

    function onKeydown(event) {
      if (event.key !== 'Tab') return;
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    container.addEventListener('keydown', onKeydown);
    return () => container.removeEventListener('keydown', onKeydown);
  }

  /** Runs `callback` once, the first time `el` enters the viewport. */
  function onEnterView(el, callback, options) {
    if (!('IntersectionObserver' in window)) {
      callback();
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
            observer.unobserve(entry.target);
          }
        });
      },
      Object.assign({ threshold: 0.35 }, options)
    );
    observer.observe(el);
  }

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return { random, prefersReducedMotion, trapFocus, onEnterView, wait };
})();
