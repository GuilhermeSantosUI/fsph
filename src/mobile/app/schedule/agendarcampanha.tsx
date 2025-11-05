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

export default function AgendarCampanha() {
  const router = useRouter();

  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [campaignModalVisible, setCampaignModalVisible] = useState(false);

  const campaigns = useMemo(
    () => [
      { key: "camp1", label: "Campanha Hemorrede" },
      { key: "camp2", label: "Julho Vermelho" },
      { key: "camp3", label: "Campanha Empresa" },
    ],
    []
  );

  const handleContinue = () => {
    if (!selectedCampaign) return;
    const qs = `campaign=${encodeURIComponent(selectedCampaign)}`;
    router.push((`/schedule/agendarcampanhaconfirm?${qs}`) as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Goback />
        <Text style={styles.headerTitle}>Agendamento</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Agendar Doação em campanha</Text>
        <Text style={styles.subtitle}>Escolha a campanha mais conveniente para você.</Text>

        <View style={[styles.card, styles.campaignCardContainer]}>
          <Text style={styles.cardLabel}>Campanhas disponíveis</Text>

          <TouchableOpacity
            style={styles.inputPlaceholder}
            onPress={() => setCampaignModalVisible(true)}
            accessibilityLabel="Selecionar campanha"
          >
            <Text style={styles.placeholderText}>{selectedCampaign ?? "Selecione"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={campaignModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setCampaignModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Campanhas</Text>
            <ScrollView>
              {campaigns.map((c) => (
                <Pressable
                  key={c.key}
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedCampaign(c.label);
                    setCampaignModalVisible(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{c.label}</Text>
                </Pressable>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setCampaignModalVisible(false)} style={styles.modalClose}>
              <Text style={styles.modalCloseText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.bottomArea}>
        <View style={styles.bottomInner}>
          <TouchableOpacity style={[styles.continueButton, !selectedCampaign && styles.continueButtonDisabled]} onPress={handleContinue} disabled={!selectedCampaign}>
            <Text style={styles.continueText}>Continuar</Text>
          </TouchableOpacity>
        </View>
        <CancelButton />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 6,
  },
  headerTitle: { fontSize: 16, fontWeight: "600", position: "absolute", left: 0, right: 0, textAlign: "center" },
  content: { paddingHorizontal: 18, paddingTop: 8, paddingBottom: 160 },
  title: { fontSize: 16, fontWeight: "600", textAlign: "center", marginTop: 4 },
  subtitle: { color: "#9A9A9A", textAlign: "center", marginTop: 8, marginBottom: 12, fontStyle: "italic" },
  card: { backgroundColor: "#F0F0F0", borderRadius: 10, padding: 12, marginBottom: 12 },
  cardLabel: { fontWeight: "600", color: "#9A9A9A", marginBottom: 10, textAlign: "center" },
  inputPlaceholder: { backgroundColor: "#EDEDED", borderRadius: 8, paddingVertical: 14, alignItems: "center" },
  placeholderText: { color: "#9A9A9A" },
  campaignCardContainer: { minHeight: 120, justifyContent: "center", zIndex: 20, elevation: 20, position: "relative" },

  // bottom
  bottomArea: { position: "absolute", left: 0, right: 0, bottom: 0, height: 160, alignItems: "center", justifyContent: "center" },

  bottomInner: { width: "92%", alignItems: "center", paddingTop: 14 },

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

  continueButtonDisabled: { opacity: 0.6 },

  continueText: {  
    color: "#fff",
    fontWeight: "600",
    fontSize: 16
},

  // modal
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end", padding: 20 },
  modalContent: { backgroundColor: "#fff", borderRadius: 12, padding: 12, maxHeight: 440 },
  modalTitle: { fontSize: 16, fontWeight: "700", marginBottom: 8 },
  modalItem: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "#EEE" },
  modalItemText: { fontSize: 15 },
  modalClose: { marginTop: 8, alignItems: "center", paddingVertical: 8 },
  modalCloseText: { color: "#B71C2C", fontWeight: "700" },
});
