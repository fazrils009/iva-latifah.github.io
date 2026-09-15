/**
 * Envelope
 * --------
 * Mengelola animasi pembukaan amplop 3D.
 * Jika sudah pernah dibuka, amplop tetap dapat diklik untuk membuka kembali
 * surat undangan kapan saja tanpa macet.
 */
window.Envelope = (function () {
  let el = null;
  let onOpened = null;
  let isAnimating = false;

  function init(envelopeEl, callback) {
    el = envelopeEl;
    onOpened = callback;
    el.dataset.state = 'closed';
    el.addEventListener('click', handleActivate);
  }

  async function handleActivate() {
    if (isAnimating) return;

    // Jika amplop sudah dalam keadaan terbuka, langsung panggil surat untuk tampil
    if (el.dataset.state === 'open') {
      if (typeof onOpened === 'function') {
        onOpened();
      }
      return;
    }

    isAnimating = true;
    const reduced = Utils.prefersReducedMotion();

    // Fase 1: Nudge halus saat disentuh
    el.dataset.state = 'nudging';
    await Utils.wait(reduced ? 0 : 350);

    // Fase 2: Segel lilin pecah & penutup amplop terlipat ke belakang
    el.dataset.state = 'opening';
    await Utils.wait(reduced ? 0 : 750);

    // Fase 3: Surat naik dan siap dibaca
    el.dataset.state = 'open';
    isAnimating = false;

    if (typeof onOpened === 'function') {
      onOpened();
    }
  }

  return { init };
})();
