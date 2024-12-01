// import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePokemonList } from '../hooks/usePokemon';
// import PokemonCard from '../components/PokemonCard';
import PokemonLoader from '../components/PokemonLoader';
import Button from '@/components/Button';
import PokemonList from '../components/PokemonList';
import { useEffect } from 'react';

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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);


    // Stati di caricamento ed errore
    if (isLoading) return <PokemonLoader />;
    if (isError) return <div><p>Errore: {isError.message}</p></div>;

    return (
        <div className="w-full h-screen">
            <picture className="w-full h-full relative">
                <img src="/sfondoPokemon.jpeg" className="w-full h-screen object-contain object-left-top md:object-center bg-yellow-400" alt="" />
            </picture>
            <div className="w-full px-2 absolute top-[28%]  ">
                <div className='w-full'>
                    {data && data.results && data.results.length > 0 && (
                        <>
                            <PokemonList pokemon={data.results} />
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
        // <section className='flex flex-col justify-between min-h-screen px-3'>
        //     <h1 className='text-3xl font-bold text-center'>Pokemon List</h1>
        //     <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-10'>
        //         {data.results.map((pokemon) => (
        //             <React.Fragment key={pokemon.name}>
        //                 <PokemonCard pokemon={pokemon} />
        //             </React.Fragment>
        //         ))}
        //     </div>
        //     <div className='flex justify-between py-3'>
        //         {/* Bottone "Previous" */}
        //         <Button
        //             disabled={page === 0} // Disabilitato se siamo già alla prima pagina
        //             onClick={() => handlePageChange(page - 1)}
        //         >
        //             Previous
        //         </Button>
        //         {/* Bottone "Next" */}
        //         <Button
        //             disabled={!data.next} // Disabilitato se non ci sono altre pagine
        //             onClick={() => handlePageChange(page + 1)}
        //         >
        //             Next
        //         </Button>
        //     </div>
        // </section>
    );
}

export default PokemonHomePage;
