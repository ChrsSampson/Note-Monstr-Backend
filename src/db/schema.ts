import sql from "./connection";
import { config } from "dotenv";

config();

// // create database if not exists
// async function createDatabase() {
//     try {
//         await sql`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`;
//         return true;
//     } catch (err) {
//         console.log(err);
//         return false;
//     }
// }

async function createUserTable() {
    try {
        await sql`CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )`;

        return true;
    } catch (err) {
        console.log("createUserTable Failed or already exists", err);
        return false;
    }
}

async function createStateTable() {
    try {
        await sql`CREATE TABLE IF NOT EXISTS state (
            id SERIAL PRIMARY KEY,
            state json,
            user_id SERIAL REFERENCES users(id) ON DELETE CASCADE,
        )`;
    } catch (err) {
        console.log("createStateTable Failed or already exists", err);
        return false;
    }
}

async function runSchema() {
    try {
        // await createDatabase();
        await createUserTable();
        await createStateTable();
    } catch (err) {
        console.log(err);
        throw new Error("Error running schema");
    }
}

export { runSchema };
