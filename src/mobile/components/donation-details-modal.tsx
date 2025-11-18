import React from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

type DonationItem = {
  id: string;
  time: string; // HH:mm
  place: string;
  address: string;
  distance?: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  dateLabel?: string;
  items?: DonationItem[];
};

export default function DonationDetailsModal({
  visible,
  onClose,
  dateLabel,
  items = [],
}: Props) {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View className="flex-1 justify-end">
        <View className="bg-white rounded-t-2xl p-5 shadow-lg">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-[18px] font-outfit">{dateLabel}</Text>
            <TouchableOpacity onPress={onClose} className="px-2 py-1">
              <Text className="text-[#e11d48]">Fechar</Text>
            </TouchableOpacity>
          </View>

          <ScrollView className="max-h-96">
            {items.length === 0 ? (
              <Text className="text-[#8C8C8C]">Nenhuma doação nesse dia.</Text>
            ) : (
              items.map((it) => (
                <View
                  key={it.id}
                  className="mb-4 border rounded-lg p-3 bg-[#fff7f8]"
                >
                  <View className="flex-row items-center justify-between mb-1">
                    <Text className="text-[16px] font-outfit">{it.place}</Text>
                    <Text className="text-[14px] text-[#A0A0A0] font-dmsans">
                      {it.time}
                    </Text>
                  </View>

                  <Text className="text-[14px] text-[#E11D48] font-dmsans">
                    {it.address}
                  </Text>

                  {it.distance ? (
                    <Text className="text-[13px] text-[#8C8C8C] mt-1 font-dmsans">
                      Distância: {it.distance}
                    </Text>
                  ) : null}
                </View>
              ))
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
