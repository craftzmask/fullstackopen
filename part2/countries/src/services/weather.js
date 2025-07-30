import axios from 'axios'

const apiKey = import.meta.env.VITE_WEATHER_KEY

const baseUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric`

const getFrom = (location) => {
  return axios.get(`${baseUrl}&q=${location}`)
    .then(res => res.data)
}

export default { getFrom }