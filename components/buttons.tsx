import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
    Platform,
    Pressable,
    PressableProps,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from "react-native";

type Props = PressableProps & {
    title: string;
    type?: "primary" | "secondary" | "outline" | "danger" | "disabled";
};

type VariantConfig = {
    gradient: [string, string];
    shadowColor: string;
    borderColor?: string;
    textColor: string;
};

const variantConfig: Record<Props["type"] & string, VariantConfig> = {
    primary: {
        gradient: ["#69AEA9", "#3F8782"],
        shadowColor: "#3E7C78",
        borderColor: "#000000",
        textColor: "#FFFFFF",
    },
    secondary: {
        gradient: ["#7FB0E0", "#3D6FA8"],
        shadowColor: "#3D6FA8",
        borderColor: "#000000",
        textColor: "#FFFFFF",
    },
    outline: {
        gradient: ["transparent", "transparent"],
        shadowColor: "transparent",
        borderColor: "#3F8782",
        textColor: "#3F8782",
    },
    danger: {
        gradient: ["#E58A8A", "#B33A3A"],
        shadowColor: "#B33A3A",
        borderColor: "#000000",
        textColor: "#FFFFFF",
    },
    disabled: {
        gradient: ["#C7C7C7", "#9A9A9A"],
        shadowColor: "transparent",
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

function getShadowStyle(shadowColor: string): ViewStyle {
    if (shadowColor === "transparent") return {};
    return Platform.select<ViewStyle>({
        ios: {
            shadowColor,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.55,
            shadowRadius: 20,
        },
        android: {
            elevation: 10,
            shadowColor,
        },
        default: {},
    })!;
}

export function Button({ title, type = "primary", style, ...props }: Props) {
    const config = variantConfig[type];
    const isFlat = type === "outline" || type === "disabled";

    return (
        <Pressable
            style={({ pressed }) => [
                styles.shadowWrapper,
                getShadowStyle(config.shadowColor),
                pressed && { opacity: 0.85 },
                style as ViewStyle,
            ]}
            disabled={type === "disabled"}
            {...props}
        >
            {isFlat ? (
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