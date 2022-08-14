import postsRepository from "./../repositories/postsRepository.js";
import  urlMetadata  from 'url-metadata'

export async function createPost(req, res) {
  // const { id } = res.locals.user;
  const { link, text } = req.body;
  
  // o id viria do jwt, como ele ainda não está implementado vou usar um const

  const id = 1;

try {
    await postsRepository.createPost(link, text, id);             
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

export async function deletePost(req, res) {
  const id = req.body.id
  try {
    await postsRepository.deletePost(id)
    res.sendStatus(204);
  }
  catch (error) {
    console.log(error);
    return res.sendStatus(500); // server error
}
}
