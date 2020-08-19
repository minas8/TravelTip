'use strict';

import apiService from './api-service.js'

export default {searchPlacesOnInput}

function searchPlacesOnInput(input){
    let api = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=geocode&language=fr&key=AIzaSyCoPw3z7JYhRMZ9yzqFFqVofGHp3FSuSy4`
    
    apiService.getResponseFromApi(api).then(res => console.log(res))
}
