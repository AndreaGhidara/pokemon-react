// store/pokemonSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    pokemonList: [],
    currentPage: 1,
    nextPageUrl: '',
    prevPageUrl: '',
    isLoading: false,
    error: null,
};

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        setPokemonData: (state, action) => {
            const { pokemonList, nextPageUrl, prevPageUrl } = action.payload;
            state.pokemonList = pokemonList;
            state.nextPageUrl = nextPageUrl;
            state.prevPageUrl = prevPageUrl;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
});

export const { setPokemonData, setLoading, setError, setPage } = pokemonSlice.actions;

export default pokemonSlice.reducer;
