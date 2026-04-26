# Folder Gambar untuk Social Sharing

Letakkan gambar yang ingin ditampilkan saat link dibagikan ke WhatsApp / Instagram / Facebook di sini.

## Ukuran yang disarankan:

| Platform        | Ukuran Ideal   | Rasio  | Contoh Nama File      |
| --------------- | -------------- | ------ | --------------------- |
| WhatsApp Chat   | 1200 x 630 px  | 1.91:1 | `whatsapp-share.jpg`  |
| WhatsApp Story  | 1080 x 1920 px | 9:16   | `whatsapp-story.jpg`  |
| Instagram Story | 1080 x 1920 px | 9:16   | `instagram-story.jpg` |
| Instagram Post  | 1080 x 1080 px | 1:1    | `instagram-post.jpg`  |
| Facebook        | 1200 x 630 px  | 1.91:1 | `facebook-share.jpg`  |
| Twitter/X       | 1200 x 675 px  | 16:9   | `twitter-share.jpg`   |

## Cara Menggunakan

1. Letakkan gambar ke folder ini
2. Buka `index.html` dan ubah bagian `og:image` sesuai nama file yang Anda gunakan
3. Pastikan URL di `og:image` menggunakan **URL absolut** (dimulai dengan `https://`)

**Contoh:**
Jika Anda deploy ke `https://situsanda.com`, maka:

```html
<meta
  property="og:image"
  content="https://situsanda.com/images/whatsapp-share.jpg"
/>
```

**Note:** Platform seperti WhatsApp dan Instagram tidak bisa membaca gambar lokal (relative path). Gambar harus di-host di internet dengan URL lengkap.
