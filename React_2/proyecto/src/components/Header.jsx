import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <h1 className="title">Mi Proyecto</h1>
      <button className='button'>Buscar</button>
      <nav className="nav">
        <Link to="./pages/Index" className="navLink">Inicio</Link>
        <Link to="/Home_copy" className="navLink">Home_Copy</Link>
        <Link to="/proyectos" className="navLink">Proyectos</Link>
        <Link to="/sobre-mi" className="navLink">Sobre mí</Link>
        
        <button className="button">Contacto</button>
      </nav>
      
    </header>
  );
}

export default Header;