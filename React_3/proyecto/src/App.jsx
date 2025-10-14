import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Proyectos from "./pages/Proyectos";
import SobreMi from "./pages/SobreMi";
import Estados from "./pages/Estados";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/proyectos" element={<Proyectos />} />
      <Route path="/sobre-mi" element={<SobreMi />} />
      <Route path="/estados" element={<Estados />} />
    </Routes>
  );
}

export default App;