import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ItemCard from '../components/ItemCard';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import { COLORS } from '../constants/colors';
import { loadData, saveData, StorageKeys } from '../services/storage';

export default function KatalogScreen({ navigation }) {
  const [produk, setProduk] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProduk = async () => {
    setLoading(true);
    const data = await loadData(StorageKeys.PRODUCTS);
    setProduk(data || []);
    setLoading(false);
  };

  // useEffect #7: load pertama kali app dibuka
  useEffect(() => {
    fetchProduk();
  }, []);

  // refresh tiap kali tab ini difokuskan lagi (misal setelah tambah produk)
  useFocusEffect(
    useCallback(() => {
      fetchProduk();
    }, [])
  );

  const handleDelete = async (id) => {
    const updated = produk.filter((p) => p.id !== id);
    setProduk(updated);
    await saveData(StorageKeys.PRODUCTS, updated);
  };

  const handleAddToCart = async (item) => {
    const cart = (await loadData(StorageKeys.CART)) || [];
    const existing = cart.find((c) => c.id === item.id);
    const updated = existing
      ? cart.map((c) => (c.id === item.id ? { ...c, qty: c.qty + 1 } : c))
      : [...cart, { ...item, qty: 1 }];
    await saveData(StorageKeys.CART, updated);
    Alert.alert('Ditambahkan', `${item.nama} masuk ke keranjang`);
  };

  if (loading) return <LoadingSpinner label="Memuat katalog..." />;

  return (
    <View style={styles.container}>
      <FlatList
        data={produk}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemCard
            item={item}
            onPress={() => handleAddToCart(item)}
            onDelete={() => handleDelete(item.id)}
          />
        )}
        ListEmptyComponent={
          <EmptyState message="Belum ada produk. Tambahkan produk pertama Anda!" icon="🛍️" />
        }
        contentContainerStyle={produk.length === 0 && { flexGrow: 1 }}
      />
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('TambahProduk')}>
        <Text style={styles.fabText}>+ Produk</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  fab: {
    position: 'absolute', right: 16, bottom: 20,
    backgroundColor: COLORS.primary, borderRadius: 24,
    paddingHorizontal: 20, paddingVertical: 12, elevation: 4,
  },
  fabText: { color: COLORS.white, fontWeight: 'bold' },
});
