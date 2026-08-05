import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import {StyleSheet, TouchableOpacity} from "react-native";

const styles = StyleSheet.create({
    container: {
        padding: 14,
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        alignSelf: "flex-start",
    },
});

export function BackButton({ type = 'dark' }: { type?: 'light' | 'dark' }) {
    const router = useRouter();
    return (
        <TouchableOpacity style={styles.container} onPress={() => router.back()}>
            <Ionicons name="chevron-back-outline" size={24} color={type == "dark" ? "black" : "white"} />
        </TouchableOpacity>
    )
}
    