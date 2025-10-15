import { capitalize } from "../utils/text";

export default function CityAndDate({ cityName, error }) {
  if (error) {
    return <></>;
  }
  const now = new Date();
  const today = now.toLocaleDateString("en-EN", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="h-10 w-full max-w-md">
      <h2 className="text-2xl">{capitalize(cityName)}</h2>
      <h4 className="text-sm">{today}</h4>
    </div>
  );
}
