import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function PokemonPersonalPage() {

    const params = useParams();
    const pokemonId = params.pokemonId;

    useEffect(() => {
        console.log(params);

    }, [params])


    return (
        <div>PokemonPersonalPage {pokemonId}</div>
    )
}
