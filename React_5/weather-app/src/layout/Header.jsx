import SearchBar from "../components/CitySearch";
import CityAndDate from "../components/CityAndDate";

function Header({ cityName, setCityName, setCity, error }) {
  return (
    <>
      <header className="flex flex-col items-center justify-center p-3 text-white gap-3">
        <SearchBar setCityName={setCityName} setCity={setCity}></SearchBar>
        <CityAndDate cityName={cityName} error={error}></CityAndDate>
      </header>
    </>
  );
}

export default Header;
