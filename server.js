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
    
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true})
.then(client => {
    console.log('Connected to Database')
    const db = client.db('todo-app')
    const tasksCollection = db.collection('tasks')

    app.set('view engine', 'ejs')

    app.use(bodyParser.urlencoded({extended: true }))
    app.use(express.static('public'));
    app.use(bodyParser.json())

    app.get('/',  (req, res) => {
        // res.sendFile(__dirname +'/index.html')
        db.collection('tasks')
        .find()
        .toArray()
        .then(results =>{
            // console.log(results)
            res.render('indexTest.ejs', {tasks: results})
        })
        .catch(error => console.error(error))
    })

    app.put('/markComplete', (request, response) => {
        const taskToMark = request.body.taskFromJS;
    
        // Find the task by task name
        db.collection('tasks').findOne({ task: taskToMark })
            .then(task => {
                if (task) {
                    const newCompletionStatus = !task.completed; // Toggle completion status
    
                    // Update the task's completion status
                    return db.collection('tasks').updateOne(
                        { _id: task._id },
                        { $set: { completed: newCompletionStatus } }
                    );
                } else {
                    throw new Error('Task not found');
                }
            })
            .then(result => {
                console.log('Toggled Completion Status');
                response.json('Toggled Completion Status');
            })
            .catch(error => {
                console.error(error);
                response.status(500).json({ error: 'An error occurred while toggling the completion status' });
            });
    });
    

    
/* 
    app.put('/markComplete', (request, response) =>{
        db.collection('tasks').updateOne({task: request.body.taskFromJS},{
            $set: {
                completed: true
            }
        },{
            sort: {_id: -1}, 
            upsert: false
        })
        .then(result => {
            console.log('Marked Complete')
            response.json('Marked Complete')
        })
        .catch(error => console.error(error))
    })

 */






    app.post('/task', (req, res) => {
        const task = req.body.task;
        const uppercaseTask = task.toUpperCase();
        tasksCollection
        .insertOne({task: uppercaseTask, completed: false})
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


