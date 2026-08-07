import { Transaction } from "@/services/transaction";
import dayjs from "dayjs";
import { Href, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";





const styles = StyleSheet.create({
    transactionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },

    transactionItemHeader: {
        flexDirection: 'column',
        gap: 4,
        justifyContent: 'space-between',
    },

    transactionItemAmount: {
        flexDirection: 'row',
        gap: 4,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    transactionItemName: {
        fontSize: 16,
        fontWeight: 'medium',
        color: '#000000',
    },

    transactionItemDate: {
        fontSize: 14,
        fontWeight: 'regular',
        color: '#666666',
    },
    incomeAmount: {
        color: '#25A969',
        fontSize: 18,
        fontWeight: 'semibold',
    },

    expenseAmount: {
        color: '#F95B51',
        fontSize: 18,
        fontWeight: 'semibold',
    },
})


export function TransactionItem({
    transaction,
    onPress,
}: {
    transaction: Transaction;
    onPress?: () => void;
}) {
    const router = useRouter();

    const handlePress = () => {
        if (onPress) {
            onPress();
        } else if (transaction?.id) {
            router.push(`/(home)/transaction/${transaction.id}` as Href);
        }
    };

    return (
        <TouchableOpacity
            style={styles.transactionItem}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <View style={styles.transactionItemHeader}>
                <Text style={styles.transactionItemName}>{transaction.name}</Text>
                <Text style={styles.transactionItemDate}>{formatDisplayDate(transaction.date)}</Text>
            </View>
            <View style={styles.transactionItemAmount}>
                <Text style={transaction.type === 'income' ? styles.incomeAmount : styles.expenseAmount}>
                    {transaction.type === 'income' ? '+' : '-'}$ {transaction.amount}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

export function formatDisplayDate(date: Date | string) {
    const d = dayjs(date);

    if (d.isSame(dayjs(), "day")) {
        return "Today";
    }

    if (d.isSame(dayjs().subtract(1, "day"), "day")) {
        return "Yesterday";
    }

    if (d.isSame(dayjs().add(1, "day"), "day")) {
        return "Tomorrow";
    }

    return d.format("MM DD, YYYY");
}