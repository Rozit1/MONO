import { Text, View, StyleSheet} from "react-native";
import { Image } from "expo-image";
import Background from "@/assets/svg/onboardingbg.svg";
import { Button } from "@/components/buttons";
import {router} from "expo-router";
import { Stack } from "expo-router";

const styles = StyleSheet.create({
  
  logo: {
    position: "absolute",
    top: 100,
    left: 0,
    right: 0,
    bottom: 0
  }, 

  bottomContainer: {
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 40,
    width: "100%",
    marginTop: "auto", 
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

})

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
    <Stack.Screen options={{ headerShown: false }} />
      <View>
          <Background />
          
      </View>
     

       <View style={styles.bottomContainer}>
        <Button
          title="Sign In"
          type="primary"
        />
        <Text style={styles.footer}>
          Don't have an account?
          <Text style={styles.login} onPress={() => router.push("/signup")}>
            Sign Up
          </Text>
        </Text>
      </View>

    </View>
  );
}