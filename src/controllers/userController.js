import userRepository from "../repositories/userRepository.js";

export async function createUser(req, res){
    const user = req.body;
    const {email, username, password, picture} = user;

    try{
        const alreadyExist = userRepository.checkEmail(email);
        if(alreadyExist.rowCount>0){
            return res.status(409).send("O email inserido já está cadastrado");
        }
        await userRepository.createUser(email, username, password, picture);
        return res.sendStatus(201);
    }
    catch(e){
        console.log(e);
        return res.sendStatus(500);
    }
}