import AppHeader from '@/components/app-header';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type AppointmentType = 'individual' | 'campaign' | 'bone-marrow' | null;

export default function AppointmentTypeScreen() {
  const router = useRouter();
  const [selectedType, setSelectedType] =
    useState<AppointmentType>('individual');

  const handleContinue = () => {
    if (selectedType) {
      router.push('/(scheduling)/pre-screening');
    }
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
            Tipo de Agendamento
          </Text>
          <Text className="text-[16px] text-gray-500 mb-8 font-dmsans leading-6">
            Selecione o tipo de agendamento que deseja realizar.
          </Text>

          <View className="flex flex-column gap-4 mb-8">
            <TouchableOpacity
              onPress={() => setSelectedType('individual')}
              className={`p-5 rounded-xl border-2 ${
                selectedType === 'individual'
                  ? 'bg-gray-50 border-[#e11d48]'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <Text className="text-[18px] font-semibold text-black mb-2 font-outfit">
                Doação de Sangue Individual
              </Text>
              <Text className="text-[14px] text-gray-600 font-dmsans leading-5">
                Agende sua doação individual em um hemocentro ou posto de
                coleta.
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSelectedType('campaign')}
              className={`p-5 rounded-xl border-2 ${
                selectedType === 'campaign'
                  ? 'bg-gray-50 border-[#e11d48]'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <Text className="text-[18px] font-semibold text-black mb-2 font-outfit">
                Campanha de Doação de Sangue
              </Text>
              <Text className="text-[14px] text-gray-600 font-dmsans leading-5">
                Participe de uma campanha de doação organizada na sua região.
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSelectedType('bone-marrow')}
              className={`p-5 rounded-xl border-2 ${
                selectedType === 'bone-marrow'
                  ? 'bg-gray-50 border-[#e11d48]'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <Text className="text-[18px] font-semibold text-black mb-2 font-outfit">
                Cadastro de Medula Óssea
              </Text>
              <Text className="text-[14px] text-gray-600 font-dmsans leading-5">
                Cadastre-se como doador de medula óssea e ajude a salvar vidas.
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View className="px-6 pb-6 border-t border-gray-100">
        <TouchableOpacity
          className={`rounded-lg py-4 px-8 mb-3 w-full items-center ${
            selectedType ? 'bg-[#e11d48]' : 'bg-gray-300'
          }`}
          onPress={handleContinue}
          disabled={!selectedType}
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
