import { Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Home from "./pages/Home";
import Home_copy from "./pages/Home_copy";
import Header from "./components/Header";

function App() {

  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Home_copy" element={<Home_copy />} />
      <Route path="/pages/Index" element={<Index />} />

      <Route path="/proyectos" element={<div style={{paddingTop: '100px', padding: '100px 2rem'}}>Página de Proyectos (En construcción)</div>} />
      <Route path="/sobre-mi" element={<div style={{paddingTop: '100px', padding: '100px 2rem'}}>Página Sobre Mí (En construcción)</div>} />
    </Routes>
    <footer />
    </>
  );
}

export default App;
