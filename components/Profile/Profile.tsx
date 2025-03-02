import { useAuth } from "@/context/AuthContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { View, Pressable, Text, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { launchImageLibraryAsync } from "expo-image-picker";
import axios from "axios";
import { useProfileContext } from "@/context/ProfileContext";

export default (): React.ReactElement => {
    const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
    const { logout } = useAuth();
    const router = useRouter();
    const { profile, setProfile } = useProfileContext();
    const [profileImageUri, setProfileImageUri] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${baseUrl}/auth/profile`, {
                    withCredentials: true
                });
                const {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    phone_number: phoneNumber,
                    address: address,
                    role: role,
                    notifications_enabled: notificationsEnabled,
                    mfa_enabled: mfaEnabled
                } = response.data;
                setProfile({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phoneNumber: phoneNumber,
                    address: address,
                    role: role,
                    notificationsEnabled: notificationsEnabled,
                    mfaEnabled: mfaEnabled 
                });
            } catch (error) {
                console.error("Error fetching profile", error);
            }
        };
        fetchProfile();
    }, []);

    const handleProfilePicPress = async () => {
        try {
            const result = await launchImageLibraryAsync({
                mediaTypes: ["images"],
                allowsEditing: true
            });

            if (!result.canceled) {
                setProfileImageUri(result.assets[0].uri);
            }
        } catch (error) {
            console.error("Error picking profile picture:", error);
        }
    };

    return(
        <View style={styles.profileContainer} >
            {/* Header with profile picture */}
            <View style={styles.headerContainer} >
                <Pressable onPress={handleProfilePicPress} style={styles.profilePictureContainer} >
                    <Image 
                        source={profileImageUri ? { uri: profileImageUri } : require("@/assets/images/defaultPfp.png")} 
                        style={{...styles.profileImage, opacity: profileImageUri ? 1 : 0.4}} 
                    />
                </Pressable>
                <View style={styles.headerTextContainer} >
                    <Text style={styles.fullNameText} >{profile?.firstName} {profile?.lastName}</Text>
                    <Text style={styles.roleText} >{profile?.role}</Text>
                </View>
            </View>
            
            {/* Profile menu buttons */}
            <View style={styles.menuButtonsContainer} >
                <View style={styles.horizontalLine} />

                <Pressable onPress={() => router.push("/modal/personalInfoModal")} style={styles.menuButton} >
                    <Text style={styles.menuButtonText} >Personal Information</Text>
                    <MaterialIcons name="keyboard-arrow-right" size={28} color="#444ca2" />
                </Pressable>

                <View style={styles.horizontalLine} />

                <Pressable onPress={() => router.push("/modal/settingsModal")} style={styles.menuButton} >
                    <Text style={styles.menuButtonText} >Account Settings</Text>
                    <MaterialIcons name="keyboard-arrow-right" size={28} color="#444ca2" />
                </Pressable>

                <View style={styles.horizontalLine} />

                <Pressable onPress={() => router.push("/modal/securityModal")} style={styles.menuButton} >
                    <Text style={styles.menuButtonText} >Account Security</Text>
                    <MaterialIcons name="keyboard-arrow-right" size={28} color="#444ca2" />
                </Pressable>

                <View style={styles.horizontalLine} />
            </View>

            {/* Log out button */}
            <Pressable style={styles.logOutButton} onPress={logout}>
                <Text style={styles.logOutButtonText} >Log Out</Text>
            </Pressable> 
        </View>
    );
}

const styles = StyleSheet.create({
    profileContainer: {
        alignItems: "center",
        width: "100%",
        height: "100%",
        paddingVertical: 25,
        paddingHorizontal: 18,
        gap: 30
    },
    headerContainer: {
        justifyContent: "center",
        gap: 15,
    },
    profilePictureContainer: {
        width: 160,
        height: 160,
        borderRadius: 100,
        backgroundColor: "#b9bef1",
        position: "relative"
    },
    profileImage: {
        width: 160, 
        height: 160,
        borderRadius: 100
    },
    headerTextContainer: {
        alignItems: "center",
    },
    fullNameText: {
        fontSize: 18,
        fontWeight: "500"
    },
    roleText: {
        fontSize: 16
    },
    menuButtonsContainer: {
        width: "100%",
        gap: 5
    },
    menuButton: {
        flexDirection: "row",
        height: 70,
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 8
    },
    horizontalLine: {
        borderTopWidth: 2,
        borderColor: "#444ca234"
    },
    menuButtonText: {
        fontSize: 18
    },
    logOutButton: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 55,
        borderRadius: 6,
        backgroundColor: "#444ca2"
    },
    logOutButtonText: {
        fontSize: 20,
        fontWeight: "500",
        color: "#ebecff"
    }
});
