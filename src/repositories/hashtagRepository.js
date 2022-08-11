import db from "../config/db.js";

async function getTrendingHashtags() {
    return db.query(`SELECT hashtags.hashtag, COUNT(hashtags_posts."hashtagId") as "hashtagCount"
    FROM hashtags_posts
    JOIN hashtags
    ON hashtags.id = hashtags_posts."hashtagId"
    GROUP BY hashtags.hashtag
    ORDER BY "hashtagCount" DESC
    LIMIT 10`)
}

async function getPostsByHashtag(hashtag) {
    return db.query(`
    SELECT posts.id as id, posts."userId", users.username, users.picture as "userPicture", 
    posts.text, posts.link,
    COALESCE(COUNT(likes.id),0) AS "likes"
    FROM posts
    JOIN users ON posts."userId" = users.id
	FULL JOIN hashtags_posts on posts.id = hashtags_posts."postId"
	JOIN hashtags ON hashtags_posts."hashtagId" = hashtags.id
    LEFT JOIN likes ON likes."postId" = posts.id
	WHERE hashtags.hashtag = $1
    GROUP BY posts.id, users.id
    ORDER BY posts.id DESC
	LIMIT 20
      `, [hashtag]
      );
}

async function addHashtag() {
    return db.query(`
        INSERT INTO hashtags(hashtag)
        VALUES ($1)
    `)
}

const hashtagRepository = {
    getTrendingHashtags, getPostsByHashtag, addHashtag
}

export default hashtagRepository