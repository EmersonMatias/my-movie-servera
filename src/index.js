import express from "express"
import dotenv from "dotenv"
import users from "./routers/usersRouters.js"


dotenv.config()


const app = express()
app.use(express.json())


app.use(users)




app.listen(4000, () => { console.log("Server Running at port 5000") })