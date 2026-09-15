/**
 * Data & Konten Situs Undangan Iva
 * --------------------------------
 * Seluruh konten, teks puitis, galeri foto asli Iva, pilihan rencana kencan,
 * dan integrasi WhatsApp ke nomor Fazril (087775647398).
 * Sepenuhnya dalam Bahasa Indonesia yang hangat, tulus, dan natural.
 */
window.SiteData = {
  recipientName: 'Iva Latifah Widi Rahmadina',
  recipientNick: 'Iva',
  senderName: 'Fazril',
  whatsappNumber: '6287775647398',

  song: {
    title: 'Christina Perri - A Thousand Years',
    artist: 'Christina Perri',
    src: 'assets/audio/Christina_Perri_-_Thousand_years.mp3',
  },

  hero: {
    badge: 'Sebuah Undangan Khusus',
    greeting: 'Hai, Iva...',
    title: 'Iva Latifah Widi Rahmadina',
    subtitle: 'Tentang hari-hari biasa yang selalu terasa jauh lebih hangat dan istimewa setiap kali ada kamu.',
  },

  reasons: [
    {
      num: '01',
      title: 'Obrolan yang Selalu Menghidupkan Suasana',
      description: 'Entah kenapa, setiap kali cerita sama kamu, waktu selalu berasa berjalan terlalu cepat. Dari obrolan receh sampai cerita seru, semuanya selalu terasa begitu nyaman.',
    },
    {
      num: '02',
      title: 'Senyuman Manis yang Bikin Tenang',
      description: 'Ada keteduhan tersendiri tiap melihat senyum kamu. Energinya selalu berhasil mengubah hari yang penat jadi jauh lebih ringan dan menyenangkan.',
    },
    {
      num: '03',
      title: 'Ingin Menciptakan Momen Istimewa Berdua',
      description: 'Menghabiskan waktu dengan seseorang yang dikagumi bukan sekadar jalan biasa, tapi tentang mengukir cerita kecil yang bakal kita ingat sambil tersenyum.',
    },
  ],

  gallery: [
    {
      id: 'photo-1',
      src: 'assets/photos/iva-portrait-main.jpg',
      alt: 'Iva dengan senyum anggun dan busana krem',
      caption: 'Keanggunan yang terpancar begitu natural.',
      subcaption: 'Salah satu potret favorit yang selalu bikin kagum setiap kali dilihat.',
      tag: 'Potret Favorit',
      ratio: '1/1',
      rotation: '-2deg',
    },
    {
      id: 'photo-2',
      src: 'assets/photos/iva-outdoor-sun.jpg',
      alt: 'Iva tersenyum manis di bawah sinar matahari hangat',
      caption: 'Cahaya ceria di hari yang hangat.',
      subcaption: 'Senyuman lepas yang selalu membawa suasana ceria bagi siapa pun di dekatmu.',
      tag: 'Sinar Hangat',
      ratio: '9/16',
      rotation: '2.5deg',
    },
    {
      id: 'photo-3',
      src: 'assets/photos/iva-cafe-warm.jpg',
      alt: 'Iva duduk santai di suasana kafe bernuansa hangat',
      caption: 'Malam tenang dengan obrolan yang mengalir.',
      subcaption: 'Duduk berdua di tempat yang nyaman, menikmati waktu tanpa terburu-buru.',
      tag: 'Malam Tenang',
      ratio: '4/5',
      rotation: '-1.5deg',
    },
    {
      id: 'photo-4',
      src: 'assets/photos/iva-evening-chic.jpg',
      alt: 'Iva berbusana hitam dengan pesona yang memikat',
      caption: 'Pesona manis yang selalu memikat hati.',
      subcaption: 'Kesan anggun dan tatapan hangat yang membuat suasana malam jadi begitu indah.',
      tag: 'Pesona Anggun',
      ratio: '9/16',
      rotation: '1.8deg',
    },
    {
      id: 'photo-5',
      src: 'assets/photos/iva-cafe-candid.jpg',
      alt: 'Iva tersenyum manis dengan pose candid',
      caption: 'Tawa manis yang paling berkesan.',
      subcaption: 'Momen spontan yang selalu jadi pengingat betapa manisnya senyummu.',
      tag: 'Senyum Tulus',
      ratio: '4/5',
      rotation: '-2.2deg',
    },
  ],

  dateConcepts: [
    {
      num: 'Pilihan 01',
      title: 'Ngopi Santai & Obrolan Hangat',
      tagline: 'Cozy, Santai, & Penuh Cerita',
      desc: 'Mencari coffee shop dengan ambience tenang, duduk berhadapan memesan kopi atau minuman favorit, dan ngobrol tanpa henti.',
      items: ['Ambience estetik & nyaman', 'Kopi & pastry hangat', 'Obrolan panjang dari hati ke hati'],
    },
    {
      num: 'Pilihan 02',
      title: 'Jalan Sore & Berburu Gelato',
      tagline: 'Manis, Segar, & Golden Hour',
      desc: 'Menikmati angin sore yang sejuk, berjalan santai sambil bercerita, lalu mampir menikmati gelato dingin dengan rasa kesukaanmu.',
      items: ['Golden hour sunset', 'Gelato manis & camilan', 'Jalan santai tanpa beban pikiran'],
    },
    {
      num: 'Pilihan 03',
      title: 'Makan Malam Romantis & Istimewa',
      tagline: 'Elegan, Lezat, & Berkesan',
      desc: 'Menikmati sajian hidangan lezat dalam suasana malam yang syahdu dan hangat, menutup hari dengan momen yang berkesan.',
      items: ['Menu makanan spesial', 'Suasana romantis bernuansa temaram', 'Momen berdua yang tak terlupakan'],
    },
  ],

  letterLines: [
    { text: 'Hai, Iva...', type: 'emphasis' },
    { text: 'Dari sekian banyak hari yang berjalan...' },
    { text: 'Waktu-waktu di mana aku bisa ngobrol dan melihat senyummu selalu jadi bagian yang paling aku tunggu.' },
    { text: 'Rasanya menyenangkan bisa mengenal seseorang yang seistimewa kamu.' },
    { text: 'Karena itu, aku ingin mengajak kamu meluangkan waktu berdua sebentar...' },
    { text: 'Bukan acara formal yang kaku, tapi waktu santai di mana kita bisa jalan, makan enak, dan berbagi tawa.' },
    { text: 'Maukah kamu jalan bareng aku?', type: 'emphasis' },
  ],

  planner: {
    timeOptions: [
      { id: 't-sunset', label: 'Sore Golden Hour (16.00)', desc: 'Pas buat jalan santai & ngopi sore' },
      { id: 't-dinner', label: 'Malam / Dinner (19.00)', desc: 'Suasana syahdu & makan malam santai' },
      { id: 't-afternoon', label: 'Siang Santai (13.00)', desc: 'Makan siang & ngobrol ceria' },
      { id: 't-flexible', label: 'Fleksibel / Kapan Saja Iva Sempat', desc: 'Waktu disesuaikan sama jadwal Iva' },
    ],

    vibeOptions: [
      { id: 'v-cafe', label: 'Coffee Shop Cozy & Estetik', icon: '☕' },
      { id: 'v-dinner', label: 'Dinner Romantis & Hangat', icon: '🕯️' },
      { id: 'v-gelato', label: 'Jalan Santai Sore & Gelato', icon: '🍦' },
      { id: 'v-surprise', label: 'Biar Fazril yang Kasih Kejutan ✨', icon: '🎁' },
    ],

    foodOptions: [
      { id: 'f-pasta', label: 'Pasta / Western Food' },
      { id: 'f-japanese', label: 'Sushi / Japanese Food' },
      { id: 'f-nusantara', label: 'Comfort Food Nusantara' },
      { id: 'f-sweet', label: 'Kopi, Pastry, & Manis-manis' },
      { id: 'f-any', label: 'Terserah Fazril, yang Penting Enak!' },
    ],
  },
};
