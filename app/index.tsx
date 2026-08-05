import { Text, View, StyleSheet} from "react-native";
import { Image } from "expo-image";
import Background from "@/assets/svg/onboardingbg.svg";
import { Button } from "@/components/buttons";
import {router, useRouter} from "expo-router";

const styles = StyleSheet.create({
  
  logo: {
    position: "absolute",
    top: 100,
    left: 0,
    right: 0,
    bottom: 0
  }, 

  bottomContainer: {
    paddingHorizontal: 16,
    alignItems: "center",
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
  const router = useRouter();
  return (
    <View style={{ flex: 1 }}>
      <View>
          <Background />
          <Image
              source={require("@/assets/svg/onboarding.png")}
              style={styles.logo}
          />
      </View>
     

       <View style={styles.bottomContainer}>
        <Button
          title="Get Started"
          type="primary"
          onPress={() => router.push("/signup")}
        />

        <Text style={styles.footer}>
          Already Have Account?
          <Text style={styles.login} onPress={() => router.push("/login")}>
            Log In
          </Text>
        </Text>
      </View>

    </View>
  );
}