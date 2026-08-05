import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
    ActivityIndicator,
    Pressable,
    PressableProps,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from "react-native";

type Props = PressableProps & {
    title: string;
    loading?: boolean;
    type?: "primary" | "secondary" | "outline" | "danger" | "disabled";
};

type VariantConfig = {
    gradient: [string, string];
    boxShadow?: string;
    borderColor?: string;
    textColor: string;
};

const variantConfig: Record<Props["type"] & string, VariantConfig> = {
    primary: {
        gradient: ["#69AEA9", "#3F8782"],
        boxShadow: "0px 8px 20px rgba(62, 124, 120, 0.55)",
        borderColor: "#000000",
        textColor: "#FFFFFF",
    },
    secondary: {
        gradient: ["#7FB0E0", "#3D6FA8"],
        boxShadow: "0px 8px 20px rgba(61, 111, 168, 0.55)",
        borderColor: "#000000",
        textColor: "#FFFFFF",
    },
    outline: {
        gradient: ["transparent", "transparent"],
        borderColor: "#3F8782",
        textColor: "#3F8782",
    },
    danger: {
        gradient: ["#E58A8A", "#B33A3A"],
        boxShadow: "0px 8px 20px rgba(179, 58, 58, 0.55)",
        borderColor: "#000000",
        textColor: "#FFFFFF",
    },
    disabled: {
        gradient: ["#C7C7C7", "#9A9A9A"],
        borderColor: "#00000022",
        textColor: "#FFFFFF",
    },
};

const RADIUS = 31.5;
const HEIGHT = 63;

const styles = StyleSheet.create({
    shadowWrapper: {
        borderRadius: RADIUS,
        alignSelf: "stretch",
    },
    button: {
        height: HEIGHT,
        borderRadius: RADIUS,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
        overflow: "hidden",
    },
    text: {
        fontSize: 16,
        fontWeight: "700",
    },
});

export function Button({ title, type = "primary", style, loading, ...props }: Props) {
    const config = variantConfig[type];
    const isFlat = type === "outline" || type === "disabled";

    return (
        <Pressable
            style={({ pressed }) => [
                styles.shadowWrapper,
                config.boxShadow ? ({ boxShadow: config.boxShadow } as ViewStyle) : null,
                pressed && { opacity: 0.85 },
                style as ViewStyle,
            ]}
            disabled={type === "disabled"}
            {...props}
        >
            {
                loading ? (
                    <View style={styles.button} >
                        <ActivityIndicator size="small" color='black' />
                    </View>
                ) :
                    isFlat ? (
                        <View
                            style={[
                                styles.button,
                                {
                                    borderColor: config.borderColor,
                                    backgroundColor:
                                        type === "disabled" ? config.gradient[0] : "transparent",
                                },
                            ]}
                        >
                            <Text style={[styles.text, { color: config.textColor }]}>
                                {title}
                            </Text>
                        </View>
                    ) : (
                        <LinearGradient
                            colors={config.gradient}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                            style={[styles.button, { borderColor: config.borderColor }]}
                        >
                            <Text style={[styles.text, { color: config.textColor }]}>
                                {title}
                            </Text>
                        </LinearGradient>
                    )}
        </Pressable>
    );
}