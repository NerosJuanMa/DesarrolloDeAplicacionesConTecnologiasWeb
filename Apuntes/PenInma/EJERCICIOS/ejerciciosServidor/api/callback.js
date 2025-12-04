/****************************************
FUNCIONES SINCRONAS
*****************************************


//creo una función suma que devuelve un valor
function suma(num1, num2) {
  console.log(`🧮 Comienzo la función suma de ${num1} + ${num2}`);
  const resultado = num1 + num2;
  console.log(`✅ Suma completada: ${resultado}`);
  return resultado; 
} 
//el valor que devuelve suma lo guardo en una variable una vez que la llamamos con sus parametros
const resultadoSuma = suma(12,10);

//me declaro otra funcion que va a tener dos parametros  un n3 y otro parametro un numero o una variable. 
function resta(n3, sumando) {
  const resta = n3 - sumando;
  console.log(`Soy la función 2. Tu resultado es: ${resta}`);
  return resta;
}
// Llamamos a la funcion resta y le pasamos dos parametros un número y el resultado que nos hemos guardado de la operación suma
resta(40, resultadoSuma);

console.log(`${6 + 7} soy una tarea rápida`);

// ✅ usamos esa variable para la función resta
resta(40, resultadoSuma);
/*  

*****************************************************
FUNCIONES ASINCRONAS
*****************************************************/
//creo una función suma que devuelve un valor
function suma(num1, num2,callback) {
  console.log(` Comienzo la función suma de ${num1} + ${num2}`);
setTimeout(() => {
        const resultado = num1 + num2;
        console.log(`✅ Suma completada: ${resultado}`);       
        
        callback(resultado); 
    }, 3000);
} 


//me declaro otra funcion que va a tener dos parametros  un n3 y otro parametro un numero o una variable. 
function resta(n3, n4) {
  const resta = n3 - n4;
  console.log(`Soy la función 2. Tu resultado de la resta es: ${resta}`);
  return resta;
}
// Llamamos a la funcion resta y le pasamos dos parametros un número y el resultado que nos hemos guardado de la operación suma
suma(20, 4, (callback) => {
    console.log("--- INICIANDO LLAMADA ASÍNCRONA DE RESTA ---");
    resta(6, callback); 
});

resta(30,10);
console.log(`${6 + 7} soy una tarea rápida`);


