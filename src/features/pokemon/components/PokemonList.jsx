/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

export default React.memo(function PokemonList({ pokemon }) {

    return (
        <ul className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-48 ">
            {/* I pokemon hanno name: string | url : string */}
            {pokemon && pokemon.length > 0 && (
                <>
                    {pokemon.map((poke, index) => (
                        <React.Fragment key={`${index}-${poke.name}`}>
                            <Link className="w-full flex justify-center py-1" to={`/pokemon/${poke.name}`}>
                                <li className="w-[300px] h-[300px] flex flex-col justify-center border-2 border-white rounded-full bg-[url(/pokeballSimpleBig.png)] bg-cover bg-no-repeat shadow-2xl relative">

                                    <div className="w-full h-full absolute inset-0 bg-black bg-opacity-50 rounded-full" />

                                    <div className="absolute inset-0 w-full h-full">
                                        <picture className="flex justify-center ">
                                            {poke.url ?
                                                (
                                                    <div>
                                                        <img
                                                            className="w-[180px] h-[180px] "
                                                            src={poke.sprite}
                                                            alt=""
                                                        />
                                                    </div>
                                                )
                                                :
                                                (
                                                    <>
                                                        <div className="w-[150px] h-[150px] bg-blue-600" />
                                                    </>
                                                )
                                            }

                                        </picture>
                                        <button className="w-full bg-red-700 uppercase shadow-2xl hover:bg-red-800 hover:border-red-800 border-2 border-white">
                                            <p className="text-center text-xl text-white">
                                                {poke.name}
                                            </p>
                                        </button>
                                    </div>
                                </li>
                            </Link>
                        </React.Fragment>
                    ))}
                </>
            )}
        </ul >
    );
});