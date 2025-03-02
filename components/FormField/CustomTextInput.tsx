// CustomTextInput.tsx

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

// Define the properties expected by this component
export interface CustomTextInputProps {
    multiline: boolean;
    placeholder: string;
    borderColor?: string;

    setValue?: (value: string) => void;
}

export default ({ multiline, placeholder, borderColor, setValue }: CustomTextInputProps) => {
    const onChangeText = (text: string) => {
        if (setValue === undefined) {
            return;
        }
        setValue(text);
    };
    return (
        // Render a TextInput component with customizable properties
        <TextInput
            onChangeText={onChangeText}
            multiline={multiline}
            textAlignVertical={multiline ? "top" : "center"} // Align text based on multiline prop
            numberOfLines={multiline ? 10 : 1} // Set number of lines based on multiline prop
            style={{...styles.textInput, borderWidth: borderColor ? 2 : 0, borderColor: borderColor}}
            placeholder={placeholder}
            placeholderTextColor="gray" // Set the placeholder text color
        />
    );
};

// Styles for the TextInput component
const styles = StyleSheet.create({
    textInput: {
        padding: 8,                // Padding inside the TextInput
        backgroundColor: "#EFEFFF", // Background color of the TextInput
        color: "#226",              // Text color
        borderRadius: 5,           // Rounded corners
        paddingHorizontal: 6,      // Horizontal padding for the TextInput
    },
});
