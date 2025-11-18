import AppHeader from '@/components/app-header';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Share, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ReferScreen() {
  const router = useRouter();

  async function onShare() {
    try {
      await Share.share({
        message: 'Confira este app incrível!',
      });
    } catch (e) {
      console.warn('Share failed', e);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-6">
        <AppHeader title="Indicar para um amigo" onBack={() => router.back()} />

        <View>
          <Text className="text-gray-700 mb-4">
            Compartilhe o aplicativo com seus amigos.
          </Text>

          <TouchableOpacity
            onPress={onShare}
            className="rounded-lg bg-red-500 p-4"
          >
            <Text className="text-center text-white font-outfit">
              Compartilhar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
