import React from 'react';
import { Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from '../screens/LoginScreen';
import KatalogScreen from '../screens/KatalogScreen';
import KeranjangScreen from '../screens/KeranjangScreen';
import RiwayatScreen from '../screens/RiwayatScreen';
import ProfilScreen from '../screens/ProfilScreen';
import TambahProdukScreen from '../screens/TambahProdukScreen';
import { COLORS } from '../constants/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabIcon({ emoji }) {
  return <Text style={{ fontSize: 20 }}>{emoji}</Text>;
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: COLORS.white,
        tabBarActiveTintColor: COLORS.primary,
      }}
    >
      <Tab.Screen name="Katalog" component={KatalogScreen} options={{ tabBarIcon: () => <TabIcon emoji="🛍️" /> }} />
      <Tab.Screen name="Keranjang" component={KeranjangScreen} options={{ tabBarIcon: () => <TabIcon emoji="🛒" /> }} />
      <Tab.Screen name="Riwayat" component={RiwayatScreen} options={{ tabBarIcon: () => <TabIcon emoji="🧾" /> }} />
      <Tab.Screen name="Profil" component={ProfilScreen} options={{ tabBarIcon: () => <TabIcon emoji="👤" /> }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Main" component={MainTabs} />
      <Stack.Screen
        name="TambahProduk"
        component={TambahProdukScreen}
        options={{
          headerShown: true,
          title: 'Tambah Produk',
          headerStyle: { backgroundColor: COLORS.primary },
          headerTintColor: COLORS.white,
        }}
      />
    </Stack.Navigator>
  );
}
