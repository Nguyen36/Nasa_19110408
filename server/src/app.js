const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const launchesRouter = require('./routes/launches/launches.router')
const planetsRouter = require('./routes/planets/planets.router')
const path = require('path')
const app = express()

app.use(morgan('combined'))
app.use(cors({origin: 'http://localhost:3000'}))
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/planets', planetsRouter)
app.use('/launches',launchesRouter)
app.use(express.static(path.join(__dirname,'..','public')))
app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','public','index.html'))
})
module.exports=app;