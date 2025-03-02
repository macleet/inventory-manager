import "dotenv/config";
import pg from "pg";

const pool = new pg.Pool({
    user: "postgres",
    password: process.env.POSTGRES_PASSWORD ,
    host: "localhost",
    port: 5432,
    database: "InventoryManager",
});

export default pool;