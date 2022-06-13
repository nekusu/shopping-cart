import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Temporal } from 'temporal-polyfill';
import { Header, Loading } from './components';
import { gameList } from './rawg-api';
import { Home, GameList } from './pages';
import { Game } from './types/Game.types';
import './scss/App.scss';

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [cartItems] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const loadGames = async () => {
      const today = Temporal.Now.plainDateISO();
      const threeMonthsAgo = today.subtract({ months: 3 });
      const response = await gameList({
        page_size: 50,
        dates: `${threeMonthsAgo},${today}`,
      });
      const loadedGames = response.results;
      loadedGames.forEach((game) => {
        game.price = (game.genres.find((genre) => genre.name === 'Indie')
          ? 19.99
          : 59.99);
      });
      setGames(loadedGames);
    };
    loadGames();
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
              element={games.length
                ? <GameList games={games} />
                : <Loading />
              }
            />
          </Route>
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
