import axios from "axios";
import { useState } from "react";
import "./index.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = "8126bb7f251b8cb6a957cf42973916fe";
  const urlBase = "https://api.openweathermap.org/data/2.5/weather?q=";
  const imgUrl = "https://openweathermap.org/img/wn/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (city) {
      try {
        const url = `${urlBase}${city}&appid=${apiKey}&units=metric&lang=pt_br`;
        const response = await axios.get(url);
        setWeatherData(response.data);
        setCity("");
      } catch (error) {
        alert(error);
      }
    }
  };
  

  return (
    <div class="container" >
      <div class="stars" ></div>
    <div className="Tempo">
      <div className="form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Digite a cidade"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
      </div>

      {weatherData !== null && (
        <div className="weather-data">
          <h5>Tempo agora em </h5>
          <div className="description-container">
            <h2>
              {weatherData.name} - {weatherData.sys.country}
            </h2>
            <img
              className="weather-icon"
              src={`${imgUrl}${weatherData.weather[0].icon}.png`}
              width="50"
            />
            <p className="description">{weatherData.weather[0].description}</p>
          </div>
          <div className="details-container">
            <p className="temperature">{Math.floor(weatherData.main.temp)}ºC</p>
            <p className="informations">
              Sensação térmica: {Math.floor(weatherData.main.feels_like)}ºC
            </p>
            <p className="informations">
              Min.: {Math.floor(weatherData.main.temp_min)}ºC Max.:{" "}
              {Math.floor(weatherData.main.temp_max)}ºC
            </p>
          </div>
        </div>
      )}
    </div>
  </div>
    
  );
};

export default Weather;