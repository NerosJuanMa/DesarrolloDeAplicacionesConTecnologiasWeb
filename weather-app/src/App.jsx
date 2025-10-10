import { useState, useEffect } from "react";

import Header from "./layout/Header.jsx";
import MainLayout from "./layout/MainLayout.jsx";

import { getLocation } from "./utils/location.js";
import {
  fetchWeatherByCity,
  fetchWeatherByCoords,
} from "./utils/fetchWeather.js";
import { fetchCityName } from "./utils/fetchCityName.js";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const [city, setCity] = useState("");
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [coors, setCoors] = useState(null);
  const [error, setError] = useState(false);

  const backGroundAppList = {
    sunny: "bg-gradient-to-b from-sky-600 to-sky-200",
    cloudy: "bg-gradient-to-b from-cyan-700 to-cyan-200",
    night: "bg-gradient-to-b from-gray-900 to-cyan-200",
  };

  /** Request location once on mount */
  useEffect(() => {
    getLocation()
      .then((coords) => {
        setCoors(coords);
      })
      .catch((err) => console.warn("Location error:", err.message));
  }, []);

  /** Fetch weather when city or coords change */
  useEffect(() => {
    const loadWeather = async () => {
      try {
        if (coors && !city) {
          const data = await fetchWeatherByCoords(
            coors.latitude,
            coors.longitude
          );
          setWeatherData(data);
          const cityName = await fetchCityName(coors.latitude, coors.longitude);
          setCityName(cityName);
        } else if (city) {
          const data = await fetchWeatherByCity(city);
          setCityName(city);
          setWeatherData(data);
        }
        setError(false);
      } catch (err) {
        console.error("Error loading weather:", err.message);
        setError(true);
      }
    };

    loadWeather();
  }, [city, coors]);

  // Change background depending on icon code
  const iconCode = weatherData?.current?.weather?.[0]?.icon ?? "";
  let className = backGroundAppList.cloudy;
  if (["01d", "02d", "03d"].includes(iconCode)) {
    className = backGroundAppList.sunny;
  } else if (iconCode.includes("n")) {
    className = backGroundAppList.night;
  }

  return (
    <div className="relative min-h-screen">
      <AnimatePresence mode="sync">
        <motion.div
          key={className}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className={`absolute inset-0 ${className}`}
        />
      </AnimatePresence>
      <div className="relative z-10">
        <Header
          cityName={cityName}
          setCityName={setCityName}
          setCity={setCity}
          error={error}
        />
        <MainLayout weatherData={weatherData} error={error} />
      </div>
    </div>
  );
}

export default App;
