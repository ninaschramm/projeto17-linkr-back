import db from "../config/db.js";
import bcrypt from "bcrypt";

async function checkEmail(email){
    return db.query(`SELECT * FROM users WHERE email = $1`, [email]);
}

async function createUser(email, username, password, picture){
    const KEY = Number(process.env.KEY);
    const crypted = bcrypt.hashSync(password, KEY);

    return db.query(
        `INSERT INTO users (email, username, password, picture) VALUES ($1, $2, $3, $4)`,
        [email, username, crypted, picture]
    );
}

const userRepository = {
    checkEmail,
    createUser
};

export default userRepository;