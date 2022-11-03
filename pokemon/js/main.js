
import ApiRest from './class.api.js';

const btnBuscar = document.getElementById("btnBuscar");
const inputPokemon = document.getElementById("nombrePokemon");
const contenedorPokemon = document.getElementById("contenedorPokemon");

//api de pokeapi
const resultsApi = 'https://pokeapi.co/api/v2/';
const resulstObject = new ApiRest(resultsApi);

resulstObject.get('pokemon/')
    .then(resultado => {
        resulstObject.mostrarPokemon(resultado.results , contenedorPokemon);
        
        const name = document.querySelectorAll('h5');
        name.forEach(element => {

            resulstObject.get(`pokemon/${element.textContent}/`)
                .then(res => {
                    resulstObject.pintarDatos(res, element);
                }
            ); 

        } ); 
    }
);

btnBuscar.addEventListener('click', obtenerPokemon);
function obtenerPokemon(e) {
    e.preventDefault();
    let nombrePokemon = inputPokemon.value;

    
}

