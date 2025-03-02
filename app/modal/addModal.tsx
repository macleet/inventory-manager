import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, ScrollView, Pressable, TextInputProps } from "react-native";
import FormField, { FieldProps } from "@/components/FormField/FormField";
import { ItemProps } from "@/components/ItemList/ListItem";
import { useSQLiteContext } from "expo-sqlite";
import { getItemColumn, insertItem } from "@/db/db";
import { useRouter } from "expo-router";
import { useItemContext } from "@/context/ItemContext";

export default (): React.ReactElement => {
    const db = useSQLiteContext();
    const router = useRouter();
    const { setItemAdded } = useItemContext();

    const [submitPressed, setSubmitPressed] = useState<boolean>(false);
    const [unfilledFields, setUnfilledFields] = useState<string[]>([]);
    const dropdownData = {
        category: useState<string[]>([]),
        unit: useState<string[]>([]),
        supplier: useState<string[]>([]),
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
                setData: dropdownData.category[1]
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
                setData: dropdownData.unit[1],
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
                setData: dropdownData.supplier[1]
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

    const newItem: ItemProps = {
        id: "",
        name: "",
        notes: "",
        category: "",
        quantity: 0,
        supplier: "",
        unit: "",
        sku: "",
    };

    // Fetch all necessary data (categories, units, suppliers) on component mount
    useEffect(() => {
        const getDropdownData = async () => {
            try {
                const categories: string[] = await getItemColumn(db, "category");
                dropdownData.category[1](categories);

                const suppliers = await getItemColumn(db, "supplier");
                dropdownData.supplier[1](suppliers);

                const units = await getItemColumn(db, "unit");
                dropdownData.unit[1](units);
            } catch (error) {
                console.error("Error retrieving dropdown data:", error);
            }
        };
        getDropdownData();
    }, []);

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

    const onPressSubmit = async () => {
        const fieldsToFill = formFields
            .filter((formField, i) => formField.required && !fieldRefs[i].current?.value)
            .map(formField => formField.title);

        setUnfilledFields(fieldsToFill);
        try {
            if (fieldsToFill.length === 0) {
                await insertItem(db, updateNewItem(newItem));
                console.log("Added 1 item");
                setItemAdded(true);
                router.back();
            }
        } catch (error) {
            console.error("Error submitting new item.");
        } finally {
            setSubmitPressed(true);
        }
    };
    
    return (
        <ScrollView contentContainerStyle={{padding: 18, gap: 20}} style={styles.container}>
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

const styles = StyleSheet.create({
    container: {
        // padding: 18,
        backgroundColor: "#d8deff",
        height: "100%",
    },
    headerContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 14
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#444ca2",
    },
    submitButton: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 18,
        paddingVertical: 12,
        backgroundColor: "#444ca2",
        alignSelf: "flex-end",
        borderRadius: 10,
        marginTop: 8
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
