import { useRouter } from 'expo-router';
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface BloodAppealModalProps {
  visible?: boolean;
  bloodType?: string; // ex: "A+"
  severity?: 'normal' | 'critical';
  onClose?: () => void;
  onSchedule?: () => void;
}

export default function BloodAppealModal({
  visible = false,
  bloodType = 'A+',
  severity = 'critical',
  onClose,
  onSchedule,
}: BloodAppealModalProps) {
  const router = useRouter();

  const isCritical = severity === 'critical';
  const accent = isCritical ? '#e11d48' : '#f59e0b';

  function handleSchedule() {
    onSchedule?.();
    onClose?.();
    try {
      router.push('/(scheduling)/appointment-type');
    } catch {}
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-200">
          <TouchableOpacity onPress={onClose} className="p-2">
            <Text className="text-[#e11d48] text-[16px] font-outfit">
              Fechar
            </Text>
          </TouchableOpacity>
          <Text className="text-[18px] text-black font-outfit">
            Captação por Tipo Sanguíneo
          </Text>
          <View className="w-16" />
        </View>

        <View className="flex-1 items-center justify-center px-6">
          <View
            style={{
              width: 140,
              height: 140,
              borderRadius: 140 / 2,
              backgroundColor: `${accent}33`, // leve transparência
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text className="text-[56px] font-outfit" style={{ color: accent }}>
              {bloodType}
            </Text>
          </View>

          <Text className="text-[24px] font-medium text-[#222] text-center mb-4 mt-8 font-outfit">
            {isCritical ? 'Captação Crítica' : 'Captação Necessária'}
          </Text>

          <Text className="text-[18px] text-[#A0A0A0] text-center mb-9 leading-7 font-dmsans">
            {isCritical
              ? `Precisamos urgentemente de doadores do tipo ${bloodType}. Se você for compatível, por favor agende uma doação para ajudar a cobrir a demanda.`
              : `Estamos buscando doadores do tipo ${bloodType}. Se puder, agende sua doação e ajude a fortalecer o estoque.`}
          </Text>
        </View>

        <View className="px-6 pb-6">
          <TouchableOpacity
            className="rounded-lg py-[14px] px-8 mb-4 w-full items-center"
            style={{ backgroundColor: accent }}
            onPress={handleSchedule}
          >
            <Text className="text-white font-medium text-[18px] font-outfit">
              Agendar Doação
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-white rounded-lg border border-[#E5E5E5] py-[14px] px-8 w-full items-center"
            onPress={onClose}
          >
            <Text className="text-[#222] font-normal text-[18px] font-outfit">
              Fechar
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
