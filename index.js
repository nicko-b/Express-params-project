const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.listen(port, () => (`Server running on http://localhost:${port}/`))


const students = require('./students.json')

app.get('/', (req, res) => {
    res.send(students)
})

app.get('/students', (req, res) => {
    var query = req.query.search
    var resultArr = []

    //If theres no search, return all
    if (!query){
        for (var student in students){
            resultArr.push(students[student].name)
        }
        res.send(resultArr)

    }
    //Return the results of the search
    else{
        for(var student in students){
            if (students[student].name.includes(query)){
                resultArr.push(students[student])
            }
        }
        if(resultArr.length == 0){
            res.send('No matches found')
        }else{
            res.send(resultArr)
        }
    }
    
})

app.get('/students/:studentId', (req, res) =>{
    var query = req.params.studentId

    for(var student in students){
        if (students[student].id.toString() === query){
            res.send(students[student])
        }
    }
    res.send(`No matches found`)
})

app.get('/grades/:studentId', (req, res) =>{
    var query = req.params.studentId
    for(var student in students){
        if (students[student].id.toString() === query){
            res.send(students[student].grades)
        }
    }
    res.send(`No matches found`)
})

app.post('/grades', (req, res) =>{
    var name = req.body.name
    var id = req.body.id
    var grade = req.body.grade

    if (!name || !id || !grade){
        res.send(`Input invalid`)
    }else{
        var studentFound = false
        for(var student in students){
            if (students[student].id.toString() === id.toString()){
                studentFound = true
                students[student].grades.push(grade)
                res.send('Success!')
            }
        }
        if(!studentFound){
            var newStudent={
                "name": name,
                "id": id,
                "grade": grade
            }
            students.push(newStudent)
            res.send('Success! New student added!')
        }
    }
})

app.post('/register', (req,res) =>{
    var name = req.body.name
    var id = req.body.id
    var grades = req.body.grades

    if (!name || !id || !grades){
        res.send(`Input invalid`)
    }else{
        var studentFound = false
        for(var student in students){
            if (students[student].id.toString() === id.toString()){
                studentFound = true
                res.send('Student exists')
            }
        }
        if(!studentFound){
            var newStudent={
                "name": name,
                "id": id,
                "grades": grades
            }
            students.push(newStudent)
            res.send('Success! New student added!')
        }
    }

})
