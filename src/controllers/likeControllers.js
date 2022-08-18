import likesRepository from "../repositories/likesRepository.js";

export async function getLike(req, res){
    const { id } = req.params;
    const userId = res.locals.user

    try {
        
        const { rows: somaLikes} = await likesRepository.getLikesCountByPostId(id);
        const [numberLikes] = somaLikes;
        
        const { rows: likesUserslist } = await likesRepository.getLikesNamesByPostId(id, userId);
        
        const checaLiked = await likesRepository.getLikesByPostIdAndUserId(id, userId);
        let liked;
        if(checaLiked.rowCount > 0){
            liked = true;
        } else {
            liked = false;
        }

        const likesNamelist = [];
        likesUserslist.map( (user) => likesNamelist.push(user.username) );

        res.send({
            liked,
            likesTotal: parseInt(numberLikes.count) || 0,
            usernames: likesNamelist
        }).status(200);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function postLike(req, res){
    const { id } = req.params;
    const userId = res.locals.user

    try {
        
        const checaLikes = await likesRepository.getLikesByPostIdAndUserId(id, userId); 
        if(checaLikes.rowCount > 0){
            return res.sendStatus(401);
        }

        await likesRepository.addLike(id, userId);
        res.sendStatus(201);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function deleteLike(req, res){
    const { id } = req.params;
    const userId = res.locals.user


    try {
        
        await likesRepository.deleteLike(id, userId);

        res.sendStatus(201);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}