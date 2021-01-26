import React, {useCallback, useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWind,faTint,faEye} from "@fortawesome/free-solid-svg-icons";
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import {getWeather, getWoid} from "../api/apiCalls";
import moment from 'moment';

const Weather = (props) => {
    const [weatherList, setWeatherList] = useState({content: []});
    const [woidList, setWoidList] = useState({content: []});
    const [temp, setTemp] = useState();
    const [desc, setDesc] = useState();
    const [city, setCity] = useState("Ankara");
    const [woeid, setWoeid] = useState();
    const [date, setDate] = useState();
    const [icon, setIcon] = useState();
    const [wind, setWind] = useState();
    const [humidity, setHumidity] = useState();
    const [visibility, setVisibility] = useState();

    
    useEffect(() => {
      (async function anyNameFunction() {
        try {
            const response = await getWeather(city);
            setWeatherList(response.data);
            setWoeid(response.data[0].woeid);
            setCity(response.data[0].title);
        } catch (apiError) {
        }
    })();
    },[]);


    getWoid(woeid).then(
      response => {
setWoidList(response.data.consolidated_weather[0]);
setTemp(Math.floor(response.data.consolidated_weather[0].the_temp));
setDesc(response.data.consolidated_weather[0].weather_state_name);
setDate(moment(response.data.consolidated_weather[0].created).format('dddd'));
setIcon(response.data.consolidated_weather[0].weather_state_abbr);
setWind(Math.floor(response.data.consolidated_weather[0].wind_speed));
setHumidity(response.data.consolidated_weather[0].humidity);
setVisibility(Math.floor(response.data.consolidated_weather[0].visibility));
      },
      error => {
          const resMessage
              = (error.response
                  && error.response.data
                  && error.response.data.message)
              || error.message
              || error.toString();
      }
  );

    return (
        <div className="app">
          <div className="header">
          <h2>Weather Forecast</h2>
            <h3>{city} <span className="degree">{temp}°</span> <img width="155px" className="cloud" src={`https://www.metaweather.com/static/img/weather/${icon}.svg`}/></h3>
            <h4 className="date">{date} <span style={{float: "right", marginRight:"30px"}}> {desc}</span></h4>
          </div>
          <h4 className="weatherTitle">Details</h4>
        <div className="daysContainer">
   
  <div className="days">
    <h3><FontAwesomeIcon style={{marginRight:"10px",fontSize:"30px"}} color="#65b577" icon={faWind}/>
Wind Speed: {wind} mph</h3>
</div>
<div className="days">
  <h3><FontAwesomeIcon style={{marginRight:"10px",fontSize:"30px"}} color="#76b6ca" icon={faTint}/>Humidity: {humidity}%</h3>
</div>
<div className="days">
<h3> <FontAwesomeIcon style={{marginRight:"10px",fontSize:"30px"}} color="#b435dc6b" icon={faEye}/>Visibility: {visibility} km</h3>
</div>

        </div>

        </div>
    );
};

export default Weather;