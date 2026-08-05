import { Text, View, StyleSheet } from "react-native";
import PageBackground from "@/assets/svg/profilebg.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackButton } from "@/components/back-button";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'semibold',
    textAlign: 'center',
    flex: 1,
    marginRight: 46
  },
  transactionsContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
    marginTop: 50,
  }
});


export default function Expense() {
  return (
    <View style={styles.container} >
      <PageBackground style={styles.headerBackground} />
      <SafeAreaView style={styles.container} >
        <View style={styles.headerContainer} >
          <BackButton type="light" />
          <Text style={styles.headerTitle}>Transactions</Text>
        </View>
        <View style={styles.transactionsContainer} >

        </View>
      </SafeAreaView>
    </View>
  );
}