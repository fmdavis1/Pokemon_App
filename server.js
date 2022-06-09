//load express
const express = require('express')

const pokemon = require('./models/pokemon')
require('dotenv').config()
const mongoose = require('mongoose')
const PokemonModel = require('./models/PokemonModel')


//createa an instance of express
const app = express()
const PORT = 3000

//Middleware functions
//They update the request as soon as they come in.

// app.use((req, res, next) => {
//     console.log('Running the middleware function!')
//     next() //Go to the next middleware or the response.
// })

//JSON Middleware
app.use(express.json())

//if we don't need to read data from the url
app.use(express.urlencoded({extended: false}))

//Set up view engine
app.set('view engine', 'ejs')
app.set('views', './views')

//*===============ROUTES
app.get('/', (req, res) => {
    res.send('Welcome to the Pokemon App!')
})

app.get('/pokemon', async(req, res) => {

    try{
    //fetch data fom the db
    const pokemons = await PokemonModel.find()
    // console.log(pokemons)
    // console.log(pokemons.forEach(pokemon => console.log(pokemon_id)))
        
        res.render('index', {
            pageTitle: 'Pokemon',
            pageHeader: 'See All The Pokemon!',
            pokemon: pokemons
            
        })
    } catch(error){
        console.log(error)
    }
    })

    

app.get('/pokemon/new', (req, res) => {
    res.render('new-pokemon', {
        pageTitle: 'New Pokemon',
        pageHeader: " Create a new Pokemon ",
       // index:Number(req.params.id),
        //pokemon:pokemon,pokemon:pokemon, index:Number(req.params.id)})
})

})

app.post('/pokemon', async(req, res) => {
        const newPokemon = req.body//create newPokemon variable
        //add a img property to the object
        console.log('newPokemon=',newPokemon)
        newPokemon.img = `http://img.pokemondb.net/artwork/${req.body.name.toLowerCase()}`
       console.log(newPokemon)
        // pokemon.push(req.body)
        // res.redirect('/pokemon')
        await PokemonModel.create(newPokemon, ( error, result) =>{
            if (error){
                console.log(error)
            }
           
            console.log(result)
        })
        //More stuff
        // res.send('done')
        res.redirect('/pokemon')
    })

app.get('/pokemon/:id', async(req, res) => {
    // res.send(req.params.id)

    try{
        const pokemon= await PokemonModel.findById(req.params.id)
        res.render('show', {
            pageTitle: 'Details',
            pageHeader: " Gotta Catch 'Em All ",
            // index:Number(req.params.id),
            pokemon:pokemon
        })
    }catch (error){
        console.log(error)
    }
        // index:pokemon[req.params.id]
        
        // pokemon: pokemon[req.params.id]
    })

// app.get('/pokemon', (req, res) => {
//     res.render('index', {data: pokemon})
// })

// app.get('/pokemon/:id', (req, res) => {
//     res.render('show', {pokemon:pokemon, index:Number(req.params.id)})
// })



// app.post('/pokemon',(req, res) => {
//     console.log(req.body)
//     pokemon.push(req.body)
//     res.redirect('/pokemon')

// })

//*============LISTENER

app.listen(PORT, () => {
    console.log('Server is running...')
    mongoose.connect(process.env.MONGODB_URI)//CONNECTS TO MONGO DB
    console.log('MongoDB connected!')
})