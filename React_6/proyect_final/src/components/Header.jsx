import NavBar from './NavBar';
import './Header.css';
function Header(){
    return(
    <header className="header">
        <NavBar />
        <h1>Hola Mundo React</h1>   
    </header>
    );
}
export default Header;