window.onload = function(){
    listarpeliculas();
}

let listarpeliculas = async()=>{

    const peticion = await fetch("http://localhost:8080/api/movies",
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const peliculas = await peticion.json();

        let contenidotabla = "";
        for (let pelicula of peliculas){

            let contenidofila = `<tr>
            
            <td>${pelicula.id}</td>
            <td>${pelicula.title}</td>
            <td>${pelicula.director}</td>
            <td>${pelicula.genre}</td>
            <td class="juan">
            <i onClick="editarpeliculas(${pelicula.id})" class="material-icons button edit">edit</i>
            <i onClick="borrarpeliculas(${pelicula.id})" class="material-icons button delete">delete</i>
            </td>
            </tr> 
             `

          contenidotabla += contenidofila;

        }
        document.querySelector("#tabla tbody").outerHTML = contenidotabla;
}

let borrarpeliculas = async(id)=>{

    const peticion = await fetch("http://localhost:8080/api/movies/"+id,
        {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        listarpeliculas();
}

let ideditar;

let editarpeliculas = async(id)=>{
    mostrarformulario();

    ideditar = id;

    const peticion = await fetch("http://localhost:8080/api/movie/"+id,
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
    });
    const pelicula = await peticion.json();

    document.getElementById("title").value=pelicula.title;
    document.getElementById("director").value=pelicula.director;
    document.getElementById("genre").value=pelicula.genre;

    let btnModificar = document.getElementById("btnModificar");
}

btnModificar.addEventListener("click", evento =>{
    evento.preventDefault();
    aplicaractualizacion(ideditar);
})

let aplicaractualizacion = async (id)=>{

    let campos = {};
    campos.id = id;
    campos.title = document.getElementById("title").value;
    campos.director = document.getElementById("director").value;
    campos.genre = document.getElementById("genre").value;
    
    const peticion = await fetch("http://localhost:8080/api/movies",
    {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        
        body: JSON.stringify(campos)  
    });
    listarpeliculas();
    esconderformulario();
    }

function mostrarformulario(){
  let formulario = document.getElementById("formulario").style.visibility="visible";
  
}

function esconderformulario(){
    let formulario = document.getElementById("formulario").style.visibility="hidden";
    
  }