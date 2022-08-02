const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./db/connection');
const port = 5000;

require("dotenv").config();

const router = require('./routes/todo')

// app.use((req, res, next) =>{
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Origin', '*')

//     if(req.method === 'OPTIONS'){
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
//         return res.status(200).json({})
//     }

//     next();
// })

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use('/todo', router)

const start = async () =>{
    try {
        await connectDB(process.env.MONGO_CONNECTION);
        app.listen(port, (req, res) => {
            console.log('You are listening to port :', port);
        })
    } catch (error) {
        console.log(error);
    }
}

start();