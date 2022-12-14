import db from "../config/db.js";

async function deleteLike(id, userId){
    return db.query(`
    DELETE FROM likes
    WHERE "postId" = $1 AND "userId" = $2
`, [id, userId]);
}

async function addLike(id, userId){
    return db.query(`
    INSERT INTO likes ("postId","userId")
    VALUES ($1, $2)
`, [id, userId]);
}

async function getLikesNamesByPostId(id, userId){
    return db.query(`
    SELECT users.username 
    FROM users
    JOIN likes ON users.id = likes."userId"
    WHERE likes."postId" = $1 AND users.id != $2
`, [id, userId]);
}

async function getLikesCountByPostId(id){
    return db.query(`
    SELECT COUNT(likes."postId") FROM LIKES
    WHERE likes."postId" = $1
`, [id]);
}
async function getLikesByPostIdAndUserId(id, userId){
    return db.query(`
        SELECT * 
        FROM likes 
        WHERE "postId" = $1 AND "userId" = $2;
    `, [id, userId]);
}

const likesRepository = {
    deleteLike,
    addLike,
    getLikesNamesByPostId,
    getLikesCountByPostId,
    getLikesByPostIdAndUserId
}

export default likesRepository;