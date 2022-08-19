import postsRepository from "./../repositories/postsRepository.js";
import  urlMetadata  from 'url-metadata'
import db from "../config/db.js";
import hashtagRepository from "../repositories/hashtagRepository.js";

export async function createPost(req, res) {
  const  id  = res.locals.user;
  const { link, text } = req.body;
  let textArr = text.split(" ")
  
  async function insertHashtags(str, postId) {
    if (str[0] === '#') {
      const hashtag = str.toLowerCase().slice(1)
      const {rows: hashtagId} = await postsRepository.insertHashtag(hashtag)
      console.log(hashtagId[0].id)
      await postsRepository.insertHashtagPost(postId, hashtagId[0].id)
    }
  }

  async function verifyHashtag(str, postId) {
    const {rows: verifyExistingHashtag} = await hashtagRepository.getHashtag(str.toLowerCase().slice(1))
      if (verifyExistingHashtag.length === 0) {
      insertHashtags(str, postId) }
      else if (verifyExistingHashtag.length > 0) {
        await postsRepository.insertHashtagPost(postId, verifyExistingHashtag[0].id);
      }
  }

try {
    const {rows: postId} = await postsRepository.createPost(link, text, id);    
    console.log(textArr)
    console.log(postId[0].id) 
    textArr.map((str) => { verifyHashtag(str, postId[0].id) })
    res.sendStatus(201); // created
  } catch (error) {
    console.log(error);
    return res.sendStatus(500); // server error
  }
}


export async function getAllPosts(req, res) {
  const id = res.locals.user;  
  try {
    let {rows: posts} = await postsRepository.getAllPosts(id);
    if(posts.length === 0) {
      return res.sendStatus(206); // not found
    }
    const {rows: reposts} = await postsRepository.getAllRePosts();
    if(reposts.length > 0) {
      posts = [...posts, ...reposts]
      posts.sort((a,b) =>  new Date(b.createdAt) - new Date(a.createdAt));
    }
    const result = await Promise.all(posts.map(async (post)=> {
      
      const newPost = await urlMetadata(post.link).then(
        
        function (metadata) { // success handler
          
          return {...post, postImage:metadata.image, postDescription:metadata.description, postTitle:metadata.title}
        },
        function (error) { // failure handler
        }
      )
      return newPost;
    }))

    
    res.send(result).status(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500); // server error
  }
  
}

export async function deletePost(req, res) {
  const postId = req.body.id
  const userId = res.locals.user
  try {
    const { rows: verifyPost } = await postsRepository.getPost(postId)
    console.log(verifyPost)
    if (verifyPost.length === 0) {
      return res.sendStatus(404);
    }
    else {
      const { rows: confirmUser } = await postsRepository.confirmUser(postId, userId)
      if (confirmUser.length === 0) {
        return res.sendStatus(401);
      }
    }
    await postsRepository.deleteConstraint(postId)
    await postsRepository.deletePost(postId)
    res.sendStatus(204);
  }
  catch (error) {
    console.log(error);
    return res.sendStatus(500); // server error
}
}

export async function updatePost(req, res){
  const {postId, text} = req.body;
  const userId = res.locals.user

  try {
    const checkPost = await postsRepository.getPost(postId);
    if(!checkPost.rowCount){
      return res.sendStatus(404);
    }
    else{
      console.log(`postId: ${postId}, userId: ${userId}`)
      const confirmUser = await postsRepository.confirmUser(postId, userId);
      if(!confirmUser.rowCount){
        return res.sendStatus(401);
      }
    }
    await postsRepository.updatePost(postId, text);
    return res.sendStatus(200);
  }
  catch(e){
    console.log(e);
    return res.sendStatus(500);
  }
}

export async function createRepost(req, res){
  const {postId} = req.body;
  const userId = res.locals.user

  try {
    const checkPost = await postsRepository.getPost(postId);
    if(!checkPost.rowCount){
      return res.sendStatus(404);
    }
    await postsRepository.createRePost(userId, postId);
    return res.sendStatus(200);
  }
  catch(e){
    console.log(e);
    return res.sendStatus(500);
  }
}