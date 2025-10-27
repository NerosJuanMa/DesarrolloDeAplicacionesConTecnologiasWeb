fetch('https://jsonplaceholder.typicode.com/users')
.then(res => res.json()) // Transformar texto JSON → objeto JS 
.then(data => console.log(data[3].name)) // Mostrar los datos en consola 
.catch(err => console.error("❌ Error en la conexión:", err));


fetch('https://jsonplaceholder.typicode.com/users')
.then(res => res.json()) // Transformar texto JSON → objeto JS 
.then(data => console.log(data[2].name)) // Mostrar los datos en consola 
.catch(err => console.error("❌ Error en la conexión:", err));

//-------------------------Fetch con AWAIT

async function obtenerUsuarios() { 
    try { 
        const res = await fetch('https://jsonplaceholder.typicode.com/users'); 
        const datos = await res.json(); 
        console.log(datos [1].name); 
    } catch (error) { 
        console.error("❌ Error al obtener datos:", error); }
}

obtenerUsuarios();