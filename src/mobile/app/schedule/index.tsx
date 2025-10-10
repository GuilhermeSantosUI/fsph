import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PreTriagem() {
  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Ionicons name="chevron-back" size={22} color="#000" />
        <Text style={styles.headerTitle}>Pré-triagem</Text>
      </View>

      {/* Pergunta + Opções (agora dentro de content para centralizar) */}
      <View style={styles.content}>
        <Text style={styles.question}>Você tem mais de 50kg?</Text>

        <View style={styles.containerOptions}>
          <TouchableOpacity style={styles.sim}>
          <Text style={styles.cancelText}>Sim</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nao}>
          <Text style={styles.cancelText}>Não</Text>
        </TouchableOpacity>
        </View>
      </View>

      {/* Fundo curvado */}
      <View style={styles.bottomArea}>
        <View style={styles.redBackground} />
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // Cabeçalho
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    position: "relative",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    marginTop: 60,
  },

  // Texto da pergunta + opções centralizados
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 30,
    justifyContent: "center", // centraliza verticalmente
    paddingVertical: 20,
    marginBottom: 50,
  },
  question: {
    textAlign: "center",
    fontSize: 26,
    color: "#8C8C8C",
    fontStyle: "italic",
    marginBottom: 200,
  },

  containerOptions: {
    backgroundColor: "#F0F0F0",
    marginBottom: 200,
    borderRadius: 8,
    padding: 10,
    width: "90%",
    alignSelf: "center",
    minHeight: 220,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
    elevation: 6, // Android
    shadowColor: "#000", // iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },

  sim: {
    backgroundColor: "#D9D9D9",
    width: "70%",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  nao: {
    backgroundColor: "#D9D9D9",
    width: "70%",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  // Área inferior
  bottomArea: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
  },

  redBackground: {
    position: "absolute",
    bottom: -200,
    left: "-90%",
    width: "200%",
    height: 600,
    backgroundColor: "#B71C2C",
    borderTopLeftRadius: 1000,
    borderTopRightRadius: 8000,
    transform: [{ scaleX: 1.4 }, { scaleY: 1.5 }, { rotate: "-6deg" }],
  },

  // Botão cancelar
  cancelButton: {
    position: "absolute",
    bottom: 80,
    backgroundColor: "#fff",
    paddingHorizontal: 45,
    paddingVertical: 10,
    borderRadius: 8,
    elevation: 4, // Android
    shadowColor: "#000", // iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  cancelText: {
    color: "#B71C2C",
    fontWeight: "600",
    fontSize: 16,
  },
});
