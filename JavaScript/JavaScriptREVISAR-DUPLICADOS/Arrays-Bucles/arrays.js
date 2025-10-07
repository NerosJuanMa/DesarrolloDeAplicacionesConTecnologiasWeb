/*let miLista = [];
let miLista2 = ["ana", "lopez",37, "Sevilla" ];
console.log(miLista2[3]);

console.log(miLista2.length); //para conocer la longitud del array

console.log(miLista2 [miLista2.length -3]); //desde el final enseña el valor de la posision indicada.

miLista2.push("Luis", "Juan", 45); //Agrega al final del array
console.log(miLista2);

miLista2.unshift("Pepe", 23, "ana"); //Agrega al principio del array
console.log(miLista2);

miLista2.pop(); //Elimina el último elemento

console.log(miLista2);

miLista2.shift(); //Elimina el primer elemento
console.log(miLista2);

let elemento1 = miLista2.shift(); // Guarda el primer elemento Eliminado
console.log(elemento1);

let elemento = miLista2.pop(); // Guarda el último elemento Eliminado
console.log(elemento);

console.log(Array.isArray(miLista)); //// Verificar qué es array y qué no
console.log(miLista2);
console.log(miLista2.indexOf("Sevilla"));// Buscar la posición de un elemento
console.log(miLista2.indexOf("cadiz")); // Si no existe develve -1
console.log(miLista2.indexOf("ana")); // Buscar la posición del primer elemento repetido

console.log(miLista2.includes("Luis"));// Verificar si un elemento existe


miLista2= []; //Formas de vaciar un array, reasignando el array vacio, y array.length = 0
console.log(miLista2);

//Sintaxis: array.splice(dóndeEmpezar, cuántosEliminar, quéAgregar)
miLista2 = ["ana", "lopez",37, "Sevilla" ];
miLista2.splice(0,1);
miLista2.splice(0,1,"pepe");
console.log(miLista2);
miLista2.splice(1,1,"luis",25,33); // reemplaza 1 por varios elementos
console.log(miLista2);

let eliminado1= miLista2.splice(0,2); // Elimina y guarda en otra variable/array segun corte:
console.log(miLista2); //ver el array que queda
console.log(eliminado1);// ver lo cortado en un array

miLista2.splice(1,0,"Cadiz");//Si ponemos el 0 en la segunda posicion no elimina nada, lo agrega desde la posicion indicada
console.log(miLista2);

miLista2.splice(6,0,"Cadiz"); 
console.log(miLista2);
console.log(miLista2[4]);
*/
/*
array.forEach((element, index, array) => {
    // element: el valor actual
    // index: el índice del elemento
    // array: el array completo
});
*/
const frutas = ["manzana", "banana", "naranja"];
let miLista2 = ["ana", "lopez",37, "Sevilla" ];
miLista2.forEach(fruta => {
    console.log(fruta);
});

const numeros = [10, 20, 30];

numeros.forEach((elemento, indice, arregloCompleto) => {
    console.log(`Elemento: ${elemento}, Índice: ${indice}, Array completo: [${arregloCompleto}]`);
});
/*
const nuevoArray = array.map((elemento, indice, arrayCompleto) => {
    // return lo que quieres que esté en el nuevo array
});
¿Qué hace .map()?
Recorre cada elemento del array original.
Aplica una función a cada elemento.
Devuelve un nuevo array con el resultado de aplicar esa función.
No modifica el array original.
*/
const usuarios = [
    { nombre: "Ana", edad: 25 },
    { nombre: "Luis", edad: 30 }
];

const nombres = usuarios.map(usuario => usuario.nombre);

console.log(nombres); // ["Ana", "Luis"]

