import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, Alert,
} from 'react-native';
import { COLORS } from '../constants/colors';
import { saveData, loadData, StorageKeys } from '../services/storage';

export default function LoginScreen({ navigation }) {
  // useState #1: form fields
  const [namaWarung, setNamaWarung] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // useState #2: mode toggle (conditional rendering)
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  // useState #3: validation errors + loading
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (isRegisterMode && namaWarung.trim().length < 3) {
      newErrors.namaWarung = 'Nama warung minimal 3 karakter';
    }
    if (!email.trim()) {
      newErrors.email = 'Email tidak boleh kosong';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Format email tidak valid';
    }
    if (!password) {
      newErrors.password = 'Password tidak boleh kosong';
    } else if (password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      if (isRegisterMode) {
        await saveData(StorageKeys.SESSION, { namaWarung, email, password });
        Alert.alert('Berhasil', 'Akun berhasil dibuat, silakan login.');
        setIsRegisterMode(false);
      } else {
        const account = await loadData(StorageKeys.SESSION);
        if (!account || account.email !== email || account.password !== password) {
          setErrors({ password: 'Email atau password salah' });
          setLoading(false);
          return;
        }
        navigation.replace('Main');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>🛒 Warung Digital</Text>
      <Text style={styles.subtitle}>
        {isRegisterMode ? 'Daftar akun pemilik warung' : 'Masuk ke akun Anda'}
      </Text>

      {isRegisterMode && (
        <View style={styles.field}>
          <TextInput
            style={styles.input}
            placeholder="Nama Warung"
            value={namaWarung}
            onChangeText={setNamaWarung}
          />
          {errors.namaWarung && <Text style={styles.error}>{errors.namaWarung}</Text>}
        </View>
      )}

      <View style={styles.field}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}
      </View>

      <View style={styles.field}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? 'Memproses...' : isRegisterMode ? 'Daftar' : 'Masuk'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsRegisterMode(!isRegisterMode)}>
        <Text style={styles.switchText}>
          {isRegisterMode ? 'Sudah punya akun? Masuk' : 'Belum punya akun? Daftar'}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: COLORS.background },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: COLORS.primary },
  subtitle: { textAlign: 'center', color: COLORS.textLight, marginTop: 6, marginBottom: 24 },
  field: { marginBottom: 14 },
  input: {
    backgroundColor: COLORS.white, borderRadius: 8, padding: 12,
    borderWidth: 1, borderColor: COLORS.border, fontSize: 15,
  },
  error: { color: COLORS.danger, fontSize: 12, marginTop: 4 },
  button: {
    backgroundColor: COLORS.primary, borderRadius: 8, padding: 14,
    alignItems: 'center', marginTop: 8,
  },
  buttonText: { color: COLORS.white, fontWeight: 'bold', fontSize: 16 },
  switchText: { textAlign: 'center', color: COLORS.primary, marginTop: 18, fontSize: 13 },
});
