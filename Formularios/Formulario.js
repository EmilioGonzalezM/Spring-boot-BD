
let boton = document.getElementById("btnRegistrar");

boton.addEventListener("click", evento=>{
    evento.preventDefault();      //Este se coloca si el tipo de boton es Submit para que no te abra otra pagina o te recarge.
    registrarpelicula();
});

let registrarpelicula = async()=>{

let campos = {};

campos.title = document.getElementById("title").value;
campos.director = document.getElementById("director").value;
campos.genre = document.getElementById("genre").value;

const peticion = await fetch("http://localhost:8080/api/movies",
{
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    
    body: JSON.stringify(campos)  
});

}