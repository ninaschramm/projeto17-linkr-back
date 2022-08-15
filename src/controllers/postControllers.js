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
  
  try {
    const {rows: posts} = await postsRepository.getAllPosts();
    if(posts.length === 0) {
      return res.sendStatus(404); // not found
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
  const id = req.body.id
  try {
    const { rows: verifyPost } = await postsRepository.getPost(id)
    console.log(verifyPost)
    if (verifyPost.length === 0) {
      return res.sendStatus(404);
    }
    await postsRepository.deletePost(id)
    res.sendStatus(204);
  }
  catch (error) {
    console.log(error);
    return res.sendStatus(500); // server error
}
}
