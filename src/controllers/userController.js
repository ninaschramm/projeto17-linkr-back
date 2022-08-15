import userRepository from "../repositories/userRepository.js";
import  urlMetadata  from 'url-metadata'


export async function createUser(req, res){
    const user = req.body;
    const {email, username, password, picture} = user;

    try{
        const emailExist = await userRepository.checkEmail(email);
        const userExist = await userRepository.checkUsername(username);
        if(emailExist.rowCount>0){
            return res.status(409).send("O email inserido já está cadastrado");
        }
        else if(userExist.rowCount>0){
            return res.status(409).send("O nome de usuário inserido já está cadastrado");
        }
        await userRepository.createUser(email, username, password, picture);
        return res.sendStatus(201);
    }
    catch(e){
        console.log(e);
        return res.sendStatus(500);
    }
}

export async function getPostsByUser(req, res) {
  
    const id = req.params.id
  
    try {
      const {rows: posts} = await userRepository.getPostsByUser(id);
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