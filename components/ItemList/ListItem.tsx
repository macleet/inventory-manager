import { memo, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { changeQuantity } from "@/db/db";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";

export interface ItemProps {
  id: string;
  name: string;
  notes: string;
  category: string;
  supplier: string;
  unit: string;
  sku: string;
  quantity: number;
};

export const ListItem : React.FC<ItemProps> = memo(({id, name, quantity: q, category, unit}) => {
    const db = useSQLiteContext();
    const [quantity, setQuantity] = useState<number>(q);

    useEffect(() => {
      const updateQuantity = async () => {
        try {
          await changeQuantity(db, id, quantity);
        } catch (error) {
          console.error("Error updating quantity", error);
        }
      };
      updateQuantity();
    }, [quantity]);
  
    const addOne = () => {
      if (quantity === 999)  return;
      setQuantity(quantity + 1);
    }
  
    const minusOne = () => {
      if (quantity === 0)  return;
      setQuantity(quantity - 1);
    }
  
    const ceilTens = () => {
      if (quantity >= 990) {
        setQuantity(999);
        return;
      }
      setQuantity(Math.ceil(quantity / 10) * 10);
    };
  
    const floorTens = () => {
      if (quantity < 0) {
        setQuantity(0);
        return;
      }
      setQuantity(Math.floor(quantity / 10) * 10);
    };
    
    return(
      <Pressable style={styles.itemContainer} >
        <View style={styles.itemTextContainer} >
          <Text style={styles.itemNameText}>{name}</Text>
          <Text style={styles.itemSubtext} >
            <Text style={styles.subheaderText} >Category: </Text>{category}
          </Text>
          <Text style={styles.unitText} >
            <Text style={styles.subheaderText} >Unit: </Text> {unit}
          </Text>
        </View>
  
        <View style={styles.buttonsContainer} >
          <MaterialIcons onPressIn={minusOne} onLongPress={floorTens} name="remove-circle-outline" size={34} color="#444ca2" />
          <Text style={styles.quantityText} >{quantity}</Text>
          <MaterialIcons onPressIn={addOne} onLongPress={ceilTens} name="add-circle-outline" size={34} color="#444ca2" />
        </View>
      </Pressable>
    );
});

const styles = StyleSheet.create({
    itemContainer: {
      height: 86,
      backgroundColor: "#cbd4ff",
      borderRadius: 8,
      paddingHorizontal: 14,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginVertical: 3
    },
    itemTextContainer: {
      alignItems: "flex-start",
      justifyContent: "center",
      flex: 5,
      gap: 3
    },
    itemNameText: {
      color: "#333",
      fontSize: 18,
      fontWeight: '600',
    },
    itemSubtext: {
      color: "#6b6bb8"
    },
    quantityText: {
      textAlignVertical: "center",
      fontSize: 18,
      fontWeight: '500',
      textAlign: "center",
      color: "black",
      lineHeight: 20,
    },
    unitText: {
      display: "flex",
      fontSize: 13,
      lineHeight: 15,
      color: "#616161"
    },
    subheaderText: {
      fontWeight: "700"
    },
    buttonsContainer: {
      flexDirection: "row",
      flex: 3.6,
      height: "100%",
      justifyContent: "space-around",
      alignItems: "center",
    },
    buttonContainer: {
      flex: 9,
      height: "100%",
      width: "40%",
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      color: "#77B",
      height: 28,
      width: 28,
    }
});