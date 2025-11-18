import AppHeader from '@/components/app-header';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DateTimeScreen() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<number | null>(14);
  const [selectedMonth] = useState('Julho, 2020');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const dates = [
    { day: 13, weekDay: 'SEG' },
    { day: 14, weekDay: 'TER' },
    { day: 15, weekDay: 'QUA' },
    { day: 16, weekDay: 'QUI' },
  ];

  const timeSlots = [
    '09:00 AM',
    '09:30 AM',
    '10:00 AM',
    '10:30 AM',
    '12:00 PM',
    '12:30 PM',
    '01:30 PM',
    '02:00 PM',
    '03:00 PM',
    '04:30 PM',
    '05:00 PM',
    '05:30 PM',
  ];

  const canContinue = selectedDate !== null && selectedTime !== null;

  const handleContinue = () => {
    if (canContinue) {
      router.push('/(scheduling)/final-verification');
    }
  };

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <SafeAreaView className="bg-white">
      <ScrollView className="px-6">
        <AppHeader title="Agendamento" onBack={() => router.back()} />

        <View className="flex-1 py-8">
          <Text className="text-[28px] font-semibold text-black mb-4 font-outfit leading-9">
            Escolha a Data e Horário
          </Text>
          <Text className="text-[16px] text-gray-500 mb-8 font-dmsans leading-6">
            Selecione a melhor data e horário para realizar sua doação.
          </Text>

          <View className="mb-6">
            <TouchableOpacity className="flex-row items-center justify-between bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
              <Text className="text-[16px] font-medium text-black font-outfit">
                {selectedMonth}
              </Text>
              <Text className="text-[20px] text-gray-500">›</Text>
            </TouchableOpacity>
          </View>

          <View className="mb-8">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-6"
            >
              <View className="flex-row gap-4">
                {dates.map((date) => (
                  <TouchableOpacity
                    key={date.day}
                    onPress={() => setSelectedDate(date.day)}
                    className={`w-20 h-24 rounded-xl items-center justify-center ${
                      selectedDate === date.day
                        ? 'bg-[#e11d48]'
                        : 'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <Text
                      className={`text-[24px] font-semibold mb-1 font-outfit ${
                        selectedDate === date.day ? 'text-white' : 'text-black'
                      }`}
                    >
                      {date.day}
                    </Text>
                    <Text
                      className={`text-[12px] font-medium font-outfit ${
                        selectedDate === date.day
                          ? 'text-white'
                          : 'text-gray-500'
                      }`}
                    >
                      {date.weekDay}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <View className="mb-8">
            <Text className="text-[18px] font-semibold text-black mb-4 font-outfit">
              Horários disponíveis
            </Text>
            <View className="flex-row flex-wrap">
              {timeSlots.map((time, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedTime(time)}
                  className={`mr-3 mb-3 px-6 py-3 rounded-lg ${
                    selectedTime === time
                      ? 'bg-[#e11d48]'
                      : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <Text
                    className={`text-[14px] font-medium font-outfit ${
                      selectedTime === time ? 'text-white' : 'text-black'
                    }`}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="px-6 pb-6 border-t border-gray-100">
        <TouchableOpacity
          className={`rounded-lg py-4 px-8 mb-3 w-full items-center ${
            canContinue ? 'bg-[#e11d48]' : 'bg-gray-300'
          }`}
          onPress={handleContinue}
          disabled={!canContinue}
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
