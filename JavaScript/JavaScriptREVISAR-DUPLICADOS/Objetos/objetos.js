// OBJETOS
/*
let alumno1={
    nombre:"ana",
    edad: 37,
};
let alumno2={
    nombre:"Luis",
    edad: 42,
};
console.log(alumno1, alumno2);

console.log(alumno1.nombre);
console.log(alumno2.edad);
let edades= [alumno1.edad, alumno2.edad];
console.log(edades);


//Recorrer objetos: Ver todas las propiedades FOR
const estudiante = {
    nombre: "Ana Lopez",
    edad: 28,
    curso: "JavaScript",
    activo: true,
    nota:8.5
};

for (let propiedad in estudiante){
    console.log(propiedad + ":" + estudiante[propiedad]);
};
    console.log(estudiante);

// Datos de un formulario de registro
const formulario = {
    nombre: "Ana",
    email: "",           // ❌ Vacío
    telefono: "123456789",
    edad: "",             // ❌ Vacío
    acepta: true
};

// Validar TODOS los campos automáticamente
console.log("🔍 Validando formulario...");

let camposVacios = [];
let totalCampos = 0;

for (let campo in formulario) {
    totalCampos++;
    
    // Verificar si está vacío
    if (formulario[campo] === "" || formulario[campo] === null) {
        camposVacios.push(campo);
        console.log("❌ " + campo + ": VACÍO");
    } else {
        console.log("✅ " + campo + ": " + formulario[campo]);
    }
}

// Mostrar resumen final
console.log(`\n📊 RESUMEN: ${totalCampos - camposVacios.length}/${totalCampos} campos completos`);

if (camposVacios.length > 0) {
    console.log(" Faltan: " + camposVacios.join(", "));
} else {
    console.log("🎉 ¡Formulario completo!");
}
// Pulsando la tecla windows + . se abren los iconos disponibles en windows.
// Añadir propiedades que no existían
estudiante.email = "carlos@email.com";
estudiante.telefono = "123-456-789";
estudiante.activo = true;

console.log("Con nuevas propiedades:", estudiante);

// También puedes usar corchetes
estudiante["fecha-inscripcion"] = "2025-09-01";
estudiante["tiene-beca"] = false;

console.log("Estudiante completo:", estudiante);
//----------------------modificar objeto
const estudiante2 = {
    nombre: "Carlos",
    edad: 20,
    curso: "JavaScript Básico",
    nota: 7.5
};

console.log("Nota inicial:", estudiante2.nota);    // 7.5

// Cambiar la nota
estudiante2.nota = 9.2;
console.log("Nueva nota:", estudiante2.nota);      // 9.2

// Cambiar varias propiedades
estudiante2.edad = 21;
estudiante2.curso = "JavaScript Avanzado";

console.log("Estudiante2 actualizado:", estudiante2);

// Eliminar una propiedad con delete
delete estudiante.telefono;
console.log("Sin teléfono:", estudiante);

// La propiedad ya no existe
console.log("Teléfono:", estudiante.telefono);    // undefined
/*
| ¿Qué quieres eliminar?       | Cómo hacerlo                     |
| ---------------------------- | -------------------------------- |
| Propiedad de un objeto       | `delete objeto.propiedad`        |
| Objeto dentro de otro objeto | `delete objeto.clave`            |
| Objeto en variable suelta    | `obj = null` o `obj = undefined` |
| Objeto dentro de un array    | `array.filter(...)`              |
//---------------------------------------------------
const estudiante3 = {
    nombre: "Carlos",
    edad: 20,
    curso: "JavaScript Básico",
    nota: 7.5,
    salir: function(){
        console.log(`El alumno ${this.nombre} puede salir`);
    }
};
estudiante3.salir();
estudiante3.salir; // esto no lo muestra por falta de los parentesis ().
//------- THIS para solucionar misma referenci en distintos objetos.
const estudiante4 = {
    nombre: "Ana",
    edad: 20,
    curso: "JavaScript Básico",
    nota: 7.5,
    salir: function(){
        console.log(`El alumno ${this.nombre} puede salir`);
    }
};
estudiante4.salir();

const alumno3 = {
    nombre: "Ana",
    edad: 20,
    notas: [8.5, 9.0, 7.5],
    notamedia: function(){
        // let suma=0;
        // for (let i = 0; i < this.notas.length; i++) {
            //     suma += this.notas[i];           
            // }
            // return suma / this.notas.length;
            const total = this.notas.reduce((acc, sum)=>acc+sum,0)
            return (total / this.notas.length).toFixed(2);
        }
    }
    console.log(alumno3.notamedia());
*/
    //----------------

    const estudiantes = [
    {
        id: 1,                          // 🆔 Identificador único (como DNI)
        nombre: "Ana López",            // 👤 Nombre completo  
        edad: 20,                       // 🎂 Edad del estudiante
        curso: "JavaScript",            // 📖 Curso que está tomando
        notas: [8.5, 9.0, 7.5],       // 📊 Array con todas sus calificaciones
        activo: true,                   // ✅ ¿Está matriculado actualmente?
        email: "ana@email.com"          // 📧 Contacto del estudiante
    },
    {
        id: 2,
        nombre: "Carlos Martín", 
        edad: 22,
        curso: "JavaScript",
        notas: [7.0, 8.5, 9.0],       // 📊 Diferentes notas para cada estudiante
        activo: true,
        email: "carlos@email.com"
    },
    {
        id: 3,
        nombre: "Elena García",
        edad: 19,
        curso: "JavaScript", 
        notas: [9.5, 9.0, 9.5],       // 📊 ¡Elena tiene las mejores notas!
        activo: false,                  // ❌ Elena ya no está activa
        email: "elena@email.com"
    }
];

console.log("=== LISTA DE ESTUDIANTES ===");
for (let i = 0; i < estudiantes.length; i++) {
    
    // 🔑 PUNTO CLAVE: ¿Por qué "est" en lugar de "estudiante"?
    const est = estudiantes[i];
    console.log("👤 " + est.nombre + " (" + est.edad + " años) - " + est.email);
}

//-----
console.log("\n=== PROMEDIOS ===");
for (let i = 0; i < estudiantes.length; i++) {
    const est = estudiantes[i];  // 🔄 Nuevamente "est" por las mismas razones
    let suma = 0;                // 📊 Acumulador para sumar todas las notas
    
    // 🔄 BUCLE ANIDADO: Recorremos las notas de ESTE estudiante específico
    for (let j = 0; j < est.notas.length; j++) {
        suma += est.notas[j];    // ➕ Sumamos cada nota individual
        }
    const promedio = suma / est.notas.length;  // 📐 Promedio = suma ÷ cantidad
    console.log("📊 " + est.nombre + ": " + promedio.toFixed(2));
    //                                        ↑ .toFixed(2) = solo 2 decimales
    
}