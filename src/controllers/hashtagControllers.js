import hashtagRepository from "../repositories/hashtagRepository.js";

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