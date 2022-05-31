//load express
const express = require('express')

const pokemon = require('./models/pokemon')

//createa an instance of express
const app = express()
const PORT = 3000

//Set up view engine
app.set('view engine', 'ejs')
app.set('views', './views')

//root route
app.get('/', (req, res) => {
    res.send('Welcome to the Pokemon App!')
})

app.get('/pokemon', (req, res) => {
    res.render('index', {data: pokemon})
})

app.get('/pokemon/:id', (req, res) => {
    res.send(req.params.id)
})

app.listen(PORT, () => {
    console.log('Server is running...')
})