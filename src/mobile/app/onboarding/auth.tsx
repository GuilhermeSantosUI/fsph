import { router } from 'expo-router';
import { CaretLeftIcon } from 'phosphor-react-native';
import {
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
} from 'react-native';

export default function Auth() {
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
          Login
        </Text>
        <View className="w-10" />
      </View>

      <View className="flex-1 px-6 pt-8">
        {/* Campo Login */}
        <View className="mb-4">
          <Text className="text-black text-base mb-2 font-medium">Login:</Text>
          <TextInput
            placeholder="Insira seu email, telefone ou usuário"
            placeholderTextColor="#9CA3AF"
            className="border border-gray-300 rounded-lg px-4 py-4 text-base text-black bg-white"
          />
        </View>

        {/* Campo Senha */}
        <View className="mb-6">
          <Text className="text-black text-base mb-2 font-medium">Senha:</Text>
          <TextInput
            placeholder="Informe sua senha"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            className="border border-gray-300 rounded-lg px-4 py-4 text-base text-black bg-white"
          />
        </View>

        {/* Botão Login */}
        <TouchableOpacity className="bg-red-500 rounded-lg py-4 mb-6">
          <Text className="text-white text-center text-lg font-semibold">Login</Text>
        </TouchableOpacity>

        {/* Esqueci minha Senha */}
        <TouchableOpacity className="bg-white border border-gray-200 rounded-lg py-4 mb-8">
          <Text className="text-red-500 text-center text-base">Esqueci minha Senha</Text>
        </TouchableOpacity>

        {/* Botão Google */}
        <TouchableOpacity className="bg-white border border-gray-200 rounded-lg py-4 mb-6 flex-row justify-center items-center">
          <Image 
            source={require('../../assets/images/icon-google.png')} 
            className="w-5 h-5 mr-3"
            resizeMode="contain"
          />
          <Text className="text-gray-700 text-base">Continuar com o Google</Text>
        </TouchableOpacity>

        {/* Link Registre-se */}
        <View className="items-center">
          <Text className="text-gray-600 text-base">
            Não possui conta? <Text className="text-red-500 underline">Registre-se</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
