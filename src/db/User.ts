import sql from "./connection";
import { config } from "dotenv";
import bcrtupt from "bcrypt";

interface UserData {
    email: string;
    password: string;
    username: string;
}

function hashString(str: string) {
    const salt = bcrtupt.genSaltSync(10);
    return bcrtupt.hashSync(str, salt);
}

const User = {
    create: async (data: UserData) => {
        try {
            const { email, password, username } = data;

            const hashedPassword = await hashString(password);

            const r =
                await sql`INSERT INTO users (email, password, username) VALUES (${email}, ${hashedPassword}, ${username}) RETURNING *`;

            return r[0];
        } catch (err) {
            console.log(err);
            throw new Error("Error creating user");
        }
    },
    findByEmail: async (email: string) => {
        try {
            const r =
                await sql`SELECT * FROM users WHERE email=${email} LIMIT 1`;

            return r[0];
        } catch (err) {
            console.log(err);
            throw new Error("Error finding user");
        }
    },
    findById: async (id: number) => {
        try {
            const r = await sql`SELECT * FROM users WHERE id=${id} LIMIT 1`;

            return r[0];
        } catch (err) {
            console.log(err);
            throw new Error("Error finding user");
        }
    },
    updateById: async (id: number, data: UserData) => {
        try {
            const { email, password, username } = data;

            const hashedPassword = await hashString(password);

            const r =
                await sql`UPDATE users SET email=${email}, password=${hashedPassword}, username=${username} WHERE id=${id} RETURNING *`;

            return r[0];
        } catch (err) {
            console.log(err);
            throw new Error("Error updating user");
        }
    },
    delete: async (id: number) => {
        try {
            const r = await sql`DELETE FROM users WHERE id=${id} RETURNING *`;

            return r[0];
        } catch (err) {
            console.log(err);
            throw new Error("Error deleting user");
        }
    },
    comparePassword: async (password: string, hash: string) => {
        try {
            const r = await bcrtupt.compare(password, hash);

            return r;
        } catch (err) {
            console.log(err);
            throw new Error("Error comparing password");
        }
    },
};

export default User;
