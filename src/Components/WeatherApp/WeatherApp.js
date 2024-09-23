import React, { useState } from "react";
import "./WeatherApp.css";

import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import humidity_icon from "../Assets/humidity.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";

const WeatherApp = () => {
  const api_key = "48d52173c33df52e8a8598c491dce0df";

  const [wicon, setWicon] = useState(cloud_icon);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return;
    }
    const city = element[0].value;
    const api_url = "https://api.openweathermap.org/data/2.5/weather?units=Metric";
    const full_url = `${api_url}&q=${city}&appid=${api_key}`;
  
    try {
      let response = await fetch(full_url);
      let data = await response.json();
  
      if (response.ok) {
        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate");
        const temperature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");
  
        humidity[0].innerHTML = data.main.humidity + " %";
        wind[0].innerHTML = data.wind.speed + " km/h";
        temperature[0].innerHTML = data.main.temp + " &deg;C";
        location[0].innerHTML = data.name;
  
        switch (data.weather[0].icon) {
          case "01d":
          case "01n":
            setWicon(clear_icon);
            break;
          case "02d":
          case "02n":
            setWicon(cloud_icon);
            break;
          case "03d":
          case "03n":
          case "04d":
          case "04n":
            setWicon(drizzle_icon);
            break;
          case "09d":
          case "09n":
          case "10d":
            case "10n":
            setWicon(rain_icon);
            break;
          case "13d":
          case "13n":
            setWicon(snow_icon);
            break;
          default:
            setWicon(clear_icon);
        }
      } else {
        console.error("Error fetching weather data: ", data.message);
        alert("Error fetching weather data: " + data.message);
      }
    } catch (error) {
      console.error("Error fetching weather data: ", error);
      alert("Error fetching weather data. Please try again later.");
    }
  };
  

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" placeholder="Search" className="cityInput" />
        <div
          className="search-icon"
          onClick={() => {
            search();
          }}
        >
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">25&deg;C</div>
      <div className="weather-location">London</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" />
          <div className="data">
            <div className="humidity-percent">64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" />
          <div className="data">
            <div className="wind-rate">18 km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
