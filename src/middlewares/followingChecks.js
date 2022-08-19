import postsRepository from "./../repositories/postsRepository.js";

export async function checkIfFollows(req, res, next) {
    const id = res.locals.user;
    try {
      let {rows: checks} = await postsRepository.checkIfFollows(id);
      if (checks.length === 0) {
        return res.sendStatus(204)
      }
      else {
        next();
      }
    }
    catch (error) {
      console.log(error);
      return res.sendStatus(500); // server error
  }
  }