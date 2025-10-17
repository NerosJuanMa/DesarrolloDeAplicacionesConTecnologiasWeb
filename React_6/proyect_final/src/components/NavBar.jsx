import { Link } from 'react-router-dom';
import "./NavBar.css";


function NavBar(){
    return(
        <>
        {/* <br /><br /><br /><br /><br /> */}
        <nav className="nav">
            
            <Link to="/" className="navLink">Inicio</Link>
            <Link to="/Ejercicios" className="navLink">Ejercicios</Link>
            <Link to="/Contacto" className="navLink">Contacto</Link>
            {/* <ul>
            <li><Link to="/" className="navLink">Inicio</Link></li>
            <li><Link to="/Home" className="navLink">Home</Link></li>
            
            
            </ul> */}
        </nav>
        </>
    );
}
export default NavBar;