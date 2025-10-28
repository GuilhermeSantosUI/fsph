import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import AppointmentCard from '../../components/AppointmentCard';
import CancelModal from '../../components/CancelModal';
import { AppointmentProps } from '../../components/AppointmentCard'; 

const mockAgendamentos: AppointmentProps[] = [
  {
    status: 'MARCADO',
    protocolo: 'D-20251120-1',
    tipo: 'Doação de Sangue Individual',
    local: 'HEMOSE - ARACAJU/SE',
    endereco: 'Av. Prof. José Bonifácio Fortes Neto, 400 - Bloco Adm 02 - Capucho CEP: 49095-000',
    data: '20/12/2025 - 07:30 às 07:45',
  },
  {
    status: 'MARCADO',
    protocolo: 'D-20251120-2',
    tipo: 'Doação de Sangue Individual',
    local: 'HEMOSE - ARACAJU/SE',
    endereco: 'Av. Prof. José Bonifácio Fortes Neto, 400 - Bloco Adm 02 - Capucho CEP: 49095-000',
    data: '10/02/2026 - 07:30 às 07:45',
  },
  {
    status: 'REALIZADO',
    protocolo: 'D-20251015-3',
    tipo: 'Doação de Plaquetas',
    local: 'HEMOSE - ARACAJU/SE',
    endereco: 'Av. Prof. José Bonifácio Fortes Neto, 400 - Bloco Adm 02 - Capucho CEP: 49095-000',
    data: '15/10/2025 - 09:00 às 10:00',
  },
];

export default function AgendamentosScreen() {
  
  const [agendamentos, setAgendamentos] = useState(mockAgendamentos);
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProtocol, setSelectedProtocol] = useState<string | null>(null);

  const handleOpenCancelModal = (protocolo: string) => {
    setSelectedProtocol(protocolo);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedProtocol(null);
  };

  const handleConfirmCancel = () => {
    if (!selectedProtocol) return;

    console.log("Chamando API para cancelar protocolo:", selectedProtocol);
    
    setAgendamentos(prevAgendamentos => 
      prevAgendamentos.filter(ag => ag.protocolo !== selectedProtocol)
    );

    handleCloseModal();
  };
  const totalAgendamentos = agendamentos.length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Seus agendamentos</Text>
          <Text style={styles.headerSubtitle}>
            {totalAgendamentos} agendamento(s) encontrado(s)
          </Text>
        </View>

        {agendamentos.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum agendamento encontrado.</Text>
        ) : (
          agendamentos.map((agendamento) => (
            <AppointmentCard 
              key={agendamento.protocolo}
              data={agendamento} 
              onCancelPress={() => handleOpenCancelModal(agendamento.protocolo)}
            />
          ))
        )}

      </ScrollView>

      <CancelModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onConfirm={handleConfirmCancel}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#F9F9F9'
  },
  container: { 
    flex: 1, 
    paddingHorizontal: 20 
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#888',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 10,
  },
  headerTitle: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#3498DB',
    fontWeight: '600',
  },
});