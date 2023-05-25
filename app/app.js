import { getWeatherData } from "./getWeatherData.js";



document.querySelector("#search-button").addEventListener("click", () => window.location.href = "./weather-search.html")
document.querySelector(".location__container__my-location").addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition( async position => {
    const lat = position.coords.latitude.toFixed(2)
    const lon = position.coords.longitude.toFixed(2)
    let actualFullDate = new Date().toLocaleDateString("es-MX", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }).split(" ")
    let localWeather = await getWeatherData({ lat, lon })
  
    let localWeatherData = {
      degrees: localWeather.main.temp,
      description: localWeather.weather[0].description,
      location: localWeather.name,
      date: {
        day: actualFullDate[0],
        date: actualFullDate[1],
        month: actualFullDate[3]
      },
      hightlights: {
        windSpeed: localWeather.wind.speed,
        humidity: localWeather.main.humidity,
        visibility: localWeather.visibility / 1000,
        airPressure: localWeather.main.pressure,
      }
    }

    setWeatherDataAndHightlights(localWeatherData)
  })
})



/**
 * The function sets weather data by updating the HTML content of specific elements with the provided
 * degrees, description, and location.
 * @param degrees - The temperature in degrees (in Celsius or Fahrenheit) to be displayed on the
 * webpage.
 * @param description - A string that describes the weather conditions (e.g. "sunny", "cloudy",
 * "rainy").
 * @param location - The location parameter is a string that represents the name of a city or location
 * for which the weather data is being set.
 */
const setWeatherDataAndHightlights = (weatherData) => {
  document.querySelector("#degrees").innerHTML = Math.round(weatherData.degrees)
  document.querySelector("#weather").innerHTML = weatherData.description
  document.querySelector("#city-name").innerHTML = weatherData.location
  document.querySelector("#today-day").innerHTML = weatherData.date.day
  document.querySelector("#today-date").innerHTML = weatherData.date.date
  document.querySelector("#today-month").innerHTML = weatherData.date.month
  document.querySelector("#wind-speed").innerHTML = weatherData.hightlights.windSpeed
  document.querySelector("#humidity").innerHTML = Math.floor(weatherData.hightlights.humidity)
  document.querySelector("#humidity-bar").style.width = Math.floor(weatherData.hightlights.humidity).toString() + "%"
  document.querySelector("#visibility").innerHTML = weatherData.hightlights.visibility
  document.querySelector("#air-pressure").innerHTML = weatherData.hightlights.airPressure
}

const setWeatherIcon = weatherId => {
  let weatherImageName
  switch(Math.floor(weatherId / 100)){
    case 2:
      weatherImageName = "Thunderstorm"
      break
    case 3:
      weatherImageName = "Drizzle"
      break
    case 5:
      weatherImageName = "Rain"
      break
    case 6:
      weatherImageName = "Snow"
      break
    case 7:
      weatherImageName = "Mist"
      break
    default:
      weatherImageName = "Clear"
    }
  document.querySelector("#weather-image").src = `./assets/images/${weatherImageName}.png`
}

/**
 * The function searches for weather data based on a given city name or the user's current location and
 * sets the retrieved data to display on the webpage.
 * @returns If `city` is given from the search page, the function returns the weather data for the specified city. If is't
 * `city`, the function returns the weather data for the user's current location.
 */
const searchWeather = async() => {
  const urlParams = new URLSearchParams(window.location.search)
  const cityName = urlParams.get("cityName")
  let city = await getWeatherData({cityName})
  let actualFullDate = new Date().toLocaleDateString("es-MX", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }).split(" ")
  if(!cityName) {
    navigator.geolocation.getCurrentPosition( async position => {
      const lat = position.coords.latitude.toFixed(2)
      const lon = position.coords.longitude.toFixed(2)
    
      let localWeather = await getWeatherData({ lat, lon })
    
      setWeatherIcon(localWeather.weather[0].id)
      let localWeatherData = {
        degrees: localWeather.main.temp,
        description: localWeather.weather[0].description,
        location: localWeather.name,
        date: {
          day: actualFullDate[0],
          date: actualFullDate[1],
          month: actualFullDate[3]
        },
        hightlights: {
          windSpeed: localWeather.wind.speed,
          humidity: localWeather.main.humidity,
          visibility: localWeather.visibility / 1000,
          airPressure: localWeather.main.pressure,
        }
      }
      setWeatherDataAndHightlights(localWeatherData)
    })
    return
  }
  let cityWeatherData = {
    degrees: city.main.temp,
    description: city.weather[0].description,
    location: city.name,
    date: {
      day: actualFullDate[0],
      date: actualFullDate[1],
      month: actualFullDate[3]
    },
    hightlights: {
      windSpeed: city.wind.speed,
      humidity: city.main.humidity,
      visibility: city.visibility / 1000,
      airPressure: city.main.pressure,
    }
  }

  setWeatherIcon(city.weather[0].id)
  setWeatherDataAndHightlights(cityWeatherData)
}
searchWeather()
