import { StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { ItemProps, ListItem } from './ListItem';
import { useSQLiteContext } from "expo-sqlite";
import { getItems } from '@/db/db';
import { useAuth } from '@/context/AuthContext';
import { useItemContext } from "@/context/ItemContext";

export default () => {
    const db = useSQLiteContext();
    const { itemAdded, setItemAdded } = useItemContext();
    // const { loggedIn } = useAuth();
    const [items, setItems] = useState<ItemProps[]>([]);
    const scrollviewRef = useRef<ScrollView>(null);

    const fetchItems = async () => {
        const items = await getItems(db);
        setItems([...items]);
    };

    useEffect(() => {
        fetchItems();
    }, []);
    
    useEffect(() => {
        if (!itemAdded) return;
        fetchItems();
        scrollviewRef.current?.scrollToEnd();
        setItemAdded(false);
    }, [itemAdded]);
    
    return(
        <ScrollView ref={scrollviewRef} contentContainerStyle={styles.container} >
            {items.map((item: ItemProps, index: number) => <ListItem key={index} {...item} />)}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 6
    }
});