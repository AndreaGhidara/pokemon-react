import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPokemonData } from "@/stores/slice/pokemonSlice";

const endPointPokemon = 'https://pokeapi.co/api/v2/pokemon/';

export default function useFetchPokemon() {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { pokemonList } = useSelector((state) => state.pokemon);

    const fetchPokemon = useCallback(async (url) => {
        setIsLoading(true);

        try {
            const response = await fetch(url);
            const data = await response.json();
            dispatch(setPokemonData({
                pokemonList: data?.results,
                nextPageUrl: data.next,
                prevPageUrl: data.previous
            }));
        } catch (e) {
            setError(`Problemi con il server: ${e.message}`)
        }

        setIsLoading(false)
    }, [dispatch]);

    useEffect(() => {

        if (pokemonList.length === 0) {
            fetchPokemon(endPointPokemon);
        }
    }, [fetchPokemon, pokemonList]);

    return { isLoading, error, fetchPokemon };
}
