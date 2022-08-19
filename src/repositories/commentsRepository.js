import db from "../config/db.js";

async function getComments(postId) {
    return db.query(`
   SELECT comments.comment, comments."userId", users.picture, users.username FROM comments
   JOIN users
   ON comments."userId" = users.id
   WHERE "postId"=$1 
    `, [postId])
}

async function postComment(postId, userId, comment) {
    return db.query(`
    INSERT INTO comments
    ("postId", "userId", comment)
    VALUES ($1, $2, $3)
    `, [postId, userId, comment])
}

async function countComments(postId) {
    return db.query(`
    SELECT COUNT("postId") FROM comments 
    WHERE "postId"=$1 
     `, [postId])
}

const commentsRepository = {
    getComments,
    postComment,
    countComments
}

export default commentsRepository