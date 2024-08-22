import express from 'express'
import path from 'path'

const __dirname = import.meta.dirname;

const port = 3000
const restrictedFiles = ['/main.css', '/index.js']
const domain = "localhost:3000"

const app = express()

app.use((req, res, next) => {
    const referer = req.get("Referer")
    console.log(req.path, referer)
    if (restrictedFiles.includes(req.path) && !(referer && referer.includes(domain))) {
        res.status(403).sendFile(path.join(__dirname, 'front-end', 'unauthorized.html'))
    } else {
        next()
    }
})

app.use(express.static(path.join(__dirname, 'front-end')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'front-end', 'index.html'))
})

app.listen(port, () => {
    console.log("listening on port ", port)
})