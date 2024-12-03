import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import PokemonHomePage from '@/features/pokemon/pages/PokemonHomePage.jsx';
import PokemonInfoPage from '@/features/pokemon/pages/PokemonInfoPage';
import PokemonFavoritePage from '../features/pokemon/pages/PokemonFavoritePage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/pokemon',
        element: <PokemonHomePage />,
    },
    {
        path: '/pokemon/:pokemonName',
        element: <PokemonInfoPage />,
    },
    {
        path: '/pokemon/favorite',
        element: <PokemonFavoritePage />,
    },

]);

export default router;
