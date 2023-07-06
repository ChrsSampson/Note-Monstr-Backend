import { config } from "dotenv";
import postgres from "postgres";

config();

const sql = postgres({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

export default sql;
