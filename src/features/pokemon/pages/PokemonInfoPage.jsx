import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import PokemonLoader from "../components/PokemonLoader";
import { usePokemonInfo } from "../hooks/usePokemon";
import { addFavoritePokemon, removeFavoritePokemon } from '../state/pokemonSlice';
import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion"

import { LiaWeightSolid } from "react-icons/lia";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { SiMicrogenetics } from "react-icons/si";
import { ImStatsDots } from "react-icons/im";
import { CiLineHeight } from "react-icons/ci";
import { BiHomeAlt2 } from "react-icons/bi";


export default function PokemonInfoPage() {
    const params = useParams();
    const dispatch = useDispatch();
    const pokemonName = params.pokemonName
    const navigate = useNavigate(); // Hook per navigare tra le pagine

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const favoritePokemons = useSelector((state) => state.favoritePokemon.selectedPokemon || {});

    const { data: pokemon, isLoading, isError } = usePokemonInfo(pokemonName);
    const isFavorite = pokemon && favoritePokemons.some((poke) => poke?.name === pokemon.name);

    const handleFavorite = () => {
        if (isFavorite) {
            dispatch(removeFavoritePokemon(pokemon.name)); // Rimuove se è già nei preferiti
        } else {
            dispatch(addFavoritePokemon(pokemon)); // Aggiunge ai preferiti
        }
    };


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pokemonName]);

    if (isLoading) return <PokemonLoader />;

    if (isError) return <div><p>Errore: {isError.message}</p></div>;

    if (!pokemon) {
        return <div>Pokemon non trovato o errore durante il caricamento.</div>;
    }
    return (
        <div>
            {pokemon && (
                <>
                    <div className="bg-transparent bg-gradient-to-r from-yellow-400 to-yellow-300 p-2 flex justify-between">
                        <button className="bg-transparent p-0" onClick={() => navigate(-1)}>
                            <IoArrowBackCircleOutline fontSize={40} />
                        </button>
                        <Link to="/pokemon">
                            <button className="bg-transparent text-white border-2 border-white rounded-full p-2" >
                                <BiHomeAlt2 fontSize={20} />
                            </button>
                        </Link>
                        <div className="hidden">

                        </div>
                    </div>
                    <div className='overflow-hidden'>
                        <div className='w-full h-[180px] bg-gradient-to-r from-yellow-400 to-yellow-300 relative '>
                            <div

                                className='w-full absolute flex justify-center lg:translate-x-32 translate-x-28 translate-y-6 lg:translate-y-10 '>
                                <motion.img
                                    initial={{ opacity: 0, scale: 0, rotate: 0 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 45 }}
                                    className='w-[150px] h-[150px] object-contain rotate-45' src='/pokeball.png' />
                            </div>
                            {/* Sprite */}
                            <div className='flex justify-center'>
                                <motion.picture
                                    initial={{ opacity: 1, scale: 0, }}
                                    animate={{ opacity: 1, scale: 1, }}
                                    transition={{ duration: 1, times: [0, 0.2, 0.5, 0.8, 1] }}

                                >
                                    <img
                                        className="w-[130px] h-[130px] lg:w-[200px] lg:h-[200px]"
                                        src={pokemon?.sprites?.front_default}
                                        alt=""
                                    />
                                </motion.picture>
                                <motion.picture
                                    initial={{ opacity: 0, scale: 0, }}
                                    animate={{ opacity: 1, scale: 1, }}
                                    transition={{ duration: 1, times: [0, 0.2, 0.5, 0.8, 1] }}
                                >
                                    <img
                                        className="w-[100px] h-[100px] lg:w-[130px] lg:h-[130px]"
                                        src={pokemon?.sprites?.back_default}
                                        alt=""
                                    />
                                </motion.picture>
                            </div>
                            <div>
                            </div>
                        </div>

                        <section className='px-3'>
                            <div className='bg-[#242424] p-5 rounded-lg mb-5 flex flex-col '>
                                {/* NUMERO POKEDEX */}
                                <div className='font-bold text-center pb-2 text-2xl'>#{pokemon?.order}</div>
                                {/* NUMERO NAME */}
                                <div className='w-full flex justify-center'>
                                    <h1 className='font-bold uppercase text-center text-4xl border-2 p-2 shadow-white shadow-2xl'>{pokemon?.name || 'N/A'} </h1>
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
                                        {pokemon?.types?.map((typeInfo, index) => (
                                            <li className='font-medium uppercase px-2 lg:px-0' key={index}>
                                                {typeInfo?.type?.name || 'N/A'} <span className={`px-2 ${index === pokemon.types.length - 1 && 'hidden'}`}>/</span>
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
                                                Stats
                                            </p>
                                        </div>
                                        <ul className='pt-4'>
                                            {pokemon?.stats?.map((statistics, index) => {
                                                const maxStat = 100; // Valore massimo della statistica
                                                const percentage = (statistics?.base_stat / maxStat) * 100;

                                                return (
                                                    <li className='font-semibold flex items-center mb-2' key={index}>
                                                        <p className='w-2/4 lg:w-1/4 text-sm md:text-base '>{statistics?.stat.name}:</p>
                                                        <div className="w-3/4 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                            <div
                                                                className={`h-full rounded-full`}
                                                                style={{
                                                                    width: `${percentage}%`,
                                                                    backgroundColor: percentage > 75 ? 'green' : percentage > 50 ? 'yellow' : 'red',
                                                                }}
                                                            />
                                                        </div>
                                                        <span className="ml-2">{statistics?.base_stat}</span>
                                                    </li>
                                                );
                                            })}
                                            Total: {pokemon?.stats?.reduce((total, stat) => total + stat.base_stat, 0)}
                                        </ul>
                                    </div>
                                    {/* EVOLUZIONI */}
                                    <div className='py-2 w-full lg:w-[50%] lg:flex lg:justify-center'>
                                        <div className='flex flex-col lg:flex-row '>
                                            <div className='py-2'>
                                                <div className='flex justify-center pb-5'>
                                                    <img className='w-[500px]' src="/Evolve.png" alt="" />
                                                </div>
                                                {/* <p className='font-bold text-center text-xl pb-3'>Evolution</p> */}
                                                {pokemon?.evolutions && (
                                                    <motion.ul
                                                        initial={{ opacity: 0, scale: 0, }}
                                                        animate={{ opacity: 1, scale: 1, }}
                                                        style={{
                                                            transform: isInView ? "none" : "translatex(-200px)",
                                                            opacity: isInView ? 1 : 0,
                                                            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
                                                        }}
                                                        className='lg:flex lg:justify-center lg:items-center'>
                                                        {pokemon?.evolutions?.map((evolution, index) => (
                                                            <React.Fragment key={index}>
                                                                <Link to={`/pokemon/${evolution.name}`}>
                                                                    <li className='flex flex-col justify-center items-center' key={index}>
                                                                        <p className='uppercase'>
                                                                            {evolution?.name || 'N/A'}
                                                                        </p>
                                                                        <img
                                                                            className="w-[150px] h-[150px] lg:w-[200px] lg:h-[200px]"
                                                                            src={evolution?.sprites}
                                                                            alt=""
                                                                        />
                                                                    </li>
                                                                </Link>
                                                            </React.Fragment>
                                                        ))}
                                                    </motion.ul>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* ALTURA E PESO */}
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
            <div className="px-3 pb-5">
                <button onClick={handleFavorite} className="w-full">
                    {isFavorite ? 'Rimuovi dai Preferiti' : 'Aggiungi ai Preferiti'}
                </button>
            </div>
        </div>
    )
}
