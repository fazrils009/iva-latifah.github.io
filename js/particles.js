/**
 * Particle system
 * ----------------
 * Two things live here:
 *  1. A steady, gentle rain of falling hearts + petals behind the content.
 *  2. A one-off celebration burst fired from the "Yes, let's go" button.
 *
 * Both share the same discipline: every particle is capped, every
 * particle removes itself from the DOM on animationend, and the whole
 * system is disabled under prefers-reduced-motion.
 */
window.Particles = (function () {
  const TINTS = ['#F7D6DC', '#E9AAB5', '#D8A7B1', '#F3C1CA'];

  const SHAPES = {
    heartOutline:
      '<svg viewBox="0 0 24 24" class="icon"><use href="#icon-heart"></use></svg>',
    heartFilled:
      '<svg viewBox="0 0 24 24" class="icon icon--filled"><use href="#icon-heart"></use></svg>',
    petal:
      '<svg viewBox="0 0 24 24" class="icon icon--filled"><use href="#icon-petal"></use></svg>',
    sparkle:
      '<svg viewBox="0 0 24 24" class="icon icon--filled"><use href="#icon-sparkle"></use></svg>',
  };

  let field = null;
  let maxParticles = 18;
  let liveCount = 0;
  let spawnTimer = null;
  let active = false;

  function computeMax() {
    const w = window.innerWidth;
    if (w < 640) return 11; // mobile: 8-15
    return 24; // desktop/tablet: 15-30
  }

  function pickShape() {
    const roll = Math.random();
    if (roll < 0.42) return SHAPES.heartOutline;
    if (roll < 0.74) return SHAPES.heartFilled;
    if (roll < 0.92) return SHAPES.petal;
    return SHAPES.sparkle;
  }

  function spawnFalling() {
    if (!active || !field || liveCount >= maxParticles) return;

    const el = document.createElement('span');
    el.className = 'particle';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = pickShape();

    const size = Utils.random(10, 22);
    el.style.setProperty('--x', Utils.random(2, 96) + 'vw');
    el.style.setProperty('--size', size + 'px');
    el.style.setProperty('--duration', Utils.random(7, 13) + 's');
    el.style.setProperty('--delay', '0s');
    el.style.setProperty('--drift', Utils.random(-60, 60) + 'px');
    el.style.setProperty('--spin', Utils.random(60, 200) + 'deg');
    el.style.setProperty('--peak-opacity', Utils.random(0.45, 0.85));
    el.style.setProperty('--tint', TINTS[Math.floor(Math.random() * TINTS.length)]);

    el.addEventListener('animationend', onFallingEnd, { once: true });

    field.appendChild(el);
    liveCount += 1;
  }

  function onFallingEnd(event) {
    event.target.remove();
    liveCount = Math.max(0, liveCount - 1);
    if (active && document.visibilityState === 'visible') {
      // Stagger the replacement so particles don't re-sync into waves.
      setTimeout(spawnFalling, Utils.random(200, 1800));
    }
  }

  function fillToCapacity() {
    let delay = 0;
    for (let i = 0; i < maxParticles; i += 1) {
      delay += Utils.random(150, 500);
      setTimeout(spawnFalling, delay);
    }
  }

  function start() {
    if (Utils.prefersReducedMotion()) return;
    field = document.getElementById('particle-field');
    if (!field) return;

    active = true;
    maxParticles = computeMax();
    fillToCapacity();

    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibility);
  }

  function handleResize() {
    clearTimeout(spawnTimer);
    spawnTimer = setTimeout(() => {
      maxParticles = computeMax();
    }, 300);
  }

  function handleVisibility() {
    if (document.visibilityState === 'visible' && active) {
      const missing = maxParticles - liveCount;
      for (let i = 0; i < missing; i += 1) {
        setTimeout(spawnFalling, Utils.random(0, 1200));
      }
    }
  }

  function stop() {
    active = false;
    window.removeEventListener('resize', handleResize);
    document.removeEventListener('visibilitychange', handleVisibility);
    if (field) field.innerHTML = '';
    liveCount = 0;
  }

  /** One-off celebratory burst, launched from a given element's center. */
  function burst(originEl, count) {
    if (Utils.prefersReducedMotion() || !field) return;
    const rect = originEl.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;
    const total = count || 18;

    for (let i = 0; i < total; i += 1) {
      const el = document.createElement('span');
      el.className = 'particle particle--burst';
      el.setAttribute('aria-hidden', 'true');
      el.innerHTML = Math.random() < 0.6 ? SHAPES.heartFilled : SHAPES.sparkle;

      el.style.setProperty('--x', originX + 'px');
      el.style.setProperty('--y', originY + 'px');
      el.style.setProperty('--size', Utils.random(12, 22) + 'px');
      el.style.setProperty('--delay', Utils.random(0, 0.25) + 's');
      el.style.setProperty('--drift', Utils.random(-90, 90) + 'px');
      el.style.setProperty('--rise', -Utils.random(80, 180) + 'px');
      el.style.setProperty('--spin', Utils.random(-90, 90) + 'deg');
      el.style.setProperty('--peak-opacity', Utils.random(0.7, 1));
      el.style.setProperty('--tint', TINTS[Math.floor(Math.random() * TINTS.length)]);
      el.style.position = 'fixed';

      el.addEventListener('animationend', () => el.remove(), { once: true });
      field.appendChild(el);
    }
  }

  return { start, stop, burst };
})();
