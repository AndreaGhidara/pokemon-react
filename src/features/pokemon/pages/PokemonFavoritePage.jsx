import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import PokemonCard from '../components/PokemonCard';
import { IoArrowBackCircleOutline } from 'react-icons/io5';

export default function PokemonFavorite() {
    const favoritePokemons = useSelector((state) => state.favoritePokemon.selectedPokemon);
    const navigate = useNavigate(); 

    return (
        <div>
            <div className="p-2 flex justify-between">
                <button className="bg-transparent p-0" onClick={() => navigate(-1)}>
                    <IoArrowBackCircleOutline fontSize={40} />
                </button>
                <h1 className='text-3xl font-bold text-center'>Pokémon Preferiti</h1>
                <div />
            </div>
            <section className='py-5'>
                <div>
                    <ul className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-10'>
                        {favoritePokemons.map((pokemon) => (
                            <li key={pokemon.name}>
                                <PokemonCard pokemon={pokemon} />
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

        </div>
    )
}
