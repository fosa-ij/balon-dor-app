console.log('may node and express be with you');

// DECLARED DEPENDENCIES
const express = require('express')
const app = express()
const PORT = 8000
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
const connectionString = process.env.DB_STRING

// SERVER CREATION
async function createServer(){
    try {
        // CONNECTION TO DATABASE
        let client = await MongoClient.connect(connectionString)
        console.log('Connected to Database');
        const db = client.db('balon-dor-winners')
        const yearsCollection = db.collection('years')

        //SET MIDDLEWARE
        app.set('view engine', 'ejs')
        app.use(express.static('public'))
        app.use(express.urlencoded({extended: true}))
        app.use(express.json())

        app.get('/', (req, res) => {
            let getRequest = async _ => {
                try{
                    let data = await yearsCollection.find().toArray()
                    res.render('index.ejs', {objects: data})
                }
                catch(err){
                    console.error(err);
                }
            }
            getRequest()
        })

        app.post('/winners', (req, res) => {
            let postRequest = async _ => {
                try {
                    await yearsCollection.insertOne(req.body)
                    // console.log(req.body);
                    res.redirect('/')
                }
                catch(err){
                    console.error(err);
                }
            }
            postRequest()
        })

        app.put('/update', (req, res) => {
            let updateRequest = async _ => {
                try{
                    Object.keys(req.body).forEach(key => {
                        if (req.body[key] === null || req.body[key] === undefined || req.body[key] === ''){
                            delete req.body[key]
                        }
                    })
                    // console.log(req.body);
                    let results = await yearsCollection.findOneAndUpdate(
                        {
                            year: req.body.year
                        },
                        {
                            $set: req.body
                        }
                    )
                    res.json('success')
                }
                catch(err){
                    console.error(err);
                }
            }
            updateRequest()
        })

        app.delete('/delete', (req, res) => {
            let deleteRequest = async _ => {
                try{
                    let results = await yearsCollection.findOneAndDelete(
                        {
                            year: req.body.year
                        }
                    )
                    if (results.deletedCount === 0) {
                        return res.json('No data to delete')
                    } 
                    console.log(req.body.year);
                    res.json(`DELETED WINNER FOR ${req.body.year} BALON D'OR`)

                    
                }
                catch(err){
                    console.error(err);
                }
            }
            deleteRequest()
        })

        app.listen(process.env.PORT || PORT, () => {
            console.log(`server is running on port ${PORT}`)
        })
    }
    catch(err){
        console.error(err);
    }
}
createServer()