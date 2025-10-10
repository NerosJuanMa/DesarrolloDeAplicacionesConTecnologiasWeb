// src/utils/fetchWeather.js
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const ONECALL_URL = "https://api.openweathermap.org/data/3.0/onecall";

/** Fetch weather by city name */
export async function fetchWeatherByCity(city) {
  try {
    // TRYING 1º FETCH
    const res1 = await fetch(
      `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data1 = await res1.json();
    // Create a custom error with data1.message as content
    if (!res1.ok)
      throw new Error(
        `HTTP error: ${data1.message}` || `HTTP error ${res1.status}`
      );
    const lat = data1.coord.lat;
    const lon = data1.coord.lon;
    // TRYING 2º FETCH
    const res2 = await fetch(
      `${ONECALL_URL}?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${API_KEY}&units=metric`
    );
    const data2 = await res2.json();
    // Create a custom error with data1.message as content
    if (!res2.ok)
      throw new Error(
        `HTTP error: ${data2.message}` || `HTTP error ${res2.status}`
      );
    console.log(data2);
    return data2;
  } catch (error) {
    //
    console.error("Error fetching weather by city:", error.message);
    throw error;
  }
}

/** Fetch weather by coordinates */
export async function fetchWeatherByCoords(lat, lon) {
  try {
    const res = await fetch(
      `${ONECALL_URL}?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();
    // Create a custom error with data1.message as content
    if (!res.ok)
      throw new Error(
        `HTTP error: ${data.message}` || `HTTP error ${res.status}`
      );
    return data;
  } catch (error) {
    console.error("Error fetching weather by coordinates:", error.message);
    throw error;
  }
}
