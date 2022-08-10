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

const hashtagRepository = {
    getTrendingHashtags
}

export default hashtagRepository