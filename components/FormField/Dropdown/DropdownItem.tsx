import { Pressable, StyleSheet, TextInput, View } from "react-native";
import React from "react";

// Interface defining the properties for each Dropdown item
interface ItemProps {
    name: string;
    onPress: (itemName: string) => void;
}

// DropdownItem component representing each selectable item in the dropdown
export default ({ name, onPress }: ItemProps) => {
    return (
        <Pressable onPress={()=>{ onPress(name) }}>
            {/* Separator line between items */}
            <View style={{ borderBottomColor: "#3333668b", borderBottomWidth: StyleSheet.hairlineWidth }} />
            <TextInput editable={false} style={styles.listItem} value={name} />
        </Pressable>
    );
};

// Styles for the Dropdown component and its elements
const styles = StyleSheet.create({
    listItem: {
        padding: 8,
        color: "#668",
        backgroundColor: "#e3e3fe",
    }
});