import { Text, View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import Background from "@/assets/svg/onboardingbg.svg";
import { Button } from "@/components/buttons";
import { router } from "expo-router";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackButton } from "@/components/back-button";
import { InputField } from "@/components/inputfield";
import { useState } from "react";
import { signUp } from "@/services/firebase";
import Toast from "react-native-toast-message";

const styles = StyleSheet.create({
  logo: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  bottomContainer: {
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 40,
    width: "100%",
    marginTop: 46,
  },

  formcontainer: {
    padding: 18,
    gap: 26,
    marginTop: 50 ,
  },

  headercontainer: {
    paddingHorizontal: 14,
  },

  headertitle: {
    fontSize: 24,
    fontWeight: "600",
    fontFamily: "Inter",
  },

  headersubtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "rgba(90, 140, 136, 1)",
    fontFamily: "Inter",
  },

  footer: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 14,
    color: "#444444",
  },

  login: {
    color: "#4D9D8F",
    fontWeight: "600",
  },
});

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = () => {
    setIsLoading(true);
    signUp(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.push("/login");
        Toast.show({
          type: "success",
          text1: "Account created successfully!",
        });
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        Toast.show({
          type: "error",
          text1: "Error creating account",
          text2: error.message,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.logo}>
        <Background />
      </View>

      <SafeAreaView>
        <View>
          <BackButton />
          <View style={styles.headercontainer}>
            <Text style={styles.headertitle}>Create</Text>
            <Text style={styles.headertitle}>Account</Text>
            <Text style={styles.headersubtitle}>
              Join to start tracking your finances
            </Text>
          </View>
        </View>

        <View style={styles.formcontainer}>
          <InputField label="Full Name" value={fullName} onChangeText={setFullName}/>
          <InputField label="Email Address" value={email} onChangeText={setEmail}/>
          <InputField label="Password" value={password} onChangeText={setPassword} secureTextEntry/>
        </View>

        <View style={styles.bottomContainer}>
        <Button
          title="Create Account"
          type="primary"
          onPress={() => handleSignup()}
        />

        <Text style={styles.footer}>
          Already have an account?
          <Text style={styles.login} onPress={() => router.push("/login")}>
            Log In
          </Text>
        </Text>
      </View>
      </SafeAreaView>
    </View>
  );
}
