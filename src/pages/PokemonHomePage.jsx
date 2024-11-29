import React, { useEffect, useState } from "react"


// count
// : 
// 1302
// next
// : 
// "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20"
// previous
// : 
// null
// results
// : 
// (20) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…},

const endPointPokemon = 'https://pokeapi.co/api/v2/pokemon/';

export default function PokemonHomePage() {

    const [pokemon, setPokemon] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [nextPageUrl, setNextPageUrl] = useState("");
    const [prevPageUrl, setPrevPageUrl] = useState("");

    // Chiamata api pokemon
    const fetchPokemon = async (url) => {
        const path = url;
        setIsLoading(true);

        try {
            const response = await fetch(path);
            const data = await response.json();

            setPokemon(data?.results);
            setNextPageUrl(data.next);
            setPrevPageUrl(data.previous);

            console.log(data);

        } catch (e) {
            setError("errore");
            console.log(e);
        }

        setIsLoading(false);
    };

    // util path img
    const getPathForImage = (path) => {

        const idPokemon = path.split("/").filter(Boolean).pop();
        const pathFront = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idPokemon}.png`;
        // const pathBack = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/132.png";
        return pathFront
    }

    // Next page
    const nextPage = () => {
        if (nextPageUrl) {
            fetchPokemon(nextPageUrl)
            setCurrentPage((prev) => prev + 1)
        }
    }
    // Prev page
    const prevPage = () => {
        console.log(prevPageUrl);

        if (prevPageUrl) {
            fetchPokemon(prevPageUrl)
            setCurrentPage((prev) => prev - 1)
        }
    }

    useEffect(() => {

    }, [])

    if (error) {
        return (
            <>
                <div>
                    <p>errore</p>
                </div>
            </>
        )
    }

    if (isLoading) {
        return (
            <>
                <div>Loading...</div>
            </>
        )
    }

    return (
        <div className="px-2">
            <h1 className="text-center">Home Pokemon</h1>
            <div className="flex justify-center py-2">
                <button onClick={() => fetchPokemon(endPointPokemon)}>
                    pokemon
                </button>
            </div>
            <div>
                {pokemon && pokemon.length > 0 && (
                    <>
                        {/* I pokemon hanno name: string | url : string */}
                        <ul className="w-full flex flex-col justify-center">
                            {pokemon.map((poke, index) => (
                                <React.Fragment key={`${index}-${poke.name}`}>
                                    <li className="flex flex-col justify-center">
                                        <picture className="flex justify-center">
                                            {poke.url ?
                                                (
                                                    <>
                                                        <img className="w-[150px] h-[150px]" src={getPathForImage(poke.url)} alt="" />
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
                                        <button>
                                            see Pokemon
                                        </button>
                                    </li>
                                </React.Fragment>
                            ))}
                        </ul>
                        <div className="flex justify-between items-center py-3">
                            <div>
                                {prevPageUrl && (
                                    <>
                                        <button onClick={prevPage}>prev</button>
                                    </>
                                )}
                            </div>
                            <p>currentPage : {currentPage}</p>
                            <div>
                                {nextPage && (
                                    <>
                                        <button onClick={nextPage}>next</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
