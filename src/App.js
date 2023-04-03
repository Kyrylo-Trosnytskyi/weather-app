import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const API_KEY = "e158c312ec71d4c5e5d4911f59587821";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const getWeather = async (cityName) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      setError(null);
      setWeather(response.data);
    } catch (error) {
      setError(
        "Не вдалося отримати дані про погоду. Будь ласка, спробуйте ще раз."
      );
      setWeather(null);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getWeather(city);
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <label htmlFor="city">Введіть назву міста:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
          <button type="submit">Отримати погоду</button>
        </form>

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather-info">
            <h1>
              {weather.name}, {weather.sys.country}
            </h1>
            <p>Температура: {weather.main.temp}°C</p>
            <p>Відчувається як: {weather.main.feels_like}°C</p>
            <p>Погода: {weather.weather[0].main}</p>
            <p>Опис: {weather.weather[0].description}</p>
            <p>Вітер: {weather.wind.speed} м/с</p>
            <p>Вологість: {weather.main.humidity}%</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
