//BUCLES
/*
let contador =1;

while (contador<=5){
    console.log("Hola")
    contador++;
}

while (contador<=5){
    console.log(`Numero ${contador}`);
    contador++;
}

let colores = ["rojo", "azul", "verde", "amarillo"];
let posicion = 0;

while(posicion < colores.length){
    console.log(`Color ${posicion + 1}: ${colores[posicion]}`);
    posicion++;
}

let numero = 1;
let suma = 0;

while (suma < 20){
    suma = suma + numero;
    console.log(`Sumamos ${numero}, total: ${suma}`);
    numero++;
}

let contador1 =10;
while (contador1 > 0){
    console.log(contador1);
    contador1--;
}
let numero = 1;
let resta = 10; 

while (resta > 0){
    
    console.log(`restamos ${numero}, total: ${resta}`);
    resta = resta - numero;
}

//for (inicio; condición; incremento) { ... } // La variable 'i' solo existe dentro del FOR
for (let i = 1; i < 4; i++) {
    console.log(i);
}
let animales=["perro", "gato", "pajaro"];
for (let i = 0; i < animales.length; i++) {
    console.log(`Animal ${i+1}: ${animales[i]}`);
}
*/
let num= [10, 20, 30, 40, 50];
let sum = 0;

for (let i = 0; i < num.length; i++) {
    sum += num[i];
    console.log(`Suma parcial: ${sum}`)
}
console.log(`La suma total es ${sum}`);


