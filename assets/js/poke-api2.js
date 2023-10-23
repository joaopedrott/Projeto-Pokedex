var htmlpokemon = window.document.getElementById('detailpokemon')
const pokeApi2 = {}

function convertPokeApiDetailToPokemon(pokeDetail,pokeDetail2) { //FUNCAO convertendo modelo da api de pokemons no nosso modelo
    const pokemon = new Pokemon();// chamo a classe Pokemon criado no arquivo pokemon-model.js, para usar como modelo
    pokemon.number = pokeDetail.id//linkado numero do pokemon. a partir de agora comeco a linkar o nosso pokemon modelo a api para facilitar inserir o pokemon no html
    pokemon.name = pokeDetail.name // linkado nome do pokemon

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)//converto a array/matris do pokeApi em uma array mais simples, types
    const [type] = types // pega o primeiro valor da array types, que nesse caso eh o primeiro tipo do pokemon, que vai ser o tipo principal

    pokemon.types = types // linkado array dos tipos
    pokemon.type = type // linkado  tipo principal do pokemon

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default // linkado foto do pokemon
    pokemon.height= pokeDetail.height
    pokemon.weight=pokeDetail.weight

    const abilities = pokeDetail.abilities.map((abilitySlot)=> abilitySlot.ability.name)
    const [ability] = abilities

    pokemon.abilities=abilities
    pokemon.ability = ability
    pokemon.capturerate=pokeDetail2.capture_rate
    pokemon.habitat=pokeDetail2.habitat.name

     const egg_groups = pokeDetail2.egg_groups.map((eggSlot)=> eggSlot.name)
     const [egg] = egg_groups
    pokemon.egg_groups= egg_groups 
    pokemon.egg = egg
    
    return pokemon;//retorna o pokemon com, nome,numero,tipos, tipo principal e foto do pokemon
}

function convertPokemonToLi2(pokemon) {//inseri os detalhes do pokemon nessa html

    return `
        <div class="pokemonDetail ${pokemon.type}">
        <span class="name">${pokemon.name}</span>
        <span class="number">#${pokemon.number}</span>
            <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                
            </ol>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
        <div class="detail">
            <Span><strong>About</strong></Span>
            
                    <!--  <div>
                        <span class="info">Species: </span>
                        <span class="infResp">Seed</span>
                    </div> 
                    -->
                    <div>
                        <span class="info">Height: </span>
                        <span class="infResp">${pokemon.height/10} m</span>
                    </div>
                
                    <div>
                        <span class="info">Wight: </span>
                        <span class="infResp">${pokemon.weight/10} kg</span>
                    </div>
                    
                    
                    <div>
                        <span class="info">Abilities: </span>
                        ${pokemon.abilities.map((ability)=>`<span class="infResp">${ability} </span>`).join(', ')}
                    </div>
                
            
                    <div>
                        <span class="info">Capture Rate:  </span>
                        <span class="infResp">${pokemon.capturerate} %</span>
                    </div>
                
                    <div>
                        <span class="info">Habitat: </span>
                        <span class="infResp">${pokemon.habitat}</span>
                    </div>
                    <div>
                        <span class="info">Egg Groups: </span>
                        ${pokemon.egg_groups.map((egg)=>`<span class="infResp">${egg} </span>`).join(', ')}
                    </div>
                
                
            
        </div>
        `
}
function obterParametro() {//pega o id do pokemon dentro da url e guarda na variavel parametro e retorna
    var urlParams = new URLSearchParams(window.location.search);
    var parametro = urlParams.get('parametro');
    return parametro
}


pokeApi2.GetDetail = () => {
    //console.log(idPokemon)
    const para = obterParametro()
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${para}/`)
        .then((response2)=> response2.json())
        .then((detalhe2)=>fetch(`https://pokeapi.co/api/v2/pokemon/${para}/`)
        .then((response) => response.json())
        .then((detalhe) => convertPokeApiDetailToPokemon(detalhe,detalhe2))
        .then((detalhe) => {
            const pokemon1 = convertPokemonToLi2(detalhe,detalhe2)
            htmlpokemon.innerHTML = pokemon1
        }))

    

}
pokeApi2.GetDetail()
