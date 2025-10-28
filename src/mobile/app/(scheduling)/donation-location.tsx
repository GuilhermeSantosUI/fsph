import AppHeader from '@/components/app-header';
import { useRouter } from 'expo-router';
import { CaretDownIcon } from 'phosphor-react-native';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DonationLocationScreen() {
  const router = useRouter();
  const [selectedCity] = useState('ARACAJU - SE');
  const [selectedLocation] = useState('Shopping Jardins');

  const handleContinue = () => {
    router.push('/(scheduling)/date-time');
  };

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <AppHeader title="Agendamento" onBack={() => router.back()} />

        <View className="flex-1 px-6 py-8">
          <Text className="text-[28px] font-semibold text-black mb-4 font-outfit leading-9">
            Local da Doação
          </Text>
          <Text className="text-[16px] text-gray-500 mb-8 font-dmsans leading-6">
            Selecione a cidade e o local onde deseja realizar sua doação.
          </Text>

          <View className="mb-6">
            <Text className="text-[16px] font-medium text-black mb-3 font-outfit">
              Cidades
            </Text>
            <TouchableOpacity className="bg-white border-2 border-[#e11d48] rounded-xl px-4 py-4 flex-row items-center justify-between">
              <Text className="text-[16px] text-black font-dmsans">
                {selectedCity}
              </Text>
              <CaretDownIcon size={20} color="#000" />
            </TouchableOpacity>
          </View>

          <View className="mb-8">
            <Text className="text-[16px] font-medium text-black mb-3 font-outfit">
              Local
            </Text>
            <TouchableOpacity className="bg-white border-2 border-[#e11d48] rounded-xl px-4 py-4 flex-row items-center justify-between">
              <Text className="text-[16px] text-black font-dmsans">
                {selectedLocation}
              </Text>
              <CaretDownIcon size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View className="px-6 pb-6 border-t border-gray-100">
        <TouchableOpacity
          className="rounded-lg py-4 px-8 mb-3 w-full items-center bg-[#e11d48]"
          onPress={handleContinue}
        >
          <Text className="text-white font-medium text-[18px] font-outfit">
            Continuar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white rounded-lg border border-gray-200 py-4 px-8 w-full items-center"
          onPress={handleGoBack}
        >
          <Text className="text-black font-normal text-[18px] font-outfit">
            Voltar ao início
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
