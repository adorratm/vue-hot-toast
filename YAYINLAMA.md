# 🚀 Yayınlama Rehberi (Türkçe)

## Hızlı Başlangıç

### 1. NPM Hesabı Oluştur/Giriş Yap

```bash
# NPM hesabı: https://www.npmjs.com/signup
npm login
```

### 2. package.json'u Düzenle

`package.json` dosyasında şunları güncelleyin:
- `author`: İsminiz ve email
- `repository.url`: GitHub repo URL'iniz
- `name`: Paket adı (eğer `vue-hot-toast` alınmışsa farklı bir isim)

### 3. Build ve Test

```bash
npm install
npm run build
npm pack  # Lokal test için
```

### 4. Yayınla

```bash
npm publish --access public
```

## ✅ Yayınlandıktan Sonra

Paket **otomatik olarak** tüm paket yöneticilerinden erişilebilir olur:

```bash
# NPM
npm install vue-hot-toast

# Yarn
yarn add vue-hot-toast

# pnpm
pnpm add vue-hot-toast

# Bun
bun add vue-hot-toast
```

## 📝 Detaylı Talimatlar

Detaylı talimatlar için `PUBLISH.md` dosyasına bakın.

