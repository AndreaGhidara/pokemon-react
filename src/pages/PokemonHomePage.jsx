import { useDispatch, useSelector } from 'react-redux';
import Button from "@/components/Button";
import PokemonList from "@/components/PokemonList";
import {  setPage } from "@/stores/slice/pokemonSlice";
import Loader from '@/components/Loader';
import useFetchPokemon from '@/hooks/useFetchPokemon';


export default function PokemonHomePage() {
    const dispatch = useDispatch();
    const { pokemonList, currentPage, nextPageUrl, prevPageUrl } = useSelector((state) => state.pokemon);

    // Custom Hook
    const { isLoading, error, fetchPokemon } = useFetchPokemon();

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

    if (error) {
        return <div><p>Errore: {error}</p></div>;
    }

    if (isLoading) {
        return <div className='w-full h-screen flex justify-center items-center'><Loader /></div>;
    }

    return (
        <div className="w-full h-screen">
            <picture className="w-full h-full relative">
                <img src="/sfondoPokemon.jpeg" className="w-full h-screen object-contain object-left-top md:object-center bg-yellow-400" alt="" />
            </picture>
            <div className="w-full px-2 absolute top-[28%]  ">
                <div className='w-full'>
                    {pokemonList && pokemonList.length > 0 && (
                        <>
                            <PokemonList pokemon={pokemonList} />
                            <div className="flex justify-between items-center py-3">
                                <Button onClick={prevPage} disabled={!prevPageUrl}>
                                    Prev
                                </Button>
                                <p className='font-bold text-xl'>Page: {currentPage}</p>
                                <Button onClick={nextPage} disabled={!nextPageUrl}>
                                    Next
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>

    );
}
