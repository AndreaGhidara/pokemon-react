import { useQuery } from '@tanstack/react-query';
import { getPokemonList, getPokemonInfo } from '../services/pokemonService';

export const usePokemonList = (page) => {

    console.log(page);
    // Cosa serve keepPreviousData
    return useQuery({ queryKey: ['pokemonList', page], queryFn: () => getPokemonList(page), keepPreviousData: true });
};

export const usePokemonInfo = (name) => {
    return useQuery({ queryKey: ['pokemonInfo', name], queryFn: () => getPokemonInfo(name), keepPreviousData: true });

};