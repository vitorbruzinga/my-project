// app/tabs/_layout.tsx
import React from 'react';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { display: 'none' },
        headerShown: false // Esconde o cabecalho
      }}
    >
      <Tabs.Screen
        name="Screens/HomePage/home" 
        options={{ tabBarLabel: 'Home' }}
      />

      {/* Aba de Login */}
      <Tabs.Screen
        name="Screens/Login/login" 
        options={{ tabBarLabel: 'Login' }}
      />

      {/* Aba de Criar Usuário */}
      <Tabs.Screen
        name="Screens/CreateUser/createUser"
        options={{ tabBarLabel: 'Criar Conta' }}
      />
    </Tabs>
  );
}
