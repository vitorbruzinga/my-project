// app/tabs/_layout.tsx
import React from 'react';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { display: 'none' },
        headerShown: false, // Esconde o cabeçalho
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
        name="Screens/PecasManagement/pecaslistening" // Incluindo a tela de listagem
        options={{ tabBarLabel: 'Listar Peças' }}
      />

      {/* Aba de Edição de Peça */}
      <Tabs.Screen
        name="Screens/PecasManagement/editPeca" // Incluindo a tela de edição
        options={{ tabBarLabel: 'Editar Peça' }} // Esse label não será exibido se a tab estiver oculta
      />

    </Tabs>
  );
}
