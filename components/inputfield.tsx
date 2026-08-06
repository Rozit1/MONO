import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";

export type InputFieldProps = TextInputProps & {
    label?: string
    error?: string
}

export function InputField({ label, style: inputStyle, error, secureTextEntry, ...props }: InputFieldProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry);
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={[styles.inputContainer]}>
                <TextInput style={[styles.input, inputStyle]} secureTextEntry={isPasswordVisible} {...props} />
                {secureTextEntry && (
                    <TouchableOpacity style={styles.inputSuffix} onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                        <Ionicons name={isPasswordVisible ? "eye-off" : "eye"} size={20} color="#5A8C88" />
                    </TouchableOpacity>
                )}
            </View>
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 6,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: '#C8EDEA',
        borderRadius: 8,
        backgroundColor: '#F0FAF9',
    },
    input: {
        flex: 1,
        minHeight: 45,
        paddingHorizontal: 8,
    },
    inputSuffix: {
        flex: 0,
        paddingHorizontal: 8,
    },
    error: {
        color: 'red',
        fontSize: 12,
    },
    label: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#5A8C88',
    },
})