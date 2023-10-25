console.log("Node is running");

const express = require('express')
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');
const app = express()
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://AshishGupta:tSw64ekEU1rlsAeu@cluster0.ckyacck.mongodb.net/?retryWrites=true&w=majority'

MongoClient.connect(connectionString, { useUnifiedTopology: true})
.then(client => {
    console.log('Connected to Database')
    const db = client.db('todo-app')
    const tasksCollection = db.collection('tasks')

    app.set('view engine', 'ejs')

    app.use(bodyParser.urlencoded({extended: true }))
    app.use(express.static('public'));

    app.get('/',  (req, res) => {
        // res.sendFile(__dirname +'/index.html')
        db.collection('tasks')
        .find()
        .toArray()
        .then(results =>{
            // console.log(results)
            res.render('index.ejs', {tasks: results})
        })
        .catch(error => console.error(error))
    })
    app.post('/task', (req, res) => {
        tasksCollection
        .insertOne(req.body)
        .then(result => {
            res.redirect('/')
        })
        // console.log(req.body)
    })

     app.delete('/tasks', (req, res) =>{
        tasksCollection.deleteOne(
            {name: req.body.tasks}
        )
        .then(result => {
            res.json("Task Is Completed")
        })
        .catch(error => console.error(error))
    })


    app.listen(3000, function(){
        console.log('listen on 3000')
    }) 



    
    })

.catch(error => console.error(error))

//Make Sure you place body-parser before your CRUD handlers!

// ALl our handlers are here....


