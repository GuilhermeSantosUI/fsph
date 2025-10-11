import { router } from 'expo-router';
import { CaretLeftIcon } from 'phosphor-react-native';
import {
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Register() {
  const isPresented = router.canGoBack();

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
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
          Criar Conta
        </Text>

        <TouchableOpacity
          onPress={() => router.back()}
          className="px-2 py-2 justify-center items-center opacity-0"
        >
          <CaretLeftIcon size={20} weight="bold" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 p-4"></View>
    </SafeAreaView>
  );
}
