/**
 * Modul Perencana Kencan & Integrasi WhatsApp
 * -------------------------------------------
 * Mengelola pemilihan tanggal, waktu, suasana, dan makanan favorit.
 * Menggunakan kode Unicode escape (\u{...}) murni untuk emoji pesan WhatsApp
 * sehingga 100% aman dan tidak pernah berubah menjadi tanda tanya ()
 * di perangkat, browser, atau sistem operasi mana pun.
 */
window.Planner = (function () {
  const ICONS = {
    heart: '\u{1F90D}',        // 🤍
    sparkle: '\u{2728}',       // ✨
    calendar: '\u{1F4C5}',     // 📅
    clock: '\u{23F0}',        // ⏰
    coffee: '\u{2615}',        // ☕
    food: '\u{1F37D}\u{FE0F}', // 🍽️
    note: '\u{1F48C}',         // 💌
    smile: '\u{1F970}',        // 🥰
    blush: '\u{1F60A}',        // 😊
  };

  const state = {
    decision: 'yes',
    date: 'Sabtu Ini',
    time: 'Sore Golden Hour (16.00)',
    vibe: 'Coffee Shop Cozy & Estetik',
    food: 'Kopi & Pastry Manis',
    note: '',
  };

  let root;
  let _initialized = false;

  function init() {
    if (_initialized) return;   // Cegah duplikasi event listener
    root = document.getElementById('date-planner');
    if (!root) return;

    setupDateChips();
    setupCustomDateInput();
    setupTimeChips();
    setupVibeCards();
    setupFoodChips();
    setupNoteInput();
    setupWhatsAppButtons();
    updateTicketPreview();
    _initialized = true;
  }

  function setupDateChips() {
    const chips = root.querySelectorAll('.chip-date');
    const customDateWrap = document.getElementById('custom-date-wrap');
    const customInput = document.getElementById('custom-date-input');

    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        chips.forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');

        const val = chip.dataset.value;
        if (val === 'custom') {
          if (customDateWrap) customDateWrap.hidden = false;
          if (customInput && customInput.value) {
            state.date = formatDateIndo(customInput.value);
          } else {
            state.date = 'Tanggal Pilihan Iva';
          }
        } else {
          if (customDateWrap) customDateWrap.hidden = true;
          state.date = val;
        }
        updateTicketPreview();
      });
    });
  }

  function setupCustomDateInput() {
    const input = document.getElementById('custom-date-input');
    if (!input) return;

    const today = new Date().toISOString().split('T')[0];
    input.min = today;

    input.addEventListener('change', () => {
      if (input.value) {
        state.date = formatDateIndo(input.value);
        updateTicketPreview();
      }
    });
  }

  function formatDateIndo(dateString) {
    if (!dateString) return 'Tanggal Pilihan Iva';
    try {
      const parts = dateString.split('-');
      const d = new Date(parts[0], parts[1] - 1, parts[2]);
      const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
      ];
      return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    } catch {
      return dateString;
    }
  }

  function setupTimeChips() {
    const chips = root.querySelectorAll('.chip-time');
    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        chips.forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        state.time = chip.dataset.value;
        updateTicketPreview();
      });
    });
  }

  function setupVibeCards() {
    const cards = root.querySelectorAll('.vibe-card');
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        cards.forEach((c) => c.classList.remove('active'));
        card.classList.add('active');
        state.vibe = card.dataset.value;
        updateTicketPreview();
      });
    });
  }

  function setupFoodChips() {
    const chips = root.querySelectorAll('.chip-food');
    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        chips.forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        state.food = chip.dataset.value;
        updateTicketPreview();
      });
    });
  }

  function setupNoteInput() {
    const noteEl = document.getElementById('planner-note');
    if (!noteEl) return;
    noteEl.addEventListener('input', (e) => {
      state.note = e.target.value.trim();
      updateTicketPreview();
    });
  }

  function updateTicketPreview() {
    const ticketDate = document.getElementById('ticket-date');
    const ticketTime = document.getElementById('ticket-time');
    const ticketVibe = document.getElementById('ticket-vibe');
    const ticketFood = document.getElementById('ticket-food');
    const ticketStamp = document.getElementById('ticket-stamp');

    if (ticketDate) ticketDate.textContent = state.date || 'Sabtu Ini';
    if (ticketTime) ticketTime.textContent = state.time || 'Sore Golden Hour (16.00)';
    if (ticketVibe) ticketVibe.textContent = state.vibe || 'Coffee Shop Cozy & Estetik';
    if (ticketFood) ticketFood.textContent = state.food || 'Kopi & Pastry Manis';

    if (ticketStamp) {
      if (state.decision === 'discuss') {
        ticketStamp.textContent = 'Cocokin Jadwal Bareng';
      } else {
        ticketStamp.textContent = 'Terkonfirmasi Cinta';
      }
    }
  }

  function setupWhatsAppButtons() {
    const sendBtn = document.getElementById('btn-send-wa');
    const discussBtn = document.getElementById('btn-discuss-wa');
    const phone = window.SiteData.whatsappNumber || '6287775647398';

    if (sendBtn) {
      // Hapus event listener lama jika ada (clone node trick)
      const freshSend = sendBtn.cloneNode(true);
      sendBtn.parentNode.replaceChild(freshSend, sendBtn);

      freshSend.addEventListener('click', function onSendClick() {
        if (window.Particles && window.Particles.burst) {
          window.Particles.burst(freshSend, 28);
        }

        const noteText = state.note ? state.note : 'Biar jadi kejutan manis!';
        let message = '';

        if (state.decision === 'discuss') {
          message =
`Halo Fazril! ${ICONS.heart}

Aku mau jalan bareng kamu, tapi yuk kita *cocokin jadwal dulu* yaa! ${ICONS.blush}

Ini perkiraan hari dan waktu yang paling pas buat aku:
${ICONS.calendar} *Pilihan Hari :* ${state.date}
${ICONS.clock} *Waktu :* ${state.time}
${ICONS.coffee} *Suasana :* ${state.vibe}
${ICONS.food} *Makanan :* ${state.food}
${ICONS.note} *Catatan Iva :* ${noteText}

Nanti kabari aku yaa kalau jadwalnya udah pas! ${ICONS.blush}`;
        } else {
          message =
`Halo Fazril! ${ICONS.heart}

Aku udah buka websitenya, dan jawabannya... *IYA, aku mau jalan bareng kamu!* ${ICONS.sparkle}

Berikut rencana kencan yang aku pilih:
${ICONS.calendar} *Hari/Tanggal :* ${state.date}
${ICONS.clock} *Waktu :* ${state.time}
${ICONS.coffee} *Suasana :* ${state.vibe}
${ICONS.food} *Makanan :* ${state.food}
${ICONS.note} *Catatan Iva :* ${noteText}

Ditunggu yaa, sampai ketemu! ${ICONS.smile}`;
        }

        const waUrl = `https://api.whatsapp.com/send/?phone=${phone}&text=${encodeURIComponent(message)}`;
        window.open(waUrl, '_blank', 'noopener,noreferrer');

        const successBanner = document.getElementById('planner-success');
        if (successBanner) {
          successBanner.hidden = false;
          successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    }

    if (discussBtn) {
      // Hapus event listener lama jika ada (clone node trick)
      const freshDiscuss = discussBtn.cloneNode(true);
      discussBtn.parentNode.replaceChild(freshDiscuss, discussBtn);

      freshDiscuss.addEventListener('click', function onDiscussClick() {
        const message =
`Halo Fazril! ${ICONS.heart}

Aku udah baca surat di websitenya. Aku mau ngobrol santai dulu di WhatsApp yaa! ${ICONS.blush}`;

        const waUrl = `https://api.whatsapp.com/send/?phone=${phone}&text=${encodeURIComponent(message)}`;
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      });
    }
  }

  function setDecision(decision) {
    state.decision = decision;
    updateTicketPreview();
  }

  return { init, setDecision };
})();
