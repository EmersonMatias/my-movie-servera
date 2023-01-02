import { Router } from "express";
import { registerUser } from "../controllers/usersControllers.js";
import { connection } from "../database/db.js";
import validateSignup from "../middlewares/usersMiddlewares.js";

const router = Router()


router.post("/signup", validateSignup, registerUser)

router.get("/users", async (req,res) => {

    const users =  (await connection.query("SELECT * FROM users")).rows

    res.send(users)
})




export default router