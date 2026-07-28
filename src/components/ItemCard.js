import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';

const formatRupiah = (num) => 'Rp' + Number(num).toLocaleString('id-ID');

export default function ItemCard({ item, onPress, onDelete }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={onPress ? 0.7 : 1}>
      {item.foto ? (
        <Image source={{ uri: item.foto }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.imagePlaceholder]}>
          <Text style={{ fontSize: 22 }}>📦</Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{item.nama}</Text>
        <Text style={styles.price}>{formatRupiah(item.harga)}</Text>
        {item.qty ? <Text style={styles.qty}>Qty: {item.qty}</Text> : null}
      </View>
      {onDelete && (
        <TouchableOpacity style={styles.deleteBtn} onPress={onDelete}>
          <Text style={styles.deleteText}>Hapus</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 14,
    marginVertical: 6,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  image: { width: 56, height: 56, borderRadius: 8, backgroundColor: COLORS.border },
  imagePlaceholder: { justifyContent: 'center', alignItems: 'center' },
  info: { flex: 1, marginLeft: 12 },
  name: { fontSize: 15, fontWeight: '600', color: COLORS.text },
  price: { fontSize: 14, color: COLORS.primary, marginTop: 2, fontWeight: '500' },
  qty: { fontSize: 12, color: COLORS.textLight, marginTop: 2 },
  deleteBtn: { paddingHorizontal: 10, paddingVertical: 6 },
  deleteText: { color: COLORS.danger, fontSize: 13, fontWeight: '600' },
});
