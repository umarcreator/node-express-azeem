const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017')

const db = mongoose.connection
db.on('error', e => console.log(e))
db.once('open', () => console.log('connected to db...'))


const UserSchema = require('./schema')

app.use(express.json())

app.use(cors())

app.listen(3000, err => {
    if(err) throw err;
    // if(err) {
    //     throw err;
    // }
    console.log('server running at port: 3000...')
})

const middleware = (req, res, next) => {
    if(req.body.name, req.body.email, req.body.password) {
        next()
    } else {
        return res.status(400).json({ message: 'Some fields are missing!' })
    }
}

// app.get('/home', middleware, (req, res) => {
//     // console.log(req.headers)
//     console.log('controller...')
//     // process data
//     // fetch, update, delete, add something from database
//     res.json({ message: 'Successfully proceeded your request!'})
// })

app.post('/user', middleware, async (req, res) => {
    // console.log(req.body)
    const newUser = await UserSchema({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
    })
    const savedUser = await newUser.save();
    res.json(savedUser)
    // res.json({ message: 'Welcome '+req.body.name })
})

app.get('/users', async (req, res) => {
    const users = await UserSchema.find();
    // console.log(users);
    // const users = await UserSchema.find({ name: "Umar" });
    res.json(users);
})