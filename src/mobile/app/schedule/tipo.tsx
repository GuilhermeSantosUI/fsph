import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CancelButton from "./components/cancelbuttom";
import Goback from "./components/goback";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";


export default function Tipo() {
  const router = useRouter();
  
  const handleNext = () => {
    router.push("/schedule/segunda");
  }

  return (
      <SafeAreaView style={styles.container}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Goback></Goback>
          <Text style={styles.headerTitle}>Pré-triagem</Text>
        </View>
  
        {/* Pergunta + Opções (agora dentro de content para centralizar) */}
        <View style={styles.content}>
          <Text style={styles.question}>Escolha abaixo como deseja realizar sua doação. Você pode agendar uma doação individual em um posto de coleta ou se inscrever em uma campanha coletiva organizada pelo HEMOSE.</Text>
  

          <TouchableOpacity style={styles.containerOptions1}>
            <Text style={styles.optionText}>Doação Individual</Text>

          </TouchableOpacity>

          <TouchableOpacity style={styles.containerOptions2}>
            <Text style={styles.optionText}>Campanha Coletiva</Text>

          </TouchableOpacity>

        </View>
  
        {/* Fundo curvado */}
        <View style={styles.bottomArea}>
          <View style={styles.redBackground} />
          <CancelButton></CancelButton>
        </View>

      </SafeAreaView>
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
    marginBottom: 180,
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
    justifyContent: "center", 
    paddingVertical: 20,
    marginBottom: 50,
  },
  question: {
    textAlign: "center",
    fontSize: 26,
    color: "#8C8C8C",
    fontStyle: "italic",
    marginTop: 100,
  },

  containerOptions1: {
    marginTop: 50,
    backgroundColor: "#F0F0F0",
    marginBottom: 10,
    borderRadius: 8,
    padding: 10,
    width: "90%",
    alignSelf: "center",
    minHeight: 150,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
    elevation: 6, // Android
    shadowColor: "#000", // iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },

  containerOptions2: {
    backgroundColor: "#F0F0F0",
    marginBottom: 300,
    borderRadius: 8,
    padding: 10,
    width: "90%",
    alignSelf: "center",
    minHeight: 150,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
    elevation: 6, // Android
    shadowColor: "#000", // iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
    optionText: {
        color: "#000",
        fontWeight: "600",
        fontSize: 16,
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
  
  
});