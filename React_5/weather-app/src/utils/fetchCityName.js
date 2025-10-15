// src/utils/fetchWeather.js
const API_KEY = import.meta.env.VITE_API_KEY;

export async function fetchCityName(lat, lon) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(
        `HTTP error: ${data.message}` || `HTTP error: ${res.status}`
      );
    }
    return data[0].name;
  } catch (error) {
    console.log(`Search city name error: ${error.message}`);
    throw error;
  }
}
