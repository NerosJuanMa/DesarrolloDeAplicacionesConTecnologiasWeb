/*let tengoidinero = true;
let tengoPermiso = false;
let noestanPadres = true;

let puedosalir = tengoidinero && tengoPermiso || noestanPadres

console.log("puedo salir? : ", puedosalir);

// Strings
let nombre= "Marta";
let edad= 18;
let hobby= "programar";

let mensaje= `Hola soy ${nombre}, teno ${edad} años y me encanta ${hobby}.`;

console.log(mensaje);

/* Logra que salga la siguiente frase: 
// "Has pedido [plato] con [bebida]. El precio total es [precio]€."*/
/*
let plato= "pizza";
let bebida= "refresco";
let precio= 12.5;

let ticket= `Has pedido ${plato} con ${bebida}. 
El precio total es ${precio}€.`
console.log(ticket);

console.log(hobby.length);

let email= "jmmudarra@gmail.com";

console.log(email.includes("@"));
console.log(email.toUpperCase());
console.log(email.indexOf(".com"));
console.log(email[9]);

console.log(email.replace("gmail","ya"));
console.log(email);

//CONDICIONALES
let edad1= 12;
if (edad1>=18){
    console.log("Eres mayor de edad");
}
else{
    console.log("Eres menor de edad");
    };

if (edad1==22){
    console.log("Tienes 22 años");
}
else{
    console.log("No tienes 22 años");
    };

if(edad1==22){
    console.log("Tienes 22 años");
}
else if(edad1<22){
    console.log("Tienes  menos de 22 años");
}
else{
    console.log("Tienes mas de 22 años");
}

/*
Crea un programa que clasifique la temperatura:
Declara una variable grados = 15
SI es mayor a 30: "Muy caluroso (15°C)"
SI NO, SI es mayor a 20: "Temperatura agradable (15°C)"
SI NO, SI es mayor a 10: "Fresco (15°C)"
SI NO: "Muy frío (15°C)"
Usa concatenación en todos los mensajes
🧪 Prueba con: grados = 35, grados = 25, grados = 8

let grados = 35;

if(grados>30){
    console.log(`Muy caluroso (15°C). Hace ${grados} grados`);
}
else if(grados> 20){
    console.log(`Temperatura agradable (15°C). Hace ${grados} grados`);
}
else if(grados>10){
    console.log( `Fresco (15°C). Hace ${grados} grados`);
}
else {
    console.log(`Muy frío (15°C). Hace ${grados} grados`);
};
//operador ternario
let edad = 50;
console.log(edad>=18 ? "Eres mayor de edad" : "NO eres mayor de edad");

/*queremos entrar en la biblioteca puedes entrar si eres mayor de edad y tienes carnet puedes entrar si eres menor y vas acompañado tambien puedes entrar 
declara tantas variables como necesites 
let mayor de edad=false;
let acompañado=true;
prueba con estos valores y varia si quieres para probar distintas opciones
 
el resto de las variables le poneis los valores que querais 
 
let mayorDeEdad=true;
let acompañado=false;
let edad =22;
if (edad<18){
    console.log(`No puedes entrar en la biblioteca.`);
}
else if(acompañado ){
    console.log(`Puedes entrar en la biblioteca, porque vas acompañado`);
}
else{
    console.log(`Puedes entrar porque eres mayor de edad.`);
};
//-------------------------
if(edad<18 && acompañado  || (edad>=18)){
    console.log(`Puedes entrar en la biblioteca`);
}
else{
    console.log(`No puedes entrar`);
};

diaSemana = 4;
switch(diaSemana){
    case "lunes":
        console.log("Lunes - Reunión de equipo");
        break;
    case "martes":
        console.log("Martes - Clases de JavaScript");
        break;
    case "miercoles":
        console.log("Miércoles - Proyecto personal");
        break;
    case "jueves":
        console.log("Jueves - Revisión de código");
        break;
    case "viernes":
        console.log("Viernes - Presentación");
        break;
    default:
        console.log("Fin de semana - ¡Descanso!");
};


// ejercicio6 sistema de niveles
let jugador= "Mario";
let puntos = 1250;
let moneda = "oro";
let cmoneda;
let nivel;


if (puntos >= 2000)
    {console.log("Maestro");
    nivel = "Maestro";
}
else if (puntos >1000 || puntos < 2000 )
    {console.log("Experto");
    nivel = "Expperto";
}
else if (puntos > 500 || puntos < 999)
    {console.log("Intermedio");
    nivel = "Intermedio";
}
else 
    {
    console.log("Novato");
    nivel = "Novato";
};

switch (moneda){
    case "oro":
        console.log("+ 100 puntos") ;
         puntos += 100;
         cmoneda= 100;
    break;
    case "plata":
        console.log("+ 50 puntos");
        (puntos += 50);
        cmoneda=50;
    break;
    case "bronce":
        console.log("+ 25 puntos");
        (puntos += 25);
        cmoneda = 25;
    break;
    default:
        console.log("+ 0 puntos");
        (puntos += 0);
        cmoneda=0;
}
console.log(puntos);
console.log(`${jugador} - Nivel: ${nivel} - Puntos: ${puntos} - Bono: ${moneda}: + ${cmoneda}`) 
*/
//CALCULADORA DE NOTAS
let estudiante = "Ana";
let examen = 7.5;
let trabajos = 8.2;
let asistencia = 85;
let notaFinal = (examen * 0.6) + (trabajos * 0.4);
console.log(notaFinal);
let calificacion;
if (notaFinal >= 9) {
    console.log("Excelente")
    calificacion = "Excelente";
}
else if (notaFinal >= 7 && notaFinal < 9) {
    console.log("Notable")
    calificacion = "Notable";
} else if (notaFinal >= 5 && notaFinal < 7) {
    console.log("Aprobado")
    calificacion = "Aprobado";
} else {
    console.log("Suspenso")
    calificacion = "Suspenso";
};
let notaRedondeada = Math.ceil(notaFinal);
let notaEntera = Math.floor(notaFinal);
console.log(`La nota final redondeada es: ${notaRedondeada} y la nota entera es ${notaEntera}`);

let aprueba = ((notaFinal >= 5) && (asistencia >= 80));
console.log("Para aprobar el curso la nota tiene que ser mayor o igual a 5 y  asistencia un minimom de 80%: " + aprueba);
(aprueba ? true : false)

console.log(notaFinal >= 5 ? "APRUEBA" : "SUSPENSO")
// Paso 5: Recomendación con SWITCH

let recomendacion = "";
switch (calificacion) {
    case "Excelente":
        recomendacion = "¡Felicitaciones! Considera cursos avanzados";
        break;
    case "Notable":
        recomendacion = "Muy buen trabajo, sigue así";
        break;
    case "Aprobado":
        recomendacion = "Bien hecho, practica más para mejorar";
        break;
    case "Suspenso":
        recomendacion = "Necesitas estudiar más y mejorar asistencia";
        break;
}
console.log(recomendacion);

// Mostrar informe completo con concatenación
let informe = "=== INFORME ACADÉMICO ===\n";
informe = informe + "Estudiante: " + estudiante + "\n";
informe = informe + "Nota Examen: " + examen + "/10\n";
informe = informe + "Nota Trabajos: " + trabajos + "/10\n";
informe = informe + "Asistencia: " + asistencia + "%\n";
informe = informe + "NOTA FINAL: " + notaFinal.toFixed(2) + "/10 (" + calificacion + ")\n";
//informe =  informe + "ESTADO: " + estadoCurso + "\n";
informe = informe + "Recomendación: " + recomendacion;

console.log(informe);


//---------------
