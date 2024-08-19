import { StyleSheet, Text, View } from "react-native";
import { TabContextType, useTab } from "../context/TabContext";
import Button from "./Button";
import Colors from "../Colors";

export default () => {
    const {activeTab} : TabContextType = useTab();
  
    const props = {
      icon: "search",
    }
  
    return(
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.titleText}>{activeTab}</Text>
        </View>
        <Button {...props} />
      </View>
    );
  }

  const styles = StyleSheet.create({
    headerContainer: {
      height: "8%",
      width: "100%",
      backgroundColor: Colors.background.primary,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: 'space-between',
      shadowColor: '#0',
      shadowOffset: {
        height: 2,
        width: 0,
      },
      elevation: 3,
      paddingHorizontal: 20,
      paddingTop: 4,
    },
    titleText: {
      fontSize: 22,
      fontWeight: '600',
      color: Colors.primary,
    },
  });