'use strict';
import apiService from './api-service.js';


export default { getWeatherByPos }

function getWeatherByPos(pos) {
    let str = `https://api.openweathermap.org/data/2.5/weather?lat=${pos.lat}&lon=${pos.lng}&units=metric&APPID=aab7729734058c951cb972e3a5796a60`;
    // var obj = {};
    return apiService.getResponseFromApi(str)
        .then(weatherPrm => {
            return {
                temp: weatherPrm.main.temp,
                description: weatherPrm.weather[0].description
            }
        });
}
