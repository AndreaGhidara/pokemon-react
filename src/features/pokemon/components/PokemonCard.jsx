/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

// interface Pokemon {
//     name: string;
//     url: string;
//     sprite: string;
// }

export default function PokemonCard({ pokemon }) {
    return (
        <div className="flex flex-col items-center">
            <Link to={`/pokemon/${pokemon?.name}`}>
                <div className="w-32 h-32 relative bg-[url(/pokeballSimpleBig.png)] bg-cover rounded-full">
                    <div className="w-full h-full absolute inset-0 bg-black bg-opacity-55 rounded-full" />

                    <picture className="absolute inset-0 flex justify-center items-center">
                        <img src={pokemon.sprites.front_default || ""} alt={pokemon?.name} />
                    </picture>

                    <div className="absolute -bottom-3 w-full flex justify-center items-center">
                        <button className="font-bold text-base p-2">{pokemon?.name || 'N/A'}</button>
                    </div>
                </div>
            </Link>
        </div>
    )
}
