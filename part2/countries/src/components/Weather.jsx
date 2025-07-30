import { useState, useEffect } from 'react'
import weatherService from '../services/weather'

const Weather = ({ location }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    weatherService.getFrom(location)
      .then(data => setWeather(data))
  }, [location])

  if (!weather) return

  console.log(weather)

  return (
    <>
      <h2>Weather in {location}</h2>
      <p>Temperature {weather.main.temp} Celcius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <p>Wind {weather.wind.speed} m/s</p>
    </>
  )
}

export default Weather