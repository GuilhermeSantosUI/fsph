import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { router } from 'expo-router';
import { CaretLeftIcon } from 'phosphor-react-native';

export default function MainScreen() {
  return (
    <SafeAreaView>
      <View className="flex-row items-center">
        <TouchableOpacity
          onPress={() => router.back()}
          className="px-2 py-2 justify-center items-center"
        >
          <CaretLeftIcon size={20} weight="bold" />
        </TouchableOpacity>

        <Text className="flex-1 text-center text-lg font-medium text-black">
          Login
        </Text>

        <TouchableOpacity
          onPress={() => router.back()}
          className="px-2 py-2 justify-center items-center opacity-0"
        >
          <CaretLeftIcon size={20} weight="bold" />
        </TouchableOpacity>
      </View>

      <Text>Tela de Home</Text>
    </SafeAreaView>
  );
}
