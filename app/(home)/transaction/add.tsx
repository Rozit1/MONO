import { StyleSheet, Text, View } from "react-native";


import PageBackground from "@/assets/svg/profilebg.svg";
import { BackButton } from "@/components/back-button";
import { Button } from "@/components/buttons";
import { DateInputField } from "@/components/data-input";
import { DropdownInput } from "@/components/dropdown";
import { InputField } from "@/components/inputfield";
import { createTransaction, TransactionCategory, TransactionType } from "@/services/transaction";
import { useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

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
        gap: 12,
    },
});


export default function AddTransaction() {
    return (
        <View style={styles.container} >
            <PageBackground style={styles.headerBackground} />
            <SafeAreaView edges={['top']} style={styles.container} >
                <View style={styles.headerContainer} >
                    <BackButton type="light" />
                    <Text style={styles.headerTitle}>Add Transaction</Text>
                </View>
                <TransactionForm />
            </SafeAreaView>
        </View>
    );
}

const categories = [
    { label: 'Food', value: TransactionCategory.FOOD },
    { label: 'Transport', value: TransactionCategory.TRANSPORT },
    { label: 'Entertainment', value: TransactionCategory.ENTERTAINMENT },
    { label: 'Other', value: TransactionCategory.OTHER },
]

const types = [
    { label: 'Income', value: TransactionType.INCOME },
    { label: 'Expense', value: TransactionType.EXPENSE },
]

function TransactionForm() {
    const router = useRouter();
    const [type, setType] = useState(types[0]);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState<Date>(new Date());
    const [category, setCategory] = useState(categories[0]);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleAddTransaction = async () => {
        try {
            setIsLoading(true);
            if (!name || !amount || !date || !category || !type) {
                setFieldErrors({
                    name: name ? '' : 'Name is required',
                    amount: amount ? '' : 'Amount is required',
                    date: date ? '' : 'Date is required',
                    category: category ? '' : 'Category is required',
                    type: type ? '' : 'Type is required',
                });
                return;
            }
            setFieldErrors({});

            await createTransaction({
                name,
                amount: parseFloat(amount),
                date: date,
                category: category.value,
                type: type.value,
            });
            router.back();
        } catch (error) {
            setFieldErrors({});
            Toast.show({
                text2: 'Failed to add expense',
                type: 'error',
            });
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <View style={styles.transactionsContainer} >
            <DropdownInput
                data={types}
                label="Type"
                placeholder="Select Type"
                value={type}
                onChange={(item) => setType(item)}
                error={fieldErrors.type}
            />
            <InputField
                label="Name"
                value={name}
                onChangeText={setName}
                placeholder="Enter name"
                error={fieldErrors.name}
            />
            <InputField
                label="Amount"
                value={amount}
                keyboardType="number-pad"
                onChangeText={setAmount}
                placeholder="Enter amount"
                error={fieldErrors.amount}
            />

            <DateInputField
                label="Date"
                value={date}
                onChange={setDate}
                placeholder="Select date"
                error={fieldErrors.date}
            />

            <DropdownInput
                data={categories}
                label="Category"
                placeholder="Select Category"
                value={category}
                onChange={(item) => setCategory(item)}
                error={fieldErrors.category}
            />
            <Button
                title="Add Transaction"
                onPress={handleAddTransaction}
                loading={isLoading}
            />
        </View>
    )
}