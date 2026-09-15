/**
 * Galeri Foto & Lightbox Modal
 * ----------------------------
 * Menghadirkan tampilan foto polaroid yang berkesan sentimental,
 * serta modal penampil foto layar penuh (Lightbox) saat foto diklik.
 */
window.Gallery = (function () {
  let modal, modalImg, modalCaption, modalSubcaption, modalTag, closeBtn;

  function init() {
    modal = document.getElementById('photo-lightbox');
    if (!modal) return;

    modalImg = modal.querySelector('.lightbox__img');
    modalCaption = modal.querySelector('.lightbox__caption');
    modalSubcaption = modal.querySelector('.lightbox__subcaption');
    modalTag = modal.querySelector('.lightbox__tag');
    closeBtn = modal.querySelector('.lightbox__close');

    // Hubungkan semua kartu foto
    const photoItems = document.querySelectorAll('.polaroid[data-photo-id]');
    photoItems.forEach((item) => {
      item.addEventListener('click', () => {
        const id = item.dataset.photoId;
        const photoData = window.SiteData.gallery.find((p) => p.id === id);
        if (photoData) {
          openLightbox(photoData);
        }
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeLightbox);
    }

    modal.querySelector('.lightbox__scrim').addEventListener('click', closeLightbox);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.dataset.visible === 'true') {
        closeLightbox();
      }
    });
  }

  function openLightbox(data) {
    modalImg.src = data.src;
    modalImg.alt = data.alt;
    modalCaption.textContent = data.caption;
    modalSubcaption.textContent = data.subcaption;
    modalTag.textContent = data.tag;

    modal.dataset.visible = 'true';
    document.body.dataset.locked = 'true';
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    modal.dataset.visible = 'false';
    document.body.dataset.locked = 'false';
  }

  return { init, openLightbox, closeLightbox };
})();
