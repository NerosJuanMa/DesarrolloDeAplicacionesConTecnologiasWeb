import { useEffect, useRef, useState } from "react";

export default function TestHeader({ setCityName, setCity }) {
  const [query, setQuery] = useState("");
  const bounceTimer = useRef(null);

  useEffect(() => {
    // If query exists save the query as city name
    if (query) {
      if (bounceTimer.current) clearTimeout(bounceTimer.current);
      bounceTimer.current = setTimeout(() => {
        setCity(query);
      }, 1000);
      // If query doesn't exists set city name as empty string
      // to trigger the HTTP call with geolocation
    } else {
      if (bounceTimer.current) clearTimeout(bounceTimer.current);
      bounceTimer.current = setTimeout(() => {
        setCity("");
      }, 1000);
    }
  }, [query, setCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <input
        name="city"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="City"
        className="w-full max-w-lg px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </form>
  );
}
