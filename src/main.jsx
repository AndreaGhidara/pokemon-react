import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PokemonPersonalPage from '@/pages/PokemonPersonalPage.jsx';
// import PokemonHomePage from '@/pages/PokemonHomePage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/pokemon/:pokemonId',
    element: <PokemonPersonalPage />
  }
]);


createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
