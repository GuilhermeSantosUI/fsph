import { router } from 'expo-router';
import { CaretLeftIcon } from 'phosphor-react-native';
import {
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Modal() {
  const isPresented = router.canGoBack();

  return (
    <View className="flex-1 bg-white px-6 py-6">
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
      />

      <View className="flex-row items-center">
        {isPresented && (
          <TouchableOpacity
            onPress={() => router.back()}
            className="px-2 py-2 justify-center items-center"
          >
            <CaretLeftIcon size={20} weight="bold" />
          </TouchableOpacity>
        )}
        <Text className="flex-1 text-center text-lg font-medium text-black">
          Informações Pessoais
        </Text>
        <View className="w-10" />
      </View>

      <View className="flex-1 p-4"></View>
    </View>
  );
}
