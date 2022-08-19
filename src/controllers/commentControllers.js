import commentsRepository from "../repositories/commentsRepository.js";

export async function getComments(req, res){
    const postId = req.params.id
    try {
        const {rows: result} = await commentsRepository.getComments(postId);
        if(result.length === 0) {
          return res.status(200).send(null)
        }      
        res.send(result).status(200);
      }
      catch (error) {
        console.log(error);
        return res.sendStatus(500); // server error
      }
}

export async function postComment(req, res) {
    const userId = res.locals.user;
    const postId = req.params.id;
    const comment = req.body.comment;

    try {
        await commentsRepository.postComment(postId, userId, comment)
        return res.sendStatus(201)
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(500); // server error
      }
}

export async function countComments(req, res) {
    const postId = req.params.id;

    try {
        const {rows: count} = await commentsRepository.countComments(postId)
        return res.status(200).send(count[0].count)
    }    
    catch (error) {
        console.log(error);
        return res.sendStatus(500); // server error
      }
}