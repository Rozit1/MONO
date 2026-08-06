import { Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";


import PageBackground from "@/assets/svg/profilebg.svg";
import { BackButton } from "@/components/back-button";
import { TransactionItem } from "@/components/transaction";
import { Transaction, useTransactions } from "@/services/transaction";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFocusEffect, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

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
  },

  totalBalanceContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  totalBalanceTitle: {
    fontSize: 16,
    fontWeight: 'regular',
    color: '#666666',
  },
  totalBalance: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#222222',
  },

  addTransactionButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginTop: 16,
  },
  addTransactionButton: {
    padding: 16,
    borderRadius: '50%',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#2F7E79'
  },
  transactionsListContainer: {
    gap: 8,
    paddingHorizontal: 12,
  },
});


export default function Expense() {
  const { transactions, loading, error, loadTransactions } = useTransactions();

  useFocusEffect(() => {
    loadTransactions();
  });
  return (
    <View style={styles.container} >
      <PageBackground style={styles.headerBackground} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} refreshControl={
        <RefreshControl refreshing={loading} onRefresh={loadTransactions} />
      }>
        <SafeAreaView edges={['top']} style={styles.container} >
          <View style={styles.headerContainer} >
            <BackButton type="light" />
            <Text style={styles.headerTitle}>Transactions</Text>
          </View>
          <Transactions transactions={transactions} />
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

function Transactions({ transactions }: { transactions: Transaction[] }) {
  const router = useRouter();
  const totalIncome = transactions.filter(transaction => transaction.type === 'income').reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalExpense = transactions.filter(transaction => transaction.type === 'expense').reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalBalance = totalIncome - totalExpense;
  return (
    <View style={styles.transactionsContainer} >
      <View style={styles.totalBalanceContainer} >
        <Text style={styles.totalBalanceTitle}>Total Balance</Text>
        <Text style={styles.totalBalance}>${totalBalance}</Text>

        <View style={styles.addTransactionButtonContainer} >
          <Pressable style={styles.addTransactionButton} onPress={() => {
            router.push('/(home)/transaction/add');
          }} >
            <Ionicons name="add" size={28} color="#2F7E79" />
          </Pressable>
        </View>
      </View>

      <View style={styles.transactionsListContainer}>
        {
          transactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))
        }
      </View>
    </View>
  )
}