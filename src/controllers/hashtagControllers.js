import hashtagRepository from "../repositories/hashtagRepository.js";
import  urlMetadata  from 'url-metadata'


export async function getTrendingHashtags(req, res) {
    
    try {
        const {rows: result} = await hashtagRepository.getTrendingHashtags();
        if(result.length === 0) {
          return res.sendStatus(404); // not found
        }      
        res.send(result).status(200);
      } catch (error) {
        console.log(error);
        return res.sendStatus(500); // server error
      }
      
}

export async function getPostsByHashtag(req, res) {
  
  const hashtag = req.params.hashtag
  console.log(hashtag)

  try {
    const {rows: posts} = await hashtagRepository.getPostsByHashtag(hashtag);
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
