import { useState, useEffect } from 'react'

import weatherService from '../services/weather'

const Weather = ({ country }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    weatherService
      .getWeather(country.capital)
      .then(data => setWeather(data))
  }, [country])

  if (!weather) return;

  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <p>temperature {} Celcius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={`Weather's icon at ${country.capital} city`} />
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  )
}

export default Weather