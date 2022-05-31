//load express
const express = require('express')

const pokemon = require('./models/pokemon')

//createa an instance of express
const app = express()
const PORT = 3000

//root route
app.get('/', (req, res) => {
    res.send('Welcome to the Pokemon App!')
})

app.get('/pokemon', (req, res) => {
    res.send(pokemon)
})

app.listen(PORT, () => {
    console.log('Server is running...')
})