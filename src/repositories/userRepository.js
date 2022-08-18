import db from "../config/db.js";
import bcrypt from "bcrypt";

async function checkEmail(email){
    return db.query(`SELECT * FROM users WHERE email = $1`, [email]);
}

async function checkUsername(email){
    return db.query(`SELECT * FROM users WHERE username = $1`, [email]);
}

async function createUser(email, username, password, picture){
    const KEY = Number(process.env.KEY);
    const crypted = bcrypt.hashSync(password, KEY);

    return db.query(
        `INSERT INTO users (email, username, password, picture) VALUES ($1, $2, $3, $4)`,
        [email, username, crypted, picture]
    );
}

async function getPostsByUser(user) {
    return db.query(`
    SELECT posts.id as id, posts."userId", users.username, users.picture as "userPicture", 
    posts.text, posts.link,
    COALESCE(COUNT(likes.id),0) AS "likes"
    FROM posts
    JOIN users ON posts."userId" = users.id
	FULL JOIN hashtags_posts on posts.id = hashtags_posts."postId"
	JOIN hashtags ON hashtags_posts."hashtagId" = hashtags.id
    LEFT JOIN likes ON likes."postId" = posts.id
	WHERE users.id = $1
    GROUP BY posts.id, users.id
    ORDER BY posts.id DESC
	LIMIT 20
      `, [user]
      );
}

async function followRequest(followerId, followedId) {
    return db.query(
        `INSERT INTO follows ("followerId", "followedId") VALUES ($1, $2)`,
        [followerId, followedId]
    );
}

async function unfollow(followerId, followedId) {
    return db.query(
        `DELETE FROM follows WHERE "followerId"=$1 AND "followedId"=$2`,
        [followerId, followedId]
    );
}


async function checkFollows(followerId, followedId) {
    return db.query(
        `SELECT * FROM follows WHERE "followerId"=$1 AND "followedId"=$2`,
        [followerId, followedId]
    );
}

async function searchUsers(letters){
    const param = letters + '%';
    return db.query(
        `SELECT id, username, picture 
        FROM users 
        WHERE username LIKE $1`,
        [param]
    );
}


const userRepository = {
    checkEmail,
    createUser,
    checkUsername,
    getPostsByUser,
    followRequest,
    unfollow,
    checkFollows,
    searchUsers
};

export default userRepository;