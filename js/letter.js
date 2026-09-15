/**
 * Surat Undangan Interaktif
 * -------------------------
 * Mengatur pembukaan overlay surat layar penuh.
 * Memunculkan bait demi bait saat pertama dibuka, dan langsung menampilkan
 * seluruh isi serta opsi jawaban saat surat dibuka kembali.
 */
window.Letter = (function () {
  let overlay, card, closeBtn, linesContainer, signature, returnFocusTo;
  let releaseFocusTrap = () => {};
  let onFullyRevealed = null;
  let hasRevealedOnce = false;

  function init(options) {
    overlay = document.getElementById('letter-overlay');
    if (!overlay) return;

    card = overlay.querySelector('.letter-card');
    closeBtn = document.getElementById('letter-close');
    linesContainer = document.getElementById('letter-lines');
    signature = document.getElementById('letter-signature');
    onFullyRevealed = options && options.onFullyRevealed;

    buildLines(window.SiteData.letterLines);

    if (closeBtn) closeBtn.addEventListener('click', close);
    const scrim = overlay.querySelector('.letter-overlay__scrim');
    if (scrim) scrim.addEventListener('click', close);

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && overlay.dataset.visible === 'true') close();
    });
  }

  function buildLines(lines) {
    if (!linesContainer) return;
    linesContainer.innerHTML = '';
    lines.forEach((line) => {
      const p = document.createElement('p');
      p.className = 'letter-line body-text' + (line.type === 'emphasis' ? ' letter-line--emphasis' : '');
      p.textContent = line.text;
      linesContainer.appendChild(p);
    });
  }

  async function open(triggerEl) {
    if (!overlay) return;
    returnFocusTo = triggerEl || document.activeElement;
    overlay.dataset.visible = 'true';
    document.body.dataset.locked = 'true';
    releaseFocusTrap = Utils.trapFocus(card);
    if (closeBtn) closeBtn.focus();

    const lineEls = linesContainer.querySelectorAll('.letter-line');
    const stage = document.getElementById('response-stage');

    // Jika sudah pernah dibuka sebelumnya, langsung tampilkan semua tanpa jeda
    if (hasRevealedOnce) {
      lineEls.forEach((el) => (el.dataset.shown = 'true'));
      if (signature) signature.dataset.shown = 'true';
      if (stage) stage.hidden = false;
      return;
    }

    const reduced = Utils.prefersReducedMotion();
    await Utils.wait(reduced ? 0 : 350);

    for (const lineEl of lineEls) {
      lineEl.dataset.shown = 'true';
      await Utils.wait(reduced ? 30 : 950);
    }

    if (signature) {
      signature.dataset.shown = 'true';
    }

    hasRevealedOnce = true;

    if (typeof onFullyRevealed === 'function') {
      await Utils.wait(reduced ? 0 : 350);
      onFullyRevealed();
    }
  }

  function close() {
    if (!overlay) return;
    overlay.dataset.visible = 'false';
    document.body.dataset.locked = 'false';
    releaseFocusTrap();
    if (returnFocusTo && returnFocusTo.focus) returnFocusTo.focus();
  }

  return { init, open, close };
})();
