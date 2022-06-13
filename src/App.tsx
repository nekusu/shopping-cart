import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Header, Loading } from './components';
import { gameList } from './rawg-api';
import { Home, GameList } from './pages';
import { Game } from './types/Game.types';
import './scss/App.scss';

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [cartItems] = useState<Game[]>([]);
  const location = useLocation();
  const loadGames = async (search?: string) => {
    const response = await gameList({ page_size: 50, search });
    let { results } = response;
    results = results.filter((game) => game.ratings_count > (search ? 50 : 10));
    const isIndie = (game: Game) => game.genres.find((g) => g.name === 'Indie');
    results.forEach((game) => game.price = isIndie(game) ? 19.99 : 49.99);
    return results;
  };

  useEffect(() => {
    (async () => {
      const results = await loadGames('');
      setGames(results);
    })();
  }, []);

  return (
    <div className="App">
      <Header cartItems={cartItems} />
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={games.length
              ? <Home games={games} />
              : <Loading />
            }
          />
          <Route path="games">
            <Route
              index
              element={<GameList games={games} loadGames={loadGames} />}
            />
          </Route>
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
