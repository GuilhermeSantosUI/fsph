import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FileText, MapPin, CalendarBlank, CheckCircle } from 'phosphor-react-native';

export type AppointmentProps = {
  status: string;
  protocolo: string;
  tipo: string;
  local: string;
  endereco: string;
  data: string;
};

type AppointmentCardProps = {
  data: AppointmentProps;
  onCancelPress: () => void;
};

const InfoRow: React.FC<{ label: string; value: string; icon?: React.ReactNode; }> = ({ label, value, icon }) => (
  <View style={styles.infoBlock}>
    <Text style={styles.infoLabel}>{label}</Text>
    <View style={styles.infoValueContainer}>
      {icon}
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

const AppointmentCard: React.FC<AppointmentCardProps> = ({ data, onCancelPress }) => {

  const isCompleted = data.status === 'REALIZADO';

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        
        <View style={[
          styles.statusBadge, 
          isCompleted && styles.statusBadgeCompleted
        ]}>
          {isCompleted ? (
            <CheckCircle size={14} color="#00A676" /> 
          ) : (
            <FileText size={14} color="#555" />
          )}
          <Text style={[
            styles.statusText,
            isCompleted && styles.statusTextCompleted
          ]}>
            {data.status}
          </Text>
        </View>

        <View style={styles.protocoloContainer}>
          <Text style={styles.protocoloLabel}>PROTOCOLO</Text>
          <Text style={styles.protocoloValue}>{data.protocolo}</Text>
        </View>
      </View>

      <View style={styles.infoSection}>
        <InfoRow label="TIPO DE DOAÇÃO" value={data.tipo} />
        <InfoRow 
          label="LOCAL" 
          value={`${data.local} - ${data.endereco}`}
          icon={<MapPin size={16} color="#E74C3C" style={styles.infoIcon} />} 
        />
        <InfoRow 
          label="DATA E HORÁRIO" 
          value={data.data}
          icon={<CalendarBlank size={16} color="#3498DB" style={styles.infoIcon} />}
        />
      </View>

      {!isCompleted ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.cancelButton]}
            onPress={onCancelPress}
          >
            <Text style={styles.buttonText}>Cancelar Agendamento</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.rescheduleButton]}>
            <Text style={styles.buttonText}>Reagendar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.completedMessageContainer}>
          <Text style={styles.completedMessageText}>Este agendamento já foi realizado.</Text>
        </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#EEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingBottom: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  statusText: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'uppercase',
  },
  protocoloContainer: {
    alignItems: 'flex-end',
  },
  protocoloLabel: {
    fontSize: 10,
    color: '#888',
  },
  protocoloValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3498DB',
  },
  infoSection: {
    paddingVertical: 16,
  },
  infoBlock: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 12,
    color: '#888',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  infoValueContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#E74C3C',
    marginRight: 8,
  },
  rescheduleButton: {
    backgroundColor: '#3498DB',
    marginLeft: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  statusBadgeCompleted: {
    backgroundColor: '#E6F6F1',
  },
  statusTextCompleted: {
    color: '#00A676',
  },
  completedMessageContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  completedMessageText: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
  },
});

export default AppointmentCard;