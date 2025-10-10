import Sun from "../shapes/Sun";
import Cloud from "../shapes/Cloud";
import Rain from "../shapes/Rain";
import Snow from "../shapes/Snow";
import Moon from "../shapes/Moon";
import Thunder from "../shapes/Thunder";
import GetShape from "../shapes/GetShape";

export default function TestLayout() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <Sun></Sun>
      <Moon></Moon>
      <Cloud></Cloud>
      <Rain></Rain>
      <Snow></Snow>
      <Thunder></Thunder>
      <GetShape></GetShape>
    </div>
  );
}
