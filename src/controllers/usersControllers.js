import { connection } from "../database/db.js"
import jwt from "jsonwebtoken"

export async function registerUser(req, res){
    const {name, email, password} = req.user

    try{
        //Cadastrando novo usuário
        await connection.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",[name, email, password])

        res.send(200)
        
    }
    catch(error){
        console.log(error)
    }
   
}

export async function connectingUser(req,res){
    const user = req.user

    const acessToken = jwt.sign(user, process.env.ACESS_TOKEN_SECRET, {expiresIn: '24h'})

    res.send({name: user.name, token: acessToken})
}