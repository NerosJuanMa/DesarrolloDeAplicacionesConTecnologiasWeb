import Header from "../components/Header";
import Footer from "../components/Footer";
import Tarjeta from "../components/Tarjeta";

import "./Home.css";
import BotonAlerta from "../components/BotonAlerta";
import FormularioSimple from "../components/FormularioSimple";
import BotonColor from "../components/BotonColor";

function Home() {
  return (
    <div>
      <Header />
      <main className="home-main">
        <h2 className="home-title">
          🎉 ¡Bienvenido a mi portafolio!
        </h2>
        <p className="home-text">
          Este es el contenido principal de la página home.
        </p>
        <p className="home-text">
          El header debería estar visible en la parte superior de la página con un fondo oscuro.
        </p>
        <div className="home-card">
          <h3>Características del header:</h3>
          <ul className="home-list">
            <li>✅ Posición fija en la parte superior</li>
            <li>✅ Fondo semi-transparente con efecto blur</li>
            <li>✅ Enlaces de navegación interactivos</li>
            <li>✅ Botón de contacto con hover</li>
          </ul>
        </div>
        <div>
          <BotonAlerta />
          <FormularioSimple />
          <BotonColor />
        </div>
        <div style={{textAlign: "center"}}>
          <iframe src="https://weather-app-delta-pink-13.vercel.app/" frameborder="0" width="500" height="500"></iframe>
        </div>
        {/* Primera fila - 3 noticias destacadas sobre IA */}
        <div className="tarjetas-container">
        
          {/* Tarjeta 1: GPT-5 y OpenAI */}
          <Tarjeta 
            titulo="OpenAI anuncia GPT-5"
            descripcion="La próxima generación de ChatGPT promete capacidades multimodales avanzadas y razonamiento mejorado para 2024"
            imagen="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=150&h=150&fit=crop"
            textoBoton="Leer más"
            color="#00a67e"
            colorFondo="#f0f9f7"
          />
          
          {/* Tarjeta 2: Quantum Computing */}
          <Tarjeta 
            titulo="Google alcanza supremacía cuántica"
            descripcion="El chip Willow de Google resuelve problemas que tardarían 10 septillones de años a supercomputadoras tradicionales"
            imagen="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=150&h=150&fit=crop"
            color="#4285f4"
            colorFondo="linear-gradient(135deg, #e8f0fe 0%, #d2e3fc 100%)"
          />
          
          {/* Tarjeta 3: Tesla y robots humanoides */}
          <Tarjeta 
            titulo="Tesla Optimus en producción"
            descripcion="Los robots humanoides de Tesla comenzarán trabajos en fábricas a finales de 2024, revolucionando la automatización"
            imagen="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=150&h=150&fit=crop"
            textoBoton="Ver video"
            color="#e31837"
            colorFondo="#fff1f2"
          />
          
        </div>

        {/* Segunda fila - 3 noticias sobre desarrollos tech */}
        <div className="tarjetas-container">
          
          {/* Tarjeta 4: Apple Vision Pro */}
          <Tarjeta 
            titulo="🥽 Apple Vision Pro evoluciona"
            descripcion="La segunda generación del headset de Apple reduce peso 40% y mejora la autonomía a 8 horas de uso continuo"
            color="#007aff"
            colorFondo="#f0f7ff"
          />
          
          {/* Tarjeta 5: GitHub Copilot X */}
          <Tarjeta 
            titulo="GitHub Copilot revoluciona el código"
            descripcion="La nueva versión puede crear aplicaciones completas desde descripciones en lenguaje natural, aumentando productividad 300%"
            textoBoton="Probar gratis"
            color="#238636"
            colorFondo="#f6ffed"
          />
          
          {/* Tarjeta 6: Meta y el Metaverso */}
          <Tarjeta 
            titulo="Meta lanza Horizon Worlds 2.0"
            descripcion="Gráficos fotorrealistas y avatares ultra-detallados marcan el futuro de la realidad virtual social"
            textoBoton="Explorar"
            color="#1877f2"
            colorFondo="linear-gradient(135deg, #e7f3ff 0%, #bedcfa 100%)"
          />
          
        </div>

      </main>
      <Footer />
    </div>
  );
}
export default Home;