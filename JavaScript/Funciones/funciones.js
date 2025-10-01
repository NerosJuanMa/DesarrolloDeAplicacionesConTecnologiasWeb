/*
function nombreFuncion(parametros) {
    // Hacer cálculos o procesamiento
    return resultado;
}

// Para usarla y guardar el resultado:
const miResultado = nombreFuncion(datos);
//--RESTA---
function resta (a,b){
    return a-b;
}
let restas = resta(4,2);
console.log(restas);

//Funcion calculadora//
function calculadora(a,b,operacion="sumar"){
    let resultado=0;
    if (operacion==="sumar") {
        resultado=a+b;
    }
    else if(operacion==="restar"){
        resultado=a-b;
    }
    else if(operacion==="multiplicar"){
        resultado=a*b;
    }
    else if(operacion==="dividir"){
        resultado=a/b;
    }
    console.log("El resultado de tu funcion es " + resultado);
}
calculadora(8,2,"sumar");
calculadora(8,2,"restar");
calculadora(8,2,"multiplicar");
calculadora(8,2,"dividir");
/* ejercicio3
// Escribe tu función aquí
function sumar(num1, num2) {
    // Tu código...
}

// Probar la función
const resultado = sumar(10, 5);
console.log('El resultado es:', resultado);
*//*
function suma1(num1,num2) {
    return num1+num2;
}
const resultado=suma1(3,9);
console.log("El resultado de suma1 es " + resultado);
//Funciones flechas
const saludar = (nombre) =>{
    return"Hola " + nombre;
}
console.log(saludar("ana"));
//------------------
const sumar2 = (a,b) =>{
    return a + b;
}
console.log(sumar2(10,30));
//----------------------
const x =(a,b) => a-b;
console.log(x(30,10));
//--------------------
*/
//Pares del 2 al 30 (sin filtrar)

//for (let i = 1; i < 4; i++) {
//    console.log(i);
//}
//FUNCION PARES
/*function pares(num1,num2) {
    for (let i = num1; i <= num2; i+=2) {
        console.log(i);        
    }       
}
(pares(2,30));
*/
//TABLA MULTIPLICAR

function tablaMultiplicar(numX){
    
    for (let i = numX; i <= (numX*10); i+=numX) {
        console.log(`${numX} * ${i/numX} = ${i}.`);      
    }       
}
tablaMultiplicar(5);
// tablaX
/*function tablaX(x){
    for (let i = 1; i <=10 ; i++) { 
        console.log(i*x)       
    }
}
tablaX(5);*/

