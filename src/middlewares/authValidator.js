import jwt  from "jsonwebtoken";

const SECRET = process.env.TOKEN_SECRET;

export async function validateToken (req, res, next){
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if(token === null){
        return res.sendStatus(401);
    } 

    
    jwt.verify(token, SECRET, (err, data) => {
        if(err){
            return res.sendStatus(401);
        }
        else{
        res.locals.user = data.id;
        next();
        }
        
    });
};