import AppHeader from '@/components/app-header';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const faqs = [
  'Como faço para verificar os dados referentes ao FUNDEB.',
  'Como faço para verificar os Extratos pelo app?',
  'Não consigo atualizar meu aplicativo, o que fazer?',
  'Como faço para verificar as Despesas?',
];

export default function HelpScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-6">
        <AppHeader title="Me Ajuda" onBack={() => router.back()} />

        <View className="mt-4">
          {faqs.map((q) => (
            <TouchableOpacity key={q} className="py-4 border-b border-gray-100">
              <Text className="text-base font-dmsans">{q}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="mt-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="rounded-lg border border-gray-300 p-4"
          >
            <Text className="text-center font-outfit">Voltar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
