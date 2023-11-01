console.log("Node is running");

const express = require('express')
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');
const app = express()
const PORT = 3000
const MongoClient = require('mongodb').MongoClient

require('dotenv').config()

let db, 
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'todo-app'

    
// const connectionString = 'mongodb+srv://AshishGupta:tSw64ekEU1rlsAeu@cluster0.ckyacck.mongodb.net/?retryWrites=true&w=majority'
// const connectionString = 'mongodb+srv://AshishGupta:tSw64ekEU1rlsAeu@cluster0.ckyacck.mongodb.net/?retryWrites=true&w=majority'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true})
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
        const task = req.body.task;
        const uppercaseTask = task.toUpperCase();
        tasksCollection
        .insertOne({task: uppercaseTask})
        .then(result => {
            res.redirect('/')
        })

    

    })



    app.delete('/tasks/:id', (req, res) => {
        const taskId = req.params.id; // Retrieve the _id from the URL path
    
        tasksCollection.deleteOne({ _id: new ObjectId(taskId) })
            .then(result => {
                if (result.deletedCount === 1) {
                    res.json({ message: 'Task deleted' });
                } else {
                    res.status(404).json({ message: 'Task not found' });
                }
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            });
    });
    


    app.listen(3000, function(){
        console.log('listen on 3000')
    }) 



    
    })

.catch(error => console.error(error))



//Make Sure you place body-parser before your CRUD handlers!

// ALl our handlers are here....


/* 
    app.delete('/tasks', (req, res) =>{
        tasksCollection.deleteOne(
            {name: req.body.tasks}
        )
        .then(result => {
            res.json("Task Is Completed")
        })
        .catch(error => console.error(error))
    })
 */


