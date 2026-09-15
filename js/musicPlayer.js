/**
 * Pemutar Musik Romantis
 * -----------------------
 * Memutar lagu Christina Perri - A Thousand Years dengan transisi fade-in lembut
 * saat Iva menekan tombol buka di layar pembuka, atau melalui tombol pemutar
 * di sudut layar.
 */
window.MusicPlayer = (function () {
  let root, btn, audio, label, playing = false;
  let fadeInterval = null;

  function init() {
    root = document.getElementById('music-player');
    btn = document.getElementById('music-toggle');
    audio = document.getElementById('background-audio');
    label = document.getElementById('music-label');

    const song = window.SiteData.song;
    if (song && song.src) {
      audio.src = song.src;
    }
    if (song && song.title) {
      label.textContent = song.title;
    }

    audio.volume = 0.7;

    btn.addEventListener('click', toggle);
    audio.addEventListener('play', () => setPlaying(true));
    audio.addEventListener('pause', () => setPlaying(false));
    audio.addEventListener('error', handleAudioError);
    audio.addEventListener('ended', () => {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    });
  }

  function playWithFadeIn(targetVolume = 0.75, duration = 1500) {
    if (!audio) return;
    audio.volume = 0;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setPlaying(true);
          fadeIn(targetVolume, duration);
        })
        .catch(() => {
          // Autoplay kebijakan browser memblokir sebelum interaksi
          setPlaying(false);
        });
    }
  }

  function fadeIn(targetVolume, duration) {
    clearInterval(fadeInterval);
    const stepTime = 50;
    const steps = duration / stepTime;
    const stepVolume = targetVolume / steps;

    fadeInterval = setInterval(() => {
      if (audio.volume + stepVolume >= targetVolume) {
        audio.volume = targetVolume;
        clearInterval(fadeInterval);
      } else {
        audio.volume = Math.min(1, audio.volume + stepVolume);
      }
    }, stepTime);
  }

  function toggle() {
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play()
        .then(() => setPlaying(true))
        .catch(handleAudioError);
    }
  }

  function setPlaying(value) {
    playing = value;
    if (root) {
      root.dataset.playing = String(value);
    }
    if (btn) {
      btn.setAttribute('aria-pressed', String(value));
      btn.setAttribute('aria-label', value ? 'Jeda musik' : 'Putar lagu untuk Iva');
    }
  }

  function handleAudioError() {
    if (label) {
      label.textContent = 'Klik untuk putar lagu';
    }
  }

  return {
    init,
    toggle,
    playWithFadeIn,
    isPlaying: () => playing,
  };
})();
