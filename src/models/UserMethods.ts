import sql from '../db/connection';
import bcrypt from 'bcrypt';

interface UserData {
    username: string;
    password: string;
    email: string;
    reset_key?: string;
    created_at?: Date;
}

async function hashString(str: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(str, salt);
}

const User = {
    create: async (data: UserData) => {
        const { username, password, email } = data;
        const hashedPassword = await hashString(password);
        const [user] =
            await sql`INSERT INTO users (username, password, email) VALUES (${username}, ${hashedPassword}, ${email}) RETURNING *`;
        const output = {
            id: user.id,
            username: user.username,
            email: user.email,
            created_at: user.created_at,
        };
        return output;
    },
    findOneById: async (id: number) => {
        const [user] = await sql`SELECT * FROM users WHERE id = ${id} LIMIT 1`;
        return user;
    },
    findOne: async (column: string, value: string) => {
        const result = await sql`SELECT * FROM users WHERE ${sql(
            column
        )} = ${value} LIMIT 1`;
        return result[0];
    },
    update: async (id: number, data: UserData) => {
        const { username, password, email } = data;
        const [user] =
            await sql`UPDATE users SET username = ${username}, password = ${password}, email = ${email} WHERE id = ${id} RETURNING *`;
        return user;
    },
    delete: async (id: number) => {
        const [user] =
            await sql`DELETE FROM users WHERE id = ${id} RETURNING * LIMIT 1`;
        return user;
    },
};

export default User;
