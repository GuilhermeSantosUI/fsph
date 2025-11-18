import AppHeader from '@/components/app-header';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PrivacyScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-6">
        <AppHeader title="Privacidade" onBack={() => router.back()} />

        <View>
          <Text className="text-gray-700">
            Configurações de privacidade e preferências do usuário.
            (Placeholder)
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
