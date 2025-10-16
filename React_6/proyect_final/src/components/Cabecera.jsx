import './Cabecera.css';
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import { useState } from "react";


export default function Cabecera(){
  const [count, setCount] = useState(0)
    return(
        <>
        
          <main className='main'>
              <div>
                <a href="https://react.dev" target="_blank">
                  <img src={reactLogo} className="logoReact" alt="React logo" />
                </a>
                <a href="https://vite.dev" target="_blank">
                  <img src={viteLogo} className="logoC" alt="Vite logo" />
                </a>
              </div>
              <h1> React + Vite </h1>             
            </main>
            
        </>
    );
}