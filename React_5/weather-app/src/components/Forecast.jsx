
export default function Forecast({ weatherData, error }) {
  if (!weatherData || !weatherData.daily || error) return null;
  const backgroundForecastList = {
    sunny: "bg-sky-700/15",
    cloudy: "bg-cyan-700/15",
    night: "bg-gray-800/15",
  };
  // Change background depending on icon code
  const iconCode = weatherData?.current?.weather?.[0]?.icon ?? "";
  let background = backgroundForecastList.cloudy; // valor por defecto
  if (["01d", "02d", "03d"].includes(iconCode)) {
    background = backgroundForecastList.sunny;
  } else if (iconCode.includes("n")) {
    background = backgroundForecastList.night;
  }

  const days = weatherData.daily.slice(1, 6).map((day, i) => {
    const date = new Date(day.dt * 1000);
    const dayName = date.toLocaleDateString("en-EN", { weekday: "short" });
    const min = Math.round(day.temp.min);
    const max = Math.round(day.temp.max);
    const iconCode = day.weather[0].icon;
    console.log(iconCode);

    return (
      <div
        key={day.dt}
        className="w-full h-full grid grid-cols-4 items-center justify-items-center py-2 border-b border-white/30"
      >
        <span>{dayName}</span>
        <img
          src={`https://openweathermap.org/img/wn/${iconCode}.png`}
          alt={day.weather[0].description}
          className="w-10 h-10"
        />
        <span>{min}º</span>
        <span>{max}º</span>
      </div>
    );
  });

  return (
    <section className="flex flex-col items-center w-full mt-3 p-3 text-white-100">
      <article
        className={`rounded-2xl grid grid-rows-[repeat(5,60px)] items-center justify-items-center divide-y divide-white/90 w-full max-w-sm
        ${background}
        shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),1px_1px_6px_rgba(0,0,0,0.5)]`}
      >
        {days}
      </article>
    </section>
  );
}
