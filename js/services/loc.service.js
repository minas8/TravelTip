import { storageService } from './storage-service.js';

var locs = [
    { id: 1, name: 'loc1', lat: 32.22, lng: 33.11, weather: '', createdAt: Date.now(), updatedAt: Date.now() },
    { id: 2, name: 'loc2', lat: 31.22, lng: 34.11, weather: '', createdAt: Date.now(), updatedAt: Date.now() }
];

function getLocs() {
    // TODO: load from storage
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
    // TODO: save to storage
}


function getPosition() {
    console.log('Getting Pos');

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}




export const locService = {
    getLocs: getLocs,
    getPosition: getPosition
}