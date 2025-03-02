import { ItemProps } from "@/components/ItemList/ListItem";
import * as SQLite from "expo-sqlite"; 

type DropdownColumn = "category" | "supplier" | "unit";

export async function createItemTable(db: SQLite.SQLiteDatabase): Promise<void> {
    const query = `CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        notes TEXT,
        category TEXT NOT NULL,
        unit TEXT NOT NULL,
        supplier TEXT NOT NULL,
        sku TEXT,
        quantity INTEGER DEFAULT 0
    );`;
    try {
        await db.runAsync(query);
    } catch (error) {
        throw new Error(`Error creating table in database: ${error}`);
    }
}

export async function deleteItemTable(db: SQLite.SQLiteDatabase): Promise<void> {
    try {
        await db.runAsync("DROP TABLE IF EXISTS items;");
    } catch (error) {
        throw new Error(`Error deleting items table: ${error}`);
    }
}

export async function insertItem(db: SQLite.SQLiteDatabase, item: ItemProps): Promise<void> {
    const query = `INSERT INTO items (name, notes, category, unit, supplier, sku, quantity) 
    VALUES (?, ?, ?, ?, ?, ?, ?);`;
    try {
        await db.runAsync(query, [item.name, item.notes, item.category, item.unit, item.supplier, item.sku, item.quantity]);
    } catch (error) {
        throw new Error(`Error inserting item: ${error}`);
    }
}

export async function changeQuantity(db: SQLite.SQLiteDatabase, id: string, quantity: number): Promise<void> {
    const query = "UPDATE items SET quantity = ? WHERE id = ?";
    await db.runAsync(query, [quantity, id]);
}

export async function getItems(db: SQLite.SQLiteDatabase): Promise<ItemProps[]> {
    try {
        const results = await db.getAllAsync<ItemProps>("SELECT * FROM items;");
        return results;
    } catch (error) {
        throw new Error(`Error fetching items: ${error}`);
    }
}

export async function deleteItem(db: SQLite.SQLiteDatabase, id: number): Promise<void> {
    try {
        await db.runAsync(`DELETE FROM items WHERE id = ${id};`);
    } catch (error) {
        throw new Error(`Error deleting item: ${error}`);
    }
}

export async function getItemColumn(db: SQLite.SQLiteDatabase, column: DropdownColumn): Promise<string[]> {
    try {
        const results = await db.getAllAsync<ItemProps>(`SELECT ${column} FROM items;`);
        const values = results.map((row) => row[column]);
        return [...new Set(values)];
    } catch (error) {
        throw new Error(`Error retrieving ${column} from items table: ${error}`);
    }
}
