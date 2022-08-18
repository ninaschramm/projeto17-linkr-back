import userRepository from "../repositories/userRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config()

export async function signIn(req, res){
    const {email, password} = req.body;
    
    try{
        const emailExist = await userRepository.checkEmail(email);
        if (!emailExist.rowCount){
            return res.status(401).send("Email ou senha incorretos!");
        }
        if(!bcrypt.compareSync(password, emailExist.rows[0].password)){
            return res.status(401).send("Email ou senha incorretos!");
        }
        const expire = {expiresIn: 60*60*3};
        const data = {
            id: emailExist.rows[0].id,
            email: emailExist.rows[0].email
        }
        const token = jwt.sign(data, process.env.TOKEN_SECRET, expire);
        return res.status(200).send({token, picture: emailExist.rows[0].picture, userId: emailExist.rows[0].id});
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
}