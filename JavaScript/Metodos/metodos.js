//---METODOS---
let nombre = "Ana García";

console.log(nombre.toUpperCase());  // "ANA GARCÍA"
console.log(nombre.toLowerCase());  // "ana garcía"

// Uso práctico: validar emails
let email = "ANA@GMAIL.COM";
let emailLimpio = email.toLowerCase(); // "ana@gmail.com"

function primeraMayuscula(texto) {

  return texto.charAt(0).toUpperCase() + texto.slice(1);

}

 
function primeraMayuscula(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
console.log(primeraMayuscula("viernes")); // Output: Viernes
 
{/* <button onclick="sumar()">Sumar</button>
    <p id="resultado">Resultado: 0</p> */}
// Función para sumar dos números
function sumar() {
    // Obtener los valores de los inputs
    let numero1 = parseInt(document.getElementById("numero1").value) ;
    let numero2 = parseInt(document.getElementById("numero2").value) ;
   
    // Calcular el resultado
    let resultado = numero1 + numero2;
   
    // Mostrar el resultado
    document.getElementById("resultado").innerHTML = "Resultado: " + resultado;
}
 
 