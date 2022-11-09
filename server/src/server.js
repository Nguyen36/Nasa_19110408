const http = require('http')

const app = require('./app')

const request = require('supertest')

const chai = require('chai')

var expect = chai.expect

const {loadPlanetsData} = require('./models/planets.model')

const PORT = process.env.PORT || 8000;

const server = http.createServer(app)

async function startServer(){
    await loadPlanetsData()

    server.listen(PORT,()=>{
        console.log(`Lisstening on port ${PORT}`)
    })
}
startServer()

const data = {
  mission: "ZTM155",
  rocket:"ZTM Experimental IS1",
  target:"Kepler-186 f",
  launchDate:1691488000000
}

describe('TEST ON /GET launches', ()=>{
  it('Check status and json',function(done){
    request(app)
      .get('/launches')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200,done)
  })
  it('Check return length at least 1',async function(){
    const res = await request(app).get('/launches')
    expect(res.body.length).to.be.at.least(1)
  })
})

describe('TEST ON /POST launches',()=>{
  it('Check status POST /launches',async ()=>{
    const res = await request(app)
     .post('/launches')
     .send(data)
     .set('Accept', 'application/json')
    expect(res.statusCode).to.equal(201)
  })
  it('Check return json after POST /launches',async ()=>{
    const res = await request(app)
     .post('/launches')
     .send(data)
     .set('Accept', 'application/json')
    expect(res.type).to.equal('application/json')
  })
  it('Check property mission with typeof String',async ()=>{
    const res = await request(app)
     .post('/launches')
     .send(data)
     .set('Accept', 'application/json')
    expect(res.body.mission).to.be.a('string')
  })
  it('Check POST faill /launches',async ()=>{
    const res = await request(app)
     .post('/launches')
     .send({
      mission: "ZTM155",
      rocket:"ZTM Experimental IS1",
      target:"Kepler-186 f"
    })
     .set('Accept', 'application/json')
    // expect(res.status).to.equals(400)
    expect(res.body.error,res.status).to.equals('Missung required launch property',40)
  })
})

describe('TEST /DELETE launches',()=>{
  it('Check return status',async()=>{
    const res = await request(app)
    .delete('/launches/100')
    expect(res.statusCode).to.equals(200)
  })
  it('Check property success and value false',async()=>{
    const res = await request(app)
    .delete('/launches/100')
    expect(res.body).to.have.property('success')
    expect(res.body.success).to.equal(false)
  })
})

describe('TEST /GET planets',()=>{
  it('Check return status 200',async()=>{
    const res = await request(app).get('/planets')
    expect(res.status).to.equal(200)
  })
  it('Check return json',async()=>{
    const res = await request(app).get('/planets')
    expect(res.type).to.equal('application/json')
  })
})