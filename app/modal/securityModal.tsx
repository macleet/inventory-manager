import { useProfileContext } from "@/context/ProfileContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Text, Pressable, View, StyleSheet, Switch } from "react-native";

export default (): React.ReactElement => {
    const { profile, setProfile } = useProfileContext();
    const toggleMfa = (value: boolean) => setProfile({...profile!, mfaEnabled: value});
    
    return (
        <View style={styles.container} >
            <View style={styles.menuButton} >
                <Text style={styles.menuButtonText} >MFA</Text>
                <Switch 
                    thumbColor={profile?.mfaEnabled ? "#444ca2" : "#e7e9fd"}
                    onValueChange={toggleMfa}
                    value={profile?.mfaEnabled}
                />
            </View>

            <View style={styles.horizontalLine} />

            <Pressable style={styles.menuButton} >
                <Text style={styles.menuButtonText} >Change password</Text>
                <MaterialIcons name="keyboard-arrow-right" size={28} color="#444ca2" />
            </Pressable>

            <View style={styles.horizontalLine} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        height: "100%",
        backgroundColor: "#ebecff"
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
    }
});
