import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ItemCard from '../components/ItemCard';
import EmptyState from '../components/EmptyState';
import LoadingSpinner from '../components/LoadingSpinner';
import { COLORS } from '../constants/colors';
import { loadData, saveData, StorageKeys } from '../services/storage';

export default function KeranjangScreen() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    setLoading(true);
    const data = await loadData(StorageKeys.CART);
    setCart(data || []);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchCart();
    }, [])
  );

  const total = cart.reduce((sum, item) => sum + item.harga * item.qty, 0);

  const handleDelete = async (id) => {
    const updated = cart.filter((c) => c.id !== id);
    setCart(updated);
    await saveData(StorageKeys.CART, updated);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    const riwayat = (await loadData(StorageKeys.HISTORY)) || [];
    const transaksi = {
      id: Date.now().toString(),
      tanggal: new Date().toLocaleString('id-ID'),
      items: cart,
      total,
    };
    await saveData(StorageKeys.HISTORY, [transaksi, ...riwayat]);
    await saveData(StorageKeys.CART, []);
    setCart([]);
    Alert.alert('Checkout Berhasil', `Total Rp${total.toLocaleString('id-ID')} tersimpan di riwayat.`);
  };

  if (loading) return <LoadingSpinner label="Memuat keranjang..." />;

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemCard item={item} onDelete={() => handleDelete(item.id)} />}
        ListEmptyComponent={<EmptyState message="Keranjang masih kosong" icon="🛒" />}
        contentContainerStyle={cart.length === 0 && { flexGrow: 1 }}
      />
      {cart.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.totalText}>Total: Rp{total.toLocaleString('id-ID')}</Text>
          <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  footer: { padding: 16, backgroundColor: COLORS.white, borderTopWidth: 1, borderTopColor: COLORS.border },
  totalText: { fontSize: 18, fontWeight: 'bold', color: COLORS.text, marginBottom: 10 },
  checkoutBtn: { backgroundColor: COLORS.secondary, borderRadius: 8, padding: 14, alignItems: 'center' },
  checkoutText: { color: COLORS.white, fontWeight: 'bold', fontSize: 16 },
});
