import { createSlice } from '@reduxjs/toolkit';

const pokemonSlice = createSlice({
    name: 'favoritePokemon',
    initialState: {
        selectedPokemon: [], 
    },
    reducers: {
        // Aggiunge un Pokémon ai preferiti, evitando duplicati
        addFavoritePokemon(state, action) {
            console.log(action.payload);
            
            const pokemon = action.payload;
            if (!state.selectedPokemon.some((poke) => poke.name === pokemon.name)) {
                state.selectedPokemon.push(pokemon);
            }
        },

        removeFavoritePokemon(state, action) {
            const pokemonName = action.payload;
            state.selectedPokemon = state.selectedPokemon.filter((poke) => poke.name !== pokemonName);
        },
    },
});

export const { addFavoritePokemon, removeFavoritePokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;
