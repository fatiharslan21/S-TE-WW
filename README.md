# Sevgili Site - Şifreli Admin Panel

Bu paket Decap CMS kullanmaz. Admin panelde basit şifre vardır.

## Admin bilgisi

- Admin panel: `https://site-adin.netlify.app/admin.html`
- Varsayılan şifre: `emre`

## Kurulum

1. Bu klasörü GitHub reposuna yükle.
2. Netlify'da yeni site oluşturup GitHub reposuna bağla.
3. Build command boş kalabilir.
4. Publish directory: `.`
5. Netlify otomatik deploy etsin.
6. Admin panel: `/admin.html`

## Herkeste güncel görünmesi için önemli

Bu pakette kayıt işlemi Netlify Functions + Netlify Blobs ile yapılır.
Netlify deploy sonrasında admin panelden kaydedilen içerik herkes tarafından görülür.

## Şifreyi değiştirme

Netlify panelinde:

Site settings → Environment variables → Add variable

- Key: `ADMIN_PASSWORD`
- Value: istediğin şifre

Şifre ayarlamazsan varsayılan şifre `emre` olur.

## Fotoğraf notu

Admin panel fotoğrafları otomatik küçültüp base64 olarak kaydeder. Çok büyük fotoğraflarda hata alırsan fotoğrafları biraz kırp/küçült ve tekrar dene.

## Ses efekti

Sitede `sesi aç ✨` butonu vardır. Mobil tarayıcılar otomatik ses başlatmaya izin vermediği için ses kullanıcı butona basınca çalar.


## Kaydetme hatası alırsan

Bu sürüm fotoğrafları daha fazla sıkıştırır. Yine hata alırsan:

1. Projeyi ZIP sürükle-bırak ile değil GitHub repo üzerinden Netlify'a bağla.
2. Netlify deploy loglarında `npm install` ve `Functions bundling` satırlarının geçtiğinden emin ol.
3. Çok büyük fotoğraf yükleme. 4-5 fotoğraf toplamı Base64 olarak birkaç MB'ı geçerse Netlify Blobs kaydı reddedebilir.
4. Admin şifresi varsayılan: emre. İstersen Netlify Environment Variables kısmından `ADMIN_PASSWORD` olarak değiştirebilirsin.
