import jwt  from "jsonwebtoken";

const SECRET = process.env.TOKEN_SECRET;

export async function validateToken (req, res, next){
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if(token === null){
        return res.sendStatus(401);
    } 

    const { id } = jwt.verify(token, SECRET, (err) => {
        
        if(err){
            return res.sendStatus(401);
        } 
    });

    /* 
    
    seria bom verificar se o id existe no banco

    const user = await findUserById(id);

    if (user.rowCount === 0) {
        return res.sendStatus(401);;
    }
    */

    res.locals.user = id;
    next();
};