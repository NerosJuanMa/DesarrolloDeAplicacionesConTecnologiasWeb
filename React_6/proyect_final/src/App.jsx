import { Routes, Route } from "react-router-dom";

import Home from './pages/Home'
import './App.css'
import Cabecera from "./components/Cabecera";
import Header from "./components/Header";
import Footer from "./components/Footer";
// import NavBar from "./components/NavBar";

export default function App() {
  return (   
    <>
    <Header />
    
    {/* <Cabecera /> */}
    
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
    <Footer />
    </>
  );
}


