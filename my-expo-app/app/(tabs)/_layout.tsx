// app/tabs/_layout.tsx
import React from 'react';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { display: 'none' },
        headerShown: false,
      }}
    >
      {/* Aba da Tela Inicial */}
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

      {/* Aba de Listagem de Peças */}
      <Tabs.Screen
        name="Screens/PecasManagement/pecaslistening"
        options={{ tabBarLabel: 'Listar Peças' }}
      />

      {/* Aba de Edição de Peça */}
      <Tabs.Screen
        name="Screens/PecasManagement/editPeca"
        options={{ tabBarLabel: 'Editar Peça' }} // Esse label não será exibido se a tab estiver oculta
      />

    </Tabs>
  );
}
