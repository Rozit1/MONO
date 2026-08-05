import { StyleSheet, Text, View } from "react-native";

import Background from "@/assets/svg/onboardingbg.svg";
import { BackButton } from "@/components/back-button";
import { Button } from "@/components/buttons";
import { InputField } from "@/components/inputfield";
import { signUp } from "@/services/firebase";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    actionContainer: {
        padding: 18,
    },
    logo: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    formContainer: {
        padding: 18,
        gap: 24,
    },
    headerContainer: {
        paddingHorizontal: 14,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#000000',
    },
    headerSubtitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#5A8C88',
        marginTop: 8,
    },
    loginContainer: {
        alignItems: "center",
        marginTop: 8,
        flexDirection: "row",
        justifyContent: 'center',
    },
    loginText: {
        color: "#444444",
        fontSize: 16,
    },
    loginTextLink: {
        color: "#438883",
        fontSize: 16,
        textDecorationLine: "underline",
    },
});

export default function Signup() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [fieldsError, setFieldsError] = useState({
        fullName: '',
        email: '',
        password: '',
    });

    const router = useRouter();

    const handleSignUp = async () => {
        try {
            if (!fullName || !email || !password) {
                setFieldsError({
                    fullName: !fullName ? 'Full name is required' : '',
                    email: !email ? 'Email is required' : '',
                    password: !password ? 'Password is required' : '',
                });
                return;
            }
            setFieldsError({
                fullName: '',
                email: '',
                password: '',
            });
            setIsLoading(true);
            await signUp(fullName, email, password);
            router.push('/login');
            Toast.show({
                type: 'success',
                text1: 'Account created successfully',
            })
        } catch (error) {
            console.log(error);
            setError(error as string);
            Toast.show({
                type: 'error',
                text1: error as string,
            })
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Background />
            </View>
            <SafeAreaView>
                <BackButton />
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>Create</Text>
                    <Text style={styles.headerTitle}>Account ✨</Text>
                    <Text style={styles.headerSubtitle}>Join to start tracking your finances</Text>
                </View>
                <View style={styles.formContainer}>
                    <InputField label="Full Name" placeholder="Enter your full name" value={fullName} onChangeText={setFullName} error={fieldsError.fullName} />
                    <InputField label="Email" autoCapitalize="none" placeholder="Enter your email" value={email} onChangeText={setEmail} error={fieldsError.email} />
                    <InputField label="Password" autoCapitalize="none" placeholder="Enter your password" value={password} onChangeText={setPassword} secureTextEntry error={fieldsError.password} />
                    <Button title="Create Account" type="primary" onPress={handleSignUp} disabled={isLoading}/>
                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>Already have account? </Text>
                        <Link href="/login" style={styles.loginTextLink}>Log In</Link>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
}