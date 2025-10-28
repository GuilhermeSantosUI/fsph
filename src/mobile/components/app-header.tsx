import { CaretLeftIcon } from 'phosphor-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type AppHeaderProps = {
  title: string;
  onBack?: () => void;
  rightElement?: React.ReactNode;
  showBack?: boolean;
};

export default function AppHeader({
  title,
  onBack,
  rightElement,
  showBack = true,
}: AppHeaderProps) {
  const disabledBack = !onBack || !showBack;

  return (
    <View className="py-6 flex-row items-center justify-between">
      <TouchableOpacity
        className="w-10 h-10 flex items-center justify-center"
        onPress={onBack}
        disabled={disabledBack}
        activeOpacity={0.7}
      >
        <CaretLeftIcon size={18} />
      </TouchableOpacity>

      <Text className="text-xl font-semibold text-black font-outfit">
        {title}
      </Text>

      {rightElement ? (
        <View>{rightElement}</View>
      ) : (
        <View className="w-8 h-8 opacity-0">
          {/* placeholder to keep header centered */}
          <CaretLeftIcon size={18} />
        </View>
      )}
    </View>
  );
}
