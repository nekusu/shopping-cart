import { useCallback, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Header, Cart } from './components';
import { gameList } from './rawg-api';
import { Home, GameList, GameDetails, NotFound } from './pages';
import getPrice from './utils/getPrice';
import { Game } from './types/Game.types';
import './scss/App.scss';

const loadGames = async (search = '') => {
  const response = await gameList({ page_size: 50, search });
  let { results } = response;
  results = results.filter((game) => game.ratings_count > (search ? 50 : 10));
  results.forEach((game) => game.price = getPrice(game));
  return results;
};

function App() {
  const [cartItems, setCartItems] = useState<Game[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
  const addToCart = useCallback((game: Game) => {
    setCartItems([...cartItems, game]);
  }, [cartItems]);
  const removeFromCart = useCallback((ids: number[]) => {
    setCartItems(cartItems.filter((item) => !ids.includes(item.id)));
  }, [cartItems]);

  return (
    <div className="App">
      <Header cartItems={cartItems} setIsCartOpen={setIsCartOpen} />
      <AnimatePresence exitBeforeEnter>
        {isCartOpen && (
          <Cart
            cartItems={cartItems}
            setIsCartOpen={setIsCartOpen}
            removeFromCart={removeFromCart}
          />
        )}
      </AnimatePresence>
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route path='*' element={<NotFound />} />
          <Route
            path="/"
            element={<Home loadGames={loadGames} />}
          />
          <Route path="games">
            <Route
              index
              element={
                <GameList
                  loadGames={loadGames}
                  cartItems={cartItems}
                  addToCart={addToCart}
                />
              }
            />
            <Route
              path=":gameId"
              element={
                <GameDetails
                  cartItems={cartItems}
                  addToCart={addToCart}
                />
              }
            />
          </Route>
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
