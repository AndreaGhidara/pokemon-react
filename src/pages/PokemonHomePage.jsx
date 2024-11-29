import { useEffect, useState } from "react"
import Button from "../components/Button";
import PokemonList from "../components/PokemonList";

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
            setError(`Problemi con il server: ${e.message}`);
        }

        setIsLoading(false);
    };

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
        fetchPokemon(endPointPokemon);

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
        <div className="px-2">
            <h1 className="text-center">Home Pokemon</h1>
            <div>
                {pokemon && pokemon.length > 0 && (
                    <>
                        {/* I pokemon hanno name: string | url : string */}
                        {/* <ul className="w-full flex flex-col justify-center">
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
                        </ul> */}
                        <PokemonList pokemon={pokemon} />
                        <div className="flex justify-between items-center py-3">
                            <Button onClick={prevPage} disabled={!prevPageUrl}>
                                Prev
                            </Button>
                            <p>currentPage : {currentPage}</p>
                            <Button onClick={nextPage} disabled={!nextPageUrl}>
                                Next
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
