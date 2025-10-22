// URL de la API que quieres consumir
// const apiUrl = 'https://jsonplaceholder.typicode.com/posts/1'; // Ejemplo de URL de API
const apiUrl = 'https://dog.ceo/dog-api/'; // Ejemplo de URL de API

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la red: ' + response.statusText);
        }
        return response.json(); // Convierte la respuesta a JSON
    })
    .then(data => {
        const datosApiDiv = document.getElementById('datos-api');
        datosApiDiv.innerHTML = `
            <h2>${data.title}</h2>
            <p>${data.body}</p>
        `;
    })
    .catch(error => {
        console.error('Hubo un problema con la petición fetch:', error);
        const datosApiDiv = document.getElementById('datos-api');
        datosApiDiv.innerHTML = '<p>No se pudieron cargar los datos.</p>';
    });