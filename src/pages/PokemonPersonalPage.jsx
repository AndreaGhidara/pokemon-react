import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getIdPokemon } from '../lib/utils/helper';
import { CiLineHeight } from "react-icons/ci";
import { LiaWeightSolid } from "react-icons/lia";
import { ImStatsDots } from "react-icons/im";
import Loader from '../components/Loader';
import { SiMicrogenetics } from "react-icons/si";

export default function PokemonPersonalPage() {

    const params = useParams();
    const pokemonId = params.pokemonId;

    const [pokemon, setPokemon] = useState(null);
    const [pokemonEvolutions, setPokemonEvolutions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const extractEvolution = (evolution) => {
        const result = [];

        if (evolution.species) {
            const id = getIdPokemon(evolution.species.url);
            result.push({
                name: evolution.species.name,
                url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
            });
        }

        if (evolution.evolves_to && evolution.evolves_to.length > 0) {
            evolution.evolves_to.forEach((nextEvolution) => {
                result.push(...extractEvolution(nextEvolution));
            });
        }

        return result;
    };

    const fetchInfoPokemon = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            const data = await response.json();
            setPokemon(data);
            console.log(data);

            const evolutionSpecies = await fetch(data.species.url);
            const dataSpecies = await evolutionSpecies.json();

            const evolutionChain = await fetch(dataSpecies.evolution_chain.url);
            const dataEvolutionChain = await evolutionChain.json();

            const evolution = extractEvolution(dataEvolutionChain.chain);
            setPokemonEvolutions(evolution);
            console.log(evolution);
        } catch (e) {
            console.log(e);
            setError()
        }
        setIsLoading(false);
    }

    const getDataPokemon = () => {
        fetchInfoPokemon(params);
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
            <div className='w-full h-screen flex justify-center items-center'>
                <Loader />
            </div>
            </ >
        )
    }


    return (
        <>
            {pokemon && (
                <>
                    <div className='overflow-hidden'>
                        <div className='w-full h-[180px] bg-gradient-to-r from-yellow-400 to-yellow-300 relative '>
                            <div className='w-full absolute flex justify-center lg:translate-x-32 translate-x-28 translate-y-6 lg:translate-y-10 '>
                                <img className='w-[150px] h-[150px] object-contain rotate-45' src='/public/pokeball.png' />
                            </div>
                            <div className='flex justify-center'>
                                <picture>
                                    <img
                                        className="w-[130px] h-[130px] lg:w-[200px] lg:h-[200px]"
                                        src={pokemon?.sprites?.front_default}
                                        alt=""
                                    />
                                </picture>
                                <picture>
                                    <img
                                        className="w-[100px] h-[100px] lg:w-[130px] lg:h-[130px]"
                                        src={pokemon?.sprites?.back_default}
                                        alt=""
                                    />
                                </picture>
                            </div>
                            <div>
                            </div>
                        </div>

                        <section className='px-3'>
                            <div className='bg-[#242424] p-5 rounded-lg mb-5 flex flex-col '>
                                <div className='font-bold text-center pb-2 text-2xl'>#{pokemon?.order}</div>
                                <div className='w-full flex justify-center'>
                                    <h1 className='font-bold uppercase text-center text-4xl border-2 p-2 shadow-white shadow-2xl'>{pokemon?.name} </h1>
                                    {/* <p>Numero di pokedex ordine : {pokemon?.order}</p>
                                    <p>Numero di pokedex id : {pokemon?.id}</p> */}
                                </div>
                                {/* TYPEX */}
                                <div className='flex flex-col py-5'>
                                    <div className='flex items-center'>
                                        <SiMicrogenetics className='me-2 text-2xl' />
                                        <p className='pe-1 font-bold text-2xl uppercase'>{pokemon.types.length > 1 ? 'Types' : 'Type'} </p>
                                    </div>
                                    <ul className='flex pt-3'>
                                        {pokemon.types.map((typeInfo, index) => (
                                            <li className='font-medium uppercase px-2 lg:px-0' key={index}>
                                                {typeInfo.type.name} <span className={`px-2 ${index === pokemon.types.length - 1 && 'hidden'}`}>/</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className='w-full flex flex-col justify-between lg:flex-row'>
                                    {/* STATS */}
                                    <div className='py-2 w-full lg:w-[50%]'>
                                        <div className='flex items-center'>
                                            <ImStatsDots className='me-2 text-2xl' />
                                            <p className=' pe-1 font-bold uppercase text-2xl'>
                                                Stats</p>
                                        </div>
                                        <ul className='pt-4'>
                                            {pokemon?.stats?.map((statistics, index) => {
                                                const maxStat = 100; // Valore massimo della statistica
                                                const percentage = (statistics.base_stat / maxStat) * 100;

                                                return (
                                                    <li className='font-semibold flex items-center mb-2' key={index}>
                                                        <p className='w-1/4'>{statistics.stat.name}:</p>
                                                        <div className="w-3/4 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                            <div
                                                                className={`h-full rounded-full`}
                                                                style={{
                                                                    width: `${percentage}%`,
                                                                    backgroundColor: percentage > 75 ? 'green' : percentage > 50 ? 'yellow' : 'red',
                                                                }}
                                                            />
                                                        </div>
                                                        <span className="ml-2">{statistics.base_stat}</span>
                                                    </li>
                                                );
                                            })}
                                            Total: {pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0)}
                                        </ul>
                                    </div>
                                    {/* EVOLUZIONI */}
                                    <div className='py-2 w-full lg:w-[50%] lg:flex lg:justify-center'>
                                        <div className='flex flex-col lg:flex-row '>
                                            <div className='py-2'>
                                                <div className='flex justify-center pb-5'>
                                                    <img className='w-[500px]' src="/public/Evolve.png" alt="" />
                                                </div>
                                                {/* <p className='font-bold text-center text-xl pb-3'>Evolution</p> */}
                                                {pokemonEvolutions && (
                                                    <ul className='lg:flex lg:justify-center lg:items-center'>
                                                        {pokemonEvolutions.map((evolution, index) => (
                                                            <React.Fragment key={index}>
                                                                <a href={`/pokemon/${evolution.name}`}>
                                                                    <li className='flex flex-col justify-center items-center' key={index}>
                                                                        <p className='uppercase'>
                                                                            {evolution.name}
                                                                        </p>
                                                                        <img
                                                                            className="w-[150px] h-[150px] lg:w-[200px] lg:h-[200px]"
                                                                            src={evolution.url}
                                                                            alt=""
                                                                        />
                                                                    </li>
                                                                </a>
                                                            </React.Fragment>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='py-2 flex justify-between'>
                                    <div className='flex items-center text-2xl'>
                                        <CiLineHeight />
                                        {pokemon?.height}
                                    </div>
                                    <div className='flex items-center text-2xl'>
                                        <LiaWeightSolid />
                                        {pokemon?.height}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </>
            )}

        </>

    )
}
