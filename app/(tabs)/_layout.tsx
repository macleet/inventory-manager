import { Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { AuthProvider } from "@/context/AuthContext";
import { StyleSheet } from "react-native";
import { useRouter } from 'expo-router';

export default function TabLayout() {
    const router = useRouter();
    const addButtonPress = () => router.push("/modal/addModal");
    return (
        <AuthProvider>
            <Tabs 
                screenOptions={{
                    tabBarActiveTintColor: "#444ca2",
                    tabBarStyle: {
                        height: 65,
                        justifyContent: "center",  // Center the content vertically
                        alignItems: "center", // Center horizontally
                    },
                    headerTitleStyle: {
                        color: "#444ca2"
                    }
                }} 
            >

                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Inventory",
                        tabBarIcon: ({color}) => <MaterialIcons name="list-alt" size={35} color={color} />,
                        tabBarItemStyle: {
                            // alignSelf: "center",
                            // paddingVertical: 2,
                        },
                        tabBarIconStyle: {
                            height: 35,
                            width: 35,
                        },
                        tabBarLabelStyle: {
                            fontSize: 12
                        },
                        headerRight: () => <MaterialIcons name="add" size={36} color="#444ca2" onPress={addButtonPress} style={styles.addButton} />
                    }}
                />

                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Profile",
                        tabBarIcon: ({color}) => <MaterialIcons name="person" size={35} color={color} />,
                        tabBarIconStyle: {
                            height: 35,
                            width: 35,
                        },
                        tabBarLabelStyle: {
                            fontSize: 12
                        }
                    }}
                />
            </Tabs>
        </AuthProvider>
    )
}

const styles = StyleSheet.create({
    addButton: {
        padding: 10
    }
});