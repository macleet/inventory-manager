// AddItemForm.tsx

import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, ScrollView, Pressable, TextInputProps } from "react-native";
import FormField, { FieldProps } from "../FormField/FormField.tsx";
import { addTo, getFrom } from "../../storage/storage.ts";
import { ItemProps } from "./ListItem.tsx";

interface FormProps {
    addItem: (items: ItemProps) => void;
}

type Dropdowns = "category" | "unit" | "supplier";

export const AddItemForm: React.FC<FormProps> = ({ addItem }) => {
    const dropdownData = {
        category: useState<string[]>([]),
        unit: useState<string[]>([]),
        supplier: useState<string[]>([]),
    };

    // Fetch all necessary data (categories, units, suppliers) on component mount
    const update = async (type: string = "") => {
        try {
            if (type === "") {
                ["category", "unit", "supplier"].forEach(storageName => update(storageName));
                return;
            }
            const result = await getFrom(type);
            if (result) {
                const updatedData = JSON.parse(result);
                dropdownData[type as Dropdowns][1](updatedData);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        update();
    }, []);

    const addNewItem = async (type: string, newItemName: string) => {
        try {
            await addTo(type, newItemName);
            await update(type);
        } catch (error) {
            console.error(error);
        }
    };

    const initialItem: ItemProps = {
        name: "",
        notes: "",
        category: "",
        quantity: 0,
        supplier: "",
        unit: "",
        sku: "",
    };

    const newItem: ItemProps = initialItem;
    const [submitPressed, setSubmitPressed] = useState<boolean>(false);
    const [unfilledFields, setUnfilledFields] = useState<string[]>([]);

    const updateNewItem = (item: ItemProps) => {
        formFields.forEach((formField, i) => {
            const newValue = fieldRefs[i].current?.value;
            if (newValue) {
                switch (formField.title) {
                    case "Name":
                        item.name = newValue;
                        break;
                    case "Notes":
                        item.notes = newValue;
                        break;
                    case "Category":
                        item.category = newValue;
                        break;
                    case "Unit":
                        item.unit = newValue;
                        break;
                    case "Supplier":
                        item.supplier = newValue;
                        break;
                    case "SKU":
                        item.sku = newValue;
                        break;
                }
            }
        });
        return item;
    };

    const onPressSubmit = () => {
        const fieldsToFill = formFields
            .filter((formField, i) => formField.required && !fieldRefs[i].current?.value)
            .map(formField => formField.title);

        setUnfilledFields(fieldsToFill);
        setSubmitPressed(true);

        if (fieldsToFill.length === 0) {
            addItem(updateNewItem(newItem));
        }
    };

    const formFields: FieldProps[] = [
        { 
            title: "Name", 
            inputType: "text", 
            required: true,
            submitPressed,
            inputProps: {
                multiline: false,
                placeholder: "e.g. Chicken thighs",
            },
        },
        { 
            title: "Notes", 
            inputType: "text", 
            required: false, 
            submitPressed,
            inputProps: {
                placeholder: "e.g. Purchase bone-in thighs if our main supplier is out of stock.", 
                multiline: true,
            }
        },
        { 
            title: "Category", 
            required: true, 
            inputType: "dropdown", 
            submitPressed,
            inputProps: {
                type: "category",
                data: dropdownData.category[0], 
                addNewItem,
            }
        },
        { 
            title: "Unit", 
            inputType: "dropdown", 
            required: true, 
            submitPressed,
            inputProps: {
                type: "unit",
                data: dropdownData.unit[0],
                addNewItem,
            }
        },
        { 
            title: "Supplier", 
            inputType: "dropdown",
            required: true, 
            submitPressed,
            inputProps: {
                type: "supplier",
                data: dropdownData.supplier[0],
                addNewItem,
            }
        },
        { 
            title: "SKU", 
            inputType: "text",
            required: false,
            submitPressed,
            inputProps: {
                multiline: false,
                placeholder: "e.g. KS944RUR",
            }, 
        },
    ];

    const fieldRefs = formFields.map(() => useRef<TextInputProps>(null));

    return (
        <ScrollView contentContainerStyle={styles.windowContent}>
            <Text style={styles.title}>Add new item</Text>

            {formFields.map((fieldProps, index) => 
                <FormField ref={fieldRefs[index]} key={index} {...fieldProps} />
            )}

            {unfilledFields.length > 0 && (
                <Text style={styles.errorText}>
                    <Text style={styles.errorBold}>Please fill in: </Text>{unfilledFields.join(", ")}
                </Text>
            )}
            
            <Pressable onPress={onPressSubmit} style={styles.submitButton}>
                <Text style={styles.submitText}>Submit</Text>
            </Pressable>
        </ScrollView>
    );
};

// Styles for the form components
const styles = StyleSheet.create({
    windowContent: {
        paddingHorizontal: 18,
        overflow: "scroll",
        gap: 18,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#668",
    },
    submitButton: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 18,
        paddingVertical: 12,
        backgroundColor: "#668",
        alignSelf: "flex-end",
        borderRadius: 10,
    }, 
    submitText: {
        color: "#EEF",
        fontWeight: "bold",
    },
    errorText: {
        color: "#A22",
    },
    errorBold: {
        fontWeight: "bold",
    }
});
