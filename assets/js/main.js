//1-faz ligacao do html no javascript
const pokemonList = window.document.getElementById('pokemonList')
const loadMoreButton = window.document.getElementById('loadMoreButton')
const maxRecords= 151;
const limit = 10;
let offset = 0;
//const htmlpokemon = window.document.getElementById('detailpokemon')

//const pokemonButton = window.document.getElementById('pokemon.number')

function convertPokemonToLi(pokemon) {//inseri o pokemon nessa html

    return `
    <button id="${pokemon.number}" onclick="sucesso(${pokemon.number})">
    <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">  
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                
                <img src="${pokemon.photo}" 
                    alt="${pokemon.name}">

            </div>
        </li></button>`
}

function loadPokemonItens(offset, limit) {//faz requisicao de pokemons e inseri pokemons no html
    

    


    //2-chama a funcao getPokemons do objeto pokeApi do arquivo poke-api.js para fazer a requisicao.
    //o retorno foi uma array de detalhes de 10 pokemons e eh colocado em pokemons / array de 10 obejtos da classe pokemon
    pokeApi.getPokemons(offset, limit)

        //3-no then, pego a array de pokemon e comeco a inserir ele no html da lista Li
        .then((pokemons = []) => {

            //4-a funcao map transforma cada item de uma lista em outro tipo de item ou seja, converte os itens em outros itens
            // o map, mapea ou percorre toda a lista pokemons
            //nesse caso transformo cada pokemon em um html com pokemon inserido nesse html com convertPokemonToLi, ou seja, transforma pokemon em html
            // No fim, o newList eh uma lista de html com pokemons inseridos
            const newList = pokemons.map(function (pokemon) {
                return convertPokemonToLi(pokemon)
            })

            //5-o join vai juntar todos os elementos da lista e converte a lista em uma string
            const newHtml = newList.join('')

            //6-e assim, a string de html de pokemons eh inserida no html
            pokemonList.innerHTML += newHtml

        })
}
loadPokemonItens(offset,limit)// aqui faz a primeira chamada da requisicao

loadMoreButton.addEventListener('click', ()=>{//aqui faz a chamada pelo botao load more no html para ler mais 5 pokemons
    offset += limit
    //  10       5 
    const qtdRecordsWithNexPage = offset + limit
             //15              10        5
    if(qtdRecordsWithNexPage >= maxRecords){
        // 15                     11
        const newLimit = maxRecords - offset
        loadPokemonItens(offset,newLimit)
                       //   10   1
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset,limit)
    }
    
})


function sucesso(idPokemon){
    

     //pokeApi2.GetDetail(idPokemon)
     window.location.href = "detail.html?parametro=" + idPokemon;


    /* .then((detalhe)=>{
        const pokemon1 = convertPokemonToLi2(detalhe)
        //htmlpokemon.innerHTML = pokemon1
        htmlpokemon.innerText += 'teste'
    })  */
    
    
    
    
    //console.log(idPokemon)
    //pokeApi.abrirPokemon
    /* fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}/`)
    .then((response) => response.json()) */
}

/* pokemonButton.addEventListener('click', ()=>{
    console.log('sucesso!')
}) */

// simplificando
//simplificando o passo 4 com errow function em uma linha
//const newList = pokemons.map((pokemon)=>convertPokemonToLi(pokemon))

//simplificando o passo 4 com errow function em uma linha usando o convertPokemonToLi dentro do pareteses
//const newList = pokemons.map(convertPokemonToLi)

//simplificando o passo 4 com o 5
//const newList = pokemons.map(convertPokemonToLi).join('')

//simplificando o passo 4 com o 5 com o 6
//pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('')

// CADA THEN USA O RETORNO DO THEN ANTERIOR



/* .finally(function(){// para silinizar que a requisicao terminou
    console.log('Requisicao concluida!')
}) */


//obs: parecido com TRY CATCH

/* ANOTACOES simplificando o .then
primeiro then normal
1-
.then(function (response) {
    
    return response.json() // converte a resposta em json para manipular os dados
    //console.log(response)
})

2-usando arrow function retirando palavra function e cologando a => seta
.then((response)=> {
    
    return response.json() // converte a resposta em json para manipular os dados
    //console.log(response)
})

3- simplificando ainda mais retirando {} e return
.then((response)=>response.json())
*/