import axios from 'axios'

const API_KEY = import.meta.env.VITE_SOME_KEY

const baseUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric`

const getWeather = city => {
  const req = axios.get(`${baseUrl}&q=${city}`)
  return req.then(res => res.data)
}

export default { getWeather }