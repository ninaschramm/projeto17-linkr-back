import db from "../config/db.js";

async function createPost(link, text, id) {
  return db.query(`
    INSERT INTO posts(link, text, "userId")
    VALUES ($1, $2, $3)
  `, [link, text, id])

  
}

async function getAllPosts() {
  return db.query(`
    SELECT posts.id as id, users.username, users.picture as "userPicture", posts.text, posts.link,
    COALESCE(COUNT(likes.id),0) AS "likes"
    FROM posts
    JOIN users ON posts."userId" = users.id
    LEFT JOIN likes ON likes."postId" = posts.id
    GROUP BY posts.id, users.id
    ORDER BY posts.id DESC
    `
    );
}

const postsRepository = {
    createPost,
    getAllPosts
  };
  
  export default postsRepository;