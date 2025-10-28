    
    const boton= document.getElementById("boton");
    const boton2= document.getElementById("boton2");
    const parrafo= document.getElementById("respuesta");

    boton.addEventListener("click", () =>{
        fetch ("http://localhost:3000/api/saludo")
        .then ((res) => res.json())
        .then ((data) => {
            parrafo.textContent = data.mensaje;
        })
        .catch ((err) => console.error ("ERROR: algo a fallado", err));
   
    });

    boton2.addEventListener("click", () =>{
        fetch ("http://localhost:3000/api/despedida")
        .then ((res) => res.json())
        .then ((data) => {
            parrafo.textContent = data.mensaje;
        })
        .catch ((err) => console.error ("ERROR: algo a fallado", err));
   
    });