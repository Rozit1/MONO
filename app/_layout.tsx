import { initializeFirebase } from "@/services/firebase";
import { Stack } from "expo-router";
import "react-native-reanimated";
import Toast from "react-native-toast-message";

const { auth } = initializeFirebase();

export const unstable_settings = {
  anchor: "index",
};

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      <Toast />
    </>
  );
}
