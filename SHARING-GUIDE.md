# Panduan Menampilkan Gambar saat Berbagi Link

Gambar sudah disiapkan di folder `public/images/`:

- `logo.png` → untuk favicon dan ikon aplikasi
- `banner.png` → untuk preview saat dibagikan ke WhatsApp/Instagram/Facebook/Twitter

---

## Cara Kerja

Saat aplikasi di-build dengan Vite, folder `public/` akan otomatis di-copy ke root folder hasil build. Jadi setelah deploy:

- Gambar banner akan tersedia di: `https://domain-anda.com/images/banner.png`
- Gambar logo akan tersedia di: `https://domain-anda.com/images/logo.png`

---

## Langkah 1: Deploy Aplikasi

Anda perlu deploy aplikasi ke hosting/production agar WhatsApp/Instagram bisa membaca gambar preview. Pilih salah satu:

| Hosting              | Cara Deploy                                    |
| -------------------- | ---------------------------------------------- |
| **Vercel**           | Import repo GitHub, otomatis deploy            |
| **Netlify**          | Drag & drop folder `dist/` atau connect GitHub |
| **GitHub Pages**     | Push ke branch `gh-pages`                      |
| **Cloudflare Pages** | Connect repo GitHub                            |

Setelah deploy, Anda akan mendapatkan URL seperti:

```
https://aas-pak-2026.vercel.app
```

---

## Langkah 2: Update URL di index.html

Setelah mendapatkan domain, buka `index.html` dan ganti path relatif menjadi URL absolut.

**Sebelum (lokal):**

```html
<meta property="og:image" content="/images/banner.png" />
<meta name="twitter:image" content="/images/banner.png" />
```

**Sesudah (production):**

```html
<meta
  property="og:image"
  content="https://aas-pak-2026.vercel.app/images/banner.png"
/>
<meta
  name="twitter:image"
  content="https://aas-pak-2026.vercel.app/images/banner.png"
/>
```

**Juga update `og:url`:**

```html
<meta property="og:url" content="https://aas-pak-2026.vercel.app" />
```

---

## Langkah 3: Build & Deploy Ulang

```bash
npm run build
```

Kemudian deploy ulang folder `dist/` ke hosting Anda.

---

## Langkah 4: Test Preview

Setelah deploy, test dengan cara:

1. **WhatsApp** → Kirim link ke chat atau story
2. **Instagram** → Paste link di DM atau story
3. **Facebook** → Paste link di status
4. **Twitter/X** → Tweet link

Atau gunakan tool debug:

- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

---

## Tips Ukuran Gambar

| Platform        | Ukuran Ideal   | Rasio  |
| --------------- | -------------- | ------ |
| WhatsApp Chat   | 1200 x 630 px  | 1.91:1 |
| WhatsApp Story  | 1080 x 1920 px | 9:16   |
| Instagram Story | 1080 x 1920 px | 9:16   |
| Instagram Post  | 1080 x 1080 px | 1:1    |
| Facebook        | 1200 x 630 px  | 1.91:1 |

Jika ingin gambar berbeda untuk story (vertikal), tambahkan file baru misalnya `story.png` di `public/images/`, lalu update meta tag-nya.

---

## Catatan Penting

- WhatsApp dan Instagram **tidak bisa** membaca gambar dari `localhost` atau path lokal
- URL gambar harus **absolut** (dimulai dengan `https://`)
- Setelah mengganti gambar, tunggu beberapa menit atau clear cache sebelum test ulang
