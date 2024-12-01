import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from '@/features/pokemon/state/pokemonSlice';

export const store = configureStore({
    reducer: {
        pokemon: pokemonReducer,
    },
});

export default store;