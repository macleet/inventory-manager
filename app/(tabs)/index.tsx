import { useSQLiteContext } from "expo-sqlite";
import { StyleSheet, View, Pressable } from 'react-native';
import ItemList from '@/components/ItemList/ItemList';
import { useEffect } from "react";
import { createItemTable } from "@/db/db";
// import ListControl from './ListControl.tsx';

export default function InventoryList() : React.ReactElement {
    const db = useSQLiteContext();

    useEffect(() => {
        const initTable = async () => {
            await createItemTable(db);
        };
        initTable();
    }, []);

    return(
        <View style={styles.container} >
            {/* <ListControl /> */}
            <ItemList />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "relative",
        height: "100%",
        backgroundColor: "#ebecff"
    }
});
