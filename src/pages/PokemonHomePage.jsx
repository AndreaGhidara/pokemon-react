import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from "../components/Button";
import PokemonList from "../components/PokemonList";
import { setPokemonData, setLoading, setError, setPage } from "@/stores/slice/pokemonSlice";

const endPointPokemon = 'https://pokeapi.co/api/v2/pokemon/';

export default function PokemonHomePage() {
    const dispatch = useDispatch();
    const { pokemonList, currentPage, nextPageUrl, prevPageUrl, isLoading, error } = useSelector((state) => state.pokemon);

    const fetchPokemon = async (url) => {
        dispatch(setLoading(true));
        try {
            const response = await fetch(url);
            const data = await response.json();
            dispatch(setPokemonData({
                pokemonList: data?.results,
                nextPageUrl: data.next,
                prevPageUrl: data.previous
            }));
        } catch (e) {
            dispatch(setError(`Problemi con il server: ${e.message}`));
        }
        dispatch(setLoading(false));
    };

    const nextPage = () => {
        if (nextPageUrl) {
            fetchPokemon(nextPageUrl);
            dispatch(setPage(currentPage + 1));
        }
    };

    const prevPage = () => {
        if (prevPageUrl) {
            fetchPokemon(prevPageUrl);
            dispatch(setPage(currentPage - 1));
        }
    };

    
    useEffect(() => {
        if (pokemonList.length === 0) { 
            fetchPokemon(endPointPokemon);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pokemonList]); 

    if (error) {
        return <div><p>Errore: {error}</p></div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="px-2">
            <h1 className="text-center">Home Pokemon</h1>
            <div>
                {pokemonList && pokemonList.length > 0 && (
                    <>
                        <PokemonList pokemon={pokemonList} />
                        <div className="flex justify-between items-center py-3">
                            <Button onClick={prevPage} disabled={!prevPageUrl}>
                                Prev
                            </Button>
                            <p>currentPage: {currentPage}</p>
                            <Button onClick={nextPage} disabled={!nextPageUrl}>
                                Next
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
