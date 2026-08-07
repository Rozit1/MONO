import PageBackground from "@/assets/svg/profilebg.svg";
import { BackButton } from "@/components/back-button";
import { TransactionDetailsCard } from "@/components/transaction-detail";
import {
    Transaction,
    TransactionCategory,
    TransactionType,
    useTransaction,
} from "@/services/transaction";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const defaultDemoTransaction: Transaction = {
  id: "demo",
  name: "Claire Jovalski",
  amount: 85.0,
  date: new Date(2022, 1, 29, 16, 30), // Feb 29, 2022 04:30 PM
  category: TransactionCategory.OTHER,
  type: TransactionType.EXPENSE,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default function TransactionDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { transaction, loading } = useTransaction(id ?? "");

  const displayTransaction = transaction || defaultDemoTransaction;

  return (
    <View style={styles.container}>
      <PageBackground style={styles.headerBackground} />
      <SafeAreaView edges={["top"]} style={styles.container}>
        <View style={styles.headerContainer}>
          <BackButton type="light" />
          <Text style={styles.headerTitle}>Transaction Details</Text>
        </View>

        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.cardWrapper}>
            {loading && !transaction ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2F7E79" />
              </View>
            ) : (
              <TransactionDetailsCard transaction={displayTransaction} />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 46, // offset BackButton padding for centering title
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    flex: 1,
  },
  cardWrapper: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: 40,
    padding: 16,
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
