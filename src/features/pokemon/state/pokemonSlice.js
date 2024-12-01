import { createSlice } from '@reduxjs/toolkit';

const pokemonSlice = createSlice({
    name: 'fevoritePokemon',
    initialState: {
        selectedPokemon: [],
    },
    reducers: {
        selectPokemon(state, action) {
            state.selectedPokemon = action.payload;
        },
    },
});

export const { selectPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;