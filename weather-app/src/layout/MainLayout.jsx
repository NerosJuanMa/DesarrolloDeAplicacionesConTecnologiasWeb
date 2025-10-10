import Current from "../components/Current";
import Forecast from "../components/Forecast";

function Main({ weatherData, error }) {
  return (
    <>
      <main className="text-white">
        <Current weatherData={weatherData} error={error} />
        <Forecast weatherData={weatherData} error={error} />
      </main>
    </>
  );
}

export default Main;
