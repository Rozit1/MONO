import { assertUserAuthenticated } from "@/utils/firebase";
import * as Crypto from "expo-crypto";
import {
    collection,
    deleteDoc,
    doc,
    DocumentData,
    DocumentSnapshot,
    getDoc,
    getDocs,
    serverTimestamp,
    setDoc,
    Timestamp,
    updateDoc,
} from "firebase/firestore";
import { useCallback, useEffect, useMemo, useState } from "react";
import { firestore } from "./firebase";

export enum TransactionType {
  INCOME = "income",
  EXPENSE = "expense",
}

export enum TransactionCategory {
  // Expense
  FOOD = "food",
  TRANSPORT = "transport",
  HOUSING = "housing",
  UTILITIES = "utilities",
  ENTERTAINMENT = "entertainment",

  // Income
  SALARY = "salary",
  INVESTMENT = "investment",

  // Common
  OTHER = "other",
}

export interface Transaction {
  id: string;
  name: string;
  amount: number;
  date: Date;
  category: TransactionCategory;
  type: TransactionType;
  createdAt: Date;
  updatedAt: Date;
}

function createTransactionDocRef(transactionId: string) {
  const currentUser = assertUserAuthenticated();
  console.log(currentUser.uid, transactionId);
  return doc(
    firestore,
    "users",
    currentUser.uid,
    "transactions",
    transactionId,
  );
}

function createTransactionCollectionRef() {
  const currentUser = assertUserAuthenticated();
  return collection(firestore, "users", currentUser.uid, "transactions");
}

function toDate(value: any): Date | null {
  if (!value) return null;

  // Firestore Timestamp
  if (value instanceof Timestamp) {
    return value.toDate();
  }

  // Serialized Timestamp
  if (typeof value.seconds === "number") {
    return new Date(value.seconds * 1000);
  }

  // Already a Date
  if (value instanceof Date) {
    return value;
  }

  return null;
}

function toTransaction(
  transaction: DocumentSnapshot<DocumentData>,
): Transaction | null {
  const rawData = transaction.data();
  if (!rawData) return null;

  return {
    ...rawData,
    id: transaction.id,
    date: toDate(rawData.date),
    createdAt: toDate(rawData.createdAt),
    updatedAt: toDate(rawData.updatedAt),
  } as Transaction;
}

export async function getTransaction(id: string) {
  const transactionDoc = createTransactionDocRef(id);
  const transaction = await getDoc(transactionDoc);
  if (!transaction.exists()) {
    throw new Error("Transaction not found");
  }
  return toTransaction(transaction);
}

export async function getTransactions() {
  const collectionRef = createTransactionCollectionRef();
  const transactions = await getDocs(collectionRef);
  if (transactions.empty) return [];

  return transactions.docs
    .map(toTransaction)
    .filter((transaction) => transaction !== null);
}

export async function createTransaction(
  transaction: Omit<Transaction, "id" | "createdAt" | "updatedAt">,
) {
  const transactionDoc = createTransactionDocRef(Crypto.randomUUID());

  await setDoc(transactionDoc, {
    ...transaction,
    date: Timestamp.fromDate(transaction.date),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return getTransaction(transactionDoc.id);
}

export async function updateTransaction(
  transaction: Omit<Transaction, "createdAt" | "updatedAt">,
) {
  const transactionRef = createTransactionDocRef(transaction.id);

  const snapshot = await getDoc(transactionRef);
  if (!snapshot.exists()) {
    throw new Error("Transaction not found");
  }

  await updateDoc(transactionRef, {
    ...transaction,
    date: Timestamp.fromDate(transaction.date),
    updatedAt: serverTimestamp(),
  });
  return getTransaction(transaction.id);
}

export async function deleteTransaction(transaction: Transaction) {
  const transactionRef = createTransactionDocRef(transaction.id);

  const snapshot = await getDoc(transactionRef);
  if (!snapshot.exists()) {
    throw new Error("Transaction not found");
  }

  await deleteDoc(transactionRef);
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const transactions = await getTransactions();
      setTransactions(transactions);
    } catch (error) {
      console.error("Error loading transactions", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    loadTransactions();
  }, []);
  return { transactions, loading, error, loadTransactions };
}

const useDashboardStats = () => {
  const transactions = useTransactions();

  const stats = useMemo(() => {
    if (transactions.loading)
      return {
        totalIncome: 0,
        totalExpense: 0,
      };
    return {
      totalIncome: transactions.transactions
        .filter((transaction) => transaction.type === TransactionType.INCOME)
        .reduce((acc, transaction) => acc + transaction.amount, 0),
      totalExpense: transactions.transactions
        .filter((transaction) => transaction.type === TransactionType.EXPENSE)
        .reduce((acc, transaction) => acc + transaction.amount, 0),
    };
  }, [transactions]);

  return { stats, ...transactions };
};

export default useDashboardStats;
