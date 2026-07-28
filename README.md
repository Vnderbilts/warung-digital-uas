# Warung Digital 🛒

App kasir & katalog produk sederhana untuk UMKM warung, dibuat dengan React Native (Expo).

## 📱 Domain
Domain C — Warung Digital

## ✨ Fitur
- Login / Register pemilik warung (tersimpan di AsyncStorage)
- Katalog produk (tambah, lihat, hapus produk — FlatList)
- Tambah produk dengan foto (expo-image-picker)
- Keranjang belanja dengan total harga otomatis
- Checkout → tersimpan sebagai riwayat transaksi
- Riwayat transaksi (persist setelah app ditutup)
- Profil pemilik warung + logout

## 🛠️ Tech Stack
- React Native + Expo SDK 51
- React Navigation (Native Stack + Bottom Tabs)
- AsyncStorage (`@react-native-async-storage/async-storage`)
- expo-image-picker

## 📂 Struktur Folder
```
WarungDigital-UAS/
├── App.js
├── app.json
├── eas.json
├── package.json
├── src/
│   ├── navigation/AppNavigator.js
│   ├── screens/
│   │   ├── LoginScreen.js
│   │   ├── KatalogScreen.js
│   │   ├── TambahProdukScreen.js
│   │   ├── KeranjangScreen.js
│   │   ├── RiwayatScreen.js
│   │   └── ProfilScreen.js
│   ├── components/
│   │   ├── ItemCard.js
│   │   ├── LoadingSpinner.js
│   │   └── EmptyState.js
│   ├── services/storage.js
│   └── constants/colors.js
└── assets/
```

## ▶️ Cara Menjalankan
```bash
npm install
npx expo start
```
Scan QR code dengan aplikasi **Expo Go** di HP.

## 📦 Build APK
```bash
npm install -g eas-cli
eas login
eas build --platform android --profile preview
```

## 🔗 Link
- GitHub Repo: `<isi link repo di sini>`
- Expo Snack: `<isi link snack di sini>`
- APK (EAS Build / Google Drive): `<isi link APK di sini>`

## 📸 Screenshots
Lihat folder `assets/screenshots/` (minimal 3 screenshot alur utama: Login → Katalog → Keranjang/Checkout).
