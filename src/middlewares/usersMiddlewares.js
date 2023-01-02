import { compareSync, hashSync } from "bcrypt"
import { connection } from "../database/db.js"
import { userSchema } from "../models/usersModels.js"

export async function validateSignup(req,res,next){
    const {name, email, password, confirmPassword} = req.body


    //Validação de dados
    if(name.length < 3  || password.length < 8  ||  confirmPassword.length < 8  ||  !email ){
        return res.sendStatus(401)
    }

    //Validação de dados através do JOI
    const {error} = userSchema.validate(req.body, {abortEarly: false})

    //Retorno caso dados não estejam válidos
    if(error){
        return res.send(error.message)
    }


    //Validação se email já está cadastrado
    try{
        const userExist = (await connection.query(`SELECT * FROM users WHERE email=($1)`,[email.toLowerCase()])).rows[0]

        if(userExist){
            return res.sendStatus(409)
        }

    }catch(error){
        console.log(error)
    }

    //Encriptando senha
    const encryptedPassword = hashSync(password, 10)
    req.user = {name, email: email.toLowerCase(), password: encryptedPassword}
  
    next()
}

export async function validateSignin(req, res, next){
    const {email, password} = req.body
    let userExist


    if(!email  || password.length < 8){
        return res.sendStatus(401)
    }

    //Verificando se usuário possui cadastro
    try{
        userExist = await (await connection.query(`SELECT * FROM users WHERE email=($1)`,[email.toLowerCase()])).rows[0]
        console.log(userExist)

        if(!userExist){
            return res.sendStatus(404)
        }
    }catch(error){
        console.log(error)
    }

    const validatePassword = compareSync(password, userExist.password)

    if(!validatePassword){
        return res.sendStatus(401)
    }

    req.user = {name: userExist.name, email: userExist.email}

    next()
}