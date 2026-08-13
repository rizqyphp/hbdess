# Birthday Website — Panduan Singkat

Website ini murni HTML/CSS/JS statis — tidak butuh backend, database,
atau proses build. Bisa langsung di-deploy ke Vercel.

## Struktur folder

```
birthday-website/
├── index.html          ← struktur halaman (jarang perlu diubah)
├── style.css            ← tampilan (jarang perlu diubah)
├── script.js             ← logika (jarang perlu diubah)
├── config.js            ← SEMUA teks, foto, dan lagu — edit di sini
└── assets/
    ├── images/           ← taruh foto kamu di sini
    └── music/            ← taruh MP3 kamu di sini
```

## 1. Ganti nama & teks

Buka `config.js`. Setiap baris di dalam tanda kutip `" ... "` bisa
kamu ganti bebas — tidak akan merusak website selama tanda kutipnya
tetap ada. Contoh:

```js
name: "Alya",                 // ganti nama
opening: {
  title: "Happy Birthday,\nAlya",   // \n artinya baris baru
  subtitle: "I made something for you...",
  buttonLabel: "Open"
}
```

## 2. Ganti foto

1. Masukkan file foto kamu ke folder `assets/images/`.
2. Di `config.js`, arahkan `photo` / `image` / `cover` ke nama file
   tersebut, misalnya:

```js
opening: {
  photo: "assets/images/cover.jpg",
}
```

Format JPG/PNG/WebP semua didukung. Foto otomatis menyesuaikan
ukuran layar (tidak akan pecah atau terpotong aneh). Selama foto
belum dimasukkan, area itu akan tampil sebagai placeholder gelap
polos — tidak error.

## 3. Tambah / kurangi kenangan (memory sections)

Bagian "SECTION 01, 02, 03..." diatur oleh array `memories` di
`config.js`. Untuk menambah, cukup salin satu blok `{ ... }` dan
tempel lagi di dalam array — website otomatis menyesuaikan, tidak
perlu sentuh HTML sama sekali:

```js
memories: [
  { label: "First Memory", image: "assets/images/memory-01.jpg", text: "..." },
  { label: "Judul Baru",   image: "assets/images/memory-05.jpg", text: "Cerita baru di sini..." },
]
```

## 4. Ganti lagu

1. Masukkan file MP3 ke `assets/music/`, misalnya `our-song.mp3`.
2. Di `config.js`:

```js
song: {
  title: "Our Song",
  artist: "Our little playlist",
  file: "assets/music/our-song.mp3"
}
```

Lagu mulai diputar otomatis begitu tombol **OPEN** ditekan (ini wajib
di Android — browser memblokir autoplay sebelum ada interaksi dari
user). Musik tidak akan restart saat berpindah section, dan bila
file MP3 belum ada, website tetap berjalan normal tanpa error —
tombol play hanya belum aktif sampai file-nya ditambahkan.

## 5. Ganti pesan surat & ending

Masih di `config.js`, lihat bagian `letter` dan `ending` — sama,
tinggal ganti teks di dalam tanda kutip.

## 6. Menjalankan di lokal (opsional)

Buka `index.html` langsung di browser, atau untuk hasil yang lebih
akurat (terutama audio), jalankan local server sederhana:

```
npx serve .
```

## 7. Deploy ke Vercel

1. Push folder ini ke repo GitHub, atau upload langsung.
2. Di Vercel: **New Project → Import** → pilih repo ini.
3. Framework preset: **Other** (static site) — tidak perlu build
   command, tidak perlu output directory khusus.
4. Deploy. Selesai — link Vercel-nya siap dibagikan.
