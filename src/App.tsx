import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Temporal } from 'temporal-polyfill';
import { Header, Loading } from './components';
import { gameList } from './rawg-api';
import Home from './pages/Home';
import './scss/App.scss';

function App() {
  const [games, setGames] = useState([]);
  const [cartItems] = useState([]);

  useEffect(() => {
    const loadGames = async () => {
      const today = Temporal.Now.plainDateISO();
      const threeMonthsAgo = today.subtract({ months: 3 });
      const response = await gameList({
        page_size: 50,
        dates: `${threeMonthsAgo},${today}`,
      });
      setGames(response.results as []);
    };
    loadGames();
  }, []);

  return (
    <div className="App">
      <Header cartItems={cartItems} />
      <Routes>
        <Route
          path="/"
          element={games.length
            ? <Home games={games} />
            : <Loading />
          }
        >
        </Route>
      </Routes>
    </div>
  );
}

export default App;
