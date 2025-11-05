import React, { useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Goback from "./components/goback";
import CancelButton from "./components/cancelbuttom";

export default function AgendarInd() {
  const router = useRouter();

  // estados para as 3 opções
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  // flags para abrir modais
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [timeModalVisible, setTimeModalVisible] = useState(false);

  const handleContinue = () => {
    // envio/validação mínima: exigir as 3 escolhas antes de navegar
    if (!selectedDate || !selectedTime || !selectedLocation) {
      // aqui você pode mostrar um Toast ou realçar campos; por enquanto, apenas retorna
      return;
    }
    // navegar para tela de confirmação passando valores selecionados
    // enviar como query string para que useSearchParams() na tela de confirmação consiga ler
    const qs = `date=${encodeURIComponent(selectedDate)}&time=${encodeURIComponent(selectedTime)}&location=${encodeURIComponent(selectedLocation)}`;
    router.push((`/schedule/agendarindconfirm?${qs}`) as any);
  };

  // gerar próximos 7 dias formatados
  const next7Days = useMemo(() => {
    const days: { key: string; label: string }[] = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      days.push({
        key: d.toISOString(),
        label: d.toLocaleDateString(),
      });
    }
    return days;
  }, []);

  const timeSlots = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "13:00",
    "14:00",
    "15:00",
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Goback />
        <Text style={styles.headerTitle}>Agendar Doação Individual</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.intro}>Escolha a data, horário e local de coleta mais conveniente para você.</Text>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Selecione a data da sua doação.</Text>
          <TouchableOpacity
            style={styles.inputPlaceholder}
            onPress={() => setDateModalVisible(true)}
            accessibilityLabel="Selecionar data"
          >
            <Text style={styles.placeholderText}>{selectedDate ?? "xx/xx/xxxx"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Escolha o horário disponível.</Text>
          <TouchableOpacity
            style={styles.inputPlaceholder}
            onPress={() => setTimeModalVisible(true)}
            accessibilityLabel="Selecionar horário"
          >
            <Text style={styles.placeholderText}>{selectedTime ?? "--:--"}</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.card, styles.locationCardContainer]}>
          <Text style={styles.cardLabel}>Selecione o local da coleta.</Text>

          <View style={styles.locationCard}>
            {[
              { key: "Riomar", label: "Riomar" },
              { key: "Renascenca", label: "Renascença" },
              { key: "Decos", label: "Decos" },
            ].map((loc) => {
              const selected = selectedLocation === loc.key;
              return (
                <TouchableOpacity
                  key={loc.key}
                  style={[styles.locationButton, selected && styles.locationButtonSelected]}
                  onPress={() => setSelectedLocation(loc.key)}
                  accessibilityLabel={`Selecionar local ${loc.label}`}
                >
                  <Text style={[styles.locationText, selected && styles.locationTextSelected]}>{loc.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Modal de seleção de data */}
      <Modal
        visible={dateModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setDateModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Escolha uma data</Text>
            <ScrollView>
              {next7Days.map((d) => (
                <Pressable
                  key={d.key}
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedDate(d.label);
                    setDateModalVisible(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{d.label}</Text>
                </Pressable>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setDateModalVisible(false)} style={styles.modalClose}>
              <Text style={styles.modalCloseText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de seleção de horário */}
      <Modal
        visible={timeModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setTimeModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Escolha um horário</Text>
            <ScrollView>
              {timeSlots.map((t) => (
                <Pressable
                  key={t}
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedTime(t);
                    setTimeModalVisible(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{t}</Text>
                </Pressable>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setTimeModalVisible(false)} style={styles.modalClose}>
              <Text style={styles.modalCloseText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.bottomArea}>
       
        <View style={styles.bottomInner}>
          <Text style={styles.note}>Lembre-se: você só pode doar novamente após o período mínimo desde sua última doação.</Text>
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueText}>Continuar</Text>
          </TouchableOpacity>
        </View>
        <CancelButton />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 6,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 160, // espaço para o rodapé
  },
  intro: {
    color: "#6C6C6C",
    marginBottom: 12,
    fontSize: 14,
  },
  card: {
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  cardLabel: {
    fontWeight: "600",
    color: "#9A9A9A",
    marginBottom: 10,
  },
  inputPlaceholder: {
    backgroundColor: "#EDEDED",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  placeholderText: {
    color: "#9A9A9A",
  },
  locationCardContainer: {
    // deixar um pouco maior como na imagem
    minHeight: 140,
    justifyContent: "center",
    zIndex: 20,
    elevation: 20,
    position: "relative",
  },
  locationCard: {
    marginTop: 6,
    alignItems: "center",
  },
  locationButton: {
    backgroundColor: "#fff",
    width: "80%",
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  locationText: {
    color: "#B71C2C",
    fontWeight: "600",
  },
  locationButtonSelected: {
    backgroundColor: "#B71C2C",
  },
  locationTextSelected: {
    color: "#fff",
  },

  // bottom area
  bottomArea: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
  },

  bottomInner: {
    width: "92%",
    alignItems: "center",
    paddingTop: 14,
  },
  note: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 12,
  },
  continueButton: {
    position: "absolute",
    bottom: 80,
    backgroundColor: "#B71C2C",
    paddingHorizontal: 45,
    paddingVertical: 10,
    borderRadius: 8,
    elevation: 4, // Android
    shadowColor: "#000", // iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  continueText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  // modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    maxHeight: 440,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
  modalItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  modalItemText: {
    fontSize: 15,
  },
  modalClose: {
    marginTop: 8,
    alignItems: "center",
    paddingVertical: 8,
  },
  modalCloseText: {
    color: "#B71C2C",
    fontWeight: "700",
  },
});
