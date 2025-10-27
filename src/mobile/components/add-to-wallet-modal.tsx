import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Platform, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  addToAppleWallet,
  addToGooglePay,
  shareDonorCard,
} from '../lib/walletService';

interface AddToWalletModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function AddToWalletModal({
  visible,
  onClose,
}: AddToWalletModalProps) {
  async function handleAddToAppleWallet() {
    await addToAppleWallet();
    onClose();
  }

  async function handleAddToGooglePay() {
    await addToGooglePay();
    onClose();
  }

  async function handleShareCard() {
    await shareDonorCard();
    onClose();
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
              Cancelar
            </Text>
          </TouchableOpacity>
          <Text className="text-[18px] font-outfit text-black">Cartão</Text>
          <TouchableOpacity
            onPress={onClose}
            className="bg-[#e11d48] rounded-full px-4 py-2"
          >
            <Text className="text-white text-[14px] font-outfit">
              Adicionar
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-1 px-6 py-8">
          <View className="bg-[#e11d48] rounded-2xl p-6 mb-8 shadow-lg">
            <View className="flex-row justify-between items-start">
              <View>
                <Text className="text-white text-[20px] font-outfit">FSPH</Text>
                <Text className="text-white text-[8px] font-dmsans opacity-90">
                  Fundação de Saúde{'\n'}Parreiras Horta
                </Text>
              </View>
              <Text className="text-white text-[18px] font-outfit">A+</Text>
            </View>
            <View className="mt-6">
              <Text className="text-white text-[14px] font-outfit">
                GUILHERME SANTOS
              </Text>
              <Text className="text-white text-[12px] font-dmsans opacity-70 mt-1">
                ***.424.945-**
              </Text>
            </View>
            <View className="mt-4">
              <Text className="text-white text-[12px] font-dmsans opacity-90">
                Próxima doação elegível em:
              </Text>
              <Text className="text-white text-[20px] font-outfit font-bold">
                33 dias
              </Text>
            </View>
          </View>

          <Text className="text-[24px] font-outfit text-black text-center mb-2">
            Adicionar à Carteira Digital
          </Text>
          <Text className="text-[16px] font-dmsans text-gray-600 text-center mb-8">
            Mantenha todos os cartões, chaves e passes que você usa todos os
            dias em um só lugar.
          </Text>

          <View className="space-y-4">
            {Platform.OS === 'ios' && (
              <TouchableOpacity
                onPress={handleAddToAppleWallet}
                className="flex-row items-center p-4 bg-black rounded-xl"
              >
                <MaterialIcons
                  name="account-balance-wallet"
                  size={24}
                  color="white"
                />
                <Text className="flex-1 text-white text-[16px] font-outfit ml-4">
                  Adicionar ao Apple Wallet
                </Text>
                <MaterialIcons name="chevron-right" size={24} color="white" />
              </TouchableOpacity>
            )}

            {Platform.OS === 'android' && (
              <TouchableOpacity
                onPress={handleAddToGooglePay}
                className="flex-row items-center p-4 bg-[#4285f4] rounded-xl"
              >
                <MaterialIcons
                  name="account-balance-wallet"
                  size={24}
                  color="white"
                />
                <Text className="flex-1 text-white text-[16px] font-outfit ml-4">
                  Adicionar ao Google Pay
                </Text>
                <MaterialIcons name="chevron-right" size={24} color="white" />
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={handleShareCard}
              className="flex-row items-center p-4 mt-4 bg-gray-100 rounded-xl"
            >
              <MaterialIcons name="share" size={24} color="#6b7280" />
              <Text className="flex-1 text-gray-700 text-[16px] font-outfit ml-4">
                Compartilhar Cartão
              </Text>
              <MaterialIcons name="chevron-right" size={24} color="#6b7280" />
            </TouchableOpacity>

            <View className="mt-8 p-4 bg-blue-50 rounded-xl">
              <View className="flex-row items-start">
                <MaterialIcons name="info" size={20} color="#3b82f6" />
                <View className="ml-3 flex-1">
                  <Text className="text-[14px] font-outfit text-blue-800 mb-1">
                    Como funciona?
                  </Text>
                  <Text className="text-[12px] font-dmsans text-blue-700 leading-4">
                    Seu cartão ficará disponível na carteira do seu dispositivo
                    para acesso rápido, mesmo sem internet. Todos os dados são
                    criptografados e seguros.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
