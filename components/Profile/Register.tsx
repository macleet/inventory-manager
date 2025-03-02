import axios, { isAxiosError } from "axios";
import React from "react";
import { useState } from "react";
import { View, Pressable, Text, TextInput, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

interface RegisterProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default ({ setIsOpen } : RegisterProps) => {
    const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [signUpError, setSignUpError] = useState<string>("");
    
    const handleLoginPress = () => setIsOpen(false);
    const handleFirstNameChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => setFirstName(event.nativeEvent.text);
    const handleLastNameChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => setLastName(event.nativeEvent.text);
    const handleEmailChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => setEmail(event.nativeEvent.text);
    const handlePasswordChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => setPassword(event.nativeEvent.text);
    const handleConfirmChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => setConfirmPassword(event.nativeEvent.text);

    const handleSignupPress = async () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=(.*[A-Z]))(?=(.*[a-z]))(?=(.*\d))(?=(.*[@$!%*?&])).{10,}$/;
        const hasUpper = /(?=.*[A-Z])/;
        const hasLower = /(?=.*[a-z])/;
        const hasDigit = /(?=.*\d)/;
        const hasSpecialChar = /(?=.*[@$!%*?&])/;
        const minLength = /.{10,}/;

        if (firstName === "" || lastName === "" || email === "" || password === "" || confirmPassword === "") {
            setSignUpError("Missing field(s).");
        } else if (!emailRegex.test(email)) {
            setSignUpError("Invalid email.");
        } else if (!passwordRegex.test(password)) {
            const passwordErrors = [];
            if (!hasUpper.test(password)) passwordErrors.push("an uppercase letter");
            if (!hasLower.test(password)) passwordErrors.push("a lowercase letter");
            if (!hasDigit.test(password)) passwordErrors.push("a digit");
            if (!hasSpecialChar.test(password)) passwordErrors.push("a special character");
            if (!minLength.test(password)) passwordErrors.push("at least ten characters");
            const passwordErrorText = ["Password must include", passwordErrors.join(", ")].join(" ");
            setSignUpError(passwordErrorText);
        } else if (password !== confirmPassword) {
            setSignUpError("Password mismatch.");
        } 

        if (signUpError !== "") return;

        try {
            const response = await axios.post(
                `${baseUrl}/auth/register`, 
                {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            setSignUpError("");
            setIsOpen(false);
        } catch (error) {
            if (isAxiosError(error)) {
                if (error.response?.status === 409) {
                    const { message: errorMessage } = error.response.data;
                    setSignUpError(errorMessage);
                    return;
                }
            } else {
                // Handle non-Axios errors (if any)
                console.error("Non-Axios error:", error);
            }
        }
    };

    return(
        <View style={styles.registerContainer} >
            <View style={styles.signupHeader} >
                <Text style={styles.signupHeaderText} >Sign Up</Text>
                <Pressable onPress={handleLoginPress} >
                    <Text style={styles.loginText} >Log In</Text>
                </Pressable>
            </View>

            <View style={styles.inputsContainer} >
                <View style={styles.inputContainer} >
                    <Text style={styles.inputsText} >First name</Text>
                    <TextInput 
                        value={firstName} 
                        onChange={handleFirstNameChange}
                        style={styles.input} 
                    />
                </View>
                
                <View style={styles.inputContainer} >
                    <Text style={styles.inputsText} >Last name</Text>
                    <TextInput 
                        value={lastName} 
                        onChange={handleLastNameChange}
                        style={styles.input} 
                    />
                </View>

                <View style={styles.inputContainer} >
                    <Text style={styles.inputsText} >Email Address</Text>
                    <TextInput 
                        value={email} 
                        onChange={handleEmailChange}
                        style={styles.input} 
                    />
                </View>

                <View style={styles.inputContainer} >
                    <Text style={styles.inputsText} >Password</Text>
                    <TextInput 
                        secureTextEntry={true}
                        value={password} 
                        onChange={handlePasswordChange}
                        style={styles.input} 
                    />
                </View>
                
                <View style={styles.inputContainer} >
                    <Text style={styles.inputsText} >Confirm Password</Text>
                    <TextInput 
                        secureTextEntry={true}
                        value={confirmPassword}
                        onChange={handleConfirmChange}
                        style={styles.input} 
                    />
                </View>
            </View>

            {signUpError !== "" && <View style={styles.errorContainer} >
                <Text style={styles.errorText} >Error: {signUpError}</Text>
            </View>}

            <Pressable onPress={handleSignupPress} style={styles.signupButton} >
                <Text style={styles.signupText} >Sign Up</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    registerContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "92%",
        padding: 24,
        rowGap: 30,
        backgroundColor: "#f8f8f8",
        borderRadius: 10,
        elevation: 1,
        overflow: "scroll"
    },
    signupHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    signupHeaderText: {
        fontSize: 32,
        fontWeight: "700",
        color: "#5d5dbf"
    },
    loginText: {
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
    signupButton: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#5d5dbf",
        padding: 10,
        borderRadius: 25
    },
    signupText: {
        color: "#F5F5F5",
        fontSize: 18,
        fontWeight: "500"
    },
});