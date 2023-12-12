import express from 'express'
import cors from 'cors'
import { v4 as uuidv4 } from 'uuid'

const app = express()

app.use(cors())
app.use(express.json())

const userData = new Map()

app.post("/login", (req, res) => {
    try {
        const { username } = req.body;
        const userId = uuidv4();
        userData.set(userId, {userId, username, averageScore: 0.0, gamesTotal: 0});
        res.json({
            username, userId
        });
    } catch (error) {
        console.log(error);
        res.json({error});
    }
})

app.post("/recordGame", (req, res) => {
    try {
        const { userId, gameResult } = req.body;
        const currentData = userData.get(userId);
        const newGamesTotal = currentData.gamesTotal + 1;
        const newAverageScore = (currentData.averageScore * currentData.gamesTotal + gameResult) / newGamesTotal;
        const newData = {...currentData, gamesTotal: newGamesTotal, averageScore: newAverageScore};
        userData.set(userId, newData);
        res.json();
    } catch (error) {
        console.log(error);
        res.json({error});
    }
})

app.get("/getStats", (req, res) => {
    try {
        res.json(Object.fromEntries(userData.entries()));
    } catch (error) {
        console.log(error);
        res.json({error});
    }
})

app.listen(3001, () => {
    console.log("Server is running on port 3001");
})