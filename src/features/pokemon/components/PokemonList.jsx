/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

export default React.memo(function PokemonList({ pokemon }) {

    console.log(pokemon);
    

    return (
        <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-48 ">
            {/* I pokemon hanno name: string | url : string */}
            {pokemon.map((poke, index) => (
                <React.Fragment key={`${index}-${poke.name}`}>
                    <Link className="w-full flex justify-center py-1" to={`/pokemon/${poke.name}`}>
                        <li className="w-[300px] h-[300px] flex flex-col justify-center border rounded-full bg-gray-100 bg-contain shadow-2xl">
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
                            <button className="bg-red-700 uppercase shadow-2xl hover:bg-red-800 hover:border-red-800">
                                <p className="text-center text-xl text-white">
                                    {poke.name}
                                </p>
                            </button>
                        </li>
                    </Link>
                </React.Fragment>
            ))}
        </ul >
    );
});