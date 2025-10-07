//Variables
/*
let miNombre="JuanMa";
console.log("Hola soy el nombre1 " + miNombre);
let miNombre2="Pedro";
console.log("Hola soy el nombre2 " + miNombre2);
miNombre2="Carlos";
console.log("Hola soy el nombre2 " + miNombre2);

let mascota="Perro";
console.log("Mi mascota es un " + mascota);
mascota="Gato";
console.log("Ahora Mi mascota es un " + mascota);

let edad=5;
console.log("Mi edad es " + edad);
edad=6;
console.log("Ahora Mi edad es " + edad);

let mayorDeEdad=true;
console.log("Soy mayor de edad? " + mayorDeEdad);
mayorDeEdad=false;
console.log("Ahora Soy mayor de edad? " + mayorDeEdad);
*/
// Variables con números
let miEdad = 15;
console.log(miEdad); // Muestra: 15

let miAltura = 1.65;
console.log(miAltura); // Muestra: 1.65

// Cambio los valores
miEdad = 16;
miAltura = 1.70;

console.log(miEdad); // Muestra: 16
console.log(miAltura); // Muestra: 1.70

// Junto texto y números
console.log("Tengo " + miEdad + " años"); // Muestra: Tengo 16 años

// Creamos variables y les damos valores
let miMascota = "Perro";
let miColor = "Azul";
let miNumero = 7;

// Mostramos los valores iniciales
console.log(miMascota); // Perro
console.log(miColor);   // Azul
console.log(miNumero);  // 7

// Cambiamos todos los valores
miMascota = "Gato";
miColor = "Rojo";
miNumero = 3;

// Mostramos los nuevos valores
console.log(miMascota); // Gato
console.log(miColor);   // Rojo
console.log(miNumero);  // 3

// Creamos un mensaje con todas las variables
console.log("Mi mascota favorita es un " + miMascota + " de color " + miColor + " y mi número favorito es " + miNumero);

//------------------------------------
let mayorDeEdad = true;
if (mayorDeEdad == true) {
    mayorDeEdad = "Sí, así es";
}
console.log("Soy mayor de edad? " + mayorDeEdad);
mayorDeEdad = false;
console.log("Ahora soy mayor de edad? " + mayorDeEdad);