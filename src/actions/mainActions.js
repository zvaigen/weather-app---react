const axios = require('axios');

export const getWeather = async (city) => {
  let weather = await axios.post('http://localhost:5000/weather',{city:city});
  return weather.data.weather
};