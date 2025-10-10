import WeatherIcon from "../shapes/GetShape.jsx";
import { capitalize } from "../utils/text.js";
import iconSad from "../assets/icons/icon_sad.svg";

export default function Current({ weatherData, error }) {
  if (error) {
    return (
      <section className="flex flex-col items-center p-4 text-2xl text-center text-white">
        <img src={iconSad} alt="" className="w-20" />
        <p>We are so sorry.</p>
        <p>We couldn't find that city.</p>
      </section>
    );
  }

  const temp = Math.round(weatherData?.current?.temp) ?? "--";
  const desc = capitalize(
    weatherData?.current?.weather?.[0]?.description ?? "--"
  );
  const iconCode = weatherData?.current?.weather?.[0]?.icon ?? "";
  const tempMax = Math.round(weatherData?.daily?.[0]?.temp?.max) ?? "--";
  const tempMin = Math.round(weatherData?.daily?.[0]?.temp?.min) ?? "--";
  const humidity = weatherData?.current?.humidity ?? "--";
  const wind = Math.round(weatherData?.current?.wind_speed) ?? "--";
  const feels = Math.round(weatherData?.current?.feels_like) ?? "--";

  // console.log(iconCode);

  return (
    <section
      className="flex flex-col items-center gap-8 p-3 "
      id="current-section"
    >
      {/* First line */}
      <article className="flex w-full max-w-md">
        <div className="general flex-1 text-center">
          <h1 className="text-9xl">
            {temp}
            <span className="align-super text-6xl">º</span>
          </h1>
          <h3 className="text-lg">{desc}</h3>
        </div>
        <div className="icon-container flex-1 flex justify-center items-center">
          <WeatherIcon iconCode={iconCode}></WeatherIcon>
        </div>
      </article>
      {/* Second line */}
      <article id="max-min" className="flex justify-between w-full max-w-sm">
        <div
          className="px-5 py-2 rounded-3xl
            text-white
            shadow-[inset_1px_1px_6px_rgba(0,0,0,0.5),0_2px_4px_rgba(255,255,255,0.5)]"
          id="min"
        >
          <span className="text-sm">Min: {tempMin}ºC</span>
        </div>
        <div
          className="px-5 py-2 rounded-3xl
            text-white
            shadow-[inset_1px_1px_6px_rgba(0,0,0,0.5),0_2px_4px_rgba(255,255,255,0.5)]"
          id="max"
        >
          <span className="text-sm">High: {tempMax}ºC</span>
        </div>

      </article>
      {/* Third line */}
      <article
        id="extra"
        className="flex justify-between w-full max-w-sm text-center px-5 py-2 rounded-3xl
            text-white
            shadow-[inset_1px_1px_6px_rgba(0,0,0,0.5),0_2px_4px_rgba(255,255,255,0.5)]
            divide-x divide-white/50"
      >
        <div className="flex-1 extra-item " id="humidity">
          <span>Humidity</span>
          <h3>{humidity}%</h3>
        </div>
        <div className="flex-1 extra-item" id="wind">
          <span>Wind</span>
          <h3>{wind} km/h</h3>
        </div>
        <div className="flex-1 extra-item" id="rain">
          <span>Feels Like</span>
          <h3>{feels}º</h3>
        </div>
      </article>
    </section>
  );
}
