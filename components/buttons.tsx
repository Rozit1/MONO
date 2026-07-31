import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type Props = PressableProps & {
  title: string;
  type: "primary" | "secondary" | "outline" | "danger" | "disabled";
};

const buttonStyles: Record<Props["type"], ViewStyle> = {
  primary: {
    backgroundColor: "#3F8782",
    borderWidth: 1,
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
  },
  secondary: {
    backgroundColor: "green",
  },
  outline: {
    borderWidth: 1,
    borderColor: "blue",
  },
  danger: {
    backgroundColor: "red",
  },
  disabled: {
    backgroundColor: "gray",
  },
} as const;

const styles = StyleSheet.create({
  common: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 40,
    height: 64,
    width: 358,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export function Button({ title, type = "primary", ...props }: Props) {
  return (
    <Pressable style={[buttonStyles[type], styles.common]} {...props}>
      <LinearGradient
        colors={["#8B5CF6", "#EC4899"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      ></LinearGradient>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}
