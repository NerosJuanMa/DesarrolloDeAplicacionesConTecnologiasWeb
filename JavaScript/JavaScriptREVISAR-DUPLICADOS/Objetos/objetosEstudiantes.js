/* 
🎓 EXPLICACIÓN DIDÁCTICA:
Este ejemplo simula un sistema real de gestión estudiantil.
Imagina que eres el director de una escuela y necesitas:
- Ver información de todos los estudiantes
- Calcular promedios automáticamente  
- Encontrar al mejor estudiante
- Filtrar estudiantes activos

¡Esto es exactamente lo que hace Classroom, Moodle, etc.!
*/

// 📚 PASO 1: Creamos nuestra "base de datos" de estudiantes
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

/* 
🎯 FUNCIÓN 1: Mostrar información básica de todos los estudiantes
¿Por qué necesitamos esto? 
→ Para tener una vista general rápida de nuestra clase
→ Como una "lista de asistencia" digital
*/
console.log("=== LISTA DE ESTUDIANTES ===");
for (let i = 0; i < estudiantes.length; i++) {
    
    // 🔑 PUNTO CLAVE: ¿Por qué "est" en lugar de "estudiante"?
    const est = estudiantes[i];
    
    /* 
    💡 EXPLICACIÓN DETALLADA:
    
    Escribir "const estudiante = estudiantes[i]" sería MÁS claro, ¡tienes razón!
    Pero usamos "est" por estas razones PRÁCTICAS:
    
    ✅ VELOCIDAD DE ESCRITURA: 
       - "est.nombre" es más rápido de escribir que "estudiante.nombre"
       - En bucles largos, esto ahorra mucho tiempo
    
    ✅ LEGIBILIDAD EN PANTALLA:
       - Líneas más cortas = código más fácil de leer
       - "est.email" cabe mejor en la pantalla que "estudiante.email"
    
    ✅ CONVENCIÓN PROFESIONAL:
       - En empresas reales se usan abreviaciones lógicas
       - "user" en lugar de "usuario", "prod" en lugar de "producto"
    
    ⚠️  REGLA DE ORO: La abreviación debe ser OBVIA
       - "est" → estudiante ✅ (se entiende)
       - "x" → estudiante ❌ (no se entiende)
       - "student" → estudiante ✅ (en inglés, muy común)
    
    🎓 COMO PROFESOR TE DIGO:
    Si estás aprendiendo, usa nombres completos hasta que te sientas cómodo.
    Luego, gradualmente adopta abreviaciones lógicas como los profesionales.
    */
    
    console.log("👤 " + est.nombre + " (" + est.edad + " años) - " + est.email);
    //          ↑ Accedemos a las propiedades del objeto actual
    
    /* 
    🤔 PREGUNTA CLAVE: ¿Por qué JavaScript "conoce" la variable `est`?
    
    🧠 RESPUESTA FUNDAMENTAL - ÁMBITO (SCOPE) DE VARIABLES:
    
    JavaScript "conoce" `est` debido a las REGLAS DE ÁMBITO:
    
    1️⃣ DECLARACIÓN: 
       const est = estudiantes[i];  ← Aquí "nace" la variable
    
    2️⃣ ÁMBITO DE BLOQUE:
       La variable `est` existe SOLO dentro de las llaves {} del for
       
       for (let i = 0; i < estudiantes.length; i++) {
           const est = estudiantes[i];     ← NACE aquí
           console.log(est.nombre);        ← VIVE aquí ✅
           console.log(est.email);         ← VIVE aquí ✅
       }                                   ← MUERE aquí
       
       console.log(est.nombre);            ← ERROR! `est` no existe ❌
    
    3️⃣ CADA ITERACIÓN ES INDEPENDIENTE:
       
       VUELTA 1: est = {nombre: "Ana López", edad: 20, ...}
       VUELTA 2: est = {nombre: "Carlos Martín", edad: 22, ...}  
       VUELTA 3: est = {nombre: "Elena García", edad: 19, ...}
       
       ¡En cada vuelta, `est` es un objeto diferente!
    
    4️⃣ ¿CÓMO "RECUERDA" JavaScript qué es `est`?
       
       ✅ JavaScript lee: const est = estudiantes[i];
       ✅ Busca en el array: estudiantes[0], estudiantes[1], estudiantes[2]
       ✅ Copia la REFERENCIA al objeto en la variable `est`
       ✅ Ahora `est` "apunta" al objeto actual
       
       ANALOGÍA: `est` es como un "control remoto" que apunta al objeto actual
    
    5️⃣ DEMOSTRACIÓN PASO A PASO:
       
       ITERACIÓN 1 (i = 0):
       est = estudiantes[0] → est apunta al objeto de Ana
       est.nombre → "Ana López" ✅
       
       ITERACIÓN 2 (i = 1):  
       est = estudiantes[1] → est apunta al objeto de Carlos
       est.nombre → "Carlos Martín" ✅
       
       ITERACIÓN 3 (i = 2):
       est = estudiantes[2] → est apunta al objeto de Elena  
       est.nombre → "Elena García" ✅
    
   
    JavaScript "conoce" `est` porque:
    1. La declaraste con `const est = ...`
    2. Está dentro del ámbito correcto (dentro del for)
    3. En cada vuelta, `est` apunta a un objeto diferente del array
    4. JavaScript mantiene esta referencia hasta el final de cada iteración
    */
}

