import { Link } from 'react-router-dom';
import "./NavBar.css";


function NavBar(){
    return(
        <>
        {/* <br /><br /><br /><br /><br /> */}
        <nav className="nav">
            <ul>
            <li><Link to="/" className="navLink">Inicio</Link></li>
            <li><Link to="/Home" className="navLink">Home</Link></li>
            
            
            </ul>
        </nav>
        </>
    );
}
export default NavBar;