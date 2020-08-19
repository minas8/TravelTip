
var map;

function initMap(lat = -22.906847, lng = -43.172897) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            map = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('wow!', map);
            // // Configure the click listener.
            // map.addListener('click', function (mapsMouseEvent) {
            //     getCurrentPos(mapsMouseEvent);
            //     // return new Promise((resolve, reject) => {
            //     //     if (mapsMouseEvent.latLng.toString() === '') resolve('Failed to get location')
            //     //     else resolve(getCurrentPos);
            //     //     // navigator.geolocation.getCurrentPosition(resolve, reject)
            //     // })

            //     // // Close the current InfoWindow.
            //     // infoWindow.close();

            //     // // Create a new InfoWindow.
            //     // infoWindow = new google.maps.InfoWindow({ position: mapsMouseEvent.latLng });
            //     // infoWindow.setContent(mapsMouseEvent.latLng.toString());
            //     // infoWindow.open(map);
            // })
        })
}

// function getCurrentPos(mapsMouseEvent) {
//     return new Promise((resolve, reject) => {
//         if (mapsMouseEvent.latLng.toString() === '') reject('Failed to get location')
//         else resolve(mapsMouseEvent.latLng);
//         // navigator.geolocation.getCurrentPosition(resolve, reject)
//     })
// }

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: map,
        title: 'Mina&Ido!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    map.panTo(laLatLng);
}

function geoCode(txt) {
    if (!txt) txt = 'amsterdam rokin'
    let str = txt.split(' ');
    if (str.length > 1) {
        txt = str.toString();
        txt = txt.replace(',', '+');
    }

    var prmRes = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${txt},+IL&key=AIzaSyCoPw3z7JYhRMZ9yzqFFqVofGHp3FSuSy4`)
    var prmAns = prmRes.then((res) => {
        return res.data;
    })
    return prmAns;
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD-H8KfzjYkJTK9lT8SeicR44Dr_VTNnzY&callback=initMap`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}
export const mapService = {
    initMap,
    addMarker,
    panTo,
    geoCode
    // getCurrentPos
}