import express from "express"

const app = express()
const port = 7499


app.get("/", (req, res) =>{
    res.send("welcome to my server")
})

app.get("/amn", (req, res) =>{
    res.send("welcome to my server")
})

app.get("/amn/:id", (req, res) =>{
    res.send("welcome to my server")
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