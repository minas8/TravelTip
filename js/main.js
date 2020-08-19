console.log('Main!');

import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

export function init() {
    renderLocations();
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

                // `
                // <div class="location-item">
                //     <div>${loc.id}</div>
                //     <div>${loc.name}</div>
                //     <div>${loc.lat}</div>
                //     <div>${loc.lng}</div>
                //     <div>${loc.weather}</div>
                //     <div>${loc.createdAt}</div>
                //     <div>${loc.updatedAt}</div>
                //     <button class="btn btn-go" data-id="${loc.id}" data-lat="${loc.lat}" data-lng="${loc.lng}">
                //         Goto location
                //     </button>
                //     <button class="btn btn-go" data-id="${loc.id}" data-lat="${loc.lat}" data-lng="${loc.lng}">
                //         D
                //     </button>
                // </div>
                // `
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
