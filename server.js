import { error }     from "console"
import express       from "express"
import fs            from "fs/promises"
import  { v4 }       from "uuid"

const app = express()
const port = 7498
const data = JSON.parse(await fs.readFile("./amn.json", "utf-8"))


const nw = (req, res, next) => {
    console.log(`${req.method}: ${req.url} || ${new Date().toLocaleString}`)
    next()    
}

app.use(express.json())
// app.use("/amn", nw)


app.get("/", (req, res) =>{
    res.send("welcome to my server")
})


app.get("/amn", async (req, res) =>{
    try{
        res.json(data)
    } catch (err){
        res.status(500).json({
        error:true,
        message: err
        })
    }
})


app.get("/amn/summary", (req, res) =>{
    try{
        const resolt = data.reduce((obj, curr) => {
            curr.active && obj.active++
            curr.status && obj.in_stock++
            return obj
        }, {
            active:0,
            in_stock:0
        })
        resolt.sum = data.length
        res.json(resolt)
    } catch(err){
        res.status(500).json({
        error:true,
        message: err
        })
    }
})


app.get("/amn/:id", async (req, res) =>{
    try{
        const thisAmn = data.find(a => a.id == req.params.id)
        res.json(thisAmn)
    } catch{
        res.status(500).json({
            error:true,
            message: err
            })
        }
})


app.post("/amn", async (req, res) =>{
    try{
        const newAmn = { ...req.body, id: v4() }
        data.push(newAmn)
        await fs.writeFile("./amn.json", JSON.stringify(data), {
            encoding: "utf-8"
        })
        res.send(newAmn.id)
    } catch(err){
        res.status(500).json({
        error:true,
        message: err
        })
    }
})


app.patch("/amn/:id", async (req, res) =>{
    try{
        const { type, status, active } = req.body
        const amn = data.findIndex(am => am.id == req.params.id)
        const newAmn = {
            ...data[amn],
            ...req.body
        }
        data[amn] = newAmn
        await fs.writeFile("./amn.json", JSON.stringify(data), {
            encoding: "utf-8"
        })
        res.send(newAmn.id)
    } catch(err){
        res.status(500).json({
        error:true,
        message: err
        })
    }
})


app.listen(port, () => {
    console.log(`server started on port ${port} visit http://localhost:${port}`)
})
