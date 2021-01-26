import axios from "axios"


export const getWeather = (city) => {
    return  axios.get(`https://www.metaweather.com/api/location/search/?query=${city}`, {
    });
};
export const getWoid = (woeid) => {
    return  axios.get(`https://www.metaweather.com/api/location/${woeid}`, {
    });
};
