# Askeri Asistan Web Uygulaması

## 📱 Telefonda Kullanım

Bu uygulama telefonunuzdan direkt kullanabileceğiniz bir PWA (Progressive Web App) uygulamasıdır.

## 🚀 Kurulum Adımları

### 1. Dosyaları Hosting'e Yükle

Aşağıdaki platformlardan birini kullan (ücretsiz):

#### GitHub Pages (Önerilen)
1. GitHub hesabı aç: https://github.com
2. Yeni repository oluştur (public)
3. Tüm dosyaları yükle
4. Settings → Pages → Source: main branch seç
5. Birkaç dakika sonra siteniz hazır!

#### Netlify
1. https://netlify.com adresine git
2. ZIP dosyasını sürükle-bırak
3. Site otomatik yayınlanır

#### Vercel
1. https://vercel.com adresine git
2. GitHub ile bağlan
3. Repository'yi deploy et

### 2. Telefona Ekle

1. Uygulamanın URL'ini telefonun tarayıcısında aç
2. Safari (iOS): Paylaş → Ana Ekrana Ekle
3. Chrome (Android): Menü → Ana Ekrana Ekle

## 📂 Dosya Yapısı

```
Askeri_Asistan_Web_App/
│
├── index.html              # Ana sayfa
├── styles.css              # Stil dosyası
├── app.js                  # Ana uygulama
├── service-worker.js       # Offline çalışma
├── service-worker-register.js
├── manifest.json           # PWA ayarları
├── icon-192.png           # Uygulama ikonu (küçük)
├── icon-512.png           # Uygulama ikonu (büyük)
└── README.md              # Bu dosya
```

## ✨ Özellikler

✅ Çevrimdışı çalışma
✅ Mobil uyumlu tasarım
✅ Koyu/taktik tema
✅ Hızlı arama
✅ Detaylı bilgi görüntüleme
✅ Ana ekrana eklenebilir

## 🔧 Özelleştirme

- Veri eklemek için `app.js` dosyasındaki `SAMPLE_LEGISLATION` ve `SAMPLE_WEAPONS` dizilerine yeni öğeler ekle
- Renkleri değiştirmek için `styles.css` içindeki `#4a7c59` rengini değiştir
- İkonları değiştirmek için `icon-192.png` ve `icon-512.png` dosyalarını değiştir

## 📞 Destek

Herhangi bir sorun olursa:
- Tarayıcının önbelleğini temizle
- Uygulamayı ana ekrandan kaldır ve tekrar ekle
- Farklı bir tarayıcıda dene

## 🎯 İpuçları

- İlk açılışta internet bağlantısı gerekir
- Sonrasında çevrimdışı çalışır
- Düzenli olarak internete bağlanarak güncellemeleri al
