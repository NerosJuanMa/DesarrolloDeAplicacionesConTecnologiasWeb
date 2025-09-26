/*
//-------SUMA-----
let n1=5;
let n2=3;
let suma = n1 +n2;
console.log("El resultado de la suma es =" + suma);

n1=4;
n2=8;
suma = n1 +n2;
console.log("El resultado de la suma es =" + suma);

//-----RESTA-----
n1=4;
n2=8;
let resta = n1 - n2;
console.log("El resultado de la resta es =" + resta);

n1=2.5;
n2=8;
resta = n1 - n2;
console.log("El resultado de la resta es =" + resta);

let multi = n1 * n2;
console.log("El resultado de la multiplicacion es " + multi);

//imaginate que estas en una tienda y quieres comprar 3 camisetas  tienen un descuento del 10%. El cliente quiere saber cuanto va a pagar con descuento y sin descuento.
 let camiseta= 10;
 let cantidad= 3;
 let porcentaje = 0.1;
 let descuento= (camiseta * cantidad) * porcentaje;
 let totalPagar= (camiseta * cantidad) - descuento
 console.log("El cliente tiene que pagar " + totalPagar);

 let camiseta1=10;
 let camiseta2=10;
 let camiseta3=10;

 descuento= (camiseta1+camiseta2+camiseta3) * porcentaje;
 totalPagar= (camiseta1+camiseta2+camiseta3) - descuento
 console.log("El cliente tiene que pagar " + totalPagar);

 // ASIGNACION

 let n3=10;
 let n4=5;
 let suma2 = n3+=n4
 console.log("El resultado de la suma es =" + suma2);

 /*magina que estás programando un videojuego y necesitas llevar el marcador de puntos de un jugador.

El sistema debe:
Iniciar los puntos en 0.
Sumar 10 puntos cuando el jugador elimina un enemigo pequeño.
Sumar 50 puntos cuando el jugador derrota a un jefe.
Restar 15 puntos si el jugador pierde una vida.
Aplicar un bonus doble a la puntuación actual (multiplicar ×2).
Finalmente, dividir los puntos entre 3 jugadores del equipo para repartirlos equitativamente.
El programa debe mostrar en consola los puntos después de cada acción.

let puntos=0; //Puntos iniciales
let regards=0; //Sin premio ni perjuicio
let total= puntos + regards
console.log("El Total de puntos actual es " + total);
regards=10; //gana 10 Puntos
puntos=total+=regards; //ASIGNACION SUMAR
console.log("El jugador elimina un enemigo pequeño -> El Total de puntos actual es " + total);
regards=50; //gana 50 Puntos
puntos=total; //ASIGNACION IGUAL
total= puntos+=regards; //ASIGNACION SUMAR
console.log("El jugador derrota a un jefe -> El Total de puntos actual es " + total); 
regards=-15; //pierde 15 Puntos
puntos=total; //ASIGNACION IGUAL
total= puntos+=regards;
console.log("El jugador pierde una vida -> El Total de puntos actual es " + total);
regards= 2; //Bonus Doble * Puntos
puntos=total; //ASIGNACION IGUAL
total= puntos*=regards; //ASIGNACION MULTIPLICAR
console.log("El jugador obtiene bonus doble -> El Total de puntos actual es " + total);
regards= 3; //dividir los puntos entre 3 jugadores
puntos=total; //ASIGNACION IGUAL
total= puntos/=regards; //ASIGNACION DIVIDIR
console.log("El jugador obtiene una tercera parte del total de puntos -> El Total de puntos del jugador es " + total); 


/*vamos a crear una frase que primero ponga
Hola
Luego ponga Hola Pepe
después Hola Pepe estas
despues Hola Pepe estas en clase*/
/*
let a= "Hola";
let b= "Pepe";
let c= "estas";
let d= "en clase";
let mensaje1= a + " "+ b +" "+ c +" "+ d;
console.log(mensaje1);
// segunda forma
let h =" "
//a="hola ";
//b="Pepe ";
//c="estas ";
let mensaje2 = a +h;
//mensaje2 += h;
mensaje2 += b +h;
//mensaje2 +=h;
mensaje2 += c
mensaje2 +=h;
mensaje2 += d
console.log(mensaje2);

*/
//--------operaciones de comparacion-----------

/*
s1="cinco"
s2="5";
console.log(s1===s2); //false
s1=5
s2="5";
console.log(s1===s2);//false
s1=5
s2=5.0;
console.log(s1===s2);//true
s1=false
s2=0;
console.log(s1===s2);//false*/

/*Vamos a enviar un paquete
El peso máximo permitido para envío estándar es 20 kg.
Para usar envío exprés no puede superar los 10 kg.
Los paquetes que pesen menos de 2 kg tienen descuento especial.
Además, se quiere comprobar si el paquete es considerado pesado (más de 30 kg).
nuestro paquete 1 pesa 5 kilos
podemos enviarlo? podemos enviarlo por paquete expres? tiene descuento? es considerado pesado? */

let pmaxS=20; //peso max permitido en kg
let pmaxEx=10; //peso max permitido envio Express en kg
let pmin=2; //peso minimo con descuento
let pesado=30; //paquete considerado pesado mas de 30kg
let paquete1= 5; // peso del paquete1
let ejemplo1= (paquete1 <=pmaxS)
console.log("Podemos enviarlo? " + ejemplo1);
let ejemplo2= (paquete1 <=pmaxEx)
console.log("podemos enviarlo por paquete expres? " + ejemplo2);
let ejemplo3= (paquete1 <=pmin)
console.log("tiene descuento? " + ejemplo3);
let ejemplo4= (paquete1 >=pesado)
console.log("tiene descuento? " + ejemplo4);

