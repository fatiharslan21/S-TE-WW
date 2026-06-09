# Sevgiliye Özel Netlify + Decap CMS Site Paketi

Bu paket hazır tek sayfalık romantik site + admin panel altyapısıdır.

## Klasörler

- `index.html` ana sayfa
- `style.css` tasarım
- `script.js` içerikleri okuyan kod
- `content/site.json` site içerikleri
- `admin/config.yml` Decap CMS admin ayarı
- `uploads/` örnek fotoğraf alanı
- `netlify.toml` Netlify ayarı

## Lokal açma

Bilgisayarda klasörü açıp `index.html` dosyasına çift tıklayabilirsin.

Ama admin panelin düzgün çalışması için Netlify + GitHub bağlantısı gerekir.

## Netlify kurulumu

1. Bu klasörü GitHub'da yeni bir repoya yükle.
2. Netlify'a gir.
3. `Add new site` > `Import an existing project` seç.
4. GitHub reposunu bağla.
5. Build command boş kalsın.
6. Publish directory olarak `.` kalsın.
7. Deploy et.

## Admin paneli açma

Site yayınlanınca:

`https://site-adin.netlify.app/admin`

## Decap CMS aktif etmek için Netlify'da

1. Netlify site paneline gir.
2. `Site configuration` > `Identity` bölümünden Identity'yi aktif et.
3. Registration ayarını mümkünse `Invite only` yap.
4. `Services` > `Git Gateway` aktif et.
5. Kendini kullanıcı olarak davet et.
6. Mailden şifre oluştur.
7. `/admin` panelinden giriş yap.

## Fotoğraf ve yazı değiştirme

Admin panelde:

- Başlık
- Alt başlık
- Ana fotoğraf
- Galeri fotoğrafları
- Alttaki uzun mektup
- Renkler
- Zaman çizelgesi

alanlarını değiştirebilirsin.

Kaydedince GitHub'a commit atılır, Netlify otomatik yeniden yayınlar. Birkaç saniye / dakika sonra herkes güncel halini görür.

## Hızlı manuel değiştirme

Admin kurmadan önce `content/site.json` dosyasını açıp metinleri değiştirebilirsin.
Fotoğrafları `uploads` klasörüne atıp JSON içindeki yolları güncelle:

```json
"mainImage": "/uploads/bizim-foto.jpg"
```
