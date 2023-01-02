import { connection } from "../database/db.js"

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