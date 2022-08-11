import postsRepository from "./../repositories/postsRepository.js";
import  urlMetadata  from 'url-metadata'
import hashtagRepository from "../repositories/hashtagRepository.js";

export async function createPost(req, res) {
  // const { id } = res.locals.user;
  const { link, text } = req.body;
  
  // o id viria do jwt, como ele ainda não está implementado vou usar um const

  const id = 1;

  let textArr = text.split(" ")  


  try {
    await postsRepository.createPost(link, text, id);
    for (let str of textArr) {
      if (str[0] === '#') {
        await hashtagRepository.addHashtag(str.slice(1));
      }
    }
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
          console.log(error)
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
