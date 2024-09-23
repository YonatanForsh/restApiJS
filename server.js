import { error } from "console"
import express from "express"
import fs      from "fs"

const app = express()
const port = 7499


app.get("/", (req, res) =>{
    res.send("welcome to my server")
})


app.get("/amn", async (req, res) =>{
    try{
        const data = JSON.parse(await fs.readFile("./amn.json", "utf-8"))
        res.json(data)
    } catch (err){
        res.status(500).json({
        error:true,
        message: err
        })
    }
})


app.get("/amn/:id", async (req, res) =>{
    try{
        const data = JSON.parse(await fs.readFile("./amn.json", "utf-8"))
        const thisAmn = data.find(a => a.id == req.params.id)
        res.json(thisAmn)
    } catch{
        res.status(500).json({
            error:true,
            message: err
            })
        }
})


app.get("/amn/summary", (req, res) =>{
    res.send("welcome to my server")
})


app.post("/amn", (req, res) =>{
    res.send("welcome to my server")
})


app.listen(port, () => {
    console.log(`server started on port ${port} visit http://localhost:${port}`)
})