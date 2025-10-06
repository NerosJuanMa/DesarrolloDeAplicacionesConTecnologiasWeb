 // Buscar el elemento y guardarlo en una variable
let boton1 = document.getElementById("boton1");
// Le agregamos una función
boton1.addEventListener("click", function() {
    alert("Has hecho click aquí en el boton!");
});
// Botón que va a cambiar el texto una vez
let boton2 = document.getElementById('boton2');
boton2.addEventListener('click', function() {
    boton2.textContent = 'Texto cambiado';
});

// Botón que va a cambiar el texto cada vez que click
let boton3 = document.getElementById('boton3');
boton3.addEventListener('click', function() {
if (boton3.textContent == 'Texto original') {
    boton3.textContent = 'Texto cambiado';
    } else {
    boton3.textContent = 'Texto original';
    }
});

//-----------------------------
// JavaScript: querySelector es más flexible
let titulo = document.querySelector('#titulo');        // Por ID
let parrafo = document.querySelector('.importante');   // Por clase
let boton = document.querySelector('button');          // Por etiqueta

// querySelectorAll para encontrar varios elementos
// let todosLosParrafos = document.querySelectorAll('p');
// console.log(todosLosParrafos); // Array con todos los párrafos

// Ejemplo 1: Cambia el fondo solo del primer párrafo usando querySelector
let boton4 = document.getElementById('boton4');
let parrafo1 = document.querySelector('#p1');
boton4.addEventListener('click', function() {
    parrafo1.style.backgroundColor = 'yellow';
    setTimeout(function() {
        parrafo1.style.backgroundColor = 'green';
    }, 2000);
});

// Ejemplo 2: Cambia el fondo de todos los párrafos usando 
//querySelectorAll y forEach
// querySelectorAll('p') obtiene todos los elementos <p> del documento.
// forEach recorre cada párrafo y aplica el cambio de color.
let boton5 = document.getElementById('boton5');
boton5.addEventListener('click', function() {
    let parrafos = document.querySelectorAll('p');
    parrafos.forEach(function(parrafo) {
        parrafo.style.backgroundColor = 'blue'; 
        // animación rápida
        parrafo.classList.add("animar");
        setTimeout(() => parrafo.classList.remove("animar"), 3000);
            
    });
});

//-----TIEMPO DE DURACION DEL EVENTO
  // 1. Seleccionamos el botón por su ID
let boton6 = document.getElementById('boton6');

// 2. Le añadimos un listener para el evento 'click'
boton6.addEventListener('click', ejemploSetTimeout);
// 3. Definimos la función que se ejecuta al hacer clic
function ejemploSetTimeout() {
    // Seleccionamos el párrafo por su ID
    let texto = document.getElementById('demo-settimeout');
    // Cambiamos el texto inmediatamente
    texto.textContent = '¡Texto cambiado! Volverá en 2 segundos...';

    // Usamos setTimeout para esperar 2 segundos antes de restaurar el texto
    // setTimeout ejecuta la función que le pasamos después del tiempo indicado (2000 ms = 2 segundos)
    setTimeout(function() {
        texto.textContent = 'Este texto cambiará en 2 segundos...';
    }, 2000);
}
    // setInterval(() => {
    // console.log("Esto se repite cada segundo");
    // }, 1000);
function cambiarInnerHTML() {
    let elemento = document.getElementById('texto-contenido');
    elemento.innerHTML = '<strong>Esto es innerHTML</strong> - <em>sí interpreta HTML</em>';
    let intervalo1 = setInterval(() => {
        elemento.innerHTML = '<h1>Esto es innerHTML</h1> - <em>sí interpreta HTML</em>';
        }, 3000);
    setTimeout(() => {
        clearInterval(intervalo1);
        elemento.innerHTML = '<strong>Esto es innerHTML</strong> - <em>sí interpreta HTML</em>';
    }, 8000);
}

//CONTADOR
    let contador = 0;
    let h1 = document.getElementById("contador");
    let stopboton = document.getElementById("detener");

    let intervalo = setInterval(() => {
      contador++;
      h1.innerHTML = contador;

      // animación rápida
      h1.classList.add("animar");
      setTimeout(() => h1.classList.remove("animar"), 200);
    }, 1000); // cada segundo suma uno
    

    stopboton.addEventListener("click", () => {
      clearInterval(intervalo);
      //console.log("Intervalo detenido");
      stopboton.innerHTML = "<h4 class= 'animar'>Reiniciar</h4>";
      stopboton.onclick = () => location.reload(); // recargar página
    });

// setTimeout - Ejecutar una vez después de un tiempo
setTimeout(function() {
    console.log('¡Esto se ejecuta después de 3 segundos!');
}, 3000);

// Escucha el evento 'input' en el campo de texto y muestra un saludo personalizado
document.getElementById('nombre-usuario').addEventListener('input', function(recuadro) {
    // event.target es el input que dispara el evento
    // event.target.value es el texto actual del input
    // .trim() elimina espacios extra
    const nombre = recuadro.target.value.trim();
    document.getElementById('saludo-usuario').textContent = nombre
        ? `¡Hola, ${nombre}!`
        : 'Aquí aparecerá el saludo';
});
// Usar function(event) permite acceder al objeto del evento y sus propiedades.
// Así puedes recoger el valor que el usuario escribe en el input en tiempo real.

//----------------------
var tareas = [];

function agregarTarea() {
    var texto = document.getElementById('tarea').value;
    if (texto) {
        tareas.push(texto);
        mostrarTareas();
        document.getElementById('tarea').value = '';
    }
}

function borrarTarea() {
    tareas.pop();
    mostrarTareas();
}

function mostrarTareas() {
    var lista = document.getElementById('lista-tareas');
    lista.innerHTML = '';
    tareas.forEach(function(tarea) {
        var li = document.createElement('li');
        li.textContent = tarea;
        lista.appendChild(li);
    });
}

// Usar addEventListener para los botones
document.getElementById('btn-agregar-tarea').addEventListener('click', agregarTarea);
document.getElementById('btn-borrar-tarea').addEventListener('click', borrarTarea);

// Permitir agregar tarea con Enter en el input
document.getElementById('tarea').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') agregarTarea();
});