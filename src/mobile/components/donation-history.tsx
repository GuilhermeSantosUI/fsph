import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type Donation = {
  id: string;
  datetime: string; // ISO
  time: string; // HH:mm
  place: string;
  address: string;
  distance?: string;
};

type Props = {
  donations: Donation[];
  onSelectDay: (dateLabel: string, items: Donation[]) => void;
};

function formatDateLabel(iso: string) {
  const d = new Date(iso);
  // format: Segunda-Feira 07/04/2025 (match existing style)
  const days = [
    'Domingo',
    'Segunda-Feira',
    'Terça-Feira',
    'Quarta-Feira',
    'Quinta-Feira',
    'Sexta-Feira',
    'Sábado',
  ];
  const dayName = days[d.getDay()];
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dayName} ${dd}/${mm}/${yyyy}`;
}

export default function DonationHistory({ donations, onSelectDay }: Props) {
  // agrupa por data (yyyy-mm-dd)
  const groups: Record<string, Donation[]> = {};
  donations.forEach((d) => {
    const key = d.datetime.split('T')[0];
    if (!groups[key]) groups[key] = [];
    groups[key].push(d);
  });

  const sortedKeys = Object.keys(groups).sort((a, b) => (a < b ? 1 : -1));

  return (
    <View className="w-full mb-2">
      {sortedKeys.map((key) => {
        const items = groups[key];
        const dateLabel = formatDateLabel(items[0].datetime);

        return (
          <View key={key} className="mb-4">
            <Text className="text-[16px] text-[#A0A0A0] mb-4 font-dmsans">
              {dateLabel}
            </Text>

            {items.map((it) => (
              <TouchableOpacity
                key={it.id}
                activeOpacity={0.8}
                onPress={() => onSelectDay(dateLabel, items)}
                className="ml-3 mb-3"
              >
                <View className="flex-row items-center justify-between mb-1">
                  <Text className="text-[18px] text-black font-outfit">
                    {it.place}
                  </Text>
                  <Text className="text-[16px] text-[#A0A0A0] font-dmsans">
                    {it.time}
                  </Text>
                </View>
                <Text className="text-[16px] text-[#E11D48] mt-1 font-dmsans">
                  {it.address}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      })}
    </View>
  );
}
