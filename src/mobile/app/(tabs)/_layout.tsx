import { Tabs } from 'expo-router';
import {
  CalendarBlankIcon,
  CompassIcon,
  HouseIcon,
  UserCircleIcon,
} from 'phosphor-react-native';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          paddingTop: 8,
          fontSize: 14,
          fontFamily: 'Outfit',
          fontWeight: '400',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, focused, size }) => (
            <HouseIcon size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused, size }) => (
            <CompassIcon size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: 'Agendamentos',
          tabBarIcon: ({ color, focused, size }) => (
            <CalendarBlankIcon size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, focused, size }) => (
            <UserCircleIcon size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
