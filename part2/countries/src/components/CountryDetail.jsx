import { useEffect, useState } from "react";
import WeatherDetail from "./WeatherDetail";
import axios from "axios";

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_SOME_KEY;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${apiKey}`,
      )
      .then((response) => setWeather(response.data));
  }, [country]);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>

      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>

      <img src={country.flags.svg} alt={country.flags.alt} width="150" />
      <h2>Weather in {country.capital}</h2>
      <WeatherDetail weather={weather} />
    </div>
  );
};

export default CountryDetail;
