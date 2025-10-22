import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";



export default function Goback(){

    const router = useRouter();

    const HandleBack = () => {   
        router.back();
        }


    return (
        <TouchableOpacity style={styles.bottomBack} onPress={HandleBack}>
            <Ionicons name="chevron-back" size={22} color="#000" />
        </TouchableOpacity>
    )
}

const styles =StyleSheet.create({
    bottomBack: {
    padding: 10,
    zIndex: 1,
  },
})