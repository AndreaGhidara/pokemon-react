import axios from 'axios';
import { getIdPokemon } from '../utils/helper';

// Base URL per Pokémon API
const apiClient = axios.create({
    baseURL: 'https://pokeapi.co/api/v2',
});

// Funzione per ottenere l'immagine del Pokémon
export const getSpritePokemon = (id) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}

// Funzione per ottenere le evoluzioni del Pokémon
export const extractEvolution = (evolution) => {
    const result = [];

    if (evolution.species) {
        const id = getIdPokemon(evolution.species.url);
        result.push({
            name: evolution.species.name,
            sprites: getSpritePokemon(id)
        });
    }

    if (evolution.evolves_to && evolution.evolves_to.length > 0) {
        evolution.evolves_to.forEach((nextEvolution) => {
            result.push(...extractEvolution(nextEvolution));
        });
    }

    return result;
}

// Funzione per ottenere la lista di Pokémon
export const getPokemonList = async (page = 0) => {
    const offset = page * 20;
    const response = await apiClient.get(`/pokemon?offset=${offset}&limit=20`);

    const pokemonList = response.data.results;

    pokemonList.map((pokemon) => {
        const idPokemon = getIdPokemon(pokemon.url);
        const sprite = getSpritePokemon(idPokemon);
        pokemon.sprite = sprite;
    });

    return {
        results: pokemonList,
        next: response.data.next,
    };
};

// Funzione per ottenere le informazioni del Pokémon
export const getPokemonInfo = async (name) => {

    const response = await apiClient.get(`/pokemon/${name}`);
    const pokemonInfo = response.data;

    // Prendo la specie del pokemon
    const pokemonSpecies = pokemonInfo.species.url;

    if (!pokemonSpecies) {
        return { ...pokemonInfo };
    };

    const dataEvolutionSpecies = await fetch(pokemonSpecies);
    const evolutionSpecies = await dataEvolutionSpecies.json();

    // Prendo la famiglia di evoluzione del pokemon
    const pokemonEvolutionChain = evolutionSpecies.evolution_chain.url;

    if (!pokemonEvolutionChain) {
        return { ...pokemonInfo };
    };
    
    const dataEvolutionChain = await fetch(pokemonEvolutionChain);
    const evolutionChain = await dataEvolutionChain.json();


    // Estraggo le evoluzioni del pokemon
    const evolutions = extractEvolution(evolutionChain.chain);

    return { ...pokemonInfo, evolutions };

};
