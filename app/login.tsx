import { StyleSheet, Text, View } from "react-native";

import Background from "@/assets/svg/onboardingbg.svg";
import { BackButton } from "@/components/back-button";
import { Button } from "@/components/buttons";
import { InputField } from "@/components/inputfield";
import { signIn } from "@/services/firebase";
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

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [fieldsError, setFieldsError] = useState({
        email: '',
        password: '',
    });

    const router = useRouter();

    const handleSignIn = async () => {
        try {
            if (!email || !password) {
                setFieldsError({
                    email: !email ? 'Email is required' : '',
                    password: !password ? 'Password is required' : '',
                });
                return;
            }
            setFieldsError({
                email: '',
                password: '',
            });
            setIsLoading(true);
            const user =await signIn(email, password);
            console.log("user", user);
            router.push("/(home)/homepage");
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: "Invalid email or password!",
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
                    <Text style={styles.headerTitle}>Welcome</Text>
                    <Text style={styles.headerTitle}>back 👋</Text>
                    <Text style={styles.headerSubtitle}>Sign in to your account to continue</Text>
                </View>
                <View style={styles.formContainer}>
                    <InputField label="Email" autoCapitalize="none" placeholder="Enter your email" value={email} onChangeText={setEmail} error={fieldsError.email} />
                    <InputField label="Password" autoCapitalize="none" placeholder="Enter your password" value={password} onChangeText={setPassword} secureTextEntry error={fieldsError.password} />
                    <Button title="Sign In" type="primary" onPress={handleSignIn} disabled={isLoading}/>
                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>Don't have account? </Text>
                        <Link href="/signup" style={styles.loginTextLink}>Sign Up</Link>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
}