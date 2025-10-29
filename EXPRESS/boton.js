const inicio = document.getElementById("inicio");
const url = document.getElementById("url");

inicio.addEventListener("click",()=>{
    fetch(`http://localhost:3000`)
        .then((res)=>res.text())
            .then((data)=>{
                url.textContent = data;
            });
});

const info= document.getElementById("info");

info.addEventListener("click",()=>{
    fetch("http://localhost:3000/info")
        .then((res)=>res.json())
            .then((data)=>{
                url.textContent="Autor: "+ data.nombre + " Curso: " +data.curso+" Año: "+data.fecha;
            });
});

const contacto= document.getElementById("contacto");

contacto.addEventListener("click",()=>{
    fetch("http://localhost:3000/contacto")
        .then((res)=>res.text())
            .then((data)=>{
                url.innerHTML = data;
            });
});

const tienda =document.getElementById("tienda");

tienda.addEventListener("click",()=>{
    fetch("http://localhost:3000/tienda")
        .then((res)=>res.text())
            .then((data)=>{
                url.textContent=data;
            });
});