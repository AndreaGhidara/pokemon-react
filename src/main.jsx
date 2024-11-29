import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Provider } from 'react-redux'
import { store } from '@/stores/store.js';
import PokemonInfoPage from '@/pages/PokemonInfoPage.jsx';
import PokemonHomePage from '@/pages/PokemonHomePage.jsx';
import { Suspense } from 'react';
import Loader from '@/components/Loader';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/pokemon',
    element: (
      <Suspense fallback={<Loader />}>
        <PokemonHomePage />
      </Suspense>
    )
  },
  {
    path: '/pokemon/:pokemonId',
    element: (
      <Suspense fallback={<Loader />}>
        <PokemonInfoPage />
      </Suspense>
    )
  }
]);


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
