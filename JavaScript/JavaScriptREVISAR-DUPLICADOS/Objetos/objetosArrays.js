// Un array que contiene objetos
// 📦 EJEMPLO PRÁCTICO: CATÁLOGO DE PRODUCTOS CON ARRAYS Y OBJETOS
// =================================================================
// Este es un ejemplo real de cómo se manejan productos en una tienda online

// PASO 1: CREAR UN ARRAY QUE CONTIENE OBJETOS
// ============================================
// Aquí creamos una lista (array) de productos, donde cada producto es un objeto
// Piensa en esto como una base de datos simple de productos

const productos = [
    // PRODUCTO 1: Un objeto con 5 propiedades
    {
        id: 1,                    // Número identificador único
        nombre: "Smartphone",     // Texto con el nombre del producto
        precio: 599.99,           // Número decimal con el precio
        categoria: "Electrónicos", // Texto con la categoría
        enStock: true             // Boolean: true = disponible, false = agotado
    },
    // PRODUCTO 2: Mismo formato, diferentes valores
    {
        id: 2,
        nombre: "Auriculares",
        precio: 79.99,
        categoria: "Electrónicos", 
        enStock: false            // Este producto NO está disponible
    },
    // PRODUCTO 3: Otro producto más
    {
        id: 3,
        nombre: "Libro JavaScript",
        precio: 29.99,
        categoria: "Libros",
        enStock: true
    }
];

// PASO 2: INFORMACIÓN BÁSICA DEL ARRAY
// ====================================
// La propiedad .length nos dice cuántos elementos tiene el array
console.log("Tenemos", productos.length, "productos");
// Resultado: "Tenemos 3 productos"

// PASO 3: ACCEDER A ELEMENTOS DEL ARRAY
// =====================================
// Los arrays empiezan en posición 0, no en 1
// productos[0] = primer producto
// productos[1] = segundo producto
// productos[2] = tercer producto

console.log("Primer producto:", productos[0]);
// Esto muestra TODO el objeto del primer producto

console.log("Nombre del primer producto:", productos[0].nombre);
// productos[0] = primer producto (el objeto Smartphone)
// .nombre = accede a la propiedad "nombre" de ese objeto
// Resultado: "Nombre del primer producto: Smartphone"

console.log("Precio del segundo:", productos[1].precio + "€");
// productos[1] = segundo producto (Auriculares)
// .precio = accede al precio de ese producto
// + "€" = concatena (une) el símbolo del euro al final
// Resultado: "Precio del segundo: 79.99€"

// PASO 4: FILTRAR PRODUCTOS CON BUCLES Y CONDICIONALES
// ====================================================
// Vamos a buscar SOLO los productos que están en stock (disponibles)

console.log("=== PRODUCTOS DISPONIBLES ===");

// Crear un contador para saber cuántos productos están disponibles
let productosDisponibles = 0;

// BUCLE FOR: Recorre TODOS los productos uno por uno
for (let i = 0; i < productos.length; i++) {
    // i = 0: primer producto
    // i = 1: segundo producto  
    // i = 2: tercer producto
    
    // Mostrar qué producto estamos verificando (para aprender)
    console.log("Verificando producto " + (i + 1) + ": " + productos[i].nombre + " - En stock: " + productos[i].enStock);
    
    // CONDICIONAL IF: Solo ejecuta si la condición es verdadera
    if (productos[i].enStock === true) {
        // Solo entra aquí si enStock es true (disponible)
        console.log("-> DISPONIBLE: " + productos[i].nombre + " - " + productos[i].precio + " euros");
        
        // Aumentar el contador en 1
        productosDisponibles++;  // Es lo mismo que: productosDisponibles = productosDisponibles + 1
    }
    // Si enStock es false, no entra al if y pasa al siguiente producto
}

// Mostrar el total de productos encontrados
console.log("Total productos disponibles: " + productosDisponibles);

// PASO 5: OTRO FILTRO - PRODUCTOS ECONÓMICOS
// ==========================================
// Ahora vamos a buscar productos que cuesten menos de 50 euros

console.log("\n=== PRODUCTOS BARATOS ===");
// \n = salto de línea (deja una línea en blanco)

// Otro contador para productos baratos
let productosBaratos = 0;

// Otro bucle for para recorrer todos los productos
for (let i = 0; i < productos.length; i++) {
    // Mostrar el precio de cada producto (para aprender)
    console.log("Verificando precio de " + productos[i].nombre + ": " + productos[i].precio + " euros");
    
    // CONDICIONAL: Solo si el precio es menor que 50
    if (productos[i].precio < 50) {
        // Solo los productos de menos de 50€ entran aquí
        console.log("-> BARATO: " + productos[i].nombre + " - Solo " + productos[i].precio + " euros!");
        
        // Aumentar contador
        productosBaratos++;
    }
}

// Mostrar cuántos productos baratos encontramos
console.log("Total productos baratos: " + productosBaratos);

// RESUMEN DE LO QUE HEMOS APRENDIDO:
// =================================
// ✅ Arrays pueden contener objetos
// ✅ Cada objeto puede tener múltiples propiedades
// ✅ Accedemos con: array[posicion].propiedad
// ✅ Los bucles for nos permiten recorrer todos los elementos
// ✅ Los if nos permiten filtrar según condiciones
// ✅ Podemos contar elementos que cumplen condiciones
// ✅ Este patrón se usa en TODAS las aplicaciones web reales
