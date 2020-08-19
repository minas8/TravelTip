import {locService} from './services/loc.service.js'
import {mapService} from './services/map.service.js'
import weatherService from './services/weather.service.js'

document.querySelector('.go').addEventListener('click', handleSearch);
document.querySelector('.myLoc').addEventListener('click', handleUserLoc);//add a func
//document.querySelector('.search').addEventListener('keypress', checkIfEnter);//add a func

export function init() {
    renderLocations();
}

document.body.onload = () => {
    handleUserLoc();
}

window.onload = () => {
    let urlParams = new URLSearchParams(window.location.search);
    let queryLat = +urlParams.get('lat');
    let queryLng = +urlParams.get('lng');
    let pos = { lat: queryLat, lng: queryLng }
    if (queryLat && queryLng) {
        mapService.initMap(queryLat, queryLng).then(() => {
            geoService.getGeocodeByLatLng(pos).then(geocode => {
                renderLocationName(geocode.results[0].formatted_address);
            })
            weatherService.getWeatherByPos(pos).then(renderWeatherDetails)
        })
    } else {
        mapService.initMap()
            .then(setMapToCurrentLocation)
    }
}


// button my location
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
// 6. Render the locations table:
function renderLocations() {
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
                        <button class="btn-go" data-lat="${loc.lat}" data-lng="${loc.lng}">
                             Go
                         </button>
                    </td>
                    <td>
                        <button class="btn-delete" data-id="${loc.id}">
                             Delete
                         </button>
                    </td>
                </tr>
            `
            )
            document.querySelector('.locations-list').innerHTML = strHTMLs.join('');
            addEventListeners();
        })
}

function addEventListeners() {
    // Event Delegation - For Delete
    document.querySelector('.btn-delete').onclick = function (ev) {
        if (!ev.target.dataset.id) return;
        const locId = ev.target.dataset.id;
        locService.removeLocById(locId)
        renderLocations();
    }
    // Event Delegation - For Go
    document.querySelector('.btn-go').onclick = function (ev) {
        if (!ev.target.dataset.lat && !ev.target.dataset.lng) return;
        const lat = ev.target.dataset.lat;
        const lng = ev.target.dataset.lng;
        mapService.panTo(lat, lng);
    }
}

window.onload = () => {
    init();
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

function handleUserLoc() {

    let userPos = locService.getPosition()
        .then(pos => {
            mapService.initMap(pos.coords.latitude, pos.coords.longitude)
                .then(
                    () => {
                        mapService.addMarker({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                    }
                ).catch(console.warn);

            let weather = getWeather.getWeather(pos.coords.latitude, pos.coords.longitude)
            weather.then(weatData => {
                handleSearch(weatData.name);
            })

        })

}
