/*
  ============================================================
  BIRTHDAY CONFIG
  ============================================================
  Ini SATU-SATUNYA file yang perlu kamu ubah untuk mengganti
  isi website: nama, teks, foto, dan lagu.

  Tidak perlu paham HTML/CSS/JS untuk mengedit file ini.
  Cukup ganti teks di dalam tanda kutip " ... "
  dan nama file foto/musik di folder assets/.
  ============================================================
*/

window.birthdayConfig = {

  // Nama yang dirayakan — muncul di opening screen & ending
  name: "LISTIAWATI PUTRI PANGESTU",

  // ---------------------------------------------------------
  // OPENING SCREEN
  // ---------------------------------------------------------
  opening: {
    photo: "assets/images/cover.jpg",
    eyebrow: "A gift, sort of",
    title: "Happy Birthday,\nSayang",
    subtitle: "I made something for you...",
    buttonLabel: "Open"
  },

  // ---------------------------------------------------------
  // HERO / ALBUM SECTION — tampil setelah OPEN ditekan
  // ---------------------------------------------------------
  hero: {
    cover: "assets/images/cover.jpg",
    eyebrow: "Our Story",
    title: "Estu",
    description: "A little collection of our memories."
  },

  // ---------------------------------------------------------
  // LAGU — file MP3 kamu sendiri
  // ---------------------------------------------------------
  song: {
    title: "Our Song",
    artist: "Our little playlist",
    file: "assets/music/Plain_White_T_s_-_Hey_There_Delilah_New_Version_(mp3.pm)"
  },

  // ---------------------------------------------------------
  // MEMORY SECTIONS — tambah / kurangi objek di array ini
  // sebanyak yang kamu mau. Urutan array = urutan tampil.
  // ---------------------------------------------------------
  memories: [
    {
      label: "First Memory",
      image: "assets/images/memory-01.jpg",
      text: "The first time we talked, I didn't know it would turn into this. A random conversation that somehow never really ended."
    },
    {
      label: "Our Favorite Moment",
      image: "assets/images/memory-02.jpg",
      text: "That one afternoon we couldn't stop laughing over nothing in particular. I still think about it more than I probably should."
    },
    {
      label: "Little Things",
      image: "assets/images/memory-03.jpg",
      text: "The voice notes at 2am, the songs you sent \u201cjust because,\u201d the way you always steal the last bite. Small things, kept anyway."
    },
    {
      label: "Our Journey",
      image: "assets/images/memory-04.jpg",
      text: "From strangers to this. I don't think either of us planned it, and that's kind of my favorite part."
    }
  ],

  // ---------------------------------------------------------
  // SURAT — bagian pesan panjang / personal
  // ---------------------------------------------------------
  letter: {
    label: "A Letter For You",
    heading: "Before you close this...",
    body: "I wanted to make you something instead of just saying it. Thank you for every ordinary day you made feel like an occasion. I hope this year gives you everything you quietly hope for, and I hope I get to keep showing up in it.\n\nHappy birthday. I mean all of it."
  },

  // ---------------------------------------------------------
  // ENDING
  // ---------------------------------------------------------
  ending: {
    photo: "assets/images/memory-04.jpg",
    eyebrow: "One Last Thing...",
    title: "Happy Birthday,\nAlya",
    message: "Thank you for being part of my life.",
    signature: "— with love"
  }
};
