import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Modal, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Appointment, editAppointment, getAppointments, unmarkAppointment } from '../../services/scheduling';

// Dados fictícios para exibir agendamentos quando a API não estiver disponível
const MOCK_APPOINTMENTS: Appointment[] = [
  {
    protocolo: 'FSPH-2025-0001',
    data_hora: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // amanhã
    local: 'Hemocentro Central',
    id_bloco_doacao: 'block-1',
    doador_dt_nascimento: '1990-05-12',
    doador_cpf: '123.456.789-00',
    tipo: 'D',
  } as Appointment,
  {
    protocolo: 'FSPH-2025-0002',
    data_hora: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(), // daqui a 2 dias
    local: 'Unidade de Saúde Bairro Novo',
    id_bloco_doacao: 'block-2',
    doador_dt_nascimento: '1985-11-02',
    doador_cpf: '987.654.321-00',
    tipo: 'M',
  } as Appointment,
  {
    protocolo: 'FSPH-2025-0003',
    data_hora: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 dias atrás
    local: 'Clínica São José',
    id_bloco_doacao: 'block-3',
    doador_dt_nascimento: '2000-01-21',
    doador_cpf: '111.222.333-44',
    tipo: 'D',
  } as Appointment,
];

export default function SchedulingTab() {
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState<Appointment | null>(null);
  const [newBlockId, setNewBlockId] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  async function fetchAppointments() {
    setLoading(true);
    try {
      // Tenta buscar da API, mas se falhar ou vier vazio usaremos dados fictícios
      const data = await getAppointments();
      if (Array.isArray(data) && data.length > 0) {
        setAppointments(data);
      } else {
        setAppointments(MOCK_APPOINTMENTS);
      }
    } catch (err) {
      console.warn('Erro ao buscar agendamentos, usando dados fictícios', err);
      setAppointments(MOCK_APPOINTMENTS);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  async function onRefresh() {
    setRefreshing(true);
    await fetchAppointments();
  }

  function openRescheduleModal(item: Appointment) {
    setSelected(item);
    setNewBlockId(item.id_bloco_doacao || '');
    setModalVisible(true);
  }

  async function handleCancel(item: Appointment) {
    Alert.alert('Cancelar agendamento', 'Deseja cancelar este agendamento?', [
      { text: 'Não', style: 'cancel' },
      {
        text: 'Sim',
        onPress: async () => {
          try {
            setActionLoading(item.protocolo);
            await unmarkAppointment(item.protocolo);
            setAppointments((prev) =>
              prev.filter((a) => a.protocolo !== item.protocolo)
            );
            Alert.alert('Sucesso', 'Agendamento cancelado.');
          } catch (err) {
            console.warn(err);
            Alert.alert('Erro', 'Não foi possível cancelar. Tente novamente.');
          } finally {
            setActionLoading(null);
          }
        },
      },
    ]);
  }

  async function handleReschedule() {
    if (!selected) return;
    if (!newBlockId) {
      Alert.alert('Informe', 'Informe o novo bloco (id_bloco_doacao)');
      return;
    }

    try {
      setActionLoading(selected.protocolo);
      await editAppointment({
        doador_dt_nascimento: selected.doador_dt_nascimento || '',
        doador_cpf: selected.doador_cpf || '',
        tipo: (selected.tipo as 'D' | 'M') || 'D',
        id_bloco_doacao: newBlockId,
        protocolo: selected.protocolo,
      } as any);

      setAppointments((prev) =>
        prev.map((a) =>
          a.protocolo === selected.protocolo
            ? { ...a, id_bloco_doacao: newBlockId }
            : a
        )
      );

      setModalVisible(false);
      Alert.alert('Sucesso', 'Agendamento reagendado.');
    } catch (err) {
      console.warn('Erro ao reagendar', err);
      Alert.alert('Erro', 'Não foi possível reagendar. Tente novamente.');
    } finally {
      setActionLoading(null);
    }
  }

  function renderItem({ item }: { item: Appointment }) {
    const when = new Date(item.data_hora).toLocaleString();
    return (
      <View className="bg-white rounded-lg p-4 mb-3 border border-gray-200">
        <View className="flex-row justify-between">
          <View className="flex-1 pr-2">
            <Text className="text-black font-outfit text-[16px]">
              {item.local}
            </Text>
            <Text className="text-gray-500 mt-1">{when}</Text>
            <Text className="text-gray-500 mt-1">
              Protocolo: {item.protocolo}
            </Text>
          </View>
        </View>

        <View className="flex-row mt-4 gap-4">
          <TouchableOpacity
            className="flex-1 bg-[#e11d48] py-2 rounded-lg items-center"
            onPress={() => openRescheduleModal(item)}
            disabled={!!actionLoading}
          >
            {actionLoading === item.protocolo ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-outfit">Reagendar</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 bg-gray-100 py-2 rounded-lg items-center"
            onPress={() => handleCancel(item)}
            disabled={!!actionLoading}
          >
            {actionLoading === item.protocolo ? (
              <ActivityIndicator color="#e11d48" />
            ) : (
              <Text className="text-[#e11d48]">Cancelar</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <View className="py-6 items-center">
        <Text className="text-xl font-semibold text-black font-outfit">
          Agendamentos
        </Text>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#e11d48" />
        </View>
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.protocolo}
          renderItem={renderItem}
          refreshing={refreshing}
          onRefresh={onRefresh}
          contentContainerStyle={{ paddingBottom: 40 }}
          ListEmptyComponent={() => (
            <View className="items-center mt-12">
              <Text className="text-gray-500">
                Nenhum agendamento encontrado.
              </Text>
            </View>
          )}
        />
      )}

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View className="flex-1 bg-black/40 justify-end">
          <View className="bg-white p-6 rounded-t-3xl">
            <Text className="text-lg font-outfit mb-3">
              Reagendar agendamento
            </Text>
            <Text className="text-sm text-gray-500 mb-3">
              Protocolo: {selected?.protocolo}
            </Text>

            <Text className="text-sm text-gray-600">Novo bloco (id)</Text>
            <TextInput
              value={newBlockId}
              onChangeText={setNewBlockId}
              className="border border-gray-200 rounded-md p-3 mt-2 mb-4"
              placeholder="ex: block-3"
            />

            <View className="flex-row gap-4">
              <TouchableOpacity
                className="flex-1 bg-gray-100 py-3 rounded-lg items-center"
                onPress={() => setModalVisible(false)}
              >
                <Text>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 bg-[#e11d48] py-3 rounded-lg items-center"
                onPress={handleReschedule}
                disabled={!!actionLoading}
              >
                {actionLoading === selected?.protocolo ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text className="text-white">Confirmar</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
