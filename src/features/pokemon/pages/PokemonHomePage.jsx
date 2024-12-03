// import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { usePokemonList } from '../hooks/usePokemon';
// import PokemonCard from '../components/PokemonCard';
import PokemonLoader from '../components/PokemonLoader';
import Button from '@/components/Button';
import PokemonList from '../components/PokemonList';
import React, { useEffect } from 'react';
import { MdCatchingPokemon } from "react-icons/md";


function PokemonHomePage() {
    const [searchParams, setSearchParams] = useSearchParams();

    // Tot 65 page
    const page = parseInt(searchParams.get('page')) || 0;

    // Gestisce il cambio di pagina
    const handlePageChange = (newPage) => {
        setSearchParams({ page: newPage }); // Aggiorna l'URL
    };

    // Recupera i dati della lista Pokémon
    const { data, isLoading, isError } = usePokemonList(page);

    const pokemonList = React.useMemo(() => data?.results || [], [data]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);


    if (isLoading) return <PokemonLoader />;
    if (isError) return <div><p>Errore: {isError.message}</p></div>;

    return (
        <div className="w-full h-screen">
            <div className="w-full pb-5 absolute top-0 left-0 z-50 p-2">
                <Link className='w-full flex justify-start' to="/pokemon/favorite">
                    <button className="mb-5 flex items-center bg-gray-900 bg-opacity-50 text-white">
                        Preferiti-
                        <MdCatchingPokemon />
                    </button>
                </Link>
            </div>
            <picture className="w-full h-full relative">
                <img src="/sfondoPokemon.jpeg" className="w-full h-screen object-contain object-left-top md:object-center bg-yellow-400" alt="" />
            </picture>
            <div className="w-full px-2 absolute top-[28%]  ">
                <div className='w-full'>
                    {data && data.results && data.results.length > 0 && (
                        <>
                            <PokemonList pokemon={pokemonList} />
                            <div className="flex justify-between items-center py-3">
                                <Button
                                    disabled={page === 0} // Disabilitato se siamo già alla prima pagina
                                    onClick={() => handlePageChange(page - 1)}
                                >
                                    Previous
                                </Button>
                                <Button
                                    disabled={!data.next} // Disabilitato se non ci sono altre pagine
                                    onClick={() => handlePageChange(page + 1)}
                                >
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

export default PokemonHomePage;
