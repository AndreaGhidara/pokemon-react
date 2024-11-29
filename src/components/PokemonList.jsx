/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import { getIdPokemon } from "@/lib/utils/helper";



export default React.memo(function PokemonList({ pokemon }) {

    // // util id pokemon
    // const getIdPokemon = (path) => {
    //     if (!path) return null;
    //     const idPokemon = path.split("/").filter(Boolean).pop();
    //     return idPokemon
    // }

    return (
        <ul className="w-full flex flex-col justify-center">
            {/* I pokemon hanno name: string | url : string */}
            {pokemon.map((poke, index) => (
                <React.Fragment key={`${index}-${poke.name}`}>
                    <li className="flex flex-col justify-center">
                        <picture className="flex justify-center">
                            {poke.url ?
                                (
                                    <>
                                        <img
                                            className="w-[150px] h-[150px]"
                                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIdPokemon(poke.url)}.png`}
                                            alt=""
                                        />
                                    </>
                                )
                                :
                                (
                                    <>
                                        <div className="w-[150px] h-[150px] bg-blue-600" />
                                    </>
                                )
                            }

                        </picture>
                        <p className="text-center">{poke.name}</p>
                        <Link className="w-full flex justify-center py-1" to={`/pokemon/${getIdPokemon(poke.url)}`}>
                            <button>
                                see Pokemon
                            </button>
                        </Link>
                    </li>
                </React.Fragment>
            ))}
        </ul>
    );
});