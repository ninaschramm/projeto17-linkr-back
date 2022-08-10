import postsRepository from "./../repositories/postsRepository.js";

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
    const {rows: result} = await postsRepository.getAllPosts();
    if(result.length === 0) {
      return res.sendStatus(404); // not found
    }
  
    res.send(result).status(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500); // server error
  }
  
}
