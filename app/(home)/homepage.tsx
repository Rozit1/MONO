import { StatusBar } from "expo-status-bar";
import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";

import PageBackground from "@/assets/svg/profilebg.svg";
import { TransactionItem } from "@/components/transaction";
import { auth } from "@/services/firebase";
import { useTransactions } from "@/services/transaction";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

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
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 4,
  },
  headerTitle: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  headerSubtitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  pageContainer: {
    flex: 1,
  },
  balanceCard: {
    marginTop: 28,
    marginHorizontal: 16,
    backgroundColor: "#2F7E79",
    borderRadius: 16,
    padding: 16,
    boxShadow: "0px 10px 18px rgba(27, 92, 88, 0.35)",
  },
  balanceCardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  balanceCardAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },
  balanceCardFooter: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  balanceCardFooterItems: {
    gap: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  balanceCardFooterItem: {
    flexDirection: "row",
    gap: 8,
  },
  balanceCardFooterItemIcon: {
    padding: 6,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF1A",
    width: 30,
    height: 30,
  },
  balanceCardFooterItemText: {
    fontSize: 14,
    fontWeight: "500",
    color: "white",
    paddingTop: 4,
  },
  balanceCardFooterItemAmount: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    marginTop: 6,
  },
  recentTransactionsContainer: {
    marginVertical: 32,
    marginHorizontal: 16,
    gap: 8,
    paddingHorizontal: 12,
  },
  recentTransactionsHeader: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  recentTransactionsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222222",
  },
  viewAllTransaction: {
    fontSize: 14,
    fontWeight: "400",
    color: "#666666",
  },
});

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Morning";
  if (hour < 18) return "Afternoon";
  return "Evening";
}

export default function Dashboard() {
  const { transactions, loading, error, loadTransactions } = useTransactions();

  useFocusEffect(() => {
    loadTransactions();
  });

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  return (
    <View style={styles.container}>
      <PageBackground style={styles.headerBackground} />
      <StatusBar style="light" />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={loadTransactions}
          />
        }
      >
        <SafeAreaView
          edges={["top", "left", "right"]}
          style={styles.container}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>
              Good {getGreeting()},
            </Text>

            <Text style={styles.headerSubtitle}>
              {auth.currentUser?.displayName}
            </Text>
          </View>

          <View style={styles.pageContainer}>
            <BalanceCard
              totalIncome={totalIncome}
              totalExpense={totalExpense}
              totalBalance={totalBalance}
            />

            <View style={styles.recentTransactionsContainer}>
              <View style={styles.recentTransactionsHeader}>
                <Text style={styles.recentTransactionsTitle}>
                  Recent Transactions
                </Text>

                <Link href="/transaction">
                  <Text style={styles.viewAllTransaction}>
                    See All
                  </Text>
                </Link>
              </View>

              {transactions.slice(0, 5).map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

function BalanceCard({
  totalIncome,
  totalExpense,
  totalBalance,
}: {
  totalIncome: number;
  totalExpense: number;
  totalBalance: number;
}) {
  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceCardTitle}>Total Balance</Text>

      <Text style={styles.balanceCardAmount}>
        ${totalBalance}
      </Text>

      <View style={styles.balanceCardFooter}>
        <View style={styles.balanceCardFooterItems}>
          <View style={styles.balanceCardFooterItem}>
            <View style={styles.balanceCardFooterItemIcon}>
              <Ionicons
                name="arrow-up"
                size={18}
                color="white"
              />
            </View>
          </View>

          <View>
            <Text style={styles.balanceCardFooterItemText}>
              Income
            </Text>

            <Text style={styles.balanceCardFooterItemAmount}>
              ${totalIncome}
            </Text>
          </View>
        </View>

        <View style={styles.balanceCardFooterItem}>
          <View style={styles.balanceCardFooterItemIcon}>
            <Ionicons
              name="arrow-down"
              size={18}
              color="white"
            />
          </View>

          <View>
            <Text style={styles.balanceCardFooterItemText}>
              Expense
            </Text>

            <Text style={styles.balanceCardFooterItemAmount}>
              ${totalExpense}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}