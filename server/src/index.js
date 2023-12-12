import express from 'express'
import cors from 'cors'
import { v4 as uuidv4 } from 'uuid'

const app = express()

app.use(cors())
app.use(express.json())

app.post("/login", (req, res) => {
    try {
        const { username } = req.body;
        const userId = uuidv4();
        res.json({
            username, userId
        });
    } catch (error) {
        res.json({error});
    }
})

app.listen(3001, () => {
    console.log("Server is running on port 3001");
})