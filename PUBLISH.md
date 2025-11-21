# Yayınlama Talimatları

## 📦 NPM'e Yayınlama (Tüm Paket Yöneticileri İçin)

NPM'e yayınladığınızda paket **otomatik olarak** tüm paket yöneticilerinden erişilebilir olur:
- ✅ `npm install vue-hot-toast`
- ✅ `yarn add vue-hot-toast`
- ✅ `pnpm add vue-hot-toast`
- ✅ `bun add vue-hot-toast`

## 🚀 Yayınlama Adımları

### 1. Ön Hazırlık

```bash
# Bağımlılıkları yükle
npm install

# Projeyi build et
npm run build

# Type check yap (opsiyonel)
npm run typecheck
```

### 2. package.json Kontrolü

Yayınlamadan önce `package.json` dosyasında şunları kontrol edin:

- ✅ **name**: Paket adı benzersiz mi? (`vue-hot-toast` kontrol edin: https://www.npmjs.com/package/vue-hot-toast)
- ✅ **version**: Versiyon numarası doğru mu?
- ✅ **author**: İsminiz ve email adresiniz
- ✅ **repository.url**: GitHub repository URL'iniz
- ✅ **description**: Açıklama net ve anlaşılır mı?

### 3. NPM Hesabı Oluşturma/Giriş

```bash
# NPM hesabınız yoksa: https://www.npmjs.com/signup

# NPM'e giriş yapın
npm login

# Giriş yaptığınızı kontrol edin
npm whoami
```

### 4. Paket Adı Kontrolü

```bash
# Paket adının müsait olup olmadığını kontrol edin
npm view vue-hot-toast

# Eğer paket varsa, farklı bir isim kullanmanız gerekebilir
# Örnek: vue-hot-toast-notifications, @yourusername/vue-hot-toast
```

### 5. Lokal Test

```bash
# Paketi lokal olarak paketleyin
npm pack

# Oluşan .tgz dosyasını test projenizde deneyin
# Test projesinde:
npm install /path/to/vue-hot-toast-1.0.0.tgz
```

### 6. Versiyon Güncelleme

```bash
# Patch version (1.0.0 -> 1.0.1) - Bug fix
npm version patch

# Minor version (1.0.0 -> 1.1.0) - Yeni özellik
npm version minor

# Major version (1.0.0 -> 2.0.0) - Breaking change
npm version major

# Versiyon manuel olarak da değiştirilebilir (package.json'da)
```

### 7. Yayınlama

#### İlk Yayınlama (Public)

```bash
# Public olarak yayınla
npm publish --access public
```

#### Beta/Alpha Sürümü

```bash
# Beta tag ile yayınla
npm publish --tag beta

# Kullanım: npm install vue-hot-toast@beta
```

#### Scoped Package (Önerilen)

Eğer paket adı alınmışsa, scoped package kullanabilirsiniz:

```json
{
  "name": "@yourusername/vue-hot-toast"
}
```

Kullanım: `npm install @yourusername/vue-hot-toast`

### 8. Yayın Sonrası

```bash
# Git tag oluştur ve push et
git push --tags

# Değişiklikleri push et
git push origin main
```

## 📋 Yayınlama Öncesi Kontrol Listesi

- [ ] `package.json` dosyasındaki tüm alanlar dolduruldu
- [ ] `README.md` güncel ve eksiksiz
- [ ] `LICENSE` dosyası var
- [ ] `CHANGELOG.md` güncel (opsiyonel ama önerilir)
- [ ] Kod build edildi ve test edildi
- [ ] `.npmignore` doğru yapılandırıldı
- [ ] NPM hesabına giriş yapıldı
- [ ] Paket adı müsait
- [ ] Lokal test başarılı

## 🔄 Güncelleme Yayınlama

```bash
# Versiyonu güncelle
npm version patch  # veya minor, major

# Yayınla
npm publish

# Git'e push et
git push --tags && git push
```

## 🗑️ Paket Silme (Dikkatli!)

```bash
# 24 saat içinde silebilirsiniz
npm unpublish vue-hot-toast@1.0.0

# Tüm versiyonları silmek (çok dikkatli!)
npm unpublish vue-hot-toast --force
```

## 📊 Paket İstatistikleri

Yayınladıktan sonra paketinizi şu adresten takip edebilirsiniz:
- https://www.npmjs.com/package/vue-hot-toast
- https://npm-stat.com/charts.html?package=vue-hot-toast

## 🎯 Yayınlama Sonrası

1. **GitHub'a README ekleyin**: Repository'nize README.md ekleyin
2. **GitHub Releases**: Her versiyon için GitHub release oluşturun
3. **Dokümantasyon**: Gerekirse ayrı bir dokümantasyon sitesi oluşturun
4. **Topluluk**: Issues ve PR'ları takip edin

## ⚠️ Önemli Notlar

1. **Paket adı değiştirilemez**: İlk yayınlamadan sonra paket adını değiştiremezsiniz
2. **Versiyon geri alınamaz**: Yayınlanan bir versiyonu geri alamazsınız (24 saat içinde unpublish edilebilir)
3. **Scoped packages**: `@username/package-name` formatı daha güvenli
4. **2FA**: NPM hesabınızda 2FA'yı aktifleştirin

## 🆘 Sorun Giderme

### "You do not have permission to publish"
- NPM hesabınıza giriş yaptığınızdan emin olun: `npm whoami`
- Paket adı başka biri tarafından alınmış olabilir

### "Package name too similar"
- Farklı bir paket adı kullanın
- Scoped package kullanın: `@yourusername/vue-hot-toast`

### Build hatası
- `npm run build` komutunu çalıştırın
- `node_modules` klasörünü silip tekrar `npm install` yapın
