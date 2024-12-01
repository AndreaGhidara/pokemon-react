import { configureStore } from '@reduxjs/toolkit';
import favoritePokemonReducer from '@/features/pokemon/state/pokemonSlice.js';

export const store = configureStore({
    reducer: {
        favoritePokemon: favoritePokemonReducer,
    },
});

export default store;