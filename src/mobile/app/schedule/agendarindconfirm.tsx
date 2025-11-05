import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import Goback from "./components/goback";
import CancelButton from "./components/cancelbuttom";

export default function AgendarIndConfirm() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const name = (params.name as string) ?? "Ana Beatriz";
  const location = (params.location as string) ?? "Riomar";
  const date = (params.date as string) ?? "22/08/2025";
  const time = (params.time as string) ?? "08:35";

  const [successVisible, setSuccessVisible] = useState(false);

  const handleConfirm = () => {
    // aqui você pode chamar a API para confirmar o agendamento
    // por enquanto, apenas mostramos o modal de sucesso
    setSuccessVisible(true);
  };

  const handleSuccessClose = () => {
    setSuccessVisible(false);
    // navegar para início (ajuste se preferir outra rota)
    router.push("/");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Goback />
        <Text style={styles.headerTitle}>Agendamento</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>confirme os dados da sua doação:</Text>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Nome:</Text>
          <View style={styles.fieldValue}>
            <Text style={styles.fieldText}>{name}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Local da sua doação:</Text>
          <View style={styles.fieldValue}>
            <Text style={styles.fieldText}>{location}</Text>
          </View>
        </View>

        <View style={styles.cardRow}>
          <View style={[styles.card, styles.halfCard]}>
            <Text style={styles.cardLabel}>Data da sua doação:</Text>
            <View style={styles.fieldValueSmall}>
              <Text style={styles.fieldText}>{date}</Text>
            </View>
          </View>

          <View style={[styles.card, styles.halfCard]}>
            <Text style={styles.cardLabel}>Horário da sua doação:</Text>
            <View style={styles.fieldValueSmall}>
              <Text style={styles.fieldText}>{time}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.bottomArea}>

        <View style={styles.bottomInner}>
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm} accessibilityLabel="Confirmar agendamento">
            <Text style={styles.confirmText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
        <CancelButton />
      </View>
      {/* Success modal */}
      <Modal visible={successVisible} transparent animationType="fade" onRequestClose={handleSuccessClose}>
        <View style={styles.successOverlay}>
          <View style={styles.successCard}>
            <Text style={styles.successIcon}>✅</Text>
            <Text style={styles.successTitle}>Sucesso!</Text>
            <Text style={styles.successMessage}>Sua doação foi agendada.</Text>
            <Text style={styles.successSub}>Para mais informações, siga para o histórico.</Text>
            <TouchableOpacity style={styles.successButton} onPress={handleSuccessClose} accessibilityLabel="Ir para início">
              <Text style={styles.successButtonText}>Início</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 18, paddingTop: 18, paddingBottom: 6 },
  headerTitle: { fontSize: 16, fontWeight: "600", position: "absolute", left: 0, right: 0, textAlign: "center" },
  content: { paddingHorizontal: 18, paddingTop: 12 },
  subtitle: { textAlign: "center", fontStyle: "italic", color: "#9A9A9A", marginBottom: 12,
    fontSize: 20,
   },

  card: { backgroundColor: "#F0F0F0", borderRadius: 10, padding: 12, marginBottom: 12 },
  cardRow: { flexDirection: "row", justifyContent: "space-between" },
  halfCard: { flex: 1, marginRight: 8 },
  cardLabel: { fontWeight: "600", color: "#9A9A9A", marginBottom: 8, textAlign: "center" },

  fieldValue: { backgroundColor: "#EDEDED", borderRadius: 8, paddingVertical: 14, alignItems: "center" },
  fieldValueSmall: { backgroundColor: "#EDEDED", borderRadius: 8, paddingVertical: 12, alignItems: "center" },
  fieldText: { color: "#9A9A9A", fontStyle: "italic" },

  // bottom
  bottomArea: { position: "absolute", left: 0, right: 0, bottom: 0, height: 160, alignItems: "center", justifyContent: "center" },
  
  bottomInner: { width: "92%", alignItems: "center", paddingTop: 14 },
  
  confirmButton: {
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

confirmText: {  
    color: "#fff",
    fontWeight: "600",
    fontSize: 16
},
  // success modal
  successOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  successCard: {
    width: "86%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 18,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },
  successIcon: {
    fontSize: 22,
    marginBottom: 8,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 15,
    color: "#6C6C6C",
    marginBottom: 6,
  },
  successSub: {
    fontSize: 13,
    color: "#9A9A9A",
    marginBottom: 12,
    textAlign: "center",
  },
  successButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  successButtonText: {
    color: "#B71C2C",
    fontWeight: "700",
  },
});
