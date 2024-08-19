import { memo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../Colors";

import AddIcon from '../../Assets/svg/addOutline.svg';
import MinusIcon from '../../Assets/svg/minusOutline.svg';

export interface ItemProps {
  name: string;
  notes: string;
  category: string;
  supplier: string;
  unit: string;
  sku: string;
  quantity: number;

  // id: string;
  // index: number;
};

export const ListItem : React.FC<ItemProps> = memo(({name, quantity: q, category, unit}) => {
    // use id instead of name
    const [quantity, setQuantity] = useState<number>(q);
  
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
      if (quantity % 10 === 0) {
        setQuantity(quantity + 10);
        return;
      }
      setQuantity(Math.ceil(quantity / 10) * 10);
    };
  
    const floorTens = () => {
      if (quantity % 10 === 0) {
        setQuantity(quantity - 10);
        return;
      }
      setQuantity(Math.floor(quantity / 10) * 10);
    };
  
    const iconProps = {
      height: styles.button.height,
      width: styles.button.width,
      color: styles.button.color,
    };

    return(
      <Pressable style={styles.itemContainer} >
        <View style={styles.itemText} >
          <Text numberOfLines={1} style={styles.itemNameText}>{name}</Text>
          <Text numberOfLines={1} style={styles.itemSubtext} >{category}</Text>
        </View>
  
        <View style={styles.buttonsContainer} >
          <Pressable style={styles.buttonContainer} onPressIn={minusOne} onLongPress={floorTens} >
            <MinusIcon {...iconProps} />
          </Pressable>
        <Text style={styles.itemQuantityInput} >{quantity}</Text>
          <Pressable style={styles.buttonContainer} onPressIn={addOne} onLongPress={ceilTens} >
            <AddIcon {...iconProps} />
          </Pressable>
        </View>
      </Pressable>
    );
});

const styles = StyleSheet.create({
    contentContainer: {
      width: "100%",
      height: "100%",
      backgroundColor: "whitesmoke",
      alignItems: 'center',
      display: "flex",
    },
    listContainer: {
      width: "100%",
      height: "100%",
    },
    listContentContainer: {
      width: "100%",
      display: "flex",
      // padding: 3,
    },
    itemContainer: {
      height: 68,
      backgroundColor: Colors.background.secondary,
      borderRadius: 8,
      marginHorizontal: 8,
      marginVertical: 4,
      paddingHorizontal: 14,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      // shadowRadius: 20,
      // shadowOffset: {width: 10, height: 10},
      // shadowColor: "black",
    },
    itemText: {
      alignItems: "flex-start",
      justifyContent: "center",
      flex: 5,
    },
    itemNameText: {
      color: "#333",
      fontSize: 18,
      fontWeight: '600',
    },
    itemSubtext: {
      color: Colors.text.darkGray,
    },
    itemQuantityInput: {
      textAlignVertical: "center",
      fontSize: 18,
      fontWeight: '500',
      textAlign: "center",
      flex: 10,
      color: "black",
    },
    buttonsContainer: {
      flexDirection: "row",
      flex: 4,
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
      color: Colors.text.darkGray,
      height: 28,
      width: 28,
    }
});