import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function PokemonPersonalPage() {

    const params = useParams();
    const pokemonId = params.pokemonId;

    const [pokemon, setPokemon] = useState(null);
    const [pokemonEvolutions, setPokemonEvolutions] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchInfoPokemon = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            const data = await response.json();
            setPokemon(data);
        } catch (e) {
            console.log(e);
            setError()
        }
        setIsLoading(false);
    }

    const fetchEvolutionPokemon = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${pokemonId}`)
            const data = await response.json();
            setPokemonEvolutions(data);
            console.log(data);
        } catch (e) {
            console.log(e);
        }
        setIsLoading(false);
    }

    const getDataPokemon = () => {
        fetchInfoPokemon(params);
        fetchEvolutionPokemon(params)
    }

    useEffect(() => {
        getDataPokemon();
    }, [])

    if (error) {
        return (
            <div>
                <p>Errore: {error}</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <>
                <div>Loading...</div>
            </>
        )
    }


    return (
        <div className='flex flex-col px-2'>
            {pokemon && (
                <>
                    <div>
                        <picture>
                            <img
                                className="w-[150px] h-[150px]"
                                src={pokemon?.sprites?.front_default}
                                alt=""
                            />
                        </picture>
                        <picture>
                            <img
                                className="w-[150px] h-[150px]"
                                src={pokemon?.sprites?.back_default}
                                alt=""
                            />
                        </picture>
                    </div>
                    <div>
                        <p>Nome pokemon : <span className='font-bold uppercase'>{pokemon?.name}</span> </p>
                    </div>
                    <div>
                        <p>Numero di pokedex ordine : {pokemon?.order}</p>
                        <p>Numero di pokedex id : {pokemon?.id}</p>
                    </div>
                    <div className='py-2'>
                        <p>{pokemon.types.length > 1 ? 'Tipi' : 'Tipo'}</p>
                        <ul>
                            {pokemon.types.map((typeInfo, index) => (
                                <li key={index}>
                                    {typeInfo.type.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='py-2'>
                        <p>Statistiche</p>
                        <ul>
                            {pokemon?.stats?.map((statistics, index) => (
                                <li key={index}>
                                    {statistics.stat.name} : {statistics.base_stat}
                                </li>
                            ))}
                            Total: {pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0)}
                        </ul>
                    </div>
                    <div>
                        <p>Altezza : {pokemon?.height}</p>
                        <p>Peso : {pokemon?.weight}</p>
                    </div>

                    <div className='py-2'>
                        <p>Evoluzioni del Pokémon:</p>
                        {/* {pokemonEvolutions && renderEvolutions(pokemonEvolutions.chain.evolves_to)} */}
                    </div>
                </>
            )}

        </div>
    )
}
