import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function ModalLayout() {
  return (
    <Stack screenOptions={{ presentation: "modal" }}>
      <Stack.Screen 
        name="addModal" 
        options={
          { 
            title: "Add New Item", 
            headerShown: true, 
            headerTitleStyle: {
              color: "#444ca2"
            }
          }
        }  
      />

      <Stack.Screen 
        name="personalInfoModal" 
        options={
          { 
            title: "Personal Information", 
            headerShown: true, 
            headerTitleStyle: {
              color: "#444ca2"
            },
            headerRight: () => <MaterialIcons name="edit" size={22} style={styles.editButton} />
          }
        }
      />

      <Stack.Screen 
        name="settingsModal" 
        options={
          { 
            title: "Account Settings", 
            headerShown: true, 
            headerTitleStyle: {
              color: "#444ca2"
            }
          }
        }  
      />

      <Stack.Screen 
        name="securityModal" 
        options={
          { 
            title: "Account Security", 
            headerShown: true, 
            headerTitleStyle: {
              color: "#444ca2"
            }
          }
        }  
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  editButton: {
    color: "#444ca2",
    padding: 4
  }
});