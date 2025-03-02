import { useProfileContext } from "@/context/ProfileContext";
import { Text, View, StyleSheet, Switch } from "react-native";

export default (): React.ReactElement => {
    const { profile, setProfile } = useProfileContext();
    const toggleNotification = (value: boolean) => setProfile({...profile!, notificationsEnabled: value});
    
    return (
        <View style={styles.container} >
            <View style={styles.menuButton} >
                <Text style={styles.menuButtonText} >Notifications</Text>
                <Switch
                    thumbColor={profile?.notificationsEnabled ? "#444ca2" : "#e7e9fd"}
                    onValueChange={toggleNotification}
                    value={profile?.notificationsEnabled}
                />
            </View>

            <View style={styles.horizontalLine} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        backgroundColor: "#ebecff",
        height: "100%",
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