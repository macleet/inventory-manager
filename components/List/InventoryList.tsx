import React, { 
    useEffect,
    useState,
    useRef,
} from 'react';

import {
    StyleSheet,
    View,
    FlatList,
    Pressable,
    ListRenderItem,
    Animated
} from 'react-native';

import FoldersBar from '../Form/FoldersBar.tsx';
import Colors from '../../Colors.js';

import PlusIcon from '../../Assets/svg/plus.svg';

import { createStorage } from '../../storage/storage.ts';
import { ItemProps, ListItem } from './ListItem.tsx';
import { ModalWindow } from '../ModalWindow.tsx';
import { AddItemForm } from './AddItemForm.tsx';

type ListProps = {
  open: boolean,
}

const InventoryList : React.FC<ListProps> = ({open}) => {
    const initializeStorages = async () => {
        await createStorage("item");
        await createStorage("category");
        await createStorage("unit");
        await createStorage("supplier");
    }

    useEffect(() => {
        initializeStorages();
    }, []);

    const [items, setItems] = useState<ItemProps[]>([]);
    const addItem = (newItem: ItemProps) => {
        console.log([...items, newItem]);
        setItems([...items, newItem]);
        Animated.timing(rotateAnim, {
            toValue: adding ? 0 : 1,
            duration: 200,
            useNativeDriver: true, // for performance
        }).start();
        setAdding(false);
    };
    const [scrolling, setScrolling] = useState<boolean>(false);
    const [adding, setAdding] = useState<boolean>(false);

    // Init an Animated.Value
    const rotateAnim = useRef(new Animated.Value(0)).current;

    // Define rotation animation
    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "45deg"], // 45 degree rotation
    });

    const addButtonPress = () => {
        Animated.timing(rotateAnim, {
            toValue: adding ? 0 : 1,
            duration: 200,
            useNativeDriver: true, // for performance
        }).start();
        setAdding(!adding);
    };

    const renderItem : ListRenderItem<ItemProps> = ({item, index}) => <ListItem key={index} {...item} />;

    return (
        <View style={{...styles.contentContainer, display: open ? "flex" : "none"}} >
            <Pressable onPressIn={addButtonPress} style={{...styles.addButton, opacity: scrolling ? 0.3 : 0.9}} >
                <Animated.View style={{ transform: [{ rotate }] }} >
                    <PlusIcon height={40} width={40} color="#668"/>
                </Animated.View>
            </Pressable>

            <ModalWindow toggle={adding} >
                <AddItemForm addItem={addItem} />
            </ModalWindow>

            <FlatList
             scrollEnabled={!adding}
             stickyHeaderIndices={[0]}
             ListHeaderComponent={<FoldersBar adding={adding} />}
             ListHeaderComponentStyle={{overflow: "hidden", borderRadius: 6, marginVertical: 0, elevation: 4, marginBottom: 15,}}
             stickyHeaderHiddenOnScroll={true}
             keyboardShouldPersistTaps="always"
             refreshing={false}
             style={{...styles.listContentContainer, opacity: adding ? 0.35 : 1.0}}
             contentContainerStyle={styles.listContentContainer}
             data={items}
             renderItem={renderItem}
             initialNumToRender={12}
             getItemLayout={(_, index) => (
                 {length: styles.itemContainer.height, offset: (styles.itemContainer.height + styles.itemContainer.marginVertical * 2) * index , index }
             )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    addButton: {
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bottom: 25,
        right: 25,
        width: 60,
        height: 60,
        backgroundColor: "#cdd1e4",
        borderRadius: 15,
        zIndex: 100,
    },
    contentContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "whitesmoke",
        alignItems: 'center',
        display: "flex",
        position: "relative",
    },
    listContainer: {
        width: "100%",
        height: "100%",
    },
    listContentContainer: {
        width: "100%",
        display: "flex",
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

export default InventoryList;