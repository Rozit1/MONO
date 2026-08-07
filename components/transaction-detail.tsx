import { Button } from "@/components/buttons";
import { Transaction, TransactionType } from "@/services/transaction";
import Ionicons from "@expo/vector-icons/Ionicons";
import dayjs from "dayjs";
import React, { useState } from "react";
import {
    Pressable,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    View,
    ViewStyle,
} from "react-native";
import Toast from "react-native-toast-message";

export interface DetailRowProps {
  label: string;
  value: string | number;
  valueColor?: string;
  isBold?: boolean;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
}

export function DetailRow({
  label,
  value,
  valueColor,
  isBold = false,
  style,
  labelStyle,
  valueStyle,
}: DetailRowProps) {
  return (
    <View style={[styles.detailRow, style]}>
      <Text style={[styles.detailLabel, labelStyle]}>{label}</Text>
      <Text
        style={[
          styles.detailValue,
          valueColor ? { color: valueColor } : null,
          isBold && styles.boldValue,
          valueStyle,
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

export interface TransactionDetailsCardProps {
  transaction: Transaction;
  onDownloadReceipt?: () => void;
}

export function TransactionDetailsCard({
  transaction,
  onDownloadReceipt,
}: TransactionDetailsCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const isExpense = transaction.type === TransactionType.EXPENSE;
  const formattedDate = dayjs(transaction.date).format("MMM DD, YYYY");
  const formattedTime = dayjs(transaction.date).format("hh:mm A");

  const feeAmount = isExpense ? 0.99 : 0.0;
  const totalAmount = isExpense
    ? Math.max(0, transaction.amount - feeAmount)
    : transaction.amount;

  const handleDownload = () => {
    if (onDownloadReceipt) {
      onDownloadReceipt();
    } else {
      Toast.show({
        type: "success",
        text1: "Receipt Downloaded",
        text2: `Receipt for ${transaction.name} saved successfully.`,
      });
    }
  };

  return (
    <View style={styles.cardContainer}>
      <Pressable
        style={styles.cardHeader}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <Text style={styles.cardHeaderTitle}>Transaction details</Text>
        <Ionicons
          name={isExpanded ? "chevron-up" : "chevron-down"}
          size={20}
          color="#222222"
        />
      </Pressable>

      {isExpanded && (
        <View style={styles.detailsContent}>
          <DetailRow
            label="Status"
            value={isExpense ? "Expense" : "Income"}
            valueColor={isExpense ? "#F95B51" : "#25A969"}
            isBold
          />

          <DetailRow
            label={isExpense ? "To" : "From"}
            value={transaction.name || "Claire Jovalski"}
            isBold
          />

          <DetailRow
            label="Time"
            value={formattedTime}
            isBold
          />

          <DetailRow
            label="Date"
            value={formattedDate}
            isBold
          />

          <View style={styles.divider} />

          <DetailRow
            label={isExpense ? "Spending" : "Income"}
            value={`$ ${transaction.amount.toFixed(2)}`}
            isBold
          />

          <DetailRow
            label="Fee"
            value={isExpense ? `- $ ${feeAmount.toFixed(2)}` : `$ 0.00`}
            isBold
          />

          <View style={styles.divider} />

          <DetailRow
            label="Total"
            value={`$ ${totalAmount.toFixed(2)}`}
            isBold
            valueStyle={styles.totalValue}
          />

          <View style={styles.buttonContainer}>
            <Button
              title="Download Receipt"
              type="outline"
              onPress={handleDownload}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  cardHeaderTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000000",
  },
  detailsContent: {
    marginTop: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 16,
    color: "#666666",
    fontWeight: "400",
  },
  detailValue: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "500",
  },
  boldValue: {
    fontWeight: "700",
    color: "#000000",
  },
  totalValue: {
    fontSize: 17,
    fontWeight: "700",
    color: "#000000",
  },
  divider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginVertical: 12,
  },
  buttonContainer: {
    marginTop: 28,
    marginBottom: 8,
  },
});
