import db from "../config/db.js";

async function createPost(link, text, id) {
  return db.query(`
    INSERT INTO posts(link, text, "userId")
    VALUES ($1, $2, $3)
    RETURNING id    
  `, [link, text, id])

  
}

async function checkIfFollows(id) {
  return db.query(`
  SELECT * FROM follows
  WHERE "followerId" = $1
`, [id])
}

async function getAllPosts(id) {
  return db.query(`
    SELECT posts.id as id, posts."userId", users.username, users.picture as "userPicture", 
    posts.text, posts.link, false as "reposter",
    COALESCE(COUNT(likes.id),0) AS "likes", posts."createdAt"
    FROM posts
    JOIN users ON posts."userId" = users.id
    JOIN follows ON follows."followedId" = posts."userId"
    LEFT JOIN likes ON likes."postId" = posts.id
    WHERE follows."followerId" = $1
    GROUP BY posts.id, users.id
    ORDER BY posts.id DESC
    LIMIT 20
    `, [id]
    );
}

async function getAllRePosts() {
  return db.query(`
  SELECT posts.id as id, posts."userId", users.username, users.picture as "userPicture", 
  posts.text, posts.link,
  COALESCE(COUNT(likes.id),0) AS "likes", reposts."createdAt" as "createdAt", reposts."userId" as "reposter", u.username as "reposterName"
  FROM posts
  JOIN users ON posts."userId" = users.id
  JOIN reposts ON reposts."postId" = posts.id
  LEFT JOIN likes ON likes."postId" = posts.id
  JOIN users u ON reposts."userId" = u.id
  GROUP BY posts.id, users.id, reposts.id, u.username
  ORDER BY posts."createdAt" DESC  
  LIMIT 20
    `
    );
}

async function getPost(id) {
  return db.query(`
  SELECT * FROM posts 
  WHERE posts.id=$1
  `, [id])
}

async function createRePost(userId, postId) {
  return db.query(`
    INSERT INTO reposts("userId", "postId")
    VALUES ($1, $2)
  `, [userId, postId])
}

async function confirmUser(postId, userId) {
  return db.query(`
  SELECT * FROM posts 
  WHERE posts.id=$1
  AND posts."userId"=$2
  `, [postId, userId])
}

async function deleteConstraint(id) {
  return db.query(`
  DELETE FROM hashtags_posts
  WHERE "postId" = $1;
  `, [id])
}

async function deletePost(id) {
  return db.query(`
  DELETE FROM posts
  WHERE id=$1;
  `, [id])
}

async function insertHashtag(hashtag) {
  return db.query(`
  INSERT INTO hashtags (hashtag) 
  VALUES ($1) 
  RETURNING id`, [hashtag])
}

async function insertHashtagPost(postId, hashtagId){
  return db.query(`
  INSERT INTO hashtags_posts ("postId", "hashtagId") 
  VALUES ($1, $2)`,
  [postId, hashtagId])
}

async function updatePost(postId, text){
  return db.query(`UPDATE posts SET text = $1 WHERE id = $2`, [text, postId]);
}

const postsRepository = {
    createPost,
    getAllPosts,
    deletePost,
    getPost,
    deleteConstraint,
    insertHashtag,
    insertHashtagPost,
    confirmUser,
    updatePost,
    createRePost,
    getAllRePosts,
    checkIfFollows
  };
  
  export default postsRepository;