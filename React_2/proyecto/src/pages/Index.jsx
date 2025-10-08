import { Link } from 'react-router-dom';

import "./Index.css";

function Index() {
  return  (
    <>
        <div>  
            <header className="container2">
            {/*<!--Para el SEO se usa el </header>--> */}
                
                <h1>El portfolio de JuanMa</h1>
                <div className="dropdown">
                    <button>Menu</button>
                    <div className="dropdown-content">
                        <a href="#">Opcion 1</a><br />
                        <a href="#">Opcion 2</a><br />
                        <a href="#">Opcion 3</a>
                    
                    </div>
                    
                </div>
                <div>  
                    <nav>
                    {/* Menú de navegación */}
                    {/* Lista de enlaces de navegación */}
                        <ul>                        
                            <li><a href="#about">Sobre mí</a></li>
                            <li><a href="#proyects">Proyectos</a></li>
                            <li><a href="#skills">Habilidades</a></li>
                            <li><a href="#contact">Contacto</a></li>
                        </ul>
                    </nav>
                        <br />
                    <nav>
                {/* <!--Menú de navegación2--> 
                <!--Lista de enlaces de navegación en línea-->*/}
                        <ul>
                            <li style="display: inline;"><a href="#about">Sobre mí</a></li>
                            <li style="display: inline;"><a href="#proyects">Proyectos</a></li>
                            <li style="display: inline;"><a href="#skills">Habilidades</a></li>
                            <li style="display: inline;"><a href="#contact">Contacto</a></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <section id="about" className="container">
                <img src="assets/img/img1.webp" alt="Aqui aparece una imagen de Goku ssj realizando un Kamehamehaa" style={{ width: "50%", height: "auto" }} className="profile-pic"/>
                <div className="texto" >
                    <h2>Hola que hase</h2>
                    
                </div>
            </section>
            


            <h1>Esta es una prueba de escritura del tipo h1</h1>
            <h2>Esta es una prueba de escritura del tipo h2</h2>
            <h3>Esta es una prueba de escritura del tipo h3</h3>
            <h4>Esta es una prueba de escritura del tipo h4</h4>

           <img
            src="assets/img/Goku.png"
            alt="Aqui aparece una imagen de Goku ssj realizando un Kamehamehaa"
            style={{ width: "25%", height: "auto" }}
            />
           
            <ul>
                <li>Elemento 1</li>
                <li>Elemento 2</li>
                <li>Elemento 3</li>
            </ul>
            <p>
                Este es un parrafo de prueba para ver como se visualiza el texto en el navegador.
            </p>
            <table border="1">
                <thead>
                <tr>
                    <th>Encabezado 1</th>
                    <th>Encabezado 2</th>
                    <th>Encabezado 3</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Dato 1</td>
                    <td>Dato 2</td>
                    <td>Dato 3</td>
                </tr>
                <tr>
                    <td>Dato 4</td>
                    <td> <img src="assets/img/Goku.png" alt="Aqui aparece una imagen de Goku ssj realizando un Kamehamehaa" style={{ width: "25%", height: "auto" }}/></td>
                    <td>Dato 6</td>
                </tr>
                </tbody>
            </table>
            <form>
                <label htmlFor="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre"/><br /><br />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email"/><br /><br />
                <input type="submit" value="Enviar"/>
            </form>
            <form >
                <label htmlFor="nombre">NOMBRE</label>
                <input type="text" id="nombre" name="nombre"/>
            </form>
        </div>
    </>
    );
}
export default Index;