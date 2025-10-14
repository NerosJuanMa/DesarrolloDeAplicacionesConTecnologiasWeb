import Header from "../components/Header";

import "./Home.css";

function Home_copy() {
  return (
    <div>
      <Header />
      <main className="home-main">
        <h2 className="home-title">
          🎉 ¡Bienvenido a mi COPIA DEL HOME!
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
      </main>
    </div>
  );
}
export default Home_copy;