'use strict';

export default {getResponseFromApi}

function getResponseFromApi(api) {
    return axios.get(api).then(res => res.data);
}
