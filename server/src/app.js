const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const api = require('./routes/api')
const path = require('path')
const app = express()

app.use(morgan('combined'))

app.use(cors({origin: 'http://localhost:3000'}))

app.use(express.urlencoded({extended: true}));

app.use(express.json());
app.use(express.static(path.join(__dirname,'..','public')))

app.use('/v1',api)
app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','public','index.html'))
})
module.exports=app;