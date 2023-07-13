import sql from './connection';
import { config } from 'dotenv';

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
            username VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            session_id VARCHAR(255) UNIQUE,
            reset_code VARCHAR(20) UNIQUE,
            email VARCHAR(60) UNIQUE NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )`;

        return true;
    } catch (err) {
        console.log('createUserTable Failed or already exists', err);
        return false;
    }
}

async function createBoardTable() {
    try {
        await sql`CREATE TABLE IF NOT EXISTS board (
            id SERIAL PRIMARY KEY,
            board json,
            user_id SERIAL REFERENCES users(id) ON DELETE CASCADE
        )`;

        return true;
    } catch (err) {
        console.log('createBoardTable Failed or already exists', err);
        return false;
    }
}

async function createStateTable() {
    try {
        await sql`CREATE TABLE IF NOT EXISTS state (
            id SERIAL PRIMARY KEY,
            state json,
            user_id SERIAL REFERENCES users(id) ON DELETE CASCADE
        )`;
    } catch (err) {
        console.log('createStateTable Failed or already exists', err);
        return false;
    }
}

async function runSchema() {
    try {
        const results = [];
        // await createDatabase();
        results.push(await createUserTable());
        results.push(await createStateTable());
        results.push(await createBoardTable());

        if (results.includes(false)) throw new Error('Error running schema');

        return 'success';
    } catch (err) {
        console.log(err);
        throw new Error('Error running schema');
    }
}

const r = runSchema().then((res) => {
    if (res === 'success') {
        console.log('Schema ran successfully');
        process.exit(0);
    } else process.exit(1);
});

// export { runSchema };
