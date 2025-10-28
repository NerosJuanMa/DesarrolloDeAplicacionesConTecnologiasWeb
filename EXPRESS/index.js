
const boton1 = document.getElementById("boton1"); 
const boton2 = document.getElementById("boton2"); 
const boton3 = document.getElementById("boton3"); 
const boton4 = document.getElementById("boton4"); 
const resultado = document.getElementById("resultado");

boton1.addEventListener("click", () => {
    fetch("http://localhost:3000/")
    .then((res) => res.text()) // texto JSON → objeto JS 
    .then((data) => { resultado.textContent = data;}) 
    }); 
boton2.addEventListener("click", () => {
    fetch("http://localhost:3000/contacto")
    .then((res) => res.json()) // texto JSON → objeto JS 
    .then((data) => { resultado.textContent = data.nombre + " — " + data.curso;}) 
    }); 
boton3.addEventListener("click", () => {
    fetch("http://localhost:3000/info")
    .then((res) => res.json()) // texto JSON → objeto JS 
    .then((data) => { resultado.textContent = data.mensaje + " — " + data.curso;}) 
    }); 
boton4.addEventListener("click", () => {
    fetch("http://localhost:3000/tienda")
    .then((res) => res.json()) // texto JSON → objeto JS 
    .then((data) => { resultado.textContent = data.mensaje + " — " + data.curso;}) 
    }); 