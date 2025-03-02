// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import { useRouter } from "expo-router";
import { useProfileContext } from "@/context/ProfileContext";
import { Text, View, StyleSheet } from "react-native";

export default (): React.ReactElement => {
    const { profile } = useProfileContext();
    return (
        <View style={styles.container} >
            <View style={styles.menuButton} >
                <Text style={styles.menuButtonText} >Full name</Text>
                <Text style={styles.infoText} >{profile?.firstName} {profile?.lastName}</Text>
            </View>

            <View style={styles.horizontalLine} />

            <View style={styles.menuButton} >
                <Text style={styles.menuButtonText} >Email</Text>
                <Text style={styles.infoText} >{profile?.email}</Text>
            </View>

            <View style={styles.horizontalLine} />

            <View style={styles.menuButton} >
                <Text style={styles.menuButtonText} >Phone number</Text>
                <Text style={styles.infoText} >{profile?.phoneNumber}</Text>
            </View>

            <View style={styles.horizontalLine} />

            <View style={styles.addressButton} >
                <Text style={styles.menuButtonText} >Business address</Text>
                <Text style={styles.infoText} >{profile?.address}</Text>
            </View>

            <View style={styles.horizontalLine} />

            <View style={styles.menuButton} >
                <Text style={styles.menuButtonText} >Role</Text>
                <Text style={styles.infoText} >{profile?.role}</Text>
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
    addressButton: {
        flexDirection: "column", 
        alignItems: "flex-start", 
        justifyContent: "center", 
        paddingVertical: 30, 
        height: 95, 
        gap: 8,
        paddingHorizontal: 8

    },
    horizontalLine: {
        borderTopWidth: 2,
        borderColor: "#444ca234"
    },
    menuButtonText: {
        fontSize: 18
    },
    infoText: {
        fontSize: 17,
        color: "#7e7e7e"
    }
});