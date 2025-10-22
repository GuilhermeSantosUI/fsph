import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native"; 

export default function CancelButton() {
    const router = useRouter();

    const handleHome = () => {
    router.push("/onboarding1");
  }

    return (
        <TouchableOpacity style={styles.cancelButton} onPress={handleHome}>
            <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create ({
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

})