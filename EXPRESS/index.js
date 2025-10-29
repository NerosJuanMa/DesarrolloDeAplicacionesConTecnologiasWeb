
const boton1 = document.getElementById("boton1"); 
const boton2 = document.getElementById("boton2"); 
const boton3 = document.getElementById("boton3"); 
const boton4 = document.getElementById("boton4"); 
const resultados = document.getElementById("resultados");

boton1.addEventListener("click", () => {
    fetch("http://localhost:3000/")
    .then((res) => res.text()) // texto JSON → objeto JS 
    .then((data) => { resultados.textContent = data;}) 
    }); 
boton2.addEventListener("click", () => {
    fetch("http://localhost:3000/contacto")
    .then((res) => res.text()) // texto JSON → objeto JS 
    .then((data) => { resultados.innerHTML = data;}) 
    }); 
boton3.addEventListener("click", () => {
    fetch("http://localhost:3000/info")
    .then((res) => res.json()) // texto JSON → objeto JS 
    .then((data) => { resultados.textContent = data.nombre + ' - ' + data.curso + ' - ' + data.año;}) 
    }); 
boton4.addEventListener("click", () => {
    fetch("http://localhost:3000/tienda")
    .then((res) => res.text()) // texto JSON → objeto JS 
    .then((data) => { resultados.textContent = data;}) 
    }); 