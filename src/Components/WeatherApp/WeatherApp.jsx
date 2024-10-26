import React, { useState } from 'react'
import './WeatherApp.css'
import search_icon from '../Assests/search.png';
import clear_icon from '../Assests/clear.png';
import cloud_icon from '../Assests/cloud.png';
import drizzle from '../Assests/drizzle.png';
import snow from '../Assests/snow.png';
import wind from '../Assests/wind.png';
import humidity from '../Assests/humidity.png';
import rain from '../Assests/rain.png';

const WeatherApp = () => {

    let Api_key="9dc99f07cc26e5de9e82b2bb9ca6f2e8";

    const [wicon,setWicon]=useState(cloud_icon);

    const search= async ()=>{
        const element= document.getElementsByClassName("cityInput");
        if(element[0].value==""){
            return 0;
        }
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${Api_key}`;

        let responce = await fetch(url);
        let data= await responce.json();
        const humidity= document.getElementsByClassName("humidity-percent");
        const wind= document.getElementsByClassName("wind-rate");
        const temprature= document.getElementsByClassName("weather-temp");
        const location=document.getElementsByClassName("weather-location");

        humidity[0].innerHTML = data.main.humidity +" %";
        wind[0].innerHTML = Math.floor(data.wind.speed)+" km/h";
        temprature[0].innerHTML= Math.floor(data.main.temp)+" °C";
        location[0].innerHTML= data.name;

        if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n" ){
            setWicon(clear_icon);
        }
        else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n" ){
            setWicon(cloud_icon);
        }
        else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n" ){
            setWicon(drizzle);
        }
        else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n" ){
            setWicon(drizzle);
        }
        else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n" ){
            setWicon(rain);
        }
        else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n" ){
            setWicon(rain);
        }
        else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n" ){
            setWicon(snow);
        }
        else{
            setWicon(clear_icon)
        }
    }

  return (
    <div className='container'>
        <div className="top-bar">
            <input type="text" className="cityInput" placeholder='Search'/>
            <div className="search-icon" onClick={()=>{search()}}>
                <img src={search_icon} alt=""  />
            </div>
        </div>
        <div className="weather-image">
            <img src={wicon} alt="" />
        </div>
        <div className="weather-temp">24°c</div>
        <div className="weather-location">London</div>
        <div className="data-container">
            <div className="element">
                <img src={humidity} alt="" className="icon" />
                <div className="data">
                    <div className="humidity-percent"> 64%</div>
                    <div className="text">Humidity</div>
                </div>
            </div>
            <div className="element">
                <img src={wind} alt="" className="icon" />
                <div className="data">
                    <div className="wind-rate">18 km/h</div>
                    <div className="text">Wind speed</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WeatherApp