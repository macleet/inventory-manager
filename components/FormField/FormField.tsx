import { StyleSheet, Text, TextInputProps, View } from "react-native";
import Dropdown, { DropdownProps } from "./Dropdown/Dropdown";
import CustomTextInput, { CustomTextInputProps } from "./CustomTextInput";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

type Inputs = CustomTextInputProps | DropdownProps;

export interface FieldProps {
    title: string;
    required: boolean;
    inputType: string;
    submitPressed: boolean;
    inputProps: Inputs;
}

export default forwardRef<TextInputProps, FieldProps>(({title, required, inputType, submitPressed, inputProps}, ref) => {
    const [value, setValue] = useState<string>("");
    const setValueCallback = (value: string) => setValue(value);

    useImperativeHandle(ref, () => {
        return { value: value };
    }, [value]);

    const [borderColor, setBorderColor] = useState<string>();
    useEffect(() => {
        if (!submitPressed) return;
        required && !value ? setBorderColor("#C33") : setBorderColor("");
    }, [submitPressed, value]);

    return(
        <View style={styles.formField} >
            <Text style={styles.fieldTitleText}>
                {title}
                <Text style={{color: "#A22"}} >{required && " *"}</Text>
            </Text>

            {inputType === "text" && <CustomTextInput 
                {...inputProps as CustomTextInputProps} 
                borderColor={borderColor} 
                setValue={setValueCallback} 
            />}

            {inputType === "dropdown" && <Dropdown 
                {...inputProps as DropdownProps} 
                type={title.toLowerCase()} 
                borderColor={borderColor} 
                setValue={setValueCallback} 
            />}
        </View>
    );
});

const styles = StyleSheet.create({
    formField: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 3,
    },
    fieldTitleText: {
        color: "#668",
    },
});