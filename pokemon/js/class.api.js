export default class ApiRest {
    constructor(urlBase) {
        this.urlBase = urlBase;
    }
    async get(endPoint){

        const url = this.urlBase + endPoint;
        const peticion = await fetch(url, {
            method: 'GET',
            headers: {
                "Accept": "application/json"
            }
        });

        if(peticion.status === 200){
            let json = await peticion.json();
            return json;
        }else{
            return peticion.statusText;
        }    
    }

    mostrarPokemon(listaPokemon, objetoDOM){
        console.log(listaPokemon);
        
        objetoDOM.innerHTML = '';
        for (const pokemon of listaPokemon){
            objetoDOM.innerHTML += `
            <div class="col col-sm-4">
                <div class="card" >
                    <div class="card-body" >
                        <img id="imgPokemon" class="card-img-top" src="">
                        <h5 id="name" class="card-title name">${pokemon.name}</h5>
                        <p id="ptext" class="card-text ptext"></p>
                    </div>
                </div>
            </div>
            `;  
        }
    }
    pintarDatos(pokemon, etiqueta){
        //const sprite = (pokemon.sprites).other;
        const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
        let img = etiqueta.previousElementSibling;
        img.src=imgUrl;
        img.alt=pokemon.name;
        let ptext = etiqueta.nextElementSibling;
        ptext.innerHTML = `
        <p class="card-text">id: ${pokemon.id}</p>
        <p class="card-text">height: ${pokemon.height}</p>
        <p class="card-text">height: ${pokemon.height}</p>
        `;
    }

}













