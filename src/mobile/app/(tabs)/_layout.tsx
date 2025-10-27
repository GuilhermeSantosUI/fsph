import { Tabs } from 'expo-router';
import { CompassIcon, HouseIcon } from 'phosphor-react-native';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 13,
          fontFamily: 'Outfit',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
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
    </Tabs>
  );
}
