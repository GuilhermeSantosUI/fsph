import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { AuthProvider } from '../context/AuthContext';

import '../global.css';

export default function RootLayout() {
  const [loaded] = useFonts({
    'DM Sans': require('../assets/fonts/dm-sans.ttf'),
    'Outfit-Thin': require('../assets/fonts/outfit-thin.ttf'),
    'Outfit-ExtraLight': require('../assets/fonts/outfit-extra-light.ttf'),
    'Outfit-Light': require('../assets/fonts/outfit-light.ttf'),
    'Outfit-Regular': require('../assets/fonts/outfit-regular.ttf'),
    'Outfit-Medium': require('../assets/fonts/outfit-medium.ttf'),
    'Outfit-SemiBold': require('../assets/fonts/outfit-semi-bold.ttf'),
    'Outfit-Bold': require('../assets/fonts/outfit-bold.ttf'),
    'Outfit-ExtraBold': require('../assets/fonts/outfit-extra-bold.ttf'),
    'Outfit-Black': require('../assets/fonts/outfit-black.ttf'),
  });

  if (!loaded) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}
