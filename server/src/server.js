const http = require('http')

const app = require('./app')

const request = require('supertest')

const chai = require('chai')

var expect = chai.expect

const {mongoConnect} = require('./services/mongo')
const {loadPlanetsData} = require('./models/planets.model')
const {loadLaunchData} = require('./models/lauches.model')

const PORT = process.env.PORT || 8000;

const server = http.createServer(app)

async function startServer(){
    await mongoConnect()
    await loadPlanetsData()
    await loadLaunchData()
 
    server.listen(PORT,()=>{
        console.log(`Lisstening on port ${PORT}`)
    })
}
startServer()

// describe('TEST /GET planets',()=>{
//   it('Check return status 200',async()=>{
//     const res = await request(app).get('/planets')
//     expect(res.status).to.equal(200)
//   })
//   it('Check return json',async()=>{
//     const res = await request(app).get('/planets')
//     expect(res.type).to.equal('application/json')
//   })
// })