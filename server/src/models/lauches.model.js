const lauches = new Map()

let latestFlighNumber = 100

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2022'),
    target: 'Kepler-442 b',
    customers: ['ZTM', 'NASA'],
    upcoming: true,
    success: true
}

lauches.set(launch.flightNumber, launch)

function existsLaunchWithId(launchId){
    return lauches.has(launchId)
}

function getAllLaunches(){
    return Array.from(lauches.values())
}

function addNewLaunch(launch){
    latestFlighNumber++
    lauches.set(latestFlighNumber, Object.assign(launch,{
        success: true,
        upcoming: true,
        customers:['Zero to Mastery','NASA'],
        flightNumber: latestFlighNumber
    }))  
}

function abortLaunchById(launchId){
    const aborted = lauches.get(launchId)
    aborted.upcoming = false
    aborted.success = false
    return aborted
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortLaunchById
}