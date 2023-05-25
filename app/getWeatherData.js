/**
 * The function retrieves weather data from OpenWeatherMap API based on either a city name or latitude
 * and longitude coordinates.
 * @param parameters - The `parameters` object is an input parameter for the `getWeatherData` function.
 * It can have two properties:
 * @returns The function `getWeatherData` returns a JSON object containing weather data for a specified
 * city or latitude and longitude coordinates.
 */
export const getWeatherData = async(parameters) => {
  let apiKey = "afc299c4d4efc3f247a355dfe553b504"
  let actualFullDate = new Date().toLocaleDateString("es-MX", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }).split(" ")

  let fullWeatherData
  
/* This code block is checking if the `parameters` object has a property called `cityName`. If it does,
it constructs a URL using the `cityName` parameter and makes an API call to OpenWeatherMap to
retrieve weather data for that city. The retrieved data is then returned as a JSON object. */
  if("cityName" in parameters) {
    let cityNameURL = `https://api.openweathermap.org/data/2.5/weather?q=${parameters.cityName}&appid=${apiKey}&units=metric&lang=es`
    console.log(cityNameURL);
    await fetch(cityNameURL)
       .then(response => response.json())
       .then(data => fullWeatherData = data)
    return fullWeatherData
  }
  let latLenURL = `https://api.openweathermap.org/data/2.5/weather?lat=${parameters.lat}&lon=${parameters.lon}&appid=${apiKey}&units=metric&lang=es`
  console.log(latLenURL);
  await fetch(latLenURL)
    .then(response => response.json())
    .then(data => fullWeatherData = data)
  return fullWeatherData
}

export const getWeatherWeeklyData = () => {
  
}