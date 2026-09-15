/**
 * Main
 * ----
 * Menghubungkan seluruh modul: membuka sampul, lagu latar,
 * animasi amplop & surat, respon jawaban (Iya / Atur Jadwal),
 * serta transisi mulus ke perencana kencan tanpa ada bagian yang kosong.
 */
(function () {
  function initOpening() {
    const opening = document.getElementById('opening');
    const cta = document.getElementById('opening-cta');

    cta.addEventListener('click', () => {
      opening.dataset.open = 'true';
      document.body.dataset.locked = 'false';
      document.querySelector('main').removeAttribute('inert');
      document.getElementById('music-player').removeAttribute('inert');
      
      // Mulai partikel kelopak bunga
      window.Particles.start();

      // Mulai lagu Christina Perri - A Thousand Years dengan fade-in lembut
      if (window.MusicPlayer && window.MusicPlayer.playWithFadeIn) {
        window.MusicPlayer.playWithFadeIn(0.75, 1800);
      }

      // Fokus ke judul
      const heroHeading = document.getElementById('hero-heading');
      if (heroHeading) {
        heroHeading.setAttribute('tabindex', '-1');
        heroHeading.focus();
      }
    });
  }

  function initScrollReveals() {
    document.querySelectorAll('.reveal').forEach((el) => {
      Utils.onEnterView(el, () => {
        el.dataset.visible = 'true';
      });
    });
  }

  function initEnvelopeFlow() {
    const envelopeBtn = document.getElementById('envelope');

    window.Letter.init({
      onFullyRevealed: showResponseStage,
    });

    window.Envelope.init(envelopeBtn, () => {
      window.Letter.open(envelopeBtn);
    });
  }

  function showResponseStage() {
    const stage = document.getElementById('response-stage');
    if (stage) {
      stage.hidden = false;
      const yesBtn = document.getElementById('btn-yes');
      if (yesBtn) yesBtn.focus();
    }
  }

  function goToPlanner(decision) {
    if (window.Planner && window.Planner.setDecision) {
      window.Planner.setDecision(decision);
    }
    window.Letter.close();

    setTimeout(() => {
      const plannerSec = document.getElementById('planner-section');
      if (plannerSec) {
        // Pastikan seluruh elemen di dalam seksi perencana langsung tampil terlihat
        plannerSec.querySelectorAll('.reveal').forEach((el) => {
          el.dataset.visible = 'true';
        });
        const datePlanner = document.getElementById('date-planner');
        if (datePlanner) {
          datePlanner.dataset.visible = 'true';
        }

        plannerSec.scrollIntoView({ behavior: 'smooth' });
        
        const heading = document.getElementById('planner-heading');
        if (heading) {
          heading.setAttribute('tabindex', '-1');
          heading.focus();
        }
      }
    }, 280);
  }

  function initResponses() {
    const yesBtn = document.getElementById('btn-yes');
    const maybeBtn = document.getElementById('btn-maybe');
    const replyYes = document.getElementById('reply-yes');
    const replyMaybe = document.getElementById('reply-maybe');
    const choiceButtons = document.getElementById('choice-buttons');
    const planBtn = document.getElementById('btn-plan');
    const planMaybeBtn = document.getElementById('btn-plan-maybe');

    if (yesBtn) {
      yesBtn.addEventListener('click', () => {
        window.Particles.burst(yesBtn, 28);
        choiceButtons.hidden = true;
        replyMaybe.hidden = true;
        replyYes.hidden = false;
        
        const card = document.querySelector('.letter-card');
        card.classList.remove('glow-pulse');
        void card.offsetWidth;
        card.classList.add('glow-pulse');
        
        const heading = replyYes.querySelector('.reply-card__heading');
        if (heading) heading.focus();
      });
    }

    if (maybeBtn) {
      maybeBtn.addEventListener('click', () => {
        choiceButtons.hidden = true;
        replyYes.hidden = true;
        replyMaybe.hidden = false;
        
        const card = document.querySelector('.letter-card');
        card.classList.remove('glow-pulse');
        void card.offsetWidth;
        card.classList.add('glow-pulse');

        const heading = replyMaybe.querySelector('.reply-card__heading');
        if (heading) heading.focus();
      });
    }

    if (planBtn) {
      planBtn.addEventListener('click', () => goToPlanner('yes'));
    }

    if (planMaybeBtn) {
      planMaybeBtn.addEventListener('click', () => goToPlanner('discuss'));
    }
  }

  function initLoveCounter() {
    const loveBtn = document.getElementById('btn-love-counter');
    const loveCount = document.getElementById('love-count');
    if (!loveBtn || !loveCount) return;

    let count = 28;
    loveBtn.addEventListener('click', () => {
      count += 1;
      loveCount.textContent = count;
      window.Particles.burst(loveBtn, 14);
      loveBtn.classList.add('pulse-pop');
      setTimeout(() => loveBtn.classList.remove('pulse-pop'), 400);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initOpening();
    initScrollReveals();
    initEnvelopeFlow();
    initResponses();
    initLoveCounter();
    window.MusicPlayer.init();
    window.Gallery.init();
    window.Planner.init();
  });
})();
