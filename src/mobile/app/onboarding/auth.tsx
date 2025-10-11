import { router } from 'expo-router';
import { CaretLeftIcon } from 'phosphor-react-native';
import {
  Image,
  Platform,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Auth() {
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
          Login
        </Text>

        <TouchableOpacity
          onPress={() => router.back()}
          className="px-2 py-2 justify-center items-center opacity-0"
        >
          <CaretLeftIcon size={20} weight="bold" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 pt-8">
        <View className="mb-4">
          <Text className="text-black text-base mb-2 font-medium">Login:</Text>
          <TextInput
            placeholder="Insira seu email, telefone ou usuário"
            placeholderTextColor="#9CA3AF"
            className="border border-gray-300 rounded-lg px-4 py-4 text-base text-black bg-white"
          />
        </View>

        <View className="mb-6">
          <Text className="text-black text-base mb-2 font-medium">Senha:</Text>
          <TextInput
            placeholder="Informe sua senha"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            className="border border-gray-300 rounded-lg px-4 py-4 text-base text-black bg-white"
          />
        </View>

        <TouchableOpacity
          className="bg-red-500 rounded-lg py-4 mb-6"
          onPress={() => router.push('/(tabs)')}
        >
          <Text className="text-white text-center text-lg font-semibold">
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white border border-gray-200 rounded-lg py-4 mb-8"
          onPress={() => {
            router.push('/onboarding/password');
          }}
        >
          <Text className="text-red-500 text-center text-base">
            Esqueci minha Senha
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-white border border-gray-200 rounded-lg py-4 mb-6 flex-row justify-center items-center">
          <Image
            source={require('../../assets/images/icon-google.png')}
            className="w-5 h-5 mr-3"
            resizeMode="contain"
          />

          <Text className="text-gray-700 text-base">
            Continuar com o Google
          </Text>
        </TouchableOpacity>

        <View className="items-center">
          <Text className="text-gray-600 text-base">
            Não possui conta?{' '}
            <TouchableOpacity
              onPress={() => router.push('/onboarding/register')}
            >
              <Text className="text-red-500 underline">Registre-se</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
