//load express
const express = require('express')

//createa an instance of express
const app = express()
const PORT = 3000

//root route
app.get('/', (req, res) => {
    res.send('Welcome to the Pokemon App!')
})

app.listen(PORT, () => {
    console.log('Server is running...')
})