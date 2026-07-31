import { Text, View, StyleSheet} from "react-native";
import { Image } from "expo-image";
import Background from "@/assets/svg/onboardingbg.svg";
import { Button } from "@/components/buttons";

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
    // paddingHorizontal: 16,
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
        />

        <Text style={styles.footer}>
          Already Have Account?
          <Text style={styles.login}> Log In</Text>
        </Text>
      </View>

    </View>
  );
}