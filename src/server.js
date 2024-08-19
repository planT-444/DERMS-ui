const express = require("express")
const path = require("path")
const port = 3000

app = express()

app.use(express.static(path.join(__dirname, 'front-end')))

app.listen(port, () => {
    console.log("listening on port ", port)
})