import likesRepository from "../repositories/likesRepository.js";

export async function getLike(req, res){
    const { id } = req.params;

    try {
        
        const { rows: somaLikes} = await likesRepository.getLikesCountByPostId(id);
        const [numberLikes] = somaLikes;
        
        const { rows: likesUserslist } = await likesRepository.getLikesNamesByPostId(id);
       
        const likesNamelist = [];
        likesUserslist.map( (user) => likesNamelist.push(user.username) );

        res.send({
            likesTotal: parseInt(numberLikes.count) || 0,
            usernames: likesNamelist
        });

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function postLike(req, res){
    const { id } = req.params;
//    const { userId } = req.locals; 
    try {
        
        const checaLikes = await likesRepository.getLikesByPostIdAndUserId(id, 1); 
        
        if(checaLikes.rowCount > 0){
            return res.sendStatus(401);
        }

        await likesRepository.addLike(id, 1);
        res.sendStatus(201);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function deleteLike(req, res){
    const { id } = req.params;
//    const { userId } = req.locals;

    try {
        
        await likesRepository.deleteLike(id, 2);

        res.sendStatus(201);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}