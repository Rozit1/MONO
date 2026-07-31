import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native"

type Props = TextInputProps & {
    label?: string
    error?: string
    title?: string
}

export function InputField({ label, style: inputStyle, error,title, ...props }: Props) {
    return (
        <View>
            {label && <Text style={styles.title}>{label}</Text>}
            <TextInput style={[styles.input, inputStyle]} {...props} />
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: "rgba(200, 237, 234, 1)",
        backgroundColor: "rgba(240, 250, 249, 1)",
        height: 48,
        borderRadius: 8,
        padding: 10,
    },
    error: {
        color: 'red',
        fontSize: 12,
    },
    
    title: {
        fontSize: 12,
        fontWeight: "700",
        color: "rgba(90, 140, 136, 1)",
        fontFamily: "Inter",
    },
})