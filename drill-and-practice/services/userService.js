import { sql } from "../database/database.js";

const addUser = async (email, password) => {
    await sql`INSERT INTO users
      (email, password)
        VALUES (${email}, ${password})`;
};

const findUserByEmail = async (email) => {
    const rows = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (rows && rows.length === 1) {
        return rows[0];
    }
    return null;
};

export { addUser, findUserByEmail };