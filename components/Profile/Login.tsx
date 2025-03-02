import { Switch, Pressable, StyleSheet, Text, View, TextInput, NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { useState } from "react";
import { isAxiosError } from "axios";
import { useAuth } from "@/context/AuthContext";

interface LoginProps {
    setSignUpPressed: React.Dispatch<React.SetStateAction<boolean>>;
};

export default ({ setSignUpPressed }: LoginProps): React.ReactElement => {
    const { login } = useAuth();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loginError, setLoginError] = useState<string>("");
    const [rememberEnabled, setRememberEnabled] = useState<boolean>(false);
    
    const handleSignUpPress = () => setSignUpPressed(true);
    const handleEmailChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => setEmail(event.nativeEvent.text);
    const handlePasswordChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => setPassword(event.nativeEvent.text);
    const toggleRememberMe = () => setRememberEnabled(prev => !prev);
    const handleForgotPasswordPress = async () => {
        console.log("Forgot Password");
    };
    const handleLoginPress = async () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (email === "" || password === "") {
            setLoginError("Missing field(s).");
        } else if (!emailRegex.test(email)) {
            setLoginError("Invalid email format.");
        }

        try {
            await login(email, password, rememberEnabled);
            setLoginError("");
        } catch (error) {
            if (isAxiosError(error)) {
                if (error.response?.status === 409) {
                    const { message: errorMessage } = error.response.data;
                    setLoginError(errorMessage);
                    return;
                } else if (error.response?.status === 401) {
                    const { message: errorMessage } = error.response.data;
                    setLoginError(errorMessage);
                    return;
                }
            } else {
                // Handle non-Axios errors (if any)
                console.error("Non-Axios error:", error);
            }
        }
    };

    return(
        <View style={styles.loginContainer} >
            <View style={styles.loginHeader} >
                <Text style={styles.loginHeaderText} >Log In</Text>
                <Pressable onPress={handleSignUpPress} >
                    <Text style={styles.signUpText} >Sign Up</Text>
                </Pressable>
            </View>

            <View style={styles.inputsContainer} >
                <View style={styles.inputContainer} >
                    <Text style={styles.inputsText} >Email Address</Text>
                    <TextInput value={email} onChange={handleEmailChange} style={styles.input} />
                </View>

                <View style={styles.inputContainer} >
                    <Text style={styles.inputsText} >Password</Text>
                    <TextInput secureTextEntry={true} value={password} onChange={handlePasswordChange} style={styles.input} />
                </View>
            </View>

            <View style={styles.rememberMeContainer} >
                <Switch 
                    thumbColor={rememberEnabled ? "#444ca2" : "#e7e9fd"}
                    onValueChange={toggleRememberMe}
                    value={rememberEnabled}
                />
                <Text>Remember me</Text>                
            </View>

            {loginError !== "" && <View style={styles.errorContainer} >
                <Text style={styles.errorText} >Error: {loginError}</Text>
            </View>}

            <Pressable onPress={handleLoginPress} style={styles.loginButton} >
                <Text style={styles.loginText} >Login</Text>
            </Pressable>
            
            <Pressable onPress={handleForgotPasswordPress} style={styles.forgotPasswordContainer} >
                <Text style={styles.forgotPasswordText} >Forgot Password?</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    loginContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "92%",
        padding: 24,
        rowGap: 30,
        backgroundColor: "#f8f8f8",
        borderRadius: 10,
        elevation: 1
    },
    loginHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    loginHeaderText: {
        fontSize: 32,
        fontWeight: "700",
        color: "#5d5dbf"
    },
    signUpText: {
        borderBottomWidth: 1,
        borderColor: "#999999",
        color: "#999999"
    },
    inputsContainer: {
        display: "flex",
        flexDirection: "column",
        rowGap: 15
    },
    inputsText: {
        color: "#5d5dbf"
    },
    inputContainer: {
        display: "flex",
        flexDirection: "column",
        rowGap: 4
    },
    input: {
        backgroundColor: "#F5F5F5",
        borderRadius: 6,
        elevation: 1,
        padding: 6,
        color: "black"
    },
    errorContainer: {
        borderRadius: 6,
        backgroundColor: "#ffb2b2",
        padding: 8,
        borderWidth: 2,
        borderColor: "#dd7171"
    },
    errorText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#bc0000"
    },
    rememberMeContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },
    loginButton: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#5d5dbf",
        padding: 10,
        borderRadius: 25
    },
    loginText: {
        color: "#F5F5F5",
        fontSize: 18,
        fontWeight: "500"
    },
    forgotPasswordContainer: {
        display: "flex",
        flexDirection: "row",
        alignSelf: "flex-end",
        width: "auto",
    },
    forgotPasswordText: {
        borderBottomWidth: 1,
        color: "#999999",
        borderColor: "#999999"
    }
});