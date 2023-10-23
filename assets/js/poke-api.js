
const pokeApi = {} //OBEJTO  CRIADO

    function convertPokeApiDetailToPokemon(pokeDetail){ //FUNCAO convertendo modelo da api de pokemons no nosso modelo
        const pokemon = new Pokemon();// chamo a classe Pokemon criado no arquivo pokemon-model.js, para usar como modelo
        pokemon.number = pokeDetail.id//linkado numero do pokemon. a partir de agora comeco a linkar o nosso pokemon modelo a api para facilitar inserir o pokemon no html
        pokemon.name=pokeDetail.name // linkado nome do pokemon

        const types = pokeDetail.types.map((typeSlot)=>typeSlot.type.name)//converto a array/matris do pokeApi em uma array mais simples, types
        const [type] = types // pega o primeiro valor da array types, que nesse caso eh o primeiro tipo do pokemon, que vai ser o tipo principal
        
        pokemon.types = types // linkado array dos tipos
        pokemon.type = type // linkado  tipo principal do pokemon

        pokemon.photo = pokeDetail.sprites.other.dream_world.front_default // linkado foto do pokemon

        return pokemon;//retorna o pokemon com, nome,numero,tipos, tipo principal e foto do pokemon
    }

    pokeApi.getPokemonDetail = (pokemon) => {//ADICIONANDO METODO/funcao no objeto
        return fetch(pokemon.url)// requisicao de todo pokemon da array
            .then((response)=>response.json())// em seguida transforma em json
            .then(convertPokeApiDetailToPokemon)//convertendo modelo api em nosso modelo para tornar mais facil de colocar o pokemon no html no arquivo main.js
    }

    pokeApi.getPokemons = (offset=0, limit=5)=> { //ADICIONANDO METODO/funcao no objeto

        const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
        // processamento assincrono
        // fetch eh uma requisitcao HTTP usando url
        // O padrao do fetch eh usar o GET para fazer requisicao
        return fetch(url)

        //metodo then eh oq ele vai fazer no sucesso de uma promise(promessa da resposta/resposta da requisicao) ou seja, na obtencao da resposta
        
        // converte a resposta em json para manipular os dados 
        .then((response) => response.json()) //BODY convertido em jason

        //dentro do json, pega o results que eh a array de pokemon ou seja, pega os pokemons
        .then((jsonbody) => jsonbody.results)
        
        
        // para manipular o fracasso da requisicao
        //.catch((error) => console.log(error)) 

        //com os pokemons, eu pego cada um e percorro essa array de pokemons usando map, e a cada pokemon nessa array eu uso um FETCH/requisicao com a URL de cada pokemon, o retorno eh uma array de resultados das requisicoes do FETCH de cada pokemon e em seguida converto em json, fazendo uma array de detalhes de todos os pokemons listados em json
        .then((pokemons)=>pokemons.map(pokeApi.getPokemonDetail))

        //espera todas as requisicoes de todos os pokemons terminarem
        .then((detailRequests)=> Promise.all(detailRequests))


        .then((pokemonsDetails)=> {
            return pokemonsDetails
        })
    }

    