/* 
🎯 FUNCIÓN 2: Calcular promedio de notas para cada estudiante
¿Por qué es útil?
→ Los profesores necesitan saber el rendimiento de cada alumno
→ Es la base para decidir quién pasa de año
→ Automatiza cálculos que antes se hacían a mano
*/
console.log("\n=== PROMEDIOS ===");
for (let i = 0; i < estudiantes.length; i++) {
    const est = estudiantes[i];  // 🔄 Nuevamente "est" por las mismas razones
    let suma = 0;                // 📊 Acumulador para sumar todas las notas
    
    // 🔄 BUCLE ANIDADO: Recorremos las notas de ESTE estudiante específico
    for (let j = 0; j < est.notas.length; j++) {
        suma += est.notas[j];    // ➕ Sumamos cada nota individual
        
        /* 
        💭 DESGLOSE DE "est.notas[j]":
        - "est" = estudiante actual (Ana, Carlos o Elena)
        - "est.notas" = array de notas de ESE estudiante
        - "est.notas[j]" = una nota específica dentro de ese array
        
        Ejemplo con Ana (primer estudiante):
        - est.notas = [8.5, 9.0, 7.5]
        - est.notas[0] = 8.5
        - est.notas[1] = 9.0  
        - est.notas[2] = 7.5
        */
    }
    
    const promedio = suma / est.notas.length;  // 📐 Promedio = suma ÷ cantidad
    console.log("📊 " + est.nombre + ": " + promedio.toFixed(2));
    //                                        ↑ .toFixed(2) = solo 2 decimales
}

/* 
🎯 FUNCIÓN 3: Encontrar el mejor estudiante de la clase
¿Para qué sirve?
→ Identificar al estudiante más destacado
→ Decidir becas o reconocimientos  
→ Ejemplo de algoritmo de "búsqueda del máximo"
*/
let mejorEstudiante = estudiantes[0];  // 🏁 Empezamos asumiendo que el primero es el mejor
let mejorPromedio = 0;                 // 📊 Variable para guardar el mejor promedio encontrado

for (let i = 0; i < estudiantes.length; i++) {
    const est = estudiantes[i];        // 🔄 Otra vez "est" - ¿ya ves el patrón?
    let suma = 0;
    
    // 🔄 Mismo patrón: calcular promedio de este estudiante
    for (let j = 0; j < est.notas.length; j++) {
        suma += est.notas[j];
    }
    
    const promedio = suma / est.notas.length;
    
    // 🏆 COMPARACIÓN: ¿Este estudiante es mejor que el mejor actual?
    if (promedio > mejorPromedio) {
        mejorPromedio = promedio;      // 📈 Actualizamos el mejor promedio
        mejorEstudiante = est;         // 👑 Actualizamos el mejor estudiante
        
        /* 
        🧠 LÓGICA DEL ALGORITMO:
        1. Empezamos con el primer estudiante como "el mejor"
        2. Comparamos cada estudiante con "el mejor actual"  
        3. Si encontramos uno mejor, lo convertimos en "el nuevo mejor"
        4. Al final, tenemos garantizado el mejor de todos
        
        ¡Este es el algoritmo de "búsqueda del máximo"!
        Se usa en TODO: deportes, ventas, temperaturas, etc.
        */
    }
}

console.log("\n🏆 MEJOR ESTUDIANTE:");
console.log("🌟 " + mejorEstudiante.nombre + " con promedio de " + mejorPromedio.toFixed(2));

/* 
🎯 FUNCIÓN 4: Filtrar estudiantes activos
¿Por qué es importante?
→ Solo los estudiantes activos pueden presentar exámenes
→ Para enviar comunicados solo a matriculados actuales
→ Ejemplo de "filtrado de datos"
*/
console.log("\n=== ESTUDIANTES ACTIVOS ===");
for (let i = 0; i < estudiantes.length; i++) {
    // 🤔 PREGUNTA: ¿Por qué aquí NO usamos "est"?
    
    if (estudiantes[i].activo === true) {
        console.log("✅ " + estudiantes[i].nombre);
    }
    
    /* 
    💡 RESPUESTA DEL PROFESOR:
    
    ¡Excelente observación! Aquí tienes DOS opciones:
    
    OPCIÓN 1 - Acceso directo (lo que está en el código):
    if (estudiantes[i].activo === true) {
        console.log("✅ " + estudiantes[i].nombre);
    }
    
    OPCIÓN 2 - Con variable temporal:
    const est = estudiantes[i];
    if (est.activo === true) {
        console.log("✅ " + est.nombre);
    }
    
    ¿Cuándo usar cada una?
    
    ✅ USA ACCESO DIRECTO cuando:
       - Solo necesitas 1-2 propiedades
       - El código es corto y simple
       - No vas a reutilizar el objeto
    
    ✅ USA VARIABLE TEMPORAL cuando:
       - Necesitas muchas propiedades del mismo objeto
       - El código es largo y complejo
       - Vas a usar el objeto varias veces
    
    🎯 EN ESTE CASO: Solo necesitamos 2 propiedades (activo y nombre),
    así que el acceso directo está bien. ¡Ambas formas son correctas!
    */
}

/* 
🎓 RESUMEN EDUCATIVO:

Has visto 4 patrones fundamentales de programación:

1️⃣ ITERACIÓN SIMPLE: Recorrer y mostrar datos
   → for + acceso a propiedades

2️⃣ CÁLCULOS CON BUCLES ANIDADOS: Procesar arrays dentro de objetos
   → for dentro de for + acumuladores

3️⃣ BÚSQUEDA DE MÁXIMO: Encontrar el mejor elemento
   → comparaciones + variables de control

4️⃣ FILTRADO: Mostrar solo elementos que cumplen condiciones
   → if dentro de for

🚀 ¡Estos 4 patrones son la base del 80% de la programación real!
*/