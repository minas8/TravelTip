import { utilService } from './util-service.js';
import { storageService } from './storage-service.js';

const LOC_KEY = 'locations';

var gLocs = [
    { id: 1, name: 'loc1', lat: 32.112946, lng: 34.916888, weather: '', createdAt: Date.now(), updatedAt: Date.now() },
    { id: 2, name: 'loc2', lat: 32.158772, lng: 34.843601, weather: '', createdAt: Date.now(), updatedAt: Date.now() }
];


function getLocs() {
    const locs = storageService.loadFromStorage(LOC_KEY);
    if (locs) gLocs = locs;

    return new Promise((resolve, reject) => {
        // setTimeout(() => {
        resolve(gLocs);
        // }, 2000)
    });

    // Locations are saved to localStorage
    storageService.saveToStorage(LOC_KEY, gLocs);
}

// 4. Build the LocationService managing Locations:
function addLoc(name, lat, lng) {
    gLocs.push({
        id: utilService.makeId(),
        name,
        lat,
        lng,
        weather: '',
        createdAt: Date.now(),
        updatedAt: 0
    })
    storageService.saveToStorage(LOC_KEY, gLocs);
    return Promise.resolve();
}

function removeLocById(locId) {
    // gLocs = gLocs.filter(loc => loc.id !== locId);
    gLocs.splice(gLocs.findIndex(loc => loc.id === locId));
    storageService.saveToStorage(LOC_KEY, gLocs);
    return Promise.resolve();
}

function getPosition() {
    console.log('Getting Pos');

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}




export const locService = {
    getLocs: getLocs,
    getPosition: getPosition,
    addLoc: addLoc,
    removeLocById: removeLocById
}