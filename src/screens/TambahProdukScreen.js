import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image,
  StyleSheet, ScrollView, Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { COLORS } from '../constants/colors';
import { loadData, saveData, StorageKeys } from '../services/storage';

export default function TambahProdukScreen({ navigation }) {
  const [nama, setNama] = useState('');
  const [harga, setHarga] = useState('');
  const [foto, setFoto] = useState(null);
  const [errors, setErrors] = useState({});
  const [permissionDenied, setPermissionDenied] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      setPermissionDenied(true);
      Alert.alert('Izin Ditolak', 'Aplikasi memerlukan izin akses galeri untuk foto produk.');
      return;
    }
    setPermissionDenied(false);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.6,
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (nama.trim().length < 2) newErrors.nama = 'Nama produk minimal 2 karakter';
    if (!harga || isNaN(Number(harga)) || Number(harga) <= 0) {
      newErrors.harga = 'Harga harus berupa angka lebih dari 0';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSimpan = async () => {
    if (!validate()) return;
    const produkBaru = {
      id: Date.now().toString(),
      nama: nama.trim(),
      harga: Number(harga),
      foto,
    };
    const existing = (await loadData(StorageKeys.PRODUCTS)) || [];
    await saveData(StorageKeys.PRODUCTS, [...existing, produkBaru]);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Foto Produk</Text>
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {foto ? (
          <Image source={{ uri: foto }} style={styles.image} />
        ) : (
          <Text style={styles.imagePickerText}>📷 Ambil / Pilih Foto</Text>
        )}
      </TouchableOpacity>
      {permissionDenied && (
        <Text style={styles.error}>Izin galeri ditolak. Aktifkan lewat pengaturan HP.</Text>
      )}

      <Text style={styles.label}>Nama Produk</Text>
      <TextInput
        style={styles.input}
        placeholder="Contoh: Indomie Goreng"
        value={nama}
        onChangeText={setNama}
      />
      {errors.nama && <Text style={styles.error}>{errors.nama}</Text>}

      <Text style={styles.label}>Harga (Rp)</Text>
      <TextInput
        style={styles.input}
        placeholder="Contoh: 3500"
        value={harga}
        onChangeText={setHarga}
        keyboardType="numeric"
      />
      {errors.harga && <Text style={styles.error}>{errors.harga}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSimpan}>
        <Text style={styles.buttonText}>Simpan Produk</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: COLORS.background, flexGrow: 1 },
  label: { fontSize: 14, fontWeight: '600', color: COLORS.text, marginBottom: 6, marginTop: 12 },
  imagePicker: {
    height: 140, borderRadius: 10, backgroundColor: COLORS.white,
    borderWidth: 1, borderColor: COLORS.border, borderStyle: 'dashed',
    justifyContent: 'center', alignItems: 'center', overflow: 'hidden',
  },
  imagePickerText: { color: COLORS.textLight },
  image: { width: '100%', height: '100%' },
  input: {
    backgroundColor: COLORS.white, borderRadius: 8, padding: 12,
    borderWidth: 1, borderColor: COLORS.border, fontSize: 15,
  },
  error: { color: COLORS.danger, fontSize: 12, marginTop: 4 },
  button: {
    backgroundColor: COLORS.primary, borderRadius: 8, padding: 14,
    alignItems: 'center', marginTop: 24, marginBottom: 40,
  },
  buttonText: { color: COLORS.white, fontWeight: 'bold', fontSize: 16 },
});
