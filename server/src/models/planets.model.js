const { rejects } = require('assert');
const {parse} = require('csv-parse');
const fs = require('fs');
// const { resolve } = require('path');
const path = require('path');
const planetsRouter = require('../routes/planets/planets.router');
const planets = require('./planets.mongo')

const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

/*
    const promise = new Promise((resolve, reject)=>{
        resolve(42)
    });
    promise.then((result)=>{

    })
    const result = await promise;
    console.log(result)
*/
function loadPlanetsData(){
   return new Promise((resolve, rejects)=>{
    fs.createReadStream(path.join(__dirname,'..','..','data','kepler_data.csv'))
    .pipe(parse({
      comment: '#',
      columns: true,
    }))
    .on('data', async(data) => {
      if (isHabitablePlanet(data)) {
        savePlanet(data)
      }
    })
    .on('error', (err) => {
      console.log(err);
      rejects(err)
    })
    .on('end', async() => {
      const countPlanetsFound = (await getAllPlanets()).length
      console.log(`${countPlanetsFound} habitable planets found!`);
      resolve();
    });
   }) 
}

async function getAllPlanets(){
  return await planets.find({},{
    '_id':0 ,'__v':0  })
}

async function savePlanet(planet){
  try {
      await planets.updateOne({
        keplerName: planet.kepler_name
      },{
        keplerName: planet.kepler_name
      },{
        upsert:true
      })
  } catch (error) {
    console.error(`Could not save planet ${error}`);
  }
}

module.exports = {
    loadPlanetsData,
    getAllPlanets
}