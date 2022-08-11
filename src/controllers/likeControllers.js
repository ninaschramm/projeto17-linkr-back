import likesRepository from "../repositories/likesRepository.js";

export async function getLike(req, res){
    const { id } = req.params;

    try {
        
        const somaLikes = await likesRepository.getLikesCountByPostId(id);
        const likesUsers = await likesRepository.getLikesNamesFromPostId(id);
        const likesUserslist = likesUsers.rows;

        res.send({
            likesTotal: somaLikes || 0,
            usernames: likesUserslist
        });

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function postLike(req, res){
    const { id } = req.params;
    const { userId } = req.locals; 
    try {
        
        await likesRepository.addLike(id, userId);
        res.sendStatus(201);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function deleteLike(req, res){
    const { id } = req.params;
    const { userId } = req.locals;
    
    try {
        
        await likesRepository.deleteLike(id, userId);

        res.sendStatus(201);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}