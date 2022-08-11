import db from "../config/db.js";

export async function getLike(req, res){
    const { id } = req.params;
    
    try {
        
        const somaLikes = await db.query(`
            SELECT COUNT(likes."postId") FROM LIKES
            WHERE likes."postId" = $1
        `, [id]);

        const likesUsers = await db.query(`
            SELECT users.username 
            FROM users
            JOIN likes ON users.id = likes."userId"
            WHERE likes."postId" = $1;
        `, [id]);
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
    try {
        
        await db.query(`
            INSERT INTO likes ("postId","userId")
            VALUES ($1, $2)
        `, [id, 1]);
        res.sendStatus(201);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function deleteLike(req, res){
    const { id } = req.params;
    try {
        
        await db.query(`
            DELETE FROM likes
            WHERE "postId" = $1 AND "userId" = $2
        `, [id], 1);
        res.sendStatus(201);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}