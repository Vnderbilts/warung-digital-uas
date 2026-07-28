import AsyncStorage from '@react-native-async-storage/async-storage';

// Semua key data yang disimpan di device (memenuhi syarat "minimal 2 jenis data berbeda")
export const StorageKeys = {
  SESSION: 'warung_session',   // data akun pemilik warung
  PRODUCTS: 'warung_products', // data katalog produk
  CART: 'warung_cart',         // data keranjang belanja
  HISTORY: 'warung_history',   // data riwayat transaksi
};

export async function saveData(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error('Gagal menyimpan data:', e);
    return false;
  }
}

export async function loadData(key) {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Gagal memuat data:', e);
    return null;
  }
}

export async function clearData(key) {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e) {
    console.error('Gagal menghapus data:', e);
    return false;
  }
}

export async function clearAll() {
  try {
    await AsyncStorage.multiRemove(Object.values(StorageKeys));
    return true;
  } catch (e) {
    console.error('Gagal menghapus semua data:', e);
    return false;
  }
}
