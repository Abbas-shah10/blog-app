import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

//
import usersRoutes from './routes/users.routes.js'
import postsRoutes from './routes/posts.routes.js'
import sequelize from './db/db.js'



dotenv.config()
const PORT = process.env.PORT || 4000;
const app = express();

// middleware
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))
app.use(urlencoded({ extended: true }))
app.use('/api/users', usersRoutes)
app.use("/api/posts", postsRoutes)



async function startServer() {
    try {
        await sequelize.authenticate();
        console.log("Db connected Successfully")
        await sequelize.sync({ alter: true });
        console.log("All models synchronized")
    } catch (error) {
        console.error(error);
    }
}
await startServer()
// listen    
app.listen(PORT, () => {
    console.log(`server is running on Port ${PORT}`)
})


