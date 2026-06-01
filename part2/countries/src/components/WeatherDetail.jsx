const WeatherDetail = ({ weather }) => {
  if (!weather) {
    return null;
  }

  return (
    <div>
      <p>Temperature {weather.main.temp} Celsius</p>
      <img
        src={`https://openweathermap.org/payload/api/media/file/${weather.weather[0].icon}.png`}
        alt={weather.weather[0].description}
      />
      <p>Wind {weather.wind.speed} m/s</p>
    </div>
  );
};

export default WeatherDetail;
