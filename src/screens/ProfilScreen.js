import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS } from '../constants/colors';
import { loadData, StorageKeys } from '../services/storage';

export default function ProfilScreen({ navigation }) {
  const [account, setAccount] = useState(null);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const data = await loadData(StorageKeys.SESSION);
        setAccount(data);
      })();
    }, [])
  );

  const handleLogout = () => {
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>🏪</Text>
      </View>
      <Text style={styles.nama}>{account?.namaWarung || 'Warung Digital'}</Text>
      <Text style={styles.email}>{account?.email || '-'}</Text>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Keluar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 60, backgroundColor: COLORS.background },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center', elevation: 3, marginBottom: 16 },
  avatarText: { fontSize: 40 },
  nama: { fontSize: 20, fontWeight: 'bold', color: COLORS.text },
  email: { fontSize: 14, color: COLORS.textLight, marginTop: 4 },
  logoutBtn: { marginTop: 40, backgroundColor: COLORS.danger, paddingHorizontal: 30, paddingVertical: 12, borderRadius: 8 },
  logoutText: { color: COLORS.white, fontWeight: 'bold', fontSize: 15 },
});
