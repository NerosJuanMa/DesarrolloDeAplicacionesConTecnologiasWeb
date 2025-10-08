import { Routes, Route } from "react-router-dom";

import Index from "./pages/Index";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Index/>} />
      <Route path="/proyectos" element={<div style={{paddingTop: '100px', padding: '100px 2rem'}}>Página de Proyectos (En construcción)</div>} />
      <Route path="/sobre-mi" element={<div style={{paddingTop: '100px', padding: '100px 2rem'}}>Página Sobre Mí (En construcción)</div>} />
    </Routes>
  );
}

export default App;
