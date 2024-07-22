import { useState, useEffect } from 'react'
import axios from 'axios'

const apiKey = import.meta.env.VITE_SOME_KEY

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      .then(res => setWeather(res.data))
  }, [city])

  if (weather === null) return null
  
  return (
    <div>
      <h3>Weather in {city}</h3>
      <p>temperature {weather.main.temp} Celcius</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="" />
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  )
}

export default Weather