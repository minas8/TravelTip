import locService from './services/loc.service.js'
import mapService from './services/map.service.js'
//import getWeather from './services/weather.service.js' // ad weather api

document.querySelector('.go').addEventListener('click', handleSearch);
document.querySelector('.myLoc').addEventListener('click', handleUserLoc);//add a func
document.querySelector('.search').addEventListener('keypress', checkIfEnter);//add a func

export function init() {
    renderItems();}

function handleSearch(loc) {
    let input;
    if (typeof loc !== 'string') input = document.querySelector('.search').value;
    else input = loc;
    console.log(input)
    let geoCodeData = mapService.geoCode(input);
    let strHtml = '';
    let strWeatHtml = '';
    geoCodeData.then(data => {
        console.log(data)
        strHtml += ` Location:  ${data.results[0].formatted_address}
        `
        document.querySelector('h2').innerText = strHtml;

        mapService.initMap(data.results[0].geometry.location.lat, data.results[0].geometry.location.lng)
            .then(
                () => {
                    mapService.addMarker({ lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng });
                }
            ).catch(console.warn);
        })
}
function renderItems() {
    locService.getLocs()
        .then(locs => {
            // console.log('locs', locs);
            const strHTMLs = locs.map(loc =>
                `
                <tr class="location-item">
                    <td>${loc.id}</td>
                    <td>${loc.name}</td>
                    <td>${loc.lat}</td>
                    <td>${loc.lng}</td>
                    <td>${loc.weather}</td>
                    <td>${loc.createdAt}</td>
                    <td>${loc.updatedAt}</td>
                    <td>
                        <button class="btn btn-go" data-id="${loc.id}" data-lat="${loc.lat}" data-lng="${loc.lng}">
                             Go
                         </button>
                    </td>
                    <td>
                        <button class="btn btn-delete" data-id="${loc.id}">
                             Delete
                         </button>
                    </td>
                </tr>
            `
            )
            document.querySelector('.locations-list').innerHTML = strHTMLs.join('');
        })
}

 window.addEventListener('load', () => {
     // console.log('Ready');
     init();
 })

window.onload = () => {
    mapService.initMap()
        .then(() => {

            mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
        })
        .catch(console.log('INIT MAP ERROR'));

    locService.getPosition()
        .then(pos => {

            console.log('User position is:', pos.coords);
        })
        .catch(err => {
            console.log('Cannot get user-position', err);
        })

}

document.querySelector('.btn').addEventListener('click', (ev) => {
    console.log('Aha!', ev.target);
    mapService.panTo(35.6895, 139.6917);
})
