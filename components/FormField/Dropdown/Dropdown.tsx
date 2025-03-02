// Dropdown.tsx

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import DropdownItem from "./DropdownItem";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// Interface defining the properties expected by the Dropdown component
export interface DropdownProps {
    type: string;
    borderColor?: string;
    data: string[];
    setData: React.Dispatch<React.SetStateAction<string[]>>;

    setValue?: (value: string) => void;
}

// Main Dropdown component
export default forwardRef<TextInputProps, DropdownProps>(({ type, data, setData, borderColor, setValue }, ref) => {
    const defaultText = `Select a ${type}`;                                 // Default text for the dropdown
    const [dropList, setDropList] = useState<string[]>(data);               // Dropdown items list
    const [selectedItem, setSelectedItem] = useState<string>(defaultText);  // Currently selected item
    const [showList, setShowList] = useState<boolean>(false);               // Whether to show the dropdown list
    const [adding, setAdding] = useState<boolean>(false);                   // Whether the user is adding a new item
    const [newItem, setNewItem] = useState<string>("");                     // Text for the new item being added

    const addInputRef = useRef<TextInput>(null);  // Ref for the new item input field

    // Toggle dropdown list visibility
    const onDropPress = async () => {
        setDropList(data);  // Update the dropdown list with the latest data
        setShowList(!showList);  // Toggle visibility
    };

    // Start the process of adding a new item
    const onPressAddNew = () => {
        setShowList(false);
        setAdding(true);
    };

    // Handle text change for new item input
    const onChangeText = (text: string) => setNewItem(text);

    // Submit the new item to the list
    const onAddSubmit = () => {
        if (newItem === "") {
            setAdding(false);
            return;
        }
        setSelectedItem(newItem);  // Set the new item as the selected one
        if (setValue !== undefined) {
            setValue(newItem);
        }

        // Update the parent state with the new item
        if (!data.includes(newItem)) {
            data.push(newItem);
            setData(data);
        }

        setNewItem("");  // Clear the input field
        setAdding(false);  // Hide the input field
    };

    // Focus the input field when adding a new item
    useEffect(() => { addInputRef.current?.focus() }, [adding]);

    // Handle item selection
    const onItemPress = (itemName: string) => {
        if (itemName === defaultText) {
            setShowList(false);
            setSelectedItem(defaultText);  // Update the selected item
            setValue !== undefined && setValue("");
            return;
        }
        setShowList(false);
        setValue !== undefined && setValue(itemName);
        setSelectedItem(itemName);  // Update the selected item
    };

    useImperativeHandle(ref, () => {
        return {
            value: selectedItem === defaultText ? "" : selectedItem,
        };
    }, []);

    return (
        <>
            {adding ? (
                // Render input for adding a new item
                <View style={styles.container}>
                    <TextInput
                        onChangeText={onChangeText}
                        ref={addInputRef}
                        value={newItem}
                        onBlur={onAddSubmit}
                        onSubmitEditing={onAddSubmit}
                        placeholder={`Enter new ${type}`}
                        placeholderTextColor="gray"
                        style={styles.addItemInput}
                    />
                    <View style={styles.enterButton}>
                        <Text style={{ color: "#226A" }}>Confirm</Text>
                    </View>
                </View>
            ) : (
                // Render the main dropdown button
                <Pressable onPress={onDropPress} style={{...styles.container, borderWidth: borderColor ? 2 : 0, borderColor: borderColor}}>
                    <Text style={{ ...styles.defaultText, color: selectedItem ? "#226" : "gray" }}>
                        {selectedItem}
                    </Text>
                    <View style={styles.dropButton}>
                        {/* <DropdownIcon width={24} height={24} color="#226A" /> */}
                        <MaterialIcons name="arrow-drop-down" size={24} color="#444ca2" />
                    </View>
                </Pressable>
            )}

            {/* Render the dropdown list */}
            {showList && <View style={styles.dropList}>
                <DropdownItem name={defaultText} onPress={onItemPress} />
                {dropList.map((itemName, index) => (
                    <DropdownItem key={index} onPress={onItemPress} name={itemName} />
                ))}
                <DropdownItem onPress={onPressAddNew} name={`Add new ${type}`} />
            </View>}
        </>
    );
});

// Styles for the Dropdown component and its elements
const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#EFEFFF",
        height: 40,
        borderRadius: 5,
    },
    enterButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2263",
        paddingHorizontal: 10,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    addItemInput: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        verticalAlign: "middle",
        color: "#226",
        backgroundColor: "#EFEFFF",
        height: 36,
        borderRadius: 5,
        padding: 4,
        paddingHorizontal: 6,
    },
    defaultText: {
        display: "flex",
        textAlignVertical: "center",
        paddingLeft: 6,
        width: "84%",
    },
    dropList: {
        backgroundColor: "#E2E2F2",
        width: "100%",
        zIndex: -1,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        paddingTop: 3,
        top: -6
    }, 
    dropButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "16%",
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
});
