import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import EmptyState from '../components/EmptyState';
import LoadingSpinner from '../components/LoadingSpinner';
import { COLORS } from '../constants/colors';
import { loadData, StorageKeys } from '../services/storage';

export default function RiwayatScreen() {
  const [riwayat, setRiwayat] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setLoading(true);
        const data = await loadData(StorageKeys.HISTORY);
        setRiwayat(data || []);
        setLoading(false);
      })();
    }, [])
  );

  if (loading) return <LoadingSpinner label="Memuat riwayat..." />;

  return (
    <View style={styles.container}>
      <FlatList
        data={riwayat}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.tanggal}>{item.tanggal}</Text>
            <Text style={styles.jumlah}>{item.items.length} produk</Text>
            <Text style={styles.total}>Rp{item.total.toLocaleString('id-ID')}</Text>
          </View>
        )}
        ListEmptyComponent={<EmptyState message="Belum ada transaksi" icon="🧾" />}
        contentContainerStyle={riwayat.length === 0 && { flexGrow: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  card: { backgroundColor: COLORS.white, borderRadius: 10, padding: 14, marginHorizontal: 14, marginVertical: 6, elevation: 2 },
  tanggal: { fontSize: 13, color: COLORS.textLight },
  jumlah: { fontSize: 14, color: COLORS.text, marginTop: 4 },
  total: { fontSize: 16, fontWeight: 'bold', color: COLORS.primary, marginTop: 4 },
});
